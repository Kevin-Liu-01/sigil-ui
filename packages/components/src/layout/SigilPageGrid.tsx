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

const COLOR = "var(--s-border-muted)";

type PatternSide = "left" | "right";

const SVG_STROKE = "oklch(0.62 0.02 280 / 0.24)";

function buildHexSvg(cell: number): string {
  const s = Math.round(cell * 0.5);
  const w = Math.round(s * 1.732);
  const tileH = s * 3;
  const halfS = Math.round(s / 2);
  const threeHalfS = Math.round(s * 1.5);

  const lines = [
    [w / 2, 0, w, halfS],
    [w, halfS, w, threeHalfS],
    [w, threeHalfS, w / 2, s * 2],
    [w / 2, s * 2, 0, threeHalfS],
    [0, threeHalfS, 0, halfS],
    [0, halfS, w / 2, 0],
    [w / 2, s * 2, w / 2, tileH],
  ];

  const lineEls = lines
    .map(
      ([x1, y1, x2, y2]) =>
        `<line x1='${x1}' y1='${y1}' x2='${x2}' y2='${y2}' stroke='${SVG_STROKE}' stroke-width='1'/>`,
    )
    .join("");

  return [
    `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${tileH}'>`,
    lineEls,
    `</svg>`,
  ].join("");
}

function buildTriangleSvg(cell: number): string {
  const side = cell;
  const h = Math.round(side * 0.866);
  const half = Math.round(side / 2);
  const tileW = side;
  const tileH = h * 2;

  const lines = [
    [0, 0, tileW, 0],
    [0, h, tileW, h],
    [0, tileH, tileW, tileH],
    [0, 0, half, h],
    [half, h, 0, tileH],
    [half, h, tileW, tileH],
    [tileW, 0, half, h],
  ];

  const lineEls = lines
    .map(
      ([x1, y1, x2, y2]) =>
        `<line x1='${x1}' y1='${y1}' x2='${x2}' y2='${y2}' stroke='${SVG_STROKE}' stroke-width='1'/>`,
    )
    .join("");

  return [
    `<svg xmlns='http://www.w3.org/2000/svg' width='${tileW}' height='${tileH}'>`,
    lineEls,
    `</svg>`,
  ].join("");
}

function patternStyles(
  pattern: GutterPattern,
  cell: number,
  _side: PatternSide = "left",
): { backgroundImage: string; backgroundSize: string; backgroundPosition?: string } | null {
  const C = COLOR;
  switch (pattern) {
    case "grid": {
      const mid = Math.floor(cell / 2);
      return {
        backgroundImage: [
          `linear-gradient(to right, transparent ${mid}px, ${C} ${mid}px, ${C} ${mid + 1}px, transparent ${mid + 1}px)`,
          `linear-gradient(to bottom, ${C} 1px, transparent 1px)`,
        ].join(", "),
        backgroundSize: `${cell}px ${cell}px`,
      };
    }
    case "dots":
      return {
        backgroundImage: `radial-gradient(circle, ${C} 1.2px, transparent 1.2px)`,
        backgroundSize: `${cell}px ${cell}px`,
        backgroundPosition: `${cell / 2}px ${cell / 2}px`,
      };
    case "crosshatch":
      return {
        backgroundImage: [
          `repeating-linear-gradient(45deg, transparent, transparent ${cell - 1}px, ${C} ${cell - 1}px, ${C} ${cell}px)`,
          `repeating-linear-gradient(-45deg, transparent, transparent ${cell - 1}px, ${C} ${cell - 1}px, ${C} ${cell}px)`,
        ].join(", "),
        backgroundSize: "100% 100%, 100% 100%",
      };
    case "diagonal":
      return {
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent ${cell - 1}px, ${C} ${cell - 1}px, ${C} ${cell}px)`,
        backgroundSize: "100% 100%",
      };
    case "diamond": {
      const h = cell / 2;
      return {
        backgroundImage: [
          `linear-gradient(45deg, ${C} 25%, transparent 25%, transparent 75%, ${C} 75%)`,
          `linear-gradient(-45deg, ${C} 25%, transparent 25%, transparent 75%, ${C} 75%)`,
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
      const s = Math.round(cell * 0.5);
      const w = Math.round(s * 1.732);
      const tileH = s * 3;
      const svg = buildHexSvg(cell);
      return {
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
        backgroundSize: `${w}px ${tileH}px`,
      };
    }
    case "triangle": {
      const h = Math.round(cell * 0.866);
      const tileH = h * 2;
      const svg = buildTriangleSvg(cell);
      return {
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
        backgroundSize: `${cell}px ${tileH}px`,
      };
    }
    case "zigzag":
      return {
        backgroundImage: [
          `linear-gradient(135deg, ${C} 25%, transparent 25%)`,
          `linear-gradient(225deg, ${C} 25%, transparent 25%)`,
          `linear-gradient(315deg, ${C} 25%, transparent 25%)`,
          `linear-gradient(45deg, ${C} 25%, transparent 25%)`,
        ].join(", "),
        backgroundSize: `${cell}px ${cell}px`,
      };
    case "checker": {
      const h = cell / 2;
      return {
        backgroundImage: [
          `linear-gradient(45deg, ${C} 25%, transparent 25%, transparent 75%, ${C} 75%)`,
          `linear-gradient(45deg, ${C} 25%, transparent 25%, transparent 75%, ${C} 75%)`,
        ].join(", "),
        backgroundSize: `${cell}px ${cell}px`,
        backgroundPosition: `0 0, ${h}px ${h}px`,
      };
    }
    case "plus": {
      const mid = Math.floor(cell / 2);
      return {
        backgroundImage: [
          `linear-gradient(to right, transparent ${mid}px, ${C} ${mid}px, ${C} ${mid + 1}px, transparent ${mid + 1}px)`,
          `linear-gradient(to bottom, transparent ${mid}px, ${C} ${mid}px, ${C} ${mid + 1}px, transparent ${mid + 1}px)`,
        ].join(", "),
        backgroundSize: `${cell}px ${cell}px`,
      };
    }
    case "brick": {
      const rowH = Math.round(cell / 2);
      const half = Math.round(cell / 2);
      const svg = [
        `<svg xmlns='http://www.w3.org/2000/svg' width='${cell}' height='${rowH * 2}'>`,
        `<line x1='0' y1='${rowH}' x2='${cell}' y2='${rowH}' stroke='${SVG_STROKE}' stroke-width='1'/>`,
        `<line x1='0' y1='${rowH * 2}' x2='${cell}' y2='${rowH * 2}' stroke='${SVG_STROKE}' stroke-width='1'/>`,
        `<line x1='0' y1='0' x2='0' y2='${rowH}' stroke='${SVG_STROKE}' stroke-width='1'/>`,
        `<line x1='${half}' y1='${rowH}' x2='${half}' y2='${rowH * 2}' stroke='${SVG_STROKE}' stroke-width='1'/>`,
        `</svg>`,
      ].join("");
      return {
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
        backgroundSize: `${cell}px ${rowH * 2}px`,
      };
    }
    case "wave": {
      const w = cell;
      const h = cell;
      const a = h * 0.35;
      const mid = h / 2;
      const pts: string[] = [];
      const steps = 40;
      for (let i = 0; i <= steps; i++) {
        const x = (i / steps) * w;
        const y = mid + a * Math.sin((i / steps) * Math.PI * 2);
        pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
      }
      const svg = [
        `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>`,
        `<path d='${pts.join(" ")}' fill='none' stroke='${SVG_STROKE}' stroke-width='1'/>`,
        `</svg>`,
      ].join("");
      return {
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
        backgroundSize: `${w}px ${h}px`,
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
  edgeless: boolean;
}

const DEFAULTS: PageGridConfig = {
  railGap: 48,
  contentMax: 1200,
  gridCell: 16,
  crossStroke: 1.5,
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
  const patternCss = showGrid ? patternStyles(pattern, cell, side) : null;

  return (
    <div
      aria-hidden="true"
      data-slot="sigilpagegrid" className={cn("relative overflow-hidden", className)}
      style={{
        borderLeft: "var(--s-gutter-border, 1px solid) var(--s-border)",
        borderRight: "var(--s-gutter-border, 1px solid) var(--s-border)",
        background: "var(--s-background)",
      }}
    >
      {patternCss && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: patternCss.backgroundImage,
            backgroundSize: patternCss.backgroundSize,
            ...(patternCss.backgroundPosition ? { backgroundPosition: patternCss.backgroundPosition } : {}),
          }}
        />
      )}
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
  const effectiveRailGap = edgeless ? 0 : railGap;
  const config: PageGridConfig = {
    railGap: effectiveRailGap,
    contentMax,
    gridCell,
    crossStroke,
    edgeless,
  };

  const gridCols: CSSProperties = {
    gridTemplateColumns: `1fr ${effectiveRailGap}px minmax(0, ${contentMax}px) ${effectiveRailGap}px 1fr`,
  };

  const marginCell = gridCell;
  const marginCssL = !edgeless && showMarginLines
    ? patternStyles(marginPattern, marginCell, "left")
    : null;
  const marginCssR = !edgeless && showMarginLines
    ? patternStyles(marginPattern, marginCell, "right")
    : null;

  const gutterVisible = !edgeless && effectiveRailGap > 0;

  const marginBorderVal = !edgeless && marginBorder && !gutterVisible
    ? `${marginBorder} var(--s-border)`
    : undefined;

  const marginStyleL: CSSProperties = {
    backgroundColor: "var(--s-background)",
    ...(marginCssL
      ? {
          backgroundImage: marginCssL.backgroundImage,
          backgroundSize: marginCssL.backgroundSize,
          ...(marginCssL.backgroundPosition ? { backgroundPosition: marginCssL.backgroundPosition } : {}),
        }
      : {}),
    ...(marginBorderVal ? { borderRight: marginBorderVal } : {}),
  };
  const marginStyleR: CSSProperties = {
    backgroundColor: "var(--s-background)",
    ...(marginCssR
      ? {
          backgroundImage: marginCssR.backgroundImage,
          backgroundSize: marginCssR.backgroundSize,
          ...(marginCssR.backgroundPosition ? { backgroundPosition: marginCssR.backgroundPosition } : {}),
        }
      : {}),
    ...(marginBorderVal ? { borderLeft: marginBorderVal } : {}),
  };

  return (
    <PageGridContext.Provider value={config}>
      <div data-slot="sigilpagegrid" className={cn("grid min-h-screen", className)} style={gridCols}>
        <div aria-hidden="true" style={marginStyleL} />
        <SigilGutter showGrid={showGutterGrid} gridCell={gridCell} pattern={gutterPattern} side="left" visible={gutterVisible} />
        <div
          className="flex min-w-0 flex-col"
          style={{ background: "var(--s-background)" }}
        >
          {children}
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
