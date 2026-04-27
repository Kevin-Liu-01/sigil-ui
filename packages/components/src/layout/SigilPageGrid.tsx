"use client";

import {
  createContext,
  useContext,
  type ReactNode,
  type CSSProperties,
} from "react";
import { cn } from "../utils";
import type { GutterPattern } from "@sigil-ui/tokens";

/* ------------------------------------------------------------------ */
/* Pattern generator                                                    */
/* ------------------------------------------------------------------ */

const STRUCTURAL_LINE_COLOR = "var(--s-grid-line-color, var(--s-border-muted))";
const STRUCTURAL_BORDER =
  "var(--s-gutter-border, var(--s-border-thin, 1px) var(--s-border-style, solid) var(--s-grid-line-color, var(--s-border-muted)))";
const COLOR = STRUCTURAL_LINE_COLOR;

export type PatternSide = "left" | "right";

const SVG_STROKE_MASK = "white";

function buildLineSvg(
  tileW: number,
  tileH: number,
  lines: number[][],
): string {
  const lineEls = lines
    .map(
      ([x1, y1, x2, y2]) =>
        `<line x1='${x1}' y1='${y1}' x2='${x2}' y2='${y2}' stroke='${SVG_STROKE_MASK}' stroke-width='1'/>`,
    )
    .join("");
  return `<svg xmlns='http://www.w3.org/2000/svg' width='${tileW}' height='${tileH}'>${lineEls}</svg>`;
}

function mirrorLinesX(lines: number[][], tileW: number): number[][] {
  return lines.map(([x1, y1, x2, y2]) => [tileW - x1, y1, tileW - x2, y2]);
}

function getHexLines(cell: number): { w: number; h: number; lines: number[][] } {
  const s = Math.round(cell * 0.5);
  const w = Math.round(s * 1.732);
  const tileH = s * 3;
  const halfS = Math.round(s / 2);
  const threeHalfS = Math.round(s * 1.5);
  return {
    w,
    h: tileH,
    lines: [
      [w / 2, 0, w, halfS],
      [w, halfS, w, threeHalfS],
      [w, threeHalfS, w / 2, s * 2],
      [w / 2, s * 2, 0, threeHalfS],
      [0, threeHalfS, 0, halfS],
      [0, halfS, w / 2, 0],
      [w / 2, s * 2, w / 2, tileH],
    ],
  };
}

function getTriangleLines(cell: number): { w: number; h: number; lines: number[][] } {
  const side = cell;
  const h = Math.round(side * 0.866);
  const half = Math.round(side / 2);
  return {
    w: side,
    h: h * 2,
    lines: [
      [0, 0, side, 0],
      [0, h, side, h],
      [0, h * 2, side, h * 2],
      [0, 0, half, h],
      [half, h, 0, h * 2],
      [half, h, side, h * 2],
      [side, 0, half, h],
    ],
  };
}

function getBrickLines(cell: number): { w: number; h: number; lines: number[][] } {
  const rowH = Math.round(cell / 2);
  const half = Math.round(cell / 2);
  return {
    w: cell,
    h: rowH * 2,
    lines: [
      [0, rowH, cell, rowH],
      [0, rowH * 2, cell, rowH * 2],
      [0, 0, 0, rowH],
      [half, rowH, half, rowH * 2],
    ],
  };
}

export type SigilPatternStyles = {
  backgroundImage: string;
  backgroundSize: string;
  backgroundPosition?: string;
  isMask?: boolean;
};

const PATTERN_CELL_SCALE: Partial<Record<GutterPattern, number>> = {
  grid: 0.5,
  dots: 0.5,
  crosshatch: 0.5,
  diagonal: 0.5,
  diamond: 0.5,
  hexagon: 0.5,
  triangle: 0.5,
  zigzag: 0.5,
  checker: 0.5,
  plus: 0.5,
  brick: 0.5,
  wave: 0.5,
};

export function getSigilPatternStyles(
  pattern: GutterPattern,
  cell: number,
  side: PatternSide = "left",
): SigilPatternStyles | null {
  const C = COLOR;
  const R = side === "right";
  const scale = PATTERN_CELL_SCALE[pattern] ?? 1;
  const s = Math.max(Math.round(cell * scale), 8);
  switch (pattern) {
    case "grid": {
      return {
        backgroundImage: [
          `linear-gradient(${R ? "to left" : "to right"}, ${C} 1px, transparent 1px)`,
          `linear-gradient(to bottom, ${C} 1px, transparent 1px)`,
        ].join(", "),
        backgroundSize: `${s}px ${s}px`,
      };
    }
    case "dots":
      return {
        backgroundImage: `radial-gradient(circle, ${C} 1px, transparent 1px)`,
        backgroundSize: `${s}px ${s}px`,
        backgroundPosition: R
          ? `0px ${s / 2}px`
          : `${s / 2}px ${s / 2}px`,
      };
    case "crosshatch": {
      const a = R ? -45 : 45;
      const b = R ? 45 : -45;
      return {
        backgroundImage: [
          `repeating-linear-gradient(${a}deg, transparent, transparent ${s - 1}px, ${C} ${s - 1}px, ${C} ${s}px)`,
          `repeating-linear-gradient(${b}deg, transparent, transparent ${s - 1}px, ${C} ${s - 1}px, ${C} ${s}px)`,
        ].join(", "),
        backgroundSize: "100% 100%, 100% 100%",
      };
    }
    case "diagonal": {
      const angle = R ? -45 : 45;
      return {
        backgroundImage: `repeating-linear-gradient(${angle}deg, transparent, transparent ${s - 1}px, ${C} ${s - 1}px, ${C} ${s}px)`,
        backgroundSize: "100% 100%",
      };
    }
    case "diamond": {
      const h = s / 2;
      const a = R ? -45 : 45;
      const b = R ? 45 : -45;
      return {
        backgroundImage: [
          `linear-gradient(${a}deg, ${C} 25%, transparent 25%, transparent 75%, ${C} 75%)`,
          `linear-gradient(${b}deg, ${C} 25%, transparent 25%, transparent 75%, ${C} 75%)`,
        ].join(", "),
        backgroundSize: `${h}px ${h}px`,
      };
    }
    case "horizontal":
      return {
        backgroundImage: `linear-gradient(to bottom, ${C} 1px, transparent 1px)`,
        backgroundSize: `100% ${cell}px`,
      };
    case "horizontal-thin": {
      const thin = Math.round(cell / 3);
      return {
        backgroundImage: `linear-gradient(to bottom, ${C} 1px, transparent 1px)`,
        backgroundSize: `100% ${thin}px`,
      };
    }
    case "horizontal-wide": {
      const wide = cell * 3;
      return {
        backgroundImage: `linear-gradient(to bottom, ${C} 1px, transparent 1px)`,
        backgroundSize: `100% ${wide}px`,
      };
    }
    case "hexagon": {
      const { w, h, lines } = getHexLines(s);
      const svg = buildLineSvg(w, h, R ? mirrorLinesX(lines, w) : lines);
      return {
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
        backgroundSize: `${w}px ${h}px`,
        isMask: true,
      };
    }
    case "triangle": {
      const { w, h, lines } = getTriangleLines(s);
      const svg = buildLineSvg(w, h, R ? mirrorLinesX(lines, w) : lines);
      return {
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
        backgroundSize: `${w}px ${h}px`,
        isMask: true,
      };
    }
    case "zigzag": {
      const [a1, a2, a3, a4] = R ? [45, 315, 225, 135] : [135, 225, 315, 45];
      return {
        backgroundImage: [
          `linear-gradient(${a1}deg, ${C} 25%, transparent 25%)`,
          `linear-gradient(${a2}deg, ${C} 25%, transparent 25%)`,
          `linear-gradient(${a3}deg, ${C} 25%, transparent 25%)`,
          `linear-gradient(${a4}deg, ${C} 25%, transparent 25%)`,
        ].join(", "),
        backgroundSize: `${s}px ${s}px`,
      };
    }
    case "checker": {
      const h = s / 2;
      const a = R ? -45 : 45;
      return {
        backgroundImage: [
          `linear-gradient(${a}deg, ${C} 25%, transparent 25%, transparent 75%, ${C} 75%)`,
          `linear-gradient(${a}deg, ${C} 25%, transparent 25%, transparent 75%, ${C} 75%)`,
        ].join(", "),
        backgroundSize: `${s}px ${s}px`,
        backgroundPosition: R
          ? `${h}px ${h}px, 0 0`
          : `0 0, ${h}px ${h}px`,
      };
    }
    case "plus": {
      const mid = Math.floor(s / 2);
      const dir = R ? "to left" : "to right";
      const vDir = R ? "to top" : "to bottom";
      return {
        backgroundImage: [
          `linear-gradient(${dir}, transparent ${mid}px, ${C} ${mid}px, ${C} ${mid + 1}px, transparent ${mid + 1}px)`,
          `linear-gradient(${vDir}, transparent ${mid}px, ${C} ${mid}px, ${C} ${mid + 1}px, transparent ${mid + 1}px)`,
        ].join(", "),
        backgroundSize: `${s}px ${s}px`,
      };
    }
    case "brick": {
      const { w, h, lines } = getBrickLines(s);
      const svg = buildLineSvg(w, h, R ? mirrorLinesX(lines, w) : lines);
      return {
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
        backgroundSize: `${w}px ${h}px`,
        isMask: true,
      };
    }
    case "wave": {
      const w = s;
      const h = s;
      const a = h * 0.35;
      const mid = h / 2;
      const pts: string[] = [];
      const steps = 40;
      const sign = R ? -1 : 1;
      for (let i = 0; i <= steps; i++) {
        const x = R ? w - (i / steps) * w : (i / steps) * w;
        const y = mid + sign * a * Math.sin((i / steps) * Math.PI * 2);
        pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
      }
      const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><path d='${pts.join(" ")}' fill='none' stroke='${SVG_STROKE_MASK}' stroke-width='1'/></svg>`;
      return {
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
        backgroundSize: `${w}px ${h}px`,
        isMask: true,
      };
    }
    case "none":
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/* Context                                                              */
/* ------------------------------------------------------------------ */

export interface PageGridConfig {
  railGap: number;
  contentMax: number;
  gridCell: number;
  crossStroke: number;
  gutterPattern: GutterPattern;
  marginPattern: GutterPattern;
  edgeless: boolean;
}

const DEFAULTS: PageGridConfig = {
  railGap: 48,
  contentMax: 1200,
  gridCell: 16,
  crossStroke: 1.5,
  gutterPattern: "grid",
  marginPattern: "horizontal",
  edgeless: false,
};

const PageGridContext = createContext<PageGridConfig | null>(null);

export function usePageGridConfig() {
  return useContext(PageGridContext);
}

export function useIsInsidePageGrid() {
  return useContext(PageGridContext) !== null;
}

/* ------------------------------------------------------------------ */
/* Gutter                                                               */
/* ------------------------------------------------------------------ */

export interface SigilGutterProps {
  showGrid?: boolean;
  gridCell?: number;
  pattern?: GutterPattern;
  side?: PatternSide;
  visible?: boolean;
  className?: string;
}

export function SigilGutter({
  showGrid = true,
  gridCell,
  pattern = "grid",
  side = "left",
  visible = true,
  className,
}: SigilGutterProps) {
  if (!visible) {
    return <div aria-hidden="true" />;
  }

  const cell = gridCell ?? DEFAULTS.gridCell;
  const patternCss = showGrid ? getSigilPatternStyles(pattern, cell, side) : null;

  if (!patternCss) {
    return <div aria-hidden="true" />;
  }

  return (
    <div
      aria-hidden="true"
      data-slot="sigilpagegrid" className={cn("relative overflow-hidden", className)}
      style={{
        borderLeft: STRUCTURAL_BORDER,
        borderRight: STRUCTURAL_BORDER,
        background: "var(--s-background)",
      }}
    >
      <div
        className="absolute inset-0"
        style={patternCss.isMask ? {
          backgroundColor: COLOR,
          WebkitMaskImage: patternCss.backgroundImage,
          WebkitMaskSize: patternCss.backgroundSize,
          WebkitMaskRepeat: "repeat",
          maskImage: patternCss.backgroundImage,
          maskSize: patternCss.backgroundSize,
          maskRepeat: "repeat",
          ...(patternCss.backgroundPosition ? { WebkitMaskPosition: patternCss.backgroundPosition, maskPosition: patternCss.backgroundPosition } : {}),
        } : {
          backgroundImage: patternCss.backgroundImage,
          backgroundSize: patternCss.backgroundSize,
          ...(patternCss.backgroundPosition ? { backgroundPosition: patternCss.backgroundPosition } : {}),
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SigilPageGrid                                                        */
/* ------------------------------------------------------------------ */

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

export function SigilPageGrid({
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
  const config: PageGridConfig = {
    railGap: effectiveRailGap,
    contentMax,
    gridCell,
    crossStroke,
    gutterPattern,
    marginPattern,
    edgeless,
  };

  const gridCols: CSSProperties = {
    gridTemplateColumns: `1fr ${effectiveRailGap}px minmax(0, ${contentMax}px) ${effectiveRailGap}px 1fr`,
  };

  const marginCell = gridCell;
  const marginCssL = !edgeless && showMarginLines
    ? getSigilPatternStyles(marginPattern, marginCell, "left")
    : null;
  const marginCssR = !edgeless && showMarginLines
    ? getSigilPatternStyles(marginPattern, marginCell, "right")
    : null;

  const gutterVisible = !edgeless && effectiveRailGap > 0;

  function buildMarginStyle(css: SigilPatternStyles | null, innerEdge: "Right" | "Left"): CSSProperties {
    const base: CSSProperties = { backgroundColor: "var(--s-background)" };
    if (css) {
      if (css.isMask) {
        Object.assign(base, {
          backgroundColor: COLOR,
          WebkitMaskImage: css.backgroundImage,
          WebkitMaskSize: css.backgroundSize,
          WebkitMaskRepeat: "repeat",
          maskImage: css.backgroundImage,
          maskSize: css.backgroundSize,
          maskRepeat: "repeat" as const,
          ...(css.backgroundPosition ? { WebkitMaskPosition: css.backgroundPosition, maskPosition: css.backgroundPosition } : {}),
        });
      } else {
        Object.assign(base, {
          backgroundImage: css.backgroundImage,
          backgroundSize: css.backgroundSize,
          ...(css.backgroundPosition ? { backgroundPosition: css.backgroundPosition } : {}),
        });
      }
    }
    if (!edgeless && !gutterVisible) {
      const prop = `border${innerEdge}` as keyof CSSProperties;
      Object.assign(base, {
        [prop]: marginBorder ?? "var(--s-margin-border, none)",
      });
    }
    return base;
  }

  const marginStyleL = buildMarginStyle(marginCssL, "Right");
  const marginStyleR = buildMarginStyle(marginCssR, "Left");

  return (
    <PageGridContext.Provider value={config}>
      <div data-slot="sigilpagegrid" className={cn("grid min-h-screen", className)} style={gridCols}>
        <div aria-hidden="true" style={marginStyleL} />
        <SigilGutter showGrid={showGutterGrid} gridCell={gridCell} pattern={gutterPattern} side="left" visible={gutterVisible} />
        <div
          className="relative flex min-w-0 flex-col"
          style={{ background: "var(--s-background)" }}
        >
          {!edgeless && showGutterGrid && gutterPattern !== "none" && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0"
              style={{
                backgroundImage: `linear-gradient(to bottom, ${STRUCTURAL_LINE_COLOR} 1px, transparent 1px)`,
                backgroundSize: `100% ${gridCell}px`,
              }}
            />
          )}
          <div className="relative z-[1] flex min-w-0 flex-col flex-1">
            {children}
          </div>
        </div>
        <SigilGutter showGrid={showGutterGrid} gridCell={gridCell} pattern={gutterPattern} side="right" visible={gutterVisible} />
        <div aria-hidden="true" style={marginStyleR} />
      </div>
    </PageGridContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/* SigilFrame — the outermost page wrapper                              */
/* ------------------------------------------------------------------ */

export interface SigilFrameProps extends SigilPageGridProps {
  /** HTML element for the outer wrapper. @default "div" */
  as?: "div" | "main" | "article";
}


/**
 * Top-level page frame that wraps all content in the 5-column
 * structural grid: margin | gutter | content | gutter | margin.
 *
 * This is the recommended entry point for any Sigil page layout.
 * Place your navbar, sections, and footer as direct children —
 * they all render inside the content column between the gutters.
 *
 * Pass `edgeless` to strip all gutter/margin decoration so
 * gutters collapse to 0px and margins become empty space.
 *
 * ```tsx
 * <SigilFrame>
 *   <MyNavbar />
 *   <SigilSection borderTop>...</SigilSection>
 *   <MyFooter />
 * </SigilFrame>
 *
 * <SigilFrame edgeless>
 *   <SigilSection>...</SigilSection>
 * </SigilFrame>
 * ```
 */
export function SigilFrame({
  as: Tag = "div",
  children,
  ...props
}: SigilFrameProps) {
  return <SigilPageGrid {...props}>{children}</SigilPageGrid>;
}

/* ------------------------------------------------------------------ */
/* SigilFullBleed — full-viewport child with content-max constraint    */
/* ------------------------------------------------------------------ */

export interface SigilFullBleedProps {
  children: ReactNode;
  className?: string;
  /** Background applied to the full-width outer wrapper. */
  background?: string;
  /** Override the inner content max-width. Uses --s-content-max by default. */
  contentMax?: string;
  /** Horizontal padding inside the max-width container. */
  padding?: string;
}

/**
 * Full-viewport-width wrapper that constrains inner content
 * to `content-max`. Use for navbars and footers that need a
 * full-bleed background but centered content.
 *
 * Works both inside and outside `SigilPageGrid`.
 * Inside the grid it breaks out via `100vw` + negative margin.
 * Outside the grid it simply fills its parent width.
 */
export function SigilFullBleed({
  children,
  className,
  background,
  contentMax,
  padding = "0 var(--s-page-margin, 24px)",
}: SigilFullBleedProps) {
  return (
    <div
      data-slot="sigil-fullbleed"
      className={cn("w-screen relative left-1/2 -translate-x-1/2", className)}
      style={{ background }}
    >
      <div
        className="mx-auto w-full"
        style={{
          maxWidth: contentMax ?? "var(--s-content-max, 1200px)",
          padding,
        }}
      >
        {children}
      </div>
    </div>
  );
}
