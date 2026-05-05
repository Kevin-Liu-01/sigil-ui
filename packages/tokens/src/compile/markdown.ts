import type {
  DesignComponent,
  DesignDocument,
  DesignMetadata,
  DesignSurface,
  MarkdownTokenOverrides,
  SigilTokens,
} from "../types";

/* ------------------------------------------------------------------ */
/* Markdown table primitives                                          */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/* parseMarkdownTokens — legacy `sigil.tokens.md` 8-group format      */
/* ------------------------------------------------------------------ */

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

function parseTypographySection(markdown: string): SigilTokens["typography"] {
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

function parseSigilGridSection(markdown: string): SigilTokens["sigil"] {
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

/* ------------------------------------------------------------------ */
/* parseDesignMarkdown — full DESIGN.md parser                        */
/* (superset of parseMarkdownTokens — handles all 33 categories)      */
/* ------------------------------------------------------------------ */

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

/* DESIGN.md token-table parsers (heading: "Tokens — X") with legacy fallback */

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
