<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset=".github/logo-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset=".github/logo-light.svg">
    <img alt="Sigil UI" src=".github/logo-light.svg" width="80">
  </picture>
</p>

<h1 align="center">Sigil UI</h1>

<p align="center">
  <strong>Change the tokens. Everything updates.</strong>
</p>

<p align="center">
  A token-driven design system where visual identity is a first-class primitive.<br>
  150+ components. 34 presets. 259 configurable tokens.<br>
  One file controls your entire visual identity — and AI agents can read, reason about, and modify it.
</p>

<p align="center">
  <a href="MANIFESTO.md"><strong>Read the Manifesto →</strong></a>
</p>

---

## The Problem

Every AI-coded site looks the same. Agents copy components, apply defaults, produce the median. Design systems give agents *components* without *opinions*. The result: a thousand sites that all feel like "AI-generated startup template #4."

```
The status quo                              Sigil
─────────────                               ─────
copy components                             install preset
  ↓                                           ↓
manually edit each one                      all 150+ components inherit identity
  ↓                                           ↓
drift, inconsistency                        agent edits ONE token file
  ↓                                           ↓
everything looks the same                   distinct visual identity
```

**The core innovation:** a single `sigil.tokens.md` file that both humans and AI agents can read and edit. 259 tokens across 20 categories. Every component reads from this file. Swap presets, and every component updates — not a theme toggle, a different *design language*.

---

## How It Works

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   sigil.tokens.md              Human or AI agent edits this file    │
│   (markdown)                   259 tokens, 20 categories            │
│                                                                     │
│         │  parseMarkdownTokens()                                    │
│         ▼                                                           │
│                                                                     │
│   SigilTokens                  TypeScript object with full types    │
│   (typed object)               Validated, exhaustive, composable    │
│                                                                     │
│         │  compileToCss() / compileToTailwind()                     │
│         ▼                                                           │
│                                                                     │
│   CSS Custom Properties        --s-primary, --s-radius-md, ...     │
│   (:root + .dark)              Light + dark mode, OKLCH colors     │
│                                                                     │
│         │  consumed by                                              │
│         ▼                                                           │
│                                                                     │
│   150+ Components              Read var(--s-*), never hardcode     │
│   (React + Tailwind v4)        Identity flows DOWN, never UP       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

To change the visual output, edit the **top** of this chain — never the bottom.

---

## Sigil vs. Everything Else

### Architecture Comparison

| | shadcn/ui | Chakra UI | Radix Themes | MUI | **Sigil UI** |
|---|---|---|---|---|---|
| **Identity model** | None (copy-paste) | Theme object | Theme config | Theme provider | **Token-driven presets** |
| **Agent interface** | None | None | None | None | **`sigil.tokens.md`** |
| **Change primary color** | Edit every file | Edit theme | Edit config | Edit theme | **Edit 1 token** |
| **Complete visual overhaul** | Rewrite everything | Painful | Partial | Painful | **`sigil preset noir`** |
| **Curated identities** | 0 | 0 | 0 | 0 | **34 presets** |
| **Configurable tokens** | ~0 | ~40 | ~30 | ~50 | **259** |
| **Token categories** | 0 | 5 | 4 | 6 | **20** |
| **Per-component tokens** | No | Partial | No | Partial | **Yes (buttons, cards, inputs, nav, code, ...)** |
| **Motion tokens** | No | No | No | No | **Yes (durations, easings, scales, staggers)** |
| **Background/pattern tokens** | No | No | No | No | **Yes (dots, grid, noise, gradients, ...)** |
| **Color space** | Hex/HSL | Hex | P3 | Hex | **OKLCH** |
| **Diagram components** | 0 | 0 | 0 | 0 | **28** |
| **3D components** | 0 | 0 | 0 | 0 | **8** |
| **Animation components** | 0 | 2 | 0 | 2 | **20** |

### What "Token-Driven" Actually Means

Other systems call themselves "themeable." Here's the difference:

```
shadcn/ui: "Change your primary color"
  → Find bg-primary in 40+ files
  → Hope you got them all
  → Dark mode? Do it again
  → Hover states? Again
  → Focus rings? Again

Sigil: "Change your primary color"
  → --s-primary: oklch(0.65 0.25 275)
  → Done. Buttons, links, focus rings, badges,
    gradients, glows — all updated. Light + dark.
```

```
Other systems: "I want a brutalist aesthetic"
  → Spend 2 days rewriting components
  → Adjust radius (every file), borders (every file),
    shadows (every file), fonts (every file), spacing...
  → Result: still looks like the old system with sharp corners

Sigil: "I want a brutalist aesthetic"
  → npx @sigil-ui/cli preset anvil
  → 259 tokens change: radius → 0, borders → thick,
    shadows → harsh, fonts → Space Grotesk, spacing → dense,
    motion → snappy, patterns → grid lines
  → Result: genuinely different visual identity
```

### Component Coverage

| Category | Count | Highlights |
|----------|-------|------------|
| **Layout** | 27 | AppShell, PageGrid, VoronoiBento, SigilGrid, SectionDivider, Banner |
| **Core UI** | 65 | DataTable, Stepper, ColorPicker, TreeView, SignaturePad, RatingGroup |
| **Overlays** | 12 | Command palette, Drawer, ContextMenu, HoverCard, PreviewCard |
| **Navigation** | 9 | Sidebar, NavigationMenu, Menubar, Toolbar, SocialIcons |
| **Diagrams** | 28 | Sankey, Mermaid, Globe, Isometric, Pipeline, HubSpoke, Waterfall |
| **Sections** | 21 | Hero, Features, Pricing, FAQ, Bento, CodeShowcase, Blueprint |
| **Marketing** | 13 | PricingTiers, CostCalculator, BlogGrid, FeatureGrid, LogoBar |
| **Animation** | 20 | TextReveal, WordRotate, TypeWriter, Marquee, Parallax, BlurFade |
| **3D** | 8 | IsometricScene, Card3D, FloatingUI, Box3DGrid |
| **Shapes** | 5 | Hexagon, Diamond, Triangle, Diagonal |
| **Patterns** | 4 | Tessellation, GrainGradient, Cross, Pattern (14 variants) |
| **Playbook** | 9 | GapPixelGrid, FrostedPanel, AccentCTA, DensityText, BorderStack |
| **Total** | **150+** | |

---

## Token System (259 Fields, 20 Categories)

Every visual property in the system is a token. No exceptions.

```
Token Coverage Map
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

 colors          ████████████████████████████████████  35 fields
 typography      ███████████████████████████████       31
 spacing         █████████████████████████             25
 layout          ██████████████████████                22
 headings        ███████████████                       15
 radius          ████████████████                      16
 shadows         ██████████████                        14
 motion          ██████████████████                    18
 code            ██████████████                        14
 inputs          █████████████                         13
 navigation      ████████████                          12
 borders         ███████████                           11
 cards           ██████████                            10
 buttons         █████████                              9
 backgrounds     █████████                              9
 sigil grid      █████                                  5
 alignment       varies                              ext.
 sections        varies                              ext.
 dividers        varies                              ext.
 grid visuals    varies                              ext.
                                                  ──────
                                                  259 fields
```

| Category | Fields | Controls |
|----------|--------|----------|
| `colors` | 35 | Backgrounds, surfaces, text (5 levels), borders (4 levels), brand, status, gradients, glow |
| `typography` | 31 | Font stacks (display/body/mono), size scale (xs→6xl), weight scale, leading, tracking |
| `spacing` | 25 | Base scale, per-component padding (button, card, input, badge, section, navbar, modal, tooltip) |
| `layout` | 22 | Content widths (narrow/default/wide), page margins, gutters, grid, bento, sidebar, stack gaps |
| `headings` | 15 | h1–h4 + display: size, weight, tracking, leading for each |
| `radius` | 16 | Scale (none → full) + per-component (button, card, input, badge, modal, popover, tooltip, image) |
| `shadows` | 14 | Scale + glow, colored, inner, per-component (card, button, dropdown, modal) |
| `motion` | 18 | Duration scale (instant→slowest), easing curves (5), hover/press scale, stagger intervals |
| `code` | 14 | Font, sizing, colors for syntax highlighting (comments, keywords, strings, numbers, functions) |
| `inputs` | 13 | Heights (sm/md/lg), focus ring, placeholder, error state, labels, helpers |
| `navigation` | 12 | Navbar (height, blur, border, opacity), link style, breadcrumb, sidebar, pagination |
| `borders` | 11 | Width scale (none→thick), style, per-component (card, button, input, divider) |
| `cards` | 10 | Border style/width, hover effect, padding, title/description sizing, background, shadow |
| `buttons` | 9 | Font weight/transform/spacing, hover effect, active scale, icon gap, min-width |
| `backgrounds` | 9 | Pattern (14 types), opacity, noise, gradient (type/angle), hero pattern, section divider |
| `sigil` | 5 | Grid cell, cross arm/stroke, rail gap, card radius |

All colors use **OKLCH** — perceptually uniform, P3-gamut-ready: `oklch(L C H)`.

---

## Preset System (34 Presets)

One command changes all 259 tokens at once. Not a theme toggle — a different *design language*.

### Structural / Precision
| Preset | Mood | Display Font | Primary |
|--------|------|-------------|---------|
| **sigil** | Cross marks, grid lines, engineered | Nacelle | Indigo |
| **kova** | Hard-forged clarity, disciplined | Inter | Teal |
| **cobalt** | Blue metallic, chemical precision | Inter | Cobalt |
| **helix** | DNA spiral, biological precision | Inter | Teal |
| **hex** | Hexagonal grid, geometric | Space Grotesk | Amber |

### Minimal / Clean
| Preset | Mood | Display Font | Primary |
|--------|------|-------------|---------|
| **crux** | Maximum whitespace, decisive | Nacelle | Neutral |
| **axiom** | Mathematical purity | Inter | Blue |
| **arc** | Smooth arcs, flowing forms | Satoshi | Sky |
| **mono** | Terminal aesthetic, zero decoration | Space Mono | Neutral |

### Dark / Cinematic
| Preset | Mood | Display Font | Primary |
|--------|------|-------------|---------|
| **basalt** | Volcanic dark stone | Inter | Slate |
| **onyx** | Ultra-dark premium | GT America | Purple |
| **fang** | Aggressive contrast, fierce | Space Grotesk | Red |
| **obsid** | Volcanic glass, mirror-dark | GT America | Slate |
| **cipher** | Encrypted aesthetic, crypto-noir | Space Grotesk | Green |
| **noir** | Film noir, warm amber highlights | GT America | Amber |

### Colorful / Expressive
| Preset | Mood | Display Font | Primary |
|--------|------|-------------|---------|
| **flux** | Dynamic gradients, energetic | Satoshi | Blue-Purple |
| **shard** | Crystalline fragments | Satoshi | Cyan |
| **prism** | Rainbow celebration, playful | Satoshi | Rainbow |
| **vex** | Puzzle-like, intricate | Satoshi | Fuchsia |
| **dsgn** | Design tool, Figma-inspired | Inter | Purple |
| **dusk** | Twilight, warm-to-cool sunset | Satoshi | Rose-Violet |

### Editorial / Typographic
| Preset | Mood | Display Font | Primary |
|--------|------|-------------|---------|
| **etch** | Acid-etched, engraved | Söhne | Emerald |
| **rune** | Mystical marks, arcane | Fraunces | Violet |
| **strata** | Geological layers, earthy | Söhne | Amber |
| **glyph** | Letterform-focused | Söhne | Indigo |
| **mrkr** | Hand-drawn, sketch aesthetic | Fraunces | Black |

### Industrial / Technical
| Preset | Mood | Display Font | Primary |
|--------|------|-------------|---------|
| **alloy** | Fused metals, warm steel | Space Grotesk | Copper |
| **forge** | Molten heat, industrial craft | Space Grotesk | Orange |
| **anvil** | Heavy, weighty foundations | Space Grotesk | Iron |
| **rivet** | Mechanical, utilitarian | Inter | Amber |
| **brass** | Vintage instrument, patina | Fraunces | Gold |

### Edgeless / Open
| Preset | Mood | Display Font | Primary |
|--------|------|-------------|---------|
| **vast** | Expansive open space, warm editorial | Fraunces | Terracotta |
| **aura** | Ethereal dark, luminous violet glow | General Sans | Violet |
| **field** | Clean utilitarian, monospace-forward | Space Grotesk | Green |

---

## Quick Start

### New project

```bash
npx create-sigil-app
```

Interactive bootstrapper: pick a template (AI SaaS, docs, dashboard, portfolio, ecommerce, blog, agency, startup), choose a preset, customize fonts, select features, generate agent instructions. Creates a Next.js app with Sigil pre-configured.

### Existing project

```bash
pnpm dlx @sigil-ui/cli convert   # Full adoption — deps, tokens, CSS import, agent instructions
npx @sigil-ui/cli add button card input dialog
npx @sigil-ui/cli preset noir    # Swap visual identity in one command
```

---

## CLI

| Command | What it does |
|---------|-------------|
| `sigil init` | Interactive setup: detects framework, asks about use case, recommends presets, generates agent instructions |
| `sigil convert` | Convert an existing project end-to-end: dependencies, token CSS, global CSS import, components directory, agent instructions |
| `sigil add <components>` | Copy components into your project (they read from tokens automatically) |
| `sigil add --all` | Add all available components |
| `sigil preset list` | Browse all 34 presets by category |
| `sigil preset <name>` | Switch to a different preset (regenerates token CSS) |
| `sigil preset create` | Scaffold a custom preset with base selection, color, and font prompts |
| `sigil diff` | Show token changes since last sync |
| `sigil doctor` | Validate project health (config, tokens, components, deps, CSS import, preset) |

---

## Packages

| Package | Description |
|---------|-------------|
| `@sigil-ui/tokens` | Token system — types, defaults, compiler, markdown parser. The core differentiator. |
| `@sigil-ui/components` | 150+ styled components consuming tokens via CSS custom properties |
| `@sigil-ui/primitives` | Headless behavior layer (Radix-based, 16 primitives) |
| `@sigil-ui/presets` | 34 curated preset bundles (259 tokens each) |
| `@sigil-ui/cli` | CLI for init, add, preset management, diff, doctor |
| `create-sigil-app` | Project bootstrapper with template selection |

---

## Agent-First Design

Sigil is built for AI agents to operate. Not agent-compatible. Agent-native.

| Feature | Purpose |
|---------|---------|
| `sigil.tokens.md` | Markdown file agents can read, reason about, and edit |
| `AGENTS.md` | Comprehensive agent instructions at repo root |
| `.sigil/AGENTS.md` | Project-specific agent instructions (generated by `sigil init`) |
| Agent skills | Pre-built skills for Cursor, Claude Code, and Codex |
| `sigil docs <component>` | Component docs as agent-readable markdown |

### Why agents build faster with Sigil

```
Task: "Make the site feel more premium"

Without Sigil (agent touches 40+ files):
  Button.tsx    → find bg-*, change colors, add shadow, adjust radius
  Card.tsx      → find border-*, add subtle gradient, change padding
  Input.tsx     → find focus ring, change border color, adjust height
  Navbar.tsx    → change backdrop blur, border, height
  Hero.tsx      → rewrite gradient, adjust typography
  ... 35 more files

With Sigil (agent touches 1 file):
  sigil.tokens.md →
    shadows: deeper
    radius: softer
    motion: smoother
    borders: subtle
    colors: richer contrast
    typography: tighter tracking
  → ALL components update. Every one.
```

---

## Tech Stack

- **React 18/19** — Components use `forwardRef`, accept `className`
- **Tailwind CSS v4** — `@theme` integration, token-aware utilities
- **OKLCH colors** — Perceptually uniform, P3-gamut-ready
- **GSAP + ScrollTrigger** — Scroll-driven animations, parallax, reveals
- **Motion** (Framer Motion) — Spring physics, layout animations, gestures
- **Radix primitives** — Accessible behavior layer (keyboard, screen reader, focus)

---

## Repository Structure

```
packages/
  tokens/           @sigil-ui/tokens      Source of truth: types, compiler, markdown parser
  presets/           @sigil-ui/presets     34 curated preset bundles (259 tokens each)
  components/        @sigil-ui/components  150+ styled React components
  primitives/        @sigil-ui/primitives  16 Radix-based headless behavior primitives
  cli/               @sigil-ui/cli        CLI: init, add, preset, diff, doctor
  create-sigil-app/                       npx create-sigil-app bootstrapper

apps/
  web/               Product site + sandbox (live preset switching)
  docs/              Documentation (Fumadocs)
  landing/           Marketing site
  demos/             10 template demos (ai-saas, dev-docs, dashboard, portfolio, ...)

style/               Design language and engineering philosophy
  design.md          Motion/animation guide (7 rules, speed limits, enter/exit)
  ux-principles.md   Product UX rules (100ms budget, three-click nav)
  style.md           Engineering philosophy (YAGNI, hard limits, React/TS rules)

skills/              Agent skills for specific workflows
  sigil-tokens/      Edit/extend tokens
  sigil-preset/      Create/modify presets
  sigil-component/   Create/modify components
  sigil-layout/      Page layout with grid system
  sigil-playbook/    Page composition (10 composition rules)
  sigil-migration/   Migrate from shadcn/ui
  sigil-polish/      Interface polish (typography, surfaces, animations, performance)
```

---

## License

MIT
