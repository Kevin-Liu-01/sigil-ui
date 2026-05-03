import { Command } from "commander";
import chalk from "chalk";
import fs from "fs-extra";
import path from "node:path";
import { configExists, readConfig } from "../utils/config.js";
import { printIntro, symbols } from "../utils/terminal.js";

export const designCommand = new Command("design")
  .description("Generate, compile, and sync a unified DESIGN.md reference");

// ---------------------------------------------------------------------------
// sigil design generate
// ---------------------------------------------------------------------------

designCommand
  .command("generate")
  .description("Create DESIGN.md from the active preset and token overrides")
  .option("-o, --out <path>", "output file path", "DESIGN.md")
  .option("-p, --preset <name>", "preset to base on (defaults to config)")
  .action(async (opts) => {
    const cwd = process.cwd();
    printIntro("Sigil Design", "Generate unified design reference");

    const { compileDesignMd } = await import("@sigil-ui/tokens");
    const { defaultTokens } = await import("@sigil-ui/tokens");

    let presetName = opts.preset ?? "sigil";
    let presetTokens = defaultTokens;

    if (configExists(cwd)) {
      const config = readConfig(cwd)!;
      presetName = opts.preset ?? config.preset;
    }

    try {
      const presetModule = await import(`@sigil-ui/presets/${presetName}`);
      const preset = presetModule.default ?? presetModule[`${presetName}Preset`];
      if (preset?.tokens) presetTokens = preset.tokens;
    } catch {
      console.log(symbols.warning, `Preset "${presetName}" not found, using defaults.`);
    }

    const doc = {
      metadata: {
        brand: path.basename(cwd),
        tagline: "A token-driven design system.",
        theme: "adaptive" as const,
        preset: presetName,
        density: "balanced" as const,
        description: `Design reference generated from the ${presetName} preset. Edit token tables to customize, then run \`sigil design sync\` to recompile.`,
      },
      tokens: presetTokens,
      components: [
        { name: "Primary Button", description: "Solid `--s-primary` background, `--s-radius-button` corners, `--s-text-inverse` text. Hover applies `--s-button-hover-effect` with `--s-duration-fast` transition." },
        { name: "Secondary Button", description: "Transparent background with `--s-border-interactive` border. Text uses `--s-primary`. Hover fills with `--s-primary-muted`." },
        { name: "Card", description: "`--s-surface` background, `--s-card-border-style` border at `--s-card-border-width`. Hover triggers `--s-card-hover-effect`. Padding at `--s-card-padding`." },
        { name: "Input", description: "`--s-surface` background, `--s-input-border-width` border. Focus shows `--s-focus-ring-width` ring in `--s-focus-ring-color`. Height at `--s-input-height`." },
      ],
      surfaces: [
        { level: 0, name: "Background", value: "var(--s-background)", purpose: "Base page background" },
        { level: 1, name: "Surface", value: "var(--s-surface)", purpose: "Card and panel background" },
        { level: 2, name: "Elevated", value: "var(--s-surface-elevated)", purpose: "Raised surfaces (modals, popovers)" },
      ],
      dos: [
        "Use OKLCH for all color values — perceptual uniformity across the gamut.",
        "Reference `var(--s-*)` tokens in all custom CSS — never hardcode.",
        "Apply `--s-duration-fast` for micro-interactions under 200ms.",
        "Use the spacing scale (multiples of 4/8) for all gaps and padding.",
        "Keep shadows layered using the token shadow scale (`sm` → `xl`).",
        "Use concentric border-radius (outer radius = inner + padding).",
      ],
      donts: [
        "Do not hardcode hex/rgb colors in component files.",
        "Do not use arbitrary Tailwind values (e.g. `text-[#ff0000]`).",
        "Do not bypass the spacing scale with pixel values.",
        "Do not add shadows outside the token shadow system.",
        "Do not use `duration-150` — use `duration-[var(--s-duration-fast)]`.",
        "Do not introduce new font families without adding them to typography tokens.",
      ],
      imagery: "Product-forward imagery contained within card structures. Minimal photography; emphasis on UI screenshots and code. Icons are monochrome using `--s-text-muted` fills.",
      layout: `Page max-width at \`--s-content-max\`. Hero sections use \`--s-hero-layout\` (centered/split/stacked). Content sections alternate backgrounds when \`--s-rhythm-alternate-bg\` is enabled. Navigation is \`--s-navbar-position\` at \`--s-navbar-height\`.`,
      similarBrands: [
        "**Linear** — Precision typography, subtle neutral palette, nuanced elevation.",
        "**Stripe** — Clean light UI, measured accent colors, professional documentation.",
        "**Vercel** — Dark-first, monospace accents, developer-focused clarity.",
      ],
    };

    const output = compileDesignMd(doc);
    const outPath = path.resolve(cwd, opts.out);
    fs.writeFileSync(outPath, output, "utf-8");

    console.log(symbols.success, `Generated ${chalk.cyan(path.relative(cwd, outPath))}`);
    console.log(symbols.bullet, `Preset: ${chalk.yellow(presetName)}`);
    console.log(symbols.bullet, `Tokens: 519 fields across 33 categories`);
    console.log(symbols.bullet, `Includes: CSS + Tailwind v4 + W3C JSON compile sections`);
    console.log();
    console.log("  Edit the token tables, then run", chalk.cyan("sigil design sync"), "to recompile.");
    console.log();
  });

// ---------------------------------------------------------------------------
// sigil design compile
// ---------------------------------------------------------------------------

designCommand
  .command("compile")
  .description("Parse DESIGN.md and output CSS, Tailwind, and JSON files")
  .option("-i, --input <path>", "input DESIGN.md path", "DESIGN.md")
  .option("-o, --out <dir>", "output directory", ".sigil/compiled")
  .action(async (opts) => {
    const cwd = process.cwd();
    printIntro("Sigil Design", "Compile design reference to output files");

    const inputPath = path.resolve(cwd, opts.input);
    if (!fs.existsSync(inputPath)) {
      console.log(symbols.error, `File not found: ${chalk.red(opts.input)}`);
      console.log("  Run", chalk.cyan("sigil design generate"), "first.");
      process.exit(1);
    }

    const { parseDesignMarkdown, compileToCss, compileToTailwind, compileToW3CJson } = await import("@sigil-ui/tokens");

    const markdown = fs.readFileSync(inputPath, "utf-8");
    const doc = parseDesignMarkdown(markdown);

    const outDir = path.resolve(cwd, opts.out);
    fs.ensureDirSync(outDir);

    const cssOutput = compileToCss(doc.tokens);
    const tailwindOutput = compileToTailwind(doc.tokens);
    const jsonOutput = compileToW3CJson(doc.tokens);

    fs.writeFileSync(path.join(outDir, "tokens.css"), cssOutput, "utf-8");
    fs.writeFileSync(path.join(outDir, "tokens.tailwind.css"), `@import "./tokens.css";\n\n${tailwindOutput}`, "utf-8");
    fs.writeFileSync(path.join(outDir, "tokens.json"), jsonOutput, "utf-8");

    console.log(symbols.success, `Compiled to ${chalk.cyan(path.relative(cwd, outDir))}/`);
    console.log(symbols.bullet, `tokens.css — CSS custom properties (:root + dark)`);
    console.log(symbols.bullet, `tokens.tailwind.css — Tailwind v4 @theme block`);
    console.log(symbols.bullet, `tokens.json — W3C Design Tokens format`);
    console.log();
  });

// ---------------------------------------------------------------------------
// sigil design sync
// ---------------------------------------------------------------------------

designCommand
  .command("sync")
  .description("Update Compile sections in DESIGN.md from token tables above them")
  .option("-f, --file <path>", "DESIGN.md path", "DESIGN.md")
  .action(async (opts) => {
    const cwd = process.cwd();
    printIntro("Sigil Design", "Sync compile sections");

    const filePath = path.resolve(cwd, opts.file);
    if (!fs.existsSync(filePath)) {
      console.log(symbols.error, `File not found: ${chalk.red(opts.file)}`);
      process.exit(1);
    }

    const { parseDesignMarkdown, compileToCss, compileToTailwind, compileToW3CJson } = await import("@sigil-ui/tokens");

    const markdown = fs.readFileSync(filePath, "utf-8");
    const doc = parseDesignMarkdown(markdown);

    const cssOutput = compileToCss(doc.tokens);
    const tailwindOutput = compileToTailwind(doc.tokens);
    const jsonOutput = compileToW3CJson(doc.tokens);

    let updated = markdown;

    updated = replaceCompileSection(updated, "Compile — CSS", "css", cssOutput);
    updated = replaceCompileSection(updated, "Compile — Tailwind v4", "css", tailwindOutput);
    updated = replaceCompileSection(updated, "Compile — W3C Design Tokens", "json", jsonOutput);

    fs.writeFileSync(filePath, updated, "utf-8");
    console.log(symbols.success, `Synced compile sections in ${chalk.cyan(opts.file)}`);
    console.log();
  });

// ---------------------------------------------------------------------------
// sigil design extract
// ---------------------------------------------------------------------------

designCommand
  .command("extract")
  .description("Extract a full DESIGN.md from a reference URL")
  .argument("<url>", "URL to extract design tokens from")
  .option("-o, --out <path>", "output file path", "DESIGN.md")
  .option("-n, --name <name>", "brand name override")
  .action(async (url: string, opts) => {
    const cwd = process.cwd();
    printIntro("Sigil Design", "Extract design reference from URL");

    const { compileDesignMd } = await import("@sigil-ui/tokens");
    const { defaultTokens } = await import("@sigil-ui/tokens");

    console.log(symbols.bullet, `Fetching ${chalk.cyan(url)}...`);

    let html: string;
    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(10000),
        headers: { "User-Agent": "Sigil-Design-Extractor/1.0" },
      });
      html = (await response.text()).slice(0, 300_000);
    } catch (err) {
      console.log(symbols.error, `Failed to fetch: ${(err as Error).message}`);
      process.exit(1);
    }

    const colors = extractColorsFromHtml(html);
    const fonts = extractFontsFromHtml(html);
    const radii = extractRadiiFromHtml(html);
    const shadows = extractShadowsFromHtml(html);
    const brandName = opts.name ?? extractBrandName(html, url);

    const tokens = { ...defaultTokens };

    if (colors.primary) {
      (tokens as Record<string, unknown>).colors = {
        ...tokens.colors,
        primary: colors.primary,
        "primary-hover": colors.primaryHover ?? colors.primary,
      };
    }

    if (fonts.display) {
      (tokens as Record<string, unknown>).typography = {
        ...tokens.typography,
        "font-display": fonts.display,
        "font-body": fonts.body ?? fonts.display,
        "font-mono": fonts.mono ?? tokens.typography["font-mono"],
      };
    }

    const doc = {
      metadata: {
        brand: brandName,
        tagline: `Design reference extracted from ${new URL(url).hostname}.`,
        theme: "light" as const,
        preset: "custom",
        density: "balanced" as const,
        description: `Tokens extracted from ${url}. Colors converted to OKLCH. Edit values and run \`sigil design sync\` to recompile.`,
      },
      tokens,
      components: [] as { name: string; description: string }[],
      surfaces: [] as { level: number; name: string; value: string; purpose: string }[],
      dos: [
        "Use OKLCH for all color values.",
        "Reference `var(--s-*)` tokens in custom CSS.",
        "Apply the spacing scale for consistent rhythm.",
      ],
      donts: [
        "Do not hardcode hex colors extracted above — use the token variables.",
        "Do not bypass the spacing scale with arbitrary pixel values.",
      ],
      imagery: "",
      layout: "",
      similarBrands: [] as string[],
    };

    const output = compileDesignMd(doc);
    const outPath = path.resolve(cwd, opts.out);
    fs.writeFileSync(outPath, output, "utf-8");

    console.log(symbols.success, `Extracted ${chalk.cyan(path.relative(cwd, outPath))}`);
    console.log(symbols.bullet, `Brand: ${chalk.yellow(brandName)}`);
    console.log(symbols.bullet, `Colors found: ${colors.count}`);
    console.log(symbols.bullet, `Fonts detected: ${fonts.count}`);
    console.log();
    console.log("  Edit the token tables to refine, then run", chalk.cyan("sigil design sync"));
    console.log();
  });

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function replaceCompileSection(md: string, heading: string, lang: string, content: string): string {
  const headingRe = new RegExp(`^##\\s+${heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*$`, "m");
  const match = headingRe.exec(md);
  if (!match) return md;

  const start = match.index + match[0].length;
  const fenceStart = md.indexOf("```" + lang, start);
  if (fenceStart < 0) return md;

  const contentStart = md.indexOf("\n", fenceStart) + 1;
  const fenceEnd = md.indexOf("\n```", contentStart);
  if (fenceEnd < 0) return md;

  return md.slice(0, contentStart) + content + md.slice(fenceEnd);
}

function hexToOklch(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const lr = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  const lg = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  const lb = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  const x = 0.4124564 * lr + 0.3575761 * lg + 0.1804375 * lb;
  const y = 0.2126729 * lr + 0.7151522 * lg + 0.0721750 * lb;
  const z = 0.0193339 * lr + 0.1191920 * lg + 0.9503041 * lb;

  const l_ = 0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z;
  const m_ = 0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z;
  const s_ = 0.0482003018 * x + 0.2643662691 * y + 0.6338517070 * z;

  const l3 = Math.cbrt(l_);
  const m3 = Math.cbrt(m_);
  const s3 = Math.cbrt(s_);

  const L = 0.2104542553 * l3 + 0.7936177850 * m3 - 0.0040720468 * s3;
  const a = 1.9779984951 * l3 - 2.4285922050 * m3 + 0.4505937099 * s3;
  const bOk = 0.0259040371 * l3 + 0.7827717662 * m3 - 0.8086757660 * s3;

  const C = Math.sqrt(a * a + bOk * bOk);
  let H = (Math.atan2(bOk, a) * 180) / Math.PI;
  if (H < 0) H += 360;

  return `oklch(${L.toFixed(2)} ${C.toFixed(2)} ${Math.round(H)})`;
}

type ExtractedColors = { primary?: string; primaryHover?: string; count: number };

function extractColorsFromHtml(html: string): ExtractedColors {
  const hexRe = /#([0-9a-f]{6})\b/gi;
  const seen = new Map<string, number>();
  let match: RegExpExecArray | null;

  while ((match = hexRe.exec(html)) !== null) {
    const hex = `#${match[1].toLowerCase()}`;
    seen.set(hex, (seen.get(hex) ?? 0) + 1);
  }

  const sorted = [...seen.entries()]
    .filter(([hex]) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      return max - min > 20 || max < 200;
    })
    .sort((a, b) => b[1] - a[1]);

  const chromatic = sorted.filter(([hex]) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    return max - min > 30;
  });

  const primary = chromatic[0]?.[0];

  return {
    primary: primary ? hexToOklch(primary) : undefined,
    primaryHover: primary ? hexToOklch(primary) : undefined,
    count: seen.size,
  };
}

type ExtractedFonts = { display?: string; body?: string; mono?: string; count: number };

function extractFontsFromHtml(html: string): ExtractedFonts {
  const fontFamilyRe = /font-family:\s*([^;}"]+)/gi;
  const fonts = new Set<string>();
  let match: RegExpExecArray | null;

  while ((match = fontFamilyRe.exec(html)) !== null) {
    fonts.add(match[1].trim());
  }

  const all = [...fonts];
  const mono = all.find((f) => /mono|courier|consolas/i.test(f));
  const sans = all.filter((f) => !mono || f !== mono);

  return {
    display: sans[0] ?? undefined,
    body: sans[1] ?? sans[0] ?? undefined,
    mono: mono ?? undefined,
    count: fonts.size,
  };
}

function extractRadiiFromHtml(html: string): string[] {
  const re = /border-radius:\s*([^;}"]+)/gi;
  const radii = new Set<string>();
  let match: RegExpExecArray | null;
  while ((match = re.exec(html)) !== null) radii.add(match[1].trim());
  return [...radii].slice(0, 5);
}

function extractShadowsFromHtml(html: string): string[] {
  const re = /box-shadow:\s*([^;}"]+)/gi;
  const shadows = new Set<string>();
  let match: RegExpExecArray | null;
  while ((match = re.exec(html)) !== null) shadows.add(match[1].trim());
  return [...shadows].slice(0, 4);
}

function extractBrandName(html: string, url: string): string {
  const titleMatch = /<title[^>]*>([^<]+)<\/title>/i.exec(html);
  if (titleMatch) {
    const title = titleMatch[1].split(/[|\-–—]/)[0].trim();
    if (title.length > 0 && title.length < 40) return title;
  }
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, "");
    return hostname.split(".")[0].charAt(0).toUpperCase() + hostname.split(".")[0].slice(1);
  } catch {
    return "Extracted";
  }
}
