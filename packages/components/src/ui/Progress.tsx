"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "../utils";

export interface ProgressProps extends ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  /** Progress value (0–100). Omit for indeterminate. */
  value?: number;
  /** Show percentage label. */
  label?: boolean;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
}

const sizeMap = { sm: "h-1", md: "h-2", lg: "h-3" } as const;

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  function Progress({ value, label = false, size = "md", className, ...props }, ref) {
    const indeterminate = value === undefined;

    return (
      <div className={cn("w-full", label && "space-y-1.5")}>
        <ProgressPrimitive.Root
          ref={ref}
          data-slot="progress"
          value={value}
          className={cn(
            "relative w-full overflow-hidden rounded-[var(--s-radius-full,9999px)] bg-[var(--s-border-muted,var(--s-surface))]",
            sizeMap[size],
            className,
          )}
          {...props}
        >
          <ProgressPrimitive.Indicator
            data-slot="progress-indicator"
            className={cn(
              "h-full rounded-[var(--s-radius-full,9999px)] bg-[var(--s-primary)]",
              indeterminate
                ? "w-1/3 animate-progress-indeterminate"
                : "transition-all duration-[var(--s-duration-normal,300ms)]",
            )}
            style={indeterminate ? undefined : { width: `${value ?? 0}%` }}
          />
        </ProgressPrimitive.Root>
        {label && !indeterminate && (
          <p className="text-right font-[family-name:var(--s-font-mono)] text-xs tabular-nums text-[var(--s-text-muted)]">
            {Math.round(value ?? 0)}%
          </p>
        )}
      </div>
    );
  },
);
