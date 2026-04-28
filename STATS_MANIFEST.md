# Stats Manifest

> Every file that references a product stat. When a number changes, update
> this list and then update every file on it.

## Source of Truth

```
apps/web/lib/product-stats.ts
```

This file defines `SIGIL_PRODUCT_STATS` (`tokenCount`, `presetCount`,
`componentCountLabel`) and `SIGIL_PRODUCT_SUMMARY`. Several app pages import
from it. Everything else is hardcoded.

---

## Current Values

| Stat | Value | Notes |
|------|-------|-------|
| Token count | **519** | 519 CSS custom properties across 33 token categories |
| Token categories | **33** | Was 28 before block token expansion |
| Preset count | **44** (marketing) / **46** (`product-stats.ts`) | 44 named curated presets + default + _template = 46 in code |
| Component count | **200+** | Conservative marketing number |
| Primitives count | **28** | Radix-based headless behavior primitives |

---

## Token Count (519)

### Centralized (reads `SIGIL_PRODUCT_STATS.tokenCount`)

| File | Usage |
|------|-------|
| `apps/web/app/page.tsx` | Multiple stat displays, comparison tables |
| `apps/web/app/blog/page.tsx` | Blog intro copy |
| `apps/web/app/about/page.tsx` | About page stats |
| `apps/web/app/walkthrough/page.tsx` | Walkthrough stats |
| `apps/web/app/layout.tsx` | Meta description via `SIGIL_PRODUCT_SUMMARY` |
| `apps/web/components/landing/footer.tsx` | Footer stats |
| `apps/web/components/sandbox/canvas-item.tsx` | Canvas item badges |

### Hardcoded "519"

| File | Lines | Context |
|------|-------|---------|
| `AGENTS.md` | 33, 65, 91, 135, 152 | Agent instructions |
| `README.md` | 17, 91, 128, 154, 196, 241, 363, 423 | Intro, comparison, token system section |
| `MANIFESTO.md` | 35 | "519 tokens total" |
| `SPEC.md` | 485, 487, 1103, 1105 | Grand total table, preset description |
| `.cursor/rules/sigil-design-system.mdc` | 9 | "~519 fields" |
| `packages/presets/src/_template.ts` | 11 | "~519 fields" comment |
| `packages/presets/README.md` | 123 | "up to 519 tokens" |
| `packages/tokens/README.md` | 26 | "519 design tokens" |
| `skills/sigil-preset/SKILL.md` | table rows | Token count per category |
| `apps/web/app/manifesto/content.tsx` | 269 | "519 tokens total" |
| `apps/web/app/page.tsx` | 740, 775, 1064, 1210, 1381 | Hardcoded stat strings |
| `apps/web/app/presets/page.tsx` | 79, 124 | "519 fields", "519 tokens across 33 categories" |
| `apps/web/app/blog/page.tsx` | 72 | "519 tokens across 33 categories" |
| `apps/web/app/walkthrough/page.tsx` | 161, 194, 380, 489, 494 | "519 fields" copy |
| `apps/web/app/components/page.tsx` | 54 | `value: "519"` |
| `apps/web/app/demos/[slug]/demo-page-client.tsx` | 616, 626, 888 | Display values |
| `apps/web/components/landing/hero-showcase.tsx` | 273 | `KPI value="519"` |
| `apps/web/components/landing/component-showcase.tsx` | 1179, 1202, 1756, 1875, 1993 | Stat cards, NumberTicker, SpecTable |
| `apps/web/components/landing/component-stack.tsx` | 82 | "519 CSS custom properties" |
| `apps/web/components/landing/layer-stack.tsx` | 38, 46, 61, 102 | Copy blocks |
| `apps/web/content/docs/components/feature-grid.mdx` | 24 | "519 configurable tokens" |
| `apps/web/content/docs/components/feature-showcase-section.mdx` | 21 | "519 configurable fields" |
| `apps/web/content/docs/animation/number-ticker.mdx` | 15 | `NumberTicker value={519}` |
| `apps/docs/content/docs/components/feature-grid.mdx` | 24 | "519 configurable tokens" |
| `apps/docs/content/docs/components/feature-showcase-section.mdx` | 21 | "519 configurable fields" |

---

## Category Count (33)

| File | Lines | Context |
|------|-------|---------|
| `AGENTS.md` | 93, 149, 152, 160–164 | Token system table, preset rule |
| `README.md` | 154 | Section title "33 Categories" |
| `SPEC.md` | 487, 561 | Grand total, SigilPreset comment |
| `.cursor/rules/sigil-design-system.mdc` | 9, 14 | "33 token categories" + full list |
| `packages/presets/src/_template.ts` | 11 | "33 token categories" |
| `packages/tokens/README.md` | 26 | "33 categories" |
| `packages/cli/src/commands/preset.ts` | 213, 249, 253 | Generated preset comments |
| `skills/sigil-preset/SKILL.md` | 12, 21, 57, 92, 153, 172 | Category table, checklist |
| `apps/web/app/blog/page.tsx` | 72 | "33 categories" |
| `apps/web/app/presets/page.tsx` | 124 | "33 categories" |
| `apps/web/app/components/page.tsx` | 53 | `value: "33"` |

---

## Preset Count (44 / 46)

### Centralized (reads `SIGIL_PRODUCT_STATS.presetCount` = 46)

| File | Usage |
|------|-------|
| `apps/web/app/page.tsx` | Multiple stat displays |
| `apps/web/app/about/page.tsx` | About page |
| `apps/web/app/walkthrough/page.tsx` | Walkthrough |
| `apps/web/app/layout.tsx` | Meta via `SIGIL_PRODUCT_SUMMARY` |
| `apps/web/components/landing/footer.tsx` | Footer |
| `apps/web/components/sandbox/canvas-item.tsx` | Canvas badges |

### Hardcoded "44 presets"

| File | Lines | Context |
|------|-------|---------|
| `AGENTS.md` | 65, 133, 176 | Repo structure, preset system |
| `README.md` | 17, 90, 345, 363, 423 | Intro, comparison, preset system |
| `SPEC.md` | 581, 696, 739, 764, 823, 957, 968, 979, 990, 1027 | Architecture, CLI |
| `packages/cli/README.md` | 49, 113, 118, 188 | Preset list, commands |
| `packages/presets/README.md` | 3 | "44 curated presets" |
| `.cursor/rules/sigil-conventions.mdc` | 42 | Preset count |
| `apps/web/components/landing/layer-stack.tsx` | 103 | "44 presets" |
| `apps/web/components/landing/component-showcase.tsx` | 610, 1179, 1197, 1750, 2114, 2255 | Stat cards, showcase copy |
| `apps/web/content/docs/components/feature-showcase-section.mdx` | 27 | "44 presets" |
| `apps/web/content/docs/components/announcement-bar.mdx` | 23 | "44 presets" |
| `apps/docs/content/docs/index.mdx` | 71 | "44 presets" |
| `apps/docs/content/docs/installation.mdx` | 12 | "44 presets" |
| `apps/docs/content/docs/presets.mdx` | 17 | "44 presets" |
| Various other `apps/web/content/docs/marketing/*.mdx` | — | "44 presets" in example copy |

### Known discrepancy

`product-stats.ts` defines `presetCount: 46` (includes default + _template).
Most marketing prose says "44 presets" (named curated presets only). Align on
one canonical number when the count changes.

---

## Component Count (200+)

### Centralized (reads `SIGIL_PRODUCT_STATS.componentCountLabel`)

| File | Usage |
|------|-------|
| `apps/web/app/page.tsx` | Hero, stat cards |
| `apps/web/app/about/page.tsx` | About page |
| `apps/web/app/walkthrough/page.tsx` | Walkthrough |
| `apps/web/app/blog/page.tsx` | Blog intro |
| `apps/web/app/layout.tsx` | Meta via `SIGIL_PRODUCT_SUMMARY` |
| `apps/web/components/landing/footer.tsx` | Footer |
| `apps/web/components/sandbox/canvas-item.tsx` | Canvas badges |

### Hardcoded "200+"

| File | Lines | Context |
|------|-------|---------|
| `AGENTS.md` | 66 | Repo structure |
| `README.md` | 17, 36, 70, 150, 361, 424 | Intro, how it works, preset system |
| `SPEC.md` | 876 | Component library section |
| `packages/components/README.md` | 3, 26 | Intro, inventory heading |
| `packages/create-sigil-app/src/templates.ts` | 42 | Template metrics |
| `apps/web/app/page.tsx` | 896, 1382 | Hardcoded stat strings |
| `apps/web/app/presets/page.tsx` | 84 | "200+ components" |
| `apps/web/app/walkthrough/page.tsx` | 387, 477 | "200+ components" |
| `apps/web/app/components/page.tsx` | 52, 87 | STATS array, h1 heading |
| `apps/web/components/landing/layer-stack.tsx` | 68, 76 | "200+ components" |
| `apps/web/components/landing/component-showcase.tsx` | 1202, 2195, 2255 | Stat rows |
| `apps/docs/content/docs/index.mdx` | 70 | "200+ components" |
| `apps/docs/content/docs/installation.mdx` | 11 | "200+ components" |
| Various `apps/web/content/docs/components/*.mdx` | — | Example copy |

---

## Primitives Count (28)

| File | Lines | Context |
|------|-------|---------|
| `AGENTS.md` | 67 | "28 Radix-based headless behavior primitives" |
| `README.md` | 362, 425 | "28 primitives" in package table and structure block |
| `packages/primitives/README.md` | 23 | "Included Primitives (28)" |

---

## Per-Category Field Counts

These appear in token system tables. When a category's field count changes,
update all of these:

| File | Context |
|------|---------|
| `AGENTS.md` | Token System table (33 rows) |
| `README.md` | Token System table (33 rows) |
| `SPEC.md` | Grand total table |
| `packages/tokens/README.md` | Category table |
| `skills/sigil-preset/SKILL.md` | Required categories table (33 rows) |

---

## How to Update When Stats Change

1. **Edit `apps/web/lib/product-stats.ts`** — this updates all centralized
   references automatically.
2. **Search this manifest** for the stat you changed (token count, preset
   count, category count, component count).
3. **Update every hardcoded file** listed in the relevant section above.
4. **Verify with grep:**
   ```bash
   # After changing token count from 519 to N:
   rg '519' --glob '*.{md,mdx,mdc,ts,tsx}' --glob '!node_modules'
   # Should return 0 matches
   ```
5. **Update this manifest** with the new value and any new file locations.
