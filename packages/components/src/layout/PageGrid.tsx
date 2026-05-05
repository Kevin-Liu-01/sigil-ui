"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface PageGridProps extends HTMLAttributes<HTMLDivElement> {
  /** Show vertical rail marks on left/right edges. */
  showRails?: boolean;
  /** Show cross marks at grid intersections. */
  showCross?: boolean;
  children?: ReactNode;
}

/** Full-page grid overlay with optional rail marks and cross intersections. */
export const PageGrid = forwardRef<HTMLDivElement, PageGridProps>(function PageGrid(
  { showRails = false, showCross = false, className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} data-slot="page-grid" className={cn("relative w-full min-h-dvh", className)} {...rest}>
      {showRails && (
        <>
          <div
            className="absolute top-0 bottom-0 left-0 pointer-events-none"
            style={{
              width: "var(--s-rail-gap, 1.5rem)",
              borderRight: "1px solid var(--s-border-muted)",
            }}
          />
          <div
            className="absolute top-0 bottom-0 right-0 pointer-events-none"
            style={{
              width: "var(--s-rail-gap, 1.5rem)",
              borderLeft: "1px solid var(--s-border-muted)",
            }}
          />
        </>
      )}
      {showCross && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(circle, var(--s-border-muted) 1px, transparent 1px)
            `,
            backgroundSize: "var(--s-grid-cell, 4rem) var(--s-grid-cell, 4rem)",
          }}
        />
      )}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
});
