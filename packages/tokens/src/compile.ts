import type {
  ColorTokens,
  ColorValue,
  CssCompileOptions,
  SigilTokens,
  ThemedColor,
} from "./types";
import { defaultTokens } from "./tokens";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

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
  tokens: SigilTokens,
  options: CssCompileOptions = {},
): string {
  const resolvedTokens = deepMerge(defaultTokens, tokens) as SigilTokens;
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
      lightVars.push(`${cssVar(prefix, key)}: ${value};`);
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

  // Assemble
  const lines: string[] = [];

  if (includeLight) {
    lines.push(`${selector} {`);
    for (const v of lightVars) {
      lines.push(`${indent(1)}${v}`);
    }
    lines.push("}");
  }

  if (includeDark && darkVars.length > 0) {
    lines.push("");
    lines.push(`${darkSelector} {`);
    for (const v of darkVars) {
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
export function compileToTailwind(tokens: SigilTokens): string {
  const lines: string[] = ["@theme {"];
  const p = "s";

  // Colors → --color-*
  for (const key of Object.keys(tokens.colors)) {
    lines.push(`${indent(1)}--color-${key}: var(--${p}-${key});`);
  }

  // Typography → --font-*
  lines.push("");
  lines.push(`${indent(1)}--font-display: var(--${p}-font-display);`);
  lines.push(`${indent(1)}--font-body: var(--${p}-font-body);`);
  lines.push(`${indent(1)}--font-mono: var(--${p}-font-mono);`);

  // Spacing → --spacing-*
  lines.push("");
  for (const step of tokens.spacing.scale) {
    lines.push(
      `${indent(1)}--spacing-${step}: var(--${p}-space-${step});`,
    );
  }

  // Radius → --radius-*
  lines.push("");
  for (const key of Object.keys(tokens.radius)) {
    lines.push(`${indent(1)}--radius-${key}: var(--${p}-radius-${key});`);
  }

  // Shadows → --shadow-*
  lines.push("");
  for (const key of Object.keys(tokens.shadows)) {
    lines.push(`${indent(1)}--shadow-${key}: var(--${p}-shadow-${key});`);
  }

  // Motion durations → --duration-*
  lines.push("");
  for (const key of Object.keys(tokens.motion.duration)) {
    lines.push(
      `${indent(1)}--duration-${key}: var(--${p}-duration-${key});`,
    );
  }

  // Motion easings → --ease-*
  lines.push("");
  for (const key of Object.keys(tokens.motion.easing)) {
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

function stripBackticks(s: string): string {
  return s.replace(/^`|`$/g, "");
}

/**
 * Parses the canonical `sigil.tokens.md` file back into a SigilTokens
 * object. This is the read side of the agent-editable token loop.
 *
 * The markdown format uses tables with columns:
 * `Token | Light Value | Dark Value | Description`
 * for themed tokens, and
 * `Token | Value | Description`
 * for static tokens.
 */
export function parseMarkdownTokens(markdown: string): SigilTokens {
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
