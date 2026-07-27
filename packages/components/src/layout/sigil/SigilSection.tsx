"use client";

import {
  memo,
  useCallback,
  useLayoutEffect,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "../../utils";
import type { GutterPattern } from "@sigil-ui/tokens";
import {
  DEFAULTS,
  useIsInsidePageGrid,
  usePageGridConfig,
} from "./grid-context";
import {
  borderCompensatedPadding,
  buildGridCols,
  RESPONSIVE_RAIL_GAP,
  SECTION_BORDER,
} from "./grid-helpers";
import {
  mergeSnapIntoPaddingStyle,
  useSnapBottomToGridPadding,
} from "./grid-snap-padding";
import { SigilGutter } from "./SigilGutter";
import { getSigilPatternStyles } from "./pattern-engine";
import { buildMarginStyle } from "./margin-styles";

/* ------------------------------------------------------------------ */
/* Cross marks                                                        */
/* ------------------------------------------------------------------ */

function CrossMark({
  size = 12,
  stroke = 1.5,
}: {
  size?: number;
  stroke?: number;
}) {
  const half = size / 2;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      aria-hidden="true"
    >
      <line
        x1={half}
        y1={0}
        x2={half}
        y2={size}
        stroke="var(--s-border)"
        strokeWidth={stroke}
      />
      <line
        x1={0}
        y1={half}
        x2={size}
        y2={half}
        stroke="var(--s-border)"
        strokeWidth={stroke}
      />
    </svg>
  );
}

/**
 * Memoised so it only re-renders when railGap / crossStroke / position
 * actually change. PageGridContext lives one level up (in
 * `CrossRowConnector`) so the memo bail keeps SigilSection's render
 * path cheap on preset switches where these primitives match.
 */
const CrossRow = memo(function CrossRow({
  position,
  crossStroke,
}: {
  position: "top" | "bottom";
  crossStroke: number;
}) {
  const size = 12;
  const half = size / 2;
  const verticalStyle =
    position === "top" ? { top: -half } : { bottom: -half };

  // The responsive rail variable tracks the same column as `SigilPageGrid`.
  const horizontals: CSSProperties[] = [
    { left: `calc(-1 * ${RESPONSIVE_RAIL_GAP} - ${half}px)` },
    { left: -half },
    { right: -half },
    { right: `calc(-1 * ${RESPONSIVE_RAIL_GAP} - ${half}px)` },
  ];

  return (
    <>
      {horizontals.map((h, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            ...h,
            ...verticalStyle,
            width: size,
            height: size,
            zIndex: 10,
          }}
        >
          <CrossMark size={size} stroke={crossStroke} />
        </div>
      ))}
    </>
  );
});

/**
 * Tiny connector that subscribes to `PageGridContext` and feeds the
 * primitive props into `CrossRow`. Isolating the subscription here
 * means `SigilSection` itself does NOT subscribe to the heavy context
 * — sections without `showCrosses` (the common case) stay fully out
 * of the preset-switch re-render cascade.
 */
function CrossRowConnector({ position }: { position: "top" | "bottom" }) {
  const config = usePageGridConfig();
  if (!config) return null;
  return (
    <CrossRow
      position={position}
      crossStroke={config.crossStroke}
    />
  );
}

/* ------------------------------------------------------------------ */
/* SigilSection                                                       */
/* ------------------------------------------------------------------ */

export interface SigilSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
  /** Semantic element type. @default "section" */
  as?: ElementType;
  /** Show a 1px top border along the section boundary. */
  borderTop?: boolean;
  /** Show a 1px bottom border along the section boundary. */
  borderBottom?: boolean;
  /** Render cross marks at the 4 gutter intersections of each visible border. */
  showCrosses?: boolean;
  /** CSS padding string. Uses `var(--s-section-py)` and `var(--s-page-margin)` by default. */
  padding?: string;
  /** Named structural spacing preset. Prefer this over hand-authored padding strings. */
  space?: "none" | "compact" | "normal" | "spacious" | "hero" | "footer";
  /** Content max width for standalone mode (outside SigilPageGrid). */
  contentMax?: number;
  /** Rail gap for standalone mode (outside SigilPageGrid). */
  railGap?: number;
  /** Structural cell size for standalone gutter and margin patterns. */
  gridCell?: number;
  /** Cross stroke for standalone intersection marks. */
  crossStroke?: number;
  /** Border on standalone margin columns' inner edges. */
  marginBorder?: string;
  /** Gutter pattern for standalone mode. */
  gutterPattern?: GutterPattern;
  /** Margin pattern for standalone mode. */
  marginPattern?: GutterPattern;
  /** Show gutter grid in standalone mode. @default true */
  showGutterGrid?: boolean;
  /** Show margin lines in standalone mode. @default true */
  showMarginLines?: boolean;
  /**
   * When inside `SigilPageGrid`, add vertical padding so the section's lower edge
   * snaps to the next full resolved `--s-grid-cell` from the content origin. The
   * snap amount is split across top/bottom padding to keep inner content centered.
   */
  snapBottomToGrid?: boolean;
}

/**
 * Section that auto-detects its layout context.
 *
 * **Inside SigilPageGrid** — renders content directly in the content
 * column with optional border-top/bottom and cross marks that extend
 * into the gutter columns via absolute positioning.
 *
 * **Outside SigilPageGrid** — renders its own 5-column grid wrapper
 * (margin | gutter | content | gutter | margin) so sections can be
 * used independently.
 */
export function SigilSection({
  children,
  className,
  id,
  style,
  as,
  borderTop = false,
  borderBottom = false,
  showCrosses = false,
  padding =
    "var(--s-section-padding-y, calc(2 * var(--s-grid-cell))) var(--s-section-padding-x, var(--s-page-margin, 25px))",
  space,
  contentMax = DEFAULTS.contentMax,
  railGap = DEFAULTS.railGap,
  gridCell = DEFAULTS.gridCell,
  crossStroke = DEFAULTS.crossStroke,
  marginBorder,
  gutterPattern = "grid",
  marginPattern = "horizontal",
  showGutterGrid = true,
  showMarginLines = true,
  snapBottomToGrid,
}: SigilSectionProps) {
  // Subscribe only to the lightweight boolean context — its value is
  // set once at provider mount and never changes, so this hook never
  // causes a re-render after the initial paint. The heavy per-preset
  // config lives in `PageGridContext` and is only read by
  // `CrossRowConnector` below, on demand.
  const insideGrid = useIsInsidePageGrid();
  const gridConfig = usePageGridConfig();
  const resolvedPadding = resolveSectionPadding(space, padding);
  const effectiveBorderTop = !gridConfig?.edgeless && borderTop;
  const effectiveBorderBottom = !gridConfig?.edgeless && borderBottom;
  const effectiveShowCrosses = !gridConfig?.edgeless && showCrosses;
  const effectiveSnapBottom =
    snapBottomToGrid ?? (insideGrid && !gridConfig?.edgeless && gridConfig?.rhythm === "locked" && gridConfig.snap);

  if (insideGrid) {
    return (
      <InnerSection
        id={id}
        className={className}
        style={style}
        as={as}
        borderTop={effectiveBorderTop}
        borderBottom={effectiveBorderBottom}
        showCrosses={effectiveShowCrosses}
        padding={resolvedPadding}
        snapBottomToGrid={effectiveSnapBottom}
      >
        {children}
      </InnerSection>
    );
  }

  return (
    <StandaloneSection
      id={id}
      className={className}
      style={style}
      as={as}
      borderTop={effectiveBorderTop}
      borderBottom={effectiveBorderBottom}
      showCrosses={effectiveShowCrosses}
      padding={resolvedPadding}
      contentMax={contentMax}
      railGap={railGap}
      gridCell={gridCell}
      crossStroke={crossStroke}
      marginBorder={marginBorder}
      gutterPattern={gutterPattern}
      marginPattern={marginPattern}
      showGutterGrid={showGutterGrid}
      showMarginLines={showMarginLines}
      snapBottomToGrid={effectiveSnapBottom}
    >
      {children}
    </StandaloneSection>
  );
}

function resolveSectionPadding(
  space: SigilSectionProps["space"],
  fallback: string,
): string {
  const x = "var(--s-section-padding-x, var(--s-page-margin, 25px))";
  switch (space) {
    case "none":
      return "0";
    case "compact":
      return `var(--s-section-padding-y-sm, var(--s-grid-cell)) ${x}`;
    case "normal":
      return `var(--s-section-padding-y, calc(2 * var(--s-grid-cell))) ${x}`;
    case "spacious":
      return `calc(3 * var(--s-grid-cell)) ${x}`;
    case "hero":
      return `var(--s-section-padding-y, calc(2 * var(--s-grid-cell))) ${x} var(--s-section-padding-y-sm, var(--s-grid-cell))`;
    case "footer":
      return `var(--s-footer-padding-y, var(--s-grid-cell)) ${x}`;
    default:
      return fallback;
  }
}

/* ------------------------------------------------------------------ */
/* InnerSection — used when inside SigilPageGrid                      */
/* ------------------------------------------------------------------ */

type InnerSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
  as?: ElementType;
  borderTop: boolean;
  borderBottom: boolean;
  showCrosses: boolean;
  padding: string;
  snapBottomToGrid?: boolean;
};

function useCollapseTopBorderAfterDivider(
  sectionEl: HTMLElement | null,
  borderTop: boolean,
): boolean {
  const [collapse, setCollapse] = useState(false);

  useLayoutEffect(() => {
    if (!borderTop || !sectionEl) {
      setCollapse(false);
      return;
    }

    const measure = () => {
      const previous = sectionEl.previousElementSibling;
      setCollapse(previous?.getAttribute("data-slot") === "divider");
    };

    measure();
    const parent = sectionEl.parentElement;
    if (!parent) return;
    const observer = new MutationObserver(measure);
    observer.observe(parent, { childList: true });
    return () => observer.disconnect();
  }, [sectionEl, borderTop]);

  return collapse;
}

function InnerSection({
  children,
  className,
  id,
  style,
  as: Tag = "section",
  borderTop,
  borderBottom,
  showCrosses,
  padding,
  snapBottomToGrid = false,
}: InnerSectionProps) {
  const [sectionEl, setSectionEl] = useState<HTMLElement | null>(null);
  const setSectionRef = useCallback((node: HTMLElement | null) => {
    setSectionEl(node);
  }, []);

  const collapseTopBorder = useCollapseTopBorderAfterDivider(sectionEl, borderTop);
  const visibleBorderTop = borderTop && !collapseTopBorder;
  const snapPadPx = useSnapBottomToGridPadding(snapBottomToGrid, sectionEl);

  const hasBorder = visibleBorderTop || borderBottom;
  const paddingStyleRaw = hasBorder
    ? borderCompensatedPadding(padding, visibleBorderTop, borderBottom)
    : { padding };
  const paddingStyle = mergeSnapIntoPaddingStyle(paddingStyleRaw, snapPadPx);

  return (
    <Tag
      ref={setSectionRef}
      id={id}
      data-slot="sigilsection"
      data-grid-snap-bottom={snapBottomToGrid ? "true" : undefined}
      data-sigil-snap-pad={
        snapBottomToGrid && snapPadPx > 0 ? String(Math.round(snapPadPx * 1000) / 1000) : undefined
      }
      className={cn("relative", className)}
      style={{
        boxSizing: "border-box",
        ...style,
        ...paddingStyle,
        borderTop: visibleBorderTop ? SECTION_BORDER : undefined,
        borderBottom: borderBottom ? SECTION_BORDER : undefined,
      }}
    >
      {showCrosses && visibleBorderTop && <CrossRowConnector position="top" />}
      {children}
      {showCrosses && borderBottom && <CrossRowConnector position="bottom" />}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* StandaloneSection — used outside SigilPageGrid                     */
/* ------------------------------------------------------------------ */

type StandaloneSectionProps = InnerSectionProps & {
  contentMax: number;
  railGap: number;
  gridCell: number;
  crossStroke: number;
  marginBorder?: string;
  gutterPattern?: GutterPattern;
  marginPattern?: GutterPattern;
  showGutterGrid?: boolean;
  showMarginLines?: boolean;
};

function StandaloneSection({
  children,
  className,
  id,
  style,
  as: Tag = "section",
  borderTop,
  borderBottom,
  showCrosses,
  padding,
  contentMax,
  railGap,
  gridCell,
  crossStroke,
  marginBorder,
  gutterPattern = "grid",
  marginPattern = "horizontal",
  showGutterGrid = true,
  showMarginLines = true,
  snapBottomToGrid = false,
}: StandaloneSectionProps) {
  const [sectionEl, setSectionEl] = useState<HTMLElement | null>(null);
  const [paddedEl, setPaddedEl] = useState<HTMLElement | null>(null);
  const setSectionRef = useCallback((node: HTMLElement | null) => {
    setSectionEl(node);
  }, []);
  const setPaddedRef = useCallback((node: HTMLElement | null) => {
    setPaddedEl(node);
  }, []);

  const collapseTopBorder = useCollapseTopBorderAfterDivider(sectionEl, borderTop);
  const visibleBorderTop = borderTop && !collapseTopBorder;
  const snapPadPx = useSnapBottomToGridPadding(snapBottomToGrid, paddedEl);

  const gridCols = buildGridCols(railGap, contentMax);
  const marginCssL = showMarginLines
    ? getSigilPatternStyles(marginPattern, gridCell, "left")
    : null;
  const marginCssR = showMarginLines
    ? getSigilPatternStyles(marginPattern, gridCell, "right")
    : null;
  const marginL = buildMarginStyle(marginCssL, "Right", false, marginBorder);
  const marginR = buildMarginStyle(marginCssR, "Left", false, marginBorder);
  const hasBorder = visibleBorderTop || borderBottom;
  const paddingStyleRaw = hasBorder
    ? borderCompensatedPadding(padding, visibleBorderTop, borderBottom)
    : { padding };
  const paddingStyle = mergeSnapIntoPaddingStyle(paddingStyleRaw, snapPadPx);

  return (
    <Tag
      ref={setSectionRef}
      id={id}
      data-slot="sigilsection"
      className={cn("grid", className)}
      style={{
        ...gridCols,
        "--s-frame-rail-gap": `min(${railGap}px, max(var(--s-gutter-sm, 16px), 4vw))`,
        "--s-frame-content-max": `${contentMax}px`,
        "--s-grid-cell": `${gridCell}px`,
        ...style,
      } as CSSProperties}
    >
      <div aria-hidden="true" style={marginL.container}>
        {marginL.overlay && <div style={marginL.overlay} />}
      </div>
      <SigilGutter
        showGrid={showGutterGrid}
        gridCell={gridCell}
        pattern={gutterPattern}
        side="left"
      />
      <div
        ref={setPaddedRef}
        data-grid-snap-bottom={snapBottomToGrid ? "true" : undefined}
        data-sigil-snap-pad={
          snapBottomToGrid && snapPadPx > 0
            ? String(Math.round(snapPadPx * 1000) / 1000)
            : undefined
        }
        className="relative"
        style={{
          boxSizing: "border-box",
          background: "var(--s-background)",
          ...paddingStyle,
          borderTop: visibleBorderTop ? SECTION_BORDER : undefined,
          borderBottom: borderBottom ? SECTION_BORDER : undefined,
        }}
      >
        {showCrosses && visibleBorderTop && (
          <CrossRow position="top" crossStroke={crossStroke} />
        )}
        {children}
        {showCrosses && borderBottom && (
          <CrossRow position="bottom" crossStroke={crossStroke} />
        )}
      </div>
      <SigilGutter
        showGrid={showGutterGrid}
        gridCell={gridCell}
        pattern={gutterPattern}
        side="right"
      />
      <div aria-hidden="true" style={marginR.container}>
        {marginR.overlay && <div style={marginR.overlay} />}
      </div>
    </Tag>
  );
}
