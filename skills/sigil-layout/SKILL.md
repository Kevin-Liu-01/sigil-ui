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

1. **Always use SigilGrid as the outermost wrapper** for pages that show the structural grid pattern.
2. **Use SigilRail for content alignment** — it centers content within `--s-content-max` and applies `--s-rail-gap`.
3. **Never hardcode spacing** — use `var(--s-spacing-N)` where N is the index into the spacing scale (0-indexed).
4. **Card radius from tokens** — cards should use `var(--s-card-radius)`, not `var(--s-radius-md)`.
5. **Sections stack vertically** — use flexbox column or plain block flow, not grid, for section stacking.
6. **Grid for card layouts** — use CSS Grid with `auto-fill`/`auto-fit` for responsive card grids.
7. **Gap from rail-gap** — inter-component spacing should use `--s-rail-gap` for consistency with the grid system.
8. **Dark mode via class** — use `.dark` on `<html>` or a parent. Tokens auto-switch via `var(--s-background-light)` / `var(--s-background-dark)`.
9. **Full-bleed sections** — for edge-to-edge backgrounds, use a full-width wrapper with a centered inner container.
10. **Min-height patterns** — hero sections should be `min-height: 100dvh`, card sections should be `min-height: auto`.

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
