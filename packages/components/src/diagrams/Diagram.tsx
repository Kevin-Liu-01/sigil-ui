"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export type DiagramGridVariant = "dots" | "lines" | "cross" | "none";

export interface DiagramProps extends HTMLAttributes<HTMLDivElement> {
  showGrid?: boolean;
  gridVariant?: DiagramGridVariant;
  gridSize?: number;
  children?: ReactNode;
}

function getGridStyle(variant: DiagramGridVariant, size: number): React.CSSProperties {
  const color = "var(--s-border-muted)";
  switch (variant) {
    case "dots":
      return {
        backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
      };
    case "lines":
      return {
        backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
      };
    case "cross":
      return {
        backgroundImage: [
          `radial-gradient(circle, ${color} 1px, transparent 1px)`,
          `linear-gradient(${color} 1px, transparent 1px)`,
          `linear-gradient(90deg, ${color} 1px, transparent 1px)`,
        ].join(", "),
        backgroundSize: `${size}px ${size}px`,
      };
    case "none":
    default:
      return {};
  }
}

export const Diagram = forwardRef<HTMLDivElement, DiagramProps>(function Diagram(
  { showGrid = false, gridVariant = "dots", gridSize = 24, className, style, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="diagram"
      className={cn(
        "relative w-full overflow-hidden rounded-[var(--s-radius-card,0px)]",
        "border border-[var(--s-border)] bg-[var(--s-surface)] p-6",
        className,
      )}
      style={{
        ...(showGrid ? getGridStyle(gridVariant, gridSize) : {}),
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
});
