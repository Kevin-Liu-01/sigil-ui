# @sigil-ui/presets

31 curated design system presets for Sigil UI. Each preset controls **everything** about a project's visual identity — colors, fonts, spacing, radius, shadows, motion, buttons, cards, headings, navigation, backgrounds, and code blocks — through a single `SigilPreset` object.

## The Core Principle

**Swap the preset, swap the entire aesthetic.** Every component downstream reads from the preset's tokens. An agent should never manually restyle components when it can switch or edit a preset instead.

```
Wrong:  open Card.tsx → change rounded-lg to rounded-none → open Button.tsx → change bg-indigo to bg-yellow → repeat
Right:  sigil preset brutalist   (every component updates to brutalist aesthetic)
Right:  edit the preset's tokens.radius.md from "8px" to "0px"   (every rounded corner goes sharp)
```

## Installation

```bash
pnpm add @sigil-ui/presets
```

## 31 Presets in 6 Categories

### Structural / Precision
| Preset | Mood | Display Font | Hue |
|--------|------|-------------|-----|
| `sigil` | precise, engineered | Nacelle | Indigo |
| `kova` | forged, disciplined | Inter | Teal |
| `cobalt` | metallic, chemical | Inter | Cobalt |
| `helix` | biological, organic-tech | Inter | Teal |
| `hex` | geometric, hexagonal | Space Grotesk | Amber |

### Minimal / Clean
| Preset | Mood | Display Font | Hue |
|--------|------|-------------|-----|
| `crux` | minimal, decisive | Nacelle | Neutral |
| `axiom` | mathematical, pure | Inter | Blue |
| `arc` | flowing, curved | Satoshi | Sky |
| `mono` | monochrome, terminal | Space Mono | Neutral |

### Dark / Cinematic
| Preset | Mood | Display Font | Hue |
|--------|------|-------------|-----|
| `basalt` | volcanic, grounded | Inter | Slate |
| `onyx` | obsidian, premium | GT America | Purple |
| `fang` | fierce, aggressive | Space Grotesk | Red |
| `obsid` | volcanic, reflective | GT America | Slate |
| `cipher` | encrypted, mysterious | Space Grotesk | Green |
| `noir` | cinematic, dramatic | GT America | Amber |

### Colorful / Expressive
| Preset | Mood | Display Font | Hue |
|--------|------|-------------|-----|
| `flux` | dynamic, energetic | Satoshi | Blue-Purple |
| `shard` | crystalline, sharp | Satoshi | Cyan |
| `prism` | spectral, joyful | Satoshi | Rainbow |
| `vex` | complex, intricate | Satoshi | Fuchsia |
| `dsgn` | creative, tool-like | Inter | Purple |
| `dusk` | twilight, warm-cool | Satoshi | Rose-Violet |

### Editorial / Typographic
| Preset | Mood | Display Font | Hue |
|--------|------|-------------|-----|
| `etch` | etched, engraved | Söhne | Emerald |
| `rune` | mystical, arcane | Fraunces | Violet |
| `strata` | layered, geological | Söhne | Amber |
| `glyph` | typographic, symbolic | Söhne | Indigo |
| `mrkr` | sketched, raw | Fraunces | Black |

### Industrial / Technical
| Preset | Mood | Display Font | Hue |
|--------|------|-------------|-----|
| `alloy` | metallic, fused | Space Grotesk | Copper |
| `forge` | molten, industrial | Space Grotesk | Orange |
| `anvil` | heavy, foundational | Space Grotesk | Iron |
| `rivet` | mechanical, utilitarian | Inter | Amber |
| `brass` | warm, vintage | Fraunces | Gold |

## Usage

### Import a preset directly

```typescript
import { sigilPreset } from "@sigil-ui/presets/sigil";
import { noirPreset } from "@sigil-ui/presets/noir";
```

### Lazy-load from the preset map

```typescript
import { presets } from "@sigil-ui/presets";

const preset = await presets.noir();
```

### Import the catalog (lightweight metadata, no token objects)

```typescript
import { presetCatalog, getCatalogEntry } from "@sigil-ui/presets/catalog";

const noir = getCatalogEntry("noir");
// { name: "noir", label: "Noir", description: "Film noir...", category: "dark", mood: "cinematic, dramatic", ... }
```

## Preset Structure

Every preset is a `SigilPreset` containing up to 259 tokens:

```typescript
type SigilPreset = {
  name: string;
  tokens: {
    colors: { ... },        // 35 tokens: backgrounds, surfaces, text, borders, brand, status
    typography: { ... },     // 31 tokens: font stacks, sizes, weights, leading, tracking
    spacing: { ... },        // 25 tokens: scale, component-specific padding
    layout: { ... },         // 22 tokens: content widths, gutters, grid, bento, sidebar
    sigil: { ... },          // 5 tokens: structural-visibility grid
    radius: { ... },         // 16 tokens: scale + per-component radius
    shadows: { ... },        // 14 tokens: scale + glow, colored, component-specific
    motion: { ... },         // 18 tokens: durations, easings, interaction presets
    borders: { ... },        // 11 tokens: widths, styles, component-specific
    buttons: { ... },        // 9 tokens: weight, transform, hover effect, active scale
    cards: { ... },          // 10 tokens: border style, hover effect, padding, title/desc
    headings: { ... },       // 15 tokens: h1-h4 + display sizes/weights/tracking
    navigation: { ... },     // 12 tokens: navbar, sidebar, breadcrumb, pagination
    backgrounds: { ... },    // 9 tokens: patterns, noise, gradients, hero, dividers
    code: { ... },           // 14 tokens: font, colors, padding, syntax highlighting
    inputs: { ... },         // 13 tokens: heights, focus ring, placeholder, labels
  },
  metadata: {
    description: string,
    author?: string,
    version?: string,
    tags?: string[],
    mood?: string,
    inspiration?: string,
  },
};
```

## Deriving a Custom Preset

Use `mergePresets` from `@sigil-ui/tokens` to override specific values without rewriting everything:

```typescript
import { mergePresets } from "@sigil-ui/tokens";
import { sigilPreset } from "@sigil-ui/presets/sigil";

const myPreset = mergePresets(sigilPreset, {
  colors: {
    primary: "oklch(0.60 0.20 150)",        // Change primary to emerald
    "primary-hover": "oklch(0.55 0.22 150)",
  },
  typography: {
    "font-display": "'Geist', system-ui, sans-serif",
  },
  radius: {
    md: "12px",  // Rounder
    lg: "16px",
  },
}, "my-brand");
```

## For AI Agents

When building UI in a Sigil project:

1. **Check the active preset first** — read `sigil.config.ts` for the preset name, then understand its mood and aesthetic
2. **To change the look, edit the preset or token CSS** — do not add Tailwind utility overrides to components
3. **To change the entire aesthetic, switch presets** — `npx sigil preset <name>`
4. **To make targeted changes, use CSS variable overrides** in the token CSS file:
   ```css
   :root { --sigil-primary: oklch(0.65 0.18 150); }
   ```
5. **To create a new aesthetic from scratch**, scaffold a custom preset: `npx sigil preset create`
6. **Never hardcode colors** — use `var(--sigil-*)` in all styling
