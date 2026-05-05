# Docs Content — Sigil

This is the source-of-truth MDX content for the Sigil docs site (Fumadocs at
`/docs`). Every component, primitive, layout helper, and pattern lives in one of
the category folders.

## Folder layout

| Folder | What lives here |
|--------|-----------------|
| `3d/` | 3D scenes and isometric primitives |
| `alignment.mdx`, `cli.mdx`, `presets.mdx`, `theming.mdx`, `installation.mdx` | Top-level concept pages |
| `animation/` | GSAP/CSS animation primitives and reveal helpers |
| `components/` | Flat catalog — every component appears once here, with the same content as its categorized counterpart |
| `diagrams/` | Charts, activity feeds, commit grids, dependency graphs |
| `effects/` | Decorative effects: proximity glow, etc. |
| `layout/` | Layout primitives: `Box`, `Stack`, `Grid`, `AppShell`, `Container`, `SigilFrame` |
| `marketing/` | Marketing blocks: announcement bars, CTA, feature grids |
| `navigation/` | Navbar, sidebar, breadcrumb, footer |
| `overlays/` | Dialogs, popovers, command menus, sheets |
| `patterns/` | Decorative SVG/CSS pattern primitives |
| `playbook/` | Reticle composition rules + recipes |
| `sections/` | Pre-composed marketing sections |
| `shapes/` | Geometric primitives: hexagon, diamond, triangle |

## Duplicate paths are intentional

Many components are documented under both `components/<name>.mdx` and
`<category>/<name>.mdx` (e.g. `box` lives at both `components/box.mdx` and
`layout/box.mdx`). This gives readers two valid navigation paths — a flat
component catalog and a categorized browse — for the same content.

The trade-off is **content drift**: when you update one copy, update both.
A `sigil docs` regenerator that writes both paths from a single source is a
known follow-up. Until then, edit both files together.

## Frontmatter conventions

Every MDX page should have at minimum:

```yaml
---
title: ComponentName
description: One-line summary of what it does and when to reach for it.
---
```

`title` should match the PascalCase component export. `description` is used
for the search index, hover previews, and `llms.txt` generation.

## Authoring rules

- Show one runnable code block per component, copy-paste ready.
- Reference tokens via `var(--s-*)` — never hardcode hex, px, or font names.
- Inline diagrams or screenshots live next to the MDX file or under
  `apps/web/public/docs/<page>/`.
- Cross-link related components in a "See also" section at the bottom.
