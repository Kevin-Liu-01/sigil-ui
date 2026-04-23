"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export interface KPIProps extends HTMLAttributes<HTMLDivElement> {
  /** Metric label. */
  label: string;
  /** Current value. */
  value: string | number;
  /** Change amount (e.g. "+12.5%"). */
  change?: string;
  /** Trend direction. @default "neutral" */
  trend?: "up" | "down" | "neutral";
}

const trendColors: Record<string, string> = {
  up: "text-[var(--s-success)]",
  down: "text-[var(--s-error)]",
  neutral: "text-[var(--s-text-muted)]",
};

const trendArrows: Record<string, string> = {
  up: "\u2191",
  down: "\u2193",
  neutral: "\u2192",
};

/** KPI / stat display card with trend indicator. */
export const KPI = forwardRef<HTMLDivElement, KPIProps>(function KPI(
  { label, value, change, trend = "neutral", className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="kpi"
      className={cn(
        "flex flex-col gap-1 p-4 rounded-[var(--s-card-radius,8px)]",
        "border border-[var(--s-border)] border-[style:var(--s-border-style,solid)] bg-[var(--s-surface)] shadow-[var(--s-shadow-sm)]",
        className,
      )}
      {...rest}
    >
      <span className="text-xs font-medium text-[var(--s-text-muted)] uppercase tracking-wider">
        {label}
      </span>
      <span className="text-2xl font-semibold text-[var(--s-text)] font-mono tabular-nums">
        {value}
      </span>
      {change && (
        <span className={cn("text-sm font-medium flex items-center gap-1", trendColors[trend])}>
          <span aria-hidden>{trendArrows[trend]}</span>
          {change}
        </span>
      )}
    </div>
  );
});
