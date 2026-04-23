# Sigil Diagram System — Paradigm Guide

Every marketing diagram follows one of 7 paradigms. This guide shows which component to use for each, and how to compose them.

## The 7 Paradigms

### 1. Pipeline Flow

A horizontal or vertical chain of steps with arrows between them.

**Use:** `PipelineDiagram` or `FlowDiagram`

```tsx
<PipelineDiagram
  steps={[
    { icon: <Lock />, label: "Auth", description: "Verify credentials" },
    { icon: <Route />, label: "Route", description: "Find provider" },
    { icon: <Play />, label: "Execute", description: "Run the tool" },
    { icon: <Zap />, label: "Stream", description: "Return results" },
  ]}
  connector="dashed-animated"
  direction="horizontal"
/>
```

**When to use:** Request flows, data pipelines, onboarding steps, CI/CD stages.

### 2. Hub and Spoke

A central node with connections radiating out to satellite nodes.

**Use:** `HubSpokeDiagram`

```tsx
<HubSpokeDiagram
  hub={{ label: "API Gateway", icon: <Server /> }}
  spokes={[
    { id: "app", label: "Your App", icon: <Code />, side: "left" },
    { id: "openai", label: "OpenAI", icon: <Brain />, side: "right" },
    { id: "claude", label: "Claude", icon: <Bot />, side: "right" },
  ]}
/>
```

**When to use:** API architectures, integration maps, routing diagrams.

### 3. Layered Stack

Vertical stack of labeled layers showing system architecture.

**Use:** `StackDiagram`

```tsx
<StackDiagram
  title="Platform Architecture"
  layers={[
    { label: "UI", children: <span>React + Sigil</span> },
    { label: "API", children: <span>REST / GraphQL</span>, hatched: true },
    { label: "Infra", children: <span>Kubernetes</span>, accent: true },
  ]}
  tilt={true}
  interactive={true}
/>
```

**When to use:** Platform overviews, tech stacks, abstraction layers.

### 4. Before / After

Two-panel comparison showing the problem and the solution.

**Use:** `BeforeAfterDiagram`

```tsx
<BeforeAfterDiagram
  beforeTitle="Without Sigil"
  afterTitle="With Sigil"
  before={<p>50 files of scattered Tailwind classes...</p>}
  after={<p>One token file controls everything.</p>}
/>
```

**When to use:** Value propositions, migration stories, complexity reduction.

### 5. Isometric Scene

3D-projected boxes on an isometric grid.

**Use:** `IsometricView` + `Box3D`

```tsx
<IsometricView angle={25}>
  <Box3D depth={20} variant="card">
    <span>Product</span>
  </Box3D>
</IsometricView>
```

**When to use:** Product diagrams, infrastructure illustrations, hero visuals.

### 6. Radial / Ecosystem

Central product with orbiting integrations in concentric rings.

**Use:** `EcosystemDiagram`

```tsx
<EcosystemDiagram
  center={{ label: "Sigil", icon: <Logo /> }}
  ring={[
    { label: "React", icon: <ReactIcon /> },
    { label: "Vue", icon: <VueIcon /> },
    { label: "Svelte", icon: <SvelteIcon /> },
    { label: "Angular", icon: <AngularIcon /> },
  ]}
  size={300}
/>
```

**When to use:** Ecosystem/integration maps, plugin architectures, framework support.

### 7. Timeline / Sequence

Sequential steps over time.

**Use:** `Timeline` (existing) or `TimelineSection` (section-level)

**When to use:** Changelogs, roadmaps, process documentation, history.

---

## Primitives

These are the building blocks you compose into any diagram:

| Primitive | What it does |
|-----------|-------------|
| `DiagramNode` | Styled box with icon, label, sublabel, variant (default/highlighted/muted/accent) |
| `DiagramConnector` | SVG arrow between elements. Variants: solid, dashed, dashed-animated |
| `DiagramLabel` | Monospace annotation with optional dot and leader line |
| `CrossHatch` | CSS gradient overlay for hatching layers (45-degree lines) |
| `Diagram` | Base canvas with optional grid background (dots/lines/cross) |

---

## Visual Rules

1. **Token-only colors** — all colors via `var(--s-*)`. Never hardcode hex.
2. **Monospace labels** — diagram annotations use `font-mono` for the technical feel.
3. **Dashed animated connectors** — the default for flow/pipeline diagrams. Creates movement.
4. **Cross-hatching** — use on infrastructure/substrate layers to indicate "managed" or "hidden" layers.
5. **Accent for the key node** — use `variant="accent"` or `accent={true}` on the node you want to highlight.
6. **Consistent spacing** — use the section's token padding. Don't custom-space diagrams.
7. **Dark mode works** — all diagrams inherit from tokens automatically.

---

## Quick Reference

| I want to show... | Use this |
|-------------------|----------|
| A request flow | `PipelineDiagram` |
| How my API connects things | `HubSpokeDiagram` |
| My tech stack layers | `StackDiagram` |
| Why my product is better | `BeforeAfterDiagram` |
| 3D product illustration | `IsometricView` + `Box3D` |
| Framework/integration map | `EcosystemDiagram` |
| Changelog or roadmap | `Timeline` or `TimelineSection` |
| Custom composition | `Diagram` canvas + `DiagramNode` + `DiagramConnector` |
