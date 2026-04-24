import fs from "fs-extra";
import path from "node:path";
import { execSync } from "node:child_process";
import chalk from "chalk";
import {
  writeConfig,
  writeTokensCss,
  type SigilConfig,
} from "./config.js";
import { generateAgentInstructions } from "./agents.js";
import { installSigilAgentAssets } from "./skills.js";
import { getPresetInfo } from "./presets.js";
import {
  PM_INSTALL,
  type DetectedPM,
  type ProjectDetection,
} from "./detect.js";
import { symbols, withSpinner } from "./terminal.js";

export type CustomOverrides = {
  primaryColor?: string;
  displayFont?: string;
  bodyFont?: string;
  monoFont?: string;
};

export type SigilSetupOptions = {
  cwd: string;
  config: SigilConfig;
  detection: ProjectDetection;
  features: string[];
  generateAgent: boolean;
  customOverrides?: CustomOverrides;
  starterComponents?: string[];
  updatePackageJson?: boolean;
  install?: boolean;
  injectCss?: boolean;
  dryRun?: boolean;
  generator?: "sigil init" | "sigil convert" | "create-sigil-app";
};

export type SigilSetupResult = {
  depsToInstall: string[];
  devDepsToInstall: string[];
  cssImportPath: string | null;
  packageJsonUpdated: boolean;
};

export async function writeSigilSetup(options: SigilSetupOptions): Promise<SigilSetupResult> {
  const {
    cwd,
    config,
    detection,
    features,
    generateAgent,
    customOverrides = {},
    starterComponents = [],
    updatePackageJson = false,
    install = false,
    injectCss = false,
    dryRun = false,
    generator = "sigil init",
  } = options;

  const depsToInstall = buildDependencyList(features);
  const devDepsToInstall = ["@sigil-ui/cli"];
  let cssImportPath: string | null = null;
  let packageJsonUpdated = false;

  if (dryRun) {
    printDryRun(options, depsToInstall, devDepsToInstall);
    return { depsToInstall, devDepsToInstall, cssImportPath, packageJsonUpdated };
  }

  writeConfig(config, cwd);
  console.log(`  ${symbols.success} Created sigil.config.ts`);

  const componentsDir = path.join(cwd, config.componentsDir);
  fs.ensureDirSync(componentsDir);
  console.log(`  ${symbols.success} Created ${config.componentsDir}/`);

  const tokensCss = generateTokensCss(config.preset, customOverrides, generator);
  writeTokensCss(tokensCss, config.tokensPath, cwd);
  console.log(`  ${symbols.success} Created ${config.tokensPath}`);

  if (injectCss) {
    cssImportPath = injectTokenImport(cwd, detection, config.tokensPath);
    if (cssImportPath) {
      console.log(`  ${symbols.success} Injected token import into ${cssImportPath}`);
    } else {
      console.log(`  ${symbols.warning} Could not find global CSS file to inject`);
    }
  }

  if (generateAgent) {
    const preset = getPresetInfo(config.preset);
    const agentContent = generateAgentInstructions(config, preset, detection, features, generator);
    const agentPath = path.join(cwd, ".sigil", "AGENTS.md");
    fs.ensureDirSync(path.dirname(agentPath));
    fs.writeFileSync(agentPath, agentContent, "utf-8");
    console.log(`  ${symbols.success} Created .sigil/AGENTS.md`);

    const assets = installSigilAgentAssets(cwd);
    console.log(`  ${symbols.success} Installed ${assets.installedSkillCount} Sigil skills`);
    console.log(`  ${symbols.success} Created .cursor/rules/sigil-skills.mdc`);
  }

  if (starterComponents.length > 0) {
    for (const comp of starterComponents) {
      const fileName = `${comp}.tsx`;
      const destPath = path.join(componentsDir, fileName);
      if (!fs.existsSync(destPath)) {
        fs.writeFileSync(destPath, generateComponentStub(comp), "utf-8");
      }
    }
    console.log(`  ${symbols.success} Added ${starterComponents.length} starter component(s)`);
  }

  if (updatePackageJson) {
    packageJsonUpdated = updateProjectPackageJson(cwd, depsToInstall, devDepsToInstall);
    if (packageJsonUpdated) {
      console.log(`  ${symbols.success} Updated package.json with Sigil dependencies`);
    } else {
      console.log(`  ${symbols.warning} package.json not found; skipped dependency update`);
    }
  }

  if (install) {
    await installProjectDependencies(cwd, detection.packageManager);
  }

  return { depsToInstall, devDepsToInstall, cssImportPath, packageJsonUpdated };
}

export function generateTokensCss(
  presetName: string,
  overrides: CustomOverrides = {},
  generator = "sigil init",
): string {
  const overrideLines: string[] = [];

  if (overrides.primaryColor) {
    overrideLines.push(`  --sigil-primary: ${overrides.primaryColor};`);
  }
  if (overrides.displayFont) {
    overrideLines.push(`  --sigil-font-display: "${overrides.displayFont}", system-ui, sans-serif;`);
  }
  if (overrides.bodyFont) {
    overrideLines.push(`  --sigil-font-body: "${overrides.bodyFont}", system-ui, sans-serif;`);
  }
  if (overrides.monoFont) {
    overrideLines.push(`  --sigil-font-mono: "${overrides.monoFont}", ui-monospace, monospace;`);
  }

  const overrideBlock =
    overrideLines.length > 0
      ? `\n:root {\n${overrideLines.join("\n")}\n}\n`
      : `\n/* Override tokens here:\n:root {\n  --sigil-primary: oklch(0.65 0.15 280);\n}\n*/\n`;

  return `/* Sigil UI tokens — generated by \`${generator}\`
 * Preset: ${presetName}
 * Edit this file to customize tokens, or run \`sigil preset <name>\` to swap.
 */

@import "@sigil-ui/tokens/css";
@import "@sigil-ui/presets/${presetName}";
${overrideBlock}`;
}

export function buildDependencyList(features: string[]): string[] {
  const deps = ["@sigil-ui/tokens", "@sigil-ui/components", "@sigil-ui/presets", "clsx", "tailwind-merge"];

  if (features.includes("gsap")) deps.push("gsap");
  if (features.includes("motion")) deps.push("motion");
  if (features.includes("primitives")) {
    deps.push(
      "@radix-ui/react-slot",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-tabs",
      "@radix-ui/react-tooltip",
    );
  }
  if (features.includes("pretext")) deps.push("pretext");

  return [...new Set(deps)];
}

export function updateProjectPackageJson(
  cwd: string,
  dependencies: string[],
  devDependencies: string[] = [],
): boolean {
  const pkgPath = path.join(cwd, "package.json");
  if (!fs.existsSync(pkgPath)) return false;

  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  pkg.dependencies = pkg.dependencies ?? {};
  pkg.devDependencies = pkg.devDependencies ?? {};

  for (const dep of dependencies) {
    pkg.dependencies[dep] = pkg.dependencies[dep] ?? "latest";
  }
  for (const dep of devDependencies) {
    pkg.devDependencies[dep] = pkg.devDependencies[dep] ?? "latest";
  }

  fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`, "utf-8");
  return true;
}

export function injectTokenImport(
  cwd: string,
  detection: ProjectDetection,
  tokensPath: string,
): string | null {
  if (!detection.globalCssPath) return null;

  const globalCssFullPath = path.join(cwd, detection.globalCssPath);
  if (!fs.existsSync(globalCssFullPath)) return null;

  const globalCss = fs.readFileSync(globalCssFullPath, "utf-8");
  if (globalCss.includes("sigil.tokens.css") || globalCss.includes("@sigil-ui/tokens")) {
    return detection.globalCssPath;
  }

  const importPath = relativeCssImport(detection.globalCssPath, tokensPath);
  fs.writeFileSync(globalCssFullPath, `@import "${importPath}";\n${globalCss}`, "utf-8");
  return detection.globalCssPath;
}

export async function installProjectDependencies(cwd: string, pm: DetectedPM): Promise<void> {
  await withSpinner("Installing dependencies", () => {
    execSync(`${pm} install`, { cwd, stdio: "pipe" });
  }, { successText: "Dependencies installed", failText: "Install failed" });
}

export function printInstallHint(detection: ProjectDetection, depsToInstall: string[]): void {
  if (depsToInstall.length === 0) return;
  const pm = PM_INSTALL[detection.packageManager];
  console.log(chalk.bold("  Install dependencies:"));
  console.log(`  ${chalk.cyan(`${pm} ${depsToInstall.join(" ")}`)}`);
  console.log();
}

function relativeCssImport(fromCssPath: string, toCssPath: string): string {
  const fromDir = path.dirname(fromCssPath);
  const relative = path.relative(fromDir, toCssPath).replaceAll(path.sep, "/");
  return relative.startsWith(".") ? relative : `./${relative}`;
}

function printDryRun(
  options: SigilSetupOptions,
  depsToInstall: string[],
  devDepsToInstall: string[],
): void {
  console.log(chalk.bold("  Dry run: Sigil would make these changes"));
  console.log();
  console.log(`  ${symbols.bullet} Write sigil.config.ts`);
  console.log(`  ${symbols.bullet} Write ${options.config.tokensPath}`);
  console.log(`  ${symbols.bullet} Ensure ${options.config.componentsDir}/`);
  if (options.injectCss) {
    console.log(`  ${symbols.bullet} Inject token import into ${options.detection.globalCssPath ?? "global CSS"}`);
  }
  if (options.generateAgent) {
    console.log(`  ${symbols.bullet} Write .sigil/AGENTS.md`);
    console.log(`  ${symbols.bullet} Write .sigil/skills/`);
    console.log(`  ${symbols.bullet} Write .cursor/rules/sigil-skills.mdc`);
  }
  if (options.updatePackageJson) {
    console.log(`  ${symbols.bullet} Add dependencies: ${depsToInstall.join(", ")}`);
    console.log(`  ${symbols.bullet} Add dev dependencies: ${devDepsToInstall.join(", ")}`);
  }
  if (options.install) {
    console.log(`  ${symbols.bullet} Run ${options.detection.packageManager} install`);
  }
  console.log();
}

function generateComponentStub(name: string): string {
  const pascalName = name
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");

  return `import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { clsx } from "clsx";

type ${pascalName}Props = ComponentPropsWithoutRef<"div">;

export const ${pascalName} = forwardRef<HTMLDivElement, ${pascalName}Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx("sigil-${name}", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

${pascalName}.displayName = "${pascalName}";
`;
}

