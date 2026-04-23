"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";

export interface HubRouteNode {
  label: string;
  icon?: ReactNode;
}

export interface HubRouteLayer {
  icon?: ReactNode;
  label: string;
  description?: string;
}

export interface HubRouteDiagramProps extends HTMLAttributes<HTMLDivElement> {
  source: { label: string; icon?: ReactNode };
  hub: { label: string; layers: HubRouteLayer[] };
  leftTargets: HubRouteNode[];
  rightTargets: HubRouteNode[];
  leftLabel?: string;
  rightLabel?: string;
}

export const HubRouteDiagram = forwardRef<HTMLDivElement, HubRouteDiagramProps>(
  function HubRouteDiagram({ source, hub, leftTargets, rightTargets, leftLabel, rightLabel, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="hub-route-diagram"
        className={cn(
          "relative w-full p-6 rounded-[var(--s-radius-card,0px)] border border-[var(--s-border)] bg-[var(--s-surface)]",
          "overflow-hidden",
          className,
        )}
        style={{ backgroundImage: "radial-gradient(circle, var(--s-border-muted) 1px, transparent 1px)", backgroundSize: "20px 20px" }}
        {...props}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col items-center gap-1 shrink-0">
            <div className="flex items-center gap-2 px-3 py-2 rounded-[var(--s-radius-md,0px)] border border-[var(--s-border)] bg-[var(--s-background)] text-sm font-medium text-[var(--s-text)] [&_svg]:size-4">
              {source.icon}{source.label}
            </div>
          </div>

          <svg width="40" height="2" className="shrink-0" aria-hidden><line x1="0" y1="1" x2="40" y2="1" stroke="var(--s-border-strong)" strokeWidth="1.5" strokeDasharray="6 4" /></svg>

          <div className="flex-1 max-w-xs rounded-[var(--s-radius-lg,0px)] border-2 border-[var(--s-primary)] bg-[var(--s-primary-muted)] p-4">
            <div className="text-xs font-bold text-[var(--s-primary)] mb-3 text-center font-[family-name:var(--s-font-mono)] uppercase tracking-wider">{hub.label}</div>
            <div className="grid grid-cols-2 gap-2">
              {hub.layers.map((layer, i) => (
                <div key={i} className="flex items-center gap-1.5 px-2 py-1.5 rounded-[var(--s-radius-sm,0px)] bg-[var(--s-background)] border border-[var(--s-border-muted)] text-[10px] text-[var(--s-text)] [&_svg]:size-3">
                  {layer.icon}<span className="font-medium">{layer.label}</span>
                </div>
              ))}
            </div>
          </div>

          <svg width="24" height="40" className="shrink-0" aria-hidden>
            <line x1="12" y1="0" x2="0" y2="20" stroke="var(--s-border-strong)" strokeWidth="1.5" strokeDasharray="4 3" />
            <line x1="12" y1="0" x2="24" y2="20" stroke="var(--s-border-strong)" strokeWidth="1.5" strokeDasharray="4 3" />
          </svg>

          <div className="flex flex-col gap-3">
            {leftLabel && <div className="text-[9px] font-semibold uppercase tracking-wider text-[var(--s-text-muted)] font-[family-name:var(--s-font-mono)]">{leftLabel}</div>}
            <div className="flex flex-wrap gap-1.5">
              {leftTargets.map((t, i) => (
                <div key={i} className="flex items-center gap-1 px-2 py-1 rounded-[var(--s-radius-sm,0px)] border border-[var(--s-border-muted)] bg-[var(--s-background)] text-[10px] text-[var(--s-text)] [&_svg]:size-3">
                  {t.icon}{t.label}
                </div>
              ))}
            </div>
            {rightLabel && <div className="text-[9px] font-semibold uppercase tracking-wider text-[var(--s-text-muted)] font-[family-name:var(--s-font-mono)] mt-2">{rightLabel}</div>}
            <div className="flex flex-wrap gap-1.5">
              {rightTargets.map((t, i) => (
                <div key={i} className="flex items-center gap-1 px-2 py-1 rounded-[var(--s-radius-sm,0px)] border border-[var(--s-border-muted)] bg-[var(--s-background)] text-[10px] text-[var(--s-text)] [&_svg]:size-3">
                  {t.icon}{t.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
);
