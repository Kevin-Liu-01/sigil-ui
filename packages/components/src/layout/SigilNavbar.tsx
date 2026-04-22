"use client";

import { type ReactNode, type CSSProperties } from "react";
import { cn } from "../utils";

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
  /** Content max width. @default 1200 */
  contentMax?: number;
  /** Rail gap. @default 24 */
  railGap?: number;
  /** Fix the navbar to the viewport top. @default true */
  fixed?: boolean;
  /** Style applied to the outer element (header or nav). */
  style?: CSSProperties;
}

/**
 * Navbar aligned to the 5-column page grid.
 *
 * The **full** variant renders a `<header>` containing its own
 * `margin | gutter | nav | gutter | margin` grid so gutter borders
 * line up perfectly with SigilPageGrid.
 *
 * The **inline** variant renders a `<nav>` with a bottom border,
 * designed for use inside a SigilPageGrid content column.
 */
export function SigilNavbar({
  children,
  className,
  variant = "full",
  contentMax = DEFAULTS.contentMax,
  railGap = DEFAULTS.railGap,
  fixed = true,
  style,
}: SigilNavbarProps) {
  if (variant === "inline") {
    return (
      <nav
        className={cn("sigil-navbar", className)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "var(--s-nav-navbar-height, 56px)",
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

  return (
    <header
      className={cn(
        "sigil-navbar",
        fixed && "fixed top-0 left-0 right-0 z-50",
        className,
      )}
      style={style}
    >
      <div className="grid" style={gridCols}>
        {/* Left margin */}
        <div aria-hidden="true" />

        {/* Left gutter */}
        <div
          aria-hidden="true"
          style={{
            borderLeft: "1px solid var(--s-border)",
            borderRight: "1px solid var(--s-border)",
          }}
        />

        {/* Content — nav */}
        <nav
          className="flex items-center justify-between"
          style={{ height: "var(--s-nav-navbar-height, 56px)" }}
        >
          {children}
        </nav>

        {/* Right gutter */}
        <div
          aria-hidden="true"
          style={{
            borderLeft: "1px solid var(--s-border)",
            borderRight: "1px solid var(--s-border)",
          }}
        />

        {/* Right margin */}
        <div aria-hidden="true" />
      </div>
    </header>
  );
}
