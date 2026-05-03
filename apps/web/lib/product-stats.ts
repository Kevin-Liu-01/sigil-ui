export const SIGIL_PRODUCT_STATS = {
  componentCountLabel: "350+",
  presetCount: 46,
  tokenCount: 519,
  categoryCount: 33,
  primitiveCount: 40,
  cliCommandCount: 11,
} as const;

export const SIGIL_PRODUCT_SUMMARY = `${SIGIL_PRODUCT_STATS.componentCountLabel} components, ${SIGIL_PRODUCT_STATS.presetCount} presets, ${SIGIL_PRODUCT_STATS.tokenCount} design tokens`;

export const SIGIL_ONE_LINER =
  "One markdown file controls your entire design system.";

export const SIGIL_ELEVATOR_PITCH =
  "Sigil is a token-driven React design system where one DESIGN.md file defines every color, font, radius, shadow, and animation across 350+ components. Edit the markdown — CSS, Tailwind v4, and W3C JSON recompile automatically.";

export const SIGIL_DESIGN_MD_PITCH =
  "Your entire design system in one markdown file. 519 tokens across 33 categories. Compiles to CSS custom properties and Tailwind v4. Readable by humans. Editable by agents.";

export const SIGIL_TOKEN_PITCH =
  "519 tokens across 33 categories — colors, typography, spacing, radius, shadows, motion, page composition, and more. All OKLCH. Light/dark themed.";

export const SIGIL_PRESET_PITCH =
  "46 curated visual identities. Each preset populates all 519 tokens across 33 categories. Swap preset, swap identity — zero component edits.";
