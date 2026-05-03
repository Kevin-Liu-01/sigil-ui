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
 change --s-primary → every primary-colored element updates (buttons, links, focus rings, badges, gradients)
 change --s-radius-md → every medium-radius element updates (cards, inputs, dropdowns, tooltips)
 run "sigil preset anvil" → the ENTIRE visual identity changes in one command
```

This is the fundamental insight. Agents that understand this build 10x faster because one token edit replaces dozens of component edits.

## How It Works

```
DESIGN.md (human/agent-editable markdown — all 33 categories, 519 tokens)
 ↓ parseDesignMarkdown() / sigil design compile
SigilTokens (TypeScript object, 519 configurable fields)
 ↓ compileToCss() / compileToTailwind() / compileToW3CJson()
CSS custom properties (--s-primary, --s-radius-md, --s-duration-fast, ...)
Tailwind v4 @theme block
W3C Design Tokens JSON
 ↓ consumed by
350+ Components (read var(--s-*), never hardcode values)
```

Legacy path (still supported): `sigil.tokens.md` → `parseMarkdownTokens()` → 8 core groups.

To change the visual output, edit the top of this chain — not the bottom.

## Quick Reference: What to Edit for Common Tasks

| Task | What to edit | Do NOT edit |
|------|-------------|-------------|
| Change primary color | Token CSS: `--s-primary: oklch(...)` | Component files |
| Change fonts | Token CSS: `--s-font-display: "NewFont", ...` | Component files |
| Change all border radius | Token CSS: `--s-radius-md: 12px` | Component files |
| Change animation speed | Token CSS: `--s-duration-fast: 200ms` | Component files |
| Change card hover effect | Preset: `cards.hover-effect: "glow"` | Card component file |
| Change button press scale | Preset: `buttons.active-scale: "0.95"` | Button component file |
| Change background pattern | Preset: `backgrounds.pattern: "dots"` | Layout files |
| Change hero padding/layout | Token CSS: `--s-hero-padding-y: 120px` | Hero component files |
| Change CTA layout | Token CSS: `--s-cta-layout: "split"` | CTA component files |
| Change footer structure | Token CSS: `--s-footer-columns: 3` | Footer component files |
| Change page density | Preset: `pageRhythm.density: "editorial"` | Section/layout files |
| Complete visual overhaul | `npx @sigil-ui/cli preset <name>` | Any component files |
| Targeted brand update | Edit `sigil.tokens.md` or token CSS | Scattered Tailwind classes |

## Repository Structure

```
packages/
  tokens/           @sigil-ui/tokens     — Source of truth: types, defaults, compiler, markdown parser
  presets/           @sigil-ui/presets    — 46 curated preset bundles (44 named + default + template, 519 tokens each)
  components/        @sigil-ui/components — 350+ token-driven React components (read from tokens, don't hardcode)
  primitives/        @sigil-ui/primitives — 40+ headless behavior primitives (Radix UI + Base UI)
  cli/               @sigil-ui/cli       — CLI: init, add, preset, diff, doctor
  create-sigil-app/                      — npx create-sigil-app bootstrapper

apps/
  web/               Product site + docs + sandbox (Fumadocs at /docs, drag-and-drop component canvas, live preset switching)
  demos/             17 demos: 10 templates + 7 showcase clones (ai-saas, dashboard, portfolio, ecommerce, blog, agency, cli-tool, startup, dev-docs, playground, vercel-clone, linear-clone, vite-clone, viteplus-clone, dedalus-clone, oxide-clone, voidzero-clone)

style/               Design language and engineering philosophy (from Dedalus)
  design.md          Design & animation guide: when to animate, speed, seven rules, enter/exit
  ux-principles.md   Product UX rules: 100ms budget, three-click nav, visual design, interaction
  style.md           Engineering philosophy: code quality, YAGNI, hard limits, React/TS rules

skills/              Agent skills for specific workflows
  sigil-tokens/      Edit/extend tokens
  sigil-preset/      Create/modify presets
  sigil-component/   Create/modify components
  sigil-layout/      Page layout with grid system
  sigil-playbook/    Page composition (10 rules from Reticle design language)
  sigil-migration/   Migrate from shadcn/ui
  sigil-polish/      Interface polish: typography, surfaces, animations, performance (5 files)
```

## Token System (519 Configurable Fields)

33 categories across 4 tiers: primitives, component tokens, block tokens, and composition tokens.

| Category | Fields | What It Controls |
|----------|--------|-----------------|
| `colors` (36) | backgrounds, surfaces, text, borders, brand, status, gradients, glow | Every color in the UI |
| `typography` (31) | font stacks, size scale, weight scale, leading, tracking, heading styles | Every text element |
| `spacing` (25) | base scale, button/card/input/badge/section/navbar/modal/tooltip padding | Every gap and padding |
| `layout` (22) | content widths, page margins, gutters, grid, bento, sidebar, stack gaps | Page structure |
| `sigil` (10) | grid cell, cross arm/stroke, rail gap, card radius, gutter patterns | Structural-visibility system |
| `radius` (16) | scale (none→full) + per-component radius | Every rounded corner |
| `shadows` (14) | scale + glow, colored, inner, per-component shadows | Every shadow and elevation |
| `motion` (19) | durations, easings, hover/press/stagger presets | Every animation and transition |
| `borders` (11) | width scale, style, per-component border definitions | Every border |
| `buttons` (9) | font weight/transform/spacing, hover effect, active scale, icon gap | Button behavior and feel |
| `cards` (18) | border style, hover effect, padding, title/description sizing, aspect ratio | Card layout and interaction |
| `headings` (15) | h1-h4 + display sizes, weights, tracking, leading | Heading hierarchy |
| `navigation` (24) | navbar height/blur/border/padding/items/logo, sidebar, pagination | Navigation structure and feel |
| `backgrounds` (9) | pattern type/opacity, noise, gradient type/angle, hero pattern, section dividers | Page decoration |
| `code` (14) | font, sizing, colors for syntax highlighting (comments, keywords, strings, etc.) | Code blocks |
| `inputs` (13) | heights, focus ring, placeholder, error state, labels, helpers | Form field feel |
| `cursor` (15) | variant, size, colors, glow, blend mode, z-index | Custom cursor system |
| `scrollbar` (13) | width, track, thumb, radius, firefox compat | Scrollbar appearance |
| `alignment` (13) | rail width/columns/gutter, content/hero/section/navbar/footer alignment | Page-level alignment grid |
| `sections` (25) | padding scales, heading/description sizing, grid, alternate backgrounds | Section layout and rhythm |
| `dividers` (15) | style, width, color, opacity, gradients, ornaments, bleed | Structural dividers |
| `gridVisuals` (10) | lines, dots, cell background/border, hover effects | Grid decoration |
| `focus` (5) | ring width/color/offset, shadow, outline | Focus state appearance |
| `overlays` (8) | background, blur, surface, border, shadow, radius, z-index | Modal/overlay appearance |
| `dataViz` (13) | series colors, positive/negative, grid, axis, tooltip | Chart and data display |
| `media` (6) | radius, border, outline, shadow, object-fit | Image and media elements |
| `controls` (11) | heights, hit area, icon/handle size, track/thumb styling | Sliders, toggles, controls |
| `componentSurfaces` (12) | bg, border, text, hover/active/selected states | Component surface system |
| `hero` (25) | min-height, padding, content width, layout, title/description/action sizing | Hero section structure |
| `cta` (15) | padding, max-width, layout, title/description/action sizing, split gap | CTA section structure |
| `footer` (15) | padding, columns, gaps, logo/link/social sizing, bottom bar | Footer structure |
| `banner` (12) | height, padding, font, icon, border, position, dismiss size | Banner/announcement bar |
| `pageRhythm` (14) | density, section gaps, alternate backgrounds, dividers, scroll snap | Page-level composition flow |

All colors use OKLCH: `oklch(L C H)` — L=lightness (0-1), C=chroma (0-0.37), H=hue (0-360).

## Preset System (46 Presets)

Switching presets changes ALL 519 tokens at once — visual identity AND structural layout. 44 named curated presets + default + template = 46 total. Seven categories:

| Category | Presets | Aesthetic |
|----------|---------|-----------|
| Structural | sigil, kova, cobalt, helix, hex | Engineering precision, grids, measurements |
| Minimal | crux, axiom, arc, mono | Maximum whitespace, clean, few elements |
| Dark | basalt, onyx, fang, obsid, cipher, noir | Deep blacks, cinematic, dramatic |
| Colorful | flux, shard, prism, vex, dsgn, dusk | Gradients, vibrant accents, playful |
| Editorial | etch, rune, strata, glyph, mrkr | Typography-forward, print-inspired |
| Industrial | alloy, forge, anvil, rivet, brass | Metallic, mechanical, utilitarian |
| Edgeless | vast, aura, field, clay, sage, ink, sand, plum, moss, coral, dune, ocean, rose | Atmospheric, warm, organic, expansive |

### Custom Preset Rule (MANDATORY)

**Every custom preset MUST populate ALL 33 token categories and ALL fields.**

The canonical template is `packages/presets/src/_template.ts`. It contains every
field from `SigilTokens` (~519 fields across 33 categories) with sensible defaults.

When creating a custom preset — whether in-repo or via `sigil preset create`:

1. **Start from `_template.ts`** — copy it or spread it as a base.
2. **Never delete fields** — change values, don't remove keys.
3. **No partial presets** — if a field exists in `_template.ts`, it must exist in your preset.

The 33 required categories: `colors`, `typography`, `spacing`, `layout`, `sigil`,
`radius`, `shadows`, `motion`, `borders`, `buttons`, `cards`, `headings`,
`navigation`, `backgrounds`, `code`, `inputs`, `cursor`, `scrollbar`, `alignment`,
`sections`, `dividers`, `gridVisuals`, `focus`, `overlays`, `dataViz`, `media`,
`controls`, `componentSurfaces`, `hero`, `cta`, `footer`, `banner`, `pageRhythm`.

Read `skills/sigil-preset/SKILL.md` for the full field count per category and
the validation checklist.

## CLI Commands

| Command | Purpose |
|---------|---------|
| `sigil init` | Interactive setup: detects project, asks about use case, recommends presets, configures everything, generates agent instructions |
| `sigil convert` | Convert an existing project end-to-end: deps, tokens, CSS import, agent instructions |
| `sigil add <name>` | Copy components into your project (they still read from tokens) |
| `sigil preset list` | Browse all 46 presets by category |
| `sigil preset <name>` | Switch preset (regenerates token CSS) |
| `sigil preset create` | Scaffold a custom preset with base selection, color, and font prompts |
| `sigil design generate` | Create DESIGN.md from current preset + overrides |
| `sigil design compile` | Parse DESIGN.md → output CSS + Tailwind + W3C JSON |
| `sigil design sync` | Update compile sections in DESIGN.md from token tables |
| `sigil design extract <url>` | Extract full DESIGN.md from a reference URL |
| `sigil inspire <url-or-file>` | Draft token CSS, a custom preset, and a preview page from a reference |
| `sigil docs` | Generate local custom-library docs and `llms.txt` |
| `sigil adapter <name>` | Bridge shadcn, Bootstrap, or Material variables into Sigil tokens |
| `sigil diff` | Show token CSS changes since last sync |
| `sigil doctor` | Validate project health (config, tokens, components, deps, CSS import, preset) |

## Design System Rules

**Read `.cursor/rules/sigil-design-system.mdc` before writing any component.** It contains enforced rules covering:

- Color rules (OKLCH, token-only, no hardcoded hex)
- Typography rules (font triad, balanced wrapping, tabular-nums)
- Spacing rules (4/8px grid, canonical ladder, no arbitrary values)
- Radius rules (concentric nesting, preset families)
- Shadow rules (token variables only, layered formula)
- Border rules (preset-driven style via `var(--s-border-style)`)
- Motion rules (purpose-driven, speed limits, seven rules, enter/exit asymmetry)
- Component token consumption table (what to use vs what's banned)
- Pre-ship checklist

### Extended Design References

The `style/` directory contains the full design language (ported from the Dedalus aesthetic):

- **`style/design.md`** — Complete motion and animation guide. When to animate, when not to, speed limits, seven practical rules, enter/exit asymmetry, compound effects. Inspired by Emil Kowalski.
- **`style/ux-principles.md`** — Product-level UX rules. 100ms interaction budget, three-click navigation, three-color maximum, optical alignment, larger hit targets, persistent state.
- **`style/style.md`** — Engineering philosophy. Hard limits (70-line functions, 500-line files), YAGNI, token-first principle, post-LLM principles, React/TS rules.

The `skills/sigil-polish/` skill provides deep-dive reference files for interface polish:

- **`typography.md`** — Text wrapping (`balance` vs `pretty`), font smoothing, tabular numbers, font stack rules.
- **`surfaces.md`** — Concentric border radius, optical alignment, shadows over borders, image outlines, hit areas.
- **`animations.md`** — Interruptible animations, split/stagger enters, subtle exits, contextual icon animations, scale on press.
- **`performance.md`** — Transition specificity, `will-change` usage, GPU compositing.

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

## Why Constraints, Not Context

Other agent-facing tools (e.g. Refero) give agents design *context* — screenshots, reference patterns, style guidelines. Sigil gives agents design **constraints** — tokens that compile to CSS, components that consume those tokens, and presets that define the entire visual space.

Context tells an agent what good looks like. Constraints make it impossible to produce off-brand output. An agent with a reference screenshot still creates every button, card, and layout from scratch. With Sigil, those components already exist, already enforce the token spec, and the agent composes pages from constrained parts.

```
Reference approach:     Agent reads DESIGN.md → creates components from scratch → generic output
Sigil approach:         Agent reads tokens → uses pre-built components → on-brand by construction
```

This is the architectural bet: **integrated design philosophy > reference material**.

## Auditors

Quality is validated at every layer:

| Auditor | What it checks |
|---------|---------------|
| `sigil doctor` | Config, tokens, components, deps, CSS imports, preset validity |
| `sigil diff` | Token CSS changes since last sync |
| Preset validation | All 519 fields present, OKLCH validity, scale progressions |
| TypeScript `satisfies` | Every preset satisfies `SigilPreset` at build time |
| Design system rules | `.cursor/rules/sigil-design-system.mdc` enforces token-only styling |
| Component conventions | `forwardRef`, `className`, `var(--s-*)` only, `sigil-` prefix |

Run `sigil doctor` after any change. Run `sigil diff` before committing.

## Agent Workflow

### Setting up a new project
```
1. npx create-sigil-app (or npx @sigil-ui/cli convert for existing projects)
2. Choose preset matching the desired aesthetic
3. Read .sigil/AGENTS.md for project-specific instructions
4. npx @sigil-ui/cli add <components needed>
5. npx @sigil-ui/cli doctor to validate
```

### Making visual changes
```
1. Identify what needs to change (color? spacing? radius? everything?)
2. If everything → sigil preset <name>
3. If specific tokens → edit the token CSS file with :root { --s-*: value; }
4. If a full custom aesthetic → sigil preset create, then edit the preset file
5. NEVER edit component files for visual changes
6. npx @sigil-ui/cli doctor after changes
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
| Generate/compile DESIGN.md | `skills/sigil-design/SKILL.md` |
| Copy, positioning, stats, auditors | `skills/sigil-messaging/SKILL.md` |
| Create/modify components | `skills/sigil-component/SKILL.md` |
| Page layout with grid | `skills/sigil-layout/SKILL.md` |
| Build pages (10 composition rules) | `skills/sigil-playbook/SKILL.md` |
| Migrate from shadcn | `skills/sigil-migration/SKILL.md` |
| Polish UI details | `skills/sigil-polish/SKILL.md` |

## Build System

- **pnpm 9** workspaces + **Turbo** for task orchestration
- **tsup** for package bundling (ESM + CJS + DTS)
- **TypeScript 5.8** for type checking
- `turbo build` → `turbo dev` → `turbo typecheck`
