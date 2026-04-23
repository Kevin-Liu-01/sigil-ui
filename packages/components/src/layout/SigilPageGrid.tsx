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

function patternStyles(
  pattern: GutterPattern,
  cell: number,
): { backgroundImage: string; backgroundSize: string } | null {
  const C = COLOR;
  switch (pattern) {
    case "grid":
      return {
        backgroundImage: [
          `linear-gradient(to right, ${C} 1px, transparent 1px)`,
          `linear-gradient(to bottom, transparent ${cell - 1}px, ${C} ${cell - 1}px)`,
        ].join(", "),
        backgroundSize: `${cell}px ${cell}px`,
      };
    case "dots":
      return {
        backgroundImage: `radial-gradient(circle, ${C} 0.75px, transparent 0.75px)`,
        backgroundSize: `${cell}px ${cell}px`,
      };
    case "crosshatch":
      return {
        backgroundImage: [
          `linear-gradient(45deg, ${C} 0.5px, transparent 0.5px)`,
          `linear-gradient(-45deg, ${C} 0.5px, transparent 0.5px)`,
        ].join(", "),
        backgroundSize: `${cell}px ${cell}px`,
      };
    case "diagonal":
      return {
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent ${cell - 1}px, ${C} ${cell - 1}px, ${C} ${cell}px)`,
        backgroundSize: `${cell * 1.414}px ${cell * 1.414}px`,
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
        backgroundImage: `linear-gradient(to bottom, transparent ${cell - 1}px, ${C} ${cell - 1}px)`,
        backgroundSize: `100% ${cell}px`,
      };
    case "hexagon": {
      const h = cell;
      const w = Math.round(h * 0.866);
      return {
        backgroundImage: [
          `radial-gradient(circle farthest-side at 0% 50%, ${C} 23%, transparent 24%)`,
          `radial-gradient(circle farthest-side at 100% 50%, ${C} 23%, transparent 24%)`,
          `radial-gradient(circle farthest-side at 50% 0%, ${C} 23%, transparent 24%)`,
          `radial-gradient(circle farthest-side at 50% 100%, ${C} 23%, transparent 24%)`,
        ].join(", "),
        backgroundSize: `${w}px ${h}px`,
      };
    }
    case "triangle":
      return {
        backgroundImage: [
          `linear-gradient(60deg, ${C} 0.5px, transparent 0.5px)`,
          `linear-gradient(-60deg, ${C} 0.5px, transparent 0.5px)`,
          `linear-gradient(to bottom, transparent ${cell - 1}px, ${C} ${cell - 1}px)`,
        ].join(", "),
        backgroundSize: `${cell}px ${cell}px`,
      };
    case "zigzag": {
      const h = cell;
      return {
        backgroundImage: [
          `linear-gradient(135deg, ${C} 25%, transparent 25%)`,
          `linear-gradient(225deg, ${C} 25%, transparent 25%)`,
          `linear-gradient(315deg, ${C} 25%, transparent 25%)`,
          `linear-gradient(45deg, ${C} 25%, transparent 25%)`,
        ].join(", "),
        backgroundSize: `${h}px ${h}px`,
      };
    }
    case "checker": {
      const h = cell / 2;
      return {
        backgroundImage: [
          `linear-gradient(45deg, ${C} 25%, transparent 25%, transparent 75%, ${C} 75%)`,
          `linear-gradient(45deg, ${C} 25%, transparent 25%, transparent 75%, ${C} 75%)`,
        ].join(", "),
        backgroundSize: `${cell}px ${cell}px`,
      };
    }
    case "plus":
      return {
        backgroundImage: [
          `linear-gradient(to right, transparent ${(cell - 1) / 2}px, ${C} ${(cell - 1) / 2}px, ${C} ${(cell + 1) / 2}px, transparent ${(cell + 1) / 2}px)`,
          `linear-gradient(to bottom, transparent ${(cell - 1) / 2}px, ${C} ${(cell - 1) / 2}px, ${C} ${(cell + 1) / 2}px, transparent ${(cell + 1) / 2}px)`,
        ].join(", "),
        backgroundSize: `${cell}px ${cell}px`,
      };
    case "brick":
      return {
        backgroundImage: [
          `linear-gradient(to right, ${C} 1px, transparent 1px)`,
          `linear-gradient(to bottom, transparent ${cell - 1}px, ${C} ${cell - 1}px)`,
        ].join(", "),
        backgroundSize: `${cell}px ${cell / 2}px`,
      };
    case "wave":
      return {
        backgroundImage: `repeating-linear-gradient(30deg, transparent, transparent ${cell - 1}px, ${C} ${cell - 1}px, ${C} ${cell}px)`,
        backgroundSize: `${Math.round(cell * 1.15)}px ${cell}px`,
      };
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
}

const DEFAULTS: PageGridConfig = {
  railGap: 24,
  contentMax: 1200,
  gridCell: 48,
  crossStroke: 1.5,
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
  className?: string;
}

export function SigilGutter({
  showGrid = true,
  gridCell,
  pattern = "grid",
  className,
}: SigilGutterProps) {
  const cell = gridCell ?? DEFAULTS.gridCell;
  const patternCss = showGrid ? patternStyles(pattern, cell) : null;

  return (
    <div
      aria-hidden="true"
      className={cn("relative overflow-hidden", className)}
      style={{
        borderLeft: "1px solid var(--s-border)",
        borderRight: "1px solid var(--s-border)",
        background: "var(--s-background)",
      }}
    >
      {patternCss && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: patternCss.backgroundImage,
            backgroundSize: patternCss.backgroundSize,
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
}: SigilPageGridProps) {
  const config: PageGridConfig = { railGap, contentMax, gridCell, crossStroke };

  const gridCols: CSSProperties = {
    gridTemplateColumns: `1fr ${railGap}px minmax(0, ${contentMax}px) ${railGap}px 1fr`,
  };

  const marginCell = Math.round(gridCell / 3);
  const marginCss = showMarginLines
    ? patternStyles(marginPattern, marginCell)
    : null;

  const marginStyle: CSSProperties = marginCss
    ? { backgroundImage: marginCss.backgroundImage, backgroundSize: marginCss.backgroundSize }
    : {};

  return (
    <PageGridContext.Provider value={config}>
      <div className={cn("grid min-h-screen", className)} style={gridCols}>
        <div aria-hidden="true" style={marginStyle} />
        <SigilGutter showGrid={showGutterGrid} gridCell={gridCell} pattern={gutterPattern} />
        <div
          className="flex min-w-0 flex-col"
          style={{ background: "var(--s-background)" }}
        >
          {children}
        </div>
        <SigilGutter showGrid={showGutterGrid} gridCell={gridCell} pattern={gutterPattern} />
        <div aria-hidden="true" style={marginStyle} />
      </div>
    </PageGridContext.Provider>
  );
}
