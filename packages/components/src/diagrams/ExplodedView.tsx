"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface ExplodedViewLayer {
  label: string;
  children: ReactNode;
  hatched?: boolean;
}

export interface ExplodedViewProps extends HTMLAttributes<HTMLDivElement> {
  /** Layers to display from top to bottom. */
  layers: ExplodedViewLayer[];
  /** Gap between layers. @default "2rem" */
  gap?: string;
}

/** Vertical exploded-layer diagram for architecture visualization. */
export const ExplodedView = forwardRef<HTMLDivElement, ExplodedViewProps>(function ExplodedView(
  { layers, gap = "2rem", className, style, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col items-center w-full", className)}
      style={{ gap, ...style }}
      {...rest}
    >
      {layers.map((layer, i) => (
        <div key={i} className="w-full relative">
          <div
            className={cn(
              "relative rounded-[var(--s-radius-md,6px)] border border-[var(--s-border)] p-4",
              "bg-[var(--s-surface)]",
              layer.hatched && "overflow-hidden",
            )}
          >
            {layer.hatched && (
              <div
                className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 4px,
                    var(--s-text) 4px,
                    var(--s-text) 5px
                  )`,
                }}
                aria-hidden
              />
            )}
            <div className="relative z-[1]">{layer.children}</div>
          </div>
          <span className="absolute -left-2 top-1/2 -translate-y-1/2 -translate-x-full text-xs font-mono text-[var(--s-text-muted)] whitespace-nowrap">
            {layer.label}
          </span>
          {i < layers.length - 1 && (
            <div className="flex justify-center" style={{ height: gap }}>
              <div className="w-px h-full border-l border-dashed border-[var(--s-border)]" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
});
