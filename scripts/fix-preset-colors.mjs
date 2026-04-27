/**
 * Fix preset color harmony issues:
 * 1. CRITICAL: duplicate semantic roles (info=primary, error=accent, etc.)
 * 2. WARNING: border/border-strong same lightness
 * 3. WARNING: hover lighter than base (flux, basalt)
 * 4. WARNING: surface layering flat (aura)
 *
 * Run: node scripts/fix-preset-colors.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.join(__dirname, "../packages/presets/src");

function fix(file, replacements) {
  const fp = path.join(DIR, file);
  let content = fs.readFileSync(fp, "utf-8");
  for (const [from, to] of replacements) {
    if (!content.includes(from)) {
      console.log(`  ⚠  "${from}" not found in ${file}`);
      continue;
    }
    content = content.replace(from, to);
  }
  fs.writeFileSync(fp, content, "utf-8");
  console.log(`✓  ${file} — ${replacements.length} fix(es)`);
}

// ── CRITICAL: Duplicate semantic roles ──────────────────────────────────────

// kova: info = primary (oklch 0.64 0.12 230 teal) → shift info to pure blue
fix("kova.ts", [
  ['info: "oklch(0.64 0.12 230)"', 'info: "oklch(0.60 0.16 255)"'],
  ['"info-muted": "oklch(0.7 0.05 230)"', '"info-muted": "oklch(0.70 0.06 255)"'],
]);

// crux: error = primary (oklch 0.53 0.22 27 red) → shift error to cooler red
fix("crux.ts", [
  ['error: "oklch(0.53 0.22 27)"', 'error: "oklch(0.58 0.24 18)"'],
  ['"error-muted": "oklch(0.53 0.07 27)"', '"error-muted": "oklch(0.58 0.08 18)"'],
]);

// glyph: error = primary (oklch 0.55 0.22 25) → shift error to standard red
fix("glyph.ts", [
  ['error: "oklch(0.55 0.22 25)"', 'error: "oklch(0.60 0.23 18)"'],
]);

// cobalt: info (#2563eb) = primary (#2563eb) → shift info to sky blue
fix("cobalt.ts", [
  ['info: "#2563eb"', 'info: "#0284c7"'],
  ['"info-muted": "#dbeafe"', '"info-muted": "#e0f2fe"'],
]);

// dsgn: info (#2563eb) = primary (#2563eb), error (#ef4444) = accent (#ef4444)
fix("dsgn.ts", [
  ['info: "#2563eb"', 'info: "#0284c7"'],
  ['"info-muted": "#2563eb20"', '"info-muted": "#0284c720"'],
  ['error: "#ef4444"', 'error: "#dc2626"'],
  ['"error-muted": "#ef444420"', '"error-muted": "#dc262620"'],
]);

// mono: info (#5f5f5f) = primary (#5f5f5f) → give info a blue-gray tint
fix("mono.ts", [
  ['info: "#5f5f5f"', 'info: "#64748b"'],
  ['"info-muted": "#52525215"', '"info-muted": "#64748b15"'],
]);

// rivet: info (#0369a1) = accent (#0369a1) → shift info to a different blue
fix("rivet.ts", [
  ['info: "#0369a1"', 'info: "#2563eb"'],
]);

// vex: error (#ef4444) = accent (#ef4444) → shift error to darker crimson
fix("vex.ts", [
  ['error: "#ef4444"', 'error: "#dc2626"'],
]);

// ── WARNING: border = border-strong (same L) ───────────────────────────────

// kova: border L=0.65, border-strong L=0.65 → drop border-strong to 0.55
fix("kova.ts", [
  ['"border-strong": { light: "oklch(0.65 0.006 235)", dark: "oklch(0.47 0.008 240)" }',
   '"border-strong": { light: "oklch(0.55 0.008 235)", dark: "oklch(0.55 0.01 240)" }'],
]);

// crux: border L=0.66, border-strong L=0.66 → drop border-strong to 0.50
fix("crux.ts", [
  ['"border-strong": { light: "oklch(0.66 0 0)", dark: "oklch(0.47 0 0)" }',
   '"border-strong": { light: "oklch(0.50 0.005 0)", dark: "oklch(0.56 0.005 0)" }'],
]);

// sigil: border L=0.65, border-strong L=0.65 → drop border-strong to 0.55
fix("sigil.ts", [
  ['"border-strong": { light: "oklch(0.65 0.006 280)", dark: "oklch(0.47 0.01 280)" }',
   '"border-strong": { light: "oklch(0.55 0.008 280)", dark: "oklch(0.55 0.012 280)" }'],
]);

// flux: border L=0.65, border-strong L=0.65 → drop border-strong to 0.55
fix("flux.ts", [
  ['"border-strong": { light: "oklch(0.65 0.01 240)", dark: "oklch(0.47 0.015 260)" }',
   '"border-strong": { light: "oklch(0.55 0.012 240)", dark: "oklch(0.55 0.018 260)" }'],
]);

// axiom: border L=0.66, border-strong L=0.66 → drop border-strong to 0.50
fix("axiom.ts", [
  ['"border-strong": { light: "oklch(0.66 0 0)", dark: "oklch(0.47 0 0)" }',
   '"border-strong": { light: "oklch(0.50 0.005 260)", dark: "oklch(0.56 0.005 260)" }'],
]);

// glyph: check & fix
fix("glyph.ts", [
  ['"border-strong": { light: "oklch(0.65 0.006 25)", dark: "oklch(0.47 0.01 25)" }',
   '"border-strong": { light: "oklch(0.55 0.008 25)", dark: "oklch(0.55 0.012 25)" }'],
]);

// prism: check & fix
fix("prism.ts", [
  ['"border-strong": { light: "oklch(0.65 0.01 330)", dark: "oklch(0.47 0.015 330)" }',
   '"border-strong": { light: "oklch(0.55 0.012 330)", dark: "oklch(0.55 0.018 330)" }'],
]);

// mono: border (#929292) = border-strong (#929292) literally identical
fix("mono.ts", [
  ['"border-strong": { light: "#929292", dark: "#5f5f5f" }',
   '"border-strong": { light: "#6b7280", dark: "#737373" }'],
]);

// dsgn: check if border-strong differs from border
fix("dsgn.ts", [
  ['"border-strong": { light: "#8c939f", dark: "#626262" }',
   '"border-strong": { light: "#6b7280", dark: "#737373" }'],
]);

// ── WARNING: hover lighter than base ────────────────────────────────────────

// flux: primary L=0.61, primary-hover L=0.70 → hover should darken
fix("flux.ts", [
  ['"primary-hover": "oklch(0.7 0.2 210)"', '"primary-hover": "oklch(0.55 0.22 210)"'],
]);

// basalt: primary L=0.61, primary-hover L=0.66 → hover should darken
fix("basalt.ts", [
  ['"primary-hover": "oklch(0.66 0.17 175)"', '"primary-hover": "oklch(0.55 0.19 175)"'],
]);

// ── WARNING: surface layering flat ──────────────────────────────────────────

// aura: light background L=0.97, surface-elevated L=0.97 → bump elevated to 1.0
fix("aura.ts", [
  ['"surface-elevated": { light: "oklch(0.97 0.008 280)"',
   '"surface-elevated": { light: "oklch(1 0.005 280)"'],
]);

// axiom: info (oklch 0.55 0.18 260) very close to primary (0.55 0.2 260) → shift info hue
fix("axiom.ts", [
  ['info: "oklch(0.55 0.18 260)"', 'info: "oklch(0.58 0.16 235)"'],
]);

console.log("\nAll preset color fixes applied.");
