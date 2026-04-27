import { Command } from "commander";
import chalk from "chalk";
import fs from "fs-extra";
import path from "node:path";
import { configExists } from "../utils/config.js";
import { detectProject } from "../utils/detect.js";
import { printIntro, symbols } from "../utils/terminal.js";

type AdapterName = "shadcn" | "bootstrap" | "material";

const ADAPTERS: Record<AdapterName, { label: string; file: string; css: string }> = {
  shadcn: {
    label: "shadcn/ui",
    file: "src/styles/sigil-adapter-shadcn.css",
    css: `/* Sigil adapter: shadcn/ui compatibility
 * Maps common shadcn variables to Sigil tokens so existing components
 * inherit your active Sigil preset.
 */

:root {
  --background: var(--s-background);
  --foreground: var(--s-text);
  --card: var(--s-surface);
  --card-foreground: var(--s-text);
  --popover: var(--s-surface-elevated);
  --popover-foreground: var(--s-text);
  --primary: var(--s-primary);
  --primary-foreground: var(--s-primary-contrast);
  --secondary: var(--s-surface);
  --secondary-foreground: var(--s-text);
  --muted: var(--s-surface);
  --muted-foreground: var(--s-text-muted);
  --accent: var(--s-primary-muted);
  --accent-foreground: var(--s-text);
  --destructive: var(--s-error);
  --destructive-foreground: var(--s-primary-contrast);
  --border: var(--s-border);
  --input: var(--s-border);
  --ring: var(--s-primary);
  --radius: var(--s-radius-md);
}
`,
  },
  bootstrap: {
    label: "Bootstrap",
    file: "src/styles/sigil-adapter-bootstrap.css",
    css: `/* Sigil adapter: Bootstrap variable bridge */

:root {
  --bs-body-bg: var(--s-background);
  --bs-body-color: var(--s-text);
  --bs-primary: var(--s-primary);
  --bs-secondary: var(--s-secondary);
  --bs-success: var(--s-success);
  --bs-warning: var(--s-warning);
  --bs-danger: var(--s-error);
  --bs-info: var(--s-info);
  --bs-border-color: var(--s-border);
  --bs-border-radius: var(--s-radius-md);
  --bs-font-sans-serif: var(--s-font-body);
  --bs-font-monospace: var(--s-font-mono);
}
`,
  },
  material: {
    label: "Material/MUI",
    file: "src/styles/sigil-adapter-material.css",
    css: `/* Sigil adapter: Material/MUI CSS variable bridge
 * Use this with CSS-variable based Material setups or as a token reference
 * when building a theme object.
 */

:root {
  --mui-palette-background-default: var(--s-background);
  --mui-palette-background-paper: var(--s-surface);
  --mui-palette-text-primary: var(--s-text);
  --mui-palette-text-secondary: var(--s-text-muted);
  --mui-palette-primary-main: var(--s-primary);
  --mui-palette-primary-contrastText: var(--s-primary-contrast);
  --mui-palette-secondary-main: var(--s-secondary);
  --mui-palette-error-main: var(--s-error);
  --mui-palette-warning-main: var(--s-warning);
  --mui-palette-success-main: var(--s-success);
  --mui-palette-info-main: var(--s-info);
  --mui-palette-divider: var(--s-border);
  --mui-shape-borderRadius: var(--s-radius-md);
  --mui-font-family: var(--s-font-body);
}
`,
  },
};

export const adapterCommand = new Command("adapter")
  .description("Generate appearance adapters for existing design-system variables")
  .argument("[name]", "adapter name: shadcn, bootstrap, or material")
  .option("-o, --out <path>", "override output CSS path")
  .option("--inject", "inject adapter CSS into detected global CSS")
  .action((name: string | undefined, opts) => {
    const cwd = process.cwd();
    printIntro("Sigil Adapter", "Bridge existing systems into Sigil tokens");

    if (!name) {
      console.log(chalk.bold("Available adapters:"));
      for (const [key, adapter] of Object.entries(ADAPTERS)) {
        console.log(`  ${chalk.cyan(key)} ${chalk.dim(adapter.label)}`);
      }
      return;
    }

    if (!configExists(cwd)) {
      console.log(symbols.error, "No sigil.config.ts found. Run", chalk.cyan("sigil init"), "first.");
      process.exit(1);
    }

    const adapter = ADAPTERS[name as AdapterName];
    if (!adapter) {
      console.log(symbols.error, `Unknown adapter "${name}". Use shadcn, bootstrap, or material.`);
      process.exit(1);
    }

    const outputPath = opts.out ?? adapter.file;
    const fullPath = path.join(cwd, outputPath);
    fs.ensureDirSync(path.dirname(fullPath));
    fs.writeFileSync(fullPath, adapter.css, "utf-8");
    console.log(`  ${symbols.success} Wrote ${outputPath}`);

    if (opts.inject) {
      const detection = detectProject(cwd);
      const injected = injectAdapterImport(cwd, detection.globalCssPath, outputPath);
      if (injected) {
        console.log(`  ${symbols.success} Injected adapter import into ${injected}`);
      } else {
        console.log(`  ${symbols.warning} Could not find global CSS file to inject`);
      }
    } else {
      console.log(chalk.dim("  Import this adapter after your Sigil token CSS."));
    }
  });

function injectAdapterImport(cwd: string, globalCssPath: string | null, adapterPath: string): string | null {
  if (!globalCssPath) return null;
  const fullGlobalPath = path.join(cwd, globalCssPath);
  if (!fs.existsSync(fullGlobalPath)) return null;

  const importPath = relativeCssImport(globalCssPath, adapterPath);
  const content = fs.readFileSync(fullGlobalPath, "utf-8");
  if (content.includes(importPath) || content.includes(path.basename(adapterPath))) {
    return globalCssPath;
  }
  fs.writeFileSync(fullGlobalPath, `@import "${importPath}";\n${content}`, "utf-8");
  return globalCssPath;
}

function relativeCssImport(fromCssPath: string, toCssPath: string): string {
  const fromDir = path.dirname(fromCssPath);
  const relative = path.relative(fromDir, toCssPath).replaceAll(path.sep, "/");
  return relative.startsWith(".") ? relative : `./${relative}`;
}
