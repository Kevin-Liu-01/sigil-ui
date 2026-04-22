# create-sigil-app

Bootstrap a new Next.js project with Sigil UI pre-configured. One command to go from zero to a fully token-driven, preset-powered, agent-ready project.

## The Core Principle

`create-sigil-app` sets up the Sigil token pipeline from the start. You pick a template, choose a preset, optionally customize fonts — and the result is a project where every visual property flows from a central token spec. Agents and humans change the look by editing tokens, not by hunting through component files.

## Usage

```bash
npx create-sigil-app
npx create-sigil-app my-app
npx create-sigil-app my-app --preset noir --template dashboard
npx create-sigil-app my-app -y   # defaults: minimal template, sigil preset
```

## Interactive Flow

| Step | Question | Options |
|------|----------|---------|
| 1 | Project name | Text input (kebab-case) |
| 2 | Template | 10 templates (see below) |
| 3 | Preset | 12 popular picks + browse all 31 |
| 4 | Display font | Optional text input |
| 5 | Features | GSAP, Motion, Radix Primitives, Sigil Grid |
| 6 | Agent instructions | Generate `.sigil/AGENTS.md` |

## Templates (10)

| Template | Description |
|----------|-------------|
| `ai-saas` | Dashboard + AI features, dark mode, charts |
| `dev-docs` | Documentation site with search, code blocks |
| `dashboard` | Analytics dashboard with tables, charts |
| `portfolio` | Creative portfolio with scroll animations |
| `ecommerce` | Product catalog, cart, checkout |
| `blog` | Content site with MDX, RSS, categories |
| `agency` | Agency site with case studies, team page |
| `cli-tool` | CLI documentation with terminal examples |
| `startup` | Landing page + waitlist, pricing, FAQ |
| `minimal` | Clean starting point — just Next.js + Sigil |

## What It Creates

1. **Next.js project** — App Router, TypeScript, Tailwind v4, Turbopack
2. **`sigil.config.ts`** — project configuration with your chosen preset
3. **Token CSS** — imports base tokens + preset, with optional font overrides
4. **`globals.css`** — updated with Sigil token import
5. **`src/components/ui/`** — empty components directory
6. **`.sigil/AGENTS.md`** — AI agent instructions (optional)
7. **`package.json`** — all Sigil + feature dependencies added
8. **Git** — initialized with initial commit (unless `--no-git`)

## Flags

| Flag | Description |
|------|-------------|
| `-t, --template <name>` | Template to use |
| `-p, --preset <name>` | Sigil preset to use |
| `--no-git` | Skip git initialization |
| `--no-install` | Skip dependency installation |
| `-y, --yes` | Skip prompts, use defaults (minimal template, sigil preset) |

## After Creating

```bash
cd my-app
pnpm dev                          # start dev server

npx sigil add button card input   # add components
npx sigil preset list             # browse presets
npx sigil preset noir             # switch aesthetic
npx sigil doctor                  # validate setup
```

## For AI Agents

When asked to create a new Sigil project:

1. **Use `create-sigil-app`** — do not manually scaffold Next.js and add Sigil packages
2. **Pick the right template** for the use case (SaaS → `ai-saas`, docs → `dev-docs`, etc.)
3. **Pick a preset that matches the desired mood** — browse `sigil preset list` or reference the preset catalog
4. **After creation, read `.sigil/AGENTS.md`** to understand the project setup
5. **All visual changes go through the token layer** — the created project is already wired for this. Edit the token CSS file or switch presets. Do not manually add Tailwind classes to component files.
6. **Run `npx sigil doctor`** to validate the setup before starting development
