import { Command } from "commander";
import prompts from "prompts";
import chalk from "chalk";
import {
  configExists,
  DEFAULT_CONFIG,
  type SigilConfig,
} from "../utils/config.js";
import {
  FEATURE_OPTIONS,
  PRESET_CATALOG,
  PROJECT_TYPES,
  getPresetInfo,
  type PresetInfo,
} from "../utils/presets.js";
import {
  FRAMEWORK_LABELS,
  detectProject,
  type ProjectDetection,
} from "../utils/detect.js";
import {
  printInstallHint,
  writeSigilSetup,
  type CustomOverrides,
} from "../utils/setup.js";
import { printIntro, printSuccess, symbols } from "../utils/terminal.js";

export const convertCommand = new Command("convert")
  .description("Convert an existing project to Sigil UI")
  .option("-p, --preset <preset>", "preset to use")
  .option("-d, --dir <dir>", "components directory")
  .option("-y, --yes", "skip prompts, use defaults")
  .option("--no-agent", "skip generating agent instructions")
  .option("--no-install", "skip dependency installation")
  .option("--no-inject-css", "skip global CSS import injection")
  .option("--dry-run", "print planned changes without writing files")
  .option("--overwrite", "overwrite an existing sigil.config.ts")
  .action(async (opts) => {
    const cwd = process.cwd();

    printIntro("Sigil Convert", "Adopt Sigil UI in an existing project");

    const detection = detectProject(cwd);
    printDetection(detection);

    if (configExists(cwd) && !opts.overwrite) {
      const { overwrite } = opts.yes
        ? { overwrite: false }
        : await prompts({
            type: "confirm",
            name: "overwrite",
            message: "sigil.config.ts already exists. Overwrite?",
            initial: false,
          });
      if (!overwrite) {
        console.log(chalk.yellow("  Aborted. Pass --overwrite to replace the existing Sigil config."));
        return;
      }
    }

    const config = opts.yes
      ? buildDefaultConfig(opts, detection)
      : await buildInteractiveConfig(opts, detection);
    if (!config) return abort();

    const projectType = opts.yes ? "custom" : (config.projectType ?? "custom");
    const features = opts.yes ? getDefaultFeatures(projectType) : (config.features ?? []);
    const generateAgent = opts.agent !== false;
    const starterComponents = opts.yes
      ? ["button", "card", "input"]
      : await askStarterComponents(features);
    if (!starterComponents) return abort();

    const customOverrides = opts.yes ? {} : await askCustomizations(getPresetInfo(config.preset));

    console.log();
    const result = await writeSigilSetup({
      cwd,
      config,
      detection,
      features,
      generateAgent,
      customOverrides,
      starterComponents,
      updatePackageJson: true,
      install: opts.install !== false,
      injectCss: opts.injectCss !== false,
      dryRun: opts.dryRun === true,
      generator: "sigil convert",
    });

    printSuccess(opts.dryRun ? "Sigil conversion dry run complete." : "Project converted to Sigil UI.", [
      ["Preset", config.preset],
      ["Components", config.componentsDir],
      ["Tokens", config.tokensPath],
      ["Global CSS", result.cssImportPath ?? detection.globalCssPath ?? undefined],
    ]);

    if (opts.install === false) {
      printInstallHint(detection, result.depsToInstall);
    }

    console.log(chalk.bold("  Next steps:"));
    console.log(`  ${chalk.gray("1.")} Validate the conversion:`);
    console.log(`     ${chalk.cyan("npx @sigil-ui/cli doctor")}`);
    console.log(`  ${chalk.gray("2.")} Add more components:`);
    console.log(`     ${chalk.cyan("npx @sigil-ui/cli add button card dialog")}`);
    console.log();
  });

async function buildInteractiveConfig(
  opts: { preset?: string; dir?: string },
  detection: ProjectDetection,
): Promise<SigilConfig | undefined> {
  const { projectType } = await prompts({
    type: "select",
    name: "projectType",
    message: "What kind of project are you converting?",
    choices: PROJECT_TYPES.map((t) => ({
      title: t.label,
      value: t.value,
      description: t.description,
    })),
  });
  if (projectType === undefined) return undefined;

  const preset = opts.preset ? getPresetInfo(opts.preset) : await selectPreset(projectType);
  if (!preset) return undefined;

  const { features } = await prompts({
    type: "multiselect",
    name: "features",
    message: "Which Sigil features should be enabled?",
    choices: FEATURE_OPTIONS.map((f) => ({
      title: f.label,
      value: f.value,
      description: f.description,
      selected: getDefaultFeatures(projectType).includes(f.value),
    })),
    hint: "space to toggle, enter to confirm",
  });
  if (!features) return undefined;

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
  if (!componentsDir || !tokensPath) return undefined;

  return {
    preset: preset.name,
    componentsDir,
    tokensPath,
    typescript: detection.hasTypescript,
    features,
    projectType,
  };
}

async function selectPreset(projectType: string): Promise<PresetInfo | undefined> {
  const suggestedNames = suggestPresetsForProject(projectType);
  const choices = PRESET_CATALOG.map((p) => ({
    title: suggestedNames.includes(p.name) ? `${p.label} ${chalk.dim("(recommended)")}` : p.label,
    value: p.name,
    description: p.description,
  }));
  const { presetName } = await prompts({
    type: "select",
    name: "presetName",
    message: "Choose a preset",
    choices,
  });
  if (!presetName) return undefined;
  return getPresetInfo(presetName);
}

async function askStarterComponents(features: string[]): Promise<string[] | undefined> {
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
  return starterComponents;
}

async function askCustomizations(preset: PresetInfo | undefined): Promise<CustomOverrides> {
  const label = preset?.label ?? "selected";
  const { wantCustom } = await prompts({
    type: "confirm",
    name: "wantCustom",
    message: `Customize ${chalk.cyan(label)} preset? (fonts, colors)`,
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
    message: `Display font${preset ? ` (current: ${preset.fonts.display})` : ""}`,
    initial: "",
  });
  if (customDisplay) overrides.displayFont = customDisplay;

  const { customBody } = await prompts({
    type: "text",
    name: "customBody",
    message: `Body font${preset ? ` (current: ${preset.fonts.body})` : ""}`,
    initial: "",
  });
  if (customBody) overrides.bodyFont = customBody;

  const { customMono } = await prompts({
    type: "text",
    name: "customMono",
    message: `Monospace font${preset ? ` (current: ${preset.fonts.mono})` : ""}`,
    initial: "",
  });
  if (customMono) overrides.monoFont = customMono;

  return overrides;
}

function buildDefaultConfig(opts: { preset?: string; dir?: string }, detection: ProjectDetection): SigilConfig {
  const defaultDir = detection.hasSrc ? "src/components/ui" : "components/ui";
  const defaultTokens = detection.hasSrc ? "src/styles/sigil.tokens.css" : "styles/sigil.tokens.css";
  return {
    preset: opts.preset ?? DEFAULT_CONFIG.preset,
    componentsDir: opts.dir ?? defaultDir,
    tokensPath: defaultTokens,
    typescript: detection.hasTypescript,
    features: getDefaultFeatures("custom"),
    projectType: "custom",
  };
}

function getDefaultFeatures(projectType: string): string[] {
  const defaults: Record<string, string[]> = {
    saas: ["primitives"],
    marketing: ["gsap", "motion", "grid"],
    docs: ["primitives"],
    blog: ["primitives"],
    portfolio: ["gsap", "motion", "grid"],
    ecommerce: ["primitives"],
    startup: ["primitives", "motion"],
    custom: ["primitives"],
  };
  return defaults[projectType] ?? defaults.custom;
}

function suggestPresetsForProject(projectType: string): string[] {
  const suggestions: Record<string, string[]> = {
    saas: ["sigil", "cobalt", "axiom", "onyx"],
    marketing: ["flux", "prism", "dusk", "sigil"],
    docs: ["crux", "etch", "glyph", "mono"],
    blog: ["rune", "strata", "mrkr", "etch"],
    portfolio: ["noir", "shard", "forge", "dsgn"],
    ecommerce: ["arc", "sigil", "helix", "prism"],
    startup: ["sigil", "flux", "cobalt", "arc"],
    custom: ["sigil", "crux", "mono"],
  };
  return suggestions[projectType] ?? suggestions.custom;
}

function printDetection(d: ProjectDetection): void {
  const items: string[] = [];
  if (d.framework !== "unknown") items.push(FRAMEWORK_LABELS[d.framework]);
  if (d.hasTypescript) items.push("TypeScript");
  if (d.hasTailwind) items.push("Tailwind CSS");
  if (d.globalCssPath) items.push(d.globalCssPath);
  items.push(d.packageManager);

  console.log(`  ${symbols.bullet} Detected: ${items.join(" · ")}`);
  console.log();
}

function abort(): undefined {
  console.log(chalk.yellow("  Aborted."));
  return undefined;
}

