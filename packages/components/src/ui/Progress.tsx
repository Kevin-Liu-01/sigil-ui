"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

const sizeMap = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
} as const;

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  /** @default 100 */
  max?: number;
  label?: boolean;
  /** @default "md" */
  size?: keyof typeof sizeMap;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  function Progress(
    { value, max = 100, label = false, size = "md", className, ...rest },
    ref,
  ) {
    const indeterminate = value === undefined;
    const pct = indeterminate
      ? 0
      : Math.min(100, Math.max(0, (value / max) * 100));

    return (
      <div className={cn("w-full", label && "space-y-1.5")}>
        <div
          ref={ref}
          data-slot="progress"
          role="progressbar"
          aria-valuenow={indeterminate ? undefined : value}
          aria-valuemin={0}
          aria-valuemax={max}
          className={cn(
            "relative w-full overflow-hidden rounded-[var(--s-radius-sm,0px)] bg-[var(--s-surface)]",
            sizeMap[size],
            className,
          )}
          {...rest}
        >
          <div
            data-slot="progress-indicator"
            className={cn(
              "h-full bg-[var(--s-primary)]",
              indeterminate
                ? "w-1/3 animate-progress-indeterminate"
                : "transition-all duration-300",
            )}
            style={indeterminate ? undefined : { width: `${pct}%` }}
          />
        </div>
        {label && !indeterminate && (
          <p className="text-right font-mono text-xs tabular-nums text-[var(--s-text-muted)]">
            {Math.round(pct)}%
          </p>
        )}
      </div>
    );
  },
);
