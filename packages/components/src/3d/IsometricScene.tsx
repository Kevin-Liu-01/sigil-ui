"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface IsometricSceneProps extends HTMLAttributes<HTMLDivElement> {
  showGrid?: boolean;
  gridSize?: number;
  width?: number | string;
  height?: number | string;
  children?: ReactNode;
}

export const IsometricScene = forwardRef<HTMLDivElement, IsometricSceneProps>(
  function IsometricScene({ showGrid = true, gridSize = 32, width = "100%", height = 300, className, style, children, ...props }, ref) {
    const gridBg = showGrid
      ? {
          backgroundImage: [
            `linear-gradient(30deg, var(--s-border-muted) 1px, transparent 1px)`,
            `linear-gradient(-30deg, var(--s-border-muted) 1px, transparent 1px)`,
            `linear-gradient(90deg, var(--s-border-muted) 1px, transparent 1px)`,
          ].join(", "),
          backgroundSize: `${gridSize}px ${gridSize * 0.577}px, ${gridSize}px ${gridSize * 0.577}px, ${gridSize}px ${gridSize}px`,
          backgroundPosition: "center",
        }
      : {};

    return (
      <div
        ref={ref}
        data-slot="isometric-scene"
        className={cn(
          "relative overflow-hidden flex items-center justify-center",
          "rounded-[var(--s-radius-card,0px)] border border-[var(--s-border)] bg-[var(--s-surface)]",
          className,
        )}
        style={{ width, height: typeof height === "number" ? height : height, ...gridBg, ...style }}
        {...props}
      >
        {children}
      </div>
    );
  },
);
