# Sigil — Style Reference
> Structural-visibility design system. 519 tokens. One file.

**Theme:** adaptive
**Preset:** sigil
**Density:** balanced

Sigil is a token-driven design system where every visual property flows from a central spec through CSS custom properties into components. The structural-visibility aesthetic combines engineering precision with editorial warmth — cross marks, alignment rails, and measurement grids reveal the underlying grid structure while maintaining a refined, approachable interface.

## Tokens — Colors

All color values use OKLCH for perceptual uniformity and wide-gamut display support.

| Token | Light | Dark | Role |
| --- | --- | --- | --- |
| `background` | `oklch(0.99 0 0)` | `oklch(0.07 0.01 280)` | background |
| `surface` | `oklch(0.97 0 0)` | `oklch(0.12 0.01 280)` | surface |
| `surface-elevated` | `oklch(0.98 0 0)` | `oklch(0.15 0.01 280)` | surface elevated |
| `primary` | `oklch(0.65 0.15 280)` | `oklch(0.65 0.15 280)` | primary |
| `primary-hover` | `oklch(0.60 0.18 280)` | `oklch(0.60 0.18 280)` | primary hover |
| `primary-muted` | `oklch(0.90 0.04 280)` | `oklch(0.90 0.04 280)` | primary muted |
| `secondary` | `oklch(0.70 0.12 60)` | `oklch(0.70 0.12 60)` | secondary |
| `text` | `oklch(0.15 0 0)` | `oklch(0.93 0 0)` | text |
| `text-secondary` | `oklch(0.40 0 0)` | `oklch(0.70 0 0)` | text secondary |
| `text-muted` | `oklch(0.55 0 0)` | `oklch(0.45 0 0)` | text muted |
| `text-subtle` | `oklch(0.70 0 0)` | `oklch(0.40 0 0)` | text subtle |
| `text-disabled` | `oklch(0.80 0 0)` | `oklch(0.30 0 0)` | text disabled |
| `border` | `oklch(0.90 0 0)` | `oklch(0.25 0.01 280)` | border |
| `border-muted` | `oklch(0.94 0 0)` | `oklch(0.20 0.01 280)` | border muted |
| `border-strong` | `oklch(0.80 0 0)` | `oklch(0.35 0.01 280)` | border strong |
| `border-interactive` | `oklch(0.65 0.15 280)` | `oklch(0.65 0.15 280)` | border interactive |
| `success` | `oklch(0.65 0.17 160)` | `oklch(0.65 0.17 160)` | success |
| `warning` | `oklch(0.75 0.15 85)` | `oklch(0.75 0.15 85)` | warning |
| `error` | `oklch(0.60 0.20 25)` | `oklch(0.60 0.20 25)` | error |
| `info` | `oklch(0.60 0.15 250)` | `oklch(0.60 0.15 250)` | info |
| `highlight` | `oklch(0.94 0.12 95)` | `oklch(0.30 0.08 95)` | highlight |

## Tokens — Typography

| Token | Value | Role |
| --- | --- | --- |
| `font-display` | `"PP Mori", system-ui, sans-serif` |  |
| `font-body` | `"PP Mori", system-ui, sans-serif` |  |
| `font-mono` | `"PP Fraktion Mono", ui-monospace, monospace` |  |

## Tokens — Spacing

| Token | Value | Role |
| --- | --- | --- |
| `space-4` | `4` | 4px step |
| `space-8` | `8` | 8px step |
| `space-12` | `12` | 12px step |
| `space-16` | `16` | 16px step |
| `space-24` | `24` | 24px step |
| `space-32` | `32` | 32px step |
| `space-48` | `48` | 48px step |
| `space-64` | `64` | 64px step |
| `space-80` | `80` | 80px step |
| `space-96` | `96` | 96px step |

## Tokens — Layout

| Token | Value | Role |
| --- | --- | --- |
| `content-max` | `1200px` |  |
| `content-max-narrow` | `768px` |  |
| `content-max-wide` | `1440px` |  |
| `page-margin` | `25px` |  |
| `page-margin-sm` | `16px` |  |
| `page-margin-lg` | `50px` |  |
| `gutter` | `24px` |  |
| `gutter-sm` | `16px` |  |
| `gutter-lg` | `32px` |  |
| `grid-columns` | `12` |  |
| `grid-gap` | `24px` |  |
| `bento-gap` | `16px` |  |
| `bento-radius` | `0px` |  |
| `bento-min-height` | `200px` |  |
| `section-gap` | `32px` |  |
| `sidebar-width` | `280px` |  |
| `sidebar-collapsed` | `64px` |  |
| `footer-columns` | `4` |  |
| `stack-gap` | `16px` |  |
| `stack-gap-sm` | `8px` |  |
| `stack-gap-lg` | `24px` |  |
| `prose-max` | `65ch` |  |

## Tokens — Sigil Grid

| Token | Value | Role |
| --- | --- | --- |
| `grid-cell` | `50px` |  |
| `cross-arm` | `10px` |  |
| `cross-stroke` | `1.5px` |  |
| `rail-gap` | `50px` |  |
| `card-radius` | `10px` |  |
| `gutter-border` | `1px solid` |  |
| `gutter-visible` | `true` |  |

## Tokens — Radius

| Token | Value | Role |
| --- | --- | --- |
| `none` | `0px` |  |
| `sm` | `4px` |  |
| `md` | `8px` |  |
| `lg` | `12px` |  |
| `xl` | `16px` |  |
| `2xl` | `24px` |  |
| `full` | `9999px` |  |

## Tokens — Shadows

| Token | Value | Role |
| --- | --- | --- |
| `sm` | `0 1px 2px 0 oklch(0 0 0 / 0.05)` |  |
| `md` | `0 0 0 1px oklch(0 0 0 / 0.06), 0 1px 2px -1px oklch(0 0 0 / 0.06), 0 2px 4px 0 oklch(0 0 0 / 0.04)` |  |
| `lg` | `0 0 0 1px oklch(0 0 0 / 0.04), 0 2px 4px -2px oklch(0 0 0 / 0.06), 0 4px 8px -2px oklch(0 0 0 / 0.08)` |  |
| `xl` | `0 0 0 1px oklch(0 0 0 / 0.03), 0 4px 6px -4px oklch(0 0 0 / 0.06), 0 10px 15px -3px oklch(0 0 0 / 0.1), 0 20px 25px -5px oklch(0 0 0 / 0.06)` |  |

## Tokens — Motion

### Durations

| Token | Value | Role |
| --- | --- | --- |
| `instant` | `0ms` |  |
| `fast` | `150ms` |  |
| `normal` | `250ms` |  |
| `slow` | `400ms` |  |
| `slower` | `600ms` |  |

### Easings

| Token | Value | Role |
| --- | --- | --- |
| `default` | `cubic-bezier(0.16, 1, 0.3, 1)` |  |
| `in` | `cubic-bezier(0.55, 0, 1, 0.45)` |  |
| `out` | `cubic-bezier(0, 0.55, 0.45, 1)` |  |
| `in-out` | `cubic-bezier(0.45, 0, 0.55, 1)` |  |
| `spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |  |

### Presets


## Tokens — Borders

| Token | Value | Role |
| --- | --- | --- |
| `none` | `0px` |  |
| `thin` | `1px` |  |
| `medium` | `1.5px` |  |
| `thick` | `2px` |  |

## Tokens — Backgrounds

| Token | Value | Role |
| --- | --- | --- |
| `pattern` | `none` |  |
| `pattern-opacity` | `0.05` |  |
| `pattern-scale` | `1` |  |
| `noise` | `false` |  |
| `noise-opacity` | `0.03` |  |
| `gradient-angle` | `135deg` |  |
| `gradient-type` | `none` |  |
| `hero-pattern` | `none` |  |
| `section-divider` | `none` |  |

## Block Tokens — Buttons

| Token | Value | Role |
| --- | --- | --- |
| `font-weight` | `500` |  |
| `text-transform` | `none` |  |
| `letter-spacing` | `0em` |  |
| `font-family` | `inherit` |  |
| `border-width` | `1px` |  |
| `hover-effect` | `darken` |  |
| `active-scale` | `0.97` |  |
| `icon-gap` | `8px` |  |
| `min-width` | `0px` |  |

## Block Tokens — Cards

| Token | Value | Role |
| --- | --- | --- |
| `border-style` | `solid` |  |
| `border-width` | `1px` |  |
| `hover-effect` | `border` |  |
| `hover-border-color` | `var(--s-border-strong)` |  |
| `padding` | `24px` |  |
| `header-padding` | `24px 24px 0` |  |
| `footer-padding` | `0 24px 24px` |  |
| `title-size` | `1.125rem` |  |
| `title-weight` | `600` |  |
| `description-size` | `0.875rem` |  |

## Block Tokens — Headings

| Token | Value | Role |
| --- | --- | --- |
| `h1-size` | `2.25rem` |  |
| `h1-weight` | `700` |  |
| `h1-tracking` | `-0.025em` |  |
| `h1-leading` | `1.2` |  |
| `h2-size` | `1.875rem` |  |
| `h2-weight` | `600` |  |
| `h2-tracking` | `-0.02em` |  |
| `h2-leading` | `1.15` |  |
| `h3-size` | `1.5rem` |  |
| `h3-weight` | `600` |  |
| `h3-tracking` | `0em` |  |
| `h3-leading` | `1.2` |  |
| `h4-size` | `1.25rem` |  |
| `h4-weight` | `600` |  |
| `h4-tracking` | `0em` |  |
| `h4-leading` | `1.3` |  |
| `display-size` | `3.75rem` |  |
| `display-weight` | `700` |  |
| `display-tracking` | `-0.03em` |  |
| `display-leading` | `1.08` |  |

## Block Tokens — Navigation

| Token | Value | Role |
| --- | --- | --- |
| `navbar-height` | `50px` |  |
| `navbar-backdrop-blur` | `12px` |  |
| `navbar-border` | `1px solid` |  |
| `navbar-bg-opacity` | `0.8` |  |
| `navbar-padding-x` | `24px` |  |
| `navbar-position` | `sticky` |  |
| `navbar-logo-height` | `24px` |  |
| `navbar-logo-gap` | `8px` |  |
| `navbar-item-gap` | `24px` |  |
| `navbar-item-padding-x` | `12px` |  |
| `navbar-item-padding-y` | `6px` |  |
| `navbar-item-size` | `0.875rem` |  |
| `navbar-shadow` | `none` |  |
| `navbar-height-scrolled` | `50px` |  |
| `navbar-mobile-breakpoint` | `768px` |  |
| `nav-link-weight` | `500` |  |
| `nav-link-size` | `0.875rem` |  |
| `nav-link-hover` | `color` |  |
| `breadcrumb-separator` | `/` |  |
| `pagination-radius` | `0px` |  |
| `sidebar-width` | `280px` |  |
| `sidebar-item-radius` | `0px` |  |
| `sidebar-item-padding` | `8px 12px` |  |

## Block Tokens — Inputs

| Token | Value | Role |
| --- | --- | --- |
| `height` | `36px` |  |
| `height-sm` | `32px` |  |
| `height-lg` | `44px` |  |
| `border-width` | `1px` |  |
| `focus-ring-width` | `2px` |  |
| `focus-ring-color` | `var(--s-primary)` |  |
| `focus-ring-offset` | `2px` |  |
| `placeholder-color` | `var(--s-text-muted)` |  |
| `error-border-color` | `var(--s-error)` |  |
| `label-size` | `0.875rem` |  |
| `label-weight` | `500` |  |
| `label-spacing` | `8px` |  |
| `helper-size` | `0.8125rem` |  |

## Block Tokens — Code

| Token | Value | Role |
| --- | --- | --- |
| `font-family` | `var(--s-font-mono)` |  |
| `font-size` | `0.875rem` |  |
| `line-height` | `1.7` |  |
| `bg` | `var(--s-surface-sunken, var(--s-surface))` |  |
| `border` | `1px solid var(--s-border)` |  |
| `border-radius` | `0px` |  |
| `padding` | `16px` |  |
| `tab-size` | `2` |  |
| `selection-bg` | `var(--s-primary-muted)` |  |
| `comment-color` | `var(--s-text-muted)` |  |
| `keyword-color` | `var(--s-primary)` |  |
| `string-color` | `var(--s-success)` |  |
| `number-color` | `var(--s-warning)` |  |
| `function-color` | `var(--s-info)` |  |

## Block Tokens — Hero

| Token | Value | Role |
| --- | --- | --- |
| `min-height` | `auto` |  |
| `padding-y` | `100px` |  |
| `padding-y-sm` | `100px` |  |
| `padding-x` | `var(--s-page-margin, 24px)` |  |
| `content-max` | `640px` |  |
| `content-align` | `center` |  |
| `layout` | `centered` |  |
| `media-position` | `below` |  |
| `media-width` | `50%` |  |
| `media-radius` | `var(--s-radius-lg, 12px)` |  |
| `title-size` | `clamp(2.25rem, 6vw, 4rem)` |  |
| `title-max-width` | `56rem` |  |
| `description-size` | `1.125rem` |  |
| `description-max-width` | `32rem` |  |
| `description-gap` | `24px` |  |
| `actions-gap` | `12px` |  |
| `actions-margin-top` | `32px` |  |
| `action-padding-x` | `24px` |  |
| `action-padding-y` | `12px` |  |
| `badge-gap` | `24px` |  |
| `overlay-opacity` | `0.5` |  |
| `scroll-indicator` | `false` |  |
| `gradient-overlay` | `none` |  |

## Block Tokens — CTA

| Token | Value | Role |
| --- | --- | --- |
| `padding-y` | `100px` |  |
| `padding-x` | `var(--s-page-margin, 24px)` |  |
| `max-width` | `var(--s-content-max, 1200px)` |  |
| `layout` | `centered` |  |
| `border` | `true` |  |
| `border-radius` | `var(--s-card-radius, var(--s-radius-md, 8px))` |  |
| `bg` | `var(--s-surface)` |  |
| `title-size` | `clamp(1.5rem, 4vw, 2.25rem)` |  |
| `description-max-width` | `32rem` |  |
| `description-gap` | `12px` |  |
| `actions-gap` | `12px` |  |
| `actions-margin-top` | `32px` |  |
| `action-padding-x` | `24px` |  |
| `action-padding-y` | `12px` |  |
| `split-gap` | `50px` |  |

## Block Tokens — Footer

| Token | Value | Role |
| --- | --- | --- |
| `padding-y` | `50px` |  |
| `border-top` | `1px solid var(--s-border)` |  |
| `columns` | `4` |  |
| `column-gap` | `32px` |  |
| `row-gap` | `32px` |  |
| `logo-height` | `24px` |  |
| `tagline-max-width` | `20rem` |  |
| `link-size` | `0.875rem` |  |
| `link-gap` | `8px` |  |
| `group-title-size` | `0.875rem` |  |
| `group-title-weight` | `600` |  |
| `social-icon-size` | `20px` |  |
| `social-gap` | `12px` |  |
| `bottom-bar-padding` | `24px 0` |  |
| `bottom-bar-border` | `1px solid var(--s-border-muted)` |  |

## Block Tokens — Banner

| Token | Value | Role |
| --- | --- | --- |
| `height` | `50px` |  |
| `padding-y` | `8px` |  |
| `padding-x` | `16px` |  |
| `font-size` | `0.875rem` |  |
| `font-weight` | `500` |  |
| `icon-size` | `16px` |  |
| `icon-gap` | `12px` |  |
| `border-width` | `1px` |  |
| `border-position` | `bottom` |  |
| `position` | `top` |  |
| `dismiss-size` | `16px` |  |
| `radius` | `0px` |  |

## Block Tokens — Sections


## Composition — Page Rhythm

| Token | Value | Role |
| --- | --- | --- |
| `density` | `normal` |  |
| `section-gap` | `0px` |  |
| `section-gap-sm` | `0px` |  |
| `section-gap-lg` | `0px` |  |
| `first-section-offset` | `0px` |  |
| `last-section-margin` | `0px` |  |
| `alternate-bg` | `false` |  |
| `alternate-bg-color` | `var(--s-surface)` |  |
| `divider-between` | `false` |  |
| `max-content-width` | `var(--s-content-max, 1200px)` |  |
| `vertical-rhythm-unit` | `8px` |  |
| `scroll-snap` | `false` |  |
| `responsive-scale` | `1` |  |
| `responsive-breakpoint` | `768px` |  |

## Composition — Grid & Alignment


## Composition — Dividers


## Composition — Grid Visuals


## Composition — Cursor & Scrollbar

| Token | Value | Role |
| --- | --- | --- |
| `variant` | `sigil` |  |
| `size` | `28px` |  |
| `dot-size` | `4px` |  |
| `stroke-width` | `1.5px` |  |
| `tick-size` | `7px` |  |
| `gap` | `3px` |  |
| `radius` | `var(--s-radius-full)` |  |
| `color` | `var(--s-primary)` |  |
| `ring-color` | `var(--s-primary)` |  |
| `dot-color` | `var(--s-primary)` |  |
| `glow` | `0 0 18px color-mix(in oklch, var(--s-primary) 35%, transparent)` |  |
| `opacity` | `0.95` |  |
| `blend-mode` | `normal` |  |
| `z-index` | `2147483647` |  |
| `hide-native` | `true` |  |
| `width` | `10px` |  |
| `height` | `10px` |  |
| `padding` | `2px` |  |
| `radius` | `var(--s-radius-full)` |  |
| `track` | `transparent` |  |
| `thumb` | `var(--s-border)` |  |
| `thumb-hover` | `var(--s-border-strong)` |  |
| `thumb-active` | `var(--s-primary)` |  |
| `corner` | `transparent` |  |
| `border` | `transparent` |  |
| `firefox-width` | `thin` |  |
| `gutter` | `auto` |  |
| `visibility` | `auto` |  |

## Composition — Focus & Overlays

| Token | Value | Role |
| --- | --- | --- |
| `ring-width` | `2px` |  |
| `ring-color` | `var(--s-primary)` |  |
| `ring-offset` | `2px` |  |
| `ring-shadow` | `0 0 0 var(--s-focus-ring-width) color-mix(in oklch, var(--s-focus-ring-color) 35%, transparent)` |  |
| `outline-color` | `var(--s-border-interactive)` |  |
| `bg` | `oklch(0 0 0 / 0.55)` |  |
| `blur` | `2px` |  |
| `surface` | `var(--s-surface)` |  |
| `border` | `var(--s-border)` |  |
| `shadow` | `var(--s-shadow-xl)` |  |
| `radius` | `var(--s-card-radius, var(--s-radius-lg))` |  |
| `padding` | `24px` |  |
| `z-index` | `50` |  |

## Composition — Data Visualization

| Token | Value | Role |
| --- | --- | --- |
| `series-1` | `var(--s-primary)` |  |
| `series-2` | `var(--s-secondary)` |  |
| `series-3` | `var(--s-accent, var(--s-info))` |  |
| `series-4` | `var(--s-success)` |  |
| `series-5` | `var(--s-warning)` |  |
| `positive` | `var(--s-success)` |  |
| `negative` | `var(--s-error)` |  |
| `neutral` | `var(--s-text-muted)` |  |
| `grid` | `var(--s-border-muted)` |  |
| `axis` | `var(--s-border-strong)` |  |
| `label` | `var(--s-text-secondary)` |  |
| `tooltip-bg` | `var(--s-surface-elevated)` |  |
| `tooltip-border` | `var(--s-border)` |  |

## Composition — Media

| Token | Value | Role |
| --- | --- | --- |
| `radius` | `var(--s-radius-md)` |  |
| `border` | `1px solid var(--s-border-muted)` |  |
| `outline` | `1px solid color-mix(in oklch, var(--s-text) 8%, transparent)` |  |
| `shadow` | `var(--s-shadow-sm)` |  |
| `bg` | `var(--s-surface-sunken, var(--s-surface))` |  |
| `object-fit` | `cover` |  |

## Composition — Controls

| Token | Value | Role |
| --- | --- | --- |
| `height` | `36px` |  |
| `height-sm` | `32px` |  |
| `height-lg` | `44px` |  |
| `hit-area` | `40px` |  |
| `icon-size` | `16px` |  |
| `handle-size` | `20px` |  |
| `track-height` | `8px` |  |
| `track-bg` | `var(--s-surface-sunken, var(--s-surface))` |  |
| `track-fill` | `var(--s-primary)` |  |
| `thumb-bg` | `var(--s-surface-elevated)` |  |
| `thumb-border` | `var(--s-border)` |  |

## Composition — Component Surfaces

| Token | Value | Role |
| --- | --- | --- |
| `bg` | `var(--s-surface)` |  |
| `bg-elevated` | `var(--s-surface-elevated)` |  |
| `bg-muted` | `var(--s-surface-sunken, var(--s-surface))` |  |
| `border` | `var(--s-border)` |  |
| `border-muted` | `var(--s-border-muted)` |  |
| `border-strong` | `var(--s-border-strong)` |  |
| `text` | `var(--s-text)` |  |
| `text-muted` | `var(--s-text-muted)` |  |
| `contrast` | `var(--s-primary-contrast, var(--s-text-inverse))` |  |
| `hover-bg` | `var(--s-surface-elevated)` |  |
| `active-bg` | `var(--s-surface-sunken, var(--s-surface))` |  |
| `selected-bg` | `color-mix(in oklch, var(--s-primary) 12%, transparent)` |  |

## Components

### Primary Button
Solid `--s-primary` background, `--s-radius-button` corners, inverse text color. Hover applies `--s-button-hover-effect` (darken/glow/lift) with `--s-duration-fast` transition. Active scales to `--s-button-active-scale`. Min-width at `--s-button-min-width`.

### Secondary Button
Transparent background with `--s-border-interactive` border at `--s-button-border-width`. Text uses `--s-primary`. Hover fills with `--s-primary-muted` background.

### Ghost Button
No background, no border. Text uses `--s-text-secondary`. Hover shows `--s-surface-elevated` background. Used for tertiary actions.

### Card
`--s-surface` background, `--s-card-border-style` border at `--s-card-border-width`. Hover triggers `--s-card-hover-effect` (border/lift/glow/scale). Padding at `--s-card-padding`. Title at `--s-card-title-size` weight `--s-card-title-weight`.

### Input Field
`--s-surface` background, `--s-input-border-width` border in `--s-border` color. Focus shows `--s-focus-ring-width` ring in `--s-focus-ring-color` at `--s-focus-ring-offset` offset. Height at `--s-input-height`. Placeholder in `--s-input-placeholder-color`.

### Navigation Bar
Height `--s-navbar-height`, `--s-navbar-position` positioning. Background blur at `--s-navbar-backdrop-blur` with `--s-navbar-bg-opacity` opacity. Items spaced at `--s-navbar-item-gap`. Border bottom via `--s-navbar-border`.

### Modal / Dialog
`--s-overlay-surface` background with `--s-overlay-radius` corners. Backdrop at `--s-overlay-bg` with `--s-overlay-blur` blur. Shadow via `--s-overlay-shadow`. Padding at `--s-overlay-padding`.

## Surfaces

| Level | Name | Value | Purpose |
| --- | --- | --- | --- |
| 0 | Background | `oklch(0.99 0 0)` | Base page background — the canvas everything sits on |
| 1 | Surface | `oklch(0.97 0 0)` | Card and panel backgrounds — primary content containers |
| 2 | Elevated | `oklch(0.98 0 0)` | Raised surfaces — modals, popovers, dropdowns |

## Do's and Don'ts

### Do
- Use OKLCH for all color values — perceptual uniformity across the gamut.
- Reference `var(--s-*)` tokens in all custom CSS — never hardcode values.
- Apply `--s-duration-fast` for micro-interactions under 200ms.
- Use the spacing scale (multiples of 4/8) for all gaps and padding.
- Keep shadows layered using the token shadow scale (`sm` through `xl`).
- Use concentric border-radius (outer radius = inner radius + padding).
- Apply `text-balance` or `text-pretty` on headings and short paragraphs.
- Use `tabular-nums` on numbers that update or align in columns.
- Prefer `color-mix(in oklch, ...)` for dynamic alpha/tint variations.
- Test both light and dark themes — themed tokens must work in both.

### Don't
- Do not hardcode hex/rgb colors in component files.
- Do not use arbitrary Tailwind values (e.g. `text-[#ff0000]`, `p-[13px]`).
- Do not bypass the spacing scale with pixel values.
- Do not add shadows outside the token shadow system.
- Do not use `duration-150` — use `duration-[var(--s-duration-fast)]`.
- Do not use `rounded-lg` — use `rounded-[var(--s-radius-lg)]`.
- Do not introduce new font families without adding them to typography tokens.
- Do not animate `width`, `height`, or `top/left` — use `transform` and `opacity`.
- Do not exceed 400ms for any single transition (except page-level).
- Do not use `!important` — restructure specificity instead.

## Imagery

Product-forward imagery contained within card structures with `--s-media-radius` corners and `--s-media-border` treatment. Minimal photography; emphasis on UI screenshots and code blocks. Icons are monochrome using `--s-text-muted` fills at `--s-controls-icon-size`. Images use `--s-media-outline` for subtle separation from backgrounds. Object-fit controlled by `--s-media-object-fit`.

## Layout

Page max-width at `--s-content-max` (1200px default). Hero sections use `--s-hero-layout` mode (centered/split/stacked/asymmetric). Content sections respect `--s-section-padding-y` vertical rhythm. Navigation uses `--s-navbar-position` (sticky) at `--s-navbar-height`. Footer spans `--s-footer-columns` columns. Page rhythm controlled by `--s-rhythm-density` with `--s-rhythm-section-gap` between sections. Bento grids use `--s-layout-bento-gap` spacing.

## Similar Brands

- **Linear** — Precision typography, subtle neutral palette, nuanced elevation, engineering-tool aesthetic.
- **Stripe** — Clean light UI, measured accent colors, professional documentation, thoughtful interaction.
- **Vercel** — Dark-first with light mode, monospace accents, developer-focused clarity, fast transitions.
- **Raycast** — Compact density, keyboard-first, warm neutrals, attention to micro-interactions.
- **Arc** — Playful gradients on a refined base, experimental typography, editorial spacing.

## Compile — CSS

```css
:root {
  --s-background: oklch(0.99 0 0);
  --s-surface: oklch(0.97 0 0);
  --s-surface-elevated: oklch(0.98 0 0);
  --s-primary: oklch(0.65 0.15 280);
  --s-primary-hover: oklch(0.60 0.18 280);
  --s-primary-muted: oklch(0.90 0.04 280);
  --s-secondary: oklch(0.70 0.12 60);
  --s-text: oklch(0.15 0 0);
  --s-text-secondary: oklch(0.40 0 0);
  --s-text-muted: oklch(0.55 0 0);
  --s-text-subtle: oklch(0.70 0 0);
  --s-text-disabled: oklch(0.80 0 0);
  --s-border: oklch(0.90 0 0);
  --s-border-muted: oklch(0.94 0 0);
  --s-border-strong: oklch(0.80 0 0);
  --s-border-interactive: oklch(0.65 0.15 280);
  --s-success: oklch(0.65 0.17 160);
  --s-warning: oklch(0.75 0.15 85);
  --s-error: oklch(0.60 0.20 25);
  --s-info: oklch(0.60 0.15 250);
  --s-highlight: oklch(0.94 0.12 95);
  --s-font-display: "PP Mori", system-ui, sans-serif;
  --s-font-body: "PP Mori", system-ui, sans-serif;
  --s-font-mono: "PP Fraktion Mono", ui-monospace, monospace;
  --s-space-4: 4px;
  --s-space-8: 8px;
  --s-space-12: 12px;
  --s-space-16: 16px;
  --s-space-24: 24px;
  --s-space-32: 32px;
  --s-space-48: 48px;
  --s-space-64: 64px;
  --s-space-80: 80px;
  --s-space-96: 96px;
  --s-grid-cell: 50px;
  --s-cross-arm: 10px;
  --s-cross-stroke: 1.5px;
  --s-rail-gap: 50px;
  --s-card-radius: 10px;
  --s-gutter-border: 1px solid;
  --s-gutter-visible: 1;
  --s-radius-none: 0px;
  --s-radius-sm: 4px;
  --s-radius-md: 8px;
  --s-radius-lg: 12px;
  --s-radius-xl: 16px;
  --s-radius-2xl: 24px;
  --s-radius-full: 9999px;
  --s-shadow-sm: 0 1px 2px 0 oklch(0 0 0 / 0.05);
  --s-shadow-md: 0 0 0 1px oklch(0 0 0 / 0.06), 0 1px 2px -1px oklch(0 0 0 / 0.06), 0 2px 4px 0 oklch(0 0 0 / 0.04);
  --s-shadow-lg: 0 0 0 1px oklch(0 0 0 / 0.04), 0 2px 4px -2px oklch(0 0 0 / 0.06), 0 4px 8px -2px oklch(0 0 0 / 0.08);
  --s-shadow-xl: 0 0 0 1px oklch(0 0 0 / 0.03), 0 4px 6px -4px oklch(0 0 0 / 0.06), 0 10px 15px -3px oklch(0 0 0 / 0.1), 0 20px 25px -5px oklch(0 0 0 / 0.06);
  --s-duration-instant: 0ms;
  --s-duration-fast: 150ms;
  --s-duration-normal: 250ms;
  --s-duration-slow: 400ms;
  --s-duration-slower: 600ms;
  --s-ease-default: cubic-bezier(0.16, 1, 0.3, 1);
  --s-ease-in: cubic-bezier(0.55, 0, 1, 0.45);
  --s-ease-out: cubic-bezier(0, 0.55, 0.45, 1);
  --s-ease-in-out: cubic-bezier(0.45, 0, 0.55, 1);
  --s-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --s-border-none: 0px;
  --s-border-thin: 1px;
  --s-border-medium: 1.5px;
  --s-border-thick: 2px;
  --s-button-font-weight: 500;
  --s-button-text-transform: none;
  --s-button-letter-spacing: 0em;
  --s-button-font-family: inherit;
  --s-button-border-width: 1px;
  --s-button-hover-effect: darken;
  --s-button-active-scale: 0.97;
  --s-button-icon-gap: 8px;
  --s-button-min-width: 0px;
  --s-card-border-style: solid;
  --s-card-border-width: 1px;
  --s-card-hover-effect: border;
  --s-card-hover-border-color: var(--s-border-strong);
  --s-card-padding: 24px;
  --s-card-header-padding: 24px 24px 0;
  --s-card-footer-padding: 0 24px 24px;
  --s-card-title-size: 1.125rem;
  --s-card-title-weight: 600;
  --s-card-description-size: 0.875rem;
  --s-heading-h1-size: 2.25rem;
  --s-heading-h1-weight: 700;
  --s-heading-h1-tracking: -0.025em;
  --s-heading-h1-leading: 1.2;
  --s-heading-h2-size: 1.875rem;
  --s-heading-h2-weight: 600;
  --s-heading-h2-tracking: -0.02em;
  --s-heading-h2-leading: 1.15;
  --s-heading-h3-size: 1.5rem;
  --s-heading-h3-weight: 600;
  --s-heading-h3-tracking: 0em;
  --s-heading-h3-leading: 1.2;
  --s-heading-h4-size: 1.25rem;
  --s-heading-h4-weight: 600;
  --s-heading-h4-tracking: 0em;
  --s-heading-h4-leading: 1.3;
  --s-heading-display-size: 3.75rem;
  --s-heading-display-weight: 700;
  --s-heading-display-tracking: -0.03em;
  --s-heading-display-leading: 1.08;
  --s-navbar-height: 50px;
  --s-navbar-backdrop-blur: 12px;
  --s-navbar-border: 1px solid;
  --s-navbar-bg-opacity: 0.8;
  --s-navbar-padding-x: 24px;
  --s-navbar-position: sticky;
  --s-navbar-logo-height: 24px;
  --s-navbar-logo-gap: 8px;
  --s-navbar-item-gap: 24px;
  --s-navbar-item-padding-x: 12px;
  --s-navbar-item-padding-y: 6px;
  --s-navbar-item-size: 0.875rem;
  --s-navbar-shadow: none;
  --s-navbar-height-scrolled: 50px;
  --s-navbar-mobile-breakpoint: 768px;
  --s-nav-link-weight: 500;
  --s-nav-link-size: 0.875rem;
  --s-nav-link-hover: color;
  --s-breadcrumb-separator: /;
  --s-pagination-radius: 0px;
  --s-sidebar-width: 280px;
  --s-sidebar-item-radius: 0px;
  --s-sidebar-item-padding: 8px 12px;
  --s-input-height: 36px;
  --s-input-height-sm: 32px;
  --s-input-height-lg: 44px;
  --s-input-border-width: 1px;
  --s-input-focus-ring-width: 2px;
  --s-input-focus-ring-color: var(--s-primary);
  --s-input-focus-ring-offset: 2px;
  --s-input-placeholder-color: var(--s-text-muted);
  --s-input-error-border-color: var(--s-error);
  --s-input-label-size: 0.875rem;
  --s-input-label-weight: 500;
  --s-input-label-spacing: 8px;
  --s-input-helper-size: 0.8125rem;
  --s-cursor-variant: sigil;
  --s-cursor-size: 28px;
  --s-cursor-dot-size: 4px;
  --s-cursor-stroke-width: 1.5px;
  --s-cursor-tick-size: 7px;
  --s-cursor-gap: 3px;
  --s-cursor-radius: var(--s-radius-full);
  --s-cursor-color: var(--s-primary);
  --s-cursor-ring-color: var(--s-primary);
  --s-cursor-dot-color: var(--s-primary);
  --s-cursor-glow: 0 0 18px color-mix(in oklch, var(--s-primary) 35%, transparent);
  --s-cursor-opacity: 0.95;
  --s-cursor-blend-mode: normal;
  --s-cursor-z-index: 2147483647;
  --s-cursor-hide-native: 1;
  --s-scrollbar-width: 10px;
  --s-scrollbar-height: 10px;
  --s-scrollbar-padding: 2px;
  --s-scrollbar-radius: var(--s-radius-full);
  --s-scrollbar-track: transparent;
  --s-scrollbar-thumb: var(--s-border);
  --s-scrollbar-thumb-hover: var(--s-border-strong);
  --s-scrollbar-thumb-active: var(--s-primary);
  --s-scrollbar-corner: transparent;
  --s-scrollbar-border: transparent;
  --s-scrollbar-firefox-width: thin;
  --s-scrollbar-gutter: auto;
  --s-scrollbar-visibility: auto;
  --s-code-font-family: var(--s-font-mono);
  --s-code-font-size: 0.875rem;
  --s-code-line-height: 1.7;
  --s-code-bg: var(--s-surface-sunken, var(--s-surface));
  --s-code-border: 1px solid var(--s-border);
  --s-code-border-radius: 0px;
  --s-code-padding: 16px;
  --s-code-tab-size: 2;
  --s-code-selection-bg: var(--s-primary-muted);
  --s-code-comment-color: var(--s-text-muted);
  --s-code-keyword-color: var(--s-primary);
  --s-code-string-color: var(--s-success);
  --s-code-number-color: var(--s-warning);
  --s-code-function-color: var(--s-info);
  --s-bg-pattern: none;
  --s-bg-pattern-opacity: 0.05;
  --s-bg-pattern-scale: 1;
  --s-bg-noise: 0;
  --s-bg-noise-opacity: 0.03;
  --s-bg-gradient-angle: 135deg;
  --s-bg-gradient-type: none;
  --s-bg-hero-pattern: none;
  --s-bg-section-divider: none;
  --s-content-max: 1200px;
  --s-content-max-narrow: 768px;
  --s-content-max-wide: 1440px;
  --s-page-margin: 25px;
  --s-page-margin-sm: 16px;
  --s-page-margin-lg: 50px;
  --s-gutter: 24px;
  --s-gutter-sm: 16px;
  --s-gutter-lg: 32px;
  --s-grid-columns: 12;
  --s-grid-gap: 24px;
  --s-bento-gap: 16px;
  --s-bento-radius: 0px;
  --s-bento-min-height: 200px;
  --s-section-gap: 32px;
  --s-sidebar-width: 280px;
  --s-sidebar-collapsed: 64px;
  --s-footer-columns: 4;
  --s-stack-gap: 16px;
  --s-stack-gap-sm: 8px;
  --s-stack-gap-lg: 24px;
  --s-prose-max: 65ch;
  --s-focus-ring-width: 2px;
  --s-focus-ring-color: var(--s-primary);
  --s-focus-ring-offset: 2px;
  --s-focus-ring-shadow: 0 0 0 var(--s-focus-ring-width) color-mix(in oklch, var(--s-focus-ring-color) 35%, transparent);
  --s-focus-outline-color: var(--s-border-interactive);
  --s-overlay-bg: oklch(0 0 0 / 0.55);
  --s-overlay-blur: 2px;
  --s-overlay-surface: var(--s-surface);
  --s-overlay-border: var(--s-border);
  --s-overlay-shadow: var(--s-shadow-xl);
  --s-overlay-radius: var(--s-card-radius, var(--s-radius-lg));
  --s-overlay-padding: 24px;
  --s-overlay-z-index: 50;
  --s-chart-series-1: var(--s-primary);
  --s-chart-series-2: var(--s-secondary);
  --s-chart-series-3: var(--s-accent, var(--s-info));
  --s-chart-series-4: var(--s-success);
  --s-chart-series-5: var(--s-warning);
  --s-chart-positive: var(--s-success);
  --s-chart-negative: var(--s-error);
  --s-chart-neutral: var(--s-text-muted);
  --s-chart-grid: var(--s-border-muted);
  --s-chart-axis: var(--s-border-strong);
  --s-chart-label: var(--s-text-secondary);
  --s-chart-tooltip-bg: var(--s-surface-elevated);
  --s-chart-tooltip-border: var(--s-border);
  --s-media-radius: var(--s-radius-md);
  --s-media-border: 1px solid var(--s-border-muted);
  --s-media-outline: 1px solid color-mix(in oklch, var(--s-text) 8%, transparent);
  --s-media-shadow: var(--s-shadow-sm);
  --s-media-bg: var(--s-surface-sunken, var(--s-surface));
  --s-media-object-fit: cover;
  --s-control-height: 36px;
  --s-control-height-sm: 32px;
  --s-control-height-lg: 44px;
  --s-control-hit-area: 40px;
  --s-control-icon-size: 16px;
  --s-control-handle-size: 20px;
  --s-control-track-height: 8px;
  --s-control-track-bg: var(--s-surface-sunken, var(--s-surface));
  --s-control-track-fill: var(--s-primary);
  --s-control-thumb-bg: var(--s-surface-elevated);
  --s-control-thumb-border: var(--s-border);
  --s-component-surface-bg: var(--s-surface);
  --s-component-surface-bg-elevated: var(--s-surface-elevated);
  --s-component-surface-bg-muted: var(--s-surface-sunken, var(--s-surface));
  --s-component-surface-border: var(--s-border);
  --s-component-surface-border-muted: var(--s-border-muted);
  --s-component-surface-border-strong: var(--s-border-strong);
  --s-component-surface-text: var(--s-text);
  --s-component-surface-text-muted: var(--s-text-muted);
  --s-component-surface-contrast: var(--s-primary-contrast, var(--s-text-inverse));
  --s-component-surface-hover-bg: var(--s-surface-elevated);
  --s-component-surface-active-bg: var(--s-surface-sunken, var(--s-surface));
  --s-component-surface-selected-bg: color-mix(in oklch, var(--s-primary) 12%, transparent);
  --s-hero-min-height: auto;
  --s-hero-padding-y: 100px;
  --s-hero-padding-y-sm: 100px;
  --s-hero-padding-x: var(--s-page-margin, 24px);
  --s-hero-content-max: 640px;
  --s-hero-content-align: center;
  --s-hero-layout: centered;
  --s-hero-media-position: below;
  --s-hero-media-width: 50%;
  --s-hero-media-radius: var(--s-radius-lg, 12px);
  --s-hero-title-size: clamp(2.25rem, 6vw, 4rem);
  --s-hero-title-max-width: 56rem;
  --s-hero-description-size: 1.125rem;
  --s-hero-description-max-width: 32rem;
  --s-hero-description-gap: 24px;
  --s-hero-actions-gap: 12px;
  --s-hero-actions-margin-top: 32px;
  --s-hero-action-padding-x: 24px;
  --s-hero-action-padding-y: 12px;
  --s-hero-badge-gap: 24px;
  --s-hero-overlay-opacity: 0.5;
  --s-hero-scroll-indicator: 0;
  --s-hero-gradient-overlay: none;
  --s-cta-padding-y: 100px;
  --s-cta-padding-x: var(--s-page-margin, 24px);
  --s-cta-max-width: var(--s-content-max, 1200px);
  --s-cta-layout: centered;
  --s-cta-border: 1;
  --s-cta-border-radius: var(--s-card-radius, var(--s-radius-md, 8px));
  --s-cta-bg: var(--s-surface);
  --s-cta-title-size: clamp(1.5rem, 4vw, 2.25rem);
  --s-cta-description-max-width: 32rem;
  --s-cta-description-gap: 12px;
  --s-cta-actions-gap: 12px;
  --s-cta-actions-margin-top: 32px;
  --s-cta-action-padding-x: 24px;
  --s-cta-action-padding-y: 12px;
  --s-cta-split-gap: 50px;
  --s-footer-padding-y: 50px;
  --s-footer-border-top: 1px solid var(--s-border);
  --s-footer-columns: 4;
  --s-footer-column-gap: 32px;
  --s-footer-row-gap: 32px;
  --s-footer-logo-height: 24px;
  --s-footer-tagline-max-width: 20rem;
  --s-footer-link-size: 0.875rem;
  --s-footer-link-gap: 8px;
  --s-footer-group-title-size: 0.875rem;
  --s-footer-group-title-weight: 600;
  --s-footer-social-icon-size: 20px;
  --s-footer-social-gap: 12px;
  --s-footer-bottom-bar-padding: 24px 0;
  --s-footer-bottom-bar-border: 1px solid var(--s-border-muted);
  --s-banner-height: 50px;
  --s-banner-padding-y: 8px;
  --s-banner-padding-x: 16px;
  --s-banner-font-size: 0.875rem;
  --s-banner-font-weight: 500;
  --s-banner-icon-size: 16px;
  --s-banner-icon-gap: 12px;
  --s-banner-border-width: 1px;
  --s-banner-border-position: bottom;
  --s-banner-position: top;
  --s-banner-dismiss-size: 16px;
  --s-banner-radius: 0px;
  --s-rhythm-density: normal;
  --s-rhythm-section-gap: 0px;
  --s-rhythm-section-gap-sm: 0px;
  --s-rhythm-section-gap-lg: 0px;
  --s-rhythm-first-section-offset: 0px;
  --s-rhythm-last-section-margin: 0px;
  --s-rhythm-alternate-bg: 0;
  --s-rhythm-alternate-bg-color: var(--s-surface);
  --s-rhythm-divider-between: 0;
  --s-rhythm-max-content-width: var(--s-content-max, 1200px);
  --s-rhythm-vertical-rhythm-unit: 8px;
  --s-rhythm-scroll-snap: 0;
  --s-rhythm-responsive-scale: 1;
  --s-rhythm-responsive-breakpoint: 768px;
}

[data-theme='dark'] {
  --s-background: oklch(0.07 0.01 280);
  --s-surface: oklch(0.12 0.01 280);
  --s-surface-elevated: oklch(0.15 0.01 280);
  --s-text: oklch(0.93 0 0);
  --s-text-secondary: oklch(0.70 0 0);
  --s-text-muted: oklch(0.45 0 0);
  --s-text-subtle: oklch(0.40 0 0);
  --s-text-disabled: oklch(0.30 0 0);
  --s-border: oklch(0.25 0.01 280);
  --s-border-muted: oklch(0.20 0.01 280);
  --s-border-strong: oklch(0.35 0.01 280);
  --s-border-interactive: oklch(0.65 0.15 280);
  --s-highlight: oklch(0.30 0.08 95);
}

```

## Compile — Tailwind v4

```css
@theme {
  --color-background: var(--s-background);
  --color-surface: var(--s-surface);
  --color-surface-elevated: var(--s-surface-elevated);
  --color-primary: var(--s-primary);
  --color-primary-hover: var(--s-primary-hover);
  --color-primary-muted: var(--s-primary-muted);
  --color-secondary: var(--s-secondary);
  --color-text: var(--s-text);
  --color-text-secondary: var(--s-text-secondary);
  --color-text-muted: var(--s-text-muted);
  --color-text-subtle: var(--s-text-subtle);
  --color-text-disabled: var(--s-text-disabled);
  --color-border: var(--s-border);
  --color-border-muted: var(--s-border-muted);
  --color-border-strong: var(--s-border-strong);
  --color-border-interactive: var(--s-border-interactive);
  --color-success: var(--s-success);
  --color-warning: var(--s-warning);
  --color-error: var(--s-error);
  --color-info: var(--s-info);
  --color-highlight: var(--s-highlight);

  --font-display: var(--s-font-display);
  --font-body: var(--s-font-body);
  --font-mono: var(--s-font-mono);

  --spacing-4: var(--s-space-4);
  --spacing-8: var(--s-space-8);
  --spacing-12: var(--s-space-12);
  --spacing-16: var(--s-space-16);
  --spacing-24: var(--s-space-24);
  --spacing-32: var(--s-space-32);
  --spacing-48: var(--s-space-48);
  --spacing-64: var(--s-space-64);
  --spacing-80: var(--s-space-80);
  --spacing-96: var(--s-space-96);

  --radius-none: var(--s-radius-none);
  --radius-sm: var(--s-radius-sm);
  --radius-md: var(--s-radius-md);
  --radius-lg: var(--s-radius-lg);
  --radius-xl: var(--s-radius-xl);
  --radius-2xl: var(--s-radius-2xl);
  --radius-full: var(--s-radius-full);

  --shadow-sm: var(--s-shadow-sm);
  --shadow-md: var(--s-shadow-md);
  --shadow-lg: var(--s-shadow-lg);
  --shadow-xl: var(--s-shadow-xl);

  --duration-instant: var(--s-duration-instant);
  --duration-fast: var(--s-duration-fast);
  --duration-normal: var(--s-duration-normal);
  --duration-slow: var(--s-duration-slow);
  --duration-slower: var(--s-duration-slower);

  --ease-default: var(--s-ease-default);
  --ease-in: var(--s-ease-in);
  --ease-out: var(--s-ease-out);
  --ease-in-out: var(--s-ease-in-out);
  --ease-spring: var(--s-ease-spring);
}

```

## Compile — W3C Design Tokens

```json
{
  "color": {
    "background": {
      "$value": {
        "light": "oklch(0.99 0 0)",
        "dark": "oklch(0.07 0.01 280)"
      },
      "$type": "color",
      "$description": "Color token: background"
    },
    "surface": {
      "$value": {
        "light": "oklch(0.97 0 0)",
        "dark": "oklch(0.12 0.01 280)"
      },
      "$type": "color",
      "$description": "Color token: surface"
    },
    "surface-elevated": {
      "$value": {
        "light": "oklch(0.98 0 0)",
        "dark": "oklch(0.15 0.01 280)"
      },
      "$type": "color",
      "$description": "Color token: surface-elevated"
    },
    "primary": {
      "$value": "oklch(0.65 0.15 280)",
      "$type": "color",
      "$description": "Color token: primary"
    },
    "primary-hover": {
      "$value": "oklch(0.60 0.18 280)",
      "$type": "color",
      "$description": "Color token: primary-hover"
    },
    "primary-muted": {
      "$value": "oklch(0.90 0.04 280)",
      "$type": "color",
      "$description": "Color token: primary-muted"
    },
    "secondary": {
      "$value": "oklch(0.70 0.12 60)",
      "$type": "color",
      "$description": "Color token: secondary"
    },
    "text": {
      "$value": {
        "light": "oklch(0.15 0 0)",
        "dark": "oklch(0.93 0 0)"
      },
      "$type": "color",
      "$description": "Color token: text"
    },
    "text-secondary": {
      "$value": {
        "light": "oklch(0.40 0 0)",
        "dark": "oklch(0.70 0 0)"
      },
      "$type": "color",
      "$description": "Color token: text-secondary"
    },
    "text-muted": {
      "$value": {
        "light": "oklch(0.55 0 0)",
        "dark": "oklch(0.45 0 0)"
      },
      "$type": "color",
      "$description": "Color token: text-muted"
    },
    "text-subtle": {
      "$value": {
        "light": "oklch(0.70 0 0)",
        "dark": "oklch(0.40 0 0)"
      },
      "$type": "color",
      "$description": "Color token: text-subtle"
    },
    "text-disabled": {
      "$value": {
        "light": "oklch(0.80 0 0)",
        "dark": "oklch(0.30 0 0)"
      },
      "$type": "color",
      "$description": "Color token: text-disabled"
    },
    "border": {
      "$value": {
        "light": "oklch(0.90 0 0)",
        "dark": "oklch(0.25 0.01 280)"
      },
      "$type": "color",
      "$description": "Color token: border"
    },
    "border-muted": {
      "$value": {
        "light": "oklch(0.94 0 0)",
        "dark": "oklch(0.20 0.01 280)"
      },
      "$type": "color",
      "$description": "Color token: border-muted"
    },
    "border-strong": {
      "$value": {
        "light": "oklch(0.80 0 0)",
        "dark": "oklch(0.35 0.01 280)"
      },
      "$type": "color",
      "$description": "Color token: border-strong"
    },
    "border-interactive": {
      "$value": {
        "light": "oklch(0.65 0.15 280)",
        "dark": "oklch(0.65 0.15 280)"
      },
      "$type": "color",
      "$description": "Color token: border-interactive"
    },
    "success": {
      "$value": "oklch(0.65 0.17 160)",
      "$type": "color",
      "$description": "Color token: success"
    },
    "warning": {
      "$value": "oklch(0.75 0.15 85)",
      "$type": "color",
      "$description": "Color token: warning"
    },
    "error": {
      "$value": "oklch(0.60 0.20 25)",
      "$type": "color",
      "$description": "Color token: error"
    },
    "info": {
      "$value": "oklch(0.60 0.15 250)",
      "$type": "color",
      "$description": "Color token: info"
    },
    "highlight": {
      "$value": {
        "light": "oklch(0.94 0.12 95)",
        "dark": "oklch(0.30 0.08 95)"
      },
      "$type": "color",
      "$description": "Color token: highlight"
    }
  },
  "typography": {
    "font-display": {
      "$value": "\"PP Mori\", system-ui, sans-serif",
      "$type": "fontFamily"
    },
    "font-body": {
      "$value": "\"PP Mori\", system-ui, sans-serif",
      "$type": "fontFamily"
    },
    "font-mono": {
      "$value": "\"PP Fraktion Mono\", ui-monospace, monospace",
      "$type": "fontFamily"
    }
  },
  "spacing": {
    "4": {
      "$value": "4px",
      "$type": "dimension"
    },
    "8": {
      "$value": "8px",
      "$type": "dimension"
    },
    "12": {
      "$value": "12px",
      "$type": "dimension"
    },
    "16": {
      "$value": "16px",
      "$type": "dimension"
    },
    "24": {
      "$value": "24px",
      "$type": "dimension"
    },
    "32": {
      "$value": "32px",
      "$type": "dimension"
    },
    "48": {
      "$value": "48px",
      "$type": "dimension"
    },
    "64": {
      "$value": "64px",
      "$type": "dimension"
    },
    "80": {
      "$value": "80px",
      "$type": "dimension"
    },
    "96": {
      "$value": "96px",
      "$type": "dimension"
    }
  },
  "radius": {
    "none": {
      "$value": "0px",
      "$type": "dimension"
    },
    "sm": {
      "$value": "4px",
      "$type": "dimension"
    },
    "md": {
      "$value": "8px",
      "$type": "dimension"
    },
    "lg": {
      "$value": "12px",
      "$type": "dimension"
    },
    "xl": {
      "$value": "16px",
      "$type": "dimension"
    },
    "2xl": {
      "$value": "24px",
      "$type": "dimension"
    },
    "full": {
      "$value": "9999px",
      "$type": "dimension"
    }
  },
  "shadow": {
    "sm": {
      "$value": "0 1px 2px 0 oklch(0 0 0 / 0.05)",
      "$type": "shadow"
    },
    "md": {
      "$value": "0 0 0 1px oklch(0 0 0 / 0.06), 0 1px 2px -1px oklch(0 0 0 / 0.06), 0 2px 4px 0 oklch(0 0 0 / 0.04)",
      "$type": "shadow"
    },
    "lg": {
      "$value": "0 0 0 1px oklch(0 0 0 / 0.04), 0 2px 4px -2px oklch(0 0 0 / 0.06), 0 4px 8px -2px oklch(0 0 0 / 0.08)",
      "$type": "shadow"
    },
    "xl": {
      "$value": "0 0 0 1px oklch(0 0 0 / 0.03), 0 4px 6px -4px oklch(0 0 0 / 0.06), 0 10px 15px -3px oklch(0 0 0 / 0.1), 0 20px 25px -5px oklch(0 0 0 / 0.06)",
      "$type": "shadow"
    }
  },
  "motion": {
    "duration": {
      "instant": {
        "$value": "0ms",
        "$type": "duration"
      },
      "fast": {
        "$value": "150ms",
        "$type": "duration"
      },
      "normal": {
        "$value": "250ms",
        "$type": "duration"
      },
      "slow": {
        "$value": "400ms",
        "$type": "duration"
      },
      "slower": {
        "$value": "600ms",
        "$type": "duration"
      }
    },
    "easing": {
      "default": {
        "$value": "cubic-bezier(0.16, 1, 0.3, 1)",
        "$type": "cubicBezier"
      },
      "in": {
        "$value": "cubic-bezier(0.55, 0, 1, 0.45)",
        "$type": "cubicBezier"
      },
      "out": {
        "$value": "cubic-bezier(0, 0.55, 0.45, 1)",
        "$type": "cubicBezier"
      },
      "in-out": {
        "$value": "cubic-bezier(0.45, 0, 0.55, 1)",
        "$type": "cubicBezier"
      },
      "spring": {
        "$value": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "$type": "cubicBezier"
      }
    }
  },
  "border": {
    "width": {
      "none": {
        "$value": "0px",
        "$type": "dimension"
      },
      "thin": {
        "$value": "1px",
        "$type": "dimension"
      },
      "medium": {
        "$value": "1.5px",
        "$type": "dimension"
      },
      "thick": {
        "$value": "2px",
        "$type": "dimension"
      }
    }
  },
  "layout": {
    "content-max": {
      "$value": "1200px",
      "$type": "dimension"
    },
    "content-max-narrow": {
      "$value": "768px",
      "$type": "dimension"
    },
    "content-max-wide": {
      "$value": "1440px",
      "$type": "dimension"
    },
    "page-margin": {
      "$value": "25px",
      "$type": "dimension"
    },
    "page-margin-sm": {
      "$value": "16px",
      "$type": "dimension"
    },
    "page-margin-lg": {
      "$value": "50px",
      "$type": "dimension"
    },
    "gutter": {
      "$value": "24px",
      "$type": "dimension"
    },
    "gutter-sm": {
      "$value": "16px",
      "$type": "dimension"
    },
    "gutter-lg": {
      "$value": "32px",
      "$type": "dimension"
    },
    "grid-columns": {
      "$value": "12",
      "$type": "dimension"
    },
    "grid-gap": {
      "$value": "24px",
      "$type": "dimension"
    },
    "bento-gap": {
      "$value": "16px",
      "$type": "dimension"
    },
    "bento-radius": {
      "$value": "0px",
      "$type": "dimension"
    },
    "bento-min-height": {
      "$value": "200px",
      "$type": "dimension"
    },
    "section-gap": {
      "$value": "32px",
      "$type": "dimension"
    },
    "sidebar-width": {
      "$value": "280px",
      "$type": "dimension"
    },
    "sidebar-collapsed": {
      "$value": "64px",
      "$type": "dimension"
    },
    "footer-columns": {
      "$value": "4",
      "$type": "dimension"
    },
    "stack-gap": {
      "$value": "16px",
      "$type": "dimension"
    },
    "stack-gap-sm": {
      "$value": "8px",
      "$type": "dimension"
    },
    "stack-gap-lg": {
      "$value": "24px",
      "$type": "dimension"
    },
    "prose-max": {
      "$value": "65ch",
      "$type": "dimension"
    }
  },
  "buttons": {
    "font-weight": {
      "$value": "500",
      "$type": "string"
    },
    "text-transform": {
      "$value": "none",
      "$type": "string"
    },
    "letter-spacing": {
      "$value": "0em",
      "$type": "string"
    },
    "font-family": {
      "$value": "inherit",
      "$type": "string"
    },
    "border-width": {
      "$value": "1px",
      "$type": "string"
    },
    "hover-effect": {
      "$value": "darken",
      "$type": "string"
    },
    "active-scale": {
      "$value": "0.97",
      "$type": "string"
    },
    "icon-gap": {
      "$value": "8px",
      "$type": "string"
    },
    "min-width": {
      "$value": "0px",
      "$type": "string"
    }
  },
  "cards": {
    "border-style": {
      "$value": "solid",
      "$type": "string"
    },
    "border-width": {
      "$value": "1px",
      "$type": "string"
    },
    "hover-effect": {
      "$value": "border",
      "$type": "string"
    },
    "hover-border-color": {
      "$value": "var(--s-border-strong)",
      "$type": "string"
    },
    "padding": {
      "$value": "24px",
      "$type": "string"
    },
    "header-padding": {
      "$value": "24px 24px 0",
      "$type": "string"
    },
    "footer-padding": {
      "$value": "0 24px 24px",
      "$type": "string"
    },
    "title-size": {
      "$value": "1.125rem",
      "$type": "string"
    },
    "title-weight": {
      "$value": "600",
      "$type": "string"
    },
    "description-size": {
      "$value": "0.875rem",
      "$type": "string"
    }
  },
  "headings": {
    "h1-size": {
      "$value": "2.25rem",
      "$type": "string"
    },
    "h1-weight": {
      "$value": "700",
      "$type": "string"
    },
    "h1-tracking": {
      "$value": "-0.025em",
      "$type": "string"
    },
    "h1-leading": {
      "$value": "1.2",
      "$type": "string"
    },
    "h2-size": {
      "$value": "1.875rem",
      "$type": "string"
    },
    "h2-weight": {
      "$value": "600",
      "$type": "string"
    },
    "h2-tracking": {
      "$value": "-0.02em",
      "$type": "string"
    },
    "h2-leading": {
      "$value": "1.15",
      "$type": "string"
    },
    "h3-size": {
      "$value": "1.5rem",
      "$type": "string"
    },
    "h3-weight": {
      "$value": "600",
      "$type": "string"
    },
    "h3-tracking": {
      "$value": "0em",
      "$type": "string"
    },
    "h3-leading": {
      "$value": "1.2",
      "$type": "string"
    },
    "h4-size": {
      "$value": "1.25rem",
      "$type": "string"
    },
    "h4-weight": {
      "$value": "600",
      "$type": "string"
    },
    "h4-tracking": {
      "$value": "0em",
      "$type": "string"
    },
    "h4-leading": {
      "$value": "1.3",
      "$type": "string"
    },
    "display-size": {
      "$value": "3.75rem",
      "$type": "string"
    },
    "display-weight": {
      "$value": "700",
      "$type": "string"
    },
    "display-tracking": {
      "$value": "-0.03em",
      "$type": "string"
    },
    "display-leading": {
      "$value": "1.08",
      "$type": "string"
    }
  },
  "navigation": {
    "navbar-height": {
      "$value": "50px",
      "$type": "string"
    },
    "navbar-backdrop-blur": {
      "$value": "12px",
      "$type": "string"
    },
    "navbar-border": {
      "$value": "1px solid",
      "$type": "string"
    },
    "navbar-bg-opacity": {
      "$value": "0.8",
      "$type": "string"
    },
    "navbar-padding-x": {
      "$value": "24px",
      "$type": "string"
    },
    "navbar-position": {
      "$value": "sticky",
      "$type": "string"
    },
    "navbar-logo-height": {
      "$value": "24px",
      "$type": "string"
    },
    "navbar-logo-gap": {
      "$value": "8px",
      "$type": "string"
    },
    "navbar-item-gap": {
      "$value": "24px",
      "$type": "string"
    },
    "navbar-item-padding-x": {
      "$value": "12px",
      "$type": "string"
    },
    "navbar-item-padding-y": {
      "$value": "6px",
      "$type": "string"
    },
    "navbar-item-size": {
      "$value": "0.875rem",
      "$type": "string"
    },
    "navbar-shadow": {
      "$value": "none",
      "$type": "string"
    },
    "navbar-height-scrolled": {
      "$value": "50px",
      "$type": "string"
    },
    "navbar-mobile-breakpoint": {
      "$value": "768px",
      "$type": "string"
    },
    "nav-link-weight": {
      "$value": "500",
      "$type": "string"
    },
    "nav-link-size": {
      "$value": "0.875rem",
      "$type": "string"
    },
    "nav-link-hover": {
      "$value": "color",
      "$type": "string"
    },
    "breadcrumb-separator": {
      "$value": "/",
      "$type": "string"
    },
    "pagination-radius": {
      "$value": "0px",
      "$type": "string"
    },
    "sidebar-width": {
      "$value": "280px",
      "$type": "string"
    },
    "sidebar-item-radius": {
      "$value": "0px",
      "$type": "string"
    },
    "sidebar-item-padding": {
      "$value": "8px 12px",
      "$type": "string"
    }
  },
  "inputs": {
    "height": {
      "$value": "36px",
      "$type": "string"
    },
    "height-sm": {
      "$value": "32px",
      "$type": "string"
    },
    "height-lg": {
      "$value": "44px",
      "$type": "string"
    },
    "border-width": {
      "$value": "1px",
      "$type": "string"
    },
    "focus-ring-width": {
      "$value": "2px",
      "$type": "string"
    },
    "focus-ring-color": {
      "$value": "var(--s-primary)",
      "$type": "string"
    },
    "focus-ring-offset": {
      "$value": "2px",
      "$type": "string"
    },
    "placeholder-color": {
      "$value": "var(--s-text-muted)",
      "$type": "string"
    },
    "error-border-color": {
      "$value": "var(--s-error)",
      "$type": "string"
    },
    "label-size": {
      "$value": "0.875rem",
      "$type": "string"
    },
    "label-weight": {
      "$value": "500",
      "$type": "string"
    },
    "label-spacing": {
      "$value": "8px",
      "$type": "string"
    },
    "helper-size": {
      "$value": "0.8125rem",
      "$type": "string"
    }
  },
  "code": {
    "font-family": {
      "$value": "var(--s-font-mono)",
      "$type": "string"
    },
    "font-size": {
      "$value": "0.875rem",
      "$type": "string"
    },
    "line-height": {
      "$value": "1.7",
      "$type": "string"
    },
    "bg": {
      "$value": "var(--s-surface-sunken, var(--s-surface))",
      "$type": "string"
    },
    "border": {
      "$value": "1px solid var(--s-border)",
      "$type": "string"
    },
    "border-radius": {
      "$value": "0px",
      "$type": "string"
    },
    "padding": {
      "$value": "16px",
      "$type": "string"
    },
    "tab-size": {
      "$value": "2",
      "$type": "string"
    },
    "selection-bg": {
      "$value": "var(--s-primary-muted)",
      "$type": "string"
    },
    "comment-color": {
      "$value": "var(--s-text-muted)",
      "$type": "string"
    },
    "keyword-color": {
      "$value": "var(--s-primary)",
      "$type": "string"
    },
    "string-color": {
      "$value": "var(--s-success)",
      "$type": "string"
    },
    "number-color": {
      "$value": "var(--s-warning)",
      "$type": "string"
    },
    "function-color": {
      "$value": "var(--s-info)",
      "$type": "string"
    }
  },
  "backgrounds": {
    "pattern": {
      "$value": "none",
      "$type": "string"
    },
    "pattern-opacity": {
      "$value": "0.05",
      "$type": "string"
    },
    "pattern-scale": {
      "$value": "1",
      "$type": "string"
    },
    "noise": {
      "$value": false,
      "$type": "boolean"
    },
    "noise-opacity": {
      "$value": "0.03",
      "$type": "string"
    },
    "gradient-angle": {
      "$value": "135deg",
      "$type": "string"
    },
    "gradient-type": {
      "$value": "none",
      "$type": "string"
    },
    "hero-pattern": {
      "$value": "none",
      "$type": "string"
    },
    "section-divider": {
      "$value": "none",
      "$type": "string"
    }
  },
  "hero": {
    "min-height": {
      "$value": "auto",
      "$type": "string"
    },
    "padding-y": {
      "$value": "100px",
      "$type": "string"
    },
    "padding-y-sm": {
      "$value": "100px",
      "$type": "string"
    },
    "padding-x": {
      "$value": "var(--s-page-margin, 24px)",
      "$type": "string"
    },
    "content-max": {
      "$value": "640px",
      "$type": "string"
    },
    "content-align": {
      "$value": "center",
      "$type": "string"
    },
    "layout": {
      "$value": "centered",
      "$type": "string"
    },
    "media-position": {
      "$value": "below",
      "$type": "string"
    },
    "media-width": {
      "$value": "50%",
      "$type": "string"
    },
    "media-radius": {
      "$value": "var(--s-radius-lg, 12px)",
      "$type": "string"
    },
    "title-size": {
      "$value": "clamp(2.25rem, 6vw, 4rem)",
      "$type": "string"
    },
    "title-max-width": {
      "$value": "56rem",
      "$type": "string"
    },
    "description-size": {
      "$value": "1.125rem",
      "$type": "string"
    },
    "description-max-width": {
      "$value": "32rem",
      "$type": "string"
    },
    "description-gap": {
      "$value": "24px",
      "$type": "string"
    },
    "actions-gap": {
      "$value": "12px",
      "$type": "string"
    },
    "actions-margin-top": {
      "$value": "32px",
      "$type": "string"
    },
    "action-padding-x": {
      "$value": "24px",
      "$type": "string"
    },
    "action-padding-y": {
      "$value": "12px",
      "$type": "string"
    },
    "badge-gap": {
      "$value": "24px",
      "$type": "string"
    },
    "overlay-opacity": {
      "$value": "0.5",
      "$type": "string"
    },
    "scroll-indicator": {
      "$value": false,
      "$type": "boolean"
    },
    "gradient-overlay": {
      "$value": "none",
      "$type": "string"
    }
  },
  "cta": {
    "padding-y": {
      "$value": "100px",
      "$type": "string"
    },
    "padding-x": {
      "$value": "var(--s-page-margin, 24px)",
      "$type": "string"
    },
    "max-width": {
      "$value": "var(--s-content-max, 1200px)",
      "$type": "string"
    },
    "layout": {
      "$value": "centered",
      "$type": "string"
    },
    "border": {
      "$value": true,
      "$type": "boolean"
    },
    "border-radius": {
      "$value": "var(--s-card-radius, var(--s-radius-md, 8px))",
      "$type": "string"
    },
    "bg": {
      "$value": "var(--s-surface)",
      "$type": "string"
    },
    "title-size": {
      "$value": "clamp(1.5rem, 4vw, 2.25rem)",
      "$type": "string"
    },
    "description-max-width": {
      "$value": "32rem",
      "$type": "string"
    },
    "description-gap": {
      "$value": "12px",
      "$type": "string"
    },
    "actions-gap": {
      "$value": "12px",
      "$type": "string"
    },
    "actions-margin-top": {
      "$value": "32px",
      "$type": "string"
    },
    "action-padding-x": {
      "$value": "24px",
      "$type": "string"
    },
    "action-padding-y": {
      "$value": "12px",
      "$type": "string"
    },
    "split-gap": {
      "$value": "50px",
      "$type": "string"
    }
  },
  "footer": {
    "padding-y": {
      "$value": "50px",
      "$type": "string"
    },
    "border-top": {
      "$value": "1px solid var(--s-border)",
      "$type": "string"
    },
    "columns": {
      "$value": "4",
      "$type": "string"
    },
    "column-gap": {
      "$value": "32px",
      "$type": "string"
    },
    "row-gap": {
      "$value": "32px",
      "$type": "string"
    },
    "logo-height": {
      "$value": "24px",
      "$type": "string"
    },
    "tagline-max-width": {
      "$value": "20rem",
      "$type": "string"
    },
    "link-size": {
      "$value": "0.875rem",
      "$type": "string"
    },
    "link-gap": {
      "$value": "8px",
      "$type": "string"
    },
    "group-title-size": {
      "$value": "0.875rem",
      "$type": "string"
    },
    "group-title-weight": {
      "$value": "600",
      "$type": "string"
    },
    "social-icon-size": {
      "$value": "20px",
      "$type": "string"
    },
    "social-gap": {
      "$value": "12px",
      "$type": "string"
    },
    "bottom-bar-padding": {
      "$value": "24px 0",
      "$type": "string"
    },
    "bottom-bar-border": {
      "$value": "1px solid var(--s-border-muted)",
      "$type": "string"
    }
  },
  "banner": {
    "height": {
      "$value": "50px",
      "$type": "string"
    },
    "padding-y": {
      "$value": "8px",
      "$type": "string"
    },
    "padding-x": {
      "$value": "16px",
      "$type": "string"
    },
    "font-size": {
      "$value": "0.875rem",
      "$type": "string"
    },
    "font-weight": {
      "$value": "500",
      "$type": "string"
    },
    "icon-size": {
      "$value": "16px",
      "$type": "string"
    },
    "icon-gap": {
      "$value": "12px",
      "$type": "string"
    },
    "border-width": {
      "$value": "1px",
      "$type": "string"
    },
    "border-position": {
      "$value": "bottom",
      "$type": "string"
    },
    "position": {
      "$value": "top",
      "$type": "string"
    },
    "dismiss-size": {
      "$value": "16px",
      "$type": "string"
    },
    "radius": {
      "$value": "0px",
      "$type": "string"
    }
  },
  "pageRhythm": {
    "density": {
      "$value": "normal",
      "$type": "string"
    },
    "section-gap": {
      "$value": "0px",
      "$type": "string"
    },
    "section-gap-sm": {
      "$value": "0px",
      "$type": "string"
    },
    "section-gap-lg": {
      "$value": "0px",
      "$type": "string"
    },
    "first-section-offset": {
      "$value": "0px",
      "$type": "string"
    },
    "last-section-margin": {
      "$value": "0px",
      "$type": "string"
    },
    "alternate-bg": {
      "$value": false,
      "$type": "boolean"
    },
    "alternate-bg-color": {
      "$value": "var(--s-surface)",
      "$type": "string"
    },
    "divider-between": {
      "$value": false,
      "$type": "boolean"
    },
    "max-content-width": {
      "$value": "var(--s-content-max, 1200px)",
      "$type": "string"
    },
    "vertical-rhythm-unit": {
      "$value": "8px",
      "$type": "string"
    },
    "scroll-snap": {
      "$value": false,
      "$type": "boolean"
    },
    "responsive-scale": {
      "$value": "1",
      "$type": "string"
    },
    "responsive-breakpoint": {
      "$value": "768px",
      "$type": "string"
    }
  },
  "focus": {
    "ring-width": {
      "$value": "2px",
      "$type": "string"
    },
    "ring-color": {
      "$value": "var(--s-primary)",
      "$type": "string"
    },
    "ring-offset": {
      "$value": "2px",
      "$type": "string"
    },
    "ring-shadow": {
      "$value": "0 0 0 var(--s-focus-ring-width) color-mix(in oklch, var(--s-focus-ring-color) 35%, transparent)",
      "$type": "string"
    },
    "outline-color": {
      "$value": "var(--s-border-interactive)",
      "$type": "string"
    }
  },
  "overlays": {
    "bg": {
      "$value": "oklch(0 0 0 / 0.55)",
      "$type": "string"
    },
    "blur": {
      "$value": "2px",
      "$type": "string"
    },
    "surface": {
      "$value": "var(--s-surface)",
      "$type": "string"
    },
    "border": {
      "$value": "var(--s-border)",
      "$type": "string"
    },
    "shadow": {
      "$value": "var(--s-shadow-xl)",
      "$type": "string"
    },
    "radius": {
      "$value": "var(--s-card-radius, var(--s-radius-lg))",
      "$type": "string"
    },
    "padding": {
      "$value": "24px",
      "$type": "string"
    },
    "z-index": {
      "$value": "50",
      "$type": "string"
    }
  },
  "dataViz": {
    "series-1": {
      "$value": "var(--s-primary)",
      "$type": "string"
    },
    "series-2": {
      "$value": "var(--s-secondary)",
      "$type": "string"
    },
    "series-3": {
      "$value": "var(--s-accent, var(--s-info))",
      "$type": "string"
    },
    "series-4": {
      "$value": "var(--s-success)",
      "$type": "string"
    },
    "series-5": {
      "$value": "var(--s-warning)",
      "$type": "string"
    },
    "positive": {
      "$value": "var(--s-success)",
      "$type": "string"
    },
    "negative": {
      "$value": "var(--s-error)",
      "$type": "string"
    },
    "neutral": {
      "$value": "var(--s-text-muted)",
      "$type": "string"
    },
    "grid": {
      "$value": "var(--s-border-muted)",
      "$type": "string"
    },
    "axis": {
      "$value": "var(--s-border-strong)",
      "$type": "string"
    },
    "label": {
      "$value": "var(--s-text-secondary)",
      "$type": "string"
    },
    "tooltip-bg": {
      "$value": "var(--s-surface-elevated)",
      "$type": "string"
    },
    "tooltip-border": {
      "$value": "var(--s-border)",
      "$type": "string"
    }
  },
  "media": {
    "radius": {
      "$value": "var(--s-radius-md)",
      "$type": "string"
    },
    "border": {
      "$value": "1px solid var(--s-border-muted)",
      "$type": "string"
    },
    "outline": {
      "$value": "1px solid color-mix(in oklch, var(--s-text) 8%, transparent)",
      "$type": "string"
    },
    "shadow": {
      "$value": "var(--s-shadow-sm)",
      "$type": "string"
    },
    "bg": {
      "$value": "var(--s-surface-sunken, var(--s-surface))",
      "$type": "string"
    },
    "object-fit": {
      "$value": "cover",
      "$type": "string"
    }
  },
  "controls": {
    "height": {
      "$value": "36px",
      "$type": "string"
    },
    "height-sm": {
      "$value": "32px",
      "$type": "string"
    },
    "height-lg": {
      "$value": "44px",
      "$type": "string"
    },
    "hit-area": {
      "$value": "40px",
      "$type": "string"
    },
    "icon-size": {
      "$value": "16px",
      "$type": "string"
    },
    "handle-size": {
      "$value": "20px",
      "$type": "string"
    },
    "track-height": {
      "$value": "8px",
      "$type": "string"
    },
    "track-bg": {
      "$value": "var(--s-surface-sunken, var(--s-surface))",
      "$type": "string"
    },
    "track-fill": {
      "$value": "var(--s-primary)",
      "$type": "string"
    },
    "thumb-bg": {
      "$value": "var(--s-surface-elevated)",
      "$type": "string"
    },
    "thumb-border": {
      "$value": "var(--s-border)",
      "$type": "string"
    }
  },
  "componentSurfaces": {
    "bg": {
      "$value": "var(--s-surface)",
      "$type": "string"
    },
    "bg-elevated": {
      "$value": "var(--s-surface-elevated)",
      "$type": "string"
    },
    "bg-muted": {
      "$value": "var(--s-surface-sunken, var(--s-surface))",
      "$type": "string"
    },
    "border": {
      "$value": "var(--s-border)",
      "$type": "string"
    },
    "border-muted": {
      "$value": "var(--s-border-muted)",
      "$type": "string"
    },
    "border-strong": {
      "$value": "var(--s-border-strong)",
      "$type": "string"
    },
    "text": {
      "$value": "var(--s-text)",
      "$type": "string"
    },
    "text-muted": {
      "$value": "var(--s-text-muted)",
      "$type": "string"
    },
    "contrast": {
      "$value": "var(--s-primary-contrast, var(--s-text-inverse))",
      "$type": "string"
    },
    "hover-bg": {
      "$value": "var(--s-surface-elevated)",
      "$type": "string"
    },
    "active-bg": {
      "$value": "var(--s-surface-sunken, var(--s-surface))",
      "$type": "string"
    },
    "selected-bg": {
      "$value": "color-mix(in oklch, var(--s-primary) 12%, transparent)",
      "$type": "string"
    }
  },
  "cursor": {
    "variant": {
      "$value": "sigil",
      "$type": "string"
    },
    "size": {
      "$value": "28px",
      "$type": "string"
    },
    "dot-size": {
      "$value": "4px",
      "$type": "string"
    },
    "stroke-width": {
      "$value": "1.5px",
      "$type": "string"
    },
    "tick-size": {
      "$value": "7px",
      "$type": "string"
    },
    "gap": {
      "$value": "3px",
      "$type": "string"
    },
    "radius": {
      "$value": "var(--s-radius-full)",
      "$type": "string"
    },
    "color": {
      "$value": "var(--s-primary)",
      "$type": "string"
    },
    "ring-color": {
      "$value": "var(--s-primary)",
      "$type": "string"
    },
    "dot-color": {
      "$value": "var(--s-primary)",
      "$type": "string"
    },
    "glow": {
      "$value": "0 0 18px color-mix(in oklch, var(--s-primary) 35%, transparent)",
      "$type": "string"
    },
    "opacity": {
      "$value": "0.95",
      "$type": "string"
    },
    "blend-mode": {
      "$value": "normal",
      "$type": "string"
    },
    "z-index": {
      "$value": "2147483647",
      "$type": "string"
    },
    "hide-native": {
      "$value": true,
      "$type": "boolean"
    }
  },
  "scrollbar": {
    "width": {
      "$value": "10px",
      "$type": "string"
    },
    "height": {
      "$value": "10px",
      "$type": "string"
    },
    "padding": {
      "$value": "2px",
      "$type": "string"
    },
    "radius": {
      "$value": "var(--s-radius-full)",
      "$type": "string"
    },
    "track": {
      "$value": "transparent",
      "$type": "string"
    },
    "thumb": {
      "$value": "var(--s-border)",
      "$type": "string"
    },
    "thumb-hover": {
      "$value": "var(--s-border-strong)",
      "$type": "string"
    },
    "thumb-active": {
      "$value": "var(--s-primary)",
      "$type": "string"
    },
    "corner": {
      "$value": "transparent",
      "$type": "string"
    },
    "border": {
      "$value": "transparent",
      "$type": "string"
    },
    "firefox-width": {
      "$value": "thin",
      "$type": "string"
    },
    "gutter": {
      "$value": "auto",
      "$type": "string"
    },
    "visibility": {
      "$value": "auto",
      "$type": "string"
    }
  },
  "$extensions": {
    "com.sigil-ui": {
      "version": "1.0",
      "format": "design.md",
      "totalTokens": 519,
      "categories": 33
    }
  }
}

```
