import { Command } from "commander";
import prompts from "prompts";
import chalk from "chalk";
import {
  configExists,
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
  type ProjectDetection,
} from "../utils/detect.js";
import {
  printInstallHint,
  type CustomOverrides,
  writeSigilSetup,
} from "../utils/setup.js";
import { printIntro, printSuccess } from "../utils/terminal.js";

export const initCommand = new Command("init")
  .description("Initialize Sigil UI in the current project")
  .option("-p, --preset <preset>", "preset to use")
  .option("-d, --dir <dir>", "components directory")
  .option("-y, --yes", "skip prompts, use defaults")
  .option("--no-agent", "skip generating agent instructions")
  .option("--install", "install dependencies after writing files")
  .option("--no-install", "skip dependency installation")
  .option("--inject-css", "inject token import into detected global CSS")
  .option("--no-inject-css", "skip global CSS import injection")
  .option("--dry-run", "print planned changes without writing files")
  .action(async (opts) => {
    const cwd = process.cwd();

    printIntro("Sigil UI", "Structural-visibility design system");

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
      await writeAll(config, cwd, detection, [], opts.agent !== false, {}, [], opts);
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

    await writeAll(config, cwd, detection, features, generateAgent, customOverrides, starterComponents, opts);
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

  const categoryOrder: PresetCategory[] = ["structural", "minimal", "dark", "colorful", "editorial", "industrial", "edgeless"];

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
  opts: { install?: boolean; injectCss?: boolean; dryRun?: boolean } = {},
): Promise<void> {
  console.log();

  const result = await writeSigilSetup({
    cwd,
    config,
    detection,
    features,
    generateAgent,
    customOverrides,
    starterComponents,
    install: opts.install === true,
    injectCss: opts.injectCss === true,
    dryRun: opts.dryRun === true,
    generator: "sigil init",
  });

  // Print summary
  printSuccess("Sigil UI initialized.", [
    ["Preset", config.preset],
    ["Components", config.componentsDir],
    ["Tokens", config.tokensPath],
    ["Features", features.length > 0 ? features.join(", ") : undefined],
  ]);

  // Print deps to install
  if (!opts.install) {
    printInstallHint(detection, result.depsToInstall);
  }

  // Print next steps
  console.log(chalk.bold("  Next steps:"));
  console.log();
  console.log(`  ${chalk.gray("1.")} Import tokens in your global CSS:`);
  console.log(`     ${chalk.cyan(`@import "${config.tokensPath}";`)}`);
  console.log(`  ${chalk.gray("2.")} Add more components:`);
  console.log(`     ${chalk.cyan("npx @sigil-ui/cli add button card dialog")}`);
  console.log(`  ${chalk.gray("3.")} Validate your setup:`);
  console.log(`     ${chalk.cyan("npx @sigil-ui/cli doctor")}`);
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

function abort(): undefined {
  console.log(chalk.yellow("  Aborted."));
  return undefined;
}
