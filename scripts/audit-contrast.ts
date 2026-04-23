/**
 * WCAG AA Contrast Audit for Sigil Presets
 *
 * Checks all color pairs in every preset against WCAG 2.0 AA thresholds:
 *   - Normal text:   >= 4.5:1
 *   - Large text:    >= 3:1
 *   - UI components: >= 3:1
 *
 * Usage: pnpm audit:contrast
 */

import { parse, converter } from "culori";

import { defaultPreset } from "../packages/presets/src/default";
import { sigilPreset } from "../packages/presets/src/sigil";
import { cruxPreset } from "../packages/presets/src/crux";
import { alloyPreset } from "../packages/presets/src/alloy";
import { basaltPreset } from "../packages/presets/src/basalt";
import { forgePreset } from "../packages/presets/src/forge";
import { onyxPreset } from "../packages/presets/src/onyx";
import { fluxPreset } from "../packages/presets/src/flux";
import { kovaPreset } from "../packages/presets/src/kova";
import { etchPreset } from "../packages/presets/src/etch";
import { anvilPreset } from "../packages/presets/src/anvil";
import { rivetPreset } from "../packages/presets/src/rivet";
import { shardPreset } from "../packages/presets/src/shard";
import { runePreset } from "../packages/presets/src/rune";
import { fangPreset } from "../packages/presets/src/fang";
import { cobaltPreset } from "../packages/presets/src/cobalt";
import { strataPreset } from "../packages/presets/src/strata";
import { brassPreset } from "../packages/presets/src/brass";
import { obsidPreset } from "../packages/presets/src/obsid";
import { axiomPreset } from "../packages/presets/src/axiom";
import { glyphPreset } from "../packages/presets/src/glyph";
import { cipherPreset } from "../packages/presets/src/cipher";
import { prismPreset } from "../packages/presets/src/prism";
import { helixPreset } from "../packages/presets/src/helix";
import { hexPreset } from "../packages/presets/src/hex";
import { vexPreset } from "../packages/presets/src/vex";
import { arcPreset } from "../packages/presets/src/arc";
import { dsgnPreset } from "../packages/presets/src/dsgn";
import { mrkrPreset } from "../packages/presets/src/mrkr";
import { noirPreset } from "../packages/presets/src/noir";
import { duskPreset } from "../packages/presets/src/dusk";
import { monoPreset } from "../packages/presets/src/mono";

import type { SigilPreset } from "../packages/tokens/src/types";

// ---------------------------------------------------------------------------
// All presets
// ---------------------------------------------------------------------------

const ALL_PRESETS: SigilPreset[] = [
  defaultPreset, sigilPreset, cruxPreset, alloyPreset, basaltPreset, forgePreset,
  onyxPreset, fluxPreset, kovaPreset, etchPreset, anvilPreset,
  rivetPreset, shardPreset, runePreset, fangPreset, cobaltPreset,
  strataPreset, brassPreset, obsidPreset, axiomPreset, glyphPreset,
  cipherPreset, prismPreset, helixPreset, hexPreset, vexPreset,
  arcPreset, dsgnPreset, mrkrPreset, noirPreset, duskPreset, monoPreset,
];

// ---------------------------------------------------------------------------
// Color conversion
// ---------------------------------------------------------------------------

const toRgb = converter("rgb");

function colorToSrgb(raw: string): { r: number; g: number; b: number } | null {
  const trimmed = raw.trim();

  // Handle oklch(L C H) or oklch(L C H / A)
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

  // Try parsing with culori (handles hex, rgb(), hsl(), etc.)
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

// ---------------------------------------------------------------------------
// WCAG 2.0 contrast ratio
// ---------------------------------------------------------------------------

function srgbToLuminance(r: number, g: number, b: number): number {
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrastRatio(fg: { r: number; g: number; b: number }, bg: { r: number; g: number; b: number }): number {
  const l1 = srgbToLuminance(fg.r, fg.g, fg.b);
  const l2 = srgbToLuminance(bg.r, bg.g, bg.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// ---------------------------------------------------------------------------
// Themed color helpers
// ---------------------------------------------------------------------------

type ThemedColor = { light: string; dark: string };

function isThemed(v: unknown): v is ThemedColor {
  return typeof v === "object" && v !== null && "light" in v && "dark" in v;
}

function getColor(colors: Record<string, unknown>, key: string, mode: "light" | "dark"): string | null {
  const val = colors[key];
  if (!val) return null;
  if (isThemed(val)) return val[mode];
  if (typeof val === "string") return val;
  return null;
}

// ---------------------------------------------------------------------------
// Audit definitions
// ---------------------------------------------------------------------------

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
  { fg: "text-subtle",    bg: "background",  minRatio: 3.0, label: "text-subtle on bg (large)" },
  { fg: "text",           bg: "surface",     minRatio: 4.5, label: "text on surface" },
  { fg: "text-secondary", bg: "surface",     minRatio: 4.5, label: "text-secondary on surface" },
  { fg: "text-muted",     bg: "surface",     minRatio: 3.0, label: "text-muted on surface" },
  { fg: "primary",        bg: "background",  minRatio: 3.0, label: "primary on bg (UI)" },
  { fg: "border",         bg: "background",  minRatio: 3.0, label: "border on bg (UI)" },
  { fg: "border-strong",  bg: "background",  minRatio: 3.0, label: "border-strong on bg" },
  { fg: "success",        bg: "background",  minRatio: 3.0, label: "success on bg" },
  { fg: "warning",        bg: "background",  minRatio: 3.0, label: "warning on bg" },
  { fg: "error",          bg: "background",  minRatio: 3.0, label: "error on bg" },
  { fg: "info",           bg: "background",  minRatio: 3.0, label: "info on bg" },
];

// primary-contrast on primary (button text)
const BUTTON_CHECK: CheckDef = {
  fg: "primary-contrast", bg: "primary", minRatio: 4.5, label: "primary-contrast on primary (btn)"
};

// ---------------------------------------------------------------------------
// Run audit
// ---------------------------------------------------------------------------

interface Failure {
  preset: string;
  mode: "light" | "dark";
  label: string;
  ratio: number;
  required: number;
  fgColor: string;
  bgColor: string;
}

const failures: Failure[] = [];
let totalChecks = 0;

for (const preset of ALL_PRESETS) {
  const colors = preset.tokens.colors as Record<string, unknown>;

  for (const mode of ["light", "dark"] as const) {
    // Standard checks (themed fg on themed bg)
    for (const check of CHECKS) {
      const fgRaw = getColor(colors, check.fg, mode);
      const bgRaw = getColor(colors, check.bg, mode);
      if (!fgRaw || !bgRaw) continue;

      const fg = colorToSrgb(fgRaw);
      const bg = colorToSrgb(bgRaw);
      if (!fg || !bg) continue;

      totalChecks++;
      const ratio = contrastRatio(fg, bg);
      if (ratio < check.minRatio) {
        failures.push({
          preset: preset.name,
          mode,
          label: check.label,
          ratio: Math.round(ratio * 100) / 100,
          required: check.minRatio,
          fgColor: fgRaw,
          bgColor: bgRaw,
        });
      }
    }

    // Button check: primary-contrast on primary
    const pcRaw = getColor(colors, "primary-contrast", mode);
    const pRaw = getColor(colors, "primary", mode);
    if (pcRaw && pRaw) {
      const pc = colorToSrgb(pcRaw);
      const p = colorToSrgb(pRaw);
      if (pc && p) {
        totalChecks++;
        const ratio = contrastRatio(pc, p);
        if (ratio < BUTTON_CHECK.minRatio) {
          failures.push({
            preset: preset.name,
            mode,
            label: BUTTON_CHECK.label,
            ratio: Math.round(ratio * 100) / 100,
            required: BUTTON_CHECK.minRatio,
            fgColor: pcRaw,
            bgColor: pRaw,
          });
        }
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

console.log(`\nWCAG AA Contrast Audit — ${ALL_PRESETS.length} presets, ${totalChecks} checks\n`);

if (failures.length === 0) {
  console.log("ALL CHECKS PASSED\n");
  process.exit(0);
}

console.log(`FAILURES: ${failures.length}\n`);
console.log("Preset          | Mode  | Check                              | Ratio | Req   | FG → BG");
console.log("----------------|-------|------------------------------------|-------|-------|--------");

for (const f of failures) {
  const name = f.preset.padEnd(15);
  const mode = f.mode.padEnd(5);
  const label = f.label.padEnd(34);
  const ratio = f.ratio.toFixed(2).padStart(5);
  const req = f.required.toFixed(1).padStart(5);
  console.log(`${name} | ${mode} | ${label} | ${ratio} | ${req} | ${f.fgColor} → ${f.bgColor}`);
}

console.log(`\n${failures.length} failures out of ${totalChecks} checks.\n`);
process.exit(1);
