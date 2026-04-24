"use client";

import { forwardRef, type SVGAttributes } from "react";
import { cn } from "../../utils";

export interface UsageGaugeProps extends Omit<SVGAttributes<SVGSVGElement>, "width" | "height"> {
  value: number;
  max?: number;
  label?: string;
  unit?: string;
  width?: number;
  height?: number;
  /** Color of the filled arc. Defaults to primary, turns to error/warning at thresholds. */
  color?: string;
  /** Auto-color based on usage percentage. @default true */
  autoColor?: boolean;
}

export const UsageGauge = forwardRef<SVGSVGElement, UsageGaugeProps>(
  function UsageGauge({ value, max = 100, label, unit, width: w = 160, height: h = 120, color, autoColor = true, className, ...props }, ref) {
    const cx = w / 2;
    const cy = h - 16;
    const r = Math.min(cx - 8, cy - 8);
    const pct = Math.min(value / max, 1);
    const startAngle = -180;
    const sweep = 180;
    const endAngle = startAngle + sweep * pct;

    function arcPoint(angle: number) {
      const rad = (angle * Math.PI) / 180;
      return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
    }

    const trackStart = arcPoint(startAngle);
    const trackEnd = arcPoint(startAngle + sweep);
    const filledEnd = arcPoint(endAngle);
    const large = pct > 0.5 ? 1 : 0;

    let fillColor = color ?? "var(--s-primary)";
    if (autoColor && !color) {
      if (pct > 0.9) fillColor = "var(--s-error, #ef4444)";
      else if (pct > 0.7) fillColor = "var(--s-warning, #f59e0b)";
      else fillColor = "var(--s-primary)";
    }

    return (
      <svg
        ref={ref}
        data-slot="usage-gauge"
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        className={cn("shrink-0", className)}
        {...props}
      >
        <path
          d={`M ${trackStart.x} ${trackStart.y} A ${r} ${r} 0 0 1 ${trackEnd.x} ${trackEnd.y}`}
          fill="none"
          stroke="var(--s-border)"
          strokeWidth={8}
          strokeLinecap="round"
          opacity={0.3}
        />
        {pct > 0 && (
          <path
            d={`M ${trackStart.x} ${trackStart.y} A ${r} ${r} 0 ${large} 1 ${filledEnd.x} ${filledEnd.y}`}
            fill="none"
            stroke={fillColor}
            strokeWidth={8}
            strokeLinecap="round"
          />
        )}

        <text
          x={cx}
          y={cy - r * 0.3}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={22}
          fontWeight={700}
          fill="var(--s-text)"
          fontFamily="var(--s-font-mono, monospace)"
        >
          {Math.round(pct * 100)}%
        </text>

        {label && (
          <text x={cx} y={cy - r * 0.3 + 18} textAnchor="middle" fontSize={10} fill="var(--s-text-muted)">
            {label}
          </text>
        )}

        <text x={trackStart.x + 4} y={cy + 14} textAnchor="start" fontSize={9} fill="var(--s-text-muted)" fontFamily="var(--s-font-mono, monospace)">
          0{unit ? ` ${unit}` : ""}
        </text>
        <text x={trackEnd.x - 4} y={cy + 14} textAnchor="end" fontSize={9} fill="var(--s-text-muted)" fontFamily="var(--s-font-mono, monospace)">
          {max}{unit ? ` ${unit}` : ""}
        </text>
      </svg>
    );
  },
);
