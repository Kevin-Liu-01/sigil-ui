---
name: sigil-layout
trigger: when composing page layouts, sections, or grid structures using Sigil UI
---

# Sigil Layout

> Compose page layouts using Sigil's grid system, rail components, and structural-visibility primitives.

## When to Use

- User asks to build a page layout, section, or screen
- User says "layout", "page structure", "grid", "compose a page"
- User wants to use sigil-grid, sigil-rail, or sigil-cross components
- User is building a landing page, dashboard, docs layout, or app shell

## How to Use

### 1. Core layout primitives

Sigil provides three structural-visibility primitives:

| Component        | Purpose                                   | Token Namespace     |
|-----------------|-------------------------------------------|---------------------|
| `SigilGrid`   | Background grid pattern (dot/line/cross)  | `--s-grid-*`  |
| `SigilCross`  | Crosshair alignment markers               | `--s-cross-*` |
| `SigilRail`   | Vertical/horizontal rails for alignment   | `--s-rail-*`  |

### 2. Page layout pattern

```tsx
import { SigilGrid, SigilRail, SigilCard } from "@sigil-ui/components";

export function LandingPage() {
  return (
    <SigilGrid>
      <SigilRail>
        <section className="hero">
          <h1>Title</h1>
          <p>Subtitle</p>
        </section>

        <section className="features">
          <SigilCard>Feature 1</SigilCard>
          <SigilCard>Feature 2</SigilCard>
          <SigilCard>Feature 3</SigilCard>
        </section>
      </SigilRail>
    </SigilGrid>
  );
}
```

### 3. Content width and spacing

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

### 4. Grid compositions

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
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <nav>{/* sidebar nav */}</nav>
      </aside>
      <main className="dashboard-main">
        <SigilGrid opacity={0.3}>
          <SigilRail>{children}</SigilRail>
        </SigilGrid>
      </main>
    </div>
  );
}
```

### Full-bleed hero with contained content

```tsx
function Hero() {
  return (
    <section className="hero-bleed">
      <SigilGrid>
        <div className="hero-content">
          <h1>Sigil UI</h1>
          <p>Structural-visibility design system</p>
        </div>
      </SigilGrid>
    </section>
  );
}
```

```css
.hero-bleed {
  width: 100%;
  min-height: 100dvh;
  display: flex;
  align-items: center;
}

.hero-content {
  max-width: var(--s-content-max);
  margin-inline: auto;
  padding-inline: var(--s-spacing-4);
}
```
