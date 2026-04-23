"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface PipelineStep {
  icon?: ReactNode;
  label: string;
  description?: string;
}

export interface PipelineDiagramProps extends HTMLAttributes<HTMLDivElement> {
  steps: PipelineStep[];
  direction?: "horizontal" | "vertical";
  connector?: "solid" | "dashed" | "dashed-animated";
  showNumbers?: boolean;
}

export const PipelineDiagram = forwardRef<HTMLDivElement, PipelineDiagramProps>(
  function PipelineDiagram({ steps, direction = "horizontal", connector = "dashed-animated", showNumbers = true, className, ...props }, ref) {
    const isH = direction === "horizontal";

    const dashProps: Record<string, string | number> = {};
    if (connector !== "solid") dashProps.strokeDasharray = "6 4";

    return (
      <div
        ref={ref}
        data-slot="pipeline-diagram"
        className={cn("flex items-stretch gap-0", isH ? "flex-row flex-wrap" : "flex-col", className)}
        {...props}
      >
        {connector === "dashed-animated" && (
          <style>{`@keyframes sigil-pipe-dash{to{stroke-dashoffset:-20}}[data-slot="pipeline-diagram"] .pipe-anim{animation:sigil-pipe-dash 1s linear infinite}`}</style>
        )}

        {steps.map((step, i) => (
          <div key={i} className={cn("flex items-center", isH ? "flex-row" : "flex-col")}>
            <div className="relative flex flex-col items-center text-center gap-2 px-4 py-3 min-w-[100px]">
              <div className={cn(
                "flex items-center justify-center w-10 h-10",
                "rounded-[var(--s-radius-full,9999px)]",
                "border-2 border-[var(--s-primary)] bg-[var(--s-primary-muted)]",
                "text-[var(--s-primary)] [&_svg]:size-4",
              )}>
                {step.icon ?? (
                  showNumbers && (
                    <span className="text-sm font-bold">{i + 1}</span>
                  )
                )}
              </div>
              {showNumbers && step.icon && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-[var(--s-radius-full,9999px)] bg-[var(--s-primary)] text-[var(--s-primary-contrast,#fff)] text-[10px] font-bold">
                  {i + 1}
                </span>
              )}
              <span className="text-xs font-semibold text-[var(--s-text)]">{step.label}</span>
              {step.description && (
                <span className="text-[10px] leading-relaxed text-[var(--s-text-muted)] max-w-[120px]">{step.description}</span>
              )}
            </div>

            {i < steps.length - 1 && (
              <svg
                className="shrink-0"
                width={isH ? 48 : 16}
                height={isH ? 16 : 48}
                viewBox={isH ? "0 0 48 16" : "0 0 16 48"}
                fill="none"
                aria-hidden
              >
                {isH ? (
                  <>
                    <line x1="0" y1="8" x2="40" y2="8" stroke="var(--s-primary)" strokeWidth="1.5" strokeOpacity="0.4" className={connector === "dashed-animated" ? "pipe-anim" : undefined} {...dashProps} />
                    <polygon points="40,5 48,8 40,11" fill="var(--s-primary)" fillOpacity="0.5" />
                  </>
                ) : (
                  <>
                    <line x1="8" y1="0" x2="8" y2="40" stroke="var(--s-primary)" strokeWidth="1.5" strokeOpacity="0.4" className={connector === "dashed-animated" ? "pipe-anim" : undefined} {...dashProps} />
                    <polygon points="5,40 8,48 11,40" fill="var(--s-primary)" fillOpacity="0.5" />
                  </>
                )}
              </svg>
            )}
          </div>
        ))}
      </div>
    );
  },
);
