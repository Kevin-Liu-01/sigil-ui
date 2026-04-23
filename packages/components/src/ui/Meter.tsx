"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export interface MeterProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  label?: string;
}

export const Meter = forwardRef<HTMLDivElement, MeterProps>(function Meter(
  { value = 0, max = 100, label, className, ...rest },
  ref,
) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  const fill =
    pct >= 80
      ? "bg-[var(--s-error)]"
      : pct >= 60
        ? "bg-[var(--s-warning,var(--s-primary))]"
        : "bg-[var(--s-primary)]";

  return (
    <div ref={ref} data-slot="meter" className={cn("w-full", className)} {...rest}>
      {label && (
        <div className="mb-1 flex items-center justify-between text-sm">
          <span className="font-medium text-[var(--s-text)]">{label}</span>
          <span className="tabular-nums text-[var(--s-text-muted)]">{Math.round(pct)}%</span>
        </div>
      )}
      <div
        role="meter"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        className="relative h-2.5 w-full overflow-hidden rounded-full bg-[var(--s-border)]"
      >
        <div
          className={cn("h-full rounded-full transition-[width] duration-[var(--s-duration-normal,300ms)] ease-out", fill)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
});
