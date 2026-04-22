"use client";

import {
  createContext,
  useContext,
  type ReactNode,
  type CSSProperties,
} from "react";
import { cn } from "../utils";

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

/** Returns the grid config if inside a SigilPageGrid, else null. */
export function usePageGridConfig() {
  return useContext(PageGridContext);
}

/** Returns true when rendered inside a SigilPageGrid. */
export function useIsInsidePageGrid() {
  return useContext(PageGridContext) !== null;
}

/* ------------------------------------------------------------------ */
/* Gutter                                                               */
/* ------------------------------------------------------------------ */

export interface SigilGutterProps {
  showGrid?: boolean;
  gridCell?: number;
  className?: string;
}

/**
 * Vertical gutter rail with optional micro-grid pattern.
 * Used inside SigilPageGrid and SigilSection standalone mode.
 */
export function SigilGutter({
  showGrid = true,
  gridCell,
  className,
}: SigilGutterProps) {
  const cell = gridCell ?? DEFAULTS.gridCell;
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
      {showGrid && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: [
              `linear-gradient(to right, var(--s-border-muted) 1px, transparent 1px)`,
              `linear-gradient(to bottom, transparent ${cell - 1}px, var(--s-border-muted) ${cell - 1}px)`,
            ].join(", "),
            backgroundSize: `${cell}px ${cell}px`,
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
}

/**
 * 5-column page grid: margin | gutter | content | gutter | margin.
 *
 * Provides PageGridContext so descendants (SigilSection, etc.) can
 * auto-detect that they're inside the grid and adjust rendering.
 */
export function SigilPageGrid({
  children,
  className,
  contentMax = DEFAULTS.contentMax,
  railGap = DEFAULTS.railGap,
  gridCell = DEFAULTS.gridCell,
  crossStroke = DEFAULTS.crossStroke,
  showGutterGrid = true,
  showMarginLines = true,
}: SigilPageGridProps) {
  const config: PageGridConfig = { railGap, contentMax, gridCell, crossStroke };

  const gridCols: CSSProperties = {
    gridTemplateColumns: `1fr ${railGap}px minmax(0, ${contentMax}px) ${railGap}px 1fr`,
  };

  const marginBg = showMarginLines
    ? `linear-gradient(to bottom, transparent ${gridCell / 3 - 1}px, var(--s-border-muted) ${gridCell / 3 - 1}px)`
    : "none";
  const marginBgSize = `100% ${gridCell / 3}px`;

  return (
    <PageGridContext.Provider value={config}>
      <div className={cn("grid min-h-screen", className)} style={gridCols}>
        <div
          aria-hidden="true"
          style={{ backgroundImage: marginBg, backgroundSize: marginBgSize }}
        />
        <SigilGutter showGrid={showGutterGrid} gridCell={gridCell} />
        <div
          className="flex min-w-0 flex-col"
          style={{ background: "var(--s-background)" }}
        >
          {children}
        </div>
        <SigilGutter showGrid={showGutterGrid} gridCell={gridCell} />
        <div
          aria-hidden="true"
          style={{ backgroundImage: marginBg, backgroundSize: marginBgSize }}
        />
      </div>
    </PageGridContext.Provider>
  );
}
