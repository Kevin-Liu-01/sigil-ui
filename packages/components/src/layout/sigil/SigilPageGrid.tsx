"use client";

import {
  memo,
  useMemo,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "../../utils";
import type { GutterPattern } from "@sigil-ui/tokens";
import {
  getSigilPatternStyles,
  PATTERN_COLOR,
  type SigilPatternStyles,
} from "./pattern-engine";
import {
  DEFAULTS,
  IsInsidePageGridContext,
  PageGridContext,
  type PageGridConfig,
} from "./grid-context";
import {
  buildGridCols,
  STRUCTURAL_LINE_COLOR,
} from "./grid-helpers";
import { SigilGutter } from "./SigilGutter";

export interface SigilPageGridProps {
  children: ReactNode;
  className?: string;
  contentMax?: number;
  railGap?: number;
  gridCell?: number;
  crossStroke?: number;
  showGutterGrid?: boolean;
  showMarginLines?: boolean;
  gutterPattern?: GutterPattern;
  marginPattern?: GutterPattern;
  /** Border on the margin columns' inner edges where they meet the content area. */
  marginBorder?: string;
  /** Strip all gutter/margin decoration — gutters become invisible empty space. */
  edgeless?: boolean;
}

function SigilPageGridImpl({
  children,
  className,
  contentMax = DEFAULTS.contentMax,
  railGap = DEFAULTS.railGap,
  gridCell = DEFAULTS.gridCell,
  crossStroke = DEFAULTS.crossStroke,
  showGutterGrid = true,
  showMarginLines = true,
  gutterPattern = "grid",
  marginPattern = "horizontal",
  marginBorder,
  edgeless = false,
}: SigilPageGridProps) {
  const gutterHasPattern = gutterPattern !== "none" && showGutterGrid;
  const effectiveRailGap = edgeless || !gutterHasPattern ? 0 : railGap;

  // Memoise the context value so PageGridContext consumers (every
  // SigilSection / Divider on the page — typically 30+ instances) only
  // re-render when one of these structural fields actually changes,
  // not on every parent re-render. Without this the context value is
  // a fresh object literal each render and forces a cascading
  // re-render storm on every preset switch.
  const config = useMemo<PageGridConfig>(
    () => ({
      railGap: effectiveRailGap,
      contentMax,
      gridCell,
      crossStroke,
      gutterPattern,
      marginPattern,
      edgeless,
    }),
    [
      effectiveRailGap,
      contentMax,
      gridCell,
      crossStroke,
      gutterPattern,
      marginPattern,
      edgeless,
    ],
  );

  const gridCols = useMemo(
    () => buildGridCols(effectiveRailGap, contentMax),
    [effectiveRailGap, contentMax],
  );

  const marginCell = gridCell;
  const marginCssL = showMarginLines
    ? getSigilPatternStyles(marginPattern, marginCell, "left")
    : null;
  const marginCssR = showMarginLines
    ? getSigilPatternStyles(marginPattern, marginCell, "right")
    : null;

  const gutterVisible = !edgeless && effectiveRailGap > 0;

  const marginL = buildMarginStyle(marginCssL, "Right", edgeless, marginBorder);
  const marginR = buildMarginStyle(marginCssR, "Left", edgeless, marginBorder);

  return (
    <IsInsidePageGridContext.Provider value={true}>
      <PageGridContext.Provider value={config}>
        <div
          data-slot="sigilpagegrid"
          className={cn("grid min-h-dvh", className)}
          style={gridCols}
        >
          <div aria-hidden="true" style={marginL.container}>
            {marginL.overlay && <div style={marginL.overlay} />}
          </div>
          <SigilGutter
            showGrid={showGutterGrid}
            gridCell={gridCell}
            pattern={gutterPattern}
            side="left"
            visible={gutterVisible}
          />
          <div
            className="flex min-w-0 flex-col"
            style={{ background: "var(--s-background)" }}
          >
            {children}
          </div>
          <SigilGutter
            showGrid={showGutterGrid}
            gridCell={gridCell}
            pattern={gutterPattern}
            side="right"
            visible={gutterVisible}
          />
          <div aria-hidden="true" style={marginR.container}>
            {marginR.overlay && <div style={marginR.overlay} />}
          </div>
        </div>
      </PageGridContext.Provider>
    </IsInsidePageGridContext.Provider>
  );
}

function buildMarginStyle(
  css: SigilPatternStyles | null,
  innerEdge: "Right" | "Left",
  edgeless: boolean,
  marginBorder: string | undefined,
): { container: CSSProperties; overlay: CSSProperties | null } {
  const anchorPos = innerEdge === "Right" ? "right top" : "left top";
  const container: CSSProperties = {
    backgroundColor: "var(--s-background)",
    position: "relative",
    overflow: "hidden",
  };
  let overlay: CSSProperties | null = null;
  if (css) {
    if (css.isMask) {
      overlay = {
        position: "absolute",
        inset: 0,
        backgroundColor: PATTERN_COLOR,
        WebkitMaskImage: css.backgroundImage,
        WebkitMaskSize: css.backgroundSize,
        WebkitMaskRepeat: "repeat",
        maskImage: css.backgroundImage,
        maskSize: css.backgroundSize,
        maskRepeat: "repeat",
        WebkitMaskPosition: css.backgroundPosition ?? anchorPos,
        maskPosition: css.backgroundPosition ?? anchorPos,
      };
    } else {
      Object.assign(container, {
        backgroundImage: css.backgroundImage,
        backgroundSize: css.backgroundSize,
        backgroundPosition: css.backgroundPosition ?? anchorPos,
      });
    }
  }
  if (!edgeless || css) {
    const prop = `border${innerEdge}` as keyof CSSProperties;
    Object.assign(container, {
      [prop]:
        marginBorder ??
        `var(--s-border-width-thin, 1px) var(--s-border-style, solid) ${STRUCTURAL_LINE_COLOR}`,
    });
  }
  return { container, overlay };
}

/**
 * `React.memo` bails out when no prop changes — combined with the
 * memoised context value, switching presets that don't touch
 * sigil/layout tokens (e.g. just a color tweak) no longer cascades a
 * re-render through every SigilSection / Divider on the page.
 */
export const SigilPageGrid = memo(SigilPageGridImpl);
