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

/**
 * Column counts map to the layout token grid (`repeat(12, 1fr)`), not `fr`
 * ratios, so vertical hairlines line up with the same column grid used across
 * Sigil marketing pages (snap-lock with `--s-content-max` / `--s-grid-gap`).
 */
function columnSpan(columns: number): number {
  const c = Math.min(12, Math.max(1, columns));
  return Math.max(1, Math.floor(12 / c));
}

/** Map `"2fr 1fr"`-style props to 12-column spans (integers, sum = 12). */
function featuredColumnSpans(featuredRatio: string): [number, number] {
  const parts = featuredRatio.trim().split(/\s+/).filter(Boolean);
  const frs = parts
    .map((p) => {
      const m = /^(\d+(?:\.\d+)?)fr$/i.exec(p);
      return m ? parseFloat(m[1]) : NaN;
    })
    .filter((n) => !Number.isNaN(n));
  if (frs.length < 2) return [8, 4];
  const sum = frs[0] + frs[1];
  if (sum <= 0) return [8, 4];
  const a = Math.max(1, Math.round((12 * frs[0]) / sum));
  return [a, 12 - a];
}

/**
 * Featured-plus-grid composition — hero item with a collection below.
 *
 * The first child spans 8/12 columns, the second 4/12 (2:1). Subsequent
 * children use equal spans on the same 12-column grid (gap 1px hairlines).
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

    const restSpan = columnSpan(columns);
    const [spanFeatured, spanSide] = featuredColumnSpans(featuredRatio);

    return (
      <div
        ref={ref}
        data-slot="featured-grid"
        className={cn("flex flex-col", className)}
        {...rest}
      >
        {/* Featured row — 12-column token grid (8+4 default ≈ 2:1) */}
        <div
          className="grid gap-px"
          style={{
            background: "var(--s-border)",
            gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
          }}
        >
          <div className="min-w-0" style={{ gridColumn: `span ${spanFeatured}` }}>
            {featured}
          </div>
          <div className="min-w-0" style={{ gridColumn: `span ${spanSide}` }}>
            {side}
          </div>
        </div>

        {/* Remaining grid — same 12-col rhythm; marginTop: 1px shares the hairline */}
        {remaining.length > 0 && (
          <div
            className="grid gap-px"
            style={{
              background: "var(--s-border)",
              marginTop: 1,
              gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
            }}
          >
            {remaining.map((child, i) => (
              <div key={i} className="min-w-0" style={{ gridColumn: `span ${restSpan}` }}>
                {child}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
);
