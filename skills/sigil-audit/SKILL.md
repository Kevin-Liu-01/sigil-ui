---
name: sigil-audit
trigger: when auditing the Sigil component library for visual, runtime, or token-compliance issues
---

# Sigil Component Auditor

> Browser + static auditor for every component preview page in the Sigil docs site,
> the /components landing showcase, and the showcase ↔ docs reconciliation.

## Scripts

| Script | Purpose |
|---|---|
| `scripts/audit-components.mjs` | Crawls every `/docs/components/<slug>` page; checks runtime errors, hydration, token compliance, screenshots each preview block. |
| `scripts/audit-showcase.mjs` | Loads `/components` and clicks through every category tab; verifies each filter view hydrates and renders the expected cell count. |
| `scripts/audit-showcase-deep.mjs` | Loads `/components` "All" view; walks every cell's DOM looking for NaN, `undefined`, `[object Object]`, or empty containers. Captures a full-page screenshot. |
| `scripts/validate-showcase-docs.mjs` | Static validator: every entry on the showcase resolves to either a real MDX file or an explicit `docPath: null`. Reports missing docs and duplicate names. |
| `scripts/improve-bare-demos.mjs` | Bulk-upgrades bare `<X />` MDX previews to richer examples with realistic props. |
| `scripts/fix-broken-demos.mjs` | Targeted MDX rewrites for components with wrong prop names. |
| `scripts/add-missing-previews.mjs` | Adds a `## Preview` section to docs that have no `<ComponentPreview>` block at all. |

## When to Use

- User asks for a "component audit", "QA pass", "audit all components", "check every preview"
- User reports a class of issues (e.g., "preview demos look broken", "components render with no data")
- After a token rename, preset rework, or large component-library refactor — verify nothing regressed visually
- Before a release — produce a clean baseline report

## What It Checks

The auditor crawls every `/docs/components/<slug>` page on the local dev server and combines static MDX analysis with a real Chromium browser pass.

| Layer | Checks |
|---|---|
| **Static MDX** | Has `<ComponentPreview>` block. Demo body has children/props (not bare `<X />`). Flags data-hungry components rendered with no items (`Carousel`, `Tabs`, `DataTable`, `Calendar`, `Hero`, `Pricing`, etc.). |
| **HTTP** | Status code (must be 2xx). |
| **Runtime DOM** | The `.sigil-preview` element mounts, has measurable height, and contains rendered children. Flags empty / shallow / clipped previews. |
| **Console** | Captures every `console.error` and React warning. Filters out HMR/dev-only noise. |
| **Page errors** | Captures uncaught exceptions and Next.js application-error fallbacks. |
| **Hydration** | Detects "Hydration failed" / "did not match" text in the DOM. |
| **Token compliance** | Scans every component source file for hex colors, hardcoded `rounded-*`/`shadow-*`/`duration-*` Tailwind utilities, and `text-white`/`text-black`/`bg-white`/`bg-black`. |
| **Screenshots** | Captures the preview block on every page so you can eyeball the result without re-running the dev server. |

## How to Run

### Fast path (recommended) — production build

`next dev` compiles each route on first hit, so concurrent auditing thrashes
Turbopack. The audit runs ~50× faster against `next start`:

```bash
# 1. Build the web app once (~30-40s)
pnpm --filter @sigil-ui/web build

# 2. Start the production server on port 4000 (so it doesn't fight :3000)
cd apps/web && PORT=4000 pnpm start
# wait for "Ready"

# 3. Audit at high concurrency
node scripts/audit-components.mjs --base=http://localhost:4000 --concurrency=8
```

**Reference:** 298 component pages audited in ~38s at concurrency=8 against
`next start`. The same audit takes 2-3 *hours* against `next dev` at
concurrency=1 because each cold route compile runs serially.

### Slow path — dev server

If you must audit against `next dev`, drop concurrency to 1 (parallel compiles
overwhelm Turbopack) and crank the timeout:

```bash
# (dev server already running)
node scripts/audit-components.mjs --concurrency=1 --timeout=180000
```

### Common flags

| Flag | Default | Purpose |
|---|---|---|
| `--base=<url>` | `http://localhost:3000` | Base URL for the dev server. |
| `--concurrency=<n>` | `2` | Parallel pages. Keep ≤ 3 with Next.js dev mode (Turbopack chokes on more). Use 4-6 against `next start`. |
| `--slug=a,b,c` | (all) | Restrict to specific component slugs (comma list). |
| `--skip-screenshots` | off | Faster pass without screenshots. |
| `--quick` | off | Halve render-settle delays. |
| `--timeout=<ms>` | `60000` | Per-page navigation timeout. |
| `--retry=<n>` | `1` | Retry attempts on `TimeoutError` / `ERR_CONNECTION_RESET`. |

### Output

Each run produces a timestamped folder under `output/audit/<ISO>/`:

- `report.json` — full structured results (one entry per slug)
- `report.md` — human-readable summary grouped by severity
- `screenshots/<slug>.png` — preview screenshots

## How to Read the Report

Findings are sorted by severity:

- **error** — blocks shipping (fatal navigation, console.error, hydration mismatch, missing component, empty preview, HTTP ≥ 400)
- **warning** — should be fixed (data-hungry component rendered bare, tiny preview, React warnings)
- **info** — bare/shallow demo that could be richer

Token violations are reported separately at the bottom of the markdown.

## Triage Workflow

1. **Run the audit** (full or filtered). Read the markdown report.
2. **Open screenshots** for the top 5-10 errored slugs. Eyeball them — does the preview look right?
3. **Group findings**:
   - `bare-data-hungry-demo` / `bare-demo` → improve the MDX preview body
   - `console-error` / `react-warning` → fix the component (often missing `key`, wrong prop name, or aria mismatch)
   - `empty-preview` / `tiny-preview` → either the preview demo is bare or the component is broken
   - `hex-color` / `hard-shadow` / `hard-radius` → swap for `var(--s-*)` tokens
4. **Fix, rebuild, re-run** with `--slug=<changed-list>` to confirm.
5. Once the focused list is clean, re-run the full audit for sign-off.

## Triage Heuristics

- **Component renders empty** → check the MDX prop names. Tanstack-like APIs (`accessorKey`, `columnDef`) sometimes leak in but Sigil components want `key`.
- **Identical error on every page** → almost always a global stylesheet, sound provider, or theme-provider issue. Check `apps/web/app/global.css` for unscoped selectors that bleed into previews.
- **Most pages timing out** → the dev server is overwhelmed. Lower concurrency, raise `--timeout`, or build (`pnpm turbo build && pnpm turbo start --filter=@sigil-ui/web`) and audit against `next start`.
- **Hydration mismatch only on certain pages** → look for `Date.now()`, `Math.random()`, or `useId` outside React in the demo body.
- **Token violations** → these are often false positives in `ColorPicker.tsx` (legitimate hex pickers) or comments. Verify before fixing.

## Anti-Patterns the Auditor Catches

- `<Carousel />`, `<DataTable />`, `<Calendar />` rendered with no props → looks blank
- `<X items={[...]} />` where the component expects children — no items render
- React `key` warnings from list-rendering helpers
- Token bypasses: `bg-white`, `rounded-lg`, `shadow-md`, `duration-150`
- Hex colors slipping into component source instead of going through `var(--s-*)`
- Missing `<ComponentPreview>` block in MDX entirely
