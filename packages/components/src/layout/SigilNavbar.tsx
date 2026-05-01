"use client";

import { type ReactNode, type CSSProperties } from "react";
import { cn } from "../utils";
import { SigilGutter } from "./SigilPageGrid";
import type { GutterPattern } from "@sigil-ui/tokens";

const DEFAULTS = {
  railGap: 24,
  contentMax: 1200,
};

/* ------------------------------------------------------------------ */
/* SigilNavbar                                                          */
/* ------------------------------------------------------------------ */

export interface SigilNavbarProps {
  children: ReactNode;
  className?: string;
  /**
   * "full" — renders its own 5-column grid so the nav content aligns
   * with the SigilPageGrid content column, with structural gutter
   * borders flanking the nav.
   *
   * "inline" — a plain `<nav>` with a bottom border, suitable for
   * nesting inside a SigilPageGrid content column.
   *
   * @default "full"
   */
  variant?: "full" | "inline";
  contentMax?: number;
  railGap?: number;
  gridCell?: number;
  fixed?: boolean;
  gutterPattern?: GutterPattern;
  marginPattern?: GutterPattern;
  showGutterGrid?: boolean;
  showMarginLines?: boolean;
  style?: CSSProperties;
}

export function SigilNavbar({
  children,
  className,
  variant = "full",
  contentMax = DEFAULTS.contentMax,
  railGap = DEFAULTS.railGap,
  gridCell = 48,
  fixed = true,
  gutterPattern = "grid",
  marginPattern = "horizontal",
  showGutterGrid = true,
  showMarginLines = true,
  style,
}: SigilNavbarProps) {
  if (variant === "inline") {
    return (
      <nav
        data-slot="sigilnavbar" className={cn("sigil-navbar", className)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "var(--s-navbar-height, 56px)",
          borderBottom: "1px solid var(--s-border)",
          ...style,
        }}
      >
        {children}
      </nav>
    );
  }

  const gridCols: CSSProperties = {
    gridTemplateColumns: `1fr ${railGap}px minmax(0, ${contentMax}px) ${railGap}px 1fr`,
  };

  const marginCell = Math.round(gridCell / 3);

  function marginBg(side: "left" | "right"): CSSProperties {
    if (!showMarginLines || marginPattern === "none") return { background: "var(--s-background)" };
    const angle = side === "left" ? 45 : -45;
    const C = "var(--s-border-muted)";
    if (marginPattern === "horizontal") {
      return {
        backgroundColor: "var(--s-background)",
        backgroundImage: `linear-gradient(to bottom, transparent ${marginCell - 1}px, ${C} ${marginCell - 1}px)`,
        backgroundSize: `100% ${marginCell}px`,
      };
    }
    if (marginPattern === "dots") {
      return {
        backgroundColor: "var(--s-background)",
        backgroundImage: `radial-gradient(circle, ${C} 0.75px, transparent 0.75px)`,
        backgroundSize: `${marginCell}px ${marginCell}px`,
      };
    }
    return {
      backgroundColor: "var(--s-background)",
      backgroundImage: `repeating-linear-gradient(${angle}deg, transparent, transparent ${marginCell - 1}px, ${C} ${marginCell - 1}px, ${C} ${marginCell}px)`,
      backgroundSize: `${Math.round(marginCell * 1.414)}px ${Math.round(marginCell * 1.414)}px`,
    };
  }

  return (
    <header
      data-slot="sigilnavbar" className={cn(
        "sigil-navbar",
        fixed && "fixed top-0 left-0 right-0 z-50",
        className,
      )}
      style={style}
    >
      <div className="grid" style={gridCols}>
        <div aria-hidden="true" style={marginBg("left")} />
        <SigilGutter showGrid={showGutterGrid} gridCell={gridCell} pattern={gutterPattern} side="left" />
        <nav
          className="flex items-center justify-between"
          style={{
            height: "var(--s-navbar-height, 56px)",
            padding: "0 20px",
            background: "var(--s-background)",
          }}
        >
          {children}
        </nav>
        <SigilGutter showGrid={showGutterGrid} gridCell={gridCell} pattern={gutterPattern} side="right" />
        <div aria-hidden="true" style={marginBg("right")} />
      </div>
    </header>
  );
}
