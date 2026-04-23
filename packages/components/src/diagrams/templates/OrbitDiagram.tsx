"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";

export interface OrbitNode {
  label: string;
  icon?: ReactNode;
}

export interface OrbitDiagramProps extends HTMLAttributes<HTMLDivElement> {
  center: { label: string; icon?: ReactNode };
  nodes: OrbitNode[];
  size?: number;
  labels?: string[];
}

export const OrbitDiagram = forwardRef<HTMLDivElement, OrbitDiagramProps>(
  function OrbitDiagram({ center, nodes, size = 260, labels = [], className, ...props }, ref) {
    const r = size / 2 - 44;
    const cx = size / 2;
    const cy = size / 2;

    return (
      <div
        ref={ref}
        data-slot="orbit-diagram"
        className={cn("relative flex items-center justify-center", className)}
        style={{ width: size, height: size }}
        {...props}
      >
        <svg width={size} height={size} className="absolute inset-0" aria-hidden>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--s-border-muted)" strokeWidth={1} strokeDasharray="4 3" />
          {nodes.map((_, i) => {
            const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
            const nx = cx + r * Math.cos(angle);
            const ny = cy + r * Math.sin(angle);
            return <line key={i} x1={cx} y1={cy} x2={nx} y2={ny} stroke="var(--s-border-muted)" strokeWidth={1} strokeDasharray="3 3" />;
          })}
        </svg>

        <div className="relative z-10 flex flex-col items-center gap-1 px-4 py-3 rounded-[var(--s-radius-lg,0px)] border-2 border-[var(--s-primary)] bg-[var(--s-background)] text-center">
          {center.icon && <div className="[&_svg]:size-5 text-[var(--s-primary)]">{center.icon}</div>}
          <span className="text-xs font-bold text-[var(--s-text)]">{center.label}</span>
        </div>

        {nodes.map((node, i) => {
          const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
          const nx = cx + r * Math.cos(angle);
          const ny = cy + r * Math.sin(angle);
          return (
            <div
              key={i}
              className="absolute z-10 flex flex-col items-center gap-0.5 -translate-x-1/2 -translate-y-1/2"
              style={{ left: nx, top: ny }}
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-[var(--s-radius-full,9999px)] border border-[var(--s-border)] bg-[var(--s-surface)] [&_svg]:size-4 text-[var(--s-text-muted)]">
                {node.icon ?? <span className="text-[10px] font-bold">{node.label.charAt(0)}</span>}
              </div>
              <span className="text-[9px] font-medium text-[var(--s-text-muted)] whitespace-nowrap">{node.label}</span>
            </div>
          );
        })}

        {labels.map((label, i) => {
          const angle = ((i + 0.5) / labels.length) * Math.PI * 2 - Math.PI / 2;
          const lx = cx + (r * 0.55) * Math.cos(angle);
          const ly = cy + (r * 0.55) * Math.sin(angle);
          return (
            <div key={i} className="absolute z-20 -translate-x-1/2 -translate-y-1/2" style={{ left: lx, top: ly }}>
              <span className="text-[8px] font-[family-name:var(--s-font-mono)] uppercase tracking-wider text-[var(--s-primary)] opacity-60 whitespace-nowrap">{label}</span>
            </div>
          );
        })}
      </div>
    );
  },
);
