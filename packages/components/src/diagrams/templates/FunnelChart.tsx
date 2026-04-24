"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils";

export interface FunnelStep {
  label: string;
  value: number;
  color?: string;
}

export interface FunnelChartProps extends HTMLAttributes<HTMLDivElement> {
  steps: FunnelStep[];
  /** Show conversion rate between steps. @default true */
  showRates?: boolean;
  /** Show absolute values. @default true */
  showValues?: boolean;
}

function fmtNum(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

export const FunnelChart = forwardRef<HTMLDivElement, FunnelChartProps>(
  function FunnelChart({ steps, showRates = true, showValues = true, className, ...rest }, ref) {
    const maxVal = Math.max(...steps.map((s) => s.value), 1);

    return (
      <div
        ref={ref}
        data-slot="funnel-chart"
        className={cn("flex flex-col items-center gap-1 w-full max-w-md", className)}
        {...rest}
      >
        {steps.map((step, i) => {
          const widthPct = Math.max((step.value / maxVal) * 100, 20);
          const prevVal = i > 0 ? steps[i - 1].value : null;
          const rate = prevVal ? ((step.value / prevVal) * 100).toFixed(1) : null;

          return (
            <div key={step.label} className="w-full flex flex-col items-center">
              {i > 0 && showRates && rate && (
                <div className="flex items-center gap-1.5 py-1">
                  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                    <path d="M6 2 L6 10 M3 7 L6 10 L9 7" stroke="var(--s-text-muted)" strokeWidth="1.2" fill="none" />
                  </svg>
                  <span className="font-[family-name:var(--s-font-mono)] text-[10px] text-[var(--s-text-muted)] tabular-nums">
                    {rate}%
                  </span>
                </div>
              )}
              <div
                className="relative flex items-center justify-center rounded-[var(--s-radius-sm,2px)] py-3 transition-all duration-[var(--s-duration-fast,150ms)]"
                style={{
                  width: `${widthPct}%`,
                  backgroundColor: step.color ?? "var(--s-primary)",
                  opacity: 1 - i * 0.08,
                }}
              >
                <span className="text-xs font-semibold text-[var(--s-primary-contrast,#fff)] drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                  {step.label}
                </span>
                {showValues && (
                  <span className="absolute right-2 font-[family-name:var(--s-font-mono)] text-[10px] text-[var(--s-primary-contrast,#fff)] opacity-80 tabular-nums">
                    {fmtNum(step.value)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  },
);
