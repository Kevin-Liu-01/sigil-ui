# @sigil-ui/cli

The command-line interface for Sigil UI. Handles project setup, component installation, preset management, token diffing, and project health validation. Generates AI agent instructions so coding agents know how to work with your Sigil project.

## The Core Principle

The CLI is the primary interface for configuring a Sigil project. Instead of manually editing config files, Tailwind configs, or component styles, use the CLI to:
- **Set up the token pipeline** (`sigil init`)
- **Install token-driven components** (`sigil add`)
- **Switch the entire visual identity** (`sigil preset`)
- **Validate that tokens are consistent** (`sigil doctor`)
- **Track token changes** (`sigil diff`)

## Installation

```bash
pnpm add -D @sigil-ui/cli
```

Or use directly via npx:

```bash
npx sigil init
```

## Commands

### `sigil init` — Interactive Setup

The most important command. Walks you through a questionnaire that configures Sigil for your project.

**What it detects automatically:**
- Framework (Next.js, Remix, Vite, Astro)
- Package manager (pnpm, yarn, bun, npm)
- TypeScript presence
- Tailwind CSS presence
- Directory structure (`src/` vs root)
- Global CSS file location

**What it asks:**

| Step | Question | Options |
|------|----------|---------|
| 1 | What are you building? | SaaS, Marketing, Docs, Blog, Portfolio, E-commerce, Startup, Custom |
| 2 | Choose a preset | 31 presets organized by category, with recommendations based on project type |
| 3 | Customize preset? | Override primary color (OKLCH), display font, body font, mono font |
| 4 | Which features? | GSAP + ScrollTrigger, Motion, Radix Primitives, Pretext, Sigil Grid |
| 5 | Starter components? | button, card, input, badge, dialog, dropdown, tabs, tooltip, sigil-grid/cross/rail/card |
| 6 | File paths | Components directory, tokens CSS path |
| 7 | Agent instructions? | Generate `.sigil/AGENTS.md` for AI coding agents |

**What it creates:**
- `sigil.config.ts` — project configuration
- Token CSS file — imports base tokens + preset + optional overrides
- Components directory — with optional starter component stubs
- `.sigil/AGENTS.md` — instructions for AI agents (optional)

**Flags:**
- `-p, --preset <name>` — skip preset selection
- `-d, --dir <dir>` — override components directory
- `-y, --yes` — skip all prompts, use defaults
- `--no-agent` — skip agent instructions generation

### `sigil add` — Install Components

Copies component source files from `@sigil-ui/components` into your project.

```bash
sigil add button card input         # specific components
sigil add --all                      # all registered components
sigil add dialog --overwrite         # replace existing files
sigil add badge --dir lib/ui         # custom output directory
```

Components are copied as source so you own them, but they still read from token CSS variables. The right way to restyle is still through the token layer.

**Available components:** button, card, input, badge, dialog, dropdown, tabs, tooltip, sigil-grid, sigil-cross, sigil-rail, sigil-card

### `sigil preset` — Manage Presets

```bash
sigil preset              # show current preset info
sigil preset list         # browse all 31 presets by category with descriptions and fonts
sigil preset noir         # switch to noir preset
sigil preset create       # scaffold a custom preset file
```

**`sigil preset list`** prints all 31 presets organized by category (Structural, Minimal, Dark, Colorful, Editorial, Industrial) with descriptions and font stacks.

**`sigil preset create`** walks you through:
1. Custom preset name
2. Base preset to derive from (sigil, crux, noir, prism, mono, or blank)
3. Primary color (OKLCH)
4. Display font

Creates `sigil.preset.<name>.ts` in your project root. Activate with `sigil preset <name>`.

### `sigil diff` — Token Change Tracking

```bash
sigil diff                # show changes since last sync
sigil diff sync           # update snapshot to current state
```

Compares your token CSS file against a snapshot in `.sigil/tokens.snapshot.css`. Shows added, removed, and modified CSS variables.

### `sigil doctor` — Project Health Validation

```bash
sigil doctor
```

Runs 6 diagnostics:

| Check | What it validates |
|-------|-------------------|
| Config | `sigil.config.ts` exists and parses correctly |
| Tokens | Token CSS file exists and has `@import` statements |
| Components | Components directory exists, counts `.tsx` files |
| Dependencies | All npm deps for installed components are present in `node_modules` |
| CSS Import | Global CSS file references Sigil tokens |
| Preset | Active preset is one of the 31 built-ins or has a custom file |

## Generated Agent Instructions (`.sigil/AGENTS.md`)

When `sigil init` generates agent instructions, it creates a markdown file that tells AI coding agents:

- Which preset is active and its mood/aesthetic
- Where components and token files live
- Which features are enabled (GSAP, Motion, etc.)
- Token naming conventions (`var(--sigil-*)`)
- How to make visual changes (edit tokens, not components)
- Available CLI commands

This is critical for agent-driven development. The agent reads this file and knows to update the central spec instead of manually editing Tailwind classes across component files.

## Configuration (`sigil.config.ts`)

```typescript
import type { SigilConfig } from "@sigil-ui/cli";

const config: SigilConfig = {
  preset: "sigil",                       // active preset name
  componentsDir: "src/components/ui",    // where components live
  tokensPath: "src/styles/sigil.tokens.css", // token CSS file
  typescript: true,                       // TypeScript project
};

export default config;
```

## For AI Agents

When setting up or maintaining a Sigil project:

1. **Run `sigil init`** to set up the token pipeline — do not manually create config files
2. **Run `sigil add`** to install components — do not manually copy component files
3. **Run `sigil preset <name>`** to change the aesthetic — do not manually edit colors across files
4. **Run `sigil doctor`** after any changes to validate consistency
5. **Read `.sigil/AGENTS.md`** at the start of any task to understand the project's Sigil setup
6. **The token CSS file is the single point of visual customization.** Edit it for overrides, or switch presets for wholesale changes.
