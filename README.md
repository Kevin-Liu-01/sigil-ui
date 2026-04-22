# Sigil UI

> Change the tokens. Everything updates.

An opinionated design language and token-driven component system. 70+ components. 31 presets. One markdown file controls your entire visual identity. Built for AI agents — because they're building the UI whether we like it or not.

**[Read the Manifesto →](MANIFESTO.md)**

## Why Sigil?

Every AI-coded site looks the same — and it's because design systems give agents components without opinions. Sigil is different: visual identity is a first-class primitive, encoded in a structured token spec that agents can read, reason about, and modify. The agent doesn't need taste. The preset has taste.

```
shadcn:   copy components → manually edit each one → drift → everything looks the same
Sigil:    install preset → all components inherit → agent edits token doc → distinct visual identity
```

**The core innovation:** a single `sigil.tokens.md` file that an AI agent can read and edit. 259 configurable tokens across 16 categories. All components consume tokens from this file. Swap presets, and every component updates — not a theme toggle, a different design language.

## Quick Start

### New project

```bash
npx create-sigil-app
```

Interactive bootstrapper that walks you through:
1. **Template** — AI SaaS, docs, dashboard, portfolio, ecommerce, blog, agency, startup, or minimal
2. **Preset** — Browse 31 curated presets organized by category
3. **Fonts** — Customize display, body, and mono fonts
4. **Features** — GSAP, Motion, Radix primitives, Sigil Grid
5. **Agent instructions** — Generate `.sigil/AGENTS.md` for AI coding agents

Creates a Next.js app with Sigil pre-configured, dependencies installed, git initialized.

### Existing project

```bash
npx sigil init
```

Rich interactive questionnaire that:
- Detects your framework (Next.js, Remix, Vite, Astro), package manager, TypeScript, and Tailwind
- Asks what you're building (SaaS, marketing, docs, blog, portfolio, etc.)
- Recommends presets based on your project type
- Lets you customize fonts and primary color
- Selects features and starter components
- Generates AI agent instructions

```bash
npx sigil add button card input dialog
```

Copy components into your project. They automatically consume your tokens.

```bash
npx sigil preset noir
```

Swap your entire visual identity in one command.

## Packages

| Package | Description |
|---------|-------------|
| `@sigil-ui/tokens` | Design token system — the core differentiator |
| `@sigil-ui/components` | 70+ styled components consuming tokens |
| `@sigil-ui/primitives` | Headless behavior layer (Radix-based) |
| `@sigil-ui/presets` | 31 curated preset bundles |
| `@sigil-ui/cli` | CLI for init, add, preset management |
| `create-sigil-app` | Project bootstrapper |

## Presets (31)

Organized into 6 categories:

### Structural / Precision
| Preset | Vibe | Display Font | Primary Hue |
|--------|------|-------------|-------------|
| **sigil** | Cross marks, grid lines, engineered | Nacelle | Indigo |
| **kova** | Hard-forged clarity, disciplined | Inter | Teal |
| **cobalt** | Blue metallic, chemical precision | Inter | Cobalt |
| **helix** | DNA spiral, biological precision | Inter | Teal |
| **hex** | Hexagonal grid, geometric | Space Grotesk | Amber |

### Minimal / Clean
| Preset | Vibe | Display Font | Primary Hue |
|--------|------|-------------|-------------|
| **crux** | Maximum whitespace, decisive | Nacelle | Neutral |
| **axiom** | Mathematical purity | Inter | Blue |
| **arc** | Smooth arcs, flowing forms | Satoshi | Sky |
| **mono** | Terminal aesthetic, zero decoration | Space Mono | Neutral |

### Dark / Cinematic
| Preset | Vibe | Display Font | Primary Hue |
|--------|------|-------------|-------------|
| **basalt** | Volcanic dark stone | Inter | Slate |
| **onyx** | Ultra-dark premium | GT America | Purple |
| **fang** | Aggressive contrast, fierce | Space Grotesk | Red |
| **obsid** | Volcanic glass, mirror-dark | GT America | Slate |
| **cipher** | Encrypted aesthetic, crypto-noir | Space Grotesk | Green |
| **noir** | Film noir, warm amber highlights | GT America | Amber |

### Colorful / Expressive
| Preset | Vibe | Display Font | Primary Hue |
|--------|------|-------------|-------------|
| **flux** | Dynamic gradients, energetic | Satoshi | Blue-Purple |
| **shard** | Crystalline fragments | Satoshi | Cyan |
| **prism** | Rainbow celebration, playful | Satoshi | Rainbow |
| **vex** | Puzzle-like, intricate | Satoshi | Fuchsia |
| **dsgn** | Design tool, Figma-inspired | Inter | Purple |
| **dusk** | Twilight, warm-to-cool sunset | Satoshi | Rose-Violet |

### Editorial / Typographic
| Preset | Vibe | Display Font | Primary Hue |
|--------|------|-------------|-------------|
| **etch** | Acid-etched, engraved | Söhne | Emerald |
| **rune** | Mystical marks, arcane | Fraunces | Violet |
| **strata** | Geological layers, earthy | Söhne | Amber |
| **glyph** | Letterform-focused | Söhne | Indigo |
| **mrkr** | Hand-drawn, sketch aesthetic | Fraunces | Black |

### Industrial / Technical
| Preset | Vibe | Display Font | Primary Hue |
|--------|------|-------------|-------------|
| **alloy** | Fused metals, warm steel | Space Grotesk | Copper |
| **forge** | Molten heat, industrial craft | Space Grotesk | Orange |
| **anvil** | Heavy, weighty foundations | Space Grotesk | Iron |
| **rivet** | Mechanical, utilitarian | Inter | Amber |
| **brass** | Vintage instrument, patina | Fraunces | Gold |

## CLI Commands

```bash
sigil init              # Interactive setup questionnaire
sigil add <components>  # Add components to your project
sigil add --all         # Add all available components
sigil preset            # Show current preset info
sigil preset list       # Browse all 31 presets by category
sigil preset <name>     # Switch to a different preset
sigil preset create     # Scaffold a custom preset file
sigil diff              # Show token changes since last sync
sigil doctor            # Validate project health
```

## Components

### Layout
Stack, Grid, Section, Frame, PageGrid, Margin, Gutter, Divider, HRule

### UI
Button, Badge, Card, Label, Input, Textarea, Select, Checkbox, Switch, Slider, Progress, Separator, Avatar, Skeleton, Table, Tabs, Accordion, Tooltip, ScrollArea, KPI, Terminal, CodeBlock, LoadingSpinner

### Navigation
Navbar, Footer, Breadcrumb, Pagination

### Overlays
Dialog, Sheet, Popover, Toast

### Shapes
Shape, Diamond, Hexagon, Triangle, Diagonal

### 3D
Box3D, Box3DGrid, Card3D, FloatingUI, IsometricView

### Diagrams
Diagram, ExplodedView, FlowDiagram, Timeline, ComparisonTable, ArchitectureDiagram

### Marketing
Hero, FeatureFrame, Pricing, CTA, LogoBar, TestimonialCard

### Patterns
Pattern (dots, hatch, diagonal, diamond, hexagon, triangle, crosshatch), Cross

## Agent-Friendly

Sigil is designed for AI agents to work with:

- **`sigil.tokens.md`** — A markdown file agents can read and edit
- **`AGENTS.md`** — Comprehensive agent instructions at repo root
- **`.sigil/AGENTS.md`** — Project-specific agent instructions (generated by `sigil init`)
- **Agent skills** — Pre-built skills for Cursor, Claude Code, and Codex
- **`npx sigil docs <component>`** — Component docs as markdown

When you run `sigil init`, it generates `.sigil/AGENTS.md` with project-specific instructions telling AI agents:
- Which preset is active and its mood/aesthetic
- Where components and tokens live
- Which features are enabled
- Token naming conventions and rules
- Available CLI commands

## Tech Stack

- React 18/19
- Tailwind CSS v4 with `@theme` integration
- OKLCH color values
- GSAP + ScrollTrigger for animation
- Motion (Framer Motion) for interactions
- Radix primitives for accessible behavior
- Pretext for text animation

## License

MIT
