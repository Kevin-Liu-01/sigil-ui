"use client";

import { forwardRef, Children, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface FeaturedGridProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Ratio of the featured column. @default "2fr" */
  featuredRatio?: string;
  /** Number of columns in the secondary grid. @default 3 */
  columns?: number;
}

const colClasses: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

/**
 * Featured-plus-grid composition — hero item with a collection below.
 *
 * The first child spans the featured (2fr) column, the second fills
 * the remaining (1fr) column. All subsequent children flow into a
 * standard gap-pixel grid below, joined by a 1px margin-top to
 * share a continuous hairline.
 *
 * ```tsx
 * <FeaturedGrid columns={3}>
 *   <FeaturedCard />
 *   <SideCard />
 *   <Card /><Card /><Card />
 * </FeaturedGrid>
 * ```
 */
export const FeaturedGrid = forwardRef<HTMLDivElement, FeaturedGridProps>(
  function FeaturedGrid(
    { featuredRatio = "2fr", columns = 3, className, children, ...rest },
    ref,
  ) {
    const items = Children.toArray(children);
    const featured = items[0];
    const side = items[1];
    const remaining = items.slice(2);

    return (
      <div
        ref={ref}
        data-slot="featured-grid"
        className={cn("flex flex-col", className)}
        {...rest}
      >
        {/* Featured row */}
        <div
          className="grid gap-px"
          style={{
            background: "var(--s-border)",
            gridTemplateColumns: `${featuredRatio} 1fr`,
          }}
        >
          {featured}
          {side}
        </div>

        {/* Remaining grid — marginTop: 1 shares the continuous hairline */}
        {remaining.length > 0 && (
          <div
            className={cn("grid gap-px", colClasses[columns] ?? `lg:grid-cols-${columns}`)}
            style={{
              background: "var(--s-border)",
              marginTop: 1,
            }}
          >
            {remaining}
          </div>
        )}
      </div>
    );
  },
);
