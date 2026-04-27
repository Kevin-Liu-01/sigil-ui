import { defaultTokens, type SigilTokens } from "@sigil-ui/tokens";

type Themed = { light: string; dark: string };

export type TokenRecipe = {
  id: string;
  label: string;
  mood: string;
  description: string;
  primary: Themed;
  secondary: Themed;
  background: Themed;
  surface: Themed;
  text: Themed;
  muted: Themed;
  border: Themed;
  radius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  fontDisplay: string;
  fontBody: string;
  fontMono: string;
  spacingScale: readonly number[];
  shadow: string;
  pattern: NonNullable<SigilTokens["backgrounds"]>["pattern"];
};

export const TOKEN_RECIPES: readonly TokenRecipe[] = [
  {
    id: "instrument-dark",
    label: "Instrument Dark",
    mood: "dense, precise, operational",
    description: "A near-black control surface with blue-violet command states and crisp measurement lines.",
    primary: { light: "oklch(0.58 0.18 260)", dark: "oklch(0.72 0.16 260)" },
    secondary: { light: "oklch(0.62 0.12 45)", dark: "oklch(0.76 0.10 45)" },
    background: { light: "oklch(0.98 0.004 260)", dark: "oklch(0.08 0.014 260)" },
    surface: { light: "oklch(0.95 0.006 260)", dark: "oklch(0.13 0.018 260)" },
    text: { light: "oklch(0.14 0.01 260)", dark: "oklch(0.94 0.006 260)" },
    muted: { light: "oklch(0.48 0.02 260)", dark: "oklch(0.68 0.02 260)" },
    border: { light: "oklch(0.82 0.012 260)", dark: "oklch(0.28 0.026 260)" },
    radius: { sm: "2px", md: "4px", lg: "6px", xl: "10px" },
    fontDisplay: '"PP Mori", system-ui, sans-serif',
    fontBody: '"PP Telegraf", system-ui, sans-serif',
    fontMono: '"PP Fraktion Mono", ui-monospace, monospace',
    spacingScale: [4, 8, 12, 16, 24, 32, 48, 64, 80, 96],
    shadow: "0 0 0 1px oklch(1 0 0 / 0.06), 0 20px 80px oklch(0 0 0 / 0.34)",
    pattern: "grid",
  },
  {
    id: "paper-editorial",
    label: "Paper Editorial",
    mood: "serif, spacious, archival",
    description: "Warm paper surfaces, confident black typography, and a restrained oxblood action color.",
    primary: { light: "oklch(0.46 0.14 22)", dark: "oklch(0.72 0.12 22)" },
    secondary: { light: "oklch(0.58 0.10 80)", dark: "oklch(0.76 0.08 80)" },
    background: { light: "oklch(0.96 0.018 80)", dark: "oklch(0.12 0.018 65)" },
    surface: { light: "oklch(0.93 0.022 80)", dark: "oklch(0.17 0.02 65)" },
    text: { light: "oklch(0.16 0.014 60)", dark: "oklch(0.93 0.018 80)" },
    muted: { light: "oklch(0.45 0.025 65)", dark: "oklch(0.70 0.024 80)" },
    border: { light: "oklch(0.78 0.030 80)", dark: "oklch(0.32 0.026 65)" },
    radius: { sm: "6px", md: "10px", lg: "14px", xl: "22px" },
    fontDisplay: '"PP Editorial New", Georgia, serif',
    fontBody: '"PP Neue Montreal", system-ui, sans-serif',
    fontMono: '"PP Fraktion Mono", ui-monospace, monospace',
    spacingScale: [4, 8, 12, 16, 24, 36, 56, 72, 96, 128],
    shadow: "0 1px 0 oklch(0 0 0 / 0.08), 0 24px 70px oklch(0.35 0.04 80 / 0.16)",
    pattern: "dots",
  },
  {
    id: "acid-terminal",
    label: "Acid Terminal",
    mood: "monospace, hard, high-signal",
    description: "A sharp terminal sheet with acidic green actions, zero-radius panels, and compressed spacing.",
    primary: { light: "oklch(0.54 0.20 145)", dark: "oklch(0.78 0.18 145)" },
    secondary: { light: "oklch(0.60 0.14 95)", dark: "oklch(0.78 0.12 95)" },
    background: { light: "oklch(0.985 0 0)", dark: "oklch(0.055 0.012 145)" },
    surface: { light: "oklch(0.95 0.006 145)", dark: "oklch(0.10 0.018 145)" },
    text: { light: "oklch(0.10 0.008 145)", dark: "oklch(0.92 0.020 145)" },
    muted: { light: "oklch(0.40 0.016 145)", dark: "oklch(0.64 0.025 145)" },
    border: { light: "oklch(0.68 0.020 145)", dark: "oklch(0.35 0.040 145)" },
    radius: { sm: "0px", md: "0px", lg: "0px", xl: "0px" },
    fontDisplay: '"PP Neue Machina", system-ui, sans-serif',
    fontBody: '"PP Supply Mono", ui-monospace, monospace',
    fontMono: '"PP Supply Mono", ui-monospace, monospace',
    spacingScale: [4, 6, 8, 12, 16, 24, 32, 48, 64, 80],
    shadow: "4px 4px 0 oklch(0 0 0 / 0.85)",
    pattern: "plus",
  },
  {
    id: "studio-glow",
    label: "Studio Glow",
    mood: "soft, luminous, product-led",
    description: "A rounded studio palette with coral actions, lavender shadows, and softer interface density.",
    primary: { light: "oklch(0.62 0.16 18)", dark: "oklch(0.74 0.14 18)" },
    secondary: { light: "oklch(0.60 0.12 300)", dark: "oklch(0.76 0.10 300)" },
    background: { light: "oklch(0.97 0.016 25)", dark: "oklch(0.12 0.028 300)" },
    surface: { light: "oklch(0.94 0.020 25)", dark: "oklch(0.18 0.035 300)" },
    text: { light: "oklch(0.17 0.016 25)", dark: "oklch(0.94 0.012 300)" },
    muted: { light: "oklch(0.48 0.018 25)", dark: "oklch(0.70 0.020 300)" },
    border: { light: "oklch(0.82 0.026 25)", dark: "oklch(0.34 0.038 300)" },
    radius: { sm: "12px", md: "18px", lg: "24px", xl: "32px" },
    fontDisplay: '"PP Gosha Sans", system-ui, sans-serif',
    fontBody: '"PP Neue Montreal", system-ui, sans-serif',
    fontMono: '"PP Fraktion Mono", ui-monospace, monospace',
    spacingScale: [4, 8, 12, 18, 28, 40, 56, 72, 96, 120],
    shadow: "0 0 0 1px oklch(1 0 0 / 0.08), 0 30px 90px oklch(0.60 0.12 300 / 0.24)",
    pattern: "dots",
  },
];

export function createTokensFromRecipe(recipe: TokenRecipe): SigilTokens {
  return {
    ...defaultTokens,
    colors: {
      ...defaultTokens.colors,
      background: recipe.background,
      surface: recipe.surface,
      "surface-elevated": {
        light: mixLightness(recipe.surface.light, 0.03),
        dark: mixLightness(recipe.surface.dark, 0.05),
      },
      "surface-sunken": {
        light: mixLightness(recipe.surface.light, -0.03),
        dark: mixLightness(recipe.surface.dark, -0.04),
      },
      primary: recipe.primary,
      "primary-hover": {
        light: mixLightness(recipe.primary.light, -0.06),
        dark: mixLightness(recipe.primary.dark, 0.05),
      },
      "primary-muted": {
        light: withAlpha(recipe.primary.light, 0.18),
        dark: withAlpha(recipe.primary.dark, 0.18),
      },
      "primary-contrast": {
        light: recipe.label === "Acid Terminal" ? "oklch(0.04 0.01 145)" : "oklch(0.99 0 0)",
        dark: "oklch(0.08 0.01 260)",
      },
      secondary: recipe.secondary,
      "secondary-hover": {
        light: mixLightness(recipe.secondary.light, -0.05),
        dark: mixLightness(recipe.secondary.dark, 0.04),
      },
      "secondary-muted": {
        light: withAlpha(recipe.secondary.light, 0.16),
        dark: withAlpha(recipe.secondary.dark, 0.16),
      },
      text: recipe.text,
      "text-secondary": {
        light: mixLightness(recipe.text.light, 0.22),
        dark: mixLightness(recipe.text.dark, -0.22),
      },
      "text-muted": recipe.muted,
      "text-subtle": {
        light: mixLightness(recipe.muted.light, 0.16),
        dark: mixLightness(recipe.muted.dark, -0.18),
      },
      "text-disabled": {
        light: mixLightness(recipe.muted.light, 0.30),
        dark: mixLightness(recipe.muted.dark, -0.32),
      },
      border: recipe.border,
      "border-muted": {
        light: mixLightness(recipe.border.light, 0.10),
        dark: mixLightness(recipe.border.dark, -0.08),
      },
      "border-strong": {
        light: mixLightness(recipe.border.light, -0.12),
        dark: mixLightness(recipe.border.dark, 0.12),
      },
      "border-interactive": recipe.primary,
      glow: {
        light: withAlpha(recipe.primary.light, 0.18),
        dark: withAlpha(recipe.primary.dark, 0.22),
      },
      "gradient-start": recipe.primary,
      "gradient-end": recipe.secondary,
    },
    typography: {
      ...defaultTokens.typography,
      "font-display": recipe.fontDisplay,
      "font-body": recipe.fontBody,
      "font-mono": recipe.fontMono,
      "heading-family": recipe.fontDisplay,
    },
    spacing: {
      ...defaultTokens.spacing,
      scale: recipe.spacingScale,
      "button-px": recipe.id === "acid-terminal" ? "14px" : "20px",
      "button-py": recipe.id === "acid-terminal" ? "7px" : "10px",
      "card-padding": recipe.id === "studio-glow" ? "28px" : "22px",
    },
    radius: {
      ...defaultTokens.radius,
      sm: recipe.radius.sm,
      md: recipe.radius.md,
      lg: recipe.radius.lg,
      xl: recipe.radius.xl,
      "2xl": recipe.id === "studio-glow" ? "40px" : recipe.radius.xl,
      button: recipe.radius.md,
      card: recipe.radius.lg,
      input: recipe.radius.md,
      popover: recipe.radius.lg,
    },
    sigil: {
      ...defaultTokens.sigil,
      "card-radius": recipe.radius.lg,
      "grid-cell": recipe.id === "acid-terminal" ? "40px" : "48px",
      "rail-gap": recipe.id === "paper-editorial" ? "32px" : "24px",
      "gutter-pattern": recipe.pattern,
      "margin-pattern": recipe.pattern,
    },
    shadows: {
      ...defaultTokens.shadows,
      md: recipe.shadow,
      lg: recipe.shadow,
      xl: recipe.shadow,
      glow: withAlpha(recipe.primary.dark, 0.28),
    },
    motion: {
      ...defaultTokens.motion,
      duration: {
        instant: "0ms",
        fast: recipe.id === "acid-terminal" ? "90ms" : "150ms",
        normal: recipe.id === "studio-glow" ? "300ms" : "220ms",
        slow: recipe.id === "studio-glow" ? "500ms" : "340ms",
        slower: recipe.id === "studio-glow" ? "720ms" : "560ms",
      },
    },
    borders: {
      ...defaultTokens.borders,
      style: "solid",
      "card-border": "1px solid var(--s-border)",
      "button-border": "1px solid var(--s-border-interactive)",
      "input-border": "1px solid var(--s-border)",
    },
    // @ts-ignore -- partial spread
    cards: {
      ...defaultTokens.cards,
      "hover-effect": recipe.id === "studio-glow" ? "glow" : "border",
      padding: recipe.id === "paper-editorial" ? "30px" : "24px",
    },
    // @ts-ignore -- partial spread
    buttons: {
      ...defaultTokens.buttons,
      "active-scale": recipe.id === "acid-terminal" ? "0.99" : "0.97",
      "text-transform": recipe.id === "acid-terminal" ? "uppercase" : "none",
      "letter-spacing": recipe.id === "acid-terminal" ? "0.08em" : "0em",
    },
    // @ts-ignore -- partial spread
    backgrounds: {
      ...defaultTokens.backgrounds,
      pattern: recipe.pattern,
      "pattern-opacity": recipe.id === "acid-terminal" ? "0.08" : "0.045",
      "hero-pattern": heroPatternFor(recipe.pattern),
      "gradient-type": "linear",
    },
    // @ts-ignore -- partial spread
    inputs: {
      ...defaultTokens.inputs,
      height: recipe.id === "acid-terminal" ? "34px" : "40px",
      "focus-ring-color": "var(--s-primary)",
    },
  };
}

export function tokensToMarkdown(tokens: SigilTokens, title = "custom-sigil"): string {
  const lines: string[] = [
    `# ${title}.tokens.md`,
    "",
    "> Generated from scratch in the Sigil sandbox. Presets are references; this file is the source.",
    "",
    "## Colors",
    "",
    "| Token | Light Value | Dark Value | Description |",
    "|---|---|---|---|",
  ];

  for (const [key, value] of Object.entries(tokens.colors)) {
    if (isThemed(value)) {
      lines.push(`| \`${key}\` | \`${value.light}\` | \`${value.dark}\` | ${colorDescription(key)} |`);
    } else if (typeof value === "string") {
      lines.push(`| \`${key}\` | \`${value}\` | \`${value}\` | ${colorDescription(key)} |`);
    }
  }

  lines.push("", "## Typography", "", "| Token | Value | Description |", "|---|---|---|");
  for (const [key, value] of Object.entries(tokens.typography)) {
    if (typeof value === "string") {
      lines.push(`| \`${key}\` | \`${value}\` | ${typographyDescription(key)} |`);
    }
  }

  lines.push("", "## Spacing", "", "| Token | Value | Description |", "|---|---|---|");
  for (const step of tokens.spacing.scale) {
    lines.push(`| \`space-${step}\` | \`${step}${tokens.spacing.unit}\` | Spacing scale step |`);
  }

  lines.push("", "## Sigil Grid", "", "| Token | Value | Description |", "|---|---|---|");
  for (const [key, value] of Object.entries(tokens.sigil)) {
    lines.push(`| \`${key}\` | \`${String(value)}\` | Structural visibility setting |`);
  }

  lines.push("", "## Radius", "", "| Token | Value | Description |", "|---|---|---|");
  for (const [key, value] of Object.entries(tokens.radius)) {
    lines.push(`| \`${key}\` | \`${value}\` | Radius scale value |`);
  }

  lines.push("", "## Shadows", "", "| Token | Value | Description |", "|---|---|---|");
  for (const [key, value] of Object.entries(tokens.shadows)) {
    if (typeof value === "string") {
      lines.push(`| \`${key}\` | \`${value}\` | Elevation token |`);
    }
  }

  lines.push("", "## Motion Durations", "", "| Token | Value | Description |", "|---|---|---|");
  for (const [key, value] of Object.entries(tokens.motion.duration)) {
    lines.push(`| \`${key}\` | \`${value}\` | Motion duration |`);
  }

  lines.push("", "## Motion Easings", "", "| Token | Value | Description |", "|---|---|---|");
  for (const [key, value] of Object.entries(tokens.motion.easing)) {
    lines.push(`| \`${key}\` | \`${value}\` | Easing curve |`);
  }

  lines.push("", "## Borders", "", "| Token | Value | Description |", "|---|---|---|");
  for (const [key, value] of Object.entries(tokens.borders.width)) {
    lines.push(`| \`${key}\` | \`${value}\` | Border width |`);
  }

  return `${lines.join("\n")}\n`;
}

function isThemed(value: unknown): value is Themed {
  return typeof value === "object" && value !== null && "light" in value && "dark" in value;
}

function heroPatternFor(pattern: NonNullable<SigilTokens["backgrounds"]>["pattern"]): NonNullable<SigilTokens["backgrounds"]>["hero-pattern"] {
  if (pattern === "grid" || pattern === "crosshatch" || pattern === "none") return pattern;
  if (pattern === "dots") return "radial-glow";
  return "gradient";
}

function withAlpha(oklch: string, alpha: number): string {
  return oklch.replace(/\)$/, ` / ${alpha})`);
}

function mixLightness(oklch: string, delta: number): string {
  const match = /oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)/.exec(oklch);
  if (!match) return oklch;
  const next = Math.max(0.02, Math.min(0.99, Number(match[1]) + delta)).toFixed(3).replace(/0+$/, "").replace(/\.$/, "");
  return oklch.replace(match[1], next);
}

function colorDescription(key: string): string {
  if (key.includes("background")) return "Page canvas and global backdrop";
  if (key.includes("surface")) return "Cards, panels, and raised surfaces";
  if (key.includes("text")) return "Text hierarchy";
  if (key.includes("border")) return "Separators, outlines, and measurement lines";
  if (key.includes("primary")) return "Primary actions and focus states";
  return "Semantic color";
}

function typographyDescription(key: string): string {
  if (key.includes("display")) return "Headlines and hero type";
  if (key.includes("body")) return "Interface and body copy";
  if (key.includes("mono")) return "Code, labels, and token metadata";
  return "Typography token";
}
