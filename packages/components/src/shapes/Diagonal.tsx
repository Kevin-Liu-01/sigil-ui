"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export interface DiagonalProps extends HTMLAttributes<HTMLDivElement> {
  /** Diagonal cut direction. @default "right" */
  direction?: "left" | "right";
  /** Height of the diagonal section. @default 80 */
  height?: number;
  /** Fill color (CSS value). Defaults to the surface token. */
  fill?: string;
}

/** Diagonal-cut section transition for page breaks. */
export const Diagonal = forwardRef<HTMLDivElement, DiagonalProps>(function Diagonal(
  { direction = "right", height = 80, fill, className, ...rest },
  ref,
) {
  const points = direction === "right" ? "0,0 100,0 100,100 0,100" : "0,0 100,0 100,100 0,100";
  const polygon =
    direction === "right"
      ? "polygon(0 0, 100% 0, 100% 100%, 0 60%)"
      : "polygon(0 0, 100% 0, 100% 60%, 0 100%)";

  return (
    <div
      ref={ref}
      data-slot="diagonal"
      className={cn("w-full", className)}
      style={{
        height: `${height}px`,
        backgroundColor: fill ?? "var(--s-surface)",
        clipPath: polygon,
      }}
      aria-hidden
      {...rest}
    />
  );
});
