"use client";

import { forwardRef, type SVGAttributes } from "react";
import { cn } from "../../utils";

export interface LineChartPoint {
  label: string;
  value: number;
}

export interface LineChartSeries {
  label: string;
  points: LineChartPoint[];
  color?: string;
}

export interface LineChartProps extends Omit<SVGAttributes<SVGSVGElement>, "width" | "height"> {
  series: LineChartSeries[];
  width?: number;
  height?: number;
  /** Show dots at each data point. @default true */
  showDots?: boolean;
  /** Show grid lines. @default true */
  showGrid?: boolean;
  /** Show x-axis labels. @default true */
  showXLabels?: boolean;
  /** Show y-axis labels. @default true */
  showYLabels?: boolean;
  /** Fill area under line. @default false */
  filled?: boolean;
}

export const LineChart = forwardRef<SVGSVGElement, LineChartProps>(
  function LineChart(
    { series, width: w = 500, height: h = 250, showDots = true, showGrid = true, showXLabels = true, showYLabels = true, filled = false, className, ...props },
    ref,
  ) {
    const padL = showYLabels ? 40 : 10;
    const padR = 10;
    const padT = 10;
    const padB = showXLabels ? 28 : 10;
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;

    const allValues = series.flatMap((s) => s.points.map((p) => p.value));
    const minVal = Math.min(...allValues, 0);
    const maxVal = Math.max(...allValues, 1);
    const range = maxVal - minVal || 1;

    const maxPts = Math.max(...series.map((s) => s.points.length), 2);
    const xLabels = series[0]?.points.map((p) => p.label) ?? [];

    function px(index: number) {
      return padL + (index / (maxPts - 1)) * plotW;
    }
    function py(value: number) {
      return padT + plotH - ((value - minVal) / range) * plotH;
    }

    const gridLines = 5;
    const defaultColors = ["var(--s-primary)", "var(--s-success)", "var(--s-warning)", "var(--s-error)"];

    return (
      <svg
        ref={ref}
        data-slot="line-chart"
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        className={cn("shrink-0", className)}
        {...props}
      >
        {showGrid &&
          Array.from({ length: gridLines }, (_, i) => {
            const val = minVal + (range * i) / (gridLines - 1);
            const y = py(val);
            return (
              <g key={i}>
                <line x1={padL} y1={y} x2={w - padR} y2={y} stroke="var(--s-border)" strokeWidth={0.5} opacity={0.5} />
                {showYLabels && (
                  <text x={padL - 6} y={y + 3} textAnchor="end" fontSize={9} fill="var(--s-text-muted)" fontFamily="var(--s-font-mono, monospace)">
                    {Math.round(val)}
                  </text>
                )}
              </g>
            );
          })}

        {showXLabels &&
          xLabels.map((label, i) => (
            <text
              key={i}
              x={px(i)}
              y={h - 4}
              textAnchor="middle"
              fontSize={9}
              fill="var(--s-text-muted)"
              fontFamily="var(--s-font-mono, monospace)"
            >
              {label}
            </text>
          ))}

        {series.map((s, si) => {
          const color = s.color ?? defaultColors[si % defaultColors.length];
          const pts = s.points.map((p, i) => ({ x: px(i), y: py(p.value) }));
          const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

          return (
            <g key={si}>
              {filled && pts.length > 1 && (
                <path
                  d={`${pathD} L ${pts[pts.length - 1].x} ${padT + plotH} L ${pts[0].x} ${padT + plotH} Z`}
                  fill={color}
                  fillOpacity={0.1}
                />
              )}
              <path d={pathD} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
              {showDots &&
                pts.map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y} r={3.5} fill="var(--s-surface, white)" stroke={color} strokeWidth={2} />
                ))}
            </g>
          );
        })}
      </svg>
    );
  },
);
