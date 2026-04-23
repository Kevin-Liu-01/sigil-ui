"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export interface DiagramLabelProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  variant?: "default" | "accent" | "warn";
  showDot?: boolean;
  showLine?: boolean;
  lineLength?: number;
  position?: "top" | "bottom" | "left" | "right";
}

const variantColors = {
  default: "var(--s-text-muted)",
  accent: "var(--s-primary)",
  warn: "var(--s-error)",
};

export const DiagramLabel = forwardRef<HTMLDivElement, DiagramLabelProps>(
  function DiagramLabel({ text, variant = "default", showDot = true, showLine = true, lineLength = 24, position = "top", className, ...props }, ref) {
    const color = variantColors[variant];
    const isVertical = position === "top" || position === "bottom";

    return (
      <div
        ref={ref}
        data-slot="diagram-label"
        className={cn(
          "inline-flex items-center gap-1",
          isVertical ? "flex-col" : "flex-row",
          position === "bottom" && "flex-col-reverse",
          position === "right" && "flex-row-reverse",
          className,
        )}
        {...props}
      >
        {showDot && (
          <div
            className="w-1.5 h-1.5 rounded-[var(--s-radius-full,9999px)] shrink-0"
            style={{ backgroundColor: color }}
          />
        )}
        {showLine && (
          <div
            className="shrink-0"
            style={{
              [isVertical ? "height" : "width"]: lineLength,
              [isVertical ? "width" : "height"]: 1,
              background: color,
              opacity: 0.4,
            }}
          />
        )}
        <span
          className="text-[10px] font-medium font-[family-name:var(--s-font-mono)] tracking-wide uppercase whitespace-nowrap"
          style={{ color }}
        >
          {text}
        </span>
      </div>
    );
  },
);
