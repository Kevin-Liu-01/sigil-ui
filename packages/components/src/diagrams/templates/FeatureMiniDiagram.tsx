"use client";

import { forwardRef, type SVGAttributes } from "react";
import { cn } from "../../utils";

export type FeatureMiniVariant = "timeline-bars" | "wave-state" | "layer-stack" | "hub-spoke";

export interface FeatureMiniDiagramProps extends Omit<SVGAttributes<SVGSVGElement>, "width" | "height"> {
  variant: FeatureMiniVariant;
  size?: number;
  accentColor?: string;
}

export const FeatureMiniDiagram = forwardRef<SVGSVGElement, FeatureMiniDiagramProps>(
  function FeatureMiniDiagram({ variant, size = 120, accentColor, className, ...props }, ref) {
    const accent = accentColor ?? "var(--s-primary)";
    const muted = "var(--s-border)";
    const text = "var(--s-text-muted)";

    return (
      <svg
        ref={ref}
        data-slot="feature-mini-diagram"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={cn("shrink-0", className)}
        {...props}
      >
        {variant === "timeline-bars" && (
          <>
            {[0, 1, 2, 3].map(i => (
              <g key={i}>
                <rect x={10} y={15 + i * 25} width={size * 0.3 + i * 15} height={12} rx={2} fill={i === 0 ? accent : muted} opacity={i === 0 ? 0.8 : 0.3} />
                <text x={6} y={24 + i * 25} fontSize={7} fill={text} textAnchor="end">{i * 50}ms</text>
              </g>
            ))}
            <line x1={10} y1={10} x2={10} y2={size - 10} stroke={muted} strokeWidth={1} />
          </>
        )}

        {variant === "wave-state" && (
          <>
            <path d={`M 10 ${size / 2} Q 30 ${size / 2 - 20} 50 ${size / 2} Q 70 ${size / 2 + 20} 90 ${size / 2} Q 110 ${size / 2 - 15} ${size - 10} ${size / 2}`} fill="none" stroke={accent} strokeWidth={2} opacity={0.6} />
            {[25, 60, 95].map((x, i) => (
              <g key={i}>
                <rect x={x - 12} y={size / 2 + 15} width={24} height={16} rx={3} fill={i === 1 ? accent : muted} opacity={i === 1 ? 0.7 : 0.2} />
                <text x={x} y={size / 2 + 26} fontSize={7} fill="var(--s-text)" textAnchor="middle">{["Sleep", "Active", "Sleep"][i]}</text>
              </g>
            ))}
          </>
        )}

        {variant === "layer-stack" && (
          <>
            {[0, 1, 2].map(i => {
              const y = 20 + i * 30;
              return (
                <g key={i}>
                  <rect x={15} y={y} width={size - 30} height={22} rx={3} fill={i === 2 ? accent : "var(--s-surface)"} stroke={muted} strokeWidth={1} opacity={i === 2 ? 0.7 : 1} />
                  <text x={size / 2} y={y + 14} fontSize={8} fill={i === 2 ? "var(--s-primary-contrast, #fff)" : text} textAnchor="middle">{["App", "Runtime", "Hardware"][i]}</text>
                </g>
              );
            })}
            <line x1={size / 2} y1={42} x2={size / 2} y2={50} stroke={muted} strokeWidth={1} strokeDasharray="2 2" />
            <line x1={size / 2} y1={72} x2={size / 2} y2={80} stroke={muted} strokeWidth={1} strokeDasharray="2 2" />
          </>
        )}

        {variant === "hub-spoke" && (
          <>
            <circle cx={size / 2} cy={size / 2} r={size * 0.3} fill="none" stroke={muted} strokeWidth={1} strokeDasharray="3 3" />
            <circle cx={size / 2} cy={size / 2} r={14} fill={accent} opacity={0.8} />
            {[0, 1, 2, 3, 4].map(i => {
              const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
              const r2 = size * 0.3;
              const x = size / 2 + r2 * Math.cos(angle);
              const y = size / 2 + r2 * Math.sin(angle);
              return (
                <g key={i}>
                  <line x1={size / 2} y1={size / 2} x2={x} y2={y} stroke={muted} strokeWidth={1} strokeDasharray="2 2" />
                  <circle cx={x} cy={y} r={6} fill="var(--s-surface)" stroke={muted} strokeWidth={1} />
                </g>
              );
            })}
          </>
        )}
      </svg>
    );
  },
);
