"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export interface CrossHatchProps extends HTMLAttributes<HTMLDivElement> {
  angle?: number;
  spacing?: number;
  color?: string;
  opacity?: number;
}

export const CrossHatch = forwardRef<HTMLDivElement, CrossHatchProps>(
  function CrossHatch({ angle = 45, spacing = 6, color, opacity = 0.15, className, style, children, ...props }, ref) {
    const c = color ?? "var(--s-text)";

    return (
      <div
        ref={ref}
        data-slot="cross-hatch"
        className={cn("relative", className)}
        style={{
          backgroundImage: `repeating-linear-gradient(${angle}deg, ${c} 0, ${c} 0.5px, transparent 0.5px, transparent ${spacing}px)`,
          backgroundSize: `${spacing * 2}px ${spacing * 2}px`,
          opacity,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
);
