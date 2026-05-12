---
name: sigil-layout
trigger: when composing page layouts, sections, or grid structures using Sigil UI
---

# Sigil Layout

> Compose page layouts using Sigil's page, section, rhythm, and structural-visibility primitives.

## When to Use

- User asks to build a page layout, section, or screen
- User says "layout", "page structure", "grid", "compose a page"
- User wants to use sigil-grid, sigil-rail, or sigil-cross components
- User is building a landing page, dashboard, docs layout, or app shell

## How to Use

### 1. Core page primitives

Sigil page code should describe content and structure. Token math, snap padding,
gutter phase, and divider stroke placement live inside package primitives.

| Component | Purpose |
|---|---|
| `SigilPage` | Page shell with `rhythm="locked"` / `rhythm="hairline"` and `chrome` modes |
| `SigilHero` | Hero section root with built-in section spacing |
| `SigilHeroLayout` / `Content` / `Media` | Hero composition parts |
| `SigilSection` | Section band with named `space` presets |
| `SigilDivider` | Locked full-cell structural divider band |
| `Hairline` | Free-flow editorial rule |
| `SigilSectionHeader` | Canonical label/heading/description stack |
| `SigilActionRow` | Token-rhythm CTA/action row |
| `SigilStack` | Token-rhythm vertical stack |
| `SigilMonoBlock` | Token-rhythm mono/code block |
| `SigilGhostLink` | Secondary link CTA |

### 2. Page layout pattern

```tsx
import {
  AccentCTA,
  SigilActionRow,
  SigilDivider,
  SigilGhostLink,
  SigilHero,
  SigilHeroContent,
  SigilHeroLayout,
  SigilHeroMedia,
  SigilPage,
  SigilSection,
  SigilSectionHeader,
} from "@sigil-ui/components";

export function LandingPage() {
  return (
    <SigilPage rhythm="locked" chrome="rails">
      <SigilHero>
        <SigilHeroLayout>
          <SigilHeroContent>
            <SigilSectionHeader
              label="Components"
              heading="Browse the full component system."
              description="Tokens and grid rhythm are handled by Sigil."
            />
            <SigilActionRow>
              <AccentCTA>Browse Components</AccentCTA>
              <SigilGhostLink href="/docs">Read Docs</SigilGhostLink>
            </SigilActionRow>
          </SigilHeroContent>
          <SigilHeroMedia>{/* product visual */}</SigilHeroMedia>
        </SigilHeroLayout>
      </SigilHero>
      <SigilDivider />
    </SigilPage>
  );
}
```

### 3. Rhythm modes

Use locked rhythm for structural grid pages:

```tsx
<SigilPage rhythm="locked" chrome="rails">
  <SigilSection space="normal">...</SigilSection>
  <SigilDivider />
</SigilPage>
```

Use hairline rhythm for free-flow/editorial pages:

```tsx
<SigilPage rhythm="hairline" chrome="minimal">
  <SigilSection space="normal">...</SigilSection>
  <Hairline />
</SigilPage>
```

### 4. Content width and spacing

Use the token-defined content max-width and spacing:

```css
.section {
  max-width: var(--s-content-max);
  margin-inline: auto;
  padding-inline: var(--s-spacing-4);
  padding-block: var(--s-spacing-8);
}
```

The `--s-content-max` varies by preset (see `packages/presets/src/<name>.ts`):
- Most structural/colorful presets (`sigil`, `cobalt`, `kova`, `helix`, `flux`, ...): 1200–1400px
- Minimal/editorial presets (`crux`, `arc`, `etch`, `rune`, `glyph`): narrower (often 1024–1200px)
- Edgeless presets (`vast`, `aura`, `field`, `clay`, `sage`, `ink`, `sand`, `plum`, `moss`, `coral`, `dune`, `ocean`, `rose`): 1400px+

### 5. Grid compositions

**Two-column layout:**
```css
.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--s-rail-gap);
  max-width: var(--s-content-max);
}
```

**Sidebar layout:**
```css
.sidebar-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: var(--s-rail-gap);
  min-height: 100dvh;
}
```

**Card grid:**
```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--s-rail-gap);
}
```

### 5. Responsive strategy

Use fluid spacing that scales with the viewport, and semantic breakpoints:

```css
.section {
  padding-block: var(--s-spacing-6);
}

@media (min-width: 768px) {
  .section {
    padding-block: var(--s-spacing-8);
  }
}

@media (min-width: 1024px) {
  .section {
    padding-block: var(--s-spacing-9);
  }
}
```

## Rules

1. **Use `SigilFrame` / `SigilPageGrid` for structural pages** — it creates the `data-layout="sigil-content"` origin that sections and dividers measure from.
2. **Snap page bands to full cells** — `SigilSection` and horizontal `Divider` boundaries must land on full resolved `--s-grid-cell` intervals, never half-cell intervals.
3. **Do not add `+1px` to divider heights** — divider layout height is exactly `N * var(--s-grid-cell)`; visual strokes live inside/outside via paint, not layout.
4. **Keep content centered when snapping** — split snap padding across top/bottom; put fractional remainder on the bottom so total height stays exact.
5. **Use `Divider size="md"` between sections** — it represents one full structural cell. Avoid `sm` between page sections unless intentionally breaking the major rhythm.
6. **Never hardcode section spacing** — use `var(--s-grid-cell)` multiples or established section tokens for outer rhythm.
7. **Use fractional cell values only inside components** — `G / 2`, `G / 3`, `G / 4` are fine for labels, button gaps, and local stacks, not for section boundaries.
8. **Card radius from tokens** — cards should use `var(--s-card-radius)`, not `var(--s-radius-md)`.
9. **Sections stack vertically** — use flexbox column or plain block flow, not grid, for section stacking.
10. **Grid for card layouts** — use CSS Grid with `auto-fill`/`auto-fit` for responsive card grids.
11. **Full-bleed sections** — for edge-to-edge backgrounds, use a full-width wrapper with a centered inner container.

## Structural Rhythm Verification

When touching `SigilPageGrid`, `SigilSection`, `Divider`, `SigilGutter`, section
padding tokens, or divider thickness tokens, verify in a real browser:

```bash
# with the web app running
node scripts/audit-grid-alignment.mjs --base=http://localhost:3000
```

The audit measures the resolved browser pixel height of `--s-grid-cell` and
checks every `[data-slot="sigilsection"]` and `[data-slot="divider"]` boundary.

Preferred page API:

```tsx
<SigilPage rhythm="locked" chrome="rails">
  <SigilSection>...</SigilSection>
  <SigilDivider />
</SigilPage>

<SigilPage rhythm="hairline" chrome="minimal">
  <SigilSection>...</SigilSection>
  <Hairline />
</SigilPage>
```

Use `SigilSectionHeader`, `SigilActionRow`, `SigilStack`, and `SigilMonoBlock`
instead of page-local `grid` maps or repeated inline rhythm styles.

Debugging order:

1. Confirm the live DOM includes `[data-layout="sigil-content"]`. If not, rebuild
   `packages/components/dist` or start the package watcher.
2. Confirm `@sigil-ui/components`, `@sigil-ui/presets`, and `@sigil-ui/tokens`
   are rebuilt; `apps/web` imports built package entries.
3. If numeric boundaries pass but the screenshot is 1px off, inspect paint
   geometry (`border-top` paints inside the box). Fix visual stroke placement,
   not layout height.
4. If snap padding toggles on/off, measure base geometry by subtracting the
   previous snap padding before computing the next snap.

## Examples

### Dashboard shell

```tsx
function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SigilPage rhythm="locked" chrome="rails">
      <SigilSection space="normal">
        {children}
      </SigilSection>
    </SigilPage>
  );
}
```

### Full-bleed hero with contained content

```tsx
function Hero() {
  return (
    <SigilPage rhythm="locked" chrome="rails">
      <SigilSection space="hero">
        <SigilSectionHeader
          label="Sigil UI"
          heading="Structural-visibility design system."
          description="Rails, dividers, and section snap are handled by Sigil."
        />
      </SigilSection>
    </SigilPage>
  );
}
```
