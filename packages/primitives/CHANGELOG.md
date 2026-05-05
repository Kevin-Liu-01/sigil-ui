# @sigil-ui/primitives

## 2.0.0

### Minor Changes

- Sigil 1.1 — aligned grid, dockable devbar, complete skill bundle.

  This release rolls up everything since 1.0: a tokenized grid system, the rail-aligned layout pass, the dockable devbar, the browser-driven component auditor, accessibility-friendly rem compilation, and a refreshed component + docs surface. It also bundles the full set of 10 Sigil agent skills into every project created via `sigil init`, `sigil convert`, and `create-sigil-app`.

  Tokens — `--s-grid-cell` and related grid sizing fields are now first-class tokens. Token compiler emits `rem` for px values that affect type and spacing, so Sigil now respects the user's root font size for accessibility. Component fallbacks reverted to px to keep visual fidelity while the generated CSS stays rem-based.

  Presets — All 46 presets refreshed to populate the new grid + alignment fields and to keep parity with the expanded `SigilTokens` shape. Margin border, gutter pattern y-offset, and gutter default cell size fixed so preset switching no longer leaves alignment artifacts.

  Components — Navbar, banner, and structural dividers snap to the rail-line grid. Narrow-card and feature-card render bugs fixed across the catalog. Nested-button hydration warnings resolved. 100% of component preview pages now render clean under the new audit suite.

  CLI — `sigil init`, `sigil convert`, and `sigil doctor` now install and validate 10 Sigil skills, up from 7. Newly bundled: `sigil-design`, `sigil-messaging`, `sigil-audit`. `.cursor/rules/sigil-skills.mdc` and `.sigil/AGENTS.md` reference all 10.

  create-sigil-app — Every newly bootstrapped project ships with the full skill bundle and the Cursor enforcement rule. Smoke test confirms `doctor` passes 7/7 immediately after creation.

  Web + docs — Dockable devbar (top / right / bottom / left) with studio-mode preset cascade. OpenGraph images, SEO infrastructure, and GEO optimization across the docs site. Landing page copy + component library polish. Taste skills imported and enforced via Cursor rules.

## 1.0.0

### Minor Changes

- 84cb499: Initial public release
