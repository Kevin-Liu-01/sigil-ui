import { Command } from "commander";
import prompts from "prompts";
import chalk from "chalk";
import fs from "fs-extra";
import path from "node:path";
import { readConfig, writeConfig, writeTokensCss, configExists } from "../utils/config.js";
import {
  PRESET_CATALOG,
  getPresetsByCategory,
  getCategoryLabel,
  getPresetInfo,
  PRESET_NAMES,
  type PresetCategory,
} from "../utils/presets.js";

export const presetCommand = new Command("preset")
  .description("Swap presets, browse the catalog, or scaffold a custom preset")
  .argument("[name]", 'preset name, "list" to browse, or "create" to scaffold custom')
  .action(async (name: string | undefined) => {
    const cwd = process.cwd();

    if (!configExists(cwd)) {
      console.log(
        chalk.red("  ✗"),
        "No sigil.config.ts found. Run",
        chalk.cyan("sigil init"),
        "first.",
      );
      process.exit(1);
    }

    if (name === "create") {
      await scaffoldCustomPreset(cwd);
      return;
    }

    if (name === "list") {
      printCatalog();
      return;
    }

    if (!name) {
      const config = readConfig(cwd)!;
      const current = getPresetInfo(config.preset);

      console.log();
      console.log(`  Current preset: ${chalk.bold.cyan(config.preset)}`);
      if (current) {
        console.log(`  ${chalk.dim(current.description)}`);
        console.log(`  ${chalk.dim(`Fonts: ${current.fonts.display} / ${current.fonts.body} / ${current.fonts.mono}`)}`);
      }
      console.log();
      console.log(`  ${chalk.cyan("sigil preset list")}       Browse all ${PRESET_CATALOG.length} presets`);
      console.log(`  ${chalk.cyan("sigil preset <name>")}     Switch to a preset`);
      console.log(`  ${chalk.cyan("sigil preset create")}     Scaffold a custom preset`);
      console.log();
      return;
    }

    // Validate preset name
    const isBuiltin = PRESET_NAMES.includes(name as (typeof PRESET_NAMES)[number]);
    const customPath = path.join(cwd, `sigil.preset.${name}.ts`);

    if (!isBuiltin && !fs.existsSync(customPath)) {
      console.log(
        chalk.red("  ✗"),
        `Unknown preset "${name}".`,
      );
      console.log();
      console.log(`  Run ${chalk.cyan("sigil preset list")} to browse available presets.`);
      return;
    }

    const config = readConfig(cwd)!;
    const previousPreset = config.preset;
    const updatedConfig = { ...config, preset: name };
    writeConfig(updatedConfig, cwd);

    const tokensCss = generatePresetTokensCss(name);
    writeTokensCss(tokensCss, config.tokensPath, cwd);

    const info = getPresetInfo(name);
    console.log();
    console.log(
      chalk.green("  ✓"),
      `Switched from ${chalk.dim(previousPreset)} to ${chalk.bold.cyan(name)}`,
    );
    if (info) {
      console.log(`    ${chalk.dim(info.description)}`);
    }
    console.log(chalk.green("  ✓"), `Updated ${config.tokensPath}`);
    console.log();
  });

function printCatalog(): void {
  const categories = getPresetsByCategory();
  const categoryOrder: PresetCategory[] = ["structural", "minimal", "dark", "colorful", "editorial", "industrial"];

  console.log();
  console.log(chalk.bold(`  Sigil Presets (${PRESET_CATALOG.length} available)`));
  console.log();

  for (const cat of categoryOrder) {
    const presets = categories.get(cat);
    if (!presets) continue;

    console.log(chalk.bold(`  ${getCategoryLabel(cat)}`));
    for (const p of presets) {
      console.log(
        `    ${chalk.cyan(p.name.padEnd(10))} ${p.description}`,
      );
      console.log(
        `    ${" ".repeat(10)} ${chalk.dim(`${p.fonts.display} / ${p.fonts.body} / ${p.fonts.mono}`)}`,
      );
    }
    console.log();
  }
}

async function scaffoldCustomPreset(cwd: string): Promise<void> {
  const { name } = await prompts({
    type: "text",
    name: "name",
    message: "Custom preset name",
    validate: (v: string) =>
      /^[a-z][a-z0-9-]*$/.test(v) || "Lowercase alphanumeric with hyphens",
  });

  if (!name) {
    console.log(chalk.yellow("  Aborted."));
    return;
  }

  // Ask which preset to use as a base
  const { baseName } = await prompts({
    type: "select",
    name: "baseName",
    message: "Base preset to start from",
    choices: [
      { title: "Sigil (default)", value: "sigil" },
      { title: "Crux (minimal)", value: "crux" },
      { title: "Noir (dark cinematic)", value: "noir" },
      { title: "Prism (colorful)", value: "prism" },
      { title: "Mono (monospace)", value: "mono" },
      { title: "Blank (full scaffold)", value: "_blank" },
    ],
  });

  if (!baseName) {
    console.log(chalk.yellow("  Aborted."));
    return;
  }

  // Ask for primary color
  const { primaryColor } = await prompts({
    type: "text",
    name: "primaryColor",
    message: "Primary color (OKLCH, or empty for default)",
    initial: "",
    validate: (v: string) =>
      v === "" || /^oklch\([\d.\s/]+\)$/.test(v) || "Must be oklch(L C H) format",
  });

  // Ask for display font
  const { displayFont } = await prompts({
    type: "text",
    name: "displayFont",
    message: "Display font (or empty for default)",
    initial: "",
  });

  const presetPath = path.join(cwd, `sigil.preset.${name}.ts`);

  if (fs.existsSync(presetPath)) {
    console.log(chalk.red("  ✗"), `${presetPath} already exists.`);
    return;
  }

  const content = generateCustomPresetFile(name, baseName, primaryColor, displayFont);
  fs.writeFileSync(presetPath, content, "utf-8");

  console.log();
  console.log(chalk.green("  ✓"), `Created ${path.basename(presetPath)}`);
  console.log();
  console.log("  Activate it:");
  console.log(`    ${chalk.cyan(`sigil preset ${name}`)}`);
  console.log();
}

function generateCustomPresetFile(
  name: string,
  baseName: string,
  primaryColor: string,
  displayFont: string,
): string {
  const camel = name.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

  const primaryLine = primaryColor
    ? `      primary: "${primaryColor}",\n      "primary-hover": "${primaryColor}",\n      "primary-muted": "${primaryColor}",\n`
    : `      primary: "oklch(0.65 0.15 280)",\n      "primary-hover": "oklch(0.60 0.18 280)",\n      "primary-muted": "oklch(0.90 0.04 280)",\n`;

  const fontLine = displayFont
    ? `      "font-display": '"${displayFont}", system-ui, sans-serif',\n`
    : `      "font-display": '"Nacelle", system-ui, sans-serif',\n`;

  return `import type { SigilPreset } from "@sigil-ui/tokens";
${baseName !== "_blank" ? `import { ${baseName}Preset } from "@sigil-ui/presets/${baseName}";\n` : ""}
export const ${camel}Preset: SigilPreset = {
  name: "${name}",
${baseName !== "_blank" ? `  tokens: {\n    ...${baseName}Preset.tokens,\n    colors: {\n      ...${baseName}Preset.tokens.colors,\n${primaryLine}    },\n    typography: {\n      ...${baseName}Preset.tokens.typography,\n${fontLine}    },\n  },` : `  tokens: {
    colors: {
      background: { light: "oklch(0.99 0 0)", dark: "oklch(0.07 0.01 280)" },
      surface: { light: "oklch(0.97 0 0)", dark: "oklch(0.12 0.01 280)" },
      "surface-elevated": { light: "oklch(0.98 0 0)", dark: "oklch(0.15 0.01 280)" },
${primaryLine}      secondary: "oklch(0.70 0.12 60)",
      text: { light: "oklch(0.15 0 0)", dark: "oklch(0.93 0 0)" },
      "text-secondary": { light: "oklch(0.40 0 0)", dark: "oklch(0.70 0 0)" },
      "text-muted": { light: "oklch(0.55 0 0)", dark: "oklch(0.55 0 0)" },
      "text-subtle": { light: "oklch(0.70 0 0)", dark: "oklch(0.40 0 0)" },
      "text-disabled": { light: "oklch(0.80 0 0)", dark: "oklch(0.30 0 0)" },
      border: { light: "oklch(0.90 0 0)", dark: "oklch(0.22 0 0)" },
      "border-muted": { light: "oklch(0.94 0 0)", dark: "oklch(0.18 0 0)" },
      "border-strong": { light: "oklch(0.80 0 0)", dark: "oklch(0.35 0 0)" },
      "border-interactive": { light: "oklch(0.65 0.15 280)", dark: "oklch(0.65 0.15 280)" },
      success: "oklch(0.65 0.17 160)",
      warning: "oklch(0.75 0.15 85)",
      error: "oklch(0.60 0.20 25)",
      info: "oklch(0.60 0.15 250)",
    },
    typography: {
${fontLine}      "font-body": "system-ui, -apple-system, sans-serif",
      "font-mono": '"Roboto Mono", ui-monospace, monospace',
    },
    spacing: {
      scale: [4, 8, 12, 16, 24, 32, 48, 64, 80, 96],
      unit: "px",
    },
    sigil: {
      "grid-cell": "48px",
      "cross-arm": "10px",
      "cross-stroke": "1.5px",
      "rail-gap": "24px",
      "card-radius": "10px",
    },
    radius: { none: "0px", sm: "4px", md: "8px", lg: "12px", xl: "16px", "2xl": "24px", full: "9999px" },
    shadows: {
      sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      md: "0 0 0 1px rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06), 0 2px 4px 0 rgb(0 0 0 / 0.04)",
      lg: "0 0 0 1px rgb(0 0 0 / 0.04), 0 2px 4px -2px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08)",
      xl: "0 0 0 1px rgb(0 0 0 / 0.03), 0 4px 6px -4px rgb(0 0 0 / 0.06), 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 20px 25px -5px rgb(0 0 0 / 0.06)",
    },
    motion: {
      duration: { instant: "0ms", fast: "150ms", normal: "250ms", slow: "400ms", slower: "600ms" },
      easing: {
        default: "cubic-bezier(0.16, 1, 0.3, 1)",
        in: "cubic-bezier(0.55, 0, 1, 0.45)",
        out: "cubic-bezier(0, 0.55, 0.45, 1)",
        "in-out": "cubic-bezier(0.45, 0, 0.55, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
    borders: {
      width: { none: "0px", thin: "1px", medium: "1.5px", thick: "2px" },
    },
  },`}
  metadata: {
    description: "Custom preset — edit all tokens above",
    author: "you",
    version: "0.1.0",
  },
};
`;
}

function generatePresetTokensCss(presetName: string): string {
  return `/* Sigil UI tokens — generated by \`sigil preset ${presetName}\`
 * Preset: ${presetName}
 * Edit this file to customize tokens, or run \`sigil preset <name>\` to swap.
 */

@import "@sigil-ui/tokens/css";
@import "@sigil-ui/presets/${presetName}";

/* Override tokens here:
:root {
  --sigil-primary: oklch(0.65 0.15 280);
}
*/
`;
}
