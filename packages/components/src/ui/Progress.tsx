"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  /** Progress value from 0 to 100. */
  value?: number;
  /** Maximum value. @default 100 */
  max?: number;
  /** Show percentage label. */
  showLabel?: boolean;
}

/** Progress bar with optional percentage label. */
export const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  { value = 0, max = 100, showLabel = false, className, ...rest },
  ref,
) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn("w-full", className)}>
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className="relative h-2 w-full overflow-hidden rounded-full bg-[var(--s-border)]"
        {...rest}
      >
        <div
          className="h-full rounded-full bg-[var(--s-primary)] transition-[width] duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <span className="block mt-1 text-xs text-[var(--s-text-muted)] text-right font-mono">
          {Math.round(pct)}%
        </span>
      )}
    </div>
  );
});
