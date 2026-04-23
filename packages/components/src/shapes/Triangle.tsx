"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface TriangleProps extends HTMLAttributes<HTMLDivElement> {
  /** Direction the triangle points. @default "up" */
  direction?: "up" | "down" | "left" | "right";
  /** Triangle size. @default "md" */
  size?: "sm" | "md" | "lg" | "xl";
  children?: ReactNode;
}

const sizeStyles: Record<string, string> = {
  sm: "w-16 h-16",
  md: "w-24 h-24",
  lg: "w-32 h-32",
  xl: "w-48 h-48",
};

const clipPaths: Record<string, string> = {
  up: "polygon(50% 0%, 100% 100%, 0% 100%)",
  down: "polygon(0% 0%, 100% 0%, 50% 100%)",
  left: "polygon(100% 0%, 100% 100%, 0% 50%)",
  right: "polygon(0% 0%, 100% 50%, 0% 100%)",
};

/** Triangular container / decorative element. */
export const Triangle = forwardRef<HTMLDivElement, TriangleProps>(function Triangle(
  { direction = "up", size = "md", className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="triangle"
      className={cn(
        "inline-flex items-center justify-center",
        "bg-[var(--s-surface)]",
        sizeStyles[size],
        className,
      )}
      style={{ clipPath: clipPaths[direction] }}
      {...rest}
    >
      {children}
    </div>
  );
});
