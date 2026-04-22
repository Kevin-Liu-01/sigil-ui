import { Command } from "commander";
import prompts from "prompts";
import chalk from "chalk";
import fs from "fs-extra";
import path from "node:path";
import {
  configExists,
  writeConfig,
  writeTokensCss,
  DEFAULT_CONFIG,
  type SigilConfig,
} from "../utils/config.js";
import {
  PRESET_CATALOG,
  getPresetsByCategory,
  getCategoryLabel,
  getPresetInfo,
  PROJECT_TYPES,
  FEATURE_OPTIONS,
  type PresetCategory,
  type PresetInfo,
} from "../utils/presets.js";
import {
  detectProject,
  FRAMEWORK_LABELS,
  PM_INSTALL,
  type ProjectDetection,
} from "../utils/detect.js";
import { generateAgentInstructions } from "../utils/agents.js";

export const initCommand = new Command("init")
  .description("Initialize Sigil UI in the current project")
  .option("-p, --preset <preset>", "preset to use")
  .option("-d, --dir <dir>", "components directory")
  .option("-y, --yes", "skip prompts, use defaults")
  .option("--no-agent", "skip generating agent instructions")
  .action(async (opts) => {
    const cwd = process.cwd();

    console.log();
    console.log(chalk.bold("  ◇ Sigil UI"));
    console.log(chalk.dim("  Structural-visibility design system"));
    console.log();

    // Detect project environment
    const detection = detectProject(cwd);
    printDetection(detection);

    // Check for existing config
    if (configExists(cwd)) {
      const { overwrite } = await prompts({
        type: "confirm",
        name: "overwrite",
        message: "sigil.config.ts already exists. Overwrite?",
        initial: false,
      });
      if (!overwrite) {
        console.log(chalk.yellow("Aborted."));
        return;
      }
    }

    if (opts.yes) {
      const config = buildDefaultConfig(opts, detection);
      await writeAll(config, cwd, detection, [], opts.agent !== false);
      return;
    }

    // Step 1: How do you want to use Sigil?
    const { projectType } = await prompts({
      type: "select",
      name: "projectType",
      message: "What are you building?",
      choices: PROJECT_TYPES.map((t) => ({
        title: t.label,
        value: t.value,
        description: t.description,
      })),
    });
    if (projectType === undefined) return abort();

    // Step 2: Preset selection — grouped by category
    const preset = opts.preset
      ? getPresetInfo(opts.preset)
      : await selectPreset(projectType);
    if (!preset) return abort();

    // Step 3: Customization layer (fonts, primary color override)
    const customOverrides = await askCustomizations(preset);

    // Step 4: Features
    const { features } = await prompts({
      type: "multiselect",
      name: "features",
      message: "Which features do you want?",
      choices: FEATURE_OPTIONS.map((f) => ({
        title: f.label,
        value: f.value,
        description: f.description,
        selected: getDefaultFeatures(projectType).includes(f.value),
      })),
      hint: "space to toggle, enter to confirm",
    });
    if (!features) return abort();

    // Step 5: Starter components
    const { starterComponents } = await prompts({
      type: "multiselect",
      name: "starterComponents",
      message: "Add starter components?",
      choices: [
        { title: "Button", value: "button", selected: true },
        { title: "Card", value: "card", selected: true },
        { title: "Input", value: "input", selected: true },
        { title: "Badge", value: "badge" },
        { title: "Dialog", value: "dialog" },
        { title: "Dropdown", value: "dropdown" },
        { title: "Tabs", value: "tabs" },
        { title: "Tooltip", value: "tooltip" },
        { title: "Sigil Grid", value: "sigil-grid", selected: features.includes("grid") },
        { title: "Sigil Cross", value: "sigil-cross", selected: features.includes("grid") },
        { title: "Sigil Rail", value: "sigil-rail", selected: features.includes("grid") },
        { title: "Sigil Card", value: "sigil-card" },
      ],
      hint: "space to toggle, enter to confirm",
    });
    if (!starterComponents) return abort();

    // Step 6: Paths
    const defaultDir = detection.hasSrc ? "src/components/ui" : "components/ui";
    const defaultTokens = detection.hasSrc ? "src/styles/sigil.tokens.css" : "styles/sigil.tokens.css";

    const { componentsDir, tokensPath } = await prompts([
      {
        type: "text",
        name: "componentsDir",
        message: "Components directory",
        initial: opts.dir ?? defaultDir,
      },
      {
        type: "text",
        name: "tokensPath",
        message: "Tokens CSS output path",
        initial: defaultTokens,
      },
    ]);
    if (!componentsDir) return abort();

    // Step 7: Agent instructions
    const { generateAgent } = opts.agent === false
      ? { generateAgent: false }
      : await prompts({
          type: "confirm",
          name: "generateAgent",
          message: "Generate AI agent instructions (.sigil/AGENTS.md)?",
          initial: true,
        });

    const config: SigilConfig = {
      preset: preset.name,
      componentsDir,
      tokensPath,
      typescript: detection.hasTypescript,
    };

    await writeAll(config, cwd, detection, features, generateAgent, customOverrides, starterComponents);
  });

// ---------------------------------------------------------------------------
// Preset selector with categories
// ---------------------------------------------------------------------------

async function selectPreset(projectType: string): Promise<PresetInfo | undefined> {
  const suggested = suggestPresetsForProject(projectType);
  const categories = getPresetsByCategory();

  const choices: Array<{ title: string; value: string; description?: string }> = [];

  if (suggested.length > 0) {
    choices.push({ title: chalk.bold("── Recommended for your project ──"), value: "_header_recommended", description: "" });
    for (const p of suggested) {
      choices.push({
        title: `${chalk.cyan(p.label)}`,
        value: p.name,
        description: `${p.description} [${p.fonts.display}]`,
      });
    }
    choices.push({ title: "", value: "_divider", description: "" });
  }

  const categoryOrder: PresetCategory[] = ["structural", "minimal", "dark", "colorful", "editorial", "industrial"];

  for (const cat of categoryOrder) {
    const presets = categories.get(cat);
    if (!presets) continue;

    choices.push({
      title: chalk.bold(`── ${getCategoryLabel(cat)} ──`),
      value: `_header_${cat}`,
      description: "",
    });

    for (const p of presets) {
      choices.push({
        title: `${p.label}`,
        value: p.name,
        description: `${p.description}`,
      });
    }
  }

  const { presetName } = await prompts({
    type: "select",
    name: "presetName",
    message: "Choose a preset",
    choices: choices.filter((c) => !c.value.startsWith("_")),
    hint: "↑/↓ to browse, enter to select",
  });

  if (!presetName) return undefined;
  return getPresetInfo(presetName);
}

function suggestPresetsForProject(projectType: string): PresetInfo[] {
  const suggestions: Record<string, string[]> = {
    saas: ["sigil", "cobalt", "axiom", "onyx"],
    marketing: ["flux", "prism", "dusk", "sigil"],
    docs: ["crux", "etch", "glyph", "mono"],
    blog: ["rune", "strata", "mrkr", "etch"],
    portfolio: ["noir", "shard", "forge", "dsgn"],
    ecommerce: ["arc", "sigil", "helix", "prism"],
    startup: ["sigil", "flux", "cobalt", "arc"],
    custom: [],
  };

  return (suggestions[projectType] ?? [])
    .map((name) => PRESET_CATALOG.find((p) => p.name === name))
    .filter((p): p is PresetInfo => p !== undefined);
}

// ---------------------------------------------------------------------------
// Customization prompts
// ---------------------------------------------------------------------------

type CustomOverrides = {
  primaryColor?: string;
  displayFont?: string;
  bodyFont?: string;
  monoFont?: string;
};

async function askCustomizations(preset: PresetInfo): Promise<CustomOverrides> {
  const { wantCustom } = await prompts({
    type: "confirm",
    name: "wantCustom",
    message: `Customize ${chalk.cyan(preset.label)} preset? (fonts, colors)`,
    initial: false,
  });

  if (!wantCustom) return {};

  const overrides: CustomOverrides = {};

  const { customPrimary } = await prompts({
    type: "text",
    name: "customPrimary",
    message: `Primary color (OKLCH, e.g. "oklch(0.65 0.15 280)")`,
    initial: "",
    validate: (v: string) =>
      v === "" || /^oklch\([\d.\s]+\)$/.test(v) || "Must be oklch(L C H) format or empty to skip",
  });
  if (customPrimary) overrides.primaryColor = customPrimary;

  const { customDisplay } = await prompts({
    type: "text",
    name: "customDisplay",
    message: `Display font (current: ${preset.fonts.display})`,
    initial: "",
  });
  if (customDisplay) overrides.displayFont = customDisplay;

  const { customBody } = await prompts({
    type: "text",
    name: "customBody",
    message: `Body font (current: ${preset.fonts.body})`,
    initial: "",
  });
  if (customBody) overrides.bodyFont = customBody;

  const { customMono } = await prompts({
    type: "text",
    name: "customMono",
    message: `Monospace font (current: ${preset.fonts.mono})`,
    initial: "",
  });
  if (customMono) overrides.monoFont = customMono;

  return overrides;
}

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

function getDefaultFeatures(projectType: string): string[] {
  const defaults: Record<string, string[]> = {
    saas: ["primitives"],
    marketing: ["gsap", "motion", "grid"],
    docs: ["primitives"],
    blog: ["primitives"],
    portfolio: ["gsap", "motion", "grid"],
    ecommerce: ["primitives"],
    startup: ["primitives", "motion"],
    custom: [],
  };
  return defaults[projectType] ?? [];
}

function buildDefaultConfig(opts: { preset?: string; dir?: string }, detection: ProjectDetection): SigilConfig {
  const defaultDir = detection.hasSrc ? "src/components/ui" : "components/ui";
  const defaultTokens = detection.hasSrc ? "src/styles/sigil.tokens.css" : "styles/sigil.tokens.css";
  return {
    preset: opts.preset ?? DEFAULT_CONFIG.preset,
    componentsDir: opts.dir ?? defaultDir,
    tokensPath: defaultTokens,
    typescript: detection.hasTypescript,
  };
}

// ---------------------------------------------------------------------------
// Write everything
// ---------------------------------------------------------------------------

async function writeAll(
  config: SigilConfig,
  cwd: string,
  detection: ProjectDetection,
  features: string[],
  generateAgent: boolean,
  customOverrides: CustomOverrides = {},
  starterComponents: string[] = [],
): Promise<void> {
  console.log();

  // 1. Write config
  writeConfig(config, cwd);
  console.log(chalk.green("  ✓"), "Created sigil.config.ts");

  // 2. Write tokens CSS
  const componentsDir = path.join(cwd, config.componentsDir);
  fs.ensureDirSync(componentsDir);
  console.log(chalk.green("  ✓"), `Created ${config.componentsDir}/`);

  const tokensCss = generateTokensCss(config.preset, customOverrides);
  writeTokensCss(tokensCss, config.tokensPath, cwd);
  console.log(chalk.green("  ✓"), `Created ${config.tokensPath}`);

  // 3. Write agent instructions
  if (generateAgent) {
    const preset = getPresetInfo(config.preset);
    const agentContent = generateAgentInstructions(config, preset, detection, features);
    const agentPath = path.join(cwd, ".sigil", "AGENTS.md");
    fs.ensureDirSync(path.dirname(agentPath));
    fs.writeFileSync(agentPath, agentContent, "utf-8");
    console.log(chalk.green("  ✓"), "Created .sigil/AGENTS.md");
  }

  // 4. Add starter components (scaffold stubs)
  if (starterComponents.length > 0) {
    for (const comp of starterComponents) {
      const fileName = `${comp}.tsx`;
      const destPath = path.join(componentsDir, fileName);
      if (!fs.existsSync(destPath)) {
        const stub = generateComponentStub(comp);
        fs.writeFileSync(destPath, stub, "utf-8");
      }
    }
    console.log(chalk.green("  ✓"), `Added ${starterComponents.length} starter component(s)`);
  }

  // Print summary
  console.log();
  console.log(chalk.bold("  Sigil UI initialized."));
  console.log();
  console.log(`  Preset      ${chalk.cyan(config.preset)}`);
  console.log(`  Components  ${chalk.cyan(config.componentsDir)}`);
  console.log(`  Tokens      ${chalk.cyan(config.tokensPath)}`);
  if (features.length > 0) {
    console.log(`  Features    ${chalk.cyan(features.join(", "))}`);
  }
  console.log();

  // Print deps to install
  const depsToInstall = buildDependencyList(features);
  if (depsToInstall.length > 0) {
    const pm = PM_INSTALL[detection.packageManager];
    console.log(chalk.bold("  Install dependencies:"));
    console.log(`  ${chalk.cyan(`${pm} ${depsToInstall.join(" ")}`)}`);
    console.log();
  }

  // Print next steps
  console.log(chalk.bold("  Next steps:"));
  console.log();
  console.log(`  ${chalk.gray("1.")} Import tokens in your global CSS:`);
  console.log(`     ${chalk.cyan(`@import "${config.tokensPath}";`)}`);
  console.log(`  ${chalk.gray("2.")} Add more components:`);
  console.log(`     ${chalk.cyan("npx sigil add button card dialog")}`);
  console.log(`  ${chalk.gray("3.")} Validate your setup:`);
  console.log(`     ${chalk.cyan("npx sigil doctor")}`);
  console.log();
}

// ---------------------------------------------------------------------------
// Detection display
// ---------------------------------------------------------------------------

function printDetection(d: ProjectDetection): void {
  const items: string[] = [];
  if (d.framework !== "unknown") items.push(FRAMEWORK_LABELS[d.framework]);
  if (d.hasTypescript) items.push("TypeScript");
  if (d.hasTailwind) items.push("Tailwind CSS");
  items.push(d.packageManager);

  if (items.length > 0) {
    console.log(chalk.dim(`  Detected: ${items.join(" · ")}`));
    console.log();
  }
}

// ---------------------------------------------------------------------------
// CSS generation
// ---------------------------------------------------------------------------

function generateTokensCss(presetName: string, overrides: CustomOverrides = {}): string {
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

  return `/* Sigil UI tokens — generated by \`sigil init\`
 * Preset: ${presetName}
 * Edit this file to customize tokens, or run \`sigil preset <name>\` to swap.
 */

@import "@sigil-ui/tokens/css";
@import "@sigil-ui/presets/${presetName}";
${overrideBlock}`;
}

// ---------------------------------------------------------------------------
// Dependency builder
// ---------------------------------------------------------------------------

function buildDependencyList(features: string[]): string[] {
  const deps = ["@sigil-ui/tokens", "@sigil-ui/components"];

  if (features.includes("gsap")) deps.push("gsap");
  if (features.includes("motion")) deps.push("motion");
  if (features.includes("primitives")) {
    deps.push("@radix-ui/react-slot", "@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu", "@radix-ui/react-tabs", "@radix-ui/react-tooltip");
  }
  if (features.includes("pretext")) deps.push("pretext");

  return deps;
}

// ---------------------------------------------------------------------------
// Component stub generator
// ---------------------------------------------------------------------------

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

function abort(): undefined {
  console.log(chalk.yellow("  Aborted."));
  return undefined;
}
