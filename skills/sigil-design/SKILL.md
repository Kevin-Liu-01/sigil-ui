# Skill — sigil-design

> Generate, parse, and compile a unified `DESIGN.md` that serves as
> the single source of truth for a project's visual identity.
> One file. 33 categories. 519 tokens. Compiles to CSS + Tailwind v4 + W3C JSON.

## When to Use

- Creating a new design reference for a project
- Extracting a design system from an existing site
- Switching a project's entire visual identity
- Generating compiled token output (CSS, Tailwind, JSON)
- Auditing a design against the spec

## CLI Commands

```bash
sigil design generate          # Create DESIGN.md from current preset + overrides
sigil design compile           # Parse DESIGN.md → output CSS, Tailwind, JSON files
sigil design sync              # Update Compile sections in-place from token tables
sigil design extract <url>     # Extract full DESIGN.md from a reference URL
```

---

## Format Specification

### File: `DESIGN.md`

The file is a Markdown document with a strict heading hierarchy.
Every section uses GitHub-flavored pipe tables parseable by `parseDesignMarkdown()`.
The file compiles to three output formats from a single source.

---

### Header Block

```markdown
# {Brand Name} — Style Reference
> {One-line personality tagline.}

**Theme:** light | dark | adaptive
**Preset:** {preset-name} | custom
**Density:** compact | balanced | editorial

{2-4 sentence description of the brand's design language, mood, and aesthetic intent.}
```

Metadata fields are extracted by regex from bold-label lines.

---

### Section Index (required order)

| # | Heading | Sigil Category | Table Format |
|---|---------|----------------|--------------|
| 1 | `## Tokens — Colors` | `colors` | `Token \| Light \| Dark \| Role` |
| 2 | `## Tokens — Typography` | `typography` | `Token \| Value \| Role` |
| 3 | `## Tokens — Spacing` | `spacing` | `Token \| Value \| Role` |
| 4 | `## Tokens — Layout` | `layout` | `Token \| Value \| Role` |
| 5 | `## Tokens — Sigil Grid` | `sigil` | `Token \| Value \| Role` |
| 6 | `## Tokens — Radius` | `radius` | `Token \| Value \| Role` |
| 7 | `## Tokens — Shadows` | `shadows` | `Token \| Value \| Role` |
| 8 | `## Tokens — Motion` | `motion` | special (subsections) |
| 9 | `## Tokens — Borders` | `borders` | `Token \| Value \| Role` |
| 10 | `## Tokens — Backgrounds` | `backgrounds` | `Token \| Value \| Role` |
| 11 | `## Block Tokens — Buttons` | `buttons` | `Token \| Value \| Role` |
| 12 | `## Block Tokens — Cards` | `cards` | `Token \| Value \| Role` |
| 13 | `## Block Tokens — Headings` | `headings` | `Token \| Value \| Role` |
| 14 | `## Block Tokens — Navigation` | `navigation` | `Token \| Value \| Role` |
| 15 | `## Block Tokens — Inputs` | `inputs` | `Token \| Value \| Role` |
| 16 | `## Block Tokens — Code` | `code` | `Token \| Value \| Role` |
| 17 | `## Block Tokens — Hero` | `hero` | `Token \| Value \| Role` |
| 18 | `## Block Tokens — CTA` | `cta` | `Token \| Value \| Role` |
| 19 | `## Block Tokens — Footer` | `footer` | `Token \| Value \| Role` |
| 20 | `## Block Tokens — Banner` | `banner` | `Token \| Value \| Role` |
| 21 | `## Block Tokens — Sections` | `sections` | `Token \| Value \| Role` |
| 22 | `## Composition — Page Rhythm` | `pageRhythm` | `Token \| Value \| Role` |
| 23 | `## Composition — Grid & Alignment` | `alignment` | `Token \| Value \| Role` |
| 24 | `## Composition — Dividers` | `dividers` | `Token \| Value \| Role` |
| 25 | `## Composition — Grid Visuals` | `gridVisuals` | `Token \| Value \| Role` |
| 26 | `## Composition — Cursor & Scrollbar` | `cursor`, `scrollbar` | `Token \| Value \| Role` |
| 27 | `## Composition — Focus & Overlays` | `focus`, `overlays` | `Token \| Value \| Role` |
| 28 | `## Composition — Data Visualization` | `dataViz` | `Token \| Value \| Role` |
| 29 | `## Composition — Media` | `media` | `Token \| Value \| Role` |
| 30 | `## Composition — Controls` | `controls` | `Token \| Value \| Role` |
| 31 | `## Composition — Component Surfaces` | `componentSurfaces` | `Token \| Value \| Role` |
| 32 | `## Components` | — | prose (not compiled) |
| 33 | `## Surfaces` | — | `Level \| Name \| Value \| Purpose` |
| 34 | `## Do's and Don'ts` | — | prose (not compiled) |
| 35 | `## Imagery` | — | prose (not compiled) |
| 36 | `## Layout` | — | prose (not compiled) |
| 37 | `## Similar Brands` | — | prose (not compiled) |
| 38 | `## Compile — CSS` | — | fenced `css` block |
| 39 | `## Compile — Tailwind v4` | — | fenced `css` block |
| 40 | `## Compile — W3C Design Tokens` | — | fenced `json` block |

---

### Table Formats

#### Themed table (Colors)

```markdown
| Token | Light | Dark | Role |
|-------|-------|------|------|
| `background` | `oklch(0.99 0 0)` | `oklch(0.07 0.01 280)` | Page background |
```

- All colors MUST be OKLCH: `oklch(L C H)` or `oklch(L C H / A)`.
- Tokens in THEMED_KEYS get `{ light, dark }`. Others use only the Light column.

#### Static table (most sections)

```markdown
| Token | Value | Role |
|-------|-------|------|
| `font-display` | "PP Mori", system-ui, sans-serif | Display and headline typeface |
```

- Backticks on token names and values are stripped during parse.
- The Role column is documentation-only (not compiled).

#### Motion section (special)

Motion uses two subsection tables:

```markdown
## Tokens — Motion

### Durations

| Token | Value | Role |
|-------|-------|------|
| `fast` | `150ms` | Micro-interactions |

### Easings

| Token | Value | Role |
|-------|-------|------|
| `default` | `cubic-bezier(0.16, 1, 0.3, 1)` | Primary easing |

### Presets

| Token | Value | Role |
|-------|-------|------|
| `hover-scale` | `1.02` | Hover lift amount |
```

---

### Prose Sections

#### Components

Describe each component variant with its token references:

```markdown
## Components

### Primary Button
Solid `--s-primary` background, `--s-radius-button` corners, `--s-text-inverse` text.
Hover applies `--s-button-hover-effect` with `--s-duration-fast` transition.
Active scales to `--s-button-active-scale`.

### Card
`--s-surface` background, `--s-card-border-style` border at `--s-card-border-width`.
Hover triggers `--s-card-hover-effect`. Padding at `--s-card-padding`.
```

#### Do's and Don'ts

```markdown
## Do's and Don'ts

### Do
- Use OKLCH for all color values.
- Reference `var(--s-*)` tokens in all custom CSS.
- Apply `--s-duration-fast` for micro-interactions under 200ms.

### Don't
- Do not hardcode hex colors in component files.
- Do not use arbitrary Tailwind values (e.g. `text-[#ff0000]`).
- Do not bypass the spacing scale with pixel values.
```

#### Surfaces

```markdown
## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 0 | Background | `oklch(0.99 0 0)` | Base page background |
| 1 | Surface | `oklch(0.97 0 0)` | Card and panel background |
| 2 | Elevated | `oklch(0.98 0 0)` | Raised surfaces (modals, popovers) |
```

#### Similar Brands

```markdown
## Similar Brands

- **Linear** — Precision typography, subtle neutral palette, nuanced elevation.
- **Stripe** — Clean light UI, measured accent colors, professional.
```

---

### Compile Sections

These are auto-generated by `sigil design sync`. They contain the full
compiled output in fenced code blocks.

```markdown
## Compile — CSS

\```css
:root {
  --s-background: oklch(0.99 0 0);
  /* ... all 519 tokens ... */
}

[data-theme='dark'] {
  --s-background: oklch(0.07 0.01 280);
  /* ... dark overrides ... */
}
\```

## Compile — Tailwind v4

\```css
@theme {
  --color-background: var(--s-background);
  --font-display: var(--s-font-display);
  /* ... Tailwind utility mappings ... */
}
\```

## Compile — W3C Design Tokens

\```json
{
  "color": {
    "background": {
      "$value": { "light": "oklch(0.99 0 0)", "dark": "oklch(0.07 0.01 280)" },
      "$type": "color",
      "$description": "Page background"
    }
  }
}
\```
```

---

## Parsing Rules

1. **Heading match**: `findSection` uses regex `^#{1,3}\s+{heading}\s*$` (case-insensitive for DESIGN.md parser).
2. **Table extraction**: First `|`-delimited block with 3+ rows (header + separator + data).
3. **Backtick stripping**: Applied to Token and Value columns.
4. **Boolean coercion**: `"true"` / `"false"` strings become booleans.
5. **Number coercion**: Spacing scale values parsed with `parseInt`.
6. **Metadata extraction**: Bold labels (`**Key:** value`) in header block.
7. **Compile sections**: Content between ` ```css ` / ` ```json ` fences is extracted or regenerated.

## Compilation Rules

1. CSS output uses `compileToCss()` — all `--s-*` custom properties.
2. Tailwind output uses `compileToTailwind()` — `@theme` block mapping utilities to CSS vars.
3. W3C JSON output uses `compileToW3CJson()` — Design Tokens Community Group format.
4. All compile sections are regenerated from the token tables above them.
5. Manual edits to compile sections are overwritten on `sigil design sync`.

## What Makes DESIGN.md Different

| Dimension | Typical token tools | Sigil DESIGN.md |
|-----------|-------------------|-----------------|
| Token count | 20–50 | 519 |
| Categories | 3–6 | 33 |
| Color space | Hex / HSL | OKLCH (perceptual, wide-gamut) |
| Theming | Single theme | Light + Dark in one row |
| Motion | None | Durations, easings, enter/exit, stagger |
| Page composition | None | Hero, CTA, footer, banner, sections, rhythm |
| Preset system | None | 46 presets, hot-swappable |
| Compilation | Static display | Live recompile from markdown |
| Output formats | CSS only | CSS + Tailwind + W3C JSON + TypeScript |
