import { Command } from "commander";
import chalk from "chalk";
import fs from "fs-extra";
import path from "node:path";
import { configExists, readConfig, writeTokensCss } from "../utils/config.js";
import { printIntro, symbols } from "../utils/terminal.js";

type ExtractedColor = {
  raw: string;
  rgb: [number, number, number];
  count: number;
};

type InspiredTokens = {
  primary: string;
  primaryHover: string;
  primaryMuted: string;
  backgroundLight: string;
  backgroundDark: string;
  surfaceLight: string;
  surfaceDark: string;
  textLight: string;
  textDark: string;
};

export const inspireCommand = new Command("inspire")
  .description("Draft a Sigil preset from a URL or saved HTML/CSS reference")
  .argument("<source>", "URL, local file, or raw color/style text")
  .option("-n, --name <name>", "custom preset name", "inspired")
  .option("-o, --out <dir>", "draft output directory", ".sigil/inspire")
  .option("--apply", "write the drafted token CSS to the active tokens file")
  .option("--no-demo", "skip creating a local reference demo page")
  .action(async (source: string, opts) => {
    const cwd = process.cwd();
    printIntro("Sigil Inspire", "Turn a reference into token drafts");

    if (!configExists(cwd)) {
      console.log(symbols.error, "No sigil.config.ts found. Run", chalk.cyan("sigil init"), "first.");
      process.exit(1);
    }

    const name = normalizeName(opts.name);
    const config = readConfig(cwd)!;
    const reference = await readReference(source);
    const colors = extractColors(reference);

    if (colors.length === 0) {
      console.log(symbols.warning, "No obvious colors found; using Sigil defaults as a draft.");
    }

    const tokens = draftTokens(colors);
    const css = renderTokenCss(name, source, tokens);
    const preset = renderPresetFile(name, tokens);
    const outDir = path.join(cwd, opts.out, name);

    fs.ensureDirSync(outDir);
    fs.writeFileSync(path.join(outDir, "tokens.css"), css, "utf-8");
    fs.writeFileSync(path.join(cwd, `sigil.preset.${name}.ts`), preset, "utf-8");

    if (opts.demo !== false) {
      const demoPath = path.join(cwd, "src", "app", "sigil-inspire", name, "page.tsx");
      fs.ensureDirSync(path.dirname(demoPath));
      fs.writeFileSync(demoPath, renderDemoPage(name), "utf-8");
      console.log(`  ${symbols.success} Created src/app/sigil-inspire/${name}/page.tsx`);
    }

    if (opts.apply) {
      writeTokensCss(css, config.tokensPath, cwd);
      console.log(`  ${symbols.success} Applied draft to ${config.tokensPath}`);
    }

    console.log(`  ${symbols.success} Created ${path.relative(cwd, path.join(outDir, "tokens.css"))}`);
    console.log(`  ${symbols.success} Created sigil.preset.${name}.ts`);
    console.log();
    console.log(chalk.bold("  Extracted signal"));
    for (const color of colors.slice(0, 6)) {
      console.log(`  ${chalk.gray("•")} ${color.raw} ${chalk.dim(`(${color.count}x)`)}`);
    }
    console.log();
    console.log(chalk.dim("  Review the draft, then apply it with:"));
    console.log(`  ${chalk.cyan(`sigil inspire ${source} --name ${name} --apply`)}`);
  });

async function readReference(source: string): Promise<string> {
  if (/^https?:\/\//.test(source)) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
      const response = await fetch(source, { signal: controller.signal });
      if (!response.ok) {
        throw new Error(`Failed to fetch ${source}: ${response.status}`);
      }
      return (await response.text()).slice(0, 250_000);
    } finally {
      clearTimeout(timeout);
    }
  }

  const filePath = path.resolve(source);
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, "utf-8").slice(0, 250_000);
  }

  return source;
}

function extractColors(input: string): ExtractedColor[] {
  const counts = new Map<string, ExtractedColor>();

  for (const match of input.matchAll(/#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/g)) {
    addColor(counts, match[0], hexToRgb(match[0]));
  }

  for (const match of input.matchAll(/rgb\(\s*(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})\s*\)|rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/g)) {
    const parts = match.slice(1).filter(Boolean).map(Number);
    addColor(counts, match[0], [parts[0]!, parts[1]!, parts[2]!]);
  }

  return [...counts.values()]
    .filter((color) => {
      const [r, g, b] = color.rgb;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      return max - min > 8 || max < 245;
    })
    .sort((a, b) => b.count - a.count);
}

function addColor(map: Map<string, ExtractedColor>, raw: string, rgb: [number, number, number] | null): void {
  if (!rgb) return;
  const key = rgb.join(",");
  const current = map.get(key);
  if (current) {
    current.count += 1;
  } else {
    map.set(key, { raw, rgb, count: 1 });
  }
}

function draftTokens(colors: ExtractedColor[]): InspiredTokens {
  const ranked = colors
    .map((color) => ({ ...color, hsl: rgbToHsl(...color.rgb) }))
    .sort((a, b) => b.hsl.s - a.hsl.s || b.count - a.count);

  const primary = ranked.find((color) => color.hsl.s > 0.18) ?? ranked[0];
  const primaryHue = primary?.hsl.h ?? 265;
  const neutral = colors
    .map((color) => ({ ...color, hsl: rgbToHsl(...color.rgb) }))
    .sort((a, b) => a.hsl.s - b.hsl.s || b.count - a.count)[0];
  const lightness = neutral?.hsl.l ?? 0.98;

  return {
    primary: `oklch(0.65 0.18 ${Math.round(primaryHue)})`,
    primaryHover: `oklch(0.58 0.2 ${Math.round(primaryHue)})`,
    primaryMuted: `oklch(0.92 0.04 ${Math.round(primaryHue)})`,
    backgroundLight: lightness > 0.35 ? "oklch(0.985 0.004 260)" : "oklch(0.13 0.012 260)",
    backgroundDark: "oklch(0.11 0.015 260)",
    surfaceLight: lightness > 0.35 ? "oklch(0.96 0.006 260)" : "oklch(0.18 0.016 260)",
    surfaceDark: "oklch(0.16 0.018 260)",
    textLight: lightness > 0.35 ? "oklch(0.18 0.014 260)" : "oklch(0.94 0.008 260)",
    textDark: "oklch(0.94 0.008 260)",
  };
}

function renderTokenCss(name: string, source: string, tokens: InspiredTokens): string {
  return `/* Sigil inspiration draft
 * Name: ${name}
 * Source: ${source}
 * Review before shipping. This is a token draft, not a pixel clone.
 */

@import "@sigil-ui/tokens/css";
@import "@sigil-ui/presets/sigil";

:root {
  --s-primary: ${tokens.primary};
  --s-primary-hover: ${tokens.primaryHover};
  --s-primary-muted: ${tokens.primaryMuted};
  --s-background: ${tokens.backgroundLight};
  --s-surface: ${tokens.surfaceLight};
  --s-surface-elevated: ${tokens.surfaceLight};
  --s-text: ${tokens.textLight};
  --s-bg-pattern: grid;
  --s-radius-card: var(--s-radius-lg);
}

[data-theme="dark"], .dark {
  --s-background: ${tokens.backgroundDark};
  --s-surface: ${tokens.surfaceDark};
  --s-surface-elevated: ${tokens.surfaceDark};
  --s-text: ${tokens.textDark};
}
`;
}

function renderPresetFile(name: string, tokens: InspiredTokens): string {
  const exportName = `${name.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}Preset`;
  return `import type { SigilPreset } from "@sigil-ui/tokens";
import { sigilPreset } from "@sigil-ui/presets/sigil";

export const ${exportName}: SigilPreset = {
  name: "${name}",
  tokens: {
    ...sigilPreset.tokens,
    colors: {
      ...sigilPreset.tokens.colors,
      primary: "${tokens.primary}",
      "primary-hover": "${tokens.primaryHover}",
      "primary-muted": "${tokens.primaryMuted}",
      background: { light: "${tokens.backgroundLight}", dark: "${tokens.backgroundDark}" },
      surface: { light: "${tokens.surfaceLight}", dark: "${tokens.surfaceDark}" },
      "surface-elevated": { light: "${tokens.surfaceLight}", dark: "${tokens.surfaceDark}" },
      text: { light: "${tokens.textLight}", dark: "${tokens.textDark}" },
    },
  },
  metadata: {
    description: "Inspired preset draft generated by sigil inspire",
    tags: ["inspired", "draft"],
    mood: "reference-derived",
  },
};
`;
}

function renderDemoPage(name: string): string {
  return `import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from "@sigil-ui/components";

export default function InspiredDemo() {
  return (
    <main className="min-h-screen bg-[var(--s-background)] px-6 py-16 text-[var(--s-text)]">
      <section className="mx-auto max-w-[var(--s-content-max,1120px)]">
        <Badge variant="outline">Inspired draft / ${name}</Badge>
        <h1 className="mt-6 max-w-3xl text-balance font-[family-name:var(--s-font-display)] text-5xl font-bold tracking-tight">
          A reference-derived Sigil identity, ready for token refinement.
        </h1>
        <p className="mt-5 max-w-2xl text-pretty text-[var(--s-text-muted)]">
          This page is generated by sigil inspire so you can see the extracted colors on real Sigil components before committing to the preset.
        </p>
        <div className="mt-8 flex gap-3">
          <Button>Apply direction</Button>
          <Button variant="outline">Compare tokens</Button>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {["Primary", "Surface", "Motion"].map((title) => (
            <Card key={title} hoverable>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-[var(--s-text-muted)]">
                Uses the generated token draft rather than copied component styling.
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
`;
}

function normalizeName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "inspired";
}

function hexToRgb(hex: string): [number, number, number] | null {
  const raw = hex.slice(1);
  const full = raw.length === 3 ? raw.split("").map((ch) => `${ch}${ch}`).join("") : raw;
  const value = Number.parseInt(full, 16);
  if (Number.isNaN(value)) return null;
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h = max === rn
    ? ((gn - bn) / d + (gn < bn ? 6 : 0)) * 60
    : max === gn
      ? ((bn - rn) / d + 2) * 60
      : ((rn - gn) / d + 4) * 60;
  return { h, s, l };
}
