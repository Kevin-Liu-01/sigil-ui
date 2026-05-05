/**
 * Sigil structural-grid layout barrel.
 *
 * One file per concern:
 * - pattern-engine.ts → pure pattern math (`getSigilPatternStyles`)
 * - grid-context.ts   → React contexts (`PageGridContext`, `IsInsidePageGridContext`) + hooks
 * - grid-helpers.ts   → shared CSS helpers (`buildGridCols`, `borderCompensatedPadding`)
 * - SigilGutter.tsx   → decorative rail flanking the content column
 * - SigilPageGrid.tsx → the 5-column page-level grid
 * - SigilFrame.tsx    → top-level page frame (wraps SigilPageGrid)
 * - SigilFullBleed.tsx → full-viewport child with content-max constraint
 * - SigilSection.tsx  → inner / standalone section variant
 */

export {
  getSigilPatternStyles,
  type PatternSide,
  type SigilPatternStyles,
} from "./pattern-engine";

export {
  PageGridContext,
  IsInsidePageGridContext,
  useIsInsidePageGrid,
  usePageGridConfig,
  DEFAULTS as SIGIL_GRID_DEFAULTS,
  type PageGridConfig,
} from "./grid-context";

export {
  borderCompensatedPadding,
  buildGridCols,
  splitCssPadding,
  STRUCTURAL_LINE_COLOR,
  STRUCTURAL_BORDER,
  SECTION_BORDER,
  BORDER_WIDTH,
} from "./grid-helpers";

export { SigilGutter, type SigilGutterProps } from "./SigilGutter";
export { SigilPageGrid, type SigilPageGridProps } from "./SigilPageGrid";
export { SigilFrame, type SigilFrameProps } from "./SigilFrame";
export { SigilFullBleed, type SigilFullBleedProps } from "./SigilFullBleed";
export { SigilSection, type SigilSectionProps } from "./SigilSection";
