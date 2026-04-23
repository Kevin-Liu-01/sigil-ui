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
    const bg = [
      `repeating-linear-gradient(${angle}deg, ${c} 0, ${c} 0.5px, transparent 0.5px, transparent ${spacing}px)`,
      `repeating-linear-gradient(${angle + 90}deg, ${c} 0, ${c} 0.5px, transparent 0.5px, transparent ${spacing}px)`,
    ].join(", ");

    return (
      <div
        ref={ref}
        data-slot="cross-hatch"
        className={cn("relative", className)}
        style={style}
        {...props}
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: bg,
            backgroundSize: `${spacing * 2}px ${spacing * 2}px`,
            opacity,
          }}
        />
        <div className="relative">{children}</div>
      </div>
    );
  },
);
