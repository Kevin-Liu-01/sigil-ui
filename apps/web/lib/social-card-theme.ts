import { sigilPreset } from "@sigil-ui/presets";
import { isThemedColor, type ColorValue, type ThemedColor } from "@sigil-ui/tokens";
import { formatHex } from "culori";

type ColorMode = "dark" | "light";

function renderColor(value: ColorValue | ThemedColor, mode: ColorMode): string {
  const source = isThemedColor(value) ? value[mode] : value;
  const rendered = formatHex(source);

  if (!rendered) {
    throw new Error(`Unable to render social-card color: ${source}`);
  }

  return rendered;
}

function renderAlpha(color: string, opacity: number): string {
  const alpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0");
  return `${color}${alpha}`;
}

function primaryFontName(fontStack: string): string {
  return fontStack.split(",")[0]?.trim().replace(/^['"]|['"]$/g, "") || fontStack;
}

const { colors, sigil, typography } = sigilPreset.tokens;

export const SOCIAL_CARD_THEME = {
  colors: {
    accent: renderColor(colors.primary, "light"),
    background: renderColor(colors.background, "light"),
    border: renderColor(colors["border-muted"], "light"),
    borderStrong: renderColor(colors["border-strong"], "light"),
    ink: renderColor(colors.text, "light"),
    inkMuted: renderColor(colors["text-muted"], "light"),
    reverse: renderColor(colors.background, "dark"),
    reverseMuted: renderColor(colors["text-muted"], "dark"),
    reverseText: renderColor(colors.text, "dark"),
    surface: renderColor(colors.surface, "light"),
  },
  font: {
    display: primaryFontName(typography["font-display"]),
    mono: primaryFontName(typography["font-mono"]),
  },
  gridCell: Number.parseFloat(sigil["grid-cell"]),
} as const;

export function socialCardAlpha(color: string, opacity: number): string {
  return renderAlpha(color, opacity);
}
