---
name: sigil-migration
trigger: when migrating from shadcn/ui to Sigil UI
---

# Sigil Migration

> Migrate a project from shadcn/ui to Sigil UI while preserving functionality and improving design coherence.

## When to Use

- User asks to migrate from shadcn to Sigil
- User says "replace shadcn", "switch to sigil", "migrate"
- User has a shadcn-based project and wants Sigil's token system
- User wants to gradually adopt Sigil alongside existing shadcn components

## How to Use

### 1. Assessment

Before migrating, audit the existing project:

```bash
# Count shadcn components in use
ls src/components/ui/

# Check for shadcn config
cat components.json

# Find all shadcn token references (cn, cva, class-variance-authority)
rg "from.*class-variance-authority" --files-with-matches
rg "from.*@/lib/utils" --files-with-matches
```

### 2. Migration strategy

Choose one:

**A. Full swap** — replace all shadcn components at once. Best for small projects (<10 components).

**B. Incremental** — migrate one component at a time. Both systems coexist. Best for large projects.

**C. Tokens-only** — keep shadcn components but replace the CSS variable layer with Sigil tokens. Fastest path.

### 3. Token mapping

Map shadcn CSS variables to Sigil equivalents:

| shadcn variable              | Sigil variable                    |
|-----------------------------|-------------------------------------|
| `--background`              | `--sigil-background-light/dark`   |
| `--foreground`              | `--sigil-text-light/dark`         |
| `--card`                    | `--sigil-surface-light/dark`      |
| `--card-foreground`         | `--sigil-text-light/dark`         |
| `--primary`                 | `--sigil-primary`                 |
| `--primary-foreground`      | (compute: white/black based on L)   |
| `--secondary`               | `--sigil-secondary`               |
| `--muted`                   | `--sigil-surface-light/dark`      |
| `--muted-foreground`        | `--sigil-text-muted-light/dark`   |
| `--accent`                  | `--sigil-primary-muted`           |
| `--destructive`             | `--sigil-error`                   |
| `--border`                  | `--sigil-border-light/dark`       |
| `--input`                   | `--sigil-border-light/dark`       |
| `--ring`                    | `--sigil-border-interactive`      |
| `--radius`                  | `--sigil-radius-md`               |

### 4. Step-by-step migration

#### Step 1: Initialize Sigil

```bash
pnpm add @sigil-ui/tokens @sigil-ui/cli
npx @sigil-ui/cli convert
```

#### Step 2: Create compatibility layer

Create `src/styles/shadcn-compat.css` to bridge shadcn variables to Sigil tokens:

```css
:root {
  --background: var(--sigil-background-light);
  --foreground: var(--sigil-text-light);
  --card: var(--sigil-surface-light);
  --card-foreground: var(--sigil-text-light);
  --primary: var(--sigil-primary);
  --primary-foreground: oklch(1 0 0);
  --secondary: var(--sigil-secondary);
  --muted: var(--sigil-surface-light);
  --muted-foreground: var(--sigil-text-muted-light);
  --accent: var(--sigil-primary-muted);
  --destructive: var(--sigil-error);
  --border: var(--sigil-border-light);
  --input: var(--sigil-border-light);
  --ring: var(--sigil-border-interactive-light);
  --radius: var(--sigil-radius-md);
}

.dark {
  --background: var(--sigil-background-dark);
  --foreground: var(--sigil-text-dark);
  --card: var(--sigil-surface-dark);
  --card-foreground: var(--sigil-text-dark);
  --muted: var(--sigil-surface-dark);
  --muted-foreground: var(--sigil-text-muted-dark);
  --border: var(--sigil-border-dark);
  --input: var(--sigil-border-dark);
  --ring: var(--sigil-border-interactive-dark);
}
```

#### Step 3: Migrate components individually

For each shadcn component:

1. Copy the Sigil version: `npx @sigil-ui/cli add button`
2. Update imports in consuming code
3. Remove the old shadcn component file
4. Test

#### Step 4: Remove shadcn artifacts

```bash
# Remove shadcn config
rm components.json

# Remove class-variance-authority if no longer used
pnpm remove class-variance-authority

# Remove shadcn utils if replaced
# (check that cn() calls are replaced with clsx())
```

#### Step 5: Remove compatibility layer

Once all components are migrated, delete `shadcn-compat.css` and remove the import.

### 5. Utility function migration

Replace shadcn's `cn()` with Sigil's approach:

```ts
// shadcn: uses clsx + tailwind-merge
import { cn } from "@/lib/utils";

// sigil: uses clsx directly (Sigil uses BEM-style classes, not Tailwind)
import { clsx } from "clsx";
```

If the project uses Tailwind alongside Sigil, keep `tailwind-merge`. If not, `clsx` alone is sufficient.

## Rules

1. **Never delete components.json before all components are migrated** — it's the source of truth for shadcn.
2. **Migrate one component at a time** for large projects — verify each before moving on.
3. **Keep the compat layer until fully migrated** — it prevents visual regressions during transition.
4. **Test dark mode after each component** — the theming model is different (Sigil uses light/dark sub-tokens).
5. **Don't mix token systems** — a component should use either shadcn vars or Sigil vars, not both.
6. **Replace HSL with OKLCH** — shadcn uses HSL, Sigil uses OKLCH. Convert when migrating custom colors.
7. **Check Radix deps** — both systems use Radix. Verify version compatibility before migrating.
8. **Run `sigil doctor` after migration** — validates token consistency and dependency health.
9. **Preserve custom shadcn variants** — if the user added custom variants to shadcn components, replicate them as Sigil props.
10. **Update Tailwind config** — if using Tailwind, switch from shadcn's cssVariables to Sigil's `@import "@sigil-ui/tokens/tailwind"`.

## Examples

### Quick tokens-only migration

For projects that just want Sigil's color system without changing components:

```bash
npx @sigil-ui/cli convert --preset sigil --yes
```

Then add the compat layer and import it before shadcn's globals:

```css
@import "./sigil.tokens.css";
@import "./shadcn-compat.css";
@import "./globals.css";
```

All shadcn components now consume Sigil tokens through the variable bridge.

### Converting a shadcn Button to Sigil

Before (shadcn):
```tsx
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
```

After (Sigil):
```tsx
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={clsx(
          "sigil-button",
          `sigil-button--${variant}`,
          `sigil-button--${size}`,
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
```
