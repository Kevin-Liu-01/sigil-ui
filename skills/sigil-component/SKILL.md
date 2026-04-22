---
name: sigil-component
trigger: when creating, modifying, or reviewing a Sigil UI component
---

# Sigil Component

> Create and modify React components that consume Sigil design tokens via CSS custom properties.

## When to Use

- User asks to create a new Sigil UI component
- User asks to modify an existing component in `packages/components/`
- User says "add a component", "create component", "build a button/card/input"
- User asks to style a component using Sigil tokens
- User wants to add a component to the CLI registry

## How to Use

### 1. Understand the component structure

Every Sigil component lives in `packages/components/src/` and follows this pattern:

```tsx
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { clsx } from "clsx";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "sigil-button",
          `sigil-button--${variant}`,
          `sigil-button--${size}`,
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
```

### 2. Token consumption rules

Components consume tokens exclusively through CSS custom properties. Never hardcode colors, spacing, or typography values.

```css
.sigil-button {
  font-family: var(--sigil-font-body);
  background: var(--sigil-primary);
  color: var(--sigil-text-light);
  border-radius: var(--sigil-radius-md);
  padding: var(--sigil-spacing-2) var(--sigil-spacing-4);
  box-shadow: var(--sigil-shadow-sm);
  transition-duration: var(--sigil-duration-fast);
  transition-timing-function: var(--sigil-easing-default);
}
```

### 3. Register in CLI

After creating a component, add it to `packages/cli/src/utils/registry.ts`:

```ts
"my-component": {
  name: "my-component",
  files: ["my-component.tsx"],
  dependencies: [],          // npm deps like @radix-ui/*
  devDependencies: [],
  registryDependencies: [],  // other sigil components this depends on
},
```

### 4. Export from barrel

Add to `packages/components/src/index.ts`:

```ts
export { MyComponent } from "./my-component.js";
```

## Rules

1. **Always use `forwardRef`** — every component must forward refs for composition.
2. **Always accept `className`** — merge with `clsx(internalClasses, className)` so consumers can extend.
3. **Never import token values directly** — use CSS custom properties (`var(--sigil-*)`).
4. **Use semantic class names** — prefix with `sigil-` (e.g., `sigil-card`, `sigil-button--ghost`).
5. **Props over classes** — expose variant/size/intent as typed props, map to class names internally.
6. **Slot pattern** — use `@radix-ui/react-slot` with an `asChild` prop when the component should render as a different element.
7. **No inline styles for tokens** — all token-dependent styling goes through CSS classes that reference custom properties.
8. **All colors in OKLCH** — the token system uses OKLCH exclusively. Never use hex/rgb/hsl in component CSS.
9. **Respect motion tokens** — all transitions use `--sigil-duration-*` and `--sigil-easing-*`.
10. **Barrel export** — every component must be exported from `packages/components/src/index.ts`.

## Examples

### Creating a Badge component

```tsx
// packages/components/src/badge.tsx
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { clsx } from "clsx";

type BadgeProps = ComponentPropsWithoutRef<"span"> & {
  variant?: "default" | "success" | "warning" | "error" | "info";
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx("sigil-badge", `sigil-badge--${variant}`, className)}
        {...props}
      >
        {children}
      </span>
    );
  },
);

Badge.displayName = "Badge";
```

### Sigil-specific components

The `sigil-grid`, `sigil-cross`, and `sigil-rail` components use tokens from the `sigil` namespace:

```css
.sigil-grid {
  --cell: var(--sigil-grid-cell);
  background-size: var(--cell) var(--cell);
}

.sigil-cross {
  --arm: var(--sigil-cross-arm);
  --stroke: var(--sigil-cross-stroke);
}
```
