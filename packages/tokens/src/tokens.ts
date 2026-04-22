import type { SigilTokens } from "./types";

/**
 * Default Sigil token values.
 * All colors are in OKLCH for perceptual uniformity and wide-gamut support.
 */
export const defaultTokens: SigilTokens = {
  colors: {
    background: {
      light: "oklch(0.99 0 0)",
      dark: "oklch(0.07 0.01 280)",
    },
    surface: {
      light: "oklch(0.97 0 0)",
      dark: "oklch(0.12 0.01 280)",
    },
    "surface-elevated": {
      light: "oklch(0.98 0 0)",
      dark: "oklch(0.15 0.01 280)",
    },

    primary: "oklch(0.65 0.15 280)",
    "primary-hover": "oklch(0.60 0.18 280)",
    "primary-muted": "oklch(0.90 0.04 280)",
    secondary: "oklch(0.70 0.12 60)",

    text: {
      light: "oklch(0.15 0 0)",
      dark: "oklch(0.93 0 0)",
    },
    "text-secondary": {
      light: "oklch(0.40 0 0)",
      dark: "oklch(0.70 0 0)",
    },
    "text-muted": {
      light: "oklch(0.55 0 0)",
      dark: "oklch(0.55 0 0)",
    },
    "text-subtle": {
      light: "oklch(0.70 0 0)",
      dark: "oklch(0.40 0 0)",
    },
    "text-disabled": {
      light: "oklch(0.80 0 0)",
      dark: "oklch(0.30 0 0)",
    },

    border: {
      light: "oklch(0.90 0 0)",
      dark: "oklch(0.22 0 0)",
    },
    "border-muted": {
      light: "oklch(0.94 0 0)",
      dark: "oklch(0.18 0 0)",
    },
    "border-strong": {
      light: "oklch(0.80 0 0)",
      dark: "oklch(0.35 0 0)",
    },
    "border-interactive": {
      light: "oklch(0.65 0.15 280)",
      dark: "oklch(0.65 0.15 280)",
    },

    success: "oklch(0.65 0.17 160)",
    warning: "oklch(0.75 0.15 85)",
    error: "oklch(0.60 0.20 25)",
    info: "oklch(0.60 0.15 250)",
  },

  typography: {
    "font-display": '"Nacelle", system-ui, sans-serif',
    "font-body": "system-ui, -apple-system, sans-serif",
    "font-mono": '"Roboto Mono", ui-monospace, monospace',
  },

  spacing: {
    scale: [4, 8, 12, 16, 24, 32, 48, 64, 80, 96],
    unit: "px",
  },

  sigil: {
    "grid-cell": "48px",
    "cross-arm": "10px",
    "cross-stroke": "1.5px",
    "rail-gap": "24px",
    "card-radius": "10px",
  },

  radius: {
    none: "0px",
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    "2xl": "24px",
    full: "9999px",
  },

  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 0 0 1px rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06), 0 2px 4px 0 rgb(0 0 0 / 0.04)",
    lg: "0 0 0 1px rgb(0 0 0 / 0.04), 0 2px 4px -2px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08)",
    xl: "0 0 0 1px rgb(0 0 0 / 0.03), 0 4px 6px -4px rgb(0 0 0 / 0.06), 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 20px 25px -5px rgb(0 0 0 / 0.06)",
  },

  motion: {
    duration: {
      instant: "0ms",
      fast: "150ms",
      normal: "250ms",
      slow: "400ms",
      slower: "600ms",
    },
    easing: {
      default: "cubic-bezier(0.16, 1, 0.3, 1)",
      in: "cubic-bezier(0.55, 0, 1, 0.45)",
      out: "cubic-bezier(0, 0.55, 0.45, 1)",
      "in-out": "cubic-bezier(0.45, 0, 0.55, 1)",
      spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    },
  },

  borders: {
    width: {
      none: "0px",
      thin: "1px",
      medium: "1.5px",
      thick: "2px",
    },
  },
} as const;
