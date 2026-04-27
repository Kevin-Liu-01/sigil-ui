/**
 * One-shot migration script: add missing token categories to all presets.
 *
 * Reads every preset in packages/presets/src/, checks which of the 28
 * canonical categories are present, and inserts the missing ones with
 * aesthetic-appropriate values derived from the preset's catalog category.
 *
 * Run: node scripts/update-presets-full-tokens.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PRESET_DIR = path.join(__dirname, "../packages/presets/src");

// ── Aesthetic map ───────────────────────────────────────────────────────────

const AESTHETIC = {
  default: "default",
  sigil: "structural", kova: "structural", cobalt: "structural", helix: "structural", hex: "structural",
  crux: "minimal", axiom: "minimal", arc: "minimal", mono: "minimal",
  basalt: "dark", onyx: "dark", fang: "dark", obsid: "dark", cipher: "dark", noir: "dark",
  flux: "colorful", shard: "colorful", prism: "colorful", vex: "colorful", dsgn: "colorful", dusk: "colorful",
  etch: "editorial", rune: "editorial", strata: "editorial", glyph: "editorial", mrkr: "editorial",
  alloy: "industrial", forge: "industrial", anvil: "industrial", rivet: "industrial", brass: "industrial",
  vast: "edgeless", aura: "edgeless", field: "edgeless", clay: "edgeless", sage: "edgeless",
  ink: "edgeless", sand: "edgeless", plum: "edgeless", moss: "edgeless", coral: "edgeless",
  dune: "edgeless", ocean: "edgeless", rose: "edgeless",
};

// ── Category detection regexes ──────────────────────────────────────────────

const CATEGORY_KEYS = [
  "colors", "typography", "spacing", "layout", "sigil", "radius", "shadows",
  "motion", "borders", "buttons", "cards", "headings", "navigation",
  "backgrounds", "code", "inputs", "cursor", "scrollbar", "alignment",
  "sections", "dividers", "gridVisuals", "focus", "overlays", "dataViz",
  "media", "controls", "componentSurfaces",
];

function detectCategories(content) {
  const present = new Set();
  for (const key of CATEGORY_KEYS) {
    const re = new RegExp(`^\\s{4}${key}:\\s*\\{`, "m");
    if (re.test(content)) present.add(key);
  }
  return present;
}

// ── Per-aesthetic category blocks ───────────────────────────────────────────

function getCursorBlock(aesthetic) {
  const variants = {
    structural: "sigil", minimal: "dot", dark: "ring", colorful: "ring",
    editorial: "dot", industrial: "crosshair", edgeless: "dot", default: "sigil",
  };
  const glows = {
    dark: '"0 0 8px var(--s-primary)"',
  };
  const variant = variants[aesthetic] || "sigil";
  const glow = glows[aesthetic] || '"none"';
  return `    cursor: {
      variant: "${variant}",
      size: "24px",
      "dot-size": "4px",
      "stroke-width": "${aesthetic === "industrial" ? "2px" : "1.5px"}",
      "tick-size": "6px",
      gap: "3px",
      radius: "0px",
      color: "var(--s-text)",
      "ring-color": "var(--s-primary)",
      "dot-color": "var(--s-primary)",
      glow: ${glow},
      opacity: "1",
      "blend-mode": "normal",
      "z-index": "9999",
      "hide-native": false,
    },`;
}

function getScrollbarBlock(aesthetic) {
  const widths = {
    structural: "6px", minimal: "6px", editorial: "6px", industrial: "10px",
    dark: "8px", colorful: "8px", edgeless: "8px", default: "8px",
  };
  const radii = { industrial: "2px" };
  const ffWidths = { minimal: "thin", industrial: "auto" };
  return `    scrollbar: {
      width: "${widths[aesthetic] || "8px"}",
      height: "${widths[aesthetic] || "8px"}",
      padding: "2px",
      radius: "${radii[aesthetic] || "9999px"}",
      track: "transparent",
      thumb: "var(--s-border-muted)",
      "thumb-hover": "var(--s-border)",
      "thumb-active": "var(--s-border-strong)",
      corner: "transparent",
      border: "none",
      "firefox-width": "${ffWidths[aesthetic] || "thin"}",
      gutter: "stable",
      visibility: "auto",
    },`;
}

function getAlignmentBlock(aesthetic) {
  const railWidths = { minimal: "960px" };
  const railVisible = aesthetic === "structural";
  const titleAlign = aesthetic === "editorial" ? "center" : "left";
  return `    alignment: {
      "rail-width": "${railWidths[aesthetic] || "1200px"}",
      "rail-columns": "12",
      "rail-gutter": "20px",
      "rail-margin": "24px",
      "rail-visible": ${railVisible},
      "rail-color": "var(--s-border-muted)",
      "content-align": "center",
      "hero-align": "center",
      "section-align": "center",
      "navbar-align": "full",
      "footer-align": "content",
      "title-align": "${titleAlign}",
    },`;
}

function getSectionsBlock(aesthetic) {
  const configs = {
    structural:  { py: "64px", pyHero: "120px", px: "24px", max: "1200px", gap: "32px", titleAlign: "left",  above: true,  below: true,  alt: false },
    minimal:     { py: "96px", pyHero: "160px", px: "48px", max: "960px",  gap: "48px", titleAlign: "center", above: false, below: false, alt: false },
    dark:        { py: "80px", pyHero: "140px", px: "24px", max: "1200px", gap: "32px", titleAlign: "center", above: false, below: false, alt: false },
    colorful:    { py: "72px", pyHero: "120px", px: "24px", max: "1200px", gap: "32px", titleAlign: "center", above: false, below: false, alt: false },
    editorial:   { py: "80px", pyHero: "140px", px: "32px", max: "1080px", gap: "40px", titleAlign: "center", above: true,  below: true,  alt: false },
    industrial:  { py: "64px", pyHero: "96px",  px: "16px", max: "1360px", gap: "24px", titleAlign: "left",  above: false, below: true,  alt: false },
    edgeless:    { py: "80px", pyHero: "120px", px: "24px", max: "1200px", gap: "32px", titleAlign: "center", above: false, below: false, alt: false },
    default:     { py: "64px", pyHero: "96px",  px: "24px", max: "1200px", gap: "24px", titleAlign: "left",  above: false, below: true,  alt: false },
  };
  const c = configs[aesthetic] || configs.default;
  return `    sections: {
      "padding-y": "${c.py}",
      "padding-y-hero": "${c.pyHero}",
      "padding-x": "${c.px}",
      "max-width": "${c.max}",
      gap: "${c.gap}",
      "title-align": "${c.titleAlign}",
      "divider-above": ${c.above},
      "divider-below": ${c.below},
      "background-alt": ${c.alt},
      indent: "0px",
    },`;
}

function getDividersBlock(aesthetic) {
  const configs = {
    structural:  { style: "solid", width: "1px", cross: true,  ornament: "cross" },
    minimal:     { style: "none",  width: "0px", cross: false, ornament: "none" },
    dark:        { style: "solid", width: "1px", cross: false, ornament: "none" },
    colorful:    { style: "solid", width: "1px", cross: false, ornament: "none" },
    editorial:   { style: "solid", width: "1px", cross: false, ornament: "dash" },
    industrial:  { style: "solid", width: "2px", cross: false, ornament: "none" },
    edgeless:    { style: "solid", width: "1px", cross: false, ornament: "none" },
    default:     { style: "solid", width: "1px", cross: false, ornament: "none" },
  };
  const c = configs[aesthetic] || configs.default;
  return `    dividers: {
      style: "${c.style}",
      width: "${c.width}",
      color: "var(--s-border)",
      spacing: "0px",
      "show-cross": ${c.cross},
      "show-label": false,
      "full-bleed": ${aesthetic === "industrial"},
      ornament: "${c.ornament}",
    },`;
}

function getGridVisualsBlock(aesthetic) {
  const configs = {
    structural:  { lines: true,  dots: true,  cellBorder: true,  hover: "none" },
    minimal:     { lines: false, dots: false, cellBorder: false, hover: "lift" },
    dark:        { lines: false, dots: false, cellBorder: false, hover: "glow" },
    colorful:    { lines: false, dots: false, cellBorder: false, hover: "highlight" },
    editorial:   { lines: false, dots: false, cellBorder: false, hover: "border" },
    industrial:  { lines: true,  dots: false, cellBorder: true,  hover: "border" },
    edgeless:    { lines: false, dots: false, cellBorder: false, hover: "highlight" },
    default:     { lines: false, dots: false, cellBorder: false, hover: "lift" },
  };
  const c = configs[aesthetic] || configs.default;
  return `    gridVisuals: {
      "show-lines": ${c.lines},
      "line-color": "var(--s-border-muted)",
      "line-width": "${aesthetic === "industrial" ? "2px" : "1px"}",
      "show-dots": ${c.dots},
      "dot-size": "2px",
      "cell-background": "none",
      "cell-border": ${c.cellBorder},
      "cell-radius": "0px",
      "cell-padding": "16px",
      "hover-effect": "${c.hover}",
    },`;
}

function getFocusBlock(aesthetic) {
  const ringWidths = { industrial: "3px", editorial: "1.5px" };
  const ringOffsets = { dark: "0px", industrial: "0px" };
  return `    focus: {
      "ring-width": "${ringWidths[aesthetic] || "2px"}",
      "ring-color": "var(--s-primary)",
      "ring-offset": "${ringOffsets[aesthetic] || "2px"}",
      "ring-shadow": "0 0 0 ${ringWidths[aesthetic] || "2px"} var(--s-primary)",
      "outline-color": "var(--s-primary)",
    },`;
}

function getOverlaysBlock(aesthetic) {
  const bgs = {
    dark: "rgb(0 0 0 / 0.7)", minimal: "rgb(0 0 0 / 0.4)",
    editorial: "rgb(0 0 0 / 0.4)", industrial: "rgb(0 0 0 / 0.6)",
  };
  const blurs = { dark: "12px", minimal: "4px", editorial: "4px", industrial: "4px" };
  return `    overlays: {
      bg: "${bgs[aesthetic] || "rgb(0 0 0 / 0.5)"}",
      blur: "${blurs[aesthetic] || "8px"}",
      surface: "var(--s-surface-elevated)",
      border: "1px solid var(--s-border-muted)",
      shadow: "var(--s-shadow-xl)",
      radius: "var(--s-radius-lg)",
      padding: "20px",
      "z-index": "50",
    },`;
}

function getDataVizBlock() {
  return `    dataViz: {
      "series-1": "var(--s-primary)",
      "series-2": "var(--s-secondary)",
      "series-3": "var(--s-accent)",
      "series-4": "var(--s-info)",
      "series-5": "var(--s-success)",
      positive: "var(--s-success)",
      negative: "var(--s-error)",
      neutral: "var(--s-text-muted)",
      grid: "var(--s-border-muted)",
      axis: "var(--s-border)",
      label: "var(--s-text-secondary)",
      "tooltip-bg": "var(--s-surface-elevated)",
      "tooltip-border": "var(--s-border-muted)",
    },`;
}

function getMediaBlock() {
  return `    media: {
      radius: "var(--s-radius-md)",
      border: "none",
      outline: "1px solid rgb(0 0 0 / 0.08)",
      shadow: "none",
      bg: "var(--s-surface-sunken)",
      "object-fit": "cover",
    },`;
}

function getControlsBlock() {
  return `    controls: {
      height: "38px",
      "height-sm": "30px",
      "height-lg": "46px",
      "hit-area": "44px",
      "icon-size": "16px",
      "handle-size": "20px",
      "track-height": "4px",
      "track-bg": "var(--s-border-muted)",
      "track-fill": "var(--s-primary)",
      "thumb-bg": "var(--s-surface-elevated)",
      "thumb-border": "2px solid var(--s-primary)",
    },`;
}

function getComponentSurfacesBlock() {
  return `    componentSurfaces: {
      bg: "var(--s-surface)",
      "bg-elevated": "var(--s-surface-elevated)",
      "bg-muted": "var(--s-surface-sunken)",
      border: "var(--s-border)",
      "border-muted": "var(--s-border-muted)",
      "border-strong": "var(--s-border-strong)",
      text: "var(--s-text)",
      "text-muted": "var(--s-text-muted)",
      contrast: "var(--s-primary-contrast)",
      "hover-bg": "var(--s-surface-elevated)",
      "active-bg": "var(--s-surface-sunken)",
      "selected-bg": "var(--s-primary-muted)",
    },`;
}

// Ordered list: the categories we may need to add, in canonical order.
// The order matters because they're appended sequentially after the last
// existing category in the file.
const ADDABLE_CATEGORIES = [
  { key: "alignment",         gen: (a) => getAlignmentBlock(a) },
  { key: "sections",          gen: (a) => getSectionsBlock(a) },
  { key: "dividers",          gen: (a) => getDividersBlock(a) },
  { key: "gridVisuals",       gen: (a) => getGridVisualsBlock(a) },
  { key: "cursor",            gen: (a) => getCursorBlock(a) },
  { key: "scrollbar",         gen: (a) => getScrollbarBlock(a) },
  { key: "focus",             gen: (a) => getFocusBlock(a) },
  { key: "overlays",          gen: (a) => getOverlaysBlock(a) },
  { key: "dataViz",           gen: () => getDataVizBlock() },
  { key: "media",             gen: () => getMediaBlock() },
  { key: "controls",          gen: () => getControlsBlock() },
  { key: "componentSurfaces", gen: () => getComponentSurfacesBlock() },
];

// ── Main ────────────────────────────────────────────────────────────────────

const SKIP = new Set(["_template.ts", "index.ts", "catalog.ts"]);

const files = fs.readdirSync(PRESET_DIR).filter(
  (f) => f.endsWith(".ts") && !SKIP.has(f),
);

let totalUpdated = 0;
let totalAdded = 0;

for (const file of files) {
  const presetName = file.replace(".ts", "");
  const aesthetic = AESTHETIC[presetName];
  if (!aesthetic) {
    console.log(`⚠  Skipping ${file} — not in aesthetic map`);
    continue;
  }

  const filePath = path.join(PRESET_DIR, file);
  let content = fs.readFileSync(filePath, "utf-8");
  const present = detectCategories(content);

  const missing = ADDABLE_CATEGORIES.filter((c) => !present.has(c.key));
  if (missing.length === 0) {
    console.log(`✓  ${file} — all categories present`);
    continue;
  }

  // Build the block to insert
  const blocks = missing.map((c) => c.gen(aesthetic));
  const insertion = "\n" + blocks.join("\n") + "\n";

  // Find insertion point: the last `    },` before `  },\n};`
  // The tokens object closes with `  },` and the preset object with `};`
  const closingPattern = /(\n  },\n};?\n?)$/;
  const match = content.match(closingPattern);
  if (!match) {
    console.log(`⚠  ${file} — could not find tokens closing pattern, skipping`);
    continue;
  }

  const insertIdx = match.index;
  content = content.slice(0, insertIdx) + insertion + content.slice(insertIdx);

  fs.writeFileSync(filePath, content, "utf-8");
  totalUpdated++;
  totalAdded += missing.length;
  console.log(`✓  ${file} — added ${missing.length} categories: ${missing.map((c) => c.key).join(", ")}`);
}

console.log(`\nDone. Updated ${totalUpdated} files, added ${totalAdded} total category blocks.`);
