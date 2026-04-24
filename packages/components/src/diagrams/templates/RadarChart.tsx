"use client";

import { forwardRef, type SVGAttributes } from "react";
import { cn } from "../../utils";

export interface RadarAxis {
  label: string;
  max?: number;
}

export interface RadarSeries {
  label: string;
  values: number[];
  color?: string;
}

export interface RadarChartProps extends Omit<SVGAttributes<SVGSVGElement>, "width" | "height"> {
  axes: RadarAxis[];
  series: RadarSeries[];
  width?: number;
  height?: number;
  rings?: number;
}

function polarToCart(cx: number, cy: number, r: number, angle: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export const RadarChart = forwardRef<SVGSVGElement, RadarChartProps>(
  function RadarChart({ axes, series, width: w = 300, height: h = 300, rings = 4, className, ...props }, ref) {
    const cx = w / 2;
    const cy = h / 2;
    const maxR = Math.min(cx, cy) - 36;
    const step = 360 / axes.length;

    return (
      <svg
        ref={ref}
        data-slot="radar-chart"
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        className={cn("shrink-0", className)}
        {...props}
      >
        {Array.from({ length: rings }, (_, ri) => {
          const r = maxR * ((ri + 1) / rings);
          const pts = axes
            .map((_, ai) => {
              const p = polarToCart(cx, cy, r, ai * step);
              return `${p.x},${p.y}`;
            })
            .join(" ");
          return (
            <polygon
              key={ri}
              points={pts}
              fill="none"
              stroke="var(--s-border)"
              strokeWidth={ri === rings - 1 ? 1 : 0.5}
              opacity={0.5}
            />
          );
        })}

        {axes.map((_, ai) => {
          const p = polarToCart(cx, cy, maxR, ai * step);
          return (
            <line
              key={ai}
              x1={cx}
              y1={cy}
              x2={p.x}
              y2={p.y}
              stroke="var(--s-border)"
              strokeWidth={0.5}
              opacity={0.4}
            />
          );
        })}

        {axes.map((axis, ai) => {
          const p = polarToCart(cx, cy, maxR + 16, ai * step);
          return (
            <text
              key={ai}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={9}
              fill="var(--s-text-muted)"
              fontFamily="var(--s-font-mono, monospace)"
            >
              {axis.label}
            </text>
          );
        })}

        {series.map((s, si) => {
          const pts = axes
            .map((axis, ai) => {
              const max = axis.max ?? 100;
              const ratio = Math.min(s.values[ai] ?? 0, max) / max;
              const p = polarToCart(cx, cy, maxR * ratio, ai * step);
              return `${p.x},${p.y}`;
            })
            .join(" ");
          const color = s.color ?? "var(--s-primary)";
          return (
            <g key={si}>
              <polygon points={pts} fill={color} fillOpacity={0.15} stroke={color} strokeWidth={1.5} />
              {axes.map((axis, ai) => {
                const max = axis.max ?? 100;
                const ratio = Math.min(s.values[ai] ?? 0, max) / max;
                const p = polarToCart(cx, cy, maxR * ratio, ai * step);
                return <circle key={ai} cx={p.x} cy={p.y} r={2.5} fill={color} />;
              })}
            </g>
          );
        })}
      </svg>
    );
  },
);
