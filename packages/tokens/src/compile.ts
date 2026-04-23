import type {
  ColorTokens,
  ColorValue,
  CssCompileOptions,
  SigilTokens,
  ThemedColor,
} from "./types";

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
  const colors = tokens.colors;
  for (const [key, value] of Object.entries(colors) as [
    keyof ColorTokens,
    ColorValue | ThemedColor,
  ][]) {
    emitColor(key, value);
  }

  // Typography
  for (const [key, value] of Object.entries(tokens.typography)) {
    lightVars.push(`${cssVar(prefix, key)}: ${value};`);
  }

  // Spacing scale → --s-space-{value}
  for (const step of tokens.spacing.scale) {
    lightVars.push(
      `${cssVar(prefix, "space", String(step))}: ${step}${tokens.spacing.unit};`,
    );
  }

  // Sigil grid
  for (const [key, value] of Object.entries(tokens.sigil)) {
    lightVars.push(`${cssVar(prefix, key)}: ${value};`);
  }

  // Radius
  for (const [key, value] of Object.entries(tokens.radius)) {
    lightVars.push(`${cssVar(prefix, "radius", key)}: ${value};`);
  }

  // Shadows
  for (const [key, value] of Object.entries(tokens.shadows)) {
    lightVars.push(`${cssVar(prefix, "shadow", key)}: ${value};`);
  }

  // Motion durations
  for (const [key, value] of Object.entries(tokens.motion.duration)) {
    lightVars.push(`${cssVar(prefix, "duration", key)}: ${value};`);
  }

  // Motion easings
  for (const [key, value] of Object.entries(tokens.motion.easing)) {
    lightVars.push(`${cssVar(prefix, "ease", key)}: ${value};`);
  }

  // Borders — widths
  for (const [key, value] of Object.entries(tokens.borders.width)) {
    lightVars.push(`${cssVar(prefix, "border", key)}: ${value};`);
  }
  // Borders — style + per-component
  if (tokens.borders.style) lightVars.push(`${cssVar(prefix, "border-style")}: ${tokens.borders.style};`);
  if (tokens.borders["card-border"]) lightVars.push(`${cssVar(prefix, "card-border")}: ${tokens.borders["card-border"]};`);
  if (tokens.borders["card-border-hover"]) lightVars.push(`${cssVar(prefix, "card-border-hover")}: ${tokens.borders["card-border-hover"]};`);
  if (tokens.borders["button-border"]) lightVars.push(`${cssVar(prefix, "button-border")}: ${tokens.borders["button-border"]};`);
  if (tokens.borders["input-border"]) lightVars.push(`${cssVar(prefix, "input-border")}: ${tokens.borders["input-border"]};`);
  if (tokens.borders["divider-style"]) lightVars.push(`${cssVar(prefix, "divider-style")}: ${tokens.borders["divider-style"]};`);
  if (tokens.borders["divider-width"]) lightVars.push(`${cssVar(prefix, "divider-width")}: ${tokens.borders["divider-width"]};`);

  // Buttons
  if (tokens.buttons) {
    for (const [key, value] of Object.entries(tokens.buttons)) {
      lightVars.push(`${cssVar(prefix, "button", key)}: ${value};`);
    }
  }

  // Cards
  if (tokens.cards) {
    for (const [key, value] of Object.entries(tokens.cards)) {
      if (typeof value === "boolean") {
        lightVars.push(`${cssVar(prefix, "card", key)}: ${value ? "1" : "0"};`);
      } else {
        lightVars.push(`${cssVar(prefix, "card", key)}: ${value};`);
      }
    }
  }

  // Headings
  if (tokens.headings) {
    for (const [key, value] of Object.entries(tokens.headings)) {
      lightVars.push(`${cssVar(prefix, key)}: ${value};`);
    }
  }

  // Navigation
  if (tokens.navigation) {
    for (const [key, value] of Object.entries(tokens.navigation)) {
      lightVars.push(`${cssVar(prefix, key)}: ${value};`);
    }
  }

  // Inputs
  if (tokens.inputs) {
    for (const [key, value] of Object.entries(tokens.inputs)) {
      lightVars.push(`${cssVar(prefix, "input", key)}: ${value};`);
    }
  }

  // Code
  if (tokens.code) {
    for (const [key, value] of Object.entries(tokens.code)) {
      lightVars.push(`${cssVar(prefix, "code", key)}: ${value};`);
    }
  }

  // Backgrounds
  if (tokens.backgrounds) {
    for (const [key, value] of Object.entries(tokens.backgrounds)) {
      if (typeof value === "boolean") {
        lightVars.push(`${cssVar(prefix, "bg", key)}: ${value ? "1" : "0"};`);
      } else {
        lightVars.push(`${cssVar(prefix, "bg", key)}: ${value};`);
      }
    }
  }

  // Spacing — non-scale fields
  for (const [key, value] of Object.entries(tokens.spacing)) {
    if (key === "scale" || key === "unit") continue;
    lightVars.push(`${cssVar(prefix, key)}: ${value};`);
  }

  // Motion — non-duration/easing fields
  for (const [key, value] of Object.entries(tokens.motion)) {
    if (key === "duration" || key === "easing") continue;
    if (value !== undefined) lightVars.push(`${cssVar(prefix, key)}: ${value};`);
  }

  // Layout
  if (tokens.layout) {
    for (const [key, value] of Object.entries(tokens.layout)) {
      lightVars.push(`${cssVar(prefix, key)}: ${value};`);
    }
  }

  // Alignment
  if (tokens.alignment) {
    for (const [key, value] of Object.entries(tokens.alignment)) {
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
  if (tokens.sections) {
    for (const [key, value] of Object.entries(tokens.sections)) {
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
  if (tokens.dividers) {
    for (const [key, value] of Object.entries(tokens.dividers)) {
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
  if (tokens.gridVisuals) {
    for (const [key, value] of Object.entries(tokens.gridVisuals)) {
      if (value !== undefined) {
        if (typeof value === "boolean") {
          lightVars.push(`${cssVar(prefix, "grid", key)}: ${value ? "1" : "0"};`);
        } else {
          lightVars.push(`${cssVar(prefix, "grid", key)}: ${value};`);
        }
      }
    }
  }

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
