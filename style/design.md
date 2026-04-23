# Design & Animation Guide

Conventions for motion and interaction design in Sigil UI. Read [style.md](style.md)
for engineering principles and [ux-principles.md](ux-principles.md) for product-level UX rules.

Heavily inspired by [Emil Kowalski](https://emilkowal.ski)'s work. If you want to go deeper,
[animations.dev](https://animations.dev) is the canonical resource.

## When to Animate

Every animation must have a purpose. Before adding motion, ask: what does this animation
communicate that the static version cannot?

Valid purposes:

- **Feedback**: confirming a user action (button press, form submit, copy-to-clipboard).
- **Spatial consistency**: showing where something came from and where it goes.
- **Explanation**: illustrating how a feature works (onboarding, marketing).
- **Delight**: making an interaction memorable, but only if it's infrequent.

If an animation has no purpose, delete it.

## When Not to Animate

Sometimes the best animation is no animation.

- **High-frequency interactions**: anything triggered tens or hundreds of times a day (command
  palettes, keyboard navigation, list selection) should have zero animation. The user has a goal;
  motion becomes friction.
- **Keyboard-initiated actions**: arrow key navigation, hotkey commands. These are repeated rapidly;
  even 100ms of transition makes them feel laggy and disconnected.
- **Daily-driver hover effects**: if users hover the same element dozens of times a day, skip the
  transition. Initial delight fades into annoyance.

The litmus test: will the user see this animation more than ~10 times per session? If yes, make it
instant or remove it entirely.

## Speed

UI animations stay under 300ms. Faster motion improves perceived performance even when actual
latency is unchanged.

Prefer 150-200ms for interactive elements (dropdowns, selects, tooltips). Reserve 250-300ms for
larger transitions (page changes, modals, morphing components).

In Sigil, all durations come from tokens:
- `var(--s-duration-fast)` — 150ms, interactive elements
- `var(--s-duration-normal)` — 200ms, standard transitions
- `var(--s-duration-slow)` — 300ms, larger movements

Never hardcode durations. Use `duration-[var(--s-duration-*)]` in Tailwind.

## Seven Practical Rules

### 1. Scale buttons on press

Add `scale(0.97)` on the `:active` pseudo-class. This tiny compression makes the interface feel
like it's listening. The effect should be instant (no transition on press, optional short
transition on release).

### 2. Never animate from scale(0)

Elements animating from `scale(0)` look like they materialize from nothing. Use `scale(0.93)` or
higher as the initial value. Even a deflated balloon has a visible shape.

### 3. Skip delay on subsequent tooltips

Tooltips need an initial delay to prevent accidental activation. But once *any* tooltip is open,
hovering adjacent tooltips should open them instantly with no animation. Radix and Base UI support
this natively. In Base UI, target `[data-instant]` and set `transition-duration: 0ms`.

### 4. Choose the right easing

Use **ease-out** for elements entering or exiting the screen. It accelerates at the start, which
feels responsive. `ease-in` starts slow and makes identical durations feel sluggish.

Built-in CSS easings (`ease`, `ease-in-out`) are usually too subtle. Use custom cubic-bezier
curves for more energy. Reference: [easings.co](https://easings.co).

### 5. Make animations origin-aware

Popovers, dropdowns, and menus should scale in from their trigger, not from center. Set
`transform-origin` to the trigger's position. The default (`center`) is wrong for almost every
anchored element.

Radix and Base UI expose CSS variables for this:

```css
.radix {
  transform-origin: var(--radix-dropdown-menu-content-transform-origin);
}

.baseui {
  transform-origin: var(--transform-origin);
}
```

### 6. Keep animations fast

Restating for emphasis: under 300ms. A 180ms select animation feels more responsive than 400ms at
identical content. If an animation feels slow, shorten the duration before tweaking the easing.

### 7. Use blur to mask crossfade imperfections

If a crossfade between two states feels off after tuning easing and duration, add `filter: blur(2px)`
during the transition. Blur bridges the visual gap between old and new states, tricking the eye
into seeing a smooth blend instead of two distinct objects.

## Enter/Exit Asymmetry

- **Enters** are chunked and staggered (60-100ms between sections). Combine `opacity`, `blur(4px)`, and `translateY(12px)`.
- **Exits** have reduced travel distance compared to enters. Use `-12px` `translateY`, not the full container height.
- **Exits are faster than enters.** 150ms exit vs 300ms enter. The user's focus is moving to the next thing.

## Compound Effects

These rules compound. A button that scales on press (rule 1), with a custom ease-out (rule 4), at
150ms (rule 6) feels dramatically better than one with a generic `transition: all 0.3s ease`. The
individual improvements are subtle; the aggregate is not.

> "All those unseen details combine to produce something that's just stunning, like a thousand
> barely audible voices all singing in tune." — Paul Graham, *Hackers and Painters*

## Sigil Token Integration

Every motion value in a Sigil component must come from a token:

| Property | Token | Banned |
|----------|-------|--------|
| Duration | `duration-[var(--s-duration-*)]` | `duration-150`, `duration-200` |
| Easing | `var(--s-ease-*)` | Hardcoded `cubic-bezier(...)` in components |
| Shadow (hover) | `shadow-[var(--s-shadow-*)]` | `shadow-sm`, `shadow-md` |

Easings and durations live in the preset so the entire motion personality changes with one preset swap. A `restrained` preset uses shorter durations and subtle easings. A `theatrical` preset uses longer durations and springier curves. The components don't change — only the tokens do.
