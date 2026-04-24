"use client";

import { forwardRef, type SVGAttributes } from "react";
import { cn } from "../../utils";

export interface ProgressRingTrack {
  label: string;
  value: number;
  max?: number;
  color?: string;
}

export interface ProgressRingProps extends Omit<SVGAttributes<SVGSVGElement>, "width" | "height"> {
  tracks: ProgressRingTrack[];
  width?: number;
  height?: number;
  /** Track thickness. @default 8 */
  thickness?: number;
  /** Gap between rings. @default 4 */
  gap?: number;
  /** Show legend. @default true */
  showLegend?: boolean;
}

const defaultColors = [
  "var(--s-error, #ef4444)",
  "var(--s-success, #22c55e)",
  "var(--s-info, #3b82f6)",
  "var(--s-warning, #f59e0b)",
];

export const ProgressRing = forwardRef<SVGSVGElement, ProgressRingProps>(
  function ProgressRing({ tracks, width: w = 160, height: h = 160, thickness = 8, gap = 4, showLegend = true, className, ...props }, ref) {
    const cx = w / 2;
    const cy = h / 2;
    const outerR = Math.min(cx, cy) - 4;

    return (
      <div className={cn("inline-flex flex-col items-center gap-3", className)}>
        <svg
          ref={ref}
          data-slot="progress-ring"
          width={w}
          height={h}
          viewBox={`0 0 ${w} ${h}`}
          className="shrink-0"
          {...props}
        >
          {tracks.map((track, i) => {
            const r = outerR - i * (thickness + gap);
            if (r <= 0) return null;
            const max = track.max ?? 100;
            const pct = Math.min(track.value / max, 1);
            const circumference = 2 * Math.PI * r;
            const dashLen = circumference * pct;
            const color = track.color ?? defaultColors[i % defaultColors.length];

            return (
              <g key={i} transform={`rotate(-90 ${cx} ${cy})`}>
                <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--s-border)" strokeWidth={thickness} opacity={0.15} />
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="none"
                  stroke={color}
                  strokeWidth={thickness}
                  strokeDasharray={`${dashLen} ${circumference - dashLen}`}
                  strokeLinecap="round"
                />
              </g>
            );
          })}
        </svg>

        {showLegend && (
          <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center">
            {tracks.map((track, i) => {
              const max = track.max ?? 100;
              const pct = Math.round((track.value / max) * 100);
              return (
                <div key={i} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: track.color ?? defaultColors[i % defaultColors.length] }} />
                  <span className="text-xs text-[var(--s-text-muted)]">
                    {track.label} <span className="font-[family-name:var(--s-font-mono)] font-semibold tabular-nums text-[var(--s-text)]">{pct}%</span>
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  },
);
