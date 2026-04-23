"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export interface SimpleGridProps extends HTMLAttributes<HTMLDivElement> {
  /** Fixed number of columns. */
  columns?: number;
  /** Minimum child width for auto-fill responsive grid. Overrides `columns`. */
  minChildWidth?: number | string;
  /** Gap between items. */
  gap?: number | string;
}

export const SimpleGrid = forwardRef<HTMLDivElement, SimpleGridProps>(function SimpleGrid(
  { columns, minChildWidth, gap, className, style, children, ...props },
  ref,
) {
  const minW = minChildWidth
    ? typeof minChildWidth === "number" ? `${minChildWidth}px` : minChildWidth
    : undefined;

  const gridCols = minW
    ? `repeat(auto-fill, minmax(${minW}, 1fr))`
    : columns
      ? `repeat(${columns}, 1fr)`
      : undefined;

  return (
    <div
      ref={ref}
      data-slot="simple-grid"
      className={cn("grid", className)}
      style={{
        gridTemplateColumns: gridCols,
        gap: gap !== undefined ? (typeof gap === "number" ? `${gap}px` : gap) : undefined,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
});
