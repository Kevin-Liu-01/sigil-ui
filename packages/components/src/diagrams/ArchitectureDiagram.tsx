"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface ArchitectureLayer {
  label: string;
  children: ReactNode;
  hatched?: boolean;
}

export interface ArchitectureDiagramProps extends HTMLAttributes<HTMLDivElement> {
  /** Layers from top (highest abstraction) to bottom (infrastructure). */
  layers: ArchitectureLayer[];
  /** Title for the diagram. */
  title?: string;
  /** Gap between layers. @default "1.5rem" */
  gap?: string;
}

/**
 * Isometric architecture diagram combining exploded-view layering with
 * cross-hatching for infrastructure layers.
 */
export const ArchitectureDiagram = forwardRef<HTMLDivElement, ArchitectureDiagramProps>(
  function ArchitectureDiagram({ layers, title, gap = "1.5rem", className, style, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="architecture-diagram"
        className={cn(
          "relative w-full p-8 rounded-[var(--s-card-radius,8px)]",
          "border border-[style:var(--s-border-style,solid)] border-[var(--s-border)] bg-[var(--s-surface)] shadow-[var(--s-shadow-sm)]",
          className,
        )}
        style={{
          perspective: "1000px",
          ...style,
        }}
        {...rest}
      >
        {title && (
          <h3 className="text-sm font-semibold text-[var(--s-text)] mb-6 text-center uppercase tracking-wider">
            {title}
          </h3>
        )}
        <div
          className="flex flex-col items-center"
          style={{
            gap,
            transformStyle: "preserve-3d",
            transform: "rotateX(12deg) rotateZ(-2deg)",
          }}
        >
          {layers.map((layer, i) => (
            <div
              key={i}
              className={cn(
                "w-full rounded-[var(--s-radius-md,6px)] border border-[style:var(--s-border-style,solid)] p-4 relative overflow-hidden",
                "transition-all duration-[var(--s-duration-fast,150ms)] hover:shadow-[var(--s-shadow-md)]",
                layer.hatched
                  ? "border-[var(--s-border-strong)] bg-[var(--s-surface-elevated)]"
                  : "border-[var(--s-border)] bg-[var(--s-background)]",
              )}
              style={{
                transform: `translateZ(${(layers.length - i) * 4}px)`,
              }}
            >
              {layer.hatched && (
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.06]"
                  style={{
                    backgroundImage: `
                      repeating-linear-gradient(45deg, transparent, transparent 3px, var(--s-text) 3px, var(--s-text) 4px),
                      repeating-linear-gradient(-45deg, transparent, transparent 3px, var(--s-text) 3px, var(--s-text) 4px)
                    `,
                  }}
                  aria-hidden
                />
              )}
              <div className="relative z-[1] flex items-center justify-between gap-4">
                <span className="text-xs font-[family-name:var(--s-font-mono)] text-[var(--s-text-muted)] uppercase tracking-wider shrink-0">
                  {layer.label}
                </span>
                <div className="flex-1">{layer.children}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
);
