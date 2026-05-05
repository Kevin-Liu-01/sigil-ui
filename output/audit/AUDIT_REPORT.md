# Sigil Component Library — Full Audit Report

**Status:**
- **298/298** doc pages clean (no errors, no hydration mismatches, no console errors)
- **298/298** doc pages pass visual quality (no narrow cards, no tiny elements, no aspect-ratio collapses)
- **361/361** showcase cells render without errors
- **361/361** showcase cells pass per-cell visual quality across all 18 categories
- **18/18** /components category tabs hydrate cleanly
- **361/361** showcase entries resolve to real docs or explicit `null`

**Auditors:**
- `scripts/audit-components.mjs` (per-doc-page, ~38 s for all 298)
- `scripts/audit-visual.mjs` (per-doc visual quality, ~50 s for all 298)
- `scripts/audit-showcase.mjs` (per-category tab, ~19 s for all 18)
- `scripts/audit-showcase-deep.mjs` (per-cell DOM scan, ~3 s for all 361)
- `scripts/audit-showcase-visual.mjs` (per-cell visual quality across all categories, ~7 s)
- `scripts/validate-showcase-docs.mjs` (static reconciliation)

---

## Summary

### Doc page audit (298 pages under /docs/components/)

| Metric | Baseline | After fixes |
|---|---:|---:|
| Component doc pages audited | 298 | 298 |
| Pages with errors | **294** | **0** |
| Clean pages | 4 | **298** |
| Audit runtime | ~13 min (concurrency=1, dev) | **38 s** (concurrency=8, prod build) |
| Components with token violations | 5 | 3 |

### /components showcase landing page

| Metric | Result |
|---|---:|
| Showcase cells | 361 |
| Cells with rendering issues (NaN / undefined / empty) | **0** |
| Console errors across all 18 category tabs | **0** |
| Page errors across all 18 category tabs | **0** |
| Showcase entries resolving to real docs | **306** |
| Showcase entries with intentional `docPath: null` | **55** |
| Showcase entries pointing at missing docs | **0** |

### Total docs across all sections

| Section | MDX count |
|---|---:|
| /docs/components | 298 |
| /docs/diagrams | 56 |
| /docs/layout | 31 |
| /docs/sections | 21 |
| /docs/animation | 21 |
| /docs/overlays | 13 |
| /docs/marketing | 13 |
| /docs/navigation | 11 |
| /docs/3d | 11 |
| /docs/playbook | 9 |
| /docs/shapes | 5 |
| /docs/patterns | 4 |
| /docs/effects | 1 |
| Other top-level | 6 |
| **Total MDX** | **500** |
| Unique titles | 389 |

---

## What was built

### 1. Component auditor (`scripts/audit-components.mjs`)
A Playwright-driven crawler that visits every `/docs/components/<slug>` page and combines static MDX analysis, runtime DOM checks, console-error capture, and screenshot capture.

**Severity layers:**
- `error` — fatal: page crash, hydration mismatch, console errors, empty preview, HTTP ≥ 400
- `warning` — should be fixed: data-hungry component rendered bare, React warnings
- `info` — could be richer: shallow demos with few descendants

**Reports:** `output/audit/<timestamp>/{report.json, report.md, screenshots/*.png}`

**Token compliance:** scans every `packages/components/src/**/*.tsx` for hex colors, hardcoded `rounded-{md,lg,...}`, `shadow-{sm,...}`, `duration-{150,...}`, and `text-white`/`bg-white`/`text-black`/`bg-black`.

### 2. Pre-warm helper (`scripts/warm-docs-cache.mjs`)
Hits every doc URL once before auditing — useful when running against a fresh dev server.

### 3. Bulk-fix scripts
- `scripts/improve-bare-demos.mjs` — 30 bare `<X />` previews upgraded to rich examples
- `scripts/fix-broken-demos.mjs` — 11 demos rewritten with valid prop names (Shape, LogoBar, FeatureGrid, etc.)
- `scripts/add-missing-previews.mjs` — 29 docs that had no `<ComponentPreview>` block at all now have working previews

### 4. Skill (`skills/sigil-audit/SKILL.md`)
Documentation for future sessions: how to run the auditor, how to interpret findings, common bug patterns to look for, prod-vs-dev tradeoff.

### 5. Root npm script (`package.json`)
```bash
pnpm audit:components
```

---

## User-identified issues — fixed

### CheckboxGroup
**Before:** wired with two disconnected props (`groupValue` / `onGroupChange` on items, `value` / `onValueChange` on root). State never flowed between them, so the demo was always blank.

**After:**
- Refactored to use React context internally; items pull state from the parent
- Added `items` shorthand for declarative rendering, `description` slot per item, horizontal/vertical orientation
- Now uses the existing token-compliant `<Checkbox>` for the box itself (consistent with the rest of the system)
- Demo shows 4 items including a disabled one with sub-descriptions

### Carousel
**Before:** nav buttons floated outside the rail with `-left-10`/`-right-10`, often clipped on small viewports; no pagination dots; no keyboard nav; no rounded viewport.

**After:**
- Nav buttons default to `placement="inside"` (sit over the slide); still support `placement="outside"`
- New `<CarouselDots>` sub-component with active-pill animation
- Keyboard arrow navigation (←/→ horizontal, ↑/↓ vertical)
- Viewport now has `--s-card-radius` so slides are clipped to the brand radius
- Buttons use `--s-shadow-md`, `active:scale-95`, hover changes text color to `--s-primary`
- MDX upgraded with three real slides showing different surface variants

### Calendar
**Before:** day cells inherited Fumadocs prose-table CSS (`border-bottom: 1px solid var(--s-border-muted)`, `padding: 8px 12px`), making the calendar look like a spreadsheet.

**After:**
- Scoped Fumadocs prose table styles so they no longer bleed into `<table>` inside `.sigil-preview` or any `[data-slot]` container
- Day cells now use a `<button>` with concentric pill styling — selected days get `--s-primary` fill, today gets a subtle dot, range middle stays flat
- Weekday labels use `--s-font-mono` with `tracking-[0.08em]` uppercase for editorial feel
- Frame has `--s-card-radius` border so it reads as one card, not a free-floating grid
- MDX shows three modes: single date, range selection, and label-only navigation

---

## Other component fixes (regression discoveries)

The audit surfaced 13 additional components that crashed when called with no/wrong props. Each was made resilient against undefined inputs while the demos were updated to call them correctly.

| Component | Fix |
|---|---|
| `DataTable` | Accept `accessorKey` (TanStack convention) as alias for `key`; emit unique `key={accessor || colIdx}` to fix React `key` warning |
| `Shape` | Accept numeric `size` prop in addition to the enum; `resolveSize()` falls back to `md` for invalid values (was returning NaN paths) |
| `BrailleSpinner` | Falls back to `orbit` when `name` doesn't match a known variant |
| `CodeBlock` | Tolerates undefined `code` prop |
| `CodeTabs` | Tolerates undefined `tabs` prop |
| `FeatureGrid` | Tolerates undefined `rows` |
| `FeatureSection` | Tolerates undefined `features` |
| `StatsSection` | Tolerates undefined `stats` |
| `InstallSection` | Tolerates undefined `commands` |
| `FloatingUI` | Tolerates undefined `layers` (and computes `min-height` safely) |
| `LogoBar` | Tolerates undefined `logos` |
| `LogoCloudSection` | Tolerates undefined `logos` |
| `FooterSection` | Tolerates undefined `groups` |
| `TestimonialsSection` | Tolerates undefined `testimonials` |
| `EcosystemDiagram` | Tolerates undefined `ring` |
| `SankeyDiagram` | Tolerates undefined `sources` / `targets` / `links` |
| `HubRouteDiagram` | Provides defaults for `source`, `hub`, `leftTargets`, `rightTargets` |
| `StreamFlowDiagram` | Provides default `source` |
| `SparkLine` | Tolerates undefined `data` |
| `CostCalculator` | Provides default `estimate` shape |

The pattern: **never crash on missing data; always render an empty/placeholder state.** Components that accept `T[]` should default `?? []`. Components that accept structured config should provide a minimal default. This makes them resilient in playground/sandbox contexts and makes audit-time failures actually informative (no false-positive "page crashed" reports).

---

## Hydration-mismatch fix (root cause discovery)

Many Sigil components are built on Radix primitives (Dialog, AlertDialog, DropdownMenu, ContextMenu, Popover, etc.). Radix uses `useId` and portals heavily, and React 19 + Next.js MDX rendering produces hydration mismatches when these primitives SSR inside MDX pages.

**Original symptom:** ~30+ component preview pages showed `Hydration failed because the server rendered HTML didn't match the client` and `Encountered a script tag while rendering React component`.

**Fix (`apps/web/components/component-preview.tsx`):**
```tsx
const [mounted, setMounted] = useState(false);
useEffect(() => { setMounted(true); }, []);

return (
  <div suppressHydrationWarning className="sigil-preview">
    {mounted ? children : <span aria-hidden className="opacity-0">·</span>}
  </div>
);
```

Children are deferred to client-only render — preview chrome is still SSR'd so layout doesn't shift. The placeholder reserves vertical rhythm. The auditor was updated to wait for the placeholder span to be replaced before measuring.

This fix unlocked ~50% of the previously-failing pages in one change.

---

## MDX prerender fixes

Production build (`next build`) refused to compile a few MDX files because the preview blocks contained inline functions, which can't be serialized for static prerender:

- `cost-calculator.mdx` — removed inline `estimate={(values) => ...}` arrow
- `split-button.mdx` — removed inline `onClick={() => {}}`, `onSelect: () => {}`
- `sonner.mdx`, `toast.mdx`, `overlays/sonner.mdx`, `overlays/toaster.mdx` — removed `onClick={() => toast(...)}`

For previews that need to demonstrate interaction, the recommendation is: write the *visible state* statically. Move interactive examples into the prose section under `## Usage`.

---

## Remaining token-violation warnings (3 components)

The auditor still flags these source files as containing hex colors, but they are intentional:

| Component | Reason |
|---|---|
| `ComparisonTable` | Hex colors in the legend swatches (kept for cross-preset visual variety) |
| `MermaidDiagram` | Hex colors passed through to Mermaid's theme config (Mermaid expects `#hex`) |
| `PricingTable` | Hex colors in placeholder data (not actual styling) |

These are documented and not blocking. If desired, they could be migrated to `oklch()` literals or token references in a follow-up.

---

## Speed-up: dev vs prod tradeoff

The biggest unlock was switching the audit target from `next dev` to `next start`:

| Setup | Per-page latency | 298-page audit |
|---|---:|---:|
| `next dev` (cold compile per route, concurrency=1) | ~30 s | ~150 min |
| `next dev` (concurrency=2-4) | dev server thrashes, 500s | unstable |
| `next start` (prebuilt, concurrency=8) | ~25 ms | **~38 s** |

The auditor now defaults `concurrency` to 2 (safe against `next dev`) but recommends `--concurrency=8 --base=http://localhost:4000` against a prod build. Documented in `skills/sigil-audit/SKILL.md`.

---

## How to use it going forward

```bash
# 1. Build once (35s)
pnpm --filter @sigil-ui/web build

# 2. Start prod server (separate terminal)
cd apps/web && PORT=4000 pnpm start

# 3. Audit (38s)
pnpm audit:components -- --base=http://localhost:4000 --concurrency=8

# 4. Read the report
open output/audit/<timestamp>/report.md
```

To audit a subset:
```bash
pnpm audit:components -- --base=http://localhost:4000 --slug=button,carousel,calendar
```

---

## Files touched

**New:**
- `scripts/audit-components.mjs` (auditor)
- `scripts/warm-docs-cache.mjs` (cache pre-warm)
- `scripts/improve-bare-demos.mjs` (30 demos)
- `scripts/fix-broken-demos.mjs` (11 demos)
- `scripts/add-missing-previews.mjs` (29 demos)
- `skills/sigil-audit/SKILL.md` (skill)
- `output/audit/AUDIT_REPORT.md` (this file)

**Modified components:**
- `packages/components/src/ui/CheckboxGroup.tsx`
- `packages/components/src/ui/Carousel.tsx`
- `packages/components/src/ui/Calendar.tsx`
- `packages/components/src/ui/DataTable.tsx`
- `packages/components/src/ui/BrailleSpinner.tsx`
- `packages/components/src/ui/CodeBlock.tsx`
- `packages/components/src/ui/Productivity.tsx`
- `packages/components/src/shapes/Shape.tsx`
- `packages/components/src/marketing/{LogoBar,FeatureGrid,CostCalculator}.tsx`
- `packages/components/src/sections/{FeatureSection,StatsSection,InstallSection,FooterSection,LogoCloudSection,TestimonialsSection}.tsx`
- `packages/components/src/3d/FloatingUI.tsx`
- `packages/components/src/diagrams/EcosystemDiagram.tsx`
- `packages/components/src/diagrams/templates/{SankeyDiagram,HubRouteDiagram,StreamFlowDiagram,SparkLine}.tsx`
- `packages/components/src/index.ts` (export `CarouselDots`, `CheckboxGroupItemConfig`)

**Modified app:**
- `apps/web/components/component-preview.tsx` (deferred children mount + suppressHydrationWarning)
- `apps/web/app/global.css` (scoped Fumadocs table styles to non-preview prose)

**Modified docs (~70 MDX files):**
- 30 bare-demo upgrades
- 11 broken-demo fixes
- 29 missing-preview adds
- ~6 inline-function removals (sonner/toast/split-button/cost-calculator)
- ~5 prop-name corrections (footer-section/logo-cloud-section/ecosystem-diagram/etc.)

**Package.json:**
- Added `pnpm audit:components`
- Added `playwright` to root devDependencies
