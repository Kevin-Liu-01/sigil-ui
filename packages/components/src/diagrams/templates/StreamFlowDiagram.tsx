"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";

export interface StreamFlowDiagramProps extends HTMLAttributes<HTMLDivElement> {
  source: { label: string; icon?: ReactNode };
  tokens?: string[];
  output?: string;
}

export const StreamFlowDiagram = forwardRef<HTMLDivElement, StreamFlowDiagramProps>(
  function StreamFlowDiagram({ source, tokens = ["Hello", "World", "!"], output, className, ...props }, ref) {
    const safeSource = source ?? { label: "Source" };
    return (
      <div
        ref={ref}
        data-slot="stream-flow-diagram"
        className={cn("w-full p-4 rounded-[var(--s-radius-card,0px)] border border-[color:var(--s-border)] bg-[var(--s-surface)]", className)}
        {...props}
      >
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-2 rounded-[var(--s-radius-md,0px)] border border-[color:var(--s-primary)] bg-[var(--s-primary-muted)] text-sm font-medium text-[var(--s-text)] [&_svg]:size-4">
            {safeSource.icon}{safeSource.label}
          </div>

          <svg width="32" height="16" className="shrink-0" aria-hidden>
            <line x1="0" y1="8" x2="24" y2="8" stroke="var(--s-chart-axis)" strokeWidth="1.5" strokeDasharray="4 3" />
            <polygon points="24,5 32,8 24,11" fill="var(--s-chart-axis)" />
          </svg>

          <div className="flex items-center gap-1 flex-wrap">
            {tokens.map((token, i) => (
              <span
                key={i}
                className="inline-block px-2 py-0.5 rounded-[var(--s-radius-sm,0px)] bg-[var(--s-primary-muted)] text-[10px] font-[family-name:var(--s-font-mono)] text-[var(--s-primary)] font-medium"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                {token}
              </span>
            ))}
          </div>

          {output && (
            <>
              <svg width="24" height="16" className="shrink-0" aria-hidden>
                <line x1="0" y1="8" x2="16" y2="8" stroke="var(--s-chart-axis)" strokeWidth="1.5" strokeDasharray="4 3" />
                <polygon points="16,5 24,8 16,11" fill="var(--s-chart-axis)" />
              </svg>
              <div className="px-3 py-2 rounded-[var(--s-radius-md,0px)] border border-[color:var(--s-border)] bg-[var(--s-background)] text-xs font-[family-name:var(--s-font-mono)] text-[var(--s-text)]">
                {output}
              </div>
            </>
          )}
        </div>
      </div>
    );
  },
);
