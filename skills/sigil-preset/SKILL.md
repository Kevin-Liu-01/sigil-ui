---
name: sigil-preset
trigger: when creating, modifying, or selecting a Sigil UI preset
---

# Sigil Preset

> Create and modify complete token presets that define the visual identity of a Sigil-powered project.

## When to Use

- User asks to create a custom preset
- User asks to modify an existing preset in `packages/presets/`
- User says "create a preset", "new theme", "custom preset"
- User wants to adjust colors, typography, or spacing for a preset
- User asks which preset to use for a specific aesthetic

## How to Use

### 1. Understand preset structure

A preset is a `SigilPreset` object defined in `packages/presets/src/`. It contains every token category:

```ts
import type { SigilPreset } from "@sigil-ui/tokens";

export const myPreset: SigilPreset = {
  name: "my-preset",
  tokens: {
    colors: { /* ColorTokens */ },
    typography: { /* TypographyTokens */ },
    spacing: { /* SpacingTokens */ },
    sigil: { /* SigilGridTokens */ },
    radius: { /* RadiusTokens */ },
    shadows: { /* ShadowTokens */ },
    motion: { /* MotionTokens */ },
    borders: { /* BorderTokens */ },
  },
  metadata: {
    description: "Short description of this preset's aesthetic",
    author: "author-name",
    version: "0.1.0",
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

### 3. Creating a new preset

1. Create `packages/presets/src/<name>.ts` — export a `SigilPreset` object.
2. Add to barrel: `packages/presets/src/index.ts`.
3. Add entry to `packages/presets/tsup.config.ts`.
4. Add export map entry to `packages/presets/package.json`.
5. Register the preset name in `packages/cli/src/commands/init.ts` (PRESET_CHOICES) and `packages/cli/src/commands/preset.ts` (BUILTIN_PRESETS).

### 4. User-created presets (via CLI)

Users can run `sigil preset create` to scaffold a `sigil.preset.<name>.ts` file in their project root. This file is a standalone preset that overrides all tokens. It does not require changes to the presets package.

## Rules

1. **All token categories required** — a preset must define every field in `SigilTokens`. No partial presets.
2. **All colors in OKLCH** — use `oklch(L C H)` format exclusively. No hex, rgb, or hsl.
3. **Themed colors** — `background`, `surface`, `surface-elevated`, all `text-*`, and all `border-*` tokens must provide both `light` and `dark` values.
4. **Unthemed colors** — `primary`, `secondary`, `success`, `warning`, `error`, `info` are single values shared across themes.
5. **Font stacks** — always include system fallbacks (e.g., `"Satoshi", system-ui, sans-serif`).
6. **Spacing scale** — must be a 10-element array of ascending numbers, unit is always `"px"`.
7. **Radius consistency** — values should form a smooth progression (sm < md < lg < xl < 2xl). Exception: brutalist may use 0px for all.
8. **Shadow layering** — use multi-layer shadows for md/lg/xl to create realistic depth. sm can be a single layer.
9. **Motion coherence** — faster presets (brutalist) should have shorter durations, softer presets should be slower.
10. **Metadata required** — `description`, `author`, and `version` must be set.

## Examples

### Deriving a preset from an existing one

To create a variation, spread the base tokens and override what you need:

```ts
import { sigilPreset } from "./sigil.js";
import type { SigilPreset } from "@sigil-ui/tokens";

export const warmPreset: SigilPreset = {
  name: "warm",
  tokens: {
    ...sigilPreset.tokens,
    colors: {
      ...sigilPreset.tokens.colors,
      primary: "oklch(0.65 0.16 35)",
      "primary-hover": "oklch(0.60 0.19 35)",
      secondary: "oklch(0.70 0.14 150)",
    },
    typography: {
      "font-display": '"Fraunces", Georgia, serif',
      "font-body": '"Source Serif 4", Georgia, serif',
      "font-mono": '"Fira Code", ui-monospace, monospace',
    },
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
