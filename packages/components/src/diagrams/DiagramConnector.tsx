"use client";

import { forwardRef, type SVGAttributes } from "react";
import { cn } from "../utils";

export type ConnectorVariant = "solid" | "dashed" | "dashed-animated";
export type ConnectorDirection = "horizontal" | "vertical";

export interface DiagramConnectorProps extends SVGAttributes<SVGSVGElement> {
  variant?: ConnectorVariant;
  direction?: ConnectorDirection;
  label?: string;
  length?: number;
  strokeColor?: string;
  arrowSize?: number;
}

export const DiagramConnector = forwardRef<SVGSVGElement, DiagramConnectorProps>(
  function DiagramConnector({
    variant = "dashed-animated",
    direction = "horizontal",
    label,
    length = 60,
    strokeColor,
    arrowSize = 6,
    className,
    ...props
  }, ref) {
    const isHorizontal = direction === "horizontal";
    const w = isHorizontal ? length : 24;
    const h = isHorizontal ? 24 : length;
    const color = strokeColor ?? "var(--s-border-strong, var(--s-border))";

    const dashProps: Record<string, string | number> = {};
    if (variant === "dashed" || variant === "dashed-animated") {
      dashProps.strokeDasharray = "6 4";
    }

    const lineEnd = isHorizontal ? length - arrowSize : length - arrowSize;

    return (
      <svg
        ref={ref}
        data-slot="diagram-connector"
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        fill="none"
        className={cn("shrink-0", className)}
        aria-hidden
        {...props}
      >
        {variant === "dashed-animated" && (
          <style>{`
            @keyframes sigil-dash-flow {
              to { stroke-dashoffset: -20; }
            }
            [data-slot="diagram-connector"] .dash-animated {
              animation: sigil-dash-flow 1s linear infinite;
            }
          `}</style>
        )}

        {isHorizontal ? (
          <>
            <line
              x1={0}
              y1={12}
              x2={lineEnd}
              y2={12}
              stroke={color}
              strokeWidth={1.5}
              className={variant === "dashed-animated" ? "dash-animated" : undefined}
              {...dashProps}
            />
            <polygon
              points={`${length - arrowSize},${12 - arrowSize / 2} ${length},12 ${length - arrowSize},${12 + arrowSize / 2}`}
              fill={color}
            />
          </>
        ) : (
          <>
            <line
              x1={12}
              y1={0}
              x2={12}
              y2={lineEnd}
              stroke={color}
              strokeWidth={1.5}
              className={variant === "dashed-animated" ? "dash-animated" : undefined}
              {...dashProps}
            />
            <polygon
              points={`${12 - arrowSize / 2},${length - arrowSize} 12,${length} ${12 + arrowSize / 2},${length - arrowSize}`}
              fill={color}
            />
          </>
        )}

        {label && (
          <text
            x={isHorizontal ? length / 2 : 22}
            y={isHorizontal ? 8 : length / 2}
            textAnchor={isHorizontal ? "middle" : "start"}
            dominantBaseline={isHorizontal ? "auto" : "middle"}
            fill="var(--s-text-muted)"
            fontSize={10}
            fontFamily="var(--s-font-mono, monospace)"
          >
            {label}
          </text>
        )}
      </svg>
    );
  },
);
