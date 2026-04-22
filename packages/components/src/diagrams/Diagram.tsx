"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface DiagramProps extends HTMLAttributes<HTMLDivElement> {
  /** Show a dot-grid background. @default false */
  showGrid?: boolean;
  /** Grid cell size in px. @default 24 */
  gridSize?: number;
  children?: ReactNode;
}

/** Base diagram container with optional grid background. */
export const Diagram = forwardRef<HTMLDivElement, DiagramProps>(function Diagram(
  { showGrid = false, gridSize = 24, className, style, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "relative w-full overflow-hidden rounded-[var(--s-card-radius,8px)]",
        "border border-[var(--s-border)] bg-[var(--s-surface)] p-6",
        className,
      )}
      style={{
        ...(showGrid
          ? {
              backgroundImage: "radial-gradient(circle, var(--s-border-muted) 1px, transparent 1px)",
              backgroundSize: `${gridSize}px ${gridSize}px`,
            }
          : {}),
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
});
