"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";

export interface MetricCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  delta?: string;
  deltaLabel?: string;
  icon?: ReactNode;
  /** Mini sparkline data. */
  sparkData?: number[];
  /** Spark color. */
  sparkColor?: string;
}

function MiniSpark({ data, color, w = 80, h = 24 }: { data: number[]; color: string; w?: number; h?: number }) {
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * w,
    y: h - ((v - min) / range) * (h - 4) - 2,
  }));
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0">
      <path d={`${d} L ${pts[pts.length - 1].x} ${h} L ${pts[0].x} ${h} Z`} fill={color} fillOpacity={0.08} />
      <path d={d} fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(
  function MetricCard({ label, value, delta, deltaLabel, icon, sparkData, sparkColor, className, ...rest }, ref) {
    const isPositive = delta?.startsWith("+") || delta?.startsWith("↑");
    const isNegative = delta?.startsWith("-") || delta?.startsWith("↓");

    return (
      <div
        ref={ref}
        data-slot="metric-card"
        className={cn(
          "rounded-[var(--s-radius-card,0px)] border border-[style:var(--s-border-style,solid)] border-[var(--s-border)] bg-[var(--s-surface)] p-4 shadow-[var(--s-shadow-sm)]",
          className,
        )}
        {...rest}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {icon && <span className="[&_svg]:size-4 text-[var(--s-text-muted)] shrink-0">{icon}</span>}
              <span className="text-xs font-medium text-[var(--s-text-muted)] truncate">{label}</span>
            </div>
            <div className="text-2xl font-bold text-[var(--s-text)] font-[family-name:var(--s-font-mono)] tabular-nums leading-tight">
              {value}
            </div>
            {delta && (
              <div className="flex items-center gap-1 mt-1">
                <span
                  className={cn(
                    "text-xs font-semibold font-[family-name:var(--s-font-mono)] tabular-nums",
                    isPositive && "text-[var(--s-success,#22c55e)]",
                    isNegative && "text-[var(--s-error,#ef4444)]",
                    !isPositive && !isNegative && "text-[var(--s-text-muted)]",
                  )}
                >
                  {delta}
                </span>
                {deltaLabel && <span className="text-[10px] text-[var(--s-text-muted)]">{deltaLabel}</span>}
              </div>
            )}
          </div>
          {sparkData && (
            <MiniSpark data={sparkData} color={sparkColor ?? "var(--s-primary)"} />
          )}
        </div>
      </div>
    );
  },
);
