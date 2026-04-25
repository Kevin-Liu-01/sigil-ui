"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils";
import { useInView } from "../../animation/useInView";
import { useReducedMotion } from "../../animation/useReducedMotion";

export interface WaterfallStep {
  label: string;
  duration: number;
  color?: string;
}

export interface WaterfallRow {
  label: string;
  steps: WaterfallStep[];
  accent?: boolean;
}

export interface WaterfallChartProps extends HTMLAttributes<HTMLDivElement> {
  rows: WaterfallRow[];
  /** Unit label for totals. @default "ms" */
  unit?: string;
  /** Badge text shown below (e.g. "~50x faster"). */
  badge?: string;
}

function formatValue(ms: number, unit: string): string {
  if (unit === "ms" && ms >= 1000) return `${(ms / 1000).toFixed(1)}s`;
  return `${ms}${unit}`;
}

export const WaterfallChart = forwardRef<HTMLDivElement, WaterfallChartProps>(
  function WaterfallChart({ rows, unit = "ms", badge, className, ...rest }, outerRef) {
    const reduced = useReducedMotion();
    const { ref: viewRef, inView } = useInView<HTMLDivElement>();
    const visible = reduced || inView;

    const mergedRef = (el: HTMLDivElement | null) => {
      (viewRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      if (typeof outerRef === "function") outerRef(el);
      else if (outerRef) (outerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    };

    const maxTotal = Math.max(...rows.map((r) => r.steps.reduce((s, v) => s + v.duration, 0)));

    return (
      <div
        ref={mergedRef}
        data-slot="waterfall-chart"
        className={cn("sigil-waterfall-chart w-full max-w-md space-y-6", className)}
        {...rest}
      >
        {rows.map((row, ri) => {
          const total = row.steps.reduce((s, v) => s + v.duration, 0);
          const barPct = maxTotal > 0 ? Math.max((total / maxTotal) * 100, 1) : 1;
          const rowDelay = ri * 200;

          return (
            <div
              key={row.label}
              className="space-y-2"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: reduced
                  ? "none"
                  : `opacity var(--s-duration-normal,250ms) var(--s-ease-out,ease-out) ${rowDelay}ms, transform var(--s-duration-normal,250ms) var(--s-ease-default,cubic-bezier(0.16,1,0.3,1)) ${rowDelay}ms`,
              }}
            >
              <div className="flex items-baseline justify-between">
                <span
                  className={cn(
                    "font-mono text-xs uppercase tracking-wider",
                    row.accent
                      ? "font-semibold text-[var(--s-text,currentColor)]"
                      : "text-[var(--s-text-muted)]",
                  )}
                >
                  {row.label}
                </span>
                <span
                  className={cn(
                    "font-mono tabular-nums",
                    row.accent
                      ? "text-lg font-bold text-[var(--s-primary)]"
                      : "text-base font-semibold text-[var(--s-text-muted)]",
                  )}
                >
                  {formatValue(total, unit)}
                </span>
              </div>

              <div className="relative h-7 w-full rounded-[var(--s-radius-sm,2px)] bg-[var(--s-surface-elevated)]">
                <div className="flex h-full" style={{ width: `${barPct}%` }}>
                  {row.steps.map((step, si) => {
                    const segPct = total > 0 ? (step.duration / total) * 100 : 0;
                    const segDelay = rowDelay + 150 + si * 80;

                    return (
                      <div
                        key={step.label}
                        className={cn(
                          "relative h-full overflow-hidden",
                          si === 0 && "rounded-l-[var(--s-radius-sm,2px)]",
                          si === row.steps.length - 1 && "rounded-r-[var(--s-radius-sm,2px)]",
                        )}
                        style={{
                          width: `${segPct}%`,
                          minWidth: 2,
                          backgroundColor: step.color ?? "var(--s-chart-series-1)",
                          opacity: 0.85,
                          transform: visible ? "scaleX(1)" : "scaleX(0)",
                          transformOrigin: "left center",
                          transition: reduced
                            ? "none"
                            : `transform var(--s-duration-normal,250ms) var(--s-ease-out,ease-out) ${segDelay}ms`,
                        }}
                      >
                        {segPct > 15 && (
                          <span className="absolute inset-0 hidden items-center justify-center whitespace-nowrap font-mono text-[10px] font-semibold text-[var(--s-primary-contrast)] drop-shadow-[0_1px_2px_oklch(0_0_0_/_0.4)] sm:flex">
                            {step.label}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}

        {badge && (
          <div
            className="mx-auto flex w-fit items-center justify-center border border-[var(--s-success)]/30 bg-[var(--s-success)]/[0.06] px-4 py-2"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "scale(1)" : "scale(0.7)",
              transition: reduced
                ? "none"
                : `opacity var(--s-duration-fast,150ms) var(--s-ease-out,ease-out) ${rows.length * 200 + 200}ms, transform var(--s-duration-fast,150ms) var(--s-ease-spring,cubic-bezier(0.34,1.56,0.64,1)) ${rows.length * 200 + 200}ms`,
            }}
          >
            <span className="font-mono text-sm font-bold tabular-nums text-[var(--s-success)]">
              {badge}
            </span>
          </div>
        )}
      </div>
    );
  },
);
