# @sigil-ui/components

200+ token-driven components that consume Sigil design tokens via CSS custom properties. These components are the visual output layer — they read from `@sigil-ui/tokens` and render accordingly.

## The Core Principle

**Components are downstream consumers, not the source of truth.** To change how components look, edit the tokens or switch the preset. Do not manually change Tailwind classes or hardcode colors inside component files.

```
Wrong:  open Button.tsx → change "bg-indigo-600" to "bg-emerald-600"
Wrong:  open Card.tsx → add "rounded-2xl" to override the default radius
Right:  change --s-primary to emerald in your token CSS → every primary-colored component updates
Right:  switch to a preset with larger radius → every component's corners update
```

When an agent is asked to "make the buttons green" or "increase the card border radius," it should edit the token layer, not the component files.

## Installation

```bash
pnpm add @sigil-ui/components
```

**Peer dependencies:** `@sigil-ui/tokens`, `react`, `react-dom`

## Component Inventory (300+)

### Layout (9)
`Stack` `Grid` `Section` `Frame` `PageGrid` `Margin` `Gutter` `Divider` `HRule`

### UI (23)
`Button` `Badge` `Card` `Label` `Input` `Textarea` `Select` `Checkbox` `Switch` `Slider` `Progress` `Separator` `Avatar` `Skeleton` `Table` `Tabs` `Accordion` `Tooltip` `ScrollArea` `KPI` `Terminal` `CodeBlock` `LoadingSpinner`

### Navigation (4)
`Navbar` `Footer` `Breadcrumb` `Pagination`

### Overlays (4)
`Dialog` `Popover` `Sheet` `Toast`

### Shapes (5)
`Shape` `Diamond` `Hexagon` `Triangle` `Diagonal`

### 3D (5)
`Box3D` `Box3DGrid` `Card3D` `FloatingUI` `IsometricView`

### Diagrams (6)
`Diagram` `ExplodedView` `FlowDiagram` `Timeline` `ComparisonTable` `ArchitectureDiagram`

### Marketing (6)
`Hero` `FeatureFrame` `Pricing` `CTA` `LogoBar` `TestimonialCard`

### Patterns (2)
`Pattern` `Cross`

### Animation (1)
`AnimateOnScroll`

### Expansion Recipes (120)

The library also includes shadcn/Radix-inspired composed recipes for product apps:

- **Overlay and interaction:** `Modal` `ConfirmDialog` `PromptDialog` `ResponsiveDialog` `Lightbox` `ImagePreview` `Spotlight` `CommandMenu` `ActionMenu` `OverflowMenu` `MegaMenu` `ContextPanel` `PopoverForm` `FloatingPanel` `TooltipGroup` `Tour` `TourStep` `Coachmark` `HotkeyProvider` `ShortcutRecorder`
- **Forms and inputs:** `SearchInput` `CurrencyInput` `PhoneInput` `TimePicker` `DateTimePicker` `DateRangeField` `MultiSelect` `Autocomplete` `CreatableSelect` `AsyncSelect` `SegmentedTabs` `RangeSlider` `DualRangeSlider` `FileDropzone` `ImageUpload` `AvatarUpload` `ColorField` `ComboboxField` `CheckboxCard` `RadioCard` `SwitchField` `SliderField` `StepperField` `TagsField` `CopyInput`
- **Feedback and status:** `StatusBadge` `StatusDot` `StatusPill` `OnlineIndicator` `PresenceAvatar` `Notification` `NotificationList` `InlineAlert` `Callout` `BannerAlert` `ErrorState` `LoadingState` `SuccessState` `ProgressSteps` `TimelineProgress` `ToastAction` `ToastPromise` `SkeletonCard` `SkeletonTable` `SpinnerOverlay`
- **Data display:** `DescriptionList` `KeyValue` `PropertyList` `StatCard` `MetricGrid` `Trend` `SparkArea` `SparkBar` `DataList` `DataListItem` `DataGrid` `DataToolbar` `DataFilters` `DataPagination` `ColumnVisibility` `BulkActions` `EmptyTable` `Listbox` `VirtualList` `TreeTable`
- **Layout and navigation:** `ContainerQuery` `SplitPane` `Dock` `TopBar` `BottomBar` `MobileNav` `SidebarNav` `AppHeader` `PageHeader` `SectionHeader` `ContentTabs` `AnchorNav` `TableOfContents` `ScrollSpy` `MasonryGrid` `MediaCard` `ResourceCard` `FeatureCard` `PricingCard` `TestimonialCarousel`
- **Developer and AI/product UI:** `CodeTabs` `CodePreview` `CopyButton` `TokenPreview` `ThemeSwatch` `ThemeSwitcher` `PromptInput` `ChatMessage` `ChatThread` `MessageComposer` `ActivityTimeline` `AuditLog` `Changelog` `VersionBadge` `KeyboardKey`

## How Components Consume Tokens

Every component uses CSS classes that reference CSS custom properties. No hardcoded values.

```css
/* Components use token variables, never raw values */
.sigil-button {
  background: var(--s-primary);
  color: var(--s-primary-contrast);
  border-radius: var(--s-radius-button, var(--s-radius-md));
  padding: var(--s-button-py) var(--s-button-px);
  font-weight: var(--s-button-font-weight, 600);
  transition-duration: var(--s-duration-fast);
  transition-timing-function: var(--s-ease-default);
}

.sigil-button:hover {
  background: var(--s-primary-hover);
}

.sigil-button:active {
  transform: scale(var(--s-button-active-scale, 0.97));
}
```

This means:
- Change `--s-primary` → all buttons change background
- Change `--s-radius-md` → all medium-radius elements change
- Change `--s-duration-fast` → all fast transitions change speed
- Switch preset → **everything** changes at once

## Component Conventions

| Convention | Rule |
|-----------|------|
| Ref forwarding | Every component uses `forwardRef` |
| className | Always accepted, merged with `clsx(internal, className)` |
| Class prefix | All CSS classes prefixed with `sigil-` |
| Variants | Exposed as typed props: `variant`, `size`, `intent` |
| Slot pattern | `asChild` prop via `@radix-ui/react-slot` for composability |
| Token styling | All visual properties via `var(--s-*)`, never hardcoded |
| Motion | All transitions use `--s-duration-*` and `--s-ease-*` |

## Usage

```tsx
import { Button, Card, Input, Badge } from "@sigil-ui/components";

function Example() {
  return (
    <Card>
      <Input placeholder="Enter your email" />
      <Button variant="default" size="md">
        Subscribe <Badge variant="success">Free</Badge>
      </Button>
    </Card>
  );
}
```

## Adding Components to Your Project

The recommended way is through the CLI, which copies source files into your project so you can customize:

```bash
npx @sigil-ui/cli add button card input badge dialog
npx @sigil-ui/cli add --all
```

This copies component source into your `componentsDir` (default: `src/components/ui/`). You own the files, but they still read from tokens. Even after copying, the right way to restyle is still through the token layer.

## For AI Agents

When working with Sigil components:

1. **Do not edit component files to change visual properties.** Edit the token CSS or preset instead.
2. **Components are intentionally thin.** They map props to CSS classes that reference token variables. The visual richness comes from the tokens.
3. **If you need a new component**, follow the conventions:
   - Use `forwardRef`, accept `className`
   - Prefix CSS classes with `sigil-`
   - Use only `var(--s-*)` for colors, spacing, radius, shadows, motion
   - Register in `packages/cli/src/utils/registry.ts` for CLI support
4. **If you need a variant**, add it as a typed prop mapped to a CSS class, not as inline styles.
5. **To change component behavior** (not appearance), edit the component file. To change appearance, edit tokens.
