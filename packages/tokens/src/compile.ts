import type {
  ColorTokens,
  ColorValue,
  CssCompileOptions,
  DesignComponent,
  DesignDocument,
  DesignMetadata,
  DesignSurface,
  MarkdownTokenOverrides,
  SigilTokens,
  ThemedColor,
} from "./types";
import { defaultTokens } from "./tokens";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const REM_BASE = 16;

/**
 * Convert px values to rem in a CSS value string.
 * Handles simple values ("50px" → "3.125rem"), compound shorthand
 * ("100px 25px" → "6.25rem 1.5625rem"), and fallbacks inside var()
 * ("var(--s-foo, 25px)" → "var(--s-foo, 1.5625rem)").
 * Non-px units (%, vw, em, rem, ms, etc.) pass through unchanged.
 */
function pxToRem(value: string): string {
  return value.replace(/(\d+(?:\.\d+)?)px/g, (_, num) => {
    const px = parseFloat(num);
    if (px === 0) return "0";
    const rem = px / REM_BASE;
    const str = rem % 1 === 0 ? String(rem) : rem.toFixed(4).replace(/0+$/, "");
    return `${str}rem`;
  });
}

/**
 * CSS variables that should stay in px (borders, shadows, strokes,
 * timing, decorative patterns). Everything else converts to rem
 * for accessibility (scales with user font-size preference).
 */
const PX_ONLY_RE =
  /(?:border(?!.*radius)|shadow|stroke|outline|scrollbar|divider-(?:width|style)|duration|ease-|opacity|weight$|columns$|style$|separator|^--\w+-bg-|^--\w+-code-|^--\w+-cursor-|^--\w+-grid-(?!cell))/;

function shouldConvertToRem(varName: string): boolean {
  return !PX_ONLY_RE.test(varName);
}

/**
 * Post-process assembled CSS variable lines, converting px → rem
 * for spacing/sizing tokens while leaving borders/shadows in px.
 */
function convertVarsToRem(vars: string[]): string[] {
  return vars.map((line) => {
    const match = line.match(/^(--[\w-]+):\s*(.+);$/);
    if (!match) return line;
    const [, varName, value] = match;
    if (!shouldConvertToRem(varName)) return line;
    const converted = pxToRem(value);
    if (converted === value) return line;
    return `${varName}: ${converted};`;
  });
}

function isThemedColor(value: unknown): value is ThemedColor {
  return (
    typeof value === "object" &&
    value !== null &&
    "light" in value &&
    "dark" in value
  );
}

function cssVar(prefix: string, ...segments: string[]): string {
  return `--${prefix}-${segments.join("-")}`;
}

function indent(depth: number): string {
  return "  ".repeat(depth);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function deepMerge<T extends Record<string, unknown>>(base: T, override: Record<string, unknown>): T {
  const result: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const baseValue = result[key];
    if (isPlainObject(baseValue) && isPlainObject(value)) {
      result[key] = deepMerge(baseValue, value);
    } else if (value !== undefined) {
      result[key] = value;
    }
  }
  return result as T;
}

function emitTokenGroup(
  target: string[],
  prefix: string,
  group: string,
  tokens: Record<string, unknown> | undefined,
): void {
  if (!tokens) return;
  for (const [key, value] of Object.entries(tokens)) {
    if (value === undefined) continue;
    if (typeof value === "boolean") {
      target.push(`${cssVar(prefix, group, key)}: ${value ? "1" : "0"};`);
    } else {
      target.push(`${cssVar(prefix, group, key)}: ${value};`);
    }
  }
}

// ---------------------------------------------------------------------------
// compileToCss
// ---------------------------------------------------------------------------

/**
 * Generates CSS custom property declarations for `:root` (light) and a dark
 * mode selector. Themed colors emit both a light and dark value; static
 * values emit once in `:root`.
 */
export function compileToCss(
  tokens: SigilTokens | Partial<SigilTokens>,
  options: CssCompileOptions = {},
): string {
  const resolvedTokens = deepMerge(defaultTokens, tokens as Record<string, unknown>) as SigilTokens;
  const {
    prefix = "s",
    includeLight = true,
    includeDark = true,
    selector = ":root",
    darkSelector = "[data-theme='dark']",
  } = options;

  const lightVars: string[] = [];
  const darkVars: string[] = [];

  function emitColor(name: string, value: ColorValue | ThemedColor): void {
    if (isThemedColor(value)) {
      lightVars.push(`${cssVar(prefix, name)}: ${value.light};`);
      darkVars.push(`${cssVar(prefix, name)}: ${value.dark};`);
    } else {
      lightVars.push(`${cssVar(prefix, name)}: ${value};`);
    }
  }

  // Colors
  const colors = resolvedTokens.colors;
  for (const [key, value] of Object.entries(colors) as [
    keyof ColorTokens,
    ColorValue | ThemedColor,
  ][]) {
    emitColor(key, value);
  }

  // Typography
  for (const [key, value] of Object.entries(resolvedTokens.typography)) {
    lightVars.push(`${cssVar(prefix, key)}: ${value};`);
  }

  // Spacing scale → --s-space-{value}
  for (const step of resolvedTokens.spacing.scale) {
    lightVars.push(
      `${cssVar(prefix, "space", String(step))}: ${step}${resolvedTokens.spacing.unit};`,
    );
  }

  // Sigil grid
  for (const [key, value] of Object.entries(resolvedTokens.sigil)) {
    if (typeof value === "boolean") {
      lightVars.push(`${cssVar(prefix, key)}: ${value ? "1" : "0"};`);
    } else {
      lightVars.push(`${cssVar(prefix, key)}: ${value};`);
    }
  }

  // Radius
  for (const [key, value] of Object.entries(resolvedTokens.radius)) {
    lightVars.push(`${cssVar(prefix, "radius", key)}: ${value};`);
  }

  // Shadows
  for (const [key, value] of Object.entries(resolvedTokens.shadows)) {
    lightVars.push(`${cssVar(prefix, "shadow", key)}: ${value};`);
  }

  // Motion durations
  for (const [key, value] of Object.entries(resolvedTokens.motion.duration)) {
    lightVars.push(`${cssVar(prefix, "duration", key)}: ${value};`);
  }

  // Motion easings
  for (const [key, value] of Object.entries(resolvedTokens.motion.easing)) {
    lightVars.push(`${cssVar(prefix, "ease", key)}: ${value};`);
  }

  // Borders — widths
  for (const [key, value] of Object.entries(resolvedTokens.borders.width)) {
    lightVars.push(`${cssVar(prefix, "border", key)}: ${value};`);
  }
  // Borders — style + per-component
  if (resolvedTokens.borders.style) lightVars.push(`${cssVar(prefix, "border-style")}: ${resolvedTokens.borders.style};`);
  if (resolvedTokens.borders["card-border"]) lightVars.push(`${cssVar(prefix, "card-border")}: ${resolvedTokens.borders["card-border"]};`);
  if (resolvedTokens.borders["card-border-hover"]) lightVars.push(`${cssVar(prefix, "card-border-hover")}: ${resolvedTokens.borders["card-border-hover"]};`);
  if (resolvedTokens.borders["button-border"]) lightVars.push(`${cssVar(prefix, "button-border")}: ${resolvedTokens.borders["button-border"]};`);
  if (resolvedTokens.borders["input-border"]) lightVars.push(`${cssVar(prefix, "input-border")}: ${resolvedTokens.borders["input-border"]};`);
  if (resolvedTokens.borders["divider-style"]) lightVars.push(`${cssVar(prefix, "divider-style")}: ${resolvedTokens.borders["divider-style"]};`);
  if (resolvedTokens.borders["divider-width"]) lightVars.push(`${cssVar(prefix, "divider-width")}: ${resolvedTokens.borders["divider-width"]};`);

  // Buttons
  if (resolvedTokens.buttons) {
    for (const [key, value] of Object.entries(resolvedTokens.buttons)) {
      lightVars.push(`${cssVar(prefix, "button", key)}: ${value};`);
    }
  }

  // Cards
  if (resolvedTokens.cards) {
    for (const [key, value] of Object.entries(resolvedTokens.cards)) {
      if (typeof value === "boolean") {
        lightVars.push(`${cssVar(prefix, "card", key)}: ${value ? "1" : "0"};`);
      } else {
        lightVars.push(`${cssVar(prefix, "card", key)}: ${value};`);
      }
    }
  }

  // Headings
  if (resolvedTokens.headings) {
    for (const [key, value] of Object.entries(resolvedTokens.headings)) {
      lightVars.push(`${cssVar(prefix, "heading", key)}: ${value};`);
    }
  }

  // Navigation
  if (resolvedTokens.navigation) {
    for (const [key, value] of Object.entries(resolvedTokens.navigation)) {
      lightVars.push(`${cssVar(prefix, key)}: ${value};`);
    }
  }

  // Inputs
  if (resolvedTokens.inputs) {
    for (const [key, value] of Object.entries(resolvedTokens.inputs)) {
      lightVars.push(`${cssVar(prefix, "input", key)}: ${value};`);
    }
  }

  // Cursor
  if (resolvedTokens.cursor) {
    for (const [key, value] of Object.entries(resolvedTokens.cursor)) {
      if (value !== undefined) {
        if (typeof value === "boolean") {
          lightVars.push(`${cssVar(prefix, "cursor", key)}: ${value ? "1" : "0"};`);
        } else {
          lightVars.push(`${cssVar(prefix, "cursor", key)}: ${value};`);
        }
      }
    }
  }

  // Scrollbar
  if (resolvedTokens.scrollbar) {
    for (const [key, value] of Object.entries(resolvedTokens.scrollbar)) {
      if (value !== undefined) {
        lightVars.push(`${cssVar(prefix, "scrollbar", key)}: ${value};`);
      }
    }
  }

  // Code
  if (resolvedTokens.code) {
    for (const [key, value] of Object.entries(resolvedTokens.code)) {
      lightVars.push(`${cssVar(prefix, "code", key)}: ${value};`);
    }
  }

  // Backgrounds
  if (resolvedTokens.backgrounds) {
    for (const [key, value] of Object.entries(resolvedTokens.backgrounds)) {
      if (typeof value === "boolean") {
        lightVars.push(`${cssVar(prefix, "bg", key)}: ${value ? "1" : "0"};`);
      } else {
        lightVars.push(`${cssVar(prefix, "bg", key)}: ${value};`);
      }
    }
  }

  // Spacing — non-scale fields
  for (const [key, value] of Object.entries(resolvedTokens.spacing)) {
    if (key === "scale" || key === "unit") continue;
    lightVars.push(`${cssVar(prefix, key)}: ${value};`);
  }

  // Motion — non-duration/easing fields
  for (const [key, value] of Object.entries(resolvedTokens.motion)) {
    if (key === "duration" || key === "easing") continue;
    if (value !== undefined) lightVars.push(`${cssVar(prefix, key)}: ${value};`);
  }

  // Layout
  if (resolvedTokens.layout) {
    for (const [key, value] of Object.entries(resolvedTokens.layout)) {
      lightVars.push(`${cssVar(prefix, key)}: ${value};`);
    }
  }

  // Alignment
  if (resolvedTokens.alignment) {
    for (const [key, value] of Object.entries(resolvedTokens.alignment)) {
      if (value !== undefined) {
        if (typeof value === "boolean") {
          lightVars.push(`${cssVar(prefix, "align", key)}: ${value ? "1" : "0"};`);
        } else {
          lightVars.push(`${cssVar(prefix, "align", key)}: ${value};`);
        }
      }
    }
  }

  // Sections
  if (resolvedTokens.sections) {
    for (const [key, value] of Object.entries(resolvedTokens.sections)) {
      if (value !== undefined) {
        if (typeof value === "boolean") {
          lightVars.push(`${cssVar(prefix, "section", key)}: ${value ? "1" : "0"};`);
        } else {
          lightVars.push(`${cssVar(prefix, "section", key)}: ${value};`);
        }
      }
    }
  }

  // Dividers
  if (resolvedTokens.dividers) {
    for (const [key, value] of Object.entries(resolvedTokens.dividers)) {
      if (value !== undefined) {
        if (typeof value === "boolean") {
          lightVars.push(`${cssVar(prefix, "divider", key)}: ${value ? "1" : "0"};`);
        } else {
          lightVars.push(`${cssVar(prefix, "divider", key)}: ${value};`);
        }
      }
    }
  }

  // Grid visuals
  if (resolvedTokens.gridVisuals) {
    for (const [key, value] of Object.entries(resolvedTokens.gridVisuals)) {
      if (value !== undefined) {
        if (typeof value === "boolean") {
          lightVars.push(`${cssVar(prefix, "grid", key)}: ${value ? "1" : "0"};`);
        } else {
          lightVars.push(`${cssVar(prefix, "grid", key)}: ${value};`);
        }
      }
    }
  }

  emitTokenGroup(lightVars, prefix, "focus", resolvedTokens.focus);
  emitTokenGroup(lightVars, prefix, "overlay", resolvedTokens.overlays);
  emitTokenGroup(lightVars, prefix, "chart", resolvedTokens.dataViz);
  emitTokenGroup(lightVars, prefix, "media", resolvedTokens.media);
  emitTokenGroup(lightVars, prefix, "control", resolvedTokens.controls);
  emitTokenGroup(lightVars, prefix, "component-surface", resolvedTokens.componentSurfaces);

  // Hero
  emitTokenGroup(lightVars, prefix, "hero", resolvedTokens.hero);

  // CTA
  emitTokenGroup(lightVars, prefix, "cta", resolvedTokens.cta);

  // Footer
  emitTokenGroup(lightVars, prefix, "footer", resolvedTokens.footer);

  // Banner
  emitTokenGroup(lightVars, prefix, "banner", resolvedTokens.banner);

  // Page rhythm
  emitTokenGroup(lightVars, prefix, "rhythm", resolvedTokens.pageRhythm);

  // Convert px → rem for accessibility (spacing, sizing, typography).
  // Borders, shadows, strokes, and timing stay in px.
  const finalLight = convertVarsToRem(lightVars);
  const finalDark = convertVarsToRem(darkVars);

  // Assemble
  const lines: string[] = [];

  if (includeLight) {
    lines.push(`${selector} {`);
    for (const v of finalLight) {
      lines.push(`${indent(1)}${v}`);
    }
    lines.push("}");
  }

  if (includeDark && finalDark.length > 0) {
    lines.push("");
    lines.push(`${darkSelector} {`);
    for (const v of finalDark) {
      lines.push(`${indent(1)}${v}`);
    }
    lines.push("}");
  }

  return lines.join("\n") + "\n";
}

// ---------------------------------------------------------------------------
// compileInteractionCss
// ---------------------------------------------------------------------------

/**
 * Generates opt-in native interaction styling for token-driven scrollbars and
 * the custom cursor host attribute.
 */
export function compileInteractionCss(options: CssCompileOptions = {}): string {
  const { prefix = "s" } = options;
  const p = `--${prefix}`;

  return [
    ".sigil-scrollbar, [data-sigil-scrollbar] {",
    `  scrollbar-width: var(${p}-scrollbar-firefox-width, thin);`,
    `  scrollbar-color: var(${p}-scrollbar-thumb, var(${p}-border)) var(${p}-scrollbar-track, transparent);`,
    `  scrollbar-gutter: var(${p}-scrollbar-gutter, auto);`,
    "}",
    "",
    ".sigil-scrollbar::-webkit-scrollbar, [data-sigil-scrollbar]::-webkit-scrollbar {",
    `  width: var(${p}-scrollbar-width, 10px);`,
    `  height: var(${p}-scrollbar-height, 10px);`,
    "}",
    "",
    ".sigil-scrollbar::-webkit-scrollbar-track, [data-sigil-scrollbar]::-webkit-scrollbar-track {",
    `  background: var(${p}-scrollbar-track, transparent);`,
    `  border-radius: var(${p}-scrollbar-radius, var(${p}-radius-full));`,
    "}",
    "",
    ".sigil-scrollbar::-webkit-scrollbar-thumb, [data-sigil-scrollbar]::-webkit-scrollbar-thumb {",
    `  background: var(${p}-scrollbar-thumb, var(${p}-border));`,
    `  border: var(${p}-scrollbar-padding, 2px) solid var(${p}-scrollbar-track, transparent);`,
    `  border-radius: var(${p}-scrollbar-radius, var(${p}-radius-full));`,
    "  background-clip: padding-box;",
    "}",
    "",
    ".sigil-scrollbar::-webkit-scrollbar-thumb:hover, [data-sigil-scrollbar]::-webkit-scrollbar-thumb:hover {",
    `  background: var(${p}-scrollbar-thumb-hover, var(${p}-border-strong));`,
    "  background-clip: padding-box;",
    "}",
    "",
    ".sigil-scrollbar::-webkit-scrollbar-thumb:active, [data-sigil-scrollbar]::-webkit-scrollbar-thumb:active {",
    `  background: var(${p}-scrollbar-thumb-active, var(${p}-primary));`,
    "  background-clip: padding-box;",
    "}",
    "",
    ".sigil-scrollbar::-webkit-scrollbar-corner, [data-sigil-scrollbar]::-webkit-scrollbar-corner {",
    `  background: var(${p}-scrollbar-corner, transparent);`,
    "}",
    "",
    ".sigil-scrollbar-hidden, [data-sigil-scrollbar='hidden'] {",
    "  scrollbar-width: none;",
    "}",
    "",
    ".sigil-scrollbar-hidden::-webkit-scrollbar, [data-sigil-scrollbar='hidden']::-webkit-scrollbar {",
    "  display: none;",
    "}",
    "",
    "[data-sigil-cursor='custom'], [data-sigil-cursor='custom'] * {",
    "  cursor: none !important;",
    "}",
    "",
  ].join("\n");
}

// ---------------------------------------------------------------------------
// compileToTailwind
// ---------------------------------------------------------------------------

/**
 * Generates a Tailwind CSS v4 `@theme` block that maps CSS variables
 * to Tailwind utility names.
 */
export function compileToTailwind(tokens: SigilTokens | Partial<SigilTokens>): string {
  const resolvedTokens = deepMerge(defaultTokens, tokens as Record<string, unknown>) as SigilTokens;
  const lines: string[] = ["@theme {"];
  const p = "s";

  // Colors → --color-*
  for (const key of Object.keys(resolvedTokens.colors)) {
    lines.push(`${indent(1)}--color-${key}: var(--${p}-${key});`);
  }

  // Typography → --font-*
  lines.push("");
  lines.push(`${indent(1)}--font-display: var(--${p}-font-display);`);
  lines.push(`${indent(1)}--font-body: var(--${p}-font-body);`);
  lines.push(`${indent(1)}--font-mono: var(--${p}-font-mono);`);

  // Spacing → --spacing-*
  lines.push("");
  for (const step of resolvedTokens.spacing.scale) {
    lines.push(
      `${indent(1)}--spacing-${step}: var(--${p}-space-${step});`,
    );
  }

  // Radius → --radius-*
  lines.push("");
  for (const key of Object.keys(resolvedTokens.radius)) {
    lines.push(`${indent(1)}--radius-${key}: var(--${p}-radius-${key});`);
  }

  // Shadows → --shadow-*
  lines.push("");
  for (const key of Object.keys(resolvedTokens.shadows)) {
    lines.push(`${indent(1)}--shadow-${key}: var(--${p}-shadow-${key});`);
  }

  // Motion durations → --duration-*
  lines.push("");
  for (const key of Object.keys(resolvedTokens.motion.duration)) {
    lines.push(
      `${indent(1)}--duration-${key}: var(--${p}-duration-${key});`,
    );
  }

  // Motion easings → --ease-*
  lines.push("");
  for (const key of Object.keys(resolvedTokens.motion.easing)) {
    lines.push(`${indent(1)}--ease-${key}: var(--${p}-ease-${key});`);
  }

  lines.push("}");

  return lines.join("\n") + "\n";
}

// ---------------------------------------------------------------------------
// compileToTs
// ---------------------------------------------------------------------------

/**
 * Generates a TypeScript source file exporting a `tokens` constant
 * that mirrors the design token values as a plain object.
 */
export function compileToTs(tokens: SigilTokens): string {
  const json = JSON.stringify(tokens, null, 2);
  const lines = [
    "// Auto-generated by @sigil-ui/tokens — do not edit manually",
    `import type { SigilTokens } from "@sigil-ui/tokens";`,
    "",
    `export const tokens: SigilTokens = ${json} as const;`,
    "",
  ];
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// compileToJson
// ---------------------------------------------------------------------------

/**
 * Serializes tokens to a JSON string for tooling and validation.
 */
export function compileToJson(tokens: SigilTokens): string {
  return JSON.stringify(tokens, null, 2) + "\n";
}

// ---------------------------------------------------------------------------
// parseMarkdownTokens
// ---------------------------------------------------------------------------

type TableRow = { cells: string[] };

function parseMarkdownTable(block: string): TableRow[] {
  const lines = block
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("|"));

  if (lines.length < 3) return [];

  // Skip header row (index 0) and separator row (index 1)
  return lines.slice(2).map((line) => ({
    cells: line
      .split("|")
      .slice(1, -1)
      .map((c) => c.trim()),
  }));
}

function findSection(markdown: string, heading: string): string {
  const escapedHeading = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `^#{1,3}\\s+${escapedHeading}\\s*$`,
    "im",
  );
  const match = pattern.exec(markdown);
  if (!match) return "";

  const start = match.index + match[0].length;
  const nextHeading = /^#{1,3}\s+/m.exec(markdown.slice(start));
  const end = nextHeading ? start + nextHeading.index : markdown.length;

  return markdown.slice(start, end);
}

/**
 * Like findSection but only stops at same-level or higher headings.
 * Allows subsections (### inside ##) to be included.
 */
function findSectionDeep(markdown: string, heading: string): string {
  const escapedHeading = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `^(#{1,3})\\s+${escapedHeading}\\s*$`,
    "im",
  );
  const match = pattern.exec(markdown);
  if (!match) return "";

  const level = match[1].length;
  const start = match.index + match[0].length;

  const stopPattern = new RegExp(`^#{1,${level}}\\s+`, "m");
  const nextHeading = stopPattern.exec(markdown.slice(start));
  const end = nextHeading ? start + nextHeading.index : markdown.length;

  return markdown.slice(start, end);
}

function stripBackticks(s: string): string {
  return s.replace(/^`|`$/g, "");
}

/**
 * Parses the canonical `sigil.tokens.md` override file back into the core
 * markdown-editable token groups. Full presets use typed `SigilTokens`; this
 * parser intentionally covers the human/agent-friendly markdown surface.
 *
 * The markdown format uses tables with columns:
 * `Token | Light Value | Dark Value | Description`
 * for themed tokens, and
 * `Token | Value | Description`
 * for static tokens.
 */
export function parseMarkdownTokens(markdown: string): MarkdownTokenOverrides {
  const colors = parseColorSection(markdown);
  const typography = parseTypographySection(markdown);
  const spacing = parseSpacingSection(markdown);
  const sigil = parseSigilGridSection(markdown);
  const radius = parseRadiusSection(markdown);
  const shadows = parseShadowSection(markdown);
  const motion = parseMotionSection(markdown);
  const borders = parseBorderSection(markdown);

  return { colors, typography, spacing, sigil, radius, shadows, motion, borders };
}

// ---------------------------------------------------------------------------
// Section parsers
// ---------------------------------------------------------------------------

const THEMED_COLOR_KEYS = new Set([
  "background",
  "surface",
  "surface-elevated",
  "text",
  "text-secondary",
  "text-muted",
  "text-subtle",
  "text-disabled",
  "border",
  "border-muted",
  "border-strong",
  "border-interactive",
  "highlight",
]);

function parseColorSection(markdown: string): SigilTokens["colors"] {
  const section = findSection(markdown, "Colors");
  const rows = parseMarkdownTable(section);

  const result: Record<string, unknown> = {};

  for (const row of rows) {
    const token = stripBackticks(row.cells[0] ?? "");
    const lightVal = stripBackticks(row.cells[1] ?? "");
    const darkVal = stripBackticks(row.cells[2] ?? "");

    if (!token) continue;

    if (THEMED_COLOR_KEYS.has(token)) {
      result[token] = { light: lightVal, dark: darkVal };
    } else {
      result[token] = lightVal;
    }
  }

  return result as SigilTokens["colors"];
}

function parseTypographySection(
  markdown: string,
): SigilTokens["typography"] {
  const section = findSection(markdown, "Typography");
  const rows = parseMarkdownTable(section);

  const result: Record<string, string> = {};
  for (const row of rows) {
    const token = stripBackticks(row.cells[0] ?? "");
    const value = row.cells[1] ?? "";
    if (token) result[token] = value;
  }

  return result as unknown as SigilTokens["typography"];
}

function parseSpacingSection(markdown: string): SigilTokens["spacing"] {
  const section = findSection(markdown, "Spacing");
  const rows = parseMarkdownTable(section);

  const scale: number[] = [];
  for (const row of rows) {
    const value = stripBackticks(row.cells[1] ?? "");
    const num = parseInt(value, 10);
    if (!Number.isNaN(num)) scale.push(num);
  }

  return { scale, unit: "px" };
}

function parseSigilGridSection(
  markdown: string,
): SigilTokens["sigil"] {
  const section = findSection(markdown, "Sigil Grid");
  const rows = parseMarkdownTable(section);

  const result: Record<string, string> = {};
  for (const row of rows) {
    const token = stripBackticks(row.cells[0] ?? "");
    const value = stripBackticks(row.cells[1] ?? "");
    if (token) result[token] = value;
  }

  return result as unknown as SigilTokens["sigil"];
}

function parseRadiusSection(markdown: string): SigilTokens["radius"] {
  const section = findSection(markdown, "Radius");
  const rows = parseMarkdownTable(section);

  const result: Record<string, string> = {};
  for (const row of rows) {
    const token = stripBackticks(row.cells[0] ?? "");
    const value = stripBackticks(row.cells[1] ?? "");
    if (token) result[token] = value;
  }

  return result as unknown as SigilTokens["radius"];
}

function parseShadowSection(markdown: string): SigilTokens["shadows"] {
  const section = findSection(markdown, "Shadows");
  const rows = parseMarkdownTable(section);

  const result: Record<string, string> = {};
  for (const row of rows) {
    const token = stripBackticks(row.cells[0] ?? "");
    const value = row.cells[1] ?? "";
    if (token) result[token] = value;
  }

  return result as unknown as SigilTokens["shadows"];
}

function parseMotionSection(markdown: string): SigilTokens["motion"] {
  const durSection = findSection(markdown, "Motion Durations");
  const durRows = parseMarkdownTable(durSection);
  const duration: Record<string, string> = {};
  for (const row of durRows) {
    const token = stripBackticks(row.cells[0] ?? "");
    const value = stripBackticks(row.cells[1] ?? "");
    if (token) duration[token] = value;
  }

  const easeSection = findSection(markdown, "Motion Easings");
  const easeRows = parseMarkdownTable(easeSection);
  const easing: Record<string, string> = {};
  for (const row of easeRows) {
    const token = stripBackticks(row.cells[0] ?? "");
    const value = row.cells[1] ?? "";
    if (token) easing[token] = value;
  }

  return {
    duration: duration as unknown as SigilTokens["motion"]["duration"],
    easing: easing as unknown as SigilTokens["motion"]["easing"],
  };
}

function parseBorderSection(markdown: string): SigilTokens["borders"] {
  const section = findSection(markdown, "Borders");
  const rows = parseMarkdownTable(section);

  const width: Record<string, string> = {};
  for (const row of rows) {
    const token = stripBackticks(row.cells[0] ?? "");
    const value = stripBackticks(row.cells[1] ?? "");
    if (token) width[token] = value;
  }

  return {
    width: width as unknown as SigilTokens["borders"]["width"],
  };
}

// ---------------------------------------------------------------------------
// parseDesignMarkdown — full DESIGN.md parser (superset of parseMarkdownTokens)
// ---------------------------------------------------------------------------

const SECTION_CATEGORY_MAP: Record<string, string> = {
  "Tokens — Colors": "colors",
  "Tokens — Typography": "typography",
  "Tokens — Spacing": "spacing",
  "Tokens — Layout": "layout",
  "Tokens — Sigil Grid": "sigil",
  "Tokens — Radius": "radius",
  "Tokens — Shadows": "shadows",
  "Tokens — Borders": "borders",
  "Tokens — Backgrounds": "backgrounds",
  "Block Tokens — Buttons": "buttons",
  "Block Tokens — Cards": "cards",
  "Block Tokens — Headings": "headings",
  "Block Tokens — Navigation": "navigation",
  "Block Tokens — Inputs": "inputs",
  "Block Tokens — Code": "code",
  "Block Tokens — Hero": "hero",
  "Block Tokens — CTA": "cta",
  "Block Tokens — Footer": "footer",
  "Block Tokens — Banner": "banner",
  "Block Tokens — Sections": "sections",
  "Composition — Page Rhythm": "pageRhythm",
  "Composition — Grid & Alignment": "alignment",
  "Composition — Dividers": "dividers",
  "Composition — Grid Visuals": "gridVisuals",
  "Composition — Data Visualization": "dataViz",
  "Composition — Media": "media",
  "Composition — Controls": "controls",
  "Composition — Component Surfaces": "componentSurfaces",
};

function parseMetadata(markdown: string): DesignMetadata {
  const headingMatch = /^#\s+(.+?)\s*(?:—|--)\s*Style Reference/m.exec(markdown);
  const brand = headingMatch ? headingMatch[1].trim() : "Untitled";

  const taglineMatch = /^>\s*(.+)$/m.exec(markdown);
  const tagline = taglineMatch ? taglineMatch[1].trim() : "";

  const themeMatch = /\*\*Theme:\*\*\s*(\w+)/i.exec(markdown);
  const theme = (themeMatch?.[1] ?? "light") as DesignMetadata["theme"];

  const presetMatch = /\*\*Preset:\*\*\s*(\S+)/i.exec(markdown);
  const preset = presetMatch?.[1] ?? "custom";

  const densityMatch = /\*\*Density:\*\*\s*(\w+)/i.exec(markdown);
  const density = (densityMatch?.[1] ?? "balanced") as DesignMetadata["density"];

  const descLines: string[] = [];
  const lines = markdown.split("\n");
  let inHeader = false;
  for (const line of lines) {
    if (line.startsWith("**Density:")) {
      inHeader = true;
      continue;
    }
    if (inHeader) {
      if (line.startsWith("##") || line.startsWith("| ")) break;
      const trimmed = line.trim();
      if (trimmed) descLines.push(trimmed);
    }
  }

  return { brand, tagline, theme, preset, density, description: descLines.join(" ") };
}

function parseStaticSection(markdown: string, heading: string): Record<string, string | boolean> {
  const section = findSection(markdown, heading);
  const rows = parseMarkdownTable(section);
  const result: Record<string, string | boolean> = {};

  for (const row of rows) {
    const token = stripBackticks(row.cells[0] ?? "");
    const value = stripBackticks(row.cells[1] ?? "");
    if (!token) continue;
    if (value === "true") result[token] = true;
    else if (value === "false") result[token] = false;
    else result[token] = value;
  }

  return result;
}

function parseMotionFull(markdown: string): SigilTokens["motion"] {
  const section = findSectionDeep(markdown, "Tokens — Motion");

  const durHeading = section.indexOf("### Durations");
  const easeHeading = section.indexOf("### Easings");
  const presetHeading = section.indexOf("### Presets");

  const durBlock = durHeading >= 0
    ? section.slice(durHeading, easeHeading >= 0 ? easeHeading : presetHeading >= 0 ? presetHeading : undefined)
    : "";
  const easeBlock = easeHeading >= 0
    ? section.slice(easeHeading, presetHeading >= 0 ? presetHeading : undefined)
    : "";
  const presetBlock = presetHeading >= 0 ? section.slice(presetHeading) : "";

  const duration: Record<string, string> = {};
  for (const row of parseMarkdownTable(durBlock)) {
    const t = stripBackticks(row.cells[0] ?? "");
    const v = stripBackticks(row.cells[1] ?? "");
    if (t) duration[t] = v;
  }

  const easing: Record<string, string> = {};
  for (const row of parseMarkdownTable(easeBlock)) {
    const t = stripBackticks(row.cells[0] ?? "");
    const v = row.cells[1] ?? "";
    if (t) easing[t] = v;
  }

  const presets: Record<string, string> = {};
  for (const row of parseMarkdownTable(presetBlock)) {
    const t = stripBackticks(row.cells[0] ?? "");
    const v = stripBackticks(row.cells[1] ?? "");
    if (t) presets[t] = v;
  }

  return {
    duration: duration as unknown as SigilTokens["motion"]["duration"],
    easing: easing as unknown as SigilTokens["motion"]["easing"],
    ...presets,
  } as SigilTokens["motion"];
}

function parseCursorAndScrollbar(markdown: string): { cursor: Record<string, string | boolean>; scrollbar: Record<string, string | boolean> } {
  const section = findSection(markdown, "Composition — Cursor & Scrollbar");
  const rows = parseMarkdownTable(section);

  const cursor: Record<string, string | boolean> = {};
  const scrollbar: Record<string, string | boolean> = {};

  const CURSOR_KEYS = new Set([
    "variant", "size", "dot-size", "stroke-width", "tick-size", "gap",
    "radius", "color", "ring-color", "dot-color", "glow", "opacity",
    "blend-mode", "z-index", "hide-native",
  ]);

  for (const row of rows) {
    const token = stripBackticks(row.cells[0] ?? "");
    let value: string | boolean = stripBackticks(row.cells[1] ?? "");
    if (!token) continue;
    if (value === "true") value = true;
    else if (value === "false") value = false;

    if (CURSOR_KEYS.has(token)) {
      cursor[token] = value;
    } else {
      scrollbar[token] = value;
    }
  }

  return { cursor, scrollbar };
}

function parseFocusAndOverlays(markdown: string): { focus: Record<string, string>; overlays: Record<string, string> } {
  const section = findSection(markdown, "Composition — Focus & Overlays");
  const rows = parseMarkdownTable(section);

  const focus: Record<string, string> = {};
  const overlays: Record<string, string> = {};

  const FOCUS_KEYS = new Set(["ring-width", "ring-color", "ring-offset", "ring-shadow", "outline-color"]);

  for (const row of rows) {
    const token = stripBackticks(row.cells[0] ?? "");
    const value = stripBackticks(row.cells[1] ?? "");
    if (!token) continue;

    if (FOCUS_KEYS.has(token)) {
      focus[token] = value;
    } else {
      overlays[token] = value;
    }
  }

  return { focus, overlays };
}

function parseComponents(markdown: string): DesignComponent[] {
  const section = findSectionDeep(markdown, "Components");
  const components: DesignComponent[] = [];
  const headingRe = /^###\s+(.+)$/gm;
  let match: RegExpExecArray | null;

  while ((match = headingRe.exec(section)) !== null) {
    const name = match[1].trim();
    const start = match.index + match[0].length;
    const nextMatch = /^###\s+/m.exec(section.slice(start));
    const end = nextMatch ? start + nextMatch.index : section.length;
    const description = section.slice(start, end).trim();
    components.push({ name, description });
  }

  return components;
}

function parseSurfaces(markdown: string): DesignSurface[] {
  const section = findSection(markdown, "Surfaces");
  const rows = parseMarkdownTable(section);
  return rows.map((row) => ({
    level: parseInt(row.cells[0] ?? "0", 10),
    name: row.cells[1]?.trim() ?? "",
    value: stripBackticks(row.cells[2] ?? ""),
    purpose: row.cells[3]?.trim() ?? "",
  }));
}

function parseDosAndDonts(markdown: string): { dos: string[]; donts: string[] } {
  const section = findSectionDeep(markdown, "Do's and Don'ts");
  const dos: string[] = [];
  const donts: string[] = [];

  let current: string[] | null = null;
  for (const line of section.split("\n")) {
    if (/^###\s+Do\b/i.test(line)) { current = dos; continue; }
    if (/^###\s+Don'?t/i.test(line)) { current = donts; continue; }
    if (current && line.startsWith("- ")) {
      current.push(line.slice(2).trim());
    }
  }

  return { dos, donts };
}

function parseProse(markdown: string, heading: string): string {
  const section = findSection(markdown, heading);
  return section.trim();
}

function parseSimilarBrands(markdown: string): string[] {
  const section = findSection(markdown, "Similar Brands");
  const brands: string[] = [];
  for (const line of section.split("\n")) {
    if (line.startsWith("- ")) brands.push(line.slice(2).trim());
  }
  return brands;
}

function parseColorSectionDesign(markdown: string): SigilTokens["colors"] {
  const section = findSection(markdown, "Tokens — Colors");
  if (!section) return parseColorSection(markdown);
  const rows = parseMarkdownTable(section);
  const result: Record<string, unknown> = {};

  for (const row of rows) {
    const token = stripBackticks(row.cells[0] ?? "");
    const lightVal = stripBackticks(row.cells[1] ?? "");
    const darkVal = stripBackticks(row.cells[2] ?? "");
    if (!token) continue;

    if (THEMED_COLOR_KEYS.has(token)) {
      result[token] = { light: lightVal, dark: darkVal };
    } else {
      result[token] = lightVal;
    }
  }

  return result as SigilTokens["colors"];
}

function parseTypographySectionDesign(markdown: string): SigilTokens["typography"] {
  const section = findSection(markdown, "Tokens — Typography");
  if (!section) return parseTypographySection(markdown);
  const rows = parseMarkdownTable(section);
  const result: Record<string, string> = {};
  for (const row of rows) {
    const token = stripBackticks(row.cells[0] ?? "");
    const value = row.cells[1] ?? "";
    if (token) result[token] = value;
  }
  return result as unknown as SigilTokens["typography"];
}

function parseSpacingSectionDesign(markdown: string): SigilTokens["spacing"] {
  const section = findSection(markdown, "Tokens — Spacing");
  if (!section) return parseSpacingSection(markdown);
  const rows = parseMarkdownTable(section);
  const scale: number[] = [];
  for (const row of rows) {
    const value = stripBackticks(row.cells[1] ?? "");
    const num = parseInt(value, 10);
    if (!Number.isNaN(num)) scale.push(num);
  }
  return { scale, unit: "px" };
}

function parseSigilGridSectionDesign(markdown: string): SigilTokens["sigil"] {
  const section = findSection(markdown, "Tokens — Sigil Grid");
  if (!section) return parseSigilGridSection(markdown);
  const rows = parseMarkdownTable(section);
  const result: Record<string, string | boolean> = {};
  for (const row of rows) {
    const token = stripBackticks(row.cells[0] ?? "");
    let value: string | boolean = stripBackticks(row.cells[1] ?? "");
    if (!token) continue;
    if (value === "true") value = true;
    else if (value === "false") value = false;
    result[token] = value;
  }
  return result as unknown as SigilTokens["sigil"];
}

function parseRadiusSectionDesign(markdown: string): SigilTokens["radius"] {
  const section = findSection(markdown, "Tokens — Radius");
  if (!section) return parseRadiusSection(markdown);
  const rows = parseMarkdownTable(section);
  const result: Record<string, string> = {};
  for (const row of rows) {
    const token = stripBackticks(row.cells[0] ?? "");
    const value = stripBackticks(row.cells[1] ?? "");
    if (token) result[token] = value;
  }
  return result as unknown as SigilTokens["radius"];
}

function parseShadowSectionDesign(markdown: string): SigilTokens["shadows"] {
  const section = findSection(markdown, "Tokens — Shadows");
  if (!section) return parseShadowSection(markdown);
  const rows = parseMarkdownTable(section);
  const result: Record<string, string> = {};
  for (const row of rows) {
    const token = stripBackticks(row.cells[0] ?? "");
    const value = row.cells[1] ?? "";
    if (token) result[token] = value;
  }
  return result as unknown as SigilTokens["shadows"];
}

function parseBorderSectionDesign(markdown: string): SigilTokens["borders"] {
  const section = findSection(markdown, "Tokens — Borders");
  if (!section) return parseBorderSection(markdown);
  const rows = parseMarkdownTable(section);
  const width: Record<string, string> = {};
  const extras: Record<string, string> = {};
  const WIDTH_KEYS = new Set(["none", "thin", "medium", "thick"]);
  for (const row of rows) {
    const token = stripBackticks(row.cells[0] ?? "");
    const value = stripBackticks(row.cells[1] ?? "");
    if (!token) continue;
    if (WIDTH_KEYS.has(token)) width[token] = value;
    else extras[token] = value;
  }
  return { width: width as unknown as SigilTokens["borders"]["width"], ...extras };
}

/**
 * Parses a full DESIGN.md into a DesignDocument.
 * Superset of parseMarkdownTokens — handles all 33 token categories
 * plus metadata, components, surfaces, do's/don'ts, and prose sections.
 */
export function parseDesignMarkdown(markdown: string): DesignDocument {
  const metadata = parseMetadata(markdown);

  // Core token sections using DESIGN.md headings (falls back to legacy headings)
  const colors = parseColorSectionDesign(markdown);
  const typography = parseTypographySectionDesign(markdown);
  const spacing = parseSpacingSectionDesign(markdown);
  const sigil = parseSigilGridSectionDesign(markdown);
  const radius = parseRadiusSectionDesign(markdown);
  const shadows = parseShadowSectionDesign(markdown);
  const borders = parseBorderSectionDesign(markdown);

  // Motion has special subsection handling
  const motion = parseMotionFull(markdown);

  // Layout (static table)
  const layout = parseStaticSection(markdown, "Tokens — Layout") as unknown as SigilTokens["layout"];

  // Backgrounds
  const backgrounds = parseStaticSection(markdown, "Tokens — Backgrounds") as unknown as SigilTokens["backgrounds"];

  // Block tokens
  const buttons = parseStaticSection(markdown, "Block Tokens — Buttons") as unknown as SigilTokens["buttons"];
  const cards = parseStaticSection(markdown, "Block Tokens — Cards") as unknown as SigilTokens["cards"];
  const headings = parseStaticSection(markdown, "Block Tokens — Headings") as unknown as SigilTokens["headings"];
  const navigation = parseStaticSection(markdown, "Block Tokens — Navigation") as unknown as SigilTokens["navigation"];
  const inputs = parseStaticSection(markdown, "Block Tokens — Inputs") as unknown as SigilTokens["inputs"];
  const code = parseStaticSection(markdown, "Block Tokens — Code") as unknown as SigilTokens["code"];
  const hero = parseStaticSection(markdown, "Block Tokens — Hero") as unknown as SigilTokens["hero"];
  const cta = parseStaticSection(markdown, "Block Tokens — CTA") as unknown as SigilTokens["cta"];
  const footer = parseStaticSection(markdown, "Block Tokens — Footer") as unknown as SigilTokens["footer"];
  const banner = parseStaticSection(markdown, "Block Tokens — Banner") as unknown as SigilTokens["banner"];
  const sections = parseStaticSection(markdown, "Block Tokens — Sections") as unknown as SigilTokens["sections"];

  // Composition tokens
  const pageRhythm = parseStaticSection(markdown, "Composition — Page Rhythm") as unknown as SigilTokens["pageRhythm"];
  const alignment = parseStaticSection(markdown, "Composition — Grid & Alignment") as unknown as SigilTokens["alignment"];
  const dividers = parseStaticSection(markdown, "Composition — Dividers") as unknown as SigilTokens["dividers"];
  const gridVisuals = parseStaticSection(markdown, "Composition — Grid Visuals") as unknown as SigilTokens["gridVisuals"];
  const dataViz = parseStaticSection(markdown, "Composition — Data Visualization") as unknown as SigilTokens["dataViz"];
  const media = parseStaticSection(markdown, "Composition — Media") as unknown as SigilTokens["media"];
  const controls = parseStaticSection(markdown, "Composition — Controls") as unknown as SigilTokens["controls"];
  const componentSurfaces = parseStaticSection(markdown, "Composition — Component Surfaces") as unknown as SigilTokens["componentSurfaces"];

  // Split sections
  const { cursor, scrollbar } = parseCursorAndScrollbar(markdown);
  const { focus, overlays } = parseFocusAndOverlays(markdown);

  const tokens: SigilTokens = {
    colors,
    typography,
    spacing,
    layout,
    sigil,
    radius,
    shadows,
    motion,
    borders,
    backgrounds,
    buttons,
    cards,
    headings,
    navigation,
    inputs,
    code,
    hero,
    cta,
    footer,
    banner,
    sections,
    pageRhythm,
    alignment,
    dividers,
    gridVisuals,
    dataViz,
    media,
    controls,
    componentSurfaces,
    cursor: cursor as unknown as SigilTokens["cursor"],
    scrollbar: scrollbar as unknown as SigilTokens["scrollbar"],
    focus: focus as unknown as SigilTokens["focus"],
    overlays: overlays as unknown as SigilTokens["overlays"],
  };

  // Prose sections
  const components = parseComponents(markdown);
  const surfaces = parseSurfaces(markdown);
  const { dos, donts } = parseDosAndDonts(markdown);
  const imagery = parseProse(markdown, "Imagery");
  const layoutProse = parseProse(markdown, "Layout");
  const similarBrands = parseSimilarBrands(markdown);

  return {
    metadata,
    tokens,
    components,
    surfaces,
    dos,
    donts,
    imagery,
    layout: layoutProse,
    similarBrands,
  };
}

// ---------------------------------------------------------------------------
// compileToW3CJson — W3C Design Tokens Community Group format
// ---------------------------------------------------------------------------

type W3CTokenValue = {
  $value: unknown;
  $type: string;
  $description?: string;
};

type W3CGroup = {
  [key: string]: W3CTokenValue | W3CGroup;
};

/**
 * Compiles SigilTokens to W3C Design Tokens Community Group JSON format.
 * Follows the spec at https://design-tokens.github.io/community-group/format/
 */
export function compileToW3CJson(tokens: SigilTokens | Partial<SigilTokens>): string {
  const resolved = deepMerge(defaultTokens, tokens as Record<string, unknown>) as SigilTokens;
  const output: W3CGroup = {};

  // Colors
  const colorGroup: W3CGroup = {};
  for (const [key, value] of Object.entries(resolved.colors)) {
    if (isThemedColor(value)) {
      colorGroup[key] = {
        $value: { light: value.light, dark: value.dark },
        $type: "color",
        $description: `Color token: ${key}`,
      };
    } else if (value !== undefined) {
      colorGroup[key] = {
        $value: value,
        $type: "color",
        $description: `Color token: ${key}`,
      };
    }
  }
  output.color = colorGroup;

  // Typography
  const fontGroup: W3CGroup = {};
  for (const [key, value] of Object.entries(resolved.typography)) {
    if (value !== undefined) {
      const type = key.startsWith("font-") ? "fontFamily"
        : key.startsWith("size-") ? "dimension"
        : key.startsWith("weight-") ? "number"
        : key.startsWith("leading-") ? "number"
        : key.startsWith("tracking-") ? "dimension"
        : "string";
      fontGroup[key] = { $value: value, $type: type };
    }
  }
  output.typography = fontGroup;

  // Spacing
  const spacingGroup: W3CGroup = {};
  for (const step of resolved.spacing.scale) {
    spacingGroup[`${step}`] = {
      $value: `${step}${resolved.spacing.unit}`,
      $type: "dimension",
    };
  }
  output.spacing = spacingGroup;

  // Radius
  const radiusGroup: W3CGroup = {};
  for (const [key, value] of Object.entries(resolved.radius)) {
    if (value !== undefined) {
      radiusGroup[key] = { $value: value, $type: "dimension" };
    }
  }
  output.radius = radiusGroup;

  // Shadows
  const shadowGroup: W3CGroup = {};
  for (const [key, value] of Object.entries(resolved.shadows)) {
    if (value !== undefined) {
      shadowGroup[key] = { $value: value, $type: "shadow" };
    }
  }
  output.shadow = shadowGroup;

  // Motion
  const motionGroup: W3CGroup = { duration: {}, easing: {} };
  for (const [key, value] of Object.entries(resolved.motion.duration)) {
    if (value !== undefined) {
      (motionGroup.duration as W3CGroup)[key] = { $value: value, $type: "duration" };
    }
  }
  for (const [key, value] of Object.entries(resolved.motion.easing)) {
    if (value !== undefined) {
      (motionGroup.easing as W3CGroup)[key] = { $value: value, $type: "cubicBezier" };
    }
  }
  output.motion = motionGroup;

  // Borders
  const borderGroup: W3CGroup = { width: {} };
  for (const [key, value] of Object.entries(resolved.borders.width)) {
    if (value !== undefined) {
      (borderGroup.width as W3CGroup)[key] = { $value: value, $type: "dimension" };
    }
  }
  output.border = borderGroup;

  // Layout
  if (resolved.layout) {
    const layoutGroup: W3CGroup = {};
    for (const [key, value] of Object.entries(resolved.layout)) {
      if (value !== undefined) {
        layoutGroup[key] = { $value: value, $type: "dimension" };
      }
    }
    output.layout = layoutGroup;
  }

  // Optional block tokens as flat groups
  const optionalGroups: [string, Record<string, unknown> | undefined][] = [
    ["buttons", resolved.buttons],
    ["cards", resolved.cards],
    ["headings", resolved.headings],
    ["navigation", resolved.navigation],
    ["inputs", resolved.inputs],
    ["code", resolved.code],
    ["backgrounds", resolved.backgrounds],
    ["hero", resolved.hero],
    ["cta", resolved.cta],
    ["footer", resolved.footer],
    ["banner", resolved.banner],
    ["sections", resolved.sections],
    ["pageRhythm", resolved.pageRhythm],
    ["alignment", resolved.alignment],
    ["dividers", resolved.dividers],
    ["gridVisuals", resolved.gridVisuals],
    ["focus", resolved.focus],
    ["overlays", resolved.overlays],
    ["dataViz", resolved.dataViz],
    ["media", resolved.media],
    ["controls", resolved.controls],
    ["componentSurfaces", resolved.componentSurfaces],
    ["cursor", resolved.cursor],
    ["scrollbar", resolved.scrollbar],
  ];

  for (const [groupName, group] of optionalGroups) {
    if (!group) continue;
    const g: W3CGroup = {};
    for (const [key, value] of Object.entries(group)) {
      if (value === undefined) continue;
      const type = typeof value === "boolean" ? "boolean" : "string";
      g[key] = { $value: value, $type: type };
    }
    output[groupName] = g;
  }

  // Extension metadata
  output.$extensions = {
    "com.sigil-ui": {
      version: "1.0",
      format: "design.md",
      totalTokens: 519,
      categories: 33,
    },
  } as unknown as W3CGroup;

  return JSON.stringify(output, null, 2) + "\n";
}

// ---------------------------------------------------------------------------
// compileDesignMd — generates a full DESIGN.md from tokens + metadata
// ---------------------------------------------------------------------------

function mdTable(headers: string[], rows: string[][]): string {
  const sep = headers.map(() => "---");
  const lines = [
    `| ${headers.join(" | ")} |`,
    `| ${sep.join(" | ")} |`,
    ...rows.map((r) => `| ${r.join(" | ")} |`),
  ];
  return lines.join("\n");
}

function tokenRow(token: string, value: string, role?: string): string[] {
  return [`\`${token}\``, `\`${value}\``, role ?? ""];
}

/**
 * Generates a full DESIGN.md string from a DesignDocument.
 * Includes all token tables, prose sections, and compiled output blocks.
 */
export function compileDesignMd(doc: DesignDocument): string {
  const { metadata, tokens } = doc;
  const resolved = deepMerge(defaultTokens, tokens as Record<string, unknown>) as SigilTokens;

  const out: string[] = [];

  // Header
  out.push(`# ${metadata.brand} — Style Reference`);
  out.push(`> ${metadata.tagline}`);
  out.push("");
  out.push(`**Theme:** ${metadata.theme}`);
  out.push(`**Preset:** ${metadata.preset}`);
  out.push(`**Density:** ${metadata.density}`);
  out.push("");
  if (metadata.description) out.push(metadata.description);
  out.push("");

  // Colors
  out.push("## Tokens — Colors");
  out.push("");
  out.push("All color values use OKLCH for perceptual uniformity and wide-gamut display support.");
  out.push("");
  const colorRows: string[][] = [];
  for (const [key, value] of Object.entries(resolved.colors)) {
    if (value === undefined) continue;
    if (isThemedColor(value)) {
      colorRows.push([`\`${key}\``, `\`${value.light}\``, `\`${value.dark}\``, key.replace(/-/g, " ")]);
    } else {
      colorRows.push([`\`${key}\``, `\`${value}\``, `\`${value}\``, key.replace(/-/g, " ")]);
    }
  }
  out.push(mdTable(["Token", "Light", "Dark", "Role"], colorRows));
  out.push("");

  // Typography
  out.push("## Tokens — Typography");
  out.push("");
  const typoRows: string[][] = [];
  for (const [key, value] of Object.entries(resolved.typography)) {
    if (value !== undefined) typoRows.push(tokenRow(key, String(value)));
  }
  out.push(mdTable(["Token", "Value", "Role"], typoRows));
  out.push("");

  // Spacing
  out.push("## Tokens — Spacing");
  out.push("");
  const spacingRows = resolved.spacing.scale.map((s) =>
    tokenRow(`space-${s}`, `${s}`, `${s}${resolved.spacing.unit} step`),
  );
  out.push(mdTable(["Token", "Value", "Role"], spacingRows));
  out.push("");

  // Layout
  out.push("## Tokens — Layout");
  out.push("");
  if (resolved.layout) {
    const layoutRows = Object.entries(resolved.layout).map(([k, v]) => tokenRow(k, String(v)));
    out.push(mdTable(["Token", "Value", "Role"], layoutRows));
  }
  out.push("");

  // Sigil Grid
  out.push("## Tokens — Sigil Grid");
  out.push("");
  const sigilRows = Object.entries(resolved.sigil).map(([k, v]) => tokenRow(k, String(v)));
  out.push(mdTable(["Token", "Value", "Role"], sigilRows));
  out.push("");

  // Radius
  out.push("## Tokens — Radius");
  out.push("");
  const radiusRows = Object.entries(resolved.radius).map(([k, v]) => tokenRow(k, String(v)));
  out.push(mdTable(["Token", "Value", "Role"], radiusRows));
  out.push("");

  // Shadows
  out.push("## Tokens — Shadows");
  out.push("");
  const shadowRows = Object.entries(resolved.shadows).map(([k, v]) => tokenRow(k, String(v)));
  out.push(mdTable(["Token", "Value", "Role"], shadowRows));
  out.push("");

  // Motion
  out.push("## Tokens — Motion");
  out.push("");
  out.push("### Durations");
  out.push("");
  const durRows = Object.entries(resolved.motion.duration).map(([k, v]) => tokenRow(k, v));
  out.push(mdTable(["Token", "Value", "Role"], durRows));
  out.push("");
  out.push("### Easings");
  out.push("");
  const easeRows = Object.entries(resolved.motion.easing).map(([k, v]) => tokenRow(k, v));
  out.push(mdTable(["Token", "Value", "Role"], easeRows));
  out.push("");
  out.push("### Presets");
  out.push("");
  const motionPresetKeys = Object.keys(resolved.motion).filter((k) => k !== "duration" && k !== "easing");
  if (motionPresetKeys.length > 0) {
    const presetRows = motionPresetKeys.map((k) =>
      tokenRow(k, String((resolved.motion as Record<string, unknown>)[k])),
    );
    out.push(mdTable(["Token", "Value", "Role"], presetRows));
  }
  out.push("");

  // Borders
  out.push("## Tokens — Borders");
  out.push("");
  const borderRows = Object.entries(resolved.borders.width).map(([k, v]) => tokenRow(k, v));
  const borderExtras = Object.entries(resolved.borders)
    .filter(([k]) => k !== "width")
    .map(([k, v]) => tokenRow(k, String(v)));
  out.push(mdTable(["Token", "Value", "Role"], [...borderRows, ...borderExtras]));
  out.push("");

  // Backgrounds
  out.push("## Tokens — Backgrounds");
  out.push("");
  if (resolved.backgrounds) {
    const bgRows = Object.entries(resolved.backgrounds).map(([k, v]) => tokenRow(k, String(v)));
    out.push(mdTable(["Token", "Value", "Role"], bgRows));
  }
  out.push("");

  // Block token helper
  function emitBlockSection(heading: string, group: Record<string, unknown> | undefined) {
    out.push(`## ${heading}`);
    out.push("");
    if (group) {
      const rows = Object.entries(group)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => tokenRow(k, String(v)));
      out.push(mdTable(["Token", "Value", "Role"], rows));
    }
    out.push("");
  }

  emitBlockSection("Block Tokens — Buttons", resolved.buttons);
  emitBlockSection("Block Tokens — Cards", resolved.cards);
  emitBlockSection("Block Tokens — Headings", resolved.headings);
  emitBlockSection("Block Tokens — Navigation", resolved.navigation);
  emitBlockSection("Block Tokens — Inputs", resolved.inputs);
  emitBlockSection("Block Tokens — Code", resolved.code);
  emitBlockSection("Block Tokens — Hero", resolved.hero);
  emitBlockSection("Block Tokens — CTA", resolved.cta);
  emitBlockSection("Block Tokens — Footer", resolved.footer);
  emitBlockSection("Block Tokens — Banner", resolved.banner);
  emitBlockSection("Block Tokens — Sections", resolved.sections);

  // Composition tokens
  emitBlockSection("Composition — Page Rhythm", resolved.pageRhythm);
  emitBlockSection("Composition — Grid & Alignment", resolved.alignment);
  emitBlockSection("Composition — Dividers", resolved.dividers);
  emitBlockSection("Composition — Grid Visuals", resolved.gridVisuals);

  // Cursor + Scrollbar combined
  out.push("## Composition — Cursor & Scrollbar");
  out.push("");
  const cursorScrollRows = [
    ...Object.entries(resolved.cursor ?? {}).filter(([, v]) => v !== undefined).map(([k, v]) => tokenRow(k, String(v))),
    ...Object.entries(resolved.scrollbar ?? {}).filter(([, v]) => v !== undefined).map(([k, v]) => tokenRow(k, String(v))),
  ];
  out.push(mdTable(["Token", "Value", "Role"], cursorScrollRows));
  out.push("");

  // Focus + Overlays combined
  out.push("## Composition — Focus & Overlays");
  out.push("");
  const focusOverlayRows = [
    ...Object.entries(resolved.focus ?? {}).filter(([, v]) => v !== undefined).map(([k, v]) => tokenRow(k, String(v))),
    ...Object.entries(resolved.overlays ?? {}).filter(([, v]) => v !== undefined).map(([k, v]) => tokenRow(k, String(v))),
  ];
  out.push(mdTable(["Token", "Value", "Role"], focusOverlayRows));
  out.push("");

  emitBlockSection("Composition — Data Visualization", resolved.dataViz);
  emitBlockSection("Composition — Media", resolved.media);
  emitBlockSection("Composition — Controls", resolved.controls);
  emitBlockSection("Composition — Component Surfaces", resolved.componentSurfaces);

  // Components
  out.push("## Components");
  out.push("");
  for (const comp of doc.components) {
    out.push(`### ${comp.name}`);
    out.push(comp.description);
    out.push("");
  }

  // Surfaces
  out.push("## Surfaces");
  out.push("");
  if (doc.surfaces.length > 0) {
    const surfRows = doc.surfaces.map((s) => [String(s.level), s.name, `\`${s.value}\``, s.purpose]);
    out.push(mdTable(["Level", "Name", "Value", "Purpose"], surfRows));
  }
  out.push("");

  // Do's and Don'ts
  out.push("## Do's and Don'ts");
  out.push("");
  out.push("### Do");
  for (const d of doc.dos) out.push(`- ${d}`);
  out.push("");
  out.push("### Don't");
  for (const d of doc.donts) out.push(`- ${d}`);
  out.push("");

  // Imagery
  out.push("## Imagery");
  out.push("");
  out.push(doc.imagery || "No specific imagery guidelines defined.");
  out.push("");

  // Layout
  out.push("## Layout");
  out.push("");
  out.push(doc.layout || "No specific layout guidelines defined.");
  out.push("");

  // Similar Brands
  out.push("## Similar Brands");
  out.push("");
  for (const b of doc.similarBrands) out.push(`- ${b}`);
  out.push("");

  // Compile — CSS
  out.push("## Compile — CSS");
  out.push("");
  out.push("```css");
  out.push(compileToCss(resolved));
  out.push("```");
  out.push("");

  // Compile — Tailwind v4
  out.push("## Compile — Tailwind v4");
  out.push("");
  out.push("```css");
  out.push(compileToTailwind(resolved));
  out.push("```");
  out.push("");

  // Compile — W3C Design Tokens
  out.push("## Compile — W3C Design Tokens");
  out.push("");
  out.push("```json");
  out.push(compileToW3CJson(resolved));
  out.push("```");
  out.push("");

  return out.join("\n");
}
