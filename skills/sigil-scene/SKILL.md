---
name: sigil-scene
description: Author and extract `*.scene.tsx` files for animated or stateful blocks of an `apps/web` page. Use when extracting a self-contained visual/animated block from a long page file (the goal is one scene per file, page composes scenes), creating a new animation/diagram block, or refactoring a god file into scene-shaped modules. Triggers on "scene file", "extract scene", "animation suite", "PresetMorphScene", "scene convention", "componentize a page", or any task that involves moving inline JSX with state + animation out of a page file.
---

# Skill — sigil-scene

> One scene per file. The page composes scenes. Animation lives next to its
> rendering. Tokens drive timing.

## What is a "scene"?

A **scene** is a self-contained named visual or animated block that the page
composes — for example `HeroDiagram`, `PresetMorphScene`, `CliVoronoi`,
`LayerStackDemo`. Scenes are NOT generic components: they're page-specific,
they may own state and keyframes, and they exist primarily to extract long
inline JSX out of `app/page.tsx`-style files.

The convention solves the "1,300-line page.tsx" problem: each named visual
becomes its own file, the page becomes a thin composition file, and an agent
asked to "tweak the hero diagram animation" can grep `HeroDiagram.scene.tsx`
or `HeroDiagram.tsx` and find everything in one place.

## Where scenes live

```
apps/web/components/landing/scenes/
  PresetMorphScene.tsx      ← extracted from app/page.tsx
  CliDiagram.tsx            ← skeleton diagrams + voronoi math
  HeroDiagram.tsx           ← (when extracted)
  ...
```

The naming convention is **PascalCase + descriptive** (`PresetMorphScene`,
not `MorphScene`). The `Scene` suffix is optional for unambiguous names like
`CliDiagram` or `HeroLogoField`.

## When to extract a scene

Extract into a scene file when ANY of the following are true:

- Inline JSX block exceeds ~80 lines
- The block owns its own `useState`/`useEffect`
- The block injects its own `<style>` or `@keyframes` block
- The block defines its own data const (e.g. `MINI_PRESETS`, `CLI_VORONOI_TILES`)
- The block needs to be reused on more than one page

Do NOT extract when:

- The block is < 30 lines and has no state
- The block is tightly coupled to the page's `LandingSection` / shared helpers
- Extraction would require re-importing the same `useOptional*` hooks

## Scene file structure

```tsx
// apps/web/components/landing/scenes/HeroDiagram.tsx
"use client";

import { useState } from "react";
import { /* @sigil-ui/components imports */ } from "@sigil-ui/components";

/* Scene-local data constants live at the top of the file. Export them
   if the page composes the scene across multiple instances, otherwise
   keep them private. */
export const HERO_PRESETS = [/* ... */];

/* Local types for the scene's public shape. */
export type HeroDiagramProps = {
  index: number;
  setIndex: (i: number) => void;
};

/* The scene itself. Owns its render, state where applicable,
   keyframes (inline `<style>` block at the bottom), and any
   pure helpers that aren't worth a separate file. */
export function HeroDiagram({ index, setIndex }: HeroDiagramProps) {
  return (
    <div /* ... */>
      {/* render */}
    </div>
  );
}
```

## Token-aligned animation timings

Scenes ALWAYS reference motion tokens for transitions:

```tsx
// Good
style={{
  transition:
    "all var(--s-duration-normal, 200ms) var(--s-ease-default, ease)",
  transitionTimingFunction:
    "var(--s-ease-spring, cubic-bezier(0.32, 0.72, 0, 1))",
}}

// Bad — hardcoded numbers drift from preset motion identity
style={{
  transition: "all 200ms ease",
  transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)",
}}
```

Available tokens (see `compileToCss` output):

- `--s-duration-instant` (0ms)
- `--s-duration-fast` (150ms)
- `--s-duration-normal` (200ms)
- `--s-duration-slow` (300ms)
- `--s-duration-slower` (500ms)
- `--s-ease-default`
- `--s-ease-in`
- `--s-ease-out`
- `--s-ease-in-out`
- `--s-ease-spring`

## Inline keyframes

When a scene needs custom `@keyframes`, keep them in the scene file:

```tsx
export function MarqueeScene() {
  return (
    <>
      <style>{`
        @keyframes scene-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div style={{ animation: "scene-marquee var(--s-duration-slower) linear infinite" }}>
        {/* ... */}
      </div>
    </>
  );
}
```

Keyframe names should be prefixed with the scene name (`hero-orbit`,
`devbar-blink`) so global CSS audits can grep for orphans.

## Extracting an existing block

When extracting from a god file:

1. **Identify** the contiguous block (data const + types + functions).
2. **Copy** the block into a new file at `components/landing/scenes/<Name>.tsx`.
3. **Add** `"use client";` if the block uses hooks or event handlers.
4. **Export** the public surface (component + any data consts the page reads).
5. **Replace** the original block in `app/page.tsx` with an import.
6. **Delete** the original block — leave a 3-line comment header pointing to
   the scene file (helps agents grep for "where did `PresetMorphDemo` go?").
7. **Run** `pnpm exec tsc --noEmit -p apps/web/tsconfig.json` to verify.
8. **Build** `pnpm --filter @sigil-ui/web build` to catch SSR/use-client issues.

The reference extraction is `apps/web/components/landing/scenes/PresetMorphScene.tsx`
(extracted from `app/page.tsx` in the Sigil 2.x cleanup).

## Naming reminder

- Scene files: PascalCase, no `.scene.` suffix (`PresetMorphScene.tsx`, not
  `preset-morph.scene.tsx`).
- Component export: matches the file name.
- Internal helpers: lowercase or PascalCase as appropriate; not exported.
- Data consts: SCREAMING_SNAKE if exported (`MINI_PRESETS`,
  `CLI_VORONOI_TILES`); camelCase if local.
