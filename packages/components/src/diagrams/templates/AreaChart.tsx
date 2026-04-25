"use client";

import { forwardRef, type SVGAttributes } from "react";
import { cn } from "../../utils";

export interface AreaChartPoint {
  label: string;
  value: number;
}

export interface AreaChartSeries {
  label: string;
  points: AreaChartPoint[];
  color?: string;
}

export interface AreaChartProps extends Omit<SVGAttributes<SVGSVGElement>, "width" | "height"> {
  series: AreaChartSeries[];
  width?: number;
  height?: number;
  /** Stacked areas. @default false */
  stacked?: boolean;
  /** Show grid lines. @default true */
  showGrid?: boolean;
  /** Curve type. @default "smooth" */
  curve?: "smooth" | "linear";
}

function catmullRom(points: { x: number; y: number }[]): string {
  if (points.length < 2) return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const tension = 0.3;
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    const cp1x = p1.x + ((p2.x - p0.x) * tension);
    const cp1y = p1.y + ((p2.y - p0.y) * tension);
    const cp2x = p2.x - ((p3.x - p1.x) * tension);
    const cp2y = p2.y - ((p3.y - p1.y) * tension);
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

export const AreaChart = forwardRef<SVGSVGElement, AreaChartProps>(
  function AreaChart({ series, width: w = 500, height: h = 250, stacked = false, showGrid = true, curve = "smooth", className, ...props }, ref) {
    const padL = 40;
    const padR = 10;
    const padT = 10;
    const padB = 28;
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;

    const maxPts = Math.max(...series.map((s) => s.points.length), 2);
    const allValues = series.flatMap((s) => s.points.map((p) => p.value));
    const maxVal = stacked
      ? Math.max(...Array.from({ length: maxPts }, (_, i) => series.reduce((sum, s) => sum + (s.points[i]?.value ?? 0), 0)))
      : Math.max(...allValues, 1);

    function px(index: number) {
      return padL + (index / (maxPts - 1)) * plotW;
    }
    function py(value: number) {
      return padT + plotH - (value / maxVal) * plotH;
    }

    const defaultColors = ["var(--s-primary)", "var(--s-success)", "var(--s-warning)", "var(--s-error)"];
    const gridLines = 5;
    const xLabels = series[0]?.points.map((p) => p.label) ?? [];

    return (
      <svg
        ref={ref}
        data-slot="area-chart"
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        className={cn("shrink-0", className)}
        {...props}
      >
        {showGrid &&
          Array.from({ length: gridLines }, (_, i) => {
            const val = (maxVal * i) / (gridLines - 1);
            const y = py(val);
            return (
              <g key={i}>
                <line x1={padL} y1={y} x2={w - padR} y2={y} stroke="var(--s-border)" strokeWidth={0.5} opacity={0.4} />
                <text x={padL - 6} y={y + 3} textAnchor="end" fontSize={9} fill="var(--s-text-muted)" fontFamily="var(--s-font-mono, monospace)">
                  {Math.round(val)}
                </text>
              </g>
            );
          })}

        {xLabels.map((label, i) => (
          <text key={i} x={px(i)} y={h - 4} textAnchor="middle" fontSize={9} fill="var(--s-text-muted)" fontFamily="var(--s-font-mono, monospace)">
            {label}
          </text>
        ))}

        {series.map((s, si) => {
          const color = s.color ?? defaultColors[si % defaultColors.length];
          const pts = s.points.map((p, i) => ({ x: px(i), y: py(p.value) }));
          const lineD = curve === "smooth" ? catmullRom(pts) : pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
          const areaD = `${lineD} L ${pts[pts.length - 1].x} ${padT + plotH} L ${pts[0].x} ${padT + plotH} Z`;

          return (
            <g key={si}>
              <defs>
                <linearGradient id={`area-grad-${si}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <path d={areaD} fill={`url(#area-grad-${si})`} />
              <path d={lineD} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
            </g>
          );
        })}
      </svg>
    );
  },
);
