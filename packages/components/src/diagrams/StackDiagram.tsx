"use client";

import { forwardRef, useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface StackLayer {
  label: string;
  children?: ReactNode;
  hatched?: boolean;
  accent?: boolean;
}

export interface StackDiagramProps extends HTMLAttributes<HTMLDivElement> {
  layers: StackLayer[];
  title?: string;
  gap?: string;
  tilt?: boolean;
  interactive?: boolean;
}

export const StackDiagram = forwardRef<HTMLDivElement, StackDiagramProps>(
  function StackDiagram({ layers, title, gap = "0.5rem", tilt = false, interactive = true, className, ...props }, ref) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
      <div
        ref={ref}
        data-slot="stack-diagram"
        className={cn(
          "relative",
          tilt && "perspective-[600px]",
          className,
        )}
        {...props}
      >
        {title && (
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--s-text-muted)] font-[family-name:var(--s-font-mono)] mb-4">
            {title}
          </h3>
        )}

        <div
          className="flex flex-col"
          style={{
            gap,
            ...(tilt ? { transform: "rotateX(12deg) rotateZ(-2deg)", transformStyle: "preserve-3d" } : {}),
          }}
        >
          {layers.map((layer, i) => {
            const isActive = activeIndex === i;
            return (
              <div
                key={i}
                className={cn(
                  "relative flex items-stretch rounded-[var(--s-radius-md,0px)] border overflow-hidden",
                  "transition-all duration-[var(--s-duration-fast,150ms)]",
                  isActive
                    ? "border-[var(--s-primary)] ring-1 ring-[var(--s-primary)]/20 scale-[1.01]"
                    : "border-[var(--s-border)]",
                  layer.accent
                    ? "bg-[var(--s-primary)] text-[var(--s-primary-contrast,#fff)]"
                    : "bg-[var(--s-surface)]",
                )}
                onMouseEnter={() => interactive && setActiveIndex(i)}
                onMouseLeave={() => interactive && setActiveIndex(null)}
              >
                {layer.hatched && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: "repeating-linear-gradient(45deg, currentColor 0, currentColor 0.5px, transparent 0.5px, transparent 6px)",
                      opacity: 0.06,
                    }}
                  />
                )}

                <div className={cn(
                  "flex items-center justify-center w-16 shrink-0 border-r",
                  layer.accent ? "border-[var(--s-primary-contrast,#fff)]/20" : "border-[var(--s-border-muted)]",
                )}>
                  <span className={cn(
                    "text-[10px] font-semibold uppercase tracking-wider font-[family-name:var(--s-font-mono)]",
                    layer.accent ? "" : "text-[var(--s-text-muted)]",
                  )}>
                    {layer.label}
                  </span>
                </div>

                <div className="flex-1 p-3 min-h-[48px] flex items-center">
                  {layer.children ?? (
                    <span className={cn("text-xs", layer.accent ? "opacity-80" : "text-[var(--s-text-muted)]")}>
                      {layer.label} layer
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
