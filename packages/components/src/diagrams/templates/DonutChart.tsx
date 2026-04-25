"use client";

import { forwardRef, type SVGAttributes } from "react";
import { cn } from "../../utils";

export interface DonutSegment {
  label: string;
  value: number;
  color?: string;
}

export interface DonutChartProps extends Omit<SVGAttributes<SVGSVGElement>, "width" | "height"> {
  segments: DonutSegment[];
  width?: number;
  height?: number;
  /** Ring thickness (px). @default 24 */
  thickness?: number;
  /** Center text (e.g. total label). */
  centerLabel?: string;
  /** Center value. */
  centerValue?: string;
}

const defaultColors = [
  "var(--s-primary)",
  "var(--s-success)",
  "var(--s-warning)",
  "var(--s-error)",
  "var(--s-info)",
  "var(--s-chart-neutral)",
];

export const DonutChart = forwardRef<SVGSVGElement, DonutChartProps>(
  function DonutChart(
    { segments, width: w = 200, height: h = 200, thickness = 24, centerLabel, centerValue, className, ...props },
    ref,
  ) {
    const cx = w / 2;
    const cy = h / 2;
    const outerR = Math.min(cx, cy) - 4;
    const innerR = outerR - thickness;
    const total = segments.reduce((s, seg) => s + seg.value, 0) || 1;

    let cumAngle = -90;

    function arc(startAngle: number, endAngle: number, r: number) {
      const s = ((startAngle) * Math.PI) / 180;
      const e = ((endAngle) * Math.PI) / 180;
      const x1 = cx + r * Math.cos(s);
      const y1 = cy + r * Math.sin(s);
      const x2 = cx + r * Math.cos(e);
      const y2 = cy + r * Math.sin(e);
      const large = endAngle - startAngle > 180 ? 1 : 0;
      return { x1, y1, x2, y2, large };
    }

    return (
      <svg
        ref={ref}
        data-slot="donut-chart"
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        className={cn("shrink-0", className)}
        {...props}
      >
        {segments.map((seg, i) => {
          const angle = (seg.value / total) * 360;
          if (angle <= 0) return null;
          const clampedAngle = Math.min(angle, 359.99);
          const startAngle = cumAngle;
          const endAngle = cumAngle + clampedAngle;
          cumAngle = endAngle;

          const outer = arc(startAngle, endAngle, outerR);
          const inner = arc(startAngle, endAngle, innerR);
          const color = seg.color ?? defaultColors[i % defaultColors.length];

          const d = [
            `M ${outer.x1} ${outer.y1}`,
            `A ${outerR} ${outerR} 0 ${outer.large} 1 ${outer.x2} ${outer.y2}`,
            `L ${inner.x2} ${inner.y2}`,
            `A ${innerR} ${innerR} 0 ${inner.large} 0 ${inner.x1} ${inner.y1}`,
            "Z",
          ].join(" ");

          return <path key={i} d={d} fill={color} opacity={0.85} />;
        })}

        {(centerValue || centerLabel) && (
          <>
            {centerValue && (
              <text
                x={cx}
                y={centerLabel ? cy - 4 : cy}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={18}
                fontWeight={700}
                fill="var(--s-text)"
                fontFamily="var(--s-font-mono, monospace)"
              >
                {centerValue}
              </text>
            )}
            {centerLabel && (
              <text
                x={cx}
                y={centerValue ? cy + 14 : cy}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={9}
                fill="var(--s-text-muted)"
              >
                {centerLabel}
              </text>
            )}
          </>
        )}
      </svg>
    );
  },
);
