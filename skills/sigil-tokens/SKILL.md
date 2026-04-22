---
name: sigil-tokens
trigger: when editing, extending, or debugging Sigil design tokens
---

# Sigil Tokens

> Edit and extend the Sigil token system — the single source of truth for all design decisions.

## When to Use

- User asks to change a color, font, spacing, or shadow value
- User says "edit tokens", "change primary color", "update spacing"
- User wants to add a new token category or extend existing ones
- User is debugging token output (CSS variables not applying)
- User asks about the token architecture (primitive → semantic → component)

## How to Use

### 1. Token architecture

Sigil uses a three-layer token system:

```
Primitive  → raw values (oklch colors, px sizes, font stacks)
Semantic   → named purpose (primary, surface, text, border)
Component  → specific usage (card-radius, grid-cell, cross-arm)
```

All tokens are defined as TypeScript types in `packages/tokens/src/types.ts` and default values in `packages/tokens/src/tokens.ts`.

### 2. Token categories

| Category     | Type               | CSS Prefix                | Example                          |
|-------------|--------------------|--------------------------|---------------------------------|
| Colors      | `ColorTokens`      | `--sigil-`             | `--sigil-primary`             |
| Typography  | `TypographyTokens` | `--sigil-font-`        | `--sigil-font-display`        |
| Spacing     | `SpacingTokens`    | `--sigil-spacing-`     | `--sigil-spacing-4`           |
| Sigil     | `SigilGridTokens`| `--sigil-`             | `--sigil-grid-cell`           |
| Radius      | `RadiusTokens`     | `--sigil-radius-`      | `--sigil-radius-md`           |
| Shadows     | `ShadowTokens`     | `--sigil-shadow-`      | `--sigil-shadow-lg`           |
| Motion      | `MotionTokens`     | `--sigil-duration-` / `--sigil-easing-` | `--sigil-duration-fast` |
| Borders     | `BorderTokens`     | `--sigil-border-width-`| `--sigil-border-width-thin`   |

### 3. Adding a new token

1. Add the type to `packages/tokens/src/types.ts`:
   ```ts
   export type ZIndexTokens = {
     readonly base: string;
     readonly dropdown: string;
     readonly modal: string;
     readonly toast: string;
   };
   ```

2. Add to `SigilTokens`:
   ```ts
   export type SigilTokens = {
     // ... existing
     readonly zIndex: ZIndexTokens;
   };
   ```

3. Add defaults to `packages/tokens/src/tokens.ts`:
   ```ts
   zIndex: {
     base: "0",
     dropdown: "100",
     modal: "200",
     toast: "300",
   },
   ```

4. Add to every preset in `packages/presets/src/`.

5. Update the CSS compiler to emit the new variables.

### 4. Editing color tokens

All colors use OKLCH. To modify:

```ts
// Cool it down (shift hue toward blue)
primary: "oklch(0.65 0.15 260)",  // was 280

// Make it more vivid (increase chroma)
primary: "oklch(0.65 0.20 280)",  // was 0.15

// Make it lighter
primary: "oklch(0.72 0.15 280)",  // was 0.65
```

OKLCH reference:
- **L** (0–1): lightness. 0 = black, 1 = white.
- **C** (0–0.37): chroma/saturation. 0 = gray.
- **H** (0–360): hue angle. 0=red, 60=yellow, 150=green, 250=blue, 310=pink.

### 5. Themed vs unthemed

Themed tokens have `{ light, dark }` variants:
```ts
background: { light: "oklch(0.99 0 0)", dark: "oklch(0.07 0.01 280)" },
```

Unthemed tokens are a single value:
```ts
primary: "oklch(0.65 0.15 280)",
```

## Rules

1. **OKLCH only** — never use hex, rgb, or hsl in token values.
2. **Readonly types** — all token types use `readonly` to prevent mutation.
3. **All presets in sync** — when adding a token to `types.ts`, update `tokens.ts` AND every preset file.
4. **Spacing is a scale** — spacing values are a 10-element ascending array, not named sizes.
5. **Radius is named** — radius uses t-shirt sizes (sm, md, lg, xl, 2xl) plus `none` and `full`.
6. **Shadow layering** — multi-layer box-shadows for depth realism. Smallest shadow = tightest spread.
7. **Motion uses CSS timing** — durations are ms strings, easings are `cubic-bezier()` strings.
8. **Border widths are strings** — `"1px"`, not `1`. Keeps consistency with other token value types.
9. **No magic numbers** — if a value isn't in the token system, add it as a token before using it.
10. **Test with `sigil doctor`** — after editing tokens, run `sigil doctor` to validate consistency.

## Examples

### Debugging: CSS variable not applying

Check the cascade:
1. Is the token CSS imported? (`@import "@sigil-ui/tokens/css"`)
2. Is the variable name correct? (Check `--sigil-` prefix)
3. Is it a themed token? (May need `.dark` class on root)
4. Is it overridden by a more specific selector?

### Creating a contrast-safe palette

For accessible text on colored backgrounds:
```
Background L=0.98 → Text L=0.15 (ratio ~15:1)
Background L=0.07 → Text L=0.93 (ratio ~14:1)
Primary L=0.65    → White text on primary needs L≥0.95 for 3:1
```
