"use client";

import { forwardRef, type SVGAttributes } from "react";
import { cn } from "../../utils";

export interface VennCircle {
  label: string;
  color?: string;
}

export interface VennDiagramProps extends Omit<SVGAttributes<SVGSVGElement>, "width" | "height"> {
  circles: [VennCircle, VennCircle] | [VennCircle, VennCircle, VennCircle];
  /** Label for the intersection. */
  intersectionLabel?: string;
  width?: number;
  height?: number;
}

export const VennDiagram = forwardRef<SVGSVGElement, VennDiagramProps>(
  function VennDiagram({ circles, intersectionLabel, width: w = 340, height: h = 240, className, ...props }, ref) {
    const cx = w / 2;
    const cy = h / 2;
    const r = Math.min(cx, cy) * 0.55;
    const overlap = r * 0.55;
    const is3 = circles.length === 3;

    const positions = is3
      ? [
          { x: cx, y: cy - overlap * 0.6 },
          { x: cx - overlap, y: cy + overlap * 0.5 },
          { x: cx + overlap, y: cy + overlap * 0.5 },
        ]
      : [
          { x: cx - overlap * 0.5, y: cy },
          { x: cx + overlap * 0.5, y: cy },
        ];

    const defaultColors = ["var(--s-primary)", "var(--s-success, #22c55e)", "var(--s-warning, #f59e0b)"];

    return (
      <svg
        ref={ref}
        data-slot="venn-diagram"
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        className={cn("shrink-0", className)}
        {...props}
      >
        {circles.map((circle, i) => {
          const pos = positions[i];
          const color = circle.color ?? defaultColors[i % defaultColors.length];
          return (
            <g key={i}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={r}
                fill={color}
                fillOpacity={0.2}
                stroke={color}
                strokeWidth={1.5}
                strokeOpacity={0.5}
              />
              <text
                x={is3
                  ? (i === 0 ? pos.x : i === 1 ? pos.x - r * 0.4 : pos.x + r * 0.4)
                  : (i === 0 ? pos.x - r * 0.4 : pos.x + r * 0.4)}
                y={is3
                  ? (i === 0 ? pos.y - r * 0.35 : pos.y + r * 0.45)
                  : pos.y - r * 0.15}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={11}
                fontWeight={600}
                fill="var(--s-text)"
              >
                {circle.label}
              </text>
            </g>
          );
        })}

        {intersectionLabel && (
          <text
            x={cx}
            y={is3 ? cy + overlap * 0.1 : cy}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={10}
            fontWeight={700}
            fill="var(--s-text)"
            fontFamily="var(--s-font-mono, monospace)"
          >
            {intersectionLabel}
          </text>
        )}
      </svg>
    );
  },
);
