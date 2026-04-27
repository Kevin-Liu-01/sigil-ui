/**
 * Fix border color family cohesion across all presets.
 *
 * 1. Tighten border-muted toward border (max ~0.17 L gap, not 0.27+)
 * 2. Add explicit color token to margin-border / gutter-border values
 *
 * Run: node scripts/fix-border-family.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.join(__dirname, "../packages/presets/src");
const SKIP = new Set(["_template.ts", "index.ts", "catalog.ts"]);

const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".ts") && !SKIP.has(f));

let totalFixed = 0;

for (const file of files) {
  const fp = path.join(DIR, file);
  let content = fs.readFileSync(fp, "utf-8");
  let changes = 0;

  // ── 1. Fix OKLCH border-muted light values ──────────────────────────
  // Match: "border-muted": { light: "oklch(L C H)", dark: "oklch(L C H)" }
  const oklchMutedRe =
    /"border-muted":\s*\{\s*light:\s*"oklch\(([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)\)"\s*,\s*dark:\s*"oklch\(([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)\)"\s*\}/;
  const oklchBorderRe =
    /border:\s*\{\s*light:\s*"oklch\(([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)\)"/;

  const mutedMatch = content.match(oklchMutedRe);
  const borderMatch = content.match(oklchBorderRe);

  if (mutedMatch && borderMatch) {
    const bL = parseFloat(borderMatch[1]);
    const mL_light = parseFloat(mutedMatch[1]);
    const mC_light = parseFloat(mutedMatch[2]);
    const mH_light = mutedMatch[3];
    const mL_dark = parseFloat(mutedMatch[4]);
    const mC_dark = parseFloat(mutedMatch[5]);
    const mH_dark = mutedMatch[6];

    const lightGap = mL_light - bL;

    // Only fix if gap > 0.20 (edgeless presets with small gaps are fine)
    if (lightGap > 0.20) {
      // Target: border L + 0.17
      const newLightL = (bL + 0.17).toFixed(2);
      // Bump chroma slightly for better visual connection
      const newLightC = Math.max(mC_light, 0.006).toFixed(3);

      // Dark mode: tighten similarly
      const bL_dark = parseFloat(
        (content.match(/border:\s*\{\s*light:\s*"[^"]+"\s*,\s*dark:\s*"oklch\(([0-9.]+)/) || [])[1] || "0.47"
      );
      const darkGap = bL_dark - mL_dark;
      let newDarkL = mL_dark;
      if (darkGap > 0.15) {
        newDarkL = (bL_dark - 0.14).toFixed(2);
      }
      const newDarkC = Math.max(mC_dark, 0.006).toFixed(3);

      const oldStr = mutedMatch[0];
      const newStr = `"border-muted": { light: "oklch(${newLightL} ${newLightC} ${mH_light})", dark: "oklch(${newDarkL} ${newDarkC} ${mH_dark})" }`;

      if (oldStr !== newStr) {
        content = content.replace(oldStr, newStr);
        changes++;
      }
    }
  }

  // ── 1b. Fix HEX border-muted values ──────────────────────────────────
  // For hex presets, darken border-muted to be closer to border
  const hexMutedRe =
    /"border-muted":\s*\{\s*light:\s*"(#[0-9a-fA-F]{6})"\s*,\s*dark:\s*"(#[0-9a-fA-F]{6})"\s*\}/;
  const hexBorderRe =
    /border:\s*\{\s*light:\s*"(#[0-9a-fA-F]{6})"/;

  const hexMuted = content.match(hexMutedRe);
  const hexBorder = content.match(hexBorderRe);

  if (hexMuted && hexBorder) {
    const hexToRgb = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
    const rgbToHex = (r, g, b) => "#" + [r, g, b].map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("");
    const lum = ([r, g, b]) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

    const bRgb = hexToRgb(hexBorder[1]);
    const mRgb = hexToRgb(hexMuted[1]);
    const bLum = lum(bRgb);
    const mLum = lum(mRgb);
    const gap = mLum - bLum;

    // If muted is way lighter than border (gap > 80 luminance units), bring it closer
    if (gap > 80) {
      // Target: 55 luminance units above border
      const ratio = (bLum + 55) / mLum;
      const newLightR = Math.round(bRgb[0] + (mRgb[0] - bRgb[0]) * 0.55);
      const newLightG = Math.round(bRgb[1] + (mRgb[1] - bRgb[1]) * 0.55);
      const newLightB = Math.round(bRgb[2] + (mRgb[2] - bRgb[2]) * 0.55);
      const newLightHex = rgbToHex(newLightR, newLightG, newLightB);

      // Dark mode: bring closer too
      const mDarkRgb = hexToRgb(hexMuted[2]);
      const bDarkMatch = content.match(/border:\s*\{\s*light:\s*"[^"]+"\s*,\s*dark:\s*"(#[0-9a-fA-F]{6})"/);
      if (bDarkMatch) {
        const bDarkRgb = hexToRgb(bDarkMatch[1]);
        const newDarkR = Math.round(bDarkRgb[0] * 0.55 + mDarkRgb[0] * 0.45);
        const newDarkG = Math.round(bDarkRgb[1] * 0.55 + mDarkRgb[1] * 0.45);
        const newDarkB = Math.round(bDarkRgb[2] * 0.55 + mDarkRgb[2] * 0.45);
        const newDarkHex = rgbToHex(newDarkR, newDarkG, newDarkB);

        const oldStr = hexMuted[0];
        const newStr = `"border-muted": { light: "${newLightHex}", dark: "${newDarkHex}" }`;
        if (oldStr !== newStr) {
          content = content.replace(oldStr, newStr);
          changes++;
        }
      }
    }
  }

  // ── 2. Fix margin-border and gutter-border to include color ──────────
  // "1px solid" → "1px solid var(--s-border-muted)"
  // "2px solid" → "2px solid var(--s-border-muted)"
  // "3px solid" → "3px solid var(--s-border-muted)"
  const borderShorthands = [
    ['"gutter-border": "1px solid"', '"gutter-border": "1px solid var(--s-border-muted)"'],
    ['"gutter-border": "2px solid"', '"gutter-border": "2px solid var(--s-border-muted)"'],
    ['"gutter-border": "3px solid"', '"gutter-border": "3px solid var(--s-border-muted)"'],
    ['"margin-border": "1px solid"', '"margin-border": "1px solid var(--s-border-muted)"'],
    ['"margin-border": "2px solid"', '"margin-border": "2px solid var(--s-border-muted)"'],
    ['"margin-border": "3px solid"', '"margin-border": "3px solid var(--s-border-muted)"'],
  ];

  for (const [from, to] of borderShorthands) {
    if (content.includes(from)) {
      content = content.replace(from, to);
      changes++;
    }
  }

  if (changes > 0) {
    fs.writeFileSync(fp, content, "utf-8");
    totalFixed++;
    console.log(`✓  ${file} — ${changes} fix(es)`);
  }
}

console.log(`\nDone. Fixed ${totalFixed} files.`);
