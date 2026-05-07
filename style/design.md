# Design & Animation Guide

Conventions for motion and interaction design in Sigil UI. Read [style.md](style.md)
for engineering principles and [ux-principles.md](ux-principles.md) for product-level UX rules.

Based on [Emil Kowalski](https://emilkowal.ski)'s design engineering philosophy.
Full skill: `skills/sigil-polish/SKILL.md`. Canonical resource: [animations.dev](https://animations.dev).

## Animation Decision Framework

Before writing any animation, answer these questions in order.

### 1. Should this animate at all?

| Frequency | Decision |
|-----------|----------|
| 100+ times/day (keyboard shortcuts, command palette toggle) | No animation. Ever. |
| Tens of times/day (hover effects, list navigation) | Remove or drastically reduce |
| Occasional (modals, drawers, toasts) | Standard animation |
| Rare/first-time (onboarding, celebrations) | Can add delight |

Never animate keyboard-initiated actions. Raycast has no open/close animation --
that is the optimal experience for something used hundreds of times a day.

If the purpose is just "it looks cool" and the user will see it often, don't animate.

### 2. What easing?

```
Entering or exiting viewport? -> ease-out
Moving/morphing on screen? -> ease-in-out
Hover/color change? -> ease
Constant motion (marquee, progress)? -> linear
Default -> ease-out
```

**Use custom curves.** Built-in CSS easings lack punch. In Sigil, these are tokens:

```css
--s-ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--s-ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
--s-ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);  /* iOS-like, from Ionic */
```

**Never use `ease-in` for UI animations.** It starts slow, making the interface feel
sluggish. A dropdown with `ease-in` at 300ms _feels_ slower than `ease-out` at 300ms
because it delays movement at the exact moment the user is watching most closely.

Reference: [easing.dev](https://easing.dev/), [easings.co](https://easings.co/).

### 3. How fast?

| Element | Duration | Sigil Token |
|---------|----------|-------------|
| Button press feedback | 100-160ms | `--s-duration-fast` |
| Tooltips, small popovers | 125-200ms | `--s-duration-fast` |
| Dropdowns, selects | 150-250ms | `--s-duration-normal` |
| Modals, drawers | 200-500ms | `--s-duration-slow` |
| Marketing/explanatory | Can be longer | -- |

**UI animations stay under 300ms.** Larger elements animate slower. Exit animations
can be ~20% faster than entrance. Match duration to distance.

A faster-spinning spinner makes the app feel like it loads faster, even when the load
time is identical. Perceived performance matters as much as actual performance.

## Component Rules

### 1. Scale buttons on press

```css
.sigil-button {
  transition: transform 160ms var(--s-ease-out);
}
.sigil-button:active {
  transform: scale(0.97);
}
```

Any pressable element. Scale 0.95-0.98. Instant feedback that the interface heard the user.

### 2. Never animate from scale(0)

Nothing in the real world appears from nothing. Start from `scale(0.95)` with `opacity: 0`.

```css
/* Bad */
.entering { transform: scale(0); }

/* Good */
.entering { transform: scale(0.95); opacity: 0; }
```

### 3. Origin-aware popovers

Popovers scale from their trigger, not from center. Set `transform-origin` to the
trigger's position. **Exception: modals stay centered.**

```css
/* Radix UI */
.popover { transform-origin: var(--radix-popover-content-transform-origin); }

/* Base UI */
.popover { transform-origin: var(--transform-origin); }
```

### 4. Skip tooltip delay on subsequent hovers

Once one tooltip is open, adjacent tooltips open instantly with no animation:

```css
.tooltip[data-instant] { transition-duration: 0ms; }
```

### 5. CSS transitions over keyframes for dynamic UI

CSS transitions can be interrupted and retargeted mid-animation. Keyframes restart
from zero. For anything triggered rapidly (toasts, toggles, state changes), transitions
produce smoother results.

### 6. Blur to mask crossfade imperfections

When a crossfade feels off despite tuning easing and duration, add `filter: blur(2px)`
during the transition. Keep under 20px. Heavy blur is expensive in Safari.

### 7. Asymmetric enter/exit timing

Press slow when deliberate (hold-to-delete: 2s linear). Release always snappy (200ms
ease-out). Enters are staggered (60-100ms between sections). Exits are faster than
enters (150ms exit vs 300ms enter).

### 8. Stagger animations

30-80ms between items. Never block interaction while stagger is playing.

```css
.item { animation: fadeIn 300ms var(--s-ease-out) forwards; }
.item:nth-child(1) { animation-delay: 0ms; }
.item:nth-child(2) { animation-delay: 50ms; }
.item:nth-child(3) { animation-delay: 100ms; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### 9. Use @starting-style for entry animations

Modern CSS replaces the `useEffect` + `setMounted(true)` pattern:

```css
.toast {
  opacity: 1; transform: translateY(0);
  transition: opacity 400ms ease, transform 400ms ease;
  @starting-style { opacity: 0; transform: translateY(100%); }
}
```

## Spring Animations

Springs feel more natural because they simulate real physics. No fixed duration --
they settle based on physical parameters.

When to use: drag interactions with momentum, elements that feel "alive" (Dynamic
Island), gestures that can be interrupted, decorative mouse-tracking.

```jsx
// Apple approach (recommended -- easier to reason about)
{ type: "spring", duration: 0.5, bounce: 0.2 }

// Traditional physics (more control)
{ type: "spring", mass: 1, stiffness: 100, damping: 10 }
```

Keep bounce subtle (0.1-0.3). Avoid bounce in most UI contexts. Springs maintain
velocity when interrupted -- CSS animations and keyframes restart from zero.

### Spring-based mouse interactions

Use `useSpring` from Motion to interpolate value changes instead of updating directly:

```jsx
// Without spring: feels artificial
const rotation = mouseX * 0.1;

// With spring: feels natural, has momentum
const springRotation = useSpring(mouseX * 0.1, { stiffness: 100, damping: 10 });
```

## Gesture Rules

- **Momentum-based dismissal**: calculate velocity (`distance / time`). If > 0.11, dismiss.
- **Damping at boundaries**: more drag past edge = less movement. No hard stops.
- **Pointer capture**: `setPointerCapture` once dragging starts.
- **Multi-touch protection**: ignore additional touch points after initial drag.
- **Friction over walls**: allow drag past boundary with increasing resistance.

## clip-path Techniques

`clip-path: inset(top right bottom left)` is one of the most powerful animation tools:

- **Hold-to-delete**: `inset(0 100% 0 0)` overlay, transition to `inset(0 0 0 0)` over 2s on `:active`
- **Tab color transitions**: duplicate tab list, clip the active-styled copy
- **Image reveals**: `inset(0 0 100% 0)` -> `inset(0 0 0 0)` on scroll via IntersectionObserver
- **Comparison sliders**: clip top image, adjust right inset on drag

## Performance Rules

### Only animate transform and opacity

These skip layout and paint, running on the GPU. Animating `padding`, `margin`,
`height`, or `width` triggers all three rendering steps.

### Framer Motion hardware acceleration caveat

Motion's shorthand properties (`x`, `y`, `scale`) are NOT hardware-accelerated.
They use `requestAnimationFrame` on the main thread. For GPU acceleration:

```jsx
// NOT hardware accelerated (drops frames under load)
<motion.div animate={{ x: 100 }} />

// Hardware accelerated (stays smooth when main thread is busy)
<motion.div animate={{ transform: "translateX(100px)" }} />
```

### CSS animations beat JS under load

CSS animations run off the main thread. Use CSS for predetermined animations,
JS for dynamic/interruptible ones. WAAPI (`element.animate()`) gives JS control
with CSS performance.

### Don't animate CSS variables on parents

Changing a CSS variable on a parent recalculates styles for all children. In a
drawer with many items, update `transform` directly on the element, not
`--swipe-amount` on the container.

## Accessibility

### prefers-reduced-motion

Reduced motion means fewer and gentler animations, not zero. Keep opacity and color
transitions. Remove movement and position animations.

```css
@media (prefers-reduced-motion: reduce) {
  .element { animation: fade 0.2s ease; }
}
```

### Touch device hover states

Gate hover animations behind `@media (hover: hover) and (pointer: fine)`. Touch
devices trigger hover on tap, causing false positives.

### Minimum touch targets

44px minimum hit area on all interactive elements. Use pseudo-elements if the
visual element is smaller.

## Review Checklist

When reviewing animation code in Sigil components, check for:

| Issue | Fix |
|-------|-----|
| `transition: all` | Specify exact properties: `transition: transform 200ms var(--s-ease-out)` |
| `scale(0)` entry animation | Start from `scale(0.95)` with `opacity: 0` |
| `ease-in` on UI element | Switch to `ease-out` or custom curve from tokens |
| `transform-origin: center` on popover | Set to trigger location (modals exempt) |
| Animation on keyboard action | Remove animation entirely |
| Duration > 300ms on UI element | Reduce to 150-250ms via `--s-duration-fast`/`--s-duration-normal` |
| Hover animation without media query | Add `@media (hover: hover) and (pointer: fine)` |
| Keyframes on rapidly-triggered element | Use CSS transitions for interruptibility |
| Framer Motion `x`/`y` props under load | Use `transform: "translateX()"` for GPU |
| Same enter/exit transition speed | Make exit ~20% faster than enter |
| Elements all appear at once | Add stagger delay (30-80ms between items) |
| Hardcoded duration | Use `--s-duration-*` token |
| Hardcoded easing | Use `--s-ease-*` token |

## Sigil Token Integration

Every motion value in a Sigil component must come from a token:

| Property | Token | Banned |
|----------|-------|--------|
| Duration | `duration-[var(--s-duration-*)]` | `duration-150`, `duration-200` |
| Easing | `var(--s-ease-*)` | Hardcoded `cubic-bezier(...)` in components |
| Shadow (hover) | `shadow-[var(--s-shadow-*)]` | `shadow-sm`, `shadow-md` |

Easings and durations live in the preset so the entire motion personality changes
with one preset swap. A `restrained` preset uses shorter durations and subtle easings.
A `theatrical` preset uses longer durations and springier curves. The components
don't change -- only the tokens do.

## The Sonner Principles

From Emil Kowalski's work building Sonner (13M+ weekly npm downloads):

1. **Developer experience is key.** No hooks, no context, no setup. Insert once, call anywhere.
2. **Good defaults matter more than options.** Ship beautiful out of the box.
3. **Handle edge cases invisibly.** Pause timers on hidden tabs. Fill gaps in stacks.
4. **Match motion to mood.** Playful = bouncier. Professional dashboard = crisp and fast.
5. **Review animations the next day.** Fresh eyes catch timing issues invisible during development.

## Compound Effects

These rules compound. A button that scales on press, with custom ease-out, at 150ms,
origin-aware, with staggered siblings, feels dramatically better than one with
`transition: all 0.3s ease`. The individual improvements are subtle; the aggregate is not.

> "All those unseen details combine to produce something that's just stunning, like a
> thousand barely audible voices all singing in tune." — Paul Graham
