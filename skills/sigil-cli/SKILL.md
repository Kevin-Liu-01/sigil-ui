---
name: sigil-cli
description: Consolidated reference for the @sigil-ui/cli command surface (init, convert, add, preset, design, inspire, adapter, docs, diff, doctor). Use when looking up what a CLI command does, picking between `sigil init` and `sigil convert`, scaffolding a new project, switching presets, generating DESIGN.md, validating a project, or any task that reaches for `npx @sigil-ui/cli`. Triggers on "sigil cli", "sigil init", "sigil convert", "sigil add", "sigil preset", "sigil design", "sigil doctor", "sigil diff", "sigil inspire", "sigil adapter", "sigil docs", "create-sigil-app", or "what does X do".
---

# Skill — sigil-cli

> All ten CLI commands in one place. Stop hunting through `AGENTS.md`,
> `SPEC.md`, and the package README to figure out which command to run.

## Quick reference

| Command | Purpose |
|---------|---------|
| `npx create-sigil-app` | Scaffold a brand-new app: deps, token CSS, base preset, components, agent instructions. Interactive. |
| `npx @sigil-ui/cli init` | Set up Sigil inside an existing project. Detects framework, asks about use case, recommends presets, configures everything. |
| `npx @sigil-ui/cli convert` | End-to-end conversion of an existing project: deps, tokens, CSS import, agent instructions. Heavier than `init`. |
| `npx @sigil-ui/cli add <name...>` | Copy components into your project's `components/` folder. They still consume `var(--s-*)`. |
| `npx @sigil-ui/cli preset list` | Browse all 46 presets by category (44 named + default + template). |
| `npx @sigil-ui/cli preset <name>` | Switch the active preset — regenerates the project's token CSS file. |
| `npx @sigil-ui/cli preset create` | Scaffold a custom preset with base preset, color, and font prompts. |
| `npx @sigil-ui/cli design generate` | Create a `DESIGN.md` from the current preset + any token overrides. |
| `npx @sigil-ui/cli design compile` | Parse `DESIGN.md` → emit CSS + Tailwind v4 `@theme` + W3C JSON. |
| `npx @sigil-ui/cli design sync` | Update the compile sections inside `DESIGN.md` from the current token tables. |
| `npx @sigil-ui/cli design extract <url>` | Crawl a reference URL and produce a full `DESIGN.md` from the inferred tokens. |
| `npx @sigil-ui/cli inspire <url-or-file>` | Draft token CSS, a custom preset, and a preview page from a reference (color palette, font pairing, etc.). |
| `npx @sigil-ui/cli docs` | Generate local custom-library docs and `llms.txt` from the project's tokens + components. |
| `npx @sigil-ui/cli adapter <name>` | Add a CSS bridge so shadcn, Bootstrap, or Material variables inherit your Sigil tokens. |
| `npx @sigil-ui/cli diff` | Show token CSS changes since the last `sigil` write. Run before commits to verify intent. |
| `npx @sigil-ui/cli doctor` | Validate project health: config, tokens, components, deps, CSS imports, preset selection. Run after any change. |

## Picking between commands

**New project from scratch:**
```
npx create-sigil-app
# Interactive: name, preset, framework. Drops you into a working app.
```

**Existing project, never used Sigil:**
```
npx @sigil-ui/cli init       # lighter — just wires Sigil in
# OR
npx @sigil-ui/cli convert    # heavier — also rewrites consumer files
```

**Existing Sigil project, want a different look:**
```
npx @sigil-ui/cli preset list
npx @sigil-ui/cli preset basalt
npx @sigil-ui/cli doctor
```

**Existing Sigil project, want a CUSTOM preset:**
```
npx @sigil-ui/cli preset create
# OR fully custom:
npx @sigil-ui/cli inspire https://stripe.com
npx @sigil-ui/cli design extract https://stripe.com
```

**Pulling shadcn/Bootstrap/Material into Sigil tokens:**
```
npx @sigil-ui/cli adapter shadcn
# Adds a CSS layer so the existing classes inherit --s-* values.
```

**Adding components to an existing app:**
```
npx @sigil-ui/cli add Button Card Hero Footer
# Copies the source files; they still read from var(--s-*).
```

**Validating after any change:**
```
npx @sigil-ui/cli doctor    # exits non-zero if anything is broken
npx @sigil-ui/cli diff      # show token CSS deltas before committing
```

## What `doctor` checks

The doctor walks every layer of the system and reports the first problem it
finds. Expected configuration after `init` / `convert`:

- `package.json` — `@sigil-ui/components`, `@sigil-ui/tokens`, `@sigil-ui/presets` deps present
- `app/globals.css` (or equivalent) — `@import "@sigil-ui/tokens/css"` present
- Tailwind v4 — `@source` rules cover the components directory
- A preset is selected (i.e. token CSS exists and matches a known preset)
- No `--sigil-*` references (the legacy prefix; current is `--s-*`)
- No unmigrated demo-style `--r-*` references (parallel token system)
- Hardcoded hex / px in component files (warning, not failure)

If any check fails, the output points at the file/line and the fix.

## Programmatic equivalents

Every CLI command maps to a public function in `@sigil-ui/tokens` or
`@sigil-ui/cli`:

- `compile design` → `compileDesignMd(doc)` from `@sigil-ui/tokens`
- `preset <name>` → `import("@sigil-ui/presets").presets[name]()` then
  `compileToCss(preset.tokens)` to emit CSS
- `design extract` → `parseDesignMarkdown(markdown)` from `@sigil-ui/tokens`
- `doctor` → set of validators in `@sigil-ui/cli/src/commands/doctor.ts`

Use these when scripting CI checks or automation that doesn't want to spawn
the CLI binary.

## See also

- `skills/sigil-design/SKILL.md` — DESIGN.md format details, what each
  section parses to, generator template.
- `skills/sigil-preset/SKILL.md` — preset rules: every preset must populate
  all 33 categories.
- `skills/sigil-tokens/SKILL.md` — extending the token type system itself.
- `skills/sigil-audit/SKILL.md` — Playwright + static auditors that
  complement `doctor`.
