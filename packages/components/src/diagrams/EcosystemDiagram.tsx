"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface EcosystemNode {
  label: string;
  icon?: ReactNode;
}

export interface EcosystemDiagramProps extends HTMLAttributes<HTMLDivElement> {
  center: { label: string; icon?: ReactNode; sublabel?: string };
  ring: EcosystemNode[];
  size?: number;
}

export const EcosystemDiagram = forwardRef<HTMLDivElement, EcosystemDiagramProps>(
  function EcosystemDiagram({ center, ring, size = 280, className, ...props }, ref) {
    const radius = size / 2 - 40;
    const cx = size / 2;
    const cy = size / 2;

    return (
      <div
        ref={ref}
        data-slot="ecosystem-diagram"
        className={cn("relative flex items-center justify-center", className)}
        style={{ width: size, height: size }}
        {...props}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="absolute inset-0"
          aria-hidden
        >
          <circle cx={cx} cy={cy} r={radius} fill="none" stroke="var(--s-border-muted)" strokeWidth="1" strokeDasharray="4 4" />
          {ring.map((_, i) => {
            const angle = (i / ring.length) * Math.PI * 2 - Math.PI / 2;
            const nx = cx + radius * Math.cos(angle);
            const ny = cy + radius * Math.sin(angle);
            return (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={nx}
                y2={ny}
                stroke="var(--s-border-muted)"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
            );
          })}
        </svg>

        <div className="relative z-10 flex flex-col items-center gap-1 px-4 py-3 rounded-[var(--s-radius-full,9999px)] border-2 border-[var(--s-primary)] bg-[var(--s-background)] text-center">
          {center.icon && <div className="[&_svg]:size-5 text-[var(--s-primary)]">{center.icon}</div>}
          <span className="text-xs font-bold text-[var(--s-text)]">{center.label}</span>
          {center.sublabel && <span className="text-[9px] text-[var(--s-text-muted)]">{center.sublabel}</span>}
        </div>

        {ring.map((node, i) => {
          const angle = (i / ring.length) * Math.PI * 2 - Math.PI / 2;
          const nx = cx + radius * Math.cos(angle);
          const ny = cy + radius * Math.sin(angle);
          return (
            <div
              key={i}
              className="absolute z-10 flex flex-col items-center gap-0.5 -translate-x-1/2 -translate-y-1/2"
              style={{ left: nx, top: ny }}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-[var(--s-radius-full,9999px)] border border-[var(--s-border)] bg-[var(--s-surface)] [&_svg]:size-3.5 text-[var(--s-text-muted)]">
                {node.icon ?? <span className="text-[10px] font-bold">{node.label.charAt(0)}</span>}
              </div>
              <span className="text-[9px] font-medium text-[var(--s-text-muted)] whitespace-nowrap">{node.label}</span>
            </div>
          );
        })}
      </div>
    );
  },
);
