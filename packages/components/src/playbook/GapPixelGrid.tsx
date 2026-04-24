"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface GapPixelGridProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of columns at each breakpoint. @default { sm: 2, md: 3 } */
  columns?: {
    base?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  /** Use a featured layout: first item spans 2fr, rest share 1fr. */
  featured?: boolean;
  /** Content max-width constraint. @default "none" */
  contentMax?: string;
  /** Gap size in pixels. @default 1 */
  gap?: number;
  children: ReactNode;
}

const colClasses: Record<number, string> = {
  1: "grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  5: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
  6: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
};

/**
 * The signature Sigil layout move — gap-pixel grid.
 *
 * Parent background bleeds through 1px gaps as hairline dividers.
 * Every cell gets `bg-[var(--s-background)]` so the grid lines
 * are formed by `bg-[var(--s-border)]` on the parent.
 *
 * Used for product cards, pricing cards, blog cards, data tables,
 * image galleries, and button groups identically.
 *
 * ```tsx
 * <GapPixelGrid columns={{ md: 3 }}>
 *   <div>Cell 1</div>
 *   <div>Cell 2</div>
 *   <div>Cell 3</div>
 * </GapPixelGrid>
 * ```
 */
export const GapPixelGrid = forwardRef<HTMLDivElement, GapPixelGridProps>(
  function GapPixelGrid(
    { columns = { sm: 2, md: 3 }, featured = false, contentMax, gap = 1, className, style, children, ...rest },
    ref,
  ) {
    if (featured) {
      return (
        <div
          ref={ref}
          data-slot="gap-pixel-grid"
          data-featured
          className={cn("flex flex-col", className)}
          style={{ maxWidth: contentMax, ...style }}
          {...rest}
        >
          {children}
        </div>
      );
    }

    const maxCol = columns.xl ?? columns.lg ?? columns.md ?? columns.sm ?? columns.base ?? 3;

    return (
      <div
        ref={ref}
        data-slot="gap-pixel-grid"
        className={cn(
          "grid",
          colClasses[maxCol] ?? `sm:grid-cols-2 lg:grid-cols-${maxCol}`,
          className,
        )}
        style={{
          gap: `${gap}px`,
          background: "var(--s-border)",
          maxWidth: contentMax,
          ...style,
        }}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

export interface GapPixelCellProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * A cell inside a GapPixelGrid. Gets `bg-[var(--s-background)]`
 * so the parent border color bleeds through the 1px gaps.
 */
export const GapPixelCell = forwardRef<HTMLDivElement, GapPixelCellProps>(
  function GapPixelCell({ className, style, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="gap-pixel-cell"
        className={cn("min-w-0", className)}
        style={{ background: "var(--s-background)", ...style }}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
