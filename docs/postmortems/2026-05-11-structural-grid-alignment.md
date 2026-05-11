# Postmortem: Structural Grid Alignment Drift

Date: 2026-05-11

## Summary

Landing-page sections and divider bands appeared misaligned against the Sigil
gutter ruler pattern. The visible failure looked like "the divider is one pixel
or half a cell off," but several different problems were layered together:

- the web app was importing built package output from `packages/*/dist`, not the
  edited source files;
- `SigilPageGrid`'s content origin was missing from the stale runtime bundle, so
  snap/phase hooks exited early;
- section snap measurement oscillated because it measured its own previously
  applied snap padding;
- bordered divider tokens used `G + 1px`, creating cumulative one-pixel drift;
- real CSS borders painted inside the next box, making aligned boxes look one
  pixel too low;
- centered snap padding split fractional pixels across both sides, introducing
  subpixel drift across long pages.

The final model is full-cell rhythm: every section and divider boundary lands on
an integer multiple of the resolved browser pixel value of `--s-grid-cell`.

## Impact

The issue affected pages using `SigilFrame` / `SigilPageGrid` with visible
gutter rulers and stacked `SigilSection` + `Divider` bands. The problem was most
visible on the product landing page in light mode, where the rail pattern and
divider bands were high contrast.

## Root Causes

### 1. Runtime bundle did not include source edits

`apps/web` resolves workspace packages through built entries:

```txt
@sigil-ui/components -> packages/components/dist/index.cjs
@sigil-ui/presets    -> packages/presets/dist/index.cjs
@sigil-ui/tokens     -> packages/tokens/dist/index.cjs
```

Editing `packages/components/src` alone did not affect `localhost:3000` until
`packages/components/dist` was rebuilt. This led to false conclusions from
source inspection because the browser was running stale component code.

Lesson: when verifying `apps/web`, always confirm the runtime DOM contains the
expected source changes (`data-layout="sigil-content"`, snap attributes, divider
style changes), or rebuild the package dist before measuring.

### 2. Missing content-origin anchor disables alignment hooks

The snap and divider phase hooks measure from:

```css
[data-layout="sigil-content"]
```

The stale runtime bundle rendered only:

```html
<div class="flex min-w-0 flex-col">
```

With no content origin, alignment hooks returned early and no amount of token
tweaking fixed the page.

Lesson: `SigilPageGrid` must always render the content origin marker. Browser
debugging should start by checking this attribute exists.

### 3. Snap measurement oscillated

The first snap implementation measured:

```txt
span = sectionBottom - contentOriginTop
snap = ceil(span / G) * G - span
```

After snap padding was applied, `ResizeObserver` fired again. The next
measurement included the previous snap padding, computed `snap = 0`, removed the
padding, and dropped the section back off-grid.

Fix:

```txt
baseSpan = sectionBottom - contentOriginTop - previousSnapPadding
snap     = ceil(baseSpan / G) * G - baseSpan
```

Lesson: layout self-correction must measure the uncorrected base geometry, not
the already-corrected box.

### 4. Half-cell snap was the wrong contract

One attempted fix snapped to `G / 2` because the gutter `grid` pattern draws
subdivisions. That made some arithmetic appear cleaner but violated the visual
system: section and divider outer boundaries should land on full cells from the
top of the page.

Lesson: gutter subdivisions are internal decoration. Structural bands advance by
full `--s-grid-cell` intervals.

### 5. `+1px` divider heights caused cumulative drift

Older divider tokens used:

```txt
md = var(--s-grid-cell) + 1px
lg = 2 * var(--s-grid-cell) + 1px
```

That made individual top/bottom borders look plausible in isolation, but stacked
dividers accumulated one pixel per band.

Fix: divider heights are exact multiples of `G`, with strokes drawn visually.

Lesson: borders live inside layout boxes. Never add `+1px` to structural band
height.

### 6. Real CSS borders painted one pixel low

Once layout boxes landed on full cells, the visible top divider line still
looked one pixel low because `border-top` paints inside the divider box. The box
top was correct; the stroke was not.

Fix: `Divider` uses visual strokes:

```txt
top stroke    -> box-shadow at -1px
bottom stroke -> inset box-shadow
```

The layout box stays exactly `G` tall.

Lesson: distinguish layout geometry from paint geometry. If numbers say the box
is aligned but screenshots look one pixel low, inspect where the stroke paints.

### 7. Fractional centered padding introduced subpixel drift

Splitting snap padding as `snap / 2` on both top and bottom created fractional
halves. Browsers rasterized those fractions independently, producing small
drift over long pages.

Fix:

```txt
paddingTop    += floor(snap / 2)
paddingBottom += snap - floor(snap / 2)
```

The content stays centered enough, while total added padding remains exact.

Lesson: when a total length must be exact, let one side carry the fractional
remainder instead of splitting fractions evenly.

## Final Contract

- `G = resolved pixel height of var(--s-grid-cell)`.
- `SigilPageGrid` content origin is `[data-layout="sigil-content"]`.
- `SigilSection` tops and bottoms land on `k * G`.
- `Divider` tops and bottoms land on `k * G`.
- Bordered `Divider size="md"` has `height = G`, not `G + 1px`.
- `Divider` visual strokes do not affect layout.
- Section snap padding is split, but total applied snap is exact.
- Browser verification is required for visual grid work.

## Verification

Run:

```bash
node scripts/audit-grid-alignment.mjs --base=http://localhost:3000
```

The audit measures the resolved browser pixel value of `--s-grid-cell` and
checks every section/divider top and bottom boundary.

Final verified sample:

```txt
section[0] bottomMod50 = 0
divider[0] topMod50   = 0
divider[0] bottomMod50 = 0
divider[0] height      = 50
```

Screenshots captured during the fix:

- `grid-debug-after-snap.png`
- `grid-debug-full-cell.png`
- `grid-debug-full-cell-2.png`
- `grid-debug-visual-stroke.png`

## Prevention Checklist

Before changing structural grid rhythm:

1. Rebuild runtime packages used by `apps/web` (`tokens`, `presets`,
   `components`) or run their watchers.
2. Confirm the live DOM has `[data-layout="sigil-content"]`.
3. Measure resolved `--s-grid-cell` in the browser; do not parse raw `rem`
   strings as pixels.
4. Check section and divider boundaries with `scripts/audit-grid-alignment.mjs`.
5. Check screenshots for paint-level 1px errors after numeric alignment passes.
6. If visual strokes are off but layout numbers pass, adjust paint placement,
   not structural height.

## Follow-ups

- Add this audit to release QA when modifying `SigilPageGrid`, `SigilSection`,
  `Divider`, `SigilGutter`, preset `sigil` tokens, or global layout rhythm.
- Keep `.cursor/rules/sigil-design-system.mdc` and public docs synchronized
  whenever divider thickness or snap policy changes.
- Consider adding a small screenshot-diff fixture for the first few landing-page
  bands so paint regressions are caught automatically.
