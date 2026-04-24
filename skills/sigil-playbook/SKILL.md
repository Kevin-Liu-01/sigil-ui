---
name: sigil-playbook
trigger: when composing full pages, landing pages, dashboards, docs pages, or Sigil UI page structures
---

# Sigil Playbook — The Page Composition Skill

> Read this before building any page in the Sigil aesthetic.

The Sigil Playbook codifies the small vocabulary of structural patterns
that make any new page "just work." Originating from the Reticle design
language (Dedalus monorepo), these 10 rules — 6 compositional moves +
4 supporting patterns — replace dozens of ad-hoc layout decisions.

## Quick Reference: The 10 Rules

| # | Rule | Component | What It Does |
|---|------|-----------|-------------|
| 1 | Gap-Pixel Grid | `GapPixelGrid` + `GapPixelCell` | Hairline-divided cells via `gap-px` + `bg-[var(--s-border)]` |
| 2 | Mono-Uppercase Label | `MonoLabel` | `font-mono text-[10px] uppercase tracking-[0.2em]` for all chrome |
| 3 | Section Border Stack | `BorderStack` | Sections separated by `border-t`, not spacing or shadows |
| 4 | Accent Singleton | `AccentCTA` + `AccentActive` | One color breaks monochrome: primary fill + glow hover |
| 5 | Tabular-Nums | `TabularValue` | `font-mono tabular-nums` for prices, metrics, dates |
| 6 | Featured-Plus-Grid | `FeaturedGrid` | Hero item `2fr` + side `1fr`, then `gap-px` grid below |
| 7 | Density DNA | `DensityText` | Type scale: chrome 10px → body 14px → headline 2xl+ |
| 8 | Frosted Panel | `FrostedPanel` | Drawers/navbars: `bg/80 + backdrop-blur-lg` with edge border |
| 9 | Card Cell | `CardCell` | Card for gap-pixel grids: display title, mono footer strip |
| 10 | The Universal Shell | `SigilFrame` (existing) | 5-column grid: margin \| gutter \| content \| gutter \| margin |

## The Universal Shell (Already Exists)

Every page inherits the same skeleton via `SigilFrame`/`SigilPageGrid`:

```
SigilFrame
  SigilPageGrid  [margin | gutter | content (max 1280px) | gutter | margin]
    sticky nav (frosted: bg/80 + backdrop-blur-lg)
    flex-1 content
    footer
```

New pages automatically get visible gutters, margin rails, and the content column.
You never have to think about outer chrome — it's inherited.

## Move 1: The Gap-Pixel Grid

The single most repeated structural pattern. Import `GapPixelGrid` + `GapPixelCell`:

```tsx
import { GapPixelGrid, GapPixelCell } from "@sigil-ui/components";

<GapPixelGrid columns={{ md: 3 }}>
  <GapPixelCell className="p-6">Product Card</GapPixelCell>
  <GapPixelCell className="p-6">Product Card</GapPixelCell>
  <GapPixelCell className="p-6">Product Card</GapPixelCell>
</GapPixelGrid>
```

**How it works:** Parent `bg-[var(--s-border)]` bleeds through `gap-px` as hairline dividers.
Each cell gets `bg-[var(--s-background)]`. One pattern for product cards, pricing cards,
blog cards, data tables, image galleries, and button groups.

## Move 2: The Mono-Uppercase Label

The instrument-label voice. Import `MonoLabel`:

```tsx
import { MonoLabel } from "@sigil-ui/components";

<MonoLabel>Infrastructure</MonoLabel>           // muted eyebrow
<MonoLabel variant="accent">FAQ</MonoLabel>     // primary-colored
<MonoLabel size="sm">Ships Immediately</MonoLabel>
```

**When to use:** Section eyebrows, filter labels, cart headers, announcement bars,
badges, empty states, "No Image" placeholders, "Sold Out" badges, breadcrumb-style nav.

## Move 3: The Section Border Stack

Sections separated by borders, not spacing. Import `BorderStack`:

```tsx
import { BorderStack } from "@sigil-ui/components";

<BorderStack>
  <nav>...</nav>
  <section>Hero</section>
  <section>Features</section>
  <footer>...</footer>
</BorderStack>
```

**Why:** Borders are rhythm, not decoration. The page reads as a vertical stack of bands.

You can also use `SigilSection` with `borderTop`/`borderBottom` props inside a `SigilFrame`.

## Move 4: The Accent Singleton

Exactly one color breaks the monochrome. Import `AccentCTA` and `AccentActive`:

```tsx
import { AccentCTA, AccentActive } from "@sigil-ui/components";

// CTA button with glow
<AccentCTA>Get Started</AccentCTA>
<AccentCTA size="lg" glow>Add to Cart</AccentCTA>

// Active state (selected filter, size, etc.)
<AccentActive active={selectedSize === "M"}>M</AccentActive>
```

**The treatment:**
- CTAs: `bg-[var(--s-primary)]` + `text-[var(--s-primary-contrast)]` + glow hover
- Active: `border-primary/40 bg-primary/10 text-primary`
- Eyebrows: `MonoLabel variant="accent"` for section labels in primary color

## Move 5: Tabular-Nums

Every number that compares to another number. Import `TabularValue`:

```tsx
import { TabularValue } from "@sigil-ui/components";

<TabularValue>$2,400.00</TabularValue>
<TabularValue size="lg">128</TabularValue>
<TabularValue as="time" muted>2024-01-15</TabularValue>
```

**When to use:** Prices, pricing tiers, calculator results, blog dates, cart quantities,
subtotals, metrics, stats. Mono + tabular makes columns align optically.

## Move 6: Featured-Plus-Grid

Hero item in a collection. Import `FeaturedGrid` + `GapPixelCell`:

```tsx
import { FeaturedGrid, GapPixelCell } from "@sigil-ui/components";

<FeaturedGrid columns={3}>
  <GapPixelCell className="p-8">Featured Post (2fr)</GapPixelCell>
  <GapPixelCell className="p-4">Side Post (1fr)</GapPixelCell>
  <GapPixelCell className="p-4">Card 1</GapPixelCell>
  <GapPixelCell className="p-4">Card 2</GapPixelCell>
  <GapPixelCell className="p-4">Card 3</GapPixelCell>
</FeaturedGrid>
```

**Pattern:** First child spans `2fr`, second fills `1fr`. Remaining children flow into
a standard gap-pixel grid below, joined by `marginTop: 1` for continuous hairlines.

## Move 7: Density DNA

The type scale that creates the "dense technical document" feel. Import `DensityText`:

```tsx
import { DensityText } from "@sigil-ui/components";

<DensityText role="chrome">INFRASTRUCTURE</DensityText>  // 10px mono uppercase
<DensityText role="counter">3</DensityText>               // 11px mono
<DensityText role="detail">Add to Cart</DensityText>      // 12px
<DensityText role="nav">Documentation</DensityText>       // 13px
<DensityText role="body">A description paragraph.</DensityText>  // 14px
<DensityText role="headline" as="h2">Build faster</DensityText>  // 2xl+ display
```

| Role | Size | Font | Used For |
|------|------|------|----------|
| `chrome` | 10px | mono, uppercase | Labels, badges, muted chrome, tracking, announcements |
| `counter` | 11px | mono | Quantity counters, small mono |
| `detail` | 12px | body | Cart items, button text, size options |
| `nav` | 13px | body | Nav links, CTA text, accordion titles |
| `body` | 14px | body | Descriptions, secondary copy |
| `base` | 16px | body | Store name, body content |
| `headline` | 2xl+ | display | Only headlines |

## Supporting Patterns

### Frosted Panel

Drawers, sidebars, sticky navbars:

```tsx
import { FrostedPanel } from "@sigil-ui/components";

<FrostedPanel edge="left">Cart sidebar</FrostedPanel>
<FrostedPanel edge="bottom" variant="solid" as="nav">Navbar</FrostedPanel>
```

### Card Cell

Cards designed for gap-pixel grids:

```tsx
import { CardCell, GapPixelGrid } from "@sigil-ui/components";

<GapPixelGrid columns={{ md: 3 }}>
  <CardCell title="Edge Compute" footer={<MonoLabel>12 regions</MonoLabel>}>
    Deploy at the edge with sub-50ms cold starts.
  </CardCell>
</GapPixelGrid>
```

## What Makes a New Page "Just Work"

Building a new page requires zero new design decisions:

| Element | Pattern |
|---------|---------|
| Layout | Inherit the shell via `SigilFrame`. Content at `max-w-[1280px] px-6`. |
| Collections | `GapPixelGrid` with `GapPixelCell`. Period. |
| Cards | `CardCell` inside `GapPixelGrid`: display title, mono footer strip with border-t. |
| Labels | `MonoLabel` — `font-mono text-[10px] uppercase tracking-[0.2em]`. |
| CTAs | `AccentCTA` — primary fill, dark text, glow hover. |
| Active states | `AccentActive` — border/bg/text in primary at low opacity. |
| Drawers/panels | `FrostedPanel` — edge border, frosted or solid bg. |
| Dividers | `border-b border-[var(--s-border)]` between logical groups (or `BorderStack`). |
| Numbers | `TabularValue` — `font-mono tabular-nums`. |
| Empty states | `MonoLabel` centered — mono-uppercase-tracking muted text. |

That's the whole system. Ten rules, any page, one aesthetic.

## Token Variables Used

All playbook components consume standard `--s-*` token variables:

| Variable | Used By |
|----------|---------|
| `--s-border` | GapPixelGrid parent, BorderStack, CardCell footer, FrostedPanel edge |
| `--s-background` | GapPixelCell, CardCell, FrostedPanel |
| `--s-text` / `--s-text-muted` | MonoLabel, DensityText, TabularValue |
| `--s-primary` | AccentCTA fill, AccentActive highlight, MonoLabel accent |
| `--s-primary-contrast` | AccentCTA text color |
| `--s-glow` / `--s-primary` (fallback) | AccentCTA hover glow |
| `--s-font-mono` | MonoLabel, TabularValue, AccentCTA, DensityText chrome/counter |
| `--s-font-display` | CardCell title, DensityText headline |
| `--s-card-padding` | CardCell padding |
| `--s-duration-fast` | AccentCTA, AccentActive transitions |
| `--s-heading-weight` / `--s-heading-tracking` | DensityText headline |

No hardcoded colors, fonts, or spacing. Everything flows from the token system.
Switch presets and every playbook component updates automatically.
