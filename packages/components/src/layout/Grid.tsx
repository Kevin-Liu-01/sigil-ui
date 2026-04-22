"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface SigilGridProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of columns. @default 3 */
  columns?: 2 | 3 | 4 | 5 | 6;
  /** Gap between cells. */
  gap?: string | number;
  children?: ReactNode;
}

const colMap: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

/**
 * Grid with visible cross marks at cell intersections.
 * Uses a pseudo-element background to render the sigil pattern.
 */
export const SigilGrid = forwardRef<HTMLDivElement, SigilGridProps>(function SigilGrid(
  { columns = 3, gap, className, style, children, ...rest },
  ref,
) {
  const resolvedGap = typeof gap === "number" ? `${gap}px` : gap ?? "var(--s-grid-cell, 1rem)";

  return (
    <div
      ref={ref}
      className={cn("grid relative", colMap[columns], className)}
      style={{
        gap: resolvedGap,
        backgroundImage: `
          radial-gradient(circle, var(--s-border) 1px, transparent 1px)
        `,
        backgroundSize: `${resolvedGap} ${resolvedGap}`,
        backgroundPosition: `calc(${resolvedGap} / 2) calc(${resolvedGap} / 2)`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
});

export interface SigilGridCellProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/** Individual grid cell with hover highlight. */
export const SigilGridCell = forwardRef<HTMLDivElement, SigilGridCellProps>(
  function SigilGridCell({ className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "relative p-4 rounded-sm transition-colors duration-200",
          "hover:bg-[var(--s-surface-elevated)]",
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
