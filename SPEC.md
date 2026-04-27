# Sigil UI — Complete Feature Specification

> Every capability, every configurable surface, every test. This document is the exhaustive reference for what Sigil does, should do, and how to verify it.

---

## Table of Contents

1. [Token System](#1-token-system)
2. [Preset System](#2-preset-system)
3. [Component Library](#3-component-library)
4. [CLI (`sigil`)](#4-cli)
5. [Project Bootstrapper (`create-sigil-app`)](#5-project-bootstrapper)
6. [Agent System](#6-agent-system)
7. [Sandbox / Playground](#7-sandbox--playground)
8. [Token Compiler](#8-token-compiler)
9. [Build, Publish, CI/CD](#9-build-publish-cicd)
10. [Testing Strategy](#10-testing-strategy)
11. [Documentation](#11-documentation)
12. [Extensibility & Plugin Points](#12-extensibility--plugin-points)

---

## 1. Token System

**Package:** `@sigil-ui/tokens`
**Source of truth:** `packages/tokens/src/types.ts` (TypeScript types), `packages/tokens/src/tokens.ts` (default values), `sigil.tokens.md` (human/agent-readable canonical doc)

### 1.1 Architecture: Three-Layer Model

| Layer | Purpose | Example |
|-------|---------|---------|
| **Primitive** | Raw values, no semantic meaning | `oklch(0.65 0.15 280)`, `4px`, `"Nacelle"` |
| **Semantic** | Named purpose, consumed by components | `--sigil-primary`, `--sigil-surface`, `--sigil-duration-fast` |
| **Component** | Scoped to a specific component (use sparingly) | `--sigil-card-radius`, `--sigil-grid-cell` |

### 1.2 Token Categories (16 total)

#### 1.2.1 Colors (`ColorTokens`) — REQUIRED

Every color value is OKLCH format: `oklch(L C H)` where L=0–1, C=0–0.37, H=0–360.

**Themed tokens** (separate `{ light, dark }` values):

| Token | Required | Purpose |
|-------|----------|---------|
| `background` | ✅ | Page background |
| `surface` | ✅ | Card/panel background |
| `surface-elevated` | ✅ | Raised surfaces (modals, popovers) |
| `surface-sunken` | ❌ | Inset/recessed areas |
| `text` | ✅ | Primary body text |
| `text-secondary` | ✅ | Secondary body text |
| `text-muted` | ✅ | De-emphasized text |
| `text-subtle` | ✅ | Very low emphasis text |
| `text-disabled` | ✅ | Disabled state text |
| `text-inverse` | ❌ | Text on inverted backgrounds |
| `border` | ✅ | Default borders |
| `border-muted` | ✅ | Subtle borders |
| `border-strong` | ✅ | Emphasis borders |
| `border-interactive` | ✅ | Interactive element borders |

**Unthemed tokens** (single value, both themes):

| Token | Required | Purpose |
|-------|----------|---------|
| `primary` | ✅ | Primary brand action color |
| `primary-hover` | ✅ | Primary hover state |
| `primary-muted` | ✅ | Subtle primary backgrounds |
| `primary-contrast` | ❌ | Text on primary backgrounds |
| `secondary` | ✅ | Secondary accent color |
| `secondary-hover` | ❌ | Secondary hover state |
| `secondary-muted` | ❌ | Subtle secondary backgrounds |
| `accent` | ❌ | Third accent color |
| `accent-hover` | ❌ | Accent hover state |
| `accent-muted` | ❌ | Subtle accent backgrounds |
| `success` | ✅ | Success/positive state |
| `success-muted` | ❌ | Subtle success background |
| `warning` | ✅ | Warning/caution state |
| `warning-muted` | ❌ | Subtle warning background |
| `error` | ✅ | Error/destructive state |
| `error-muted` | ❌ | Subtle error background |
| `info` | ✅ | Informational state |
| `info-muted` | ❌ | Subtle info background |
| `gradient-start` | ❌ | Gradient start point |
| `gradient-end` | ❌ | Gradient end point |
| `glow` | ❌ | Glow/emission effect color |

**Total: 35 color tokens (18 required, 17 optional)**

#### 1.2.2 Typography (`TypographyTokens`) — REQUIRED

| Token | Required | Type | Purpose |
|-------|----------|------|---------|
| `font-display` | ✅ | string | Display/heading font stack |
| `font-body` | ✅ | string | Body text font stack |
| `font-mono` | ✅ | string | Monospace font stack |
| `size-xs` | ❌ | string | 0.75rem |
| `size-sm` | ❌ | string | 0.8125rem |
| `size-base` | ❌ | string | 0.9375rem |
| `size-lg` | ❌ | string | 1.0625rem |
| `size-xl` | ❌ | string | 1.1875rem |
| `size-2xl` | ❌ | string | 1.4375rem |
| `size-3xl` | ❌ | string | 1.75rem |
| `size-4xl` | ❌ | string | 2.125rem |
| `size-5xl` | ❌ | string | 2.75rem |
| `size-6xl` | ❌ | string | 3.5rem |
| `weight-normal` | ❌ | string | 400 |
| `weight-medium` | ❌ | string | 500 |
| `weight-semibold` | ❌ | string | 600 |
| `weight-bold` | ❌ | string | 700 |
| `weight-extrabold` | ❌ | string | 800 |
| `leading-tight` | ❌ | string | 1.25 |
| `leading-normal` | ❌ | string | 1.5 |
| `leading-relaxed` | ❌ | string | 1.625 |
| `leading-loose` | ❌ | string | 2 |
| `tracking-tighter` | ❌ | string | -0.04em |
| `tracking-tight` | ❌ | string | -0.02em |
| `tracking-normal` | ❌ | string | 0em |
| `tracking-wide` | ❌ | string | 0.02em |
| `tracking-wider` | ❌ | string | 0.04em |
| `heading-weight` | ❌ | string | Heading font weight |
| `heading-tracking` | ❌ | string | Heading letter spacing |
| `heading-transform` | ❌ | enum | `none \| uppercase \| capitalize \| lowercase` |
| `heading-family` | ❌ | string | Override heading font stack |

**Total: 31 typography tokens (3 required, 28 optional)**

#### 1.2.3 Spacing (`SpacingTokens`) — REQUIRED

| Token | Required | Type | Purpose |
|-------|----------|------|---------|
| `scale` | ✅ | `number[]` | 10-element ascending array (e.g. `[4,8,12,16,24,32,48,64,80,96]`) |
| `unit` | ✅ | `"px" \| "rem"` | Base unit for spacing values |
| `button-px` | ❌ | string | Button horizontal padding |
| `button-py` | ❌ | string | Button vertical padding |
| `button-px-sm` | ❌ | string | Small button horizontal padding |
| `button-py-sm` | ❌ | string | Small button vertical padding |
| `button-px-lg` | ❌ | string | Large button horizontal padding |
| `button-py-lg` | ❌ | string | Large button vertical padding |
| `card-padding` | ❌ | string | Card default padding |
| `card-padding-sm` | ❌ | string | Compact card padding |
| `card-padding-lg` | ❌ | string | Spacious card padding |
| `input-px` | ❌ | string | Input horizontal padding |
| `input-py` | ❌ | string | Input vertical padding |
| `badge-px` | ❌ | string | Badge horizontal padding |
| `badge-py` | ❌ | string | Badge vertical padding |
| `section-py` | ❌ | string | Section vertical padding |
| `section-py-lg` | ❌ | string | Large section padding |
| `navbar-height` | ❌ | string | Navigation bar height |
| `navbar-px` | ❌ | string | Navbar horizontal padding |
| `footer-py` | ❌ | string | Footer vertical padding |
| `modal-padding` | ❌ | string | Modal content padding |
| `popover-padding` | ❌ | string | Popover content padding |
| `tooltip-padding` | ❌ | string | Tooltip padding (can be compound: `"6px 10px"`) |
| `table-cell-px` | ❌ | string | Table cell horizontal padding |
| `table-cell-py` | ❌ | string | Table cell vertical padding |

**Total: 25 spacing tokens (2 required, 23 optional)**

#### 1.2.4 Layout (`LayoutTokens`) — OPTIONAL category

When present, ALL fields are required:

| Token | Purpose |
|-------|---------|
| `content-max` | Max content width (e.g. `1200px`) |
| `content-max-narrow` | Narrow content width (e.g. `720px`) |
| `content-max-wide` | Wide content width (e.g. `1440px`) |
| `page-margin` | Default page margin |
| `page-margin-sm` | Small screen page margin |
| `page-margin-lg` | Large screen page margin |
| `gutter` | Default column gutter |
| `gutter-sm` | Small gutter |
| `gutter-lg` | Large gutter |
| `grid-columns` | Number of grid columns (e.g. `"12"`) |
| `grid-gap` | Gap between grid cells |
| `bento-gap` | Bento grid gap |
| `bento-radius` | Bento card radius |
| `bento-min-height` | Minimum bento card height |
| `section-gap` | Gap between page sections |
| `sidebar-width` | Sidebar width |
| `sidebar-collapsed` | Collapsed sidebar width |
| `footer-columns` | Number of footer columns |
| `stack-gap` | Default stack gap |
| `stack-gap-sm` | Small stack gap |
| `stack-gap-lg` | Large stack gap |
| `prose-max` | Maximum prose width (e.g. `"62ch"`) |

**Total: 22 layout tokens (all required when category is set)**

#### 1.2.5 Sigil Grid (`SigilGridTokens`) — REQUIRED

| Token | Required | Purpose |
|-------|----------|---------|
| `grid-cell` | ✅ | Base grid cell size (e.g. `48px`) |
| `cross-arm` | ✅ | Cross mark arm length |
| `cross-stroke` | ✅ | Cross mark stroke width |
| `rail-gap` | ✅ | Inner/outer rail distance |
| `card-radius` | ✅ | Sigil card border radius |

**Total: 5 tokens (all required)**

#### 1.2.6 Radius (`RadiusTokens`) — REQUIRED

| Token | Required | Purpose |
|-------|----------|---------|
| `none` | ✅ | `0px` |
| `sm` | ✅ | Small radius |
| `md` | ✅ | Medium radius |
| `lg` | ✅ | Large radius |
| `xl` | ✅ | Extra large radius |
| `2xl` | ✅ | 2x extra large radius |
| `full` | ✅ | Full/pill radius (`9999px`) |
| `button` | ❌ | Button-specific radius |
| `card` | ❌ | Card-specific radius |
| `input` | ❌ | Input-specific radius |
| `badge` | ❌ | Badge-specific radius |
| `modal` | ❌ | Modal-specific radius |
| `popover` | ❌ | Popover-specific radius |
| `tooltip` | ❌ | Tooltip-specific radius |
| `image` | ❌ | Image-specific radius |
| `bento` | ❌ | Bento card radius |

**Total: 16 radius tokens (7 required, 9 optional)**

#### 1.2.7 Shadows (`ShadowTokens`) — REQUIRED

| Token | Required | Purpose |
|-------|----------|---------|
| `sm` | ✅ | Subtle shadow |
| `md` | ✅ | Default shadow (multi-layer) |
| `lg` | ✅ | Elevated shadow |
| `xl` | ✅ | High elevation shadow |
| `2xl` | ❌ | Maximum elevation |
| `glow` | ❌ | Primary color glow |
| `glow-sm` | ❌ | Subtle glow |
| `colored` | ❌ | Colored shadow using primary |
| `inner` | ❌ | Inset shadow |
| `card` | ❌ | Card-specific shadow |
| `button` | ❌ | Button shadow |
| `button-hover` | ❌ | Button hover shadow |
| `dropdown` | ❌ | Dropdown menu shadow |
| `modal` | ❌ | Modal overlay shadow |

**Total: 14 shadow tokens (4 required, 10 optional)**

#### 1.2.8 Motion (`MotionTokens`) — REQUIRED

**Durations** (all required except `slowest`):

| Token | Required | Example |
|-------|----------|---------|
| `instant` | ✅ | `0ms` |
| `fast` | ✅ | `150ms` |
| `normal` | ✅ | `250ms` |
| `slow` | ✅ | `400ms` |
| `slower` | ✅ | `600ms` |
| `slowest` | ❌ | `1000ms` |

**Easings** (all required except `bounce`):

| Token | Required | Example |
|-------|----------|---------|
| `default` | ✅ | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `in` | ✅ | `cubic-bezier(0.55, 0, 1, 0.45)` |
| `out` | ✅ | `cubic-bezier(0, 0.55, 0.45, 1)` |
| `in-out` | ✅ | `cubic-bezier(0.45, 0, 0.55, 1)` |
| `spring` | ✅ | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| `bounce` | ❌ | `cubic-bezier(0.68, -0.55, 0.27, 1.55)` |

**Interaction presets** (all optional):

| Token | Purpose |
|-------|---------|
| `enter-preset` | Default enter animation name |
| `exit-preset` | Default exit animation name |
| `hover-scale` | Scale factor on hover (e.g. `"1.02"`) |
| `press-scale` | Scale factor on press (e.g. `"0.97"`) |
| `hover-lift` | Y-translate on hover (e.g. `"-2px"`) |
| `stagger-interval` | Stagger delay between siblings |
| `stagger-interval-fast` | Fast stagger delay |

**Total: 18 motion tokens (10 required, 8 optional)**

#### 1.2.9 Borders (`BorderTokens`) — REQUIRED

| Token | Required | Type | Purpose |
|-------|----------|------|---------|
| `width.none` | ✅ | string | `0px` |
| `width.thin` | ✅ | string | `1px` |
| `width.medium` | ✅ | string | `1.5px` |
| `width.thick` | ✅ | string | `2px` |
| `style` | ❌ | enum | `solid \| dashed \| dotted \| double \| none` |
| `card-border` | ❌ | string | Card border shorthand |
| `card-border-hover` | ❌ | string | Card hover border |
| `button-border` | ❌ | string | Button border shorthand |
| `input-border` | ❌ | string | Input border shorthand |
| `divider-style` | ❌ | enum | `solid \| dashed \| dotted` |
| `divider-width` | ❌ | string | Divider thickness |

**Total: 11 border tokens (4 required, 7 optional)**

#### 1.2.10 Buttons (`ButtonTokens`) — OPTIONAL category

When present, ALL fields are required:

| Token | Type | Purpose |
|-------|------|---------|
| `font-weight` | string | Button font weight |
| `text-transform` | enum | `none \| uppercase \| capitalize \| lowercase` |
| `letter-spacing` | string | Button letter spacing |
| `font-family` | string | Button font (usually `"inherit"`) |
| `border-width` | string | Button border width |
| `hover-effect` | enum | `glow \| lift \| darken \| outline \| fill \| none` |
| `active-scale` | string | Scale on press (e.g. `"0.97"`) |
| `icon-gap` | string | Gap between icon and label |
| `min-width` | string | Minimum button width |

**Total: 9 button tokens**

#### 1.2.11 Cards (`CardTokens`) — OPTIONAL category

When present, ALL fields are required:

| Token | Type | Purpose |
|-------|------|---------|
| `border-style` | enum | `solid \| dashed \| dotted \| none` |
| `border-width` | string | Card border width |
| `hover-effect` | enum | `lift \| glow \| border \| scale \| none` |
| `hover-border-color` | string | Border color on hover |
| `padding` | string | Default card padding |
| `header-padding` | string | Card header padding |
| `footer-padding` | string | Card footer padding |
| `title-size` | string | Card title font size |
| `title-weight` | string | Card title font weight |
| `description-size` | string | Card description font size |

**Total: 10 card tokens**

#### 1.2.12 Headings (`HeadingTokens`) — OPTIONAL category

When present, ALL fields are required:

| Token | Purpose |
|-------|---------|
| `h1-size` | H1 font size |
| `h1-weight` | H1 font weight |
| `h1-tracking` | H1 letter spacing |
| `h1-leading` | H1 line height |
| `h2-size` | H2 font size |
| `h2-weight` | H2 font weight |
| `h2-tracking` | H2 letter spacing |
| `h3-size` | H3 font size |
| `h3-weight` | H3 font weight |
| `h4-size` | H4 font size |
| `h4-weight` | H4 font weight |
| `display-size` | Display heading size |
| `display-weight` | Display heading weight |
| `display-tracking` | Display letter spacing |
| `display-leading` | Display line height |

**Total: 15 heading tokens**

#### 1.2.13 Navigation (`NavigationTokens`) — OPTIONAL category

When present, ALL fields are required:

| Token | Type | Purpose |
|-------|------|---------|
| `navbar-height` | string | Navbar height |
| `navbar-backdrop-blur` | string | Navbar backdrop blur |
| `navbar-border` | string | Navbar bottom border |
| `navbar-bg-opacity` | string | Navbar background opacity |
| `nav-link-weight` | string | Navigation link font weight |
| `nav-link-size` | string | Navigation link font size |
| `nav-link-hover` | enum | `underline \| color \| background \| none` |
| `breadcrumb-separator` | string | Breadcrumb separator character |
| `pagination-radius` | string | Pagination button radius |
| `sidebar-width` | string | Sidebar width |
| `sidebar-item-radius` | string | Sidebar item radius |
| `sidebar-item-padding` | string | Sidebar item padding |

**Total: 12 navigation tokens**

#### 1.2.14 Backgrounds (`BackgroundTokens`) — OPTIONAL category

When present, ALL fields are required:

| Token | Type | Purpose |
|-------|------|---------|
| `pattern` | enum | `none \| dots \| grid \| crosshatch \| diagonal \| diamond \| hexagon \| triangle` |
| `pattern-opacity` | string | Pattern overlay opacity |
| `pattern-scale` | string | Pattern scale factor |
| `noise` | boolean | Enable noise texture |
| `noise-opacity` | string | Noise texture opacity |
| `gradient-angle` | string | Background gradient angle |
| `gradient-type` | enum | `none \| linear \| radial \| conic` |
| `hero-pattern` | enum | `none \| grid \| radial-glow \| gradient \| noise \| crosshatch` |
| `section-divider` | enum | `none \| line \| diagonal \| wave \| zigzag` |

**Total: 9 background tokens**

#### 1.2.15 Code (`CodeTokens`) — OPTIONAL category

When present, ALL fields are required:

| Token | Purpose |
|-------|---------|
| `font-family` | Code block font |
| `font-size` | Code block font size |
| `line-height` | Code block line height |
| `bg` | Code block background |
| `border` | Code block border |
| `border-radius` | Code block radius |
| `padding` | Code block padding |
| `tab-size` | Tab width in code blocks |
| `selection-bg` | Text selection color |
| `comment-color` | Syntax: comments |
| `keyword-color` | Syntax: keywords |
| `string-color` | Syntax: strings |
| `number-color` | Syntax: numbers |
| `function-color` | Syntax: functions |

**Total: 14 code tokens**

#### 1.2.16 Inputs (`InputTokens`) — OPTIONAL category

When present, ALL fields are required:

| Token | Purpose |
|-------|---------|
| `height` | Default input height |
| `height-sm` | Small input height |
| `height-lg` | Large input height |
| `border-width` | Input border width |
| `focus-ring-width` | Focus ring width |
| `focus-ring-color` | Focus ring color |
| `focus-ring-offset` | Focus ring offset |
| `placeholder-color` | Placeholder text color |
| `error-border-color` | Error state border |
| `label-size` | Label font size |
| `label-weight` | Label font weight |
| `label-spacing` | Gap between label and input |
| `helper-size` | Helper text font size |

**Total: 13 input tokens**

### 1.3 Token Grand Total

| Category | Required Fields | Optional Fields | Total |
|----------|----------------|-----------------|-------|
| Colors | 18 | 17 | 35 |
| Typography | 3 | 28 | 31 |
| Spacing | 2 | 23 | 25 |
| Layout | 0 (category optional) | 22 | 22 |
| Sigil Grid | 5 | 0 | 5 |
| Radius | 7 | 9 | 16 |
| Shadows | 4 | 10 | 14 |
| Motion | 10 | 8 | 18 |
| Borders | 4 | 7 | 11 |
| Buttons | 0 (category optional) | 9 | 9 |
| Cards | 0 (category optional) | 10 | 10 |
| Headings | 0 (category optional) | 15 | 15 |
| Navigation | 0 (category optional) | 12 | 12 |
| Backgrounds | 0 (category optional) | 9 | 9 |
| Code | 0 (category optional) | 14 | 14 |
| Inputs | 0 (category optional) | 13 | 13 |
| **TOTAL** | **53** | **206** | **259** |

A maximally-configured Sigil preset controls **259 design tokens** across 16 categories.

---

## 2. Preset System

**Package:** `@sigil-ui/presets`

### 2.1 Built-in Presets (31)

| # | Name | Category | Mood | Display Font | Primary Hue |
|---|------|----------|------|-------------|-------------|
| 1 | sigil | Structural | precise, engineered | Nacelle | Indigo |
| 2 | crux | Minimal | minimal, decisive | Nacelle | Neutral |
| 3 | alloy | Industrial | metallic, fused | Space Grotesk | Copper |
| 4 | basalt | Dark | volcanic, grounded | Inter | Slate |
| 5 | forge | Industrial | molten, industrial | Space Grotesk | Orange |
| 6 | onyx | Dark | obsidian, premium | GT America | Purple |
| 7 | flux | Colorful | dynamic, energetic | Satoshi | Blue-Purple |
| 8 | kova | Structural | forged, disciplined | Inter | Teal |
| 9 | etch | Editorial | etched, engraved | Söhne | Emerald |
| 10 | anvil | Industrial | heavy, foundational | Space Grotesk | Iron |
| 11 | rivet | Industrial | mechanical, utilitarian | Inter | Amber |
| 12 | shard | Colorful | crystalline, sharp | Satoshi | Cyan |
| 13 | rune | Editorial | mystical, arcane | Fraunces | Violet |
| 14 | fang | Dark | fierce, aggressive | Space Grotesk | Red |
| 15 | cobalt | Structural | metallic, chemical | Inter | Cobalt |
| 16 | strata | Editorial | layered, geological | Söhne | Amber |
| 17 | brass | Industrial | warm, vintage | Fraunces | Gold |
| 18 | obsid | Dark | volcanic, reflective | GT America | Slate |
| 19 | axiom | Minimal | mathematical, pure | Inter | Blue |
| 20 | glyph | Editorial | typographic, symbolic | Söhne | Indigo |
| 21 | cipher | Dark | encrypted, mysterious | Space Grotesk | Green |
| 22 | prism | Colorful | spectral, joyful | Satoshi | Rainbow |
| 23 | helix | Structural | biological, organic-tech | Inter | Teal |
| 24 | hex | Structural | geometric, hexagonal | Space Grotesk | Amber |
| 25 | vex | Colorful | complex, intricate | Satoshi | Fuchsia |
| 26 | arc | Minimal | flowing, curved | Satoshi | Sky |
| 27 | dsgn | Colorful | creative, tool-like | Inter | Purple |
| 28 | mrkr | Editorial | sketched, raw | Fraunces | Black |
| 29 | noir | Dark | cinematic, dramatic | GT America | Amber |
| 30 | dusk | Colorful | twilight, warm-cool | Satoshi | Rose-Violet |
| 31 | mono | Minimal | monochrome, terminal | Space Mono | Neutral |

### 2.2 Preset Categories (6)

| Category | Description | Count |
|----------|-------------|-------|
| Structural | Engineering precision, grids, measurements | 5 |
| Minimal | Maximum whitespace, clean, few elements | 4 |
| Dark | Deep blacks, cinematic, dramatic | 6 |
| Colorful | Gradients, vibrant accents, playful | 6 |
| Editorial | Typography-forward, print-inspired | 5 |
| Industrial | Metallic, mechanical, utilitarian | 5 |

### 2.3 Preset Shape (`SigilPreset`)

```typescript
type SigilPreset = {
  name: string;                     // Unique identifier
  tokens: SigilTokens;             // All 16 token categories
  metadata: {
    description: string;            // Required
    author?: string;                // Who made it
    version?: string;               // Semver
    tags?: readonly string[];       // Searchable tags
    mood?: string;                  // 2-3 word mood descriptor
    inspiration?: string;           // Design inspiration notes
  };
};
```

### 2.4 Preset Operations

| Operation | API | Description |
|-----------|-----|-------------|
| Create from scratch | `createPreset(name, tokens, metadata)` | Build a full preset from token values |
| Derive from base | `mergePresets(base, overrides, name?, metadata?)` | Deep-merge partial overrides onto a base preset |
| User-created | `sigil preset create` | Scaffolds `sigil.preset.<name>.ts` in project root |
| Switch | `sigil preset <name>` | Swap active preset in config + regenerate tokens CSS |
| Browse | `sigil preset list` | Print all 44 presets organized by category with descriptions and fonts |

### 2.5 Preset Catalog Metadata

Each preset has lightweight catalog metadata for CLI display:

```typescript
type PresetCatalogEntry = {
  name: string;
  label: string;           // Human-readable name
  description: string;     // One-line description
  category: PresetCategory;
  mood: string;            // 2-3 word mood
  primaryHue: string;      // Dominant hue name
  fonts: {
    display: string;
    body: string;
    mono: string;
  };
};
```

---

## 3. Component Library

### 3.1 Package Components (65 files across 9 subdirectories)

**Package:** `@sigil-ui/components`

#### Layout (9)
`Stack`, `Grid`, `Section`, `Frame`, `PageGrid`, `Margin`, `Gutter`, `Divider`, `HRule`

#### UI (23)
`Button`, `Badge`, `Card`, `Label`, `Input`, `Textarea`, `Select`, `Checkbox`, `Switch`, `Slider`, `Progress`, `Separator`, `Avatar`, `Skeleton`, `Table`, `Tabs`, `Accordion`, `Tooltip`, `ScrollArea`, `KPI`, `Terminal`, `CodeBlock`, `LoadingSpinner`

#### Navigation (4)
`Navbar`, `Footer`, `Breadcrumb`, `Pagination`

#### Overlays (4)
`Dialog`, `Popover`, `Sheet`, `Toast`

#### Shapes (5)
`Shape`, `Diamond`, `Hexagon`, `Triangle`, `Diagonal`

#### 3D (5)
`Box3D`, `Box3DGrid`, `Card3D`, `FloatingUI`, `IsometricView`

#### Diagrams (6)
`Diagram`, `ExplodedView`, `FlowDiagram`, `Timeline`, `ComparisonTable`, `ArchitectureDiagram`

#### Marketing (6)
`Hero`, `FeatureFrame`, `Pricing`, `CTA`, `LogoBar`, `TestimonialCard`

#### Patterns (2)
`Pattern`, `Cross`

#### Animation (1)
`AnimateOnScroll`

### 3.2 CLI-Registered Components (12 of 65)

| Component | Files | npm Dependencies | Internal Dependencies |
|-----------|-------|-----------------|----------------------|
| `button` | `button.tsx` | `@radix-ui/react-slot` | — |
| `card` | `card.tsx` | — | — |
| `input` | `input.tsx` | — | — |
| `badge` | `badge.tsx` | — | — |
| `dialog` | `dialog.tsx` | `@radix-ui/react-dialog` | — |
| `dropdown` | `dropdown.tsx` | `@radix-ui/react-dropdown-menu` | — |
| `tabs` | `tabs.tsx` | `@radix-ui/react-tabs` | — |
| `tooltip` | `tooltip.tsx` | `@radix-ui/react-tooltip` | — |
| `sigil-grid` | `sigil-grid.tsx` | — | — |
| `sigil-cross` | `sigil-cross.tsx` | — | — |
| `sigil-rail` | `sigil-rail.tsx` | — | — |
| `sigil-card` | `sigil-card.tsx` | `gsap` | `card` |

**Gap: 53 components exist in the library but are not in the CLI registry.**

### 3.3 Primitives (16)

**Package:** `@sigil-ui/primitives`

Re-exports from Radix UI with `*Primitive` naming:
`Accordion`, `Avatar`, `Checkbox`, `Dialog`, `DropdownMenu`, `Label`, `Popover`, `Progress`, `ScrollArea`, `Select`, `Separator`, `Slider`, `Slot`, `Switch`, `Tabs`, `Tooltip`

### 3.4 Component Conventions

| Rule | Description |
|------|-------------|
| `forwardRef` | Every component forwards refs |
| `className` prop | Always accepted, merged with `clsx(internal, className)` |
| `sigil-` prefix | CSS class names prefixed with `sigil-` |
| Token-only styling | All visual properties via `var(--sigil-*)`, no hardcoded values |
| Typed variants | Exposed as typed props (e.g. `variant`, `size`, `intent`) |
| Slot pattern | `asChild` prop via `@radix-ui/react-slot` when composable |
| Motion tokens | All transitions use `--sigil-duration-*` and `--sigil-easing-*` |

---

## 4. CLI

**Package:** `@sigil-ui/cli`
**Binary:** `sigil`

### 4.1 `sigil init` — Interactive Setup Questionnaire

**Flags:** `-p, --preset <name>`, `-d, --dir <dir>`, `-y, --yes`, `--no-agent`

**Flow (interactive mode):**

| Step | Prompt Type | Description |
|------|------------|-------------|
| 0 | Auto | **Project detection** — framework (Next.js/Remix/Vite/Astro), PM (pnpm/yarn/bun/npm), TypeScript, Tailwind, `src/` dir, global CSS path |
| 1 | Select | **Project type** — SaaS, Marketing, Docs, Blog, Portfolio, E-commerce, Startup, Custom |
| 2 | Select | **Preset** — Recommended for project type + full categorized catalog (44 presets) |
| 3 | Confirm + text | **Customization** — optionally override primary color (OKLCH), display font, body font, mono font |
| 4 | Multiselect | **Features** — GSAP + ScrollTrigger, Motion (Framer Motion), Radix Primitives, Pretext, Sigil Grid (defaults vary by project type) |
| 5 | Multiselect | **Starter components** — button, card, input, badge, dialog, dropdown, tabs, tooltip, sigil-grid, sigil-cross, sigil-rail, sigil-card |
| 6 | Text × 2 | **Paths** — components directory, tokens CSS path (defaults based on `src/` detection) |
| 7 | Confirm | **Agent instructions** — generate `.sigil/AGENTS.md` |

**Outputs:**
- `sigil.config.ts` — project configuration
- `<tokensPath>` — token CSS with preset imports and optional overrides
- `<componentsDir>/` — directory with optional starter component stubs
- `.sigil/AGENTS.md` — AI agent instructions (optional)

**Smart defaults by project type:**

| Project Type | Suggested Presets | Default Features |
|-------------|-------------------|-----------------|
| SaaS | sigil, cobalt, axiom, onyx | primitives |
| Marketing | flux, prism, dusk, sigil | gsap, motion, grid |
| Docs | crux, etch, glyph, mono | primitives |
| Blog | rune, strata, mrkr, etch | primitives |
| Portfolio | noir, shard, forge, dsgn | gsap, motion, grid |
| E-commerce | arc, sigil, helix, prism | primitives |
| Startup | sigil, flux, cobalt, arc | primitives, motion |
| Custom | (none) | (none) |

### 4.2 `sigil add` — Copy Components

**Arguments:** `[components...]`
**Flags:** `-a, --all`, `-o, --overwrite`, `-d, --dir <dir>`

- Resolves internal dependency chain (`registryDependencies`)
- Copies source files from `@sigil-ui/components` into project
- Falls back to scaffold stubs if source not found
- Prints `pnpm/yarn/bun/npm add` hint for npm dependencies

### 4.3 `sigil preset` — Manage Presets

**Subcommands:**

| Usage | Description |
|-------|-------------|
| `sigil preset` | Show current preset info + commands |
| `sigil preset list` | Browse all 44 presets by category with descriptions and font info |
| `sigil preset <name>` | Switch to a built-in or custom preset |
| `sigil preset create` | Interactive scaffold: choose base preset, primary color, display font → writes `sigil.preset.<name>.ts` |
| `sigil inspire <source>` | Extract a reference URL/file into draft token CSS, a custom preset file, and a preview page |
| `sigil docs` | Generate local `docs/sigil-project.md` and `llms.txt` for the custom library |
| `sigil adapter <name>` | Generate shadcn, Bootstrap, or Material compatibility CSS backed by Sigil tokens |

### 4.4 `sigil diff` — Token Change Tracking

- Compares current token CSS to `.sigil/tokens.snapshot.css`
- First run creates snapshot
- Shows added/removed/modified CSS variables
- `sigil diff sync` updates snapshot to current state

### 4.5 `sigil doctor` — Project Health Validation

Runs 6 diagnostic checks:

| Check | What it validates |
|-------|-------------------|
| Config | `sigil.config.ts` exists and parses |
| Tokens | Token CSS file exists and has `@import` |
| Components | Components directory exists, count `.tsx` files |
| Dependencies | All npm deps for installed components are present |
| CSS Import | Global CSS file references Sigil tokens |
| Preset | Active preset is built-in (31) or has custom file |

---

## 5. Project Bootstrapper

**Package:** `create-sigil-app`
**Usage:** `npx create-sigil-app [directory]`

### 5.1 Templates (10)

| Template | Description | Use Case |
|----------|-------------|----------|
| `ai-saas` | Token-native AI product landing starter | AI product launch |
| `dev-docs` | Documentation starter with install blocks and agent-readable structure | API docs, guides |
| `dashboard` | Analytics surface with KPI cards and operational sections | Admin panels |
| `portfolio` | Personal/studio portfolio with project narrative sections | Personal/agency |
| `ecommerce` | Storefront starter with product, trust, and checkout cues | Online store |
| `blog` | Editorial starter with article and subscription structure | Publication |
| `agency` | Studio landing page with services, proof, and inquiry CTA | Agency site |
| `cli-tool` | Developer tool landing with terminal and command-led sections | Developer tool docs |
| `startup` | Launch page with waitlist, proof, features, and FAQ structure | Product launch |
| `minimal` | Just Next.js + Sigil | Clean starting point |

### 5.2 Interactive Flow

| Step | Prompt | Options |
|------|--------|---------|
| 1 | Project name | Text input (validates kebab-case) |
| 2 | Template | Select from 10 templates |
| 3 | Preset | 12 popular choices + "browse all 31" |
| 4 | Display font | Optional text input |
| 5 | Features | Multiselect: GSAP, Motion, Radix, Grid |
| 6 | Agent instructions | Confirm yes/no |

### 5.3 What It Does

1. Creates directory
2. Runs `create-next-app@latest` with TypeScript, Tailwind, App Router, `src/` dir, Turbopack (falls back to manual scaffold)
3. Writes `sigil.config.ts`
4. Creates token CSS with preset import + optional font override
5. Injects `@import` into `globals.css`
6. Creates `components/ui/` directory
7. Generates `.sigil/AGENTS.md` (optional)
8. Updates `package.json` with all Sigil + feature dependencies
9. Installs dependencies
10. Initializes git with initial commit

**Flags:** `-t, --template`, `-p, --preset`, `--no-git`, `--no-install`, `-y, --yes`

---

## 6. Agent System

### 6.1 Root Agent Instructions (`AGENTS.md`)

Lives at repo root. Covers:
- Repository structure
- Token architecture (3-layer model)
- Preset system (44 presets, 7 categories, creation steps)
- Component conventions (forwardRef, className, CSS variables, class naming)
- CLI commands
- Color rules (OKLCH, themed vs unthemed)
- Build system (pnpm + Turbo)

### 6.2 Project-Specific Agent Instructions (`.sigil/AGENTS.md`)

Generated by `sigil init` and `create-sigil-app`. Includes:
- Active preset + mood description
- Components directory path
- Token CSS path
- Framework detection
- Enabled features
- Required Sigil skill selection table
- 7–10 numbered rules for agents
- Available CLI commands

### 6.3 Agent Skills (7)

| Skill | Trigger | Covers |
|-------|---------|--------|
| `sigil-tokens` | "edit tokens", "change primary color" | Three-layer model, OKLCH editing, adding new tokens, debugging CSS variables |
| `sigil-preset` | "create a preset", "new theme" | SigilPreset shape, built-in presets, creation workflow, OKLCH values |
| `sigil-component` | "add a component", "create component" | forwardRef pattern, CSS variable consumption, CLI registry, barrel exports |
| `sigil-layout` | "page layout", "grid system" | SigilGrid, SigilCross, SigilRail, page patterns, dashboard shell |
| `sigil-playbook` | "build a page", "landing page", "dashboard" | Gap-pixel grid, labels, border stacks, accent singleton, tabular numbers, page composition |
| `sigil-migration` | "migrate from shadcn" | Assessment, strategies (full/incremental/tokens-only), variable mapping, compat layer |
| `sigil-polish` | "polish UI", "make it feel better" | Typography, surfaces, animations, performance, micro-interactions |

---

## 7. Sandbox / Playground

**App:** `apps/web` (route: `/sandbox`)

### 7.1 Features

| Feature | Component | Description |
|---------|-----------|-------------|
| Drag-and-drop canvas | `Canvas`, `CanvasItem` | Add/arrange components on a live canvas using `@dnd-kit` |
| Component palette | `ComponentPalette` | Browse and add from full component registry |
| Preset switcher | `PresetBar` | Live-swap presets and see all components update |
| Token editor | `TokenEditor` | Edit individual token values with live preview |
| Color picker | `ColorPicker` | OKLCH color selection |
| Font picker | `FontPicker` | Browse and apply fonts |
| Slider controls | `SliderControl` | Adjust numeric tokens (spacing, radius, opacity) |
| AI chat | `AgentChat` | AI agent that edits tokens/components via natural language |
| Model selector | `ModelSelector` | Switch AI models |
| Token provider | `SigilTokenProvider` | Injects token CSS variables into the preview |

### 7.2 Component Registry (sandbox)

The sandbox has its own component registry mapping string names to `@sigil-ui/components` with default props. This is separate from the CLI registry and includes the full 200+ token-driven component library.

---

## 8. Token Compiler

**Package:** `@sigil-ui/tokens`

### 8.1 Compile Targets

| Target | API | Output |
|--------|-----|--------|
| CSS | `compileToCss(tokens, options)` | CSS custom properties with `:root` and dark mode selectors |
| Tailwind | `compileToTailwind(tokens)` | Tailwind v4 `@theme` compatible output |
| TypeScript | `compileToTs(tokens)` | TypeScript constants |
| JSON | `compileToJson(tokens)` | JSON token file |

### 8.2 CSS Compiler Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `prefix` | string | `"s"` | CSS variable prefix (e.g. `--s-primary`) |
| `includeLight` | boolean | `true` | Generate light mode variables |
| `includeDark` | boolean | `true` | Generate dark mode variables |
| `selector` | string | `":root"` | Base CSS selector |
| `darkSelector` | string | `"[data-theme='dark']"` | Dark mode selector |

---

## 9. Build, Publish, CI/CD

### 9.1 Build System

| Tool | Purpose |
|------|---------|
| pnpm 9 | Package management |
| Turbo | Monorepo task orchestration |
| tsup | Package bundling (ESM + CJS + DTS) |
| TypeScript 5.8 | Type checking |

### 9.2 Turbo Tasks

| Task | Dependencies | Outputs | Cache |
|------|-------------|---------|-------|
| `build` | `^build` | `dist/**`, `.next/**` | ✅ |
| `dev` | — | — | ❌ (persistent) |
| `lint` | `^build` | — | ✅ |
| `typecheck` | `^build` | — | ✅ |
| `clean` | — | — | ❌ |

### 9.3 CI/CD

| Workflow | Trigger | Steps |
|----------|---------|-------|
| `ci.yml` | Push/PR to `main` | Checkout → pnpm 9 → Node 22 → install → build → typecheck |
| `publish.yml` | Tag `v*` | Install → build → `pnpm -r publish --access public` |

### 9.4 Changesets

- Linked packages: `@sigil-ui/tokens`, `@sigil-ui/primitives`, `@sigil-ui/components`, `@sigil-ui/cli`, `@sigil-ui/presets`
- Access: public
- Internal dependency updates: patch

---

## 10. Testing Strategy

**Current state: No tests exist.** This section defines the comprehensive testing plan.

### 10.1 Unit Tests (Vitest)

| Area | Tests | Priority |
|------|-------|----------|
| **Token compiler** | `compileToCss` produces valid CSS for each token category; respects all `CssCompileOptions`; themed tokens emit light/dark; optional categories are skipped when absent | P0 |
| **Token compiler** | `compileToTailwind` produces valid `@theme` block; `compileToTs` produces valid TypeScript; `compileToJson` round-trips | P0 |
| **Token types** | Every built-in preset satisfies `SigilPreset` (TypeScript-level guarantee, verified with `satisfies`) | P0 |
| **Preset mergePresets** | Deep merge works correctly; overriding a single color doesn't drop siblings; arrays are replaced, not merged | P0 |
| **Preset createPreset** | Returns valid SigilPreset; defaults metadata | P1 |
| **Config** | `writeConfig` → `readConfig` round-trips all fields; `configExists` detects presence/absence | P1 |
| **Registry** | `getComponent` returns correct entry; `resolveWithDependencies` walks dependency chain; `listComponentNames` is complete | P1 |
| **Detection** | Detects Next.js, Remix, Vite, Astro from package.json; detects all package managers; finds global CSS in all candidate paths | P1 |
| **Catalog** | All 44 presets have catalog entries; no duplicate names; all categories have at least one entry | P2 |
| **Agent instructions** | Generated markdown contains preset name, paths, feature list; no undefined values | P2 |

### 10.2 CLI Integration Tests

| Test | Description | Priority |
|------|-------------|----------|
| `sigil init -y` | Creates config, tokens CSS, and components dir with default values | P0 |
| `sigil init -y -p noir` | Uses noir preset; tokens CSS imports `@sigil-ui/presets/noir` | P0 |
| `sigil add button card` | Creates `button.tsx` and `card.tsx` in components dir | P0 |
| `sigil add --all` | Creates all 12 registered components | P1 |
| `sigil preset list` | Output contains all 31 preset names and all 6 category headers | P1 |
| `sigil preset create` (scripted) | Creates `sigil.preset.<name>.ts` with valid TypeScript | P1 |
| `sigil preset <name>` | Updates config preset; regenerates tokens CSS | P1 |
| `sigil diff` | First run creates snapshot; second run with changes shows diff | P2 |
| `sigil diff sync` | Snapshot matches current tokens after sync | P2 |
| `sigil doctor` | Passes on valid project; fails on missing config; warns on missing deps | P1 |

### 10.3 Visual Regression Tests (Playwright + screenshots)

| Test | Description | Priority |
|------|-------------|----------|
| Every preset × key components | Render Button, Card, Input, Badge with each of 44 presets → screenshot comparison | P1 |
| Light/dark mode | Same component renders correctly in both themes | P1 |
| Token override | Override `--sigil-primary` → component updates visually | P2 |
| Responsive | Components render correctly at mobile/tablet/desktop breakpoints | P2 |

### 10.4 Accessibility Tests

| Test | Description | Priority |
|------|-------------|----------|
| axe-core scan | Every component passes automated a11y audit | P1 |
| Keyboard navigation | Dialog, Dropdown, Tabs, Tooltip, Accordion are keyboard-navigable | P1 |
| Color contrast | All text/background token combinations meet WCAG AA (4.5:1 for normal text, 3:1 for large) across all 44 presets | P1 |
| Focus indicators | Every interactive component has visible focus ring using `--sigil-focus-ring-*` tokens | P2 |
| Screen reader | Overlays announce correctly; live regions work | P2 |

### 10.5 Preset Validation Tests

| Test | Description | Priority |
|------|-------------|----------|
| Schema compliance | Every preset satisfies `SigilPreset` type at runtime (not just compile time) | P0 |
| OKLCH validity | Every color token in every preset is valid OKLCH (parseable, L/C/H in range) | P0 |
| Required fields | Every preset has all 53 required token fields | P0 |
| Metadata completeness | Every preset has `name`, `description`; metadata `name` matches filename | P1 |
| Catalog sync | Every preset in `index.ts` has a matching `catalog.ts` entry | P1 |
| Font stacks | Every font stack includes system fallback (e.g. `system-ui`, `monospace`) | P2 |
| Spacing scale | Every spacing scale is 10-element ascending array | P2 |
| Radius progression | sm < md < lg < xl < 2xl (parsed as numbers) | P2 |
| Shadow layering | md/lg/xl shadows have multiple layers (contain commas) | P2 |
| Duration ordering | instant < fast < normal < slow < slower (parsed as ms) | P2 |

### 10.6 create-sigil-app Tests

| Test | Description | Priority |
|------|-------------|----------|
| `create-sigil-app test-app -y` | Creates directory; has `package.json`, `sigil.config.ts`, token CSS, `globals.css` with import | P0 |
| Template: minimal | Produces buildable Next.js project | P1 |
| `--no-git --no-install` | Skips git and install; directory still has all Sigil files | P1 |
| Agent instructions | `.sigil/AGENTS.md` exists when agent flag is on; absent when off | P2 |

---

## 11. Documentation

### 11.1 Documentation App (`apps/docs`)

- Fumadocs-based
- Component API reference (every component's props, variants, slots)
- Token reference (every category, every field)
- Preset gallery (visual previews of all 44 presets)
- Migration guide (shadcn → Sigil)
- Agent usage guide

### 11.2 Machine-Readable Docs

| File | Purpose | Consumer |
|------|---------|----------|
| `sigil.tokens.md` | Human/agent-readable canonical token doc | AI agents |
| `AGENTS.md` | Repo-level agent instructions | AI agents working on Sigil |
| `.sigil/AGENTS.md` | Project-specific agent instructions | AI agents working on user's project |
| `llms.txt` | Component inventory + token schema | LLMs |
| Skills (5) | Domain-specific agent workflows | Cursor, Claude Code, Codex |

---

## 12. Extensibility & Plugin Points

### 12.1 Custom Presets

Users can create presets at three levels:

| Level | File | Description |
|-------|------|-------------|
| Project-level | `sigil.preset.<name>.ts` | Full `SigilPreset` in project root |
| Derived | Using `mergePresets()` | Partial overrides on a base preset |
| Token CSS | `<tokensPath>` file | CSS variable overrides in `:root {}` |

### 12.2 Custom Components

| Method | Description |
|--------|-------------|
| `sigil add` + edit | Copy a component, then modify it |
| New from scratch | Create in `componentsDir`, follow conventions |
| Registry extension | Add to `registry.ts` for `sigil add` support |

### 12.3 Compiler Extension Points

| Extension | How |
|-----------|-----|
| Custom CSS prefix | `CssCompileOptions.prefix` |
| Custom selectors | `CssCompileOptions.selector`, `darkSelector` |
| Light-only / dark-only | `includeLight: false` or `includeDark: false` |
| Additional compile targets | Add new `compileTo*` function in `packages/tokens/src/` |

### 12.4 Token Extension Points

| Extension | How |
|-----------|-----|
| New token category | Add type to `types.ts`, add to `SigilTokens`, add defaults, add to all presets |
| New field in existing category | Add optional field to type, add to presets that use it |
| Override single token | CSS `:root { --sigil-*: value; }` in token CSS file |

### 12.5 CLI Extension Points

| Extension | How |
|-----------|-----|
| New CLI command | Add to `packages/cli/src/commands/`, register in `index.ts` |
| New component in registry | Add entry to `COMPONENT_REGISTRY` in `registry.ts` |
| New template | Add to `create-sigil-app` `TEMPLATES` array, scaffold logic |

---

## Appendix A: Configurable Surfaces Summary

Every single thing a user or agent can configure:

### A.1 Via `sigil.config.ts`

| Field | Type | Default |
|-------|------|---------|
| `preset` | string | `"sigil"` |
| `componentsDir` | string | `"src/components/ui"` |
| `tokensPath` | string | `"src/styles/sigil.tokens.css"` |
| `typescript` | boolean | `true` |

### A.2 Via preset selection (259 tokens)

All 259 tokens listed in Section 1 — colors, typography, spacing, layout, grid, radius, shadows, motion, borders, buttons, cards, headings, navigation, backgrounds, code, inputs.

### A.3 Via token CSS overrides

Any CSS custom property can be overridden in the tokens CSS file:

```css
:root {
  --sigil-primary: oklch(0.65 0.15 280);
  --sigil-font-display: "CustomFont", system-ui, sans-serif;
  --sigil-radius-md: 12px;
}
```

### A.4 Via `sigil preset create`

| Customization | Prompt |
|---------------|--------|
| Preset name | Text input (kebab-case) |
| Base preset | Select from 6 choices + blank |
| Primary color | OKLCH input |
| Display font | Text input |

### A.5 Via `sigil init`

| Customization | Prompt |
|---------------|--------|
| Project type | 8 options |
| Preset | 31 options with category grouping |
| Primary color override | OKLCH input |
| Display font override | Text input |
| Body font override | Text input |
| Mono font override | Text input |
| Features | 5 options (multiselect) |
| Starter components | 12 options (multiselect) |
| Components directory | Text input |
| Tokens CSS path | Text input |
| Agent instructions | Yes/no |

### A.6 Via `create-sigil-app`

| Customization | Prompt |
|---------------|--------|
| Project directory | Text input |
| Template | 10 options |
| Preset | 31 options |
| Display font | Text input |
| Features | 4 options (multiselect) |
| Agent instructions | Yes/no |
| Git initialization | Flag `--no-git` |
| Dependency installation | Flag `--no-install` |

### A.7 Via CSS compiler options

| Option | Values |
|--------|--------|
| CSS variable prefix | Any string (default `"s"`) |
| Include light mode | true/false |
| Include dark mode | true/false |
| Base selector | Any CSS selector |
| Dark mode selector | Any CSS selector |

### A.8 Via component props

Every component exposes typed props for runtime configuration. Common surfaces:

| Prop | Components | Values |
|------|-----------|--------|
| `variant` | Button, Badge, Card | `default`, `outline`, `ghost`, `destructive`, etc. |
| `size` | Button, Input, Badge | `sm`, `md`, `lg` |
| `asChild` | Button (Slot) | boolean |
| `className` | All | Any string |
| `pattern` | Pattern | `dots`, `hatch`, `diagonal`, `diamond`, `hexagon`, `triangle`, `crosshatch` |

---

## Appendix B: Enum Reference

Every constrained-value field across the token system:

| Token | Allowed Values |
|-------|---------------|
| `spacing.unit` | `px`, `rem` |
| `typography.heading-transform` | `none`, `uppercase`, `capitalize`, `lowercase` |
| `borders.style` | `solid`, `dashed`, `dotted`, `double`, `none` |
| `borders.divider-style` | `solid`, `dashed`, `dotted` |
| `buttons.text-transform` | `none`, `uppercase`, `capitalize`, `lowercase` |
| `buttons.hover-effect` | `glow`, `lift`, `darken`, `outline`, `fill`, `none` |
| `cards.border-style` | `solid`, `dashed`, `dotted`, `none` |
| `cards.hover-effect` | `lift`, `glow`, `border`, `scale`, `none` |
| `navigation.nav-link-hover` | `underline`, `color`, `background`, `none` |
| `backgrounds.pattern` | `none`, `dots`, `grid`, `crosshatch`, `diagonal`, `diamond`, `hexagon`, `triangle` |
| `backgrounds.gradient-type` | `none`, `linear`, `radial`, `conic` |
| `backgrounds.hero-pattern` | `none`, `grid`, `radial-glow`, `gradient`, `noise`, `crosshatch` |
| `backgrounds.section-divider` | `none`, `line`, `diagonal`, `wave`, `zigzag` |

---

## Appendix C: File Manifest

Every file Sigil creates/touches in a user's project:

| File | Created By | Purpose |
|------|-----------|---------|
| `sigil.config.ts` | `sigil init`, `create-sigil-app` | Project configuration |
| `<tokensPath>` (e.g. `src/styles/sigil.tokens.css`) | `sigil init`, `create-sigil-app` | Token CSS with preset imports |
| `<componentsDir>/*.tsx` | `sigil init`, `sigil add` | Component source files |
| `.sigil/AGENTS.md` | `sigil init`, `create-sigil-app` | AI agent instructions |
| `.sigil/tokens.snapshot.css` | `sigil diff` | Token snapshot for diffing |
| `sigil.preset.<name>.ts` | `sigil preset create` | Custom preset file |
| `globals.css` (modified) | `create-sigil-app` | Injects token import |
| `package.json` (modified) | `create-sigil-app` | Adds Sigil dependencies |
