"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";

export interface MiniBarItem {
  label: string;
  value: number;
  icon?: ReactNode;
  href?: string;
  color?: string;
}

export interface MiniBarListProps extends HTMLAttributes<HTMLDivElement> {
  items: MiniBarItem[];
  /** Value label (shown in header). @default "Count" */
  valueLabel?: string;
  /** Format value for display. */
  formatValue?: (v: number) => string;
  /** Color for all bars if not set per-item. */
  color?: string;
}

export const MiniBarList = forwardRef<HTMLDivElement, MiniBarListProps>(
  function MiniBarList({ items, valueLabel = "Count", formatValue, color, className, ...rest }, ref) {
    const maxVal = Math.max(...items.map((i) => i.value), 1);

    function fmt(v: number): string {
      if (formatValue) return formatValue(v);
      if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
      if (v >= 1_000) return `${(v / 1_000).toFixed(1)}K`;
      return v.toLocaleString();
    }

    return (
      <div
        ref={ref}
        data-slot="mini-bar-list"
        className={cn("w-full", className)}
        {...rest}
      >
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-medium text-[var(--s-text-muted)]">Name</span>
          <span className="text-xs font-medium text-[var(--s-text-muted)]">{valueLabel}</span>
        </div>
        <div className="flex flex-col gap-1.5">
          {items.map((item) => {
            const pct = (item.value / maxVal) * 100;
            const barColor = item.color ?? color ?? "var(--s-primary)";

            return (
              <div key={item.label} className="flex items-center gap-3">
                <div className="flex-1 relative h-8 rounded-[var(--s-radius-sm,2px)] overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 rounded-[var(--s-radius-sm,2px)]"
                    style={{ width: `${Math.max(pct, 1)}%`, backgroundColor: barColor, opacity: 0.15 }}
                  />
                  <div className="relative flex items-center h-full px-2 gap-2">
                    {item.icon && <span className="[&_svg]:size-3.5 shrink-0 text-[var(--s-text-muted)]">{item.icon}</span>}
                    <span className="text-sm text-[var(--s-text)] truncate">{item.label}</span>
                  </div>
                </div>
                <span className="text-sm font-[family-name:var(--s-font-mono)] font-semibold tabular-nums text-[var(--s-text)] min-w-[40px] text-right">
                  {fmt(item.value)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
