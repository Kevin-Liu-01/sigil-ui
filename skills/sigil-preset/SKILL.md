---
name: sigil-preset
trigger: when creating, modifying, or selecting a Sigil UI preset
---

# Sigil Preset

> Create and modify complete token presets that define the visual identity of a Sigil-powered project.

## The #1 Rule: Full Token Coverage

**Every custom preset MUST populate ALL 28 token categories and ALL fields.**

The canonical template is `packages/presets/src/_template.ts`. It contains every
field from `SigilTokens` with sensible defaults. When creating a custom preset:

1. **Start from the template** — copy `_template.ts`, rename, change values.
2. **Never delete fields** — change values, don't remove keys.
3. **No partial presets** — if a field exists in `_template.ts`, it must exist in your preset.

The 33 required categories (all must be present):

| # | Category | Fields | Required |
|---|----------|--------|----------|
| 1 | `colors` | 36 | yes (type-required) |
| 2 | `typography` | 31 | yes (type-required) |
| 3 | `spacing` | 25 | yes (type-required) |
| 4 | `layout` | 22 | **yes (template-required)** |
| 5 | `sigil` | 10 | yes (type-required) |
| 6 | `radius` | 16 | yes (type-required) |
| 7 | `shadows` | 14 | yes (type-required) |
| 8 | `motion` | 19 | yes (type-required) |
| 9 | `borders` | 11 | yes (type-required) |
| 10 | `buttons` | 9 | **yes (template-required)** |
| 11 | `cards` | 18 | **yes (template-required)** |
| 12 | `headings` | 15 | **yes (template-required)** |
| 13 | `navigation` | 24 | **yes (template-required)** |
| 14 | `backgrounds` | 9 | **yes (template-required)** |
| 15 | `code` | 14 | **yes (template-required)** |
| 16 | `inputs` | 13 | **yes (template-required)** |
| 17 | `cursor` | 15 | **yes (template-required)** |
| 18 | `scrollbar` | 13 | **yes (template-required)** |
| 19 | `alignment` | 13 | **yes (template-required)** |
| 20 | `sections` | 25 | **yes (template-required)** |
| 21 | `dividers` | 15 | **yes (template-required)** |
| 22 | `gridVisuals` | 10 | **yes (template-required)** |
| 23 | `focus` | 5 | **yes (template-required)** |
| 24 | `overlays` | 8 | **yes (template-required)** |
| 25 | `dataViz` | 13 | **yes (template-required)** |
| 26 | `media` | 6 | **yes (template-required)** |
| 27 | `controls` | 11 | **yes (template-required)** |
| 28 | `componentSurfaces` | 12 | **yes (template-required)** |
| 29 | `hero` | 25 | **yes (template-required)** |
| 30 | `cta` | 15 | **yes (template-required)** |
| 31 | `footer` | 15 | **yes (template-required)** |
| 32 | `banner` | 12 | **yes (template-required)** |
| 33 | `pageRhythm` | 14 | **yes (template-required)** |

## When to Use

- User asks to create a custom preset
- User asks to modify an existing preset in `packages/presets/`
- User says "create a preset", "new theme", "custom preset"
- User wants to adjust colors, typography, or spacing for a preset
- User asks which preset to use for a specific aesthetic

## How to Use

### 1. Start from the template

**Always** start from `packages/presets/src/_template.ts`. Read it first:

```bash
cat packages/presets/src/_template.ts
```

Then copy and customize:

```ts
import type { SigilPreset } from "@sigil-ui/tokens";

export const myPreset: SigilPreset = {
  name: "my-preset",
  metadata: {
    description: "Short description of this preset's aesthetic",
    author: "author-name",
    version: "0.1.0",
    tags: ["category", "mood"],
    mood: "the vibe in 2-3 words",
  },
  tokens: {
    // ALL 33 categories from _template.ts — change values, never delete fields
    colors: { /* all 35 fields */ },
    typography: { /* all 31 fields */ },
    spacing: { /* all 25 fields */ },
    layout: { /* all 22 fields */ },
    sigil: { /* all 10 fields */ },
    radius: { /* all 16 fields */ },
    shadows: { /* all 14 fields */ },
    motion: { /* all 18 fields */ },
    borders: { /* all 11 fields */ },
    buttons: { /* all 9 fields */ },
    cards: { /* all 18 fields */ },
    headings: { /* all 15 fields */ },
    navigation: { /* all 12 fields */ },
    backgrounds: { /* all 9 fields */ },
    code: { /* all 14 fields */ },
    inputs: { /* all 13 fields */ },
    cursor: { /* all 14 fields */ },
    scrollbar: { /* all 13 fields */ },
    alignment: { /* all 13 fields */ },
    sections: { /* all 10 fields */ },
    dividers: { /* all 8 fields */ },
    gridVisuals: { /* all 10 fields */ },
    focus: { /* all 5 fields */ },
    overlays: { /* all 8 fields */ },
    dataViz: { /* all 13 fields */ },
    media: { /* all 6 fields */ },
    controls: { /* all 11 fields */ },
    componentSurfaces: { /* all 12 fields */ },
  },
};
```

### 2. Built-in presets

| Preset       | Aesthetic                 | Display Font    | Body Font    | Mono Font       | Primary Hue | Radius  |
|-------------|--------------------------|-----------------|--------------|-----------------|-------------|---------|
| `sigil`   | Structural-visibility    | Nacelle         | system-ui    | Roboto Mono     | 280 (indigo)| 6–12px  |
| `midnight`  | Dark premium SaaS        | GT America      | system-ui    | JetBrains Mono  | 250 (blue)  | 4–12px  |
| `editorial` | Paper-like docs          | Söhne           | Charter      | IBM Plex Mono   | 260 (cobalt)| 3–8px   |
| `brutalist` | Neo-brutalist            | Space Grotesk   | Space Grotesk| Space Mono      | 105 (yellow)| 0px     |
| `soft`      | Warm consumer-friendly   | Satoshi         | Inter        | Fira Code       | 310 (pink)  | 8–20px  |

### 3. Creating a new preset (in-repo)

1. Copy `packages/presets/src/_template.ts` → `packages/presets/src/<name>.ts`.
2. Rename the export and `name` field.
3. Change token values — **never delete fields**.
4. Add to barrel: `packages/presets/src/index.ts`.
5. Add entry to `packages/presets/tsup.config.ts`.
6. Add export map entry to `packages/presets/package.json`.
7. Register in `packages/cli/src/commands/init.ts` and `packages/cli/src/commands/preset.ts`.

### 4. User-created presets (via CLI)

Users can run `sigil preset create` to scaffold a `sigil.preset.<name>.ts` file in
their project root. The CLI generates from the template with all 33 categories.

## Rules

1. **All 28 token categories required** — a preset must define every field from `_template.ts`. No partial presets. No missing categories. This is the most important rule.
2. **All colors in OKLCH** — use `oklch(L C H)` format exclusively. No hex, rgb, or hsl.
3. **Themed colors** — `background`, `surface`, `surface-elevated`, all `text-*`, and all `border-*` tokens must provide both `light` and `dark` values.
4. **Unthemed colors** — `primary`, `secondary`, `success`, `warning`, `error`, `info` are single values shared across themes.
5. **Font stacks** — always include system fallbacks (e.g., `"Satoshi", system-ui, sans-serif`).
6. **Spacing scale** — must be a 10-element array of ascending numbers, unit is always `"px"`.
7. **Radius consistency** — values should form a smooth progression (sm < md < lg < xl < 2xl). Exception: brutalist may use 0px for all.
8. **Shadow layering** — use multi-layer shadows for md/lg/xl to create realistic depth. sm can be a single layer.
9. **Motion coherence** — faster presets (brutalist) should have shorter durations, softer presets should be slower.
10. **Metadata required** — `description`, `author`, and `version` must be set.

## Validation Checklist

Before considering a custom preset complete, verify:

- [ ] All 28 token categories present
- [ ] No fields from `_template.ts` are missing
- [ ] All authored colors use OKLCH
- [ ] Themed colors have both `light` and `dark`
- [ ] Spacing scale has exactly 10 ascending values
- [ ] Radius values form a smooth progression
- [ ] Font stacks include system fallbacks
- [ ] Metadata has description, author, version

## Examples

### Deriving a preset from the template

Copy the template, then change the values that define your aesthetic:

```ts
import { _templatePreset } from "./_template.js";
import type { SigilPreset } from "@sigil-ui/tokens";

export const warmPreset: SigilPreset = {
  name: "warm",
  tokens: {
    ..._templatePreset.tokens,
    colors: {
      ..._templatePreset.tokens.colors,
      primary: "oklch(0.65 0.16 35)",
      "primary-hover": "oklch(0.60 0.19 35)",
      secondary: "oklch(0.70 0.14 150)",
    },
    typography: {
      ..._templatePreset.tokens.typography,
      "font-display": '"Fraunces", Georgia, serif',
      "font-body": '"Source Serif 4", Georgia, serif',
      "font-mono": '"Fira Code", ui-monospace, monospace',
    },
    // All other categories inherited from _templatePreset.tokens
  },
  metadata: {
    description: "Warm variant — terracotta primary, serif typography",
    author: "you",
    version: "0.1.0",
  },
};
```

### Choosing OKLCH values

Use this mental model:
- **L** (lightness): 0 = black, 1 = white. Primary colors: 0.50–0.70. Backgrounds: 0.95–0.99 (light), 0.05–0.12 (dark).
- **C** (chroma): 0 = gray, 0.20+ = vivid. Body text: 0. Accent colors: 0.12–0.20.
- **H** (hue): 0 = red, 60 = yellow, 150 = green, 250 = blue, 310 = pink.
