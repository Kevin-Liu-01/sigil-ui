/**
 * Sigil Playbook — The 10 compositional moves that make any page
 * "just work" in the Sigil aesthetic.
 *
 * Originally codified from the Reticle design language (Dedalus monorepo),
 * these patterns are the structural vocabulary of every Sigil page:
 *
 * 1. GapPixelGrid — gap-px hairline grid (the signature layout move)
 * 2. MonoLabel — mono-uppercase instrument labels
 * 3. BorderStack — section border rhythm
 * 4. AccentCTA / AccentActive — the single accent color break
 * 5. TabularValue — tabular-nums mono for data
 * 6. FeaturedGrid — featured-plus-grid composition
 * 7. DensityText — the density DNA type scale
 * 8. FrostedPanel — frosted/solid edge panels
 * 9. CardCell — card cells for gap-pixel grids
 */

export { GapPixelGrid, GapPixelCell, type GapPixelGridProps, type GapPixelCellProps } from "./GapPixelGrid";
export { MonoLabel, type MonoLabelProps, type MonoLabelVariant, type MonoLabelSize } from "./MonoLabel";
export { BorderStack, type BorderStackProps } from "./BorderStack";
export { AccentCTA, AccentActive, type AccentCTAProps, type AccentCTASize, type AccentActiveProps } from "./AccentCTA";
export { TabularValue, type TabularValueProps, type TabularValueSize } from "./TabularValue";
export { FeaturedGrid, type FeaturedGridProps } from "./FeaturedGrid";
export { DensityText, type DensityTextProps, type DensityRole } from "./DensityText";
export { FrostedPanel, type FrostedPanelProps, type FrostedPanelEdge } from "./FrostedPanel";
export { CardCell, type CardCellProps } from "./CardCell";
