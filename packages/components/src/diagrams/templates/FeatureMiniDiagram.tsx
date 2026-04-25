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
    const fs = Math.max(5, size * 0.06);

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
            {[0, 1, 2, 3].map(i => {
              const barY = size * 0.12 + i * size * 0.2;
              const barW = size * 0.25 + i * size * 0.13;
              const barH = size * 0.1;
              return (
                <g key={i}>
                  <rect x={size * 0.15} y={barY} width={barW} height={barH} rx={2} fill={i === 0 ? accent : muted} opacity={i === 0 ? 0.8 : 0.3} />
                  {size >= 80 && <text x={size * 0.12} y={barY + barH * 0.7} fontSize={fs} fill={text} textAnchor="end">{i * 50}ms</text>}
                </g>
              );
            })}
            <line x1={size * 0.15} y1={size * 0.08} x2={size * 0.15} y2={size * 0.92} stroke={muted} strokeWidth={1} />
          </>
        )}

        {variant === "wave-state" && (() => {
          const m = size * 0.08;
          const mid = size / 2;
          const amp = size * 0.16;
          const step = (size - m * 2) / 4;
          const positions = [m + step * 0.5, m + step * 2, m + step * 3.5];
          const boxW = size * 0.2;
          const boxH = size * 0.13;
          return (
            <>
              <path d={`M ${m} ${mid} Q ${m + step} ${mid - amp} ${m + step * 2} ${mid} Q ${m + step * 3} ${mid + amp} ${size - m} ${mid}`} fill="none" stroke={accent} strokeWidth={2} opacity={0.6} />
              {positions.map((x, i) => (
                <g key={i}>
                  <rect x={x - boxW / 2} y={mid + size * 0.12} width={boxW} height={boxH} rx={3} fill={i === 1 ? accent : muted} opacity={i === 1 ? 0.7 : 0.2} />
                  {size >= 80 && <text x={x} y={mid + size * 0.12 + boxH * 0.7} fontSize={fs} fill="var(--s-text)" textAnchor="middle">{["Sleep", "Active", "Sleep"][i]}</text>}
                </g>
              ))}
            </>
          );
        })()}

        {variant === "layer-stack" && (
          <>
            {[0, 1, 2].map(i => {
              const y = size * 0.15 + i * size * 0.25;
              const h = size * 0.18;
              return (
                <g key={i}>
                  <rect x={size * 0.12} y={y} width={size * 0.76} height={h} rx={3} fill={i === 2 ? accent : "var(--s-surface)"} stroke={muted} strokeWidth={1} opacity={i === 2 ? 0.7 : 1} />
                  {size >= 60 && <text x={size / 2} y={y + h * 0.65} fontSize={fs} fill={i === 2 ? "var(--s-primary-contrast)" : text} textAnchor="middle">{["App", "Runtime", "HW"][i]}</text>}
                </g>
              );
            })}
            <line x1={size / 2} y1={size * 0.15 + size * 0.18} x2={size / 2} y2={size * 0.15 + size * 0.25} stroke={muted} strokeWidth={1} strokeDasharray="2 2" />
            <line x1={size / 2} y1={size * 0.15 + size * 0.43} x2={size / 2} y2={size * 0.15 + size * 0.5} stroke={muted} strokeWidth={1} strokeDasharray="2 2" />
          </>
        )}

        {variant === "hub-spoke" && (
          <>
            <circle cx={size / 2} cy={size / 2} r={size * 0.3} fill="none" stroke={muted} strokeWidth={1} strokeDasharray="3 3" />
            <circle cx={size / 2} cy={size / 2} r={size * 0.11} fill={accent} opacity={0.8} />
            {[0, 1, 2, 3, 4].map(i => {
              const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
              const r2 = size * 0.3;
              const x = size / 2 + r2 * Math.cos(angle);
              const y = size / 2 + r2 * Math.sin(angle);
              return (
                <g key={i}>
                  <line x1={size / 2} y1={size / 2} x2={x} y2={y} stroke={muted} strokeWidth={1} strokeDasharray="2 2" />
                  <circle cx={x} cy={y} r={size * 0.05} fill="var(--s-surface)" stroke={muted} strokeWidth={1} />
                </g>
              );
            })}
          </>
        )}
      </svg>
    );
  },
);
