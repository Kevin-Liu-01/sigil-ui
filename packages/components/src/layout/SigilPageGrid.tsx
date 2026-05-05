/**
 * Legacy entry point. The structural grid implementation now lives
 * under `./sigil/` — one file per concern. This shell re-exports the
 * public surface so existing imports keep working.
 */

export {
  getSigilPatternStyles,
  IsInsidePageGridContext,
  PageGridContext,
  SigilFrame,
  SigilFullBleed,
  SigilGutter,
  SigilPageGrid,
  useIsInsidePageGrid,
  usePageGridConfig,
  type PageGridConfig,
  type PatternSide,
  type SigilFrameProps,
  type SigilFullBleedProps,
  type SigilGutterProps,
  type SigilPageGridProps,
  type SigilPatternStyles,
} from "./sigil";
