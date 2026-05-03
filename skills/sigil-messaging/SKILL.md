# Skill — sigil-messaging

> Canonical source of truth for all Sigil UI positioning, copy, stats, naming,
> and tone. Every README, docs page, marketing surface, and agent-generated
> copy MUST reference this file before writing or updating text.

## When to Use

- Writing or updating README, docs, marketing pages, about pages
- Generating llms.txt or agent instructions
- Creating social posts or blog content about Sigil
- Reviewing copy for consistency
- Answering "what is Sigil" in any context

---

## Canonical Product Stats

These are the ONLY numbers to use. Do not round differently or invent counts.

| Stat | Value | Note |
|------|-------|------|
| Presets | 46 | 44 catalog + default + template |
| Components | 350+ | 545 exports across 258 files; "350+" is the marketing floor |
| Tokens | 519 | Type-level field count across all categories |
| Categories | 33 | Top-level keys on SigilTokens |
| Primitives | 40+ | 28 Radix + 13 Base UI families |
| CLI commands | 11 | init, convert, add, preset, inspire, design, docs, adapter, diff, doctor |

---

## Product Identity

### One-liner

> One markdown file controls your entire design system.

### Elevator pitch (2 sentences)

Sigil is a token-driven React design system where one DESIGN.md file defines every color, font, radius, shadow, and animation across 350+ components. Edit the markdown — CSS, Tailwind v4, and W3C JSON recompile automatically.

### What Sigil IS

- A design system that compiles from markdown
- Token-first: 519 tokens across 33 categories flow into components via CSS custom properties
- Constraint-first: agents compose from pre-built token-driven parts, not blank canvas
- Agent-first: the DESIGN.md surface is readable and editable by both humans and AI agents
- Preset-based: 46 curated presets, each a complete 500+ token visual identity
- Audited: quality validated at every layer (doctor, diff, type guarantees, WCAG)
- Framework: React + Tailwind v4 + Radix + OKLCH

### What Sigil is NOT

- Not a reference library (agents don't just read context — they operate within constraints)
- Not a component library you style manually
- Not a theme switcher (presets change structure, not just colors)
- Not a Figma plugin or design tool
- Not locked to one CSS framework

---

## Key Phrases (use these)

| Phrase | When to use |
|--------|-------------|
| "token-driven" | Describing the architecture |
| "agent-first" | Describing the editing surface |
| "structural-visibility" | Describing the default aesthetic |
| "one file controls everything" | Hero/tagline contexts |
| "edit tokens, not components" | The core principle |
| "DESIGN.md" | The file format name (capitalized, with .md) |
| "519 tokens, 33 categories" | Scope statement |
| "compiles to CSS + Tailwind v4" | Output formats |
| "OKLCH perceptual color" | Color system differentiator |

---

## Naming Conventions

| Use | Don't use |
|-----|-----------|
| preset | theme |
| token | variable, setting, config |
| DESIGN.md | design file, config file, style file |
| sigil.tokens.md | (legacy name, still supported but not primary) |
| category | group, section (in token context) |
| compile | generate, build (for token output) |
| component surfaces | component themes |

---

## Tone and Voice

- **Technical precision.** State facts. Cite numbers.
- **Engineering confidence.** Not "we think" — "it does."
- **Concise.** One sentence where possible. No filler words.
- **No hype adjectives.** Never: revolutionary, game-changing, cutting-edge, powerful, robust.
- **Show the mechanism.** Don't just say "it works" — show the pipeline.
- **Fragment-style headings.** "One file. Everything recompiles." not "Our innovative solution enables..."

---

## What to Avoid in Copy

- "AI-powered" (Sigil is agent-compatible, not AI-powered)
- "Revolutionary" or "game-changing"
- "Beautiful" or "stunning" (let the presets speak)
- "Easy" or "simple" (say "one command" or "one file" instead)
- "Best" or "only" (say what it does, not superlatives)
- Generic SaaS copy patterns (hero + 3 features + testimonials + CTA)
- Exclamation marks in technical copy

---

## Feature Hierarchy (what to lead with)

1. **Constraints over context** — agents compose from constrained parts, not blank canvas
2. **DESIGN.md format** — one markdown file, compiles to CSS + Tailwind
3. **Integrated philosophy** — tokens + components + presets as a single system
4. **Presets** — 46 complete visual identities, browsable, downloadable
5. **Token system** — 519 tokens, 33 categories, OKLCH, themed light/dark
6. **Components** — 350+ token-driven, never edit for visual changes
7. **Auditors** — doctor, diff, preset validation, type guarantees, WCAG, conventions
8. **CLI** — init, design, preset, add, inspire, doctor
9. **Agent-first** — AGENTS.md, skills, llms.txt, editable markdown surface

---

## Competitor Positioning

### vs shadcn/ui
- shadcn: copy-paste individual components, style each manually
- Sigil: one token file controls all 350+ components; swap preset = swap identity

### vs Chakra UI / MUI
- Chakra/MUI: runtime theme objects, JS-in-CSS, heavy bundle
- Sigil: CSS custom properties, zero runtime, Tailwind v4 native

### vs Radix Themes
- Radix Themes: ~20 design tokens, basic color/radius/spacing
- Sigil: 519 tokens including motion, page composition, data viz, cursor

### vs Reference tools (context vs constraints)
- Reference tools give agents **context** — screenshots, patterns, guidelines
- The agent still creates every component from scratch
- Sigil gives agents **constraints** — tokens + pre-built components + presets
- Context tells agents what good looks like; constraints make bad output structurally impossible
- An agent with a reference screenshot still writes `bg-indigo-600` and `rounded-lg`
- An agent with Sigil uses `<Button>` which reads `var(--s-primary)` and `var(--s-radius-button)`
- Key phrase: "integrated design philosophy > reference material"

### The constraint argument (use in all positioning)
- Agents are good at following structure, bad at exercising taste
- Reference tools = information (necessary but not sufficient)
- Sigil = rails (agents compose from constrained parts, not blank canvas)
- Pre-built components that enforce token spec = on-brand by construction
- No amount of DESIGN.md context prevents an agent from hardcoding hex colors

---

## Auditor Positioning

Sigil validates quality at every layer, not just at ship time.

| Auditor | What to say |
|---------|-------------|
| `sigil doctor` | "Project health in one command — config, tokens, components, deps, CSS, preset" |
| `sigil diff` | "See every token change since last sync before you commit" |
| Preset validation | "Every preset verified: all 519 fields present, OKLCH valid, scales progressive" |
| TypeScript `satisfies` | "Type-level guarantee that every preset covers every token" |
| WCAG contrast | "All text/background combinations audited against AA minimums per preset" |
| Component conventions | "forwardRef, className, var(--s-*) only — enforced, not suggested" |
| Design system rules | "Machine-readable rules in .cursor/rules/ — agents follow them automatically" |

When discussing auditors, emphasize: **the system enforces quality, not just the review process.** Components can't go off-brand because they read from tokens. Presets can't be incomplete because TypeScript catches missing fields. The architecture is the auditor.

---

## DESIGN.md Value Proposition

The pitch for the DESIGN.md format specifically:

> Your entire design system in one markdown file. 519 tokens across 33 categories — colors, typography, spacing, radius, shadows, motion, page composition, and more. Compiles to CSS custom properties and Tailwind v4. Readable by humans. Editable by agents. Drop it in your project, run `sigil design compile`, and your components update.

---

## Standard Descriptions (per package)

### @sigil-ui/tokens
Source of truth. 519 design tokens across 33 categories. Compiles to CSS, Tailwind v4, W3C JSON, and TypeScript. OKLCH color space. Light/dark theming.

### @sigil-ui/presets
46 curated visual identities. Each preset populates all 519 tokens. Seven aesthetic categories: structural, minimal, dark, colorful, editorial, industrial, edgeless.

### @sigil-ui/components
350+ token-driven React components. Read from `var(--s-*)`. Never edit for visual changes — change the tokens instead.

### @sigil-ui/primitives
40+ headless behavior primitives from Radix UI and Base UI. Accessible, composable, unstyled foundations.

### @sigil-ui/cli
11 commands for the full workflow: init, convert, add, preset, inspire, design, docs, adapter, diff, doctor.

### create-sigil-app
One command to scaffold a new project: framework detection, preset selection, component installation, agent instructions.
