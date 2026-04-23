# Sigil UI — Agent Instructions

> Read this before writing any code in a Sigil project.

## The #1 Rule

**Edit the token spec. Not the components.**

Sigil is a token-driven design system. Every visual property — colors, fonts, spacing, radius, shadows, motion, borders — flows from a central token spec through CSS custom properties into components. When you need to change how something looks, you change the tokens. The components update automatically.

```
WRONG — manually editing component styling:
  open Button.tsx → find bg-indigo-600 → change to bg-emerald-600
  open Card.tsx → find rounded-lg → change to rounded-none
  open Input.tsx → find border-gray-300 → change to border-gray-500
  (repeat for every component, miss some, drift, inconsistency)

RIGHT — editing the central token spec:
  change --sigil-primary → every primary-colored element updates (buttons, links, focus rings, badges, gradients)
  change --sigil-radius-md → every medium-radius element updates (cards, inputs, dropdowns, tooltips)
  run "sigil preset brutalist" → the ENTIRE visual identity changes in one command
```

This is the fundamental insight. Agents that understand this build 10x faster because one token edit replaces dozens of component edits.

## How It Works

```
sigil.tokens.md (human/agent-editable markdown)
       ↓ parseMarkdownTokens()
SigilTokens (TypeScript object, 259 configurable fields)
       ↓ compileToCss() / compileToTailwind()
CSS custom properties (--s-primary, --s-radius-md, --s-duration-fast, ...)
       ↓ consumed by
Components (read var(--s-*), never hardcode values)
```

To change the visual output, edit the top of this chain — not the bottom.

## Quick Reference: What to Edit for Common Tasks

| Task | What to edit | Do NOT edit |
|------|-------------|-------------|
| Change primary color | Token CSS: `--sigil-primary: oklch(...)` | Component files |
| Change fonts | Token CSS: `--sigil-font-display: "NewFont", ...` | Component files |
| Change all border radius | Token CSS: `--sigil-radius-md: 12px` | Component files |
| Change animation speed | Token CSS: `--sigil-duration-fast: 200ms` | Component files |
| Change card hover effect | Preset: `cards.hover-effect: "glow"` | Card component file |
| Change button press scale | Preset: `buttons.active-scale: "0.95"` | Button component file |
| Change background pattern | Preset: `backgrounds.pattern: "dots"` | Layout files |
| Complete visual overhaul | `npx sigil preset <name>` | Any component files |
| Targeted brand update | Edit `sigil.tokens.md` or token CSS | Scattered Tailwind classes |

## Repository Structure

```
packages/
  tokens/           @sigil-ui/tokens     — Source of truth: types, defaults, compiler, markdown parser
  presets/           @sigil-ui/presets    — 31 curated preset bundles (259 tokens each)
  components/        @sigil-ui/components — 65+ styled React components (read from tokens, don't hardcode)
  primitives/        @sigil-ui/primitives — 16 Radix-based headless behavior primitives
  cli/               @sigil-ui/cli       — CLI: init, add, preset, diff, doctor
  create-sigil-app/                      — npx create-sigil-app bootstrapper

apps/
  web/               Product site + sandbox (drag-and-drop component canvas, live preset switching)
  docs/              Documentation (Fumadocs)
  landing/           Marketing site
  demos/             10 template demos (ai-saas, dev-docs, dashboard, portfolio, ecommerce, blog, agency, cli-tool, startup, playground)

skills/              Agent skills for specific workflows
  sigil-tokens/      Edit/extend tokens
  sigil-preset/      Create/modify presets
  sigil-component/   Create/modify components
  sigil-layout/      Page layout with grid system
  sigil-migration/   Migrate from shadcn/ui
```

## Token System (259 Configurable Fields)

16 categories, 53 required fields, 206 optional fields:

| Category | Fields | What It Controls |
|----------|--------|-----------------|
| `colors` (35) | backgrounds, surfaces, text, borders, brand, status, gradients, glow | Every color in the UI |
| `typography` (31) | font stacks, size scale, weight scale, leading, tracking, heading styles | Every text element |
| `spacing` (25) | base scale, button/card/input/badge/section/navbar/modal/tooltip padding | Every gap and padding |
| `layout` (22) | content widths, page margins, gutters, grid, bento, sidebar, stack gaps | Page structure |
| `sigil` (5) | grid cell, cross arm/stroke, rail gap, card radius | Structural-visibility system |
| `radius` (16) | scale (none→full) + per-component radius | Every rounded corner |
| `shadows` (14) | scale + glow, colored, inner, per-component shadows | Every shadow and elevation |
| `motion` (18) | durations, easings, hover/press/stagger presets | Every animation and transition |
| `borders` (11) | width scale, style, per-component border definitions | Every border |
| `buttons` (9) | font weight/transform/spacing, hover effect, active scale, icon gap | Button behavior and feel |
| `cards` (10) | border style, hover effect, padding, title/description sizing | Card layout and interaction |
| `headings` (15) | h1-h4 + display sizes, weights, tracking, leading | Heading hierarchy |
| `navigation` (12) | navbar height/blur/border, link style, breadcrumb, sidebar, pagination | Navigation feel |
| `backgrounds` (9) | pattern type/opacity, noise, gradient type/angle, hero pattern, section dividers | Page decoration |
| `code` (14) | font, sizing, colors for syntax highlighting (comments, keywords, strings, etc.) | Code blocks |
| `inputs` (13) | heights, focus ring, placeholder, error state, labels, helpers | Form field feel |

All colors use OKLCH: `oklch(L C H)` — L=lightness (0-1), C=chroma (0-0.37), H=hue (0-360).

## Preset System (31 Presets)

Switching presets changes ALL 259 tokens at once. Six categories:

| Category | Presets | Aesthetic |
|----------|---------|-----------|
| Structural | sigil, kova, cobalt, helix, hex | Engineering precision, grids, measurements |
| Minimal | crux, axiom, arc, mono | Maximum whitespace, clean, few elements |
| Dark | basalt, onyx, fang, obsid, cipher, noir | Deep blacks, cinematic, dramatic |
| Colorful | flux, shard, prism, vex, dsgn, dusk | Gradients, vibrant accents, playful |
| Editorial | etch, rune, strata, glyph, mrkr | Typography-forward, print-inspired |
| Industrial | alloy, forge, anvil, rivet, brass | Metallic, mechanical, utilitarian |

## CLI Commands

| Command | Purpose |
|---------|---------|
| `sigil init` | Interactive setup: detects project, asks about use case, recommends presets, configures everything, generates agent instructions |
| `sigil add <name>` | Copy components into your project (they still read from tokens) |
| `sigil preset list` | Browse all 31 presets by category |
| `sigil preset <name>` | Switch preset (regenerates token CSS) |
| `sigil preset create` | Scaffold a custom preset with base selection, color, and font prompts |
| `sigil diff` | Show token CSS changes since last sync |
| `sigil doctor` | Validate project health (config, tokens, components, deps, CSS import, preset) |

## Design System Rules

**Read `.cursor/rules/sigil-design-system.mdc` before writing any component.** It contains enforced rules imported from Kevin's wiki covering:

- Color rules (OKLCH, token-only, no hardcoded hex)
- Typography rules (font triad, balanced wrapping, tabular-nums)
- Spacing rules (4/8px grid, canonical ladder, no arbitrary values)
- Radius rules (concentric nesting, preset families)
- Shadow rules (token variables only, layered formula)
- Border rules (preset-driven style via `var(--s-border-style)`)
- Motion rules (purpose-driven, speed limits, seven rules, enter/exit asymmetry)
- Component token consumption table (what to use vs what's banned)
- Pre-ship checklist

## Component Rules

Components are downstream consumers. They:
- Use `forwardRef` and accept `className`
- Prefix CSS classes with `sigil-`
- Reference ONLY `var(--s-*)` for visual properties — never hardcoded hex, px, or font names
- Shadows use `shadow-[var(--s-shadow-*)]`, never Tailwind `shadow-sm`
- Durations use `duration-[var(--s-duration-*)]`, never hardcoded `duration-150`
- Border styles use `border-[style:var(--s-border-style,solid)]`, never implicit solid
- Radii use `rounded-[var(--s-radius-*)]`, never `rounded-lg`
- Input heights use `h-[var(--s-input-height,*)]`, never `h-10`
- Use `clsx` + `tailwind-merge` for class composition
- Expose variants as typed props (`variant`, `size`, `intent`)

When creating new components, follow these same conventions. When modifying appearance, edit tokens.

## Agent Workflow

### Setting up a new project
```
1. npx create-sigil-app (or npx sigil init for existing projects)
2. Choose preset matching the desired aesthetic
3. Read .sigil/AGENTS.md for project-specific instructions
4. npx sigil add <components needed>
5. npx sigil doctor to validate
```

### Making visual changes
```
1. Identify what needs to change (color? spacing? radius? everything?)
2. If everything → sigil preset <name>
3. If specific tokens → edit the token CSS file with :root { --sigil-*: value; }
4. If a full custom aesthetic → sigil preset create, then edit the preset file
5. NEVER edit component files for visual changes
6. npx sigil doctor after changes
```

### Building new pages
```
1. Read .sigil/AGENTS.md to understand the active preset's mood
2. Use existing Sigil components from the components directory
3. Reference token variables (var(--s-*)) for any custom CSS
4. Follow the component conventions for any new components
5. Do not introduce hardcoded colors, spacing, or fonts
```

## Project-Specific Agent Instructions

When `sigil init` or `create-sigil-app` runs, it generates `.sigil/AGENTS.md` in the project root. This file tells agents:
- Which preset is active and its mood
- Where components and tokens live
- Which features are enabled
- Token naming conventions
- Available CLI commands

**Always read `.sigil/AGENTS.md` at the start of any task** in a Sigil project.

## Skills

Read the relevant skill file before starting a task:

| Task | Skill File |
|------|-----------|
| Edit/extend tokens | `skills/sigil-tokens/SKILL.md` |
| Create/modify presets | `skills/sigil-preset/SKILL.md` |
| Create/modify components | `skills/sigil-component/SKILL.md` |
| Page layout with grid | `skills/sigil-layout/SKILL.md` |
| Migrate from shadcn | `skills/sigil-migration/SKILL.md` |

## Build System

- **pnpm 9** workspaces + **Turbo** for task orchestration
- **tsup** for package bundling (ESM + CJS + DTS)
- **TypeScript 5.8** for type checking
- `turbo build` → `turbo dev` → `turbo typecheck`
