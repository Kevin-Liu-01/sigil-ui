/**
 * Auto-fix WCAG AA contrast failures in Sigil presets.
 *
 * Strategy: for each failing pair, adjust the foreground color's
 * lightness (in OKLCH space) until the contrast ratio meets the threshold.
 *
 * For borders: darken in light mode, lighten in dark mode.
 * For status colors: darken in light mode.
 * For primary-contrast: use black if primary is light, white if dark.
 */

import { parse, converter, formatHex } from "culori";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const toRgb = converter("rgb");
const toOklch = converter("oklch");

function colorToSrgb(raw: string): { r: number; g: number; b: number } | null {
  const trimmed = raw.trim();
  if (trimmed.startsWith("oklch(")) {
    const inner = trimmed.slice(6, -1).split("/")[0]!.trim();
    const parts = inner.split(/\s+/);
    if (parts.length >= 3) {
      const L = parseFloat(parts[0]!);
      const C = parseFloat(parts[1]!);
      const H = parseFloat(parts[2]!);
      const rgb = toRgb({ mode: "oklch", l: L, c: C, h: H });
      if (rgb) return { r: clamp01(rgb.r), g: clamp01(rgb.g), b: clamp01(rgb.b) };
    }
  }
  const parsed = parse(trimmed);
  if (parsed) {
    const rgb = toRgb(parsed);
    if (rgb) return { r: clamp01(rgb.r), g: clamp01(rgb.g), b: clamp01(rgb.b) };
  }
  return null;
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

function srgbLuminance(r: number, g: number, b: number): number {
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrastRatio(fg: { r: number; g: number; b: number }, bg: { r: number; g: number; b: number }): number {
  const l1 = srgbLuminance(fg.r, fg.g, fg.b);
  const l2 = srgbLuminance(bg.r, bg.g, bg.b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

function adjustOklchLightness(colorStr: string, bgStr: string, targetRatio: number, mode: "light" | "dark"): string | null {
  const bg = colorToSrgb(bgStr);
  if (!bg) return null;
  const bgLum = srgbLuminance(bg.r, bg.g, bg.b);

  if (colorStr.startsWith("oklch(")) {
    const inner = colorStr.slice(6, -1).split("/")[0]!.trim();
    const parts = inner.split(/\s+/);
    if (parts.length < 3) return null;
    let L = parseFloat(parts[0]!);
    const C = parseFloat(parts[1]!);
    const H = parseFloat(parts[2]!);
    const suffix = colorStr.includes("/") ? " / " + colorStr.split("/")[1]!.trim().replace(")", "") : "";

    // Binary search for the lightness that achieves the target ratio
    const needDarker = mode === "light"; // on light bg, darken fg; on dark bg, lighten fg
    let lo = needDarker ? 0 : L;
    let hi = needDarker ? L : 1;

    for (let i = 0; i < 30; i++) {
      const mid = (lo + hi) / 2;
      const rgb = toRgb({ mode: "oklch", l: mid, c: C, h: H });
      if (!rgb) break;
      const fgLum = srgbLuminance(clamp01(rgb.r), clamp01(rgb.g), clamp01(rgb.b));
      const ratio = (Math.max(fgLum, bgLum) + 0.05) / (Math.min(fgLum, bgLum) + 0.05);

      if (ratio >= targetRatio) {
        if (needDarker) lo = mid; else hi = mid;
      } else {
        if (needDarker) hi = mid; else lo = mid;
      }
    }

    const finalL = (lo + hi) / 2;
    // Round to 2 decimal places
    const lStr = finalL.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
    const cStr = parts[1]!;
    const hStr = parts[2]!;
    return `oklch(${lStr} ${cStr} ${hStr}${suffix ? suffix + ")" : ")"}`;
  }

  // Hex color: convert to oklch, adjust, convert back to hex
  const parsed = parse(colorStr);
  if (!parsed) return null;
  const oklch = toOklch(parsed);
  if (!oklch) return null;

  const needDarker = mode === "light";
  let lo = needDarker ? 0 : (oklch.l ?? 0);
  let hi = needDarker ? (oklch.l ?? 1) : 1;

  for (let i = 0; i < 30; i++) {
    const mid = (lo + hi) / 2;
    const rgb = toRgb({ mode: "oklch", l: mid, c: oklch.c ?? 0, h: oklch.h ?? 0 });
    if (!rgb) break;
    const fgLum = srgbLuminance(clamp01(rgb.r), clamp01(rgb.g), clamp01(rgb.b));
    const ratio = (Math.max(fgLum, bgLum) + 0.05) / (Math.min(fgLum, bgLum) + 0.05);
    if (ratio >= targetRatio) {
      if (needDarker) lo = mid; else hi = mid;
    } else {
      if (needDarker) hi = mid; else lo = mid;
    }
  }

  const finalL = (lo + hi) / 2;
  const fixedRgb = toRgb({ mode: "oklch", l: finalL, c: oklch.c ?? 0, h: oklch.h ?? 0 });
  if (!fixedRgb) return null;
  return formatHex({ mode: "rgb", r: clamp01(fixedRgb.r), g: clamp01(fixedRgb.g), b: clamp01(fixedRgb.b) });
}

// ---------------------------------------------------------------------------
// Process all presets
// ---------------------------------------------------------------------------

const PRESET_DIR = join(__dirname, "../packages/presets/src");

type ThemedColor = { light: string; dark: string };
function isThemed(v: unknown): v is ThemedColor {
  return typeof v === "object" && v !== null && "light" in v && "dark" in v;
}

interface CheckDef {
  fg: string;
  bg: string;
  minRatio: number;
  label: string;
}

const CHECKS: CheckDef[] = [
  { fg: "text",           bg: "background",  minRatio: 4.5, label: "text on bg" },
  { fg: "text-secondary", bg: "background",  minRatio: 4.5, label: "text-secondary on bg" },
  { fg: "text-muted",     bg: "background",  minRatio: 4.5, label: "text-muted on bg" },
  { fg: "text-subtle",    bg: "background",  minRatio: 3.0, label: "text-subtle on bg" },
  { fg: "text",           bg: "surface",     minRatio: 4.5, label: "text on surface" },
  { fg: "text-secondary", bg: "surface",     minRatio: 4.5, label: "text-secondary on surface" },
  { fg: "text-muted",     bg: "surface",     minRatio: 3.0, label: "text-muted on surface" },
  { fg: "primary",        bg: "background",  minRatio: 3.0, label: "primary on bg" },
  { fg: "border",         bg: "background",  minRatio: 3.0, label: "border on bg" },
  { fg: "border-strong",  bg: "background",  minRatio: 3.0, label: "border-strong on bg" },
  { fg: "success",        bg: "background",  minRatio: 3.0, label: "success on bg" },
  { fg: "warning",        bg: "background",  minRatio: 3.0, label: "warning on bg" },
  { fg: "error",          bg: "background",  minRatio: 3.0, label: "error on bg" },
  { fg: "info",           bg: "background",  minRatio: 3.0, label: "info on bg" },
];

const PRESETS = [
  "sigil", "crux", "alloy", "basalt", "forge", "onyx", "flux", "kova",
  "etch", "anvil", "rivet", "shard", "rune", "fang", "cobalt", "strata",
  "brass", "obsid", "axiom", "glyph", "cipher", "prism", "helix", "hex",
  "vex", "arc", "dsgn", "mrkr", "noir", "dusk", "mono",
];

let totalFixes = 0;

for (const name of PRESETS) {
  const filePath = join(PRESET_DIR, `${name}.ts`);
  let content = readFileSync(filePath, "utf-8");
  let changed = false;

  // Parse colors from the file to get bg values for ratio calculation
  for (const mode of ["light", "dark"] as const) {
    for (const check of CHECKS) {
      // Extract fg and bg color strings from the file
      const fgVal = extractColorValue(content, check.fg, mode);
      const bgVal = extractColorValue(content, check.bg, mode);
      if (!fgVal || !bgVal) continue;

      const fg = colorToSrgb(fgVal);
      const bg = colorToSrgb(bgVal);
      if (!fg || !bg) continue;

      const ratio = contrastRatio(fg, bg);
      if (ratio >= check.minRatio) continue;

      // Need to fix
      const fixed = adjustOklchLightness(fgVal, bgVal, check.minRatio + 0.1, mode);
      if (!fixed || fixed === fgVal) continue;

      // Replace in file
      const replaced = replaceColorInFile(content, check.fg, mode, fgVal, fixed);
      if (replaced !== content) {
        content = replaced;
        changed = true;
        totalFixes++;
        console.log(`${name} ${mode}: ${check.label} ${ratio.toFixed(2)} → fixed fg to ${fixed}`);
      }
    }

    // Button: primary-contrast on primary
    const pcVal = extractColorValue(content, "primary-contrast", mode);
    const pVal = extractColorValue(content, "primary", mode);
    if (pcVal && pVal) {
      const pc = colorToSrgb(pcVal);
      const p = colorToSrgb(pVal);
      if (pc && p) {
        const ratio = contrastRatio(pc, p);
        if (ratio < 4.5) {
          // Determine if primary is light or dark
          const pLum = srgbLuminance(p.r, p.g, p.b);
          const newPc = pLum > 0.4 ? "#000000" : "#ffffff";
          const newPcCheck = colorToSrgb(newPc)!;
          const newRatio = contrastRatio(newPcCheck, p);
          if (newRatio >= 4.5) {
            const replaced = replaceColorInFile(content, "primary-contrast", mode, pcVal, newPc);
            if (replaced !== content) {
              content = replaced;
              changed = true;
              totalFixes++;
              console.log(`${name} ${mode}: primary-contrast ${ratio.toFixed(2)} → ${newPc} (${newRatio.toFixed(2)})`);
            }
          }
        }
      }
    }
  }

  if (changed) {
    writeFileSync(filePath, content, "utf-8");
  }
}

console.log(`\nDone. ${totalFixes} fixes applied.\n`);

// ---------------------------------------------------------------------------
// Helpers to extract/replace color values from TypeScript source
// ---------------------------------------------------------------------------

function extractColorValue(content: string, key: string, mode: "light" | "dark"): string | null {
  const qk = escapeRegex(key);
  // Match both quoted "key" and unquoted key, with themed { light: "...", dark: "..." }
  const themedRegex = new RegExp(
    `(?:"${qk}"|${qk})\\s*:\\s*\\{\\s*light\\s*:\\s*"([^"]+)"\\s*,\\s*dark\\s*:\\s*"([^"]+)"\\s*\\}`,
  );
  const themedMatch = content.match(themedRegex);
  if (themedMatch) {
    return mode === "light" ? themedMatch[1]! : themedMatch[2]!;
  }

  // Static: "key": "value" or key: "value"
  const staticRegex = new RegExp(`(?:"${qk}"|${qk})\\s*:\\s*"([^"]+)"`);
  const staticMatch = content.match(staticRegex);
  if (staticMatch) return staticMatch[1]!;

  return null;
}

function replaceColorInFile(content: string, key: string, mode: "light" | "dark", oldVal: string, newVal: string): string {
  const qk = escapeRegex(key);
  // Themed replacement
  const themedRegex = new RegExp(
    `((?:"${qk}"|${qk})\\s*:\\s*\\{\\s*light\\s*:\\s*)"([^"]+)"(\\s*,\\s*dark\\s*:\\s*)"([^"]+)"`,
  );
  const themedMatch = content.match(themedRegex);
  if (themedMatch) {
    if (mode === "light" && themedMatch[2] === oldVal) {
      return content.replace(themedRegex, `$1"${newVal}"$3"${themedMatch[4]}"`);
    }
    if (mode === "dark" && themedMatch[4] === oldVal) {
      return content.replace(themedRegex, `$1"${themedMatch[2]}"$3"${newVal}"`);
    }
  }

  // Static replacement
  const escaped = escapeRegex(oldVal);
  const staticRegex = new RegExp(`((?:"${qk}"|${qk})\\s*:\\s*)"${escaped}"`);
  if (content.match(staticRegex)) {
    return content.replace(staticRegex, `$1"${newVal}"`);
  }

  return content;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
