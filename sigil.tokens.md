# Sigil Design Tokens

> Canonical token source for Sigil UI.
> Agents and humans edit this file; `@sigil-ui/tokens` compiles it to CSS, Tailwind v4, and TypeScript.

## Colors

All color values are in OKLCH for perceptual uniformity and wide-gamut display support.


| Token                | Light Value            | Dark Value             | Description                              |
| -------------------- | ---------------------- | ---------------------- | ---------------------------------------- |
| `background`         | `oklch(0.99 0 0)`      | `oklch(0.07 0.01 280)` | Page background                          |
| `surface`            | `oklch(0.97 0 0)`      | `oklch(0.12 0.01 280)` | Card and panel background                |
| `surface-elevated`   | `oklch(0.98 0 0)`      | `oklch(0.15 0.01 280)` | Raised surfaces (modals, popovers)       |
| `primary`            | `oklch(0.65 0.15 280)` | `oklch(0.65 0.15 280)` | Soft indigo — primary actions and links  |
| `primary-hover`      | `oklch(0.60 0.18 280)` | `oklch(0.60 0.18 280)` | Hover state for primary                  |
| `primary-muted`      | `oklch(0.90 0.04 280)` | `oklch(0.90 0.04 280)` | Subtle primary backgrounds               |
| `secondary`          | `oklch(0.70 0.12 60)`  | `oklch(0.70 0.12 60)`  | Warm amber — secondary accent            |
| `text`               | `oklch(0.15 0 0)`      | `oklch(0.93 0 0)`      | Full-contrast body text                  |
| `text-secondary`     | `oklch(0.40 0 0)`      | `oklch(0.70 0 0)`      | Secondary text                           |
| `text-muted`         | `oklch(0.55 0 0)`      | `oklch(0.55 0 0)`      | Muted labels and captions                |
| `text-subtle`        | `oklch(0.70 0 0)`      | `oklch(0.40 0 0)`      | Subtle placeholders                      |
| `text-disabled`      | `oklch(0.80 0 0)`      | `oklch(0.30 0 0)`      | Disabled text                            |
| `border`             | `oklch(0.90 0 0)`      | `oklch(0.22 0 0)`      | Default border                           |
| `border-muted`       | `oklch(0.94 0 0)`      | `oklch(0.18 0 0)`      | Subtle dividers                          |
| `border-strong`      | `oklch(0.80 0 0)`      | `oklch(0.35 0 0)`      | Strong / focused borders                 |
| `border-interactive` | `oklch(0.65 0.15 280)` | `oklch(0.65 0.15 280)` | Interactive element borders              |
| `success`            | `oklch(0.65 0.17 160)` | `oklch(0.65 0.17 160)` | Success state (#10b981 equivalent)       |
| `warning`            | `oklch(0.75 0.15 85)`  | `oklch(0.75 0.15 85)`  | Warning state (#f59e0b equivalent)       |
| `error`              | `oklch(0.60 0.20 25)`  | `oklch(0.60 0.20 25)`  | Error state (#ef4444 equivalent)         |
| `info`               | `oklch(0.60 0.15 250)` | `oklch(0.60 0.15 250)` | Informational state (#3b82f6 equivalent) |


## Typography


| Token          | Value                                  | Description                   |
| -------------- | -------------------------------------- | ----------------------------- |
| `font-display` | "Nacelle", system-ui, sans-serif       | Display and headline typeface |
| `font-body`    | system-ui, -apple-system, sans-serif   | Body text typeface            |
| `font-mono`    | "Roboto Mono", ui-monospace, monospace | Code and monospace typeface   |


## Spacing

4px base for component internals, 8px for layout rhythm.


| Token      | Value | Description           |
| ---------- | ----- | --------------------- |
| `space-1`  | `4`   | Tight component gaps  |
| `space-2`  | `8`   | Default component gap |
| `space-3`  | `12`  | Small section gap     |
| `space-4`  | `16`  | Standard padding      |
| `space-6`  | `24`  | Section gap           |
| `space-8`  | `32`  | Large section gap     |
| `space-12` | `48`  | Layout section        |
| `space-16` | `64`  | Major layout break    |
| `space-20` | `80`  | Hero spacing          |
| `space-24` | `96`  | Maximum spacing       |


## Sigil Grid

Tokens specific to the sigil structural grid system.


| Token          | Value    | Description                |
| -------------- | -------- | -------------------------- |
| `grid-cell`    | `48px`   | Base grid cell dimension   |
| `cross-arm`    | `10px`   | Cross mark arm length      |
| `cross-stroke` | `1.5px`  | Cross mark stroke width    |
| `rail-gap`     | `24px`   | Inner/outer rail distance  |
| `content-max`  | `1280px` | Maximum content width      |
| `card-radius`  | `10px`   | Default card border radius |


## Radius

Editorial family (6–12px center of gravity), card radius at 10px.


| Token  | Value    | Description              |
| ------ | -------- | ------------------------ |
| `none` | `0px`    | No rounding              |
| `sm`   | `4px`    | Subtle rounding          |
| `md`   | `8px`    | Default rounding         |
| `lg`   | `12px`   | Card-level rounding      |
| `xl`   | `16px`   | Dialog-level rounding    |
| `2xl`  | `24px`   | Large container rounding |
| `full` | `9999px` | Pill shape               |


## Shadows

Layered, multi-stop shadows for depth hierarchy.


| Token | Value                                                                                                                                | Description         |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------- |
| `sm`  | 0 1px 2px 0 rgb(0 0 0 / 0.05)                                                                                                        | Subtle lift         |
| `md`  | 0 0 0 1px rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06), 0 2px 4px 0 rgb(0 0 0 / 0.04)                                         | Default card shadow |
| `lg`  | 0 0 0 1px rgb(0 0 0 / 0.04), 0 2px 4px -2px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08)                                      | Dropdown shadow     |
| `xl`  | 0 0 0 1px rgb(0 0 0 / 0.03), 0 4px 6px -4px rgb(0 0 0 / 0.06), 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 20px 25px -5px rgb(0 0 0 / 0.06) | Modal shadow        |


## Motion Durations


| Token     | Value   | Description                  |
| --------- | ------- | ---------------------------- |
| `instant` | `0ms`   | No animation                 |
| `fast`    | `150ms` | Micro-interactions, tooltips |
| `normal`  | `250ms` | Standard transitions         |
| `slow`    | `400ms` | Modal enter/exit             |
| `slower`  | `600ms` | Page-level transitions       |


## Motion Easings


| Token     | Value                             | Description                          |
| --------- | --------------------------------- | ------------------------------------ |
| `default` | cubic-bezier(0.16, 1, 0.3, 1)     | Smooth deceleration (primary easing) |
| `in`      | cubic-bezier(0.55, 0, 1, 0.45)    | Accelerating (exit motion)           |
| `out`     | cubic-bezier(0, 0.55, 0.45, 1)    | Decelerating (enter motion)          |
| `in-out`  | cubic-bezier(0.45, 0, 0.55, 1)    | Symmetric ease                       |
| `spring`  | cubic-bezier(0.34, 1.56, 0.64, 1) | Overshoot spring                     |


## Borders


| Token    | Value   | Description              |
| -------- | ------- | ------------------------ |
| `none`   | `0px`   | No border                |
| `thin`   | `1px`   | Default border width     |
| `medium` | `1.5px` | Sigil cross stroke width |
| `thick`  | `2px`   | Emphasized borders       |


## Alignment Rails

The unified grid rail system. Navbars, sections, gutters, and content all snap to the same columns. This is what makes everything align.

| Token             | Value      | Description                                              |
| ----------------- | ---------- | -------------------------------------------------------- |
| `rail-width`      | `1440px`   | Total page container width                               |
| `rail-columns`    | `12`       | Number of alignment columns                              |
| `rail-gutter`     | `24px`     | Gap between rail columns                                 |
| `rail-margin`     | `24px`     | Outer margin (both sides)                                |
| `rail-visible`    | `false`    | Show alignment guide lines (for debug/showcase)          |
| `rail-color`      | `border`   | Guide line color when visible                            |
| `content-align`   | `center`   | How main content sits in the rails                       |
| `hero-align`      | `center`   | Hero section alignment (center, left, full-bleed)        |
| `section-align`   | `center`   | Default section alignment                                |
| `navbar-align`    | `full`     | Navbar width behavior (full, content, inset)             |
| `footer-align`    | `content`  | Footer width behavior                                    |


## Sections

Per-section layout control. Every `<Section>` reads these tokens.

| Token              | Value      | Description                                          |
| ------------------ | ---------- | ---------------------------------------------------- |
| `padding-y`        | `64px`     | Vertical padding between sections                    |
| `padding-y-hero`   | `120px`    | Hero section vertical padding                        |
| `padding-x`        | `24px`     | Horizontal padding override                          |
| `max-width`        | `1200px`   | Section content max-width                            |
| `gap`              | `32px`     | Gap between section children                         |
| `title-align`      | `left`     | Section title alignment (left, center)               |
| `divider-above`    | `false`    | Show divider line before section                     |
| `divider-below`    | `true`     | Show divider line after section                      |
| `background-alt`   | `false`    | Alternate section backgrounds (surface vs background)|
| `indent`           | `0px`      | Left indent for section content                      |


## Dividers

Structural line appearance. Controls how `<Divider>` and `<HRule>` render.

| Token          | Value      | Description                                            |
| -------------- | ---------- | ------------------------------------------------------ |
| `style`        | `solid`    | Line style (solid, dashed, dotted, double, groove, none)|
| `width`        | `1px`      | Line thickness (0.5px - 3px)                           |
| `color`        | `border`   | Line color (token reference or value)                  |
| `spacing`      | `0px`      | Margin above/below the divider                         |
| `show-cross`   | `false`    | Show cross marks at intersections                      |
| `show-label`   | `false`    | Show section labels on dividers                        |
| `full-bleed`   | `false`    | Extend past content width to page edges                |
| `ornament`     | `none`     | Decorative ornament (none, cross, dot, diamond, dash)  |


## Grid Visuals

How grids look beyond layout. Controls `<SigilGrid>` appearance.

| Token             | Value       | Description                                        |
| ----------------- | ----------- | -------------------------------------------------- |
| `show-lines`      | `false`     | Render visible grid lines between cells            |
| `line-color`      | `border`    | Grid line color                                    |
| `line-width`      | `1px`       | Grid line width                                    |
| `show-dots`       | `false`     | Show dot grid at cell intersections                |
| `dot-size`        | `2px`       | Dot diameter at intersections                      |
| `cell-background` | `none`      | Cell background (none, surface, alternate)         |
| `cell-border`     | `false`     | Show borders on individual cells                   |
| `cell-radius`     | `0px`       | Border radius on grid cells                        |
| `cell-padding`    | `16px`      | Internal padding of grid cells                     |
| `hover-effect`    | `none`      | Cell hover effect (highlight, lift, border, glow, none)|


## Cards (expanded)

Full card appearance control. Every `<Card>` and `<Frame>` reads these.

| Token                  | Value       | Description                                  |
| ---------------------- | ----------- | -------------------------------------------- |
| `border-style`         | `solid`     | Card border style                            |
| `border-width`         | `1px`       | Card border width                            |
| `hover-effect`         | `border`    | Card hover (lift, glow, border, scale, none) |
| `padding`              | `24px`      | Default card padding                         |
| `background`           | `surface`   | Card background (surface, transparent, etc)  |
| `shadow`               | `none`      | Card shadow level (none, sm, md, lg)         |
| `outline`              | `true`      | Whether to show border at all                |
| `outline-on-hover-only`| `false`     | Border only appears on hover                 |
| `gap-between`          | `16px`      | Gap between stacked cards                    |
| `aspect-ratio`         | `auto`      | Card aspect ratio constraint                 |
