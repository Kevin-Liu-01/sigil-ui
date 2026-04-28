# @sigil-ui/primitives

Headless behavior primitives for Sigil UI. This package re-exports Radix UI primitives under a unified `*Primitive` naming convention. It provides accessible, unstyled interaction patterns that `@sigil-ui/components` consumes for its styled components.

## Role in the System

```
@sigil-ui/primitives   →  behavior (keyboard, focus, aria, state)
@sigil-ui/tokens       →  appearance (colors, spacing, radius, motion)
@sigil-ui/components   →  combines both into styled, token-driven components
```

Primitives handle the hard accessibility and interaction logic. Tokens handle the visual design. Components wire them together. When an agent wants to change how something looks, it edits tokens. When it wants to change how something behaves, it works with primitives.

## Installation

```bash
pnpm add @sigil-ui/primitives
```

**Peer dependencies:** `react`, `react-dom`

## Included Primitives (28)

| Primitive | Radix Source | Purpose |
|-----------|-------------|---------|
| `AccordionPrimitive` | `@radix-ui/react-accordion` | Collapsible content sections |
| `AlertDialogPrimitive` | `@radix-ui/react-alert-dialog` | Confirmation dialog with required action |
| `AspectRatioPrimitive` | `@radix-ui/react-aspect-ratio` | Constrained aspect ratio container |
| `AvatarPrimitive` | `@radix-ui/react-avatar` | User avatar with fallback |
| `CheckboxPrimitive` | `@radix-ui/react-checkbox` | Checkbox with indeterminate state |
| `CollapsiblePrimitive` | `@radix-ui/react-collapsible` | Expandable/collapsible content |
| `ContextMenuPrimitive` | `@radix-ui/react-context-menu` | Right-click context menus |
| `DialogPrimitive` | `@radix-ui/react-dialog` | Modal dialog with focus trap |
| `DropdownMenuPrimitive` | `@radix-ui/react-dropdown-menu` | Dropdown menus with submenus |
| `HoverCardPrimitive` | `@radix-ui/react-hover-card` | Hover-triggered card popover |
| `LabelPrimitive` | `@radix-ui/react-label` | Accessible form labels |
| `MenubarPrimitive` | `@radix-ui/react-menubar` | Horizontal menu bar with submenus |
| `NavigationMenuPrimitive` | `@radix-ui/react-navigation-menu` | Site navigation with submenus |
| `PopoverPrimitive` | `@radix-ui/react-popover` | Positioned popover content |
| `ProgressPrimitive` | `@radix-ui/react-progress` | Progress bar with aria |
| `RadioGroupPrimitive` | `@radix-ui/react-radio-group` | Radio button group |
| `ScrollAreaPrimitive` | `@radix-ui/react-scroll-area` | Custom scrollbars |
| `SelectPrimitive` | `@radix-ui/react-select` | Select dropdowns |
| `SeparatorPrimitive` | `@radix-ui/react-separator` | Visual/semantic separator |
| `SliderPrimitive` | `@radix-ui/react-slider` | Range slider |
| `Slot` | `@radix-ui/react-slot` | Merges props onto child element |
| `SwitchPrimitive` | `@radix-ui/react-switch` | Toggle switch |
| `TabsPrimitive` | `@radix-ui/react-tabs` | Tab navigation |
| `ToastPrimitive` | `@radix-ui/react-toast` | Timed notification toasts |
| `TogglePrimitive` | `@radix-ui/react-toggle` | Two-state toggle button |
| `ToggleGroupPrimitive` | `@radix-ui/react-toggle-group` | Group of toggle buttons |
| `ToolbarPrimitive` | `@radix-ui/react-toolbar` | Toolbar with buttons, toggles, links |
| `TooltipPrimitive` | `@radix-ui/react-tooltip` | Hover/focus tooltips |

## Usage

```tsx
import { DialogPrimitive, TabsPrimitive } from "@sigil-ui/primitives";
```

Or import a specific primitive:

```tsx
import * as Dialog from "@sigil-ui/primitives";
```

## For AI Agents

- **Do not style primitives directly.** They are unstyled building blocks. Style them through `@sigil-ui/components` which applies token-driven CSS.
- **Use primitives when building new compound components** that need accessibility patterns not covered by existing Sigil components.
- **All interaction behavior lives here** — keyboard navigation, focus management, ARIA attributes, screen reader support.
- **Visual appearance lives in the token layer**, not here.
