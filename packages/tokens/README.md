# @sigil-ui/tokens

The design token system that powers Sigil UI. This is the single source of truth — edit tokens here, and every component updates.

## The Core Principle

**Do not edit components to change how things look.** Edit the token spec instead.

```
Traditional:  open Button.tsx → find the Tailwind class → change bg-blue-500 to bg-indigo-600 → repeat for every component
Sigil:        change --s-primary → every component that uses primary updates instantly
```

Agents and humans should treat `@sigil-ui/tokens` as the control layer. Components are downstream consumers.

## Installation

```bash
pnpm add @sigil-ui/tokens
```

## What This Package Contains

### Token Types (`types.ts`)

The complete TypeScript type system for 519 design tokens across 33 categories:

| Category | Required Fields | Optional Fields | Total |
|----------|----------------|-----------------|-------|
| `colors` | 18 | 18 | 36 |
| `typography` | 3 | 28 | 31 |
| `spacing` | 2 | 23 | 25 |
| `layout` | — (optional category) | 22 | 22 |
| `sigil` (grid) | 5 | 5 | 10 |
| `radius` | 7 | 9 | 16 |
| `shadows` | 4 | 10 | 14 |
| `motion` | 10 | 9 | 19 |
| `borders` | 4 | 7 | 11 |
| `buttons` | — (optional category) | 9 | 9 |
| `cards` | — (optional category) | 18 | 18 |
| `headings` | — (optional category) | 15 | 15 |
| `navigation` | — (optional category) | 24 | 24 |
| `backgrounds` | — (optional category) | 9 | 9 |
| `code` | — (optional category) | 14 | 14 |
| `inputs` | — (optional category) | 13 | 13 |
| `cursor` | — (optional category) | 15 | 15 |
| `scrollbar` | — (optional category) | 13 | 13 |
| `alignment` | — (optional category) | 13 | 13 |
| `sections` | — (optional category) | 25 | 25 |
| `dividers` | — (optional category) | 15 | 15 |
| `gridVisuals` | — (optional category) | 10 | 10 |
| `focus` | — (optional category) | 5 | 5 |
| `overlays` | — (optional category) | 8 | 8 |
| `dataViz` | — (optional category) | 13 | 13 |
| `media` | — (optional category) | 6 | 6 |
| `controls` | — (optional category) | 11 | 11 |
| `componentSurfaces` | — (optional category) | 12 | 12 |
| `hero` | — (optional category) | 25 | 25 |
| `cta` | — (optional category) | 15 | 15 |
| `footer` | — (optional category) | 15 | 15 |
| `banner` | — (optional category) | 12 | 12 |
| `pageRhythm` | — (optional category) | 14 | 14 |

### Default Values (`tokens.ts`)

Sane defaults for every required token. These are what you get before applying a preset.

### Preset Utilities (`presets.ts`)

- `createPreset(name, tokens, metadata)` — build a preset from scratch
- `mergePresets(base, overrides, name?, metadata?)` — derive a new preset by deep-merging partial overrides onto a base

### Token Compiler (`compile.ts`)

Four compile targets from the same `SigilTokens` object:

| Target | API | Output |
|--------|-----|--------|
| CSS | `compileToCss(tokens, options?)` | `:root { --s-primary: ...; }` with light/dark selectors |
| Tailwind | `compileToTailwind(tokens)` | `@theme { --color-primary: var(--s-primary); }` |
| TypeScript | `compileToTs(tokens)` | `export const tokens: SigilTokens = { ... }` |
| JSON | `compileToJson(tokens)` | JSON file for tooling |

`compileInteractionCss(options?)` emits opt-in native helpers for `sigil-scrollbar`, `data-sigil-scrollbar`, and `data-sigil-cursor`.

### Markdown Parser (`compile.ts`)

`parseMarkdownTokens(markdown)` — reads `sigil.tokens.md` back into `MarkdownTokenOverrides` for the core markdown-editable groups (`colors`, `typography`, `spacing`, `sigil`, `radius`, `shadows`, `motion`, `borders`). Full presets use typed `SigilTokens`; markdown is the agent-friendly override surface that can be merged with defaults before compiling CSS or Tailwind.

## CSS Compiler Options

```typescript
compileToCss(tokens, {
  prefix: "s",                        // CSS variable prefix: --s-primary
  includeLight: true,                 // Emit light mode variables
  includeDark: true,                  // Emit dark mode variables
  selector: ":root",                  // Base CSS selector
  darkSelector: "[data-theme='dark']", // Dark mode selector
});
```

## Three-Layer Architecture

```
Primitive   → raw values, no meaning        oklch(0.65 0.15 280), 4px, "Nacelle"
Semantic    → named purpose                 --s-primary, --s-surface, --s-duration-fast
Component   → scoped to one component       --s-card-radius, --s-grid-cell (use sparingly)
```

## Color Rules

All colors use OKLCH: `oklch(L C H)` where:
- **L** (0–1): lightness. 0 = black, 1 = white.
- **C** (0–0.37): chroma/saturation. 0 = gray.
- **H** (0–360): hue. 0=red, 60=yellow, 150=green, 250=blue, 310=pink.

**Themed tokens** have separate `{ light, dark }` values (backgrounds, surfaces, text, borders).
**Unthemed tokens** are a single value used in both modes (primary, secondary, status colors).

## For AI Agents

When an agent needs to change how a Sigil project looks:

1. **Read the active preset** — understand the current mood, fonts, and colors
2. **Edit `sigil.tokens.md`** for core overrides or the token CSS file — change values at the semantic level
3. **Never edit component files to change colors/spacing/fonts** — components read from CSS variables
4. **Use OKLCH for all colors** — no hex, no rgb, no hsl
5. **Run `npx @sigil-ui/cli doctor`** after changes to validate

The token system is designed so that a single edit propagates everywhere. An agent changing `--s-primary` from indigo to emerald updates buttons, links, focus rings, gradients, glows, and badges — without touching any component file.

## Exports

```typescript
import { defaultTokens, SigilTokens, SigilPreset, MarkdownTokenOverrides } from "@sigil-ui/tokens";
import { compileToCss, compileToTailwind, compileToTs, compileToJson, parseMarkdownTokens } from "@sigil-ui/tokens";
import { createPreset, mergePresets, sigilPreset } from "@sigil-ui/tokens";
```

```css
/* CSS variables */
@import "@sigil-ui/tokens/css";

/* Tailwind v4 @theme */
@import "@sigil-ui/tokens/tailwind";
```
