# Sigil UI — Project Setup

This repository dogfoods Sigil itself. Read the root `AGENTS.md` for the complete engineering and design-system rules before changing code.

| Setting | Value |
|---|---|
| Active preset | `default` — neutral, structural, engineering-precise |
| Token source | `packages/presets/src/default.ts` and `packages/tokens/src/tokens.ts` |
| Generated CSS | `apps/web/app/_generated/sigil-tokens.css` |
| Components | `packages/components/src` |
| Presets | `packages/presets/src` |
| Product site | `apps/web` |

Visual changes start in tokens or a complete preset, never in scattered component classes. All 33 preset categories must remain populated. Components consume `var(--s-*)` values and may only be edited for behavior, structure, or missing token wiring.

The canonical workflow skills are source-controlled in the root `skills/` directory. Read the relevant `skills/sigil-*/SKILL.md`, run `pnpm audit:sigil` and the task-specific audit, then run the local CLI doctor from `packages/cli/dist/index.js`.
