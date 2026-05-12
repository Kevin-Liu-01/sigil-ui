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
 * - SigilPage.tsx     → preferred page API with rhythm/chrome modes
 * - SigilFullBleed.tsx → full-viewport child with content-max constraint
 * - SigilSection.tsx  → inner / standalone section variant
 * - SigilComposition.tsx → section headers, stacks, and action rows
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
  type SigilBandStroke,
  type SigilRhythmMode,
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
export { SigilPage, type SigilPageChrome, type SigilPageProps } from "./SigilPage";
export { SigilFullBleed, type SigilFullBleedProps } from "./SigilFullBleed";
export { SigilSection, type SigilSectionProps } from "./SigilSection";
export {
  SIGIL_RHYTHM_STYLES,
  SigilActionRow,
  SigilGhostLink,
  SigilHero,
  SigilHeroContent,
  SigilHeroDescription,
  SigilHeroLayout,
  SigilHeroMedia,
  SigilHeroTitle,
  SigilInline,
  SigilMonoBlock,
  SigilRhythmBox,
  SigilSectionHeader,
  SigilStack,
  SigilViewCode,
  type SigilActionRowProps,
  type SigilGhostLinkProps,
  type SigilHeroContentProps,
  type SigilHeroDescriptionProps,
  type SigilHeroLayoutProps,
  type SigilHeroMediaProps,
  type SigilHeroProps,
  type SigilHeroTitleProps,
  type SigilInlineProps,
  type SigilMonoBlockProps,
  type SigilRhythmBoxProps,
  type SigilSectionHeaderProps,
  type SigilStackProps,
  type SigilViewCodeProps,
} from "./SigilComposition";
