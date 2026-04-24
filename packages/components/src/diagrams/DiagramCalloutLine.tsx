"use client";

import { forwardRef, type SVGAttributes } from "react";
import { cn } from "../utils";

export interface DiagramCalloutLineProps extends SVGAttributes<SVGGElement> {
  path: string;
  label?: string;
  labelX?: number;
  labelY?: number;
  dotX?: number;
  dotY?: number;
  active?: boolean;
}

export const DiagramCalloutLine = forwardRef<SVGGElement, DiagramCalloutLineProps>(
  function DiagramCalloutLine(
    { path, label, labelX, labelY, dotX, dotY, active = false, className, ...props },
    ref,
  ) {
    return (
      <g ref={ref} className={cn("pointer-events-none", className)} {...props}>
        <path
          d={path}
          fill="none"
          stroke={active ? "var(--s-text)" : "var(--s-text-muted)"}
          strokeDasharray="6 6"
          strokeLinecap="square"
          strokeWidth={active ? 1.4 : 1.1}
          opacity={active ? 0.72 : 0.42}
        />
        {dotX !== undefined && dotY !== undefined && (
          <circle
            cx={dotX}
            cy={dotY}
            r={3.5}
            fill={active ? "var(--s-text)" : "var(--s-text-muted)"}
            opacity={active ? 0.82 : 0.55}
          />
        )}
        {label && labelX !== undefined && labelY !== undefined && (
          <text
            x={labelX}
            y={labelY}
            fill={active ? "var(--s-text)" : "var(--s-text-muted)"}
            fontFamily="var(--s-font-mono, monospace)"
            fontSize={9}
            fontWeight={700}
            letterSpacing="0.18em"
            opacity={active ? 0.82 : 0.52}
          >
            {label}
          </text>
        )}
      </g>
    );
  },
);
