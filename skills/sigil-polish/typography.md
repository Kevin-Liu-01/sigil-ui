# Typography

Typography rendering details that make Sigil interfaces feel better. All font families come from `var(--s-font-*)` tokens — never hardcode font names.

## Text Wrapping

### text-wrap: balance

Distributes text evenly across lines, preventing orphaned words on headings and short text blocks. **Only works on blocks of 6 lines or fewer** (Chromium) or 10 lines or fewer (Firefox) — the balancing algorithm is computationally expensive, so browsers limit it to short text.

```css
/* Good — even line lengths on short text */
h1, h2, h3 {
  text-wrap: balance;
}
```

```css
/* Bad — balance on long paragraphs (silently ignored, wastes intent) */
.article-body p {
  text-wrap: balance;
}
```

**Tailwind:** `text-balance`

### text-wrap: pretty

Optimizes the last line to avoid orphans using a slower algorithm that favors better typography over performance. Unlike `balance`, it works on longer text — use this for body copy where you want to minimize orphans without the 6-line limit.

```css
p {
  text-wrap: pretty;
}
```

### When to Use Which

| Scenario | Use |
| --- | --- |
| Headings, titles, short text (≤6 lines) | `text-wrap: balance` |
| Body paragraphs, descriptions | `text-wrap: pretty` |
| Code blocks, pre-formatted text | Neither — leave default |

## Font Smoothing (macOS)

On macOS, text renders heavier than intended by default. Sigil sets antialiased smoothing globally — never override it.

```css
html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

```tsx
// Tailwind — apply to root layout
<html className="antialiased">
```

**Rule:** Applied once at the root. Never per-element, never overridden to `auto`.

## Tabular Numbers

When numbers update dynamically (counters, prices, timers, table columns), use tabular-nums to make all digits equal width. This prevents layout shift as values change.

```css
.counter {
  font-variant-numeric: tabular-nums;
}
```

```tsx
// Tailwind
<span className="tabular-nums">{count}</span>
```

### When to Use

| Use tabular-nums | Don't use tabular-nums |
| --- | --- |
| Counters and timers | Static display numbers |
| Prices that update | Decorative large numbers |
| Table columns with numbers | Phone numbers, zip codes |
| Animated number transitions | Version numbers (v2.1.0) |
| Scoreboards, dashboards | |

### Caveat

Some fonts change the visual appearance of numerals with this property — specifically, the digit `1` becomes wider and centered. This is expected behavior and usually desirable for alignment, but verify it looks right with the active preset's font stack.

## Font Stack Rules (Sigil-Specific)

Sigil uses a font triad: display face for headlines only, body face for everything else, mono for code/labels/data. These are controlled by tokens:

- `var(--s-font-display)` — Headlines and hero text only
- `var(--s-font-body)` — Body text, UI labels, descriptions
- `var(--s-font-mono)` — Code blocks, data values, technical labels

Do not let all three compete equally in a single view. The display face is an accent; overusing it dilutes its impact.
