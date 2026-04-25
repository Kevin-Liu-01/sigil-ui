import type { SigilTokens } from "./types";

/**
 * Default Sigil token values.
 * All colors are in OKLCH for perceptual uniformity and wide-gamut support.
 * Includes all optional token categories so components work without a preset.
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
      dark: "oklch(0.45 0 0)",
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
      dark: "oklch(0.25 0.01 280)",
    },
    "border-muted": {
      light: "oklch(0.94 0 0)",
      dark: "oklch(0.20 0.01 280)",
    },
    "border-strong": {
      light: "oklch(0.80 0 0)",
      dark: "oklch(0.35 0.01 280)",
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
    "font-display": '"PP Mori", system-ui, sans-serif',
    "font-body": '"PP Mori", system-ui, sans-serif',
    "font-mono": '"PP Fraktion Mono", ui-monospace, monospace',
  },

  spacing: {
    scale: [4, 8, 12, 16, 24, 32, 48, 64, 80, 96],
    unit: "px",
  },

  layout: {
    "content-max": "1200px",
    "content-max-narrow": "768px",
    "content-max-wide": "1440px",
    "page-margin": "24px",
    "page-margin-sm": "16px",
    "page-margin-lg": "48px",
    gutter: "24px",
    "gutter-sm": "16px",
    "gutter-lg": "32px",
    "grid-columns": "12",
    "grid-gap": "24px",
    "bento-gap": "16px",
    "bento-radius": "0px",
    "bento-min-height": "200px",
    "section-gap": "32px",
    "sidebar-width": "280px",
    "sidebar-collapsed": "64px",
    "footer-columns": "4",
    "stack-gap": "16px",
    "stack-gap-sm": "8px",
    "stack-gap-lg": "24px",
    "prose-max": "65ch",
  },

  sigil: {
    "grid-cell": "48px",
    "cross-arm": "10px",
    "cross-stroke": "1.5px",
    "rail-gap": "24px",
    "card-radius": "10px",
    "gutter-border": "1px solid",
    "gutter-visible": true,
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
    sm: "0 1px 2px 0 oklch(0 0 0 / 0.05)",
    md: "0 0 0 1px oklch(0 0 0 / 0.06), 0 1px 2px -1px oklch(0 0 0 / 0.06), 0 2px 4px 0 oklch(0 0 0 / 0.04)",
    lg: "0 0 0 1px oklch(0 0 0 / 0.04), 0 2px 4px -2px oklch(0 0 0 / 0.06), 0 4px 8px -2px oklch(0 0 0 / 0.08)",
    xl: "0 0 0 1px oklch(0 0 0 / 0.03), 0 4px 6px -4px oklch(0 0 0 / 0.06), 0 10px 15px -3px oklch(0 0 0 / 0.1), 0 20px 25px -5px oklch(0 0 0 / 0.06)",
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

  buttons: {
    "font-weight": "500",
    "text-transform": "none" as const,
    "letter-spacing": "0em",
    "font-family": "inherit",
    "border-width": "1px",
    "hover-effect": "darken" as const,
    "active-scale": "0.97",
    "icon-gap": "8px",
    "min-width": "0px",
  },

  cards: {
    "border-style": "solid" as const,
    "border-width": "1px",
    "hover-effect": "border" as const,
    "hover-border-color": "var(--s-border-strong)",
    padding: "24px",
    "header-padding": "24px 24px 0",
    "footer-padding": "0 24px 24px",
    "title-size": "1.125rem",
    "title-weight": "600",
    "description-size": "0.875rem",
  },

  headings: {
    "h1-size": "2.25rem",
    "h1-weight": "700",
    "h1-tracking": "-0.025em",
    "h1-leading": "1.2",
    "h2-size": "1.875rem",
    "h2-weight": "600",
    "h2-tracking": "-0.02em",
    "h3-size": "1.5rem",
    "h3-weight": "600",
    "h4-size": "1.25rem",
    "h4-weight": "600",
    "display-size": "3.75rem",
    "display-weight": "700",
    "display-tracking": "-0.03em",
    "display-leading": "1.08",
  },

  navigation: {
    "navbar-height": "56px",
    "navbar-backdrop-blur": "12px",
    "navbar-border": "1px solid",
    "navbar-bg-opacity": "0.8",
    "nav-link-weight": "500",
    "nav-link-size": "0.875rem",
    "nav-link-hover": "color" as const,
    "breadcrumb-separator": "/",
    "pagination-radius": "0px",
    "sidebar-width": "280px",
    "sidebar-item-radius": "0px",
    "sidebar-item-padding": "8px 12px",
  },

  backgrounds: {
    pattern: "none" as const,
    "pattern-opacity": "0.05",
    "pattern-scale": "1",
    noise: false,
    "noise-opacity": "0.03",
    "gradient-angle": "135deg",
    "gradient-type": "none" as const,
    "hero-pattern": "none" as const,
    "section-divider": "none" as const,
  },

  code: {
    "font-family": "var(--s-font-mono)",
    "font-size": "0.875rem",
    "line-height": "1.7",
    bg: "var(--s-surface-sunken, var(--s-surface))",
    border: "1px solid var(--s-border)",
    "border-radius": "0px",
    padding: "16px",
    "tab-size": "2",
    "selection-bg": "var(--s-primary-muted)",
    "comment-color": "var(--s-text-muted)",
    "keyword-color": "var(--s-primary)",
    "string-color": "var(--s-success)",
    "number-color": "var(--s-warning)",
    "function-color": "var(--s-info)",
  },

  inputs: {
    height: "36px",
    "height-sm": "32px",
    "height-lg": "44px",
    "border-width": "1px",
    "focus-ring-width": "2px",
    "focus-ring-color": "var(--s-primary)",
    "focus-ring-offset": "2px",
    "placeholder-color": "var(--s-text-muted)",
    "error-border-color": "var(--s-error)",
    "label-size": "0.875rem",
    "label-weight": "500",
    "label-spacing": "8px",
    "helper-size": "0.8125rem",
  },

  cursor: {
    variant: "sigil",
    size: "28px",
    "dot-size": "4px",
    "stroke-width": "1.5px",
    "tick-size": "7px",
    gap: "3px",
    radius: "var(--s-radius-full)",
    color: "var(--s-primary)",
    "ring-color": "var(--s-primary)",
    "dot-color": "var(--s-primary)",
    glow: "0 0 18px color-mix(in oklch, var(--s-primary) 35%, transparent)",
    opacity: "0.95",
    "blend-mode": "normal",
    "z-index": "2147483647",
    "hide-native": true,
  },

  scrollbar: {
    width: "10px",
    height: "10px",
    padding: "2px",
    radius: "var(--s-radius-full)",
    track: "transparent",
    thumb: "var(--s-border)",
    "thumb-hover": "var(--s-border-strong)",
    "thumb-active": "var(--s-primary)",
    corner: "transparent",
    border: "transparent",
    "firefox-width": "thin",
    gutter: "auto",
    visibility: "auto",
  },

  focus: {
    "ring-width": "2px",
    "ring-color": "var(--s-primary)",
    "ring-offset": "2px",
    "ring-shadow": "0 0 0 var(--s-focus-ring-width) color-mix(in oklch, var(--s-focus-ring-color) 35%, transparent)",
    "outline-color": "var(--s-border-interactive)",
  },

  overlays: {
    bg: "oklch(0 0 0 / 0.55)",
    blur: "2px",
    surface: "var(--s-surface)",
    border: "var(--s-border)",
    shadow: "var(--s-shadow-xl)",
    radius: "var(--s-card-radius, var(--s-radius-lg))",
    padding: "24px",
    "z-index": "50",
  },

  dataViz: {
    "series-1": "var(--s-primary)",
    "series-2": "var(--s-secondary)",
    "series-3": "var(--s-accent, var(--s-info))",
    "series-4": "var(--s-success)",
    "series-5": "var(--s-warning)",
    positive: "var(--s-success)",
    negative: "var(--s-error)",
    neutral: "var(--s-text-muted)",
    grid: "var(--s-border-muted)",
    axis: "var(--s-border-strong)",
    label: "var(--s-text-secondary)",
    "tooltip-bg": "var(--s-surface-elevated)",
    "tooltip-border": "var(--s-border)",
  },

  media: {
    radius: "var(--s-radius-md)",
    border: "1px solid var(--s-border-muted)",
    outline: "1px solid color-mix(in oklch, var(--s-text) 8%, transparent)",
    shadow: "var(--s-shadow-sm)",
    bg: "var(--s-surface-sunken, var(--s-surface))",
    "object-fit": "cover",
  },

  controls: {
    height: "36px",
    "height-sm": "32px",
    "height-lg": "44px",
    "hit-area": "40px",
    "icon-size": "16px",
    "handle-size": "20px",
    "track-height": "8px",
    "track-bg": "var(--s-surface-sunken, var(--s-surface))",
    "track-fill": "var(--s-primary)",
    "thumb-bg": "var(--s-surface-elevated)",
    "thumb-border": "var(--s-border)",
  },

  componentSurfaces: {
    bg: "var(--s-surface)",
    "bg-elevated": "var(--s-surface-elevated)",
    "bg-muted": "var(--s-surface-sunken, var(--s-surface))",
    border: "var(--s-border)",
    "border-muted": "var(--s-border-muted)",
    "border-strong": "var(--s-border-strong)",
    text: "var(--s-text)",
    "text-muted": "var(--s-text-muted)",
    contrast: "var(--s-primary-contrast, var(--s-text-inverse))",
    "hover-bg": "var(--s-surface-elevated)",
    "active-bg": "var(--s-surface-sunken, var(--s-surface))",
    "selected-bg": "color-mix(in oklch, var(--s-primary) 12%, transparent)",
  },
} as const;
