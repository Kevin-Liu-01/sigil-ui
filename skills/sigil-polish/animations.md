# Animations

Interruptible animations, enter/exit transitions, and contextual icon animations. All durations come from `var(--s-duration-*)` tokens.

## Interruptible Animations

Users change intent mid-interaction. If animations aren't interruptible, the interface feels broken.

### CSS Transitions vs. Keyframes

| | CSS Transitions | CSS Keyframe Animations |
| --- | --- | --- |
| **Behavior** | Interpolate toward latest state | Run on a fixed timeline |
| **Interruptible** | Yes — retargets mid-animation | No — restarts from beginning |
| **Use for** | Interactive state changes (hover, toggle, open/close) | Staged sequences that run once (enter animations, loading) |
| **Duration** | Adapts to remaining distance | Fixed regardless of state |

```css
/* Good — interruptible transition for a toggle */
.drawer {
  transform: translateX(-100%);
  transition: transform var(--s-duration-normal, 200ms) ease-out;
}
.drawer.open {
  transform: translateX(0);
}
```

```css
/* Bad — keyframe animation for interactive element */
.drawer.open {
  animation: slideIn 200ms ease-out forwards;
}
/* Closing mid-animation snaps or restarts — feels broken */
```

**Rule:** Always prefer CSS transitions for interactive elements. Reserve keyframes for one-shot sequences.

## Enter Animations: Split and Stagger

Don't animate a single large container. Break content into semantic chunks and animate each individually.

### Step by Step

1. **Split** into logical groups (title, description, buttons)
2. **Stagger** with ~100ms delay between groups
3. **For titles**, consider splitting into individual words with ~80ms stagger
4. **Combine** `opacity`, `blur`, and `translateY` for the enter effect

### Motion Example

```tsx
function PageHeader() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      <motion.h1
        variants={{
          hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
      >
        Welcome
      </motion.h1>

      <motion.p
        variants={{
          hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
      >
        A description of the page.
      </motion.p>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
      >
        <Button>Get started</Button>
      </motion.div>
    </motion.div>
  );
}
```

### CSS-Only Stagger

```css
.stagger-item {
  opacity: 0;
  transform: translateY(12px);
  filter: blur(4px);
  animation: fadeInUp 400ms ease-out forwards;
}

.stagger-item:nth-child(1) { animation-delay: 0ms; }
.stagger-item:nth-child(2) { animation-delay: 100ms; }
.stagger-item:nth-child(3) { animation-delay: 200ms; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}
```

## Exit Animations

Exit animations should be softer and less attention-grabbing than enter animations. The user's focus is moving to the next thing — don't fight for attention.

### Subtle Exit (Recommended)

```tsx
<motion.div
  exit={{
    opacity: 0,
    y: -12,
    filter: "blur(4px)",
    transition: { duration: 0.15, ease: "easeIn" },
  }}
>
  {content}
</motion.div>
```

### Full Exit (When Context Matters)

```tsx
// Slide fully out — use when spatial context is important
// (e.g., a card returning to a list, a drawer closing)
<motion.div
  exit={{
    opacity: 0,
    x: "-100%",
    transition: { duration: 0.2, ease: "easeIn" },
  }}
>
  {content}
</motion.div>
```

**Key points:**
- Use a small fixed `translateY` (e.g., `-12px`) instead of the full container height
- Keep some directional movement to indicate where the element went
- Exit duration should be shorter than enter duration (150ms vs 300ms)
- Don't remove exit animations entirely — subtle motion preserves context

## Contextual Icon Animations

When icons appear or disappear contextually (on hover, on state change), animate them with `opacity`, `scale`, and `blur` rather than just toggling visibility.

### Motion Example

```tsx
import { AnimatePresence, motion } from "motion/react";

function IconButton({ isActive, icon: Icon }) {
  return (
    <button>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={isActive ? "active" : "inactive"}
          initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
          transition={{ type: "spring", duration: 0.3, bounce: 0 }}
        >
          <Icon />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
```

### CSS Transition Approach (No Motion)

If the project doesn't use Motion (Framer Motion), keep both icons in the DOM and cross-fade them with CSS transitions. One icon is absolutely positioned on top of the other. Toggling state cross-fades them.

```tsx
function IconButton({ isActive, ActiveIcon, InactiveIcon }) {
  return (
    <button>
      <div className="relative">
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            "transition-[opacity,filter,scale] duration-300",
            "cubic-bezier(0.2, 0, 0, 1)",
            isActive
              ? "scale-100 opacity-100 blur-0"
              : "scale-[0.25] opacity-0 blur-[4px]"
          )}
        >
          <ActiveIcon />
        </div>
        <div
          className={cn(
            "transition-[opacity,filter,scale] duration-300",
            "cubic-bezier(0.2, 0, 0, 1)",
            isActive
              ? "scale-[0.25] opacity-0 blur-[4px]"
              : "scale-100 opacity-100 blur-0"
          )}
        >
          <InactiveIcon />
        </div>
      </div>
    </button>
  );
}
```

### Choosing Between Motion and CSS

| | Motion (Framer Motion) | CSS transitions (both icons in DOM) |
| --- | --- | --- |
| **Enter animation** | Yes | Yes |
| **Exit animation** | Yes (via `AnimatePresence`) | Yes (cross-fade — icon never unmounts) |
| **Spring physics** | Yes | No — use `cubic-bezier(0.2, 0, 0, 1)` as approximation |
| **When to use** | Project already uses `motion/react` | No motion dependency, or keeping bundle small |

**Rule:** Check the project's `package.json` for `motion` or `framer-motion`. If present, use Motion. If not, use the CSS cross-fade pattern — don't add a dependency just for icon transitions.

### Icon Animation Values (Non-Negotiable)

- `scale`: `0.25` → `1` (never use `0.5` or `0.6`)
- `opacity`: `0` → `1`
- `filter`: `"blur(4px)"` → `"blur(0px)"`
- `transition`: `{ type: "spring", duration: 0.3, bounce: 0 }` — **bounce must always be `0`**

## Scale on Press

A subtle scale-down on click gives buttons tactile feedback. Always use `scale(0.96)`. Never use a value smaller than `0.95`. Use CSS transitions for interruptibility.

### Tailwind Example

```tsx
<button className="transition-transform duration-[var(--s-duration-fast)] ease-out active:scale-[0.96]">
  Click me
</button>
```

### Motion Example

```tsx
<motion.button whileTap={{ scale: 0.96 }}>
  Click me
</motion.button>
```

### Static Prop Pattern

```tsx
const tapScale = "active:not-disabled:scale-[0.96]";

function Button({ static: isStatic, className, children, ...props }) {
  return (
    <button
      className={cn(
        "transition-transform duration-[var(--s-duration-fast)] ease-out",
        !isStatic && tapScale,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

## Skip Animation on Page Load

Use `initial={false}` on `AnimatePresence` to prevent enter animations on first render. Elements in their default state shouldn't animate in on page load — only on subsequent state changes.

Works well for: icon swaps, toggles, tabs, segmented controls.

Don't use `initial={false}` when the component relies on its `initial` prop to set up a first-time enter animation, like a staggered page hero. Verify the component still looks right on a full page refresh before applying this.
