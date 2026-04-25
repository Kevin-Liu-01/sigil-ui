"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils";

export interface HeatmapCell {
  value: number;
  label?: string;
}

export interface HeatmapGridProps extends HTMLAttributes<HTMLDivElement> {
  data: HeatmapCell[][];
  xLabels?: string[];
  yLabels?: string[];
  /** Minimum value (maps to lowest intensity). */
  min?: number;
  /** Maximum value (maps to highest intensity). */
  max?: number;
  /** Color for the high-intensity end. @default "var(--s-primary)" */
  color?: string;
  /** Cell size in px. @default 40 */
  cellSize?: number;
}

function interpolateOpacity(value: number, min: number, max: number): number {
  if (max === min) return 0.5;
  return 0.08 + ((value - min) / (max - min)) * 0.82;
}

export const HeatmapGrid = forwardRef<HTMLDivElement, HeatmapGridProps>(
  function HeatmapGrid({ data, xLabels, yLabels, min: propMin, max: propMax, color, cellSize = 40, className, ...rest }, ref) {
    const allValues = data.flat().map((c) => c.value);
    const min = propMin ?? Math.min(...allValues);
    const max = propMax ?? Math.max(...allValues);

    return (
      <div
        ref={ref}
        data-slot="heatmap-grid"
        className={cn("inline-flex gap-1", className)}
        {...rest}
      >
        {yLabels && (
          <div className="flex flex-col gap-1 justify-end pr-1" style={{ paddingTop: xLabels ? 20 : 0 }}>
            {yLabels.map((label, i) => (
              <div
                key={i}
                className="flex items-center justify-end font-[family-name:var(--s-font-mono)] text-[10px] text-[var(--s-text-muted)]"
                style={{ height: cellSize }}
              >
                {label}
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-1">
          {xLabels && (
            <div className="flex gap-1">
              {xLabels.map((label, i) => (
                <div
                  key={i}
                  className="flex items-end justify-center font-[family-name:var(--s-font-mono)] text-[10px] text-[var(--s-text-muted)]"
                  style={{ width: cellSize, height: 20 }}
                >
                  {label}
                </div>
              ))}
            </div>
          )}

          {data.map((row, ri) => (
            <div key={ri} className="flex gap-1">
              {row.map((cell, ci) => {
                const opacity = interpolateOpacity(cell.value, min, max);
                return (
                  <div
                    key={ci}
                    className="flex items-center justify-center rounded-[var(--s-radius-sm,2px)] font-[family-name:var(--s-font-mono)] text-[10px] font-semibold text-[var(--s-primary-contrast)]"
                    style={{
                      width: cellSize,
                      height: cellSize,
                      backgroundColor: color ?? "var(--s-primary)",
                      opacity,
                    }}
                    title={cell.label ?? String(cell.value)}
                  >
                    {cell.label ?? cell.value}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  },
);
