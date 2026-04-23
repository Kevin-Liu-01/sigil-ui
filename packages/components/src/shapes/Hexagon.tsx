"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface HexagonProps extends HTMLAttributes<HTMLDivElement> {
  /** Hexagon size. @default "md" */
  size?: "sm" | "md" | "lg" | "xl";
  children?: ReactNode;
}

const sizeStyles: Record<string, string> = {
  sm: "w-16 h-16",
  md: "w-24 h-24",
  lg: "w-32 h-32",
  xl: "w-48 h-48",
};

/** Hexagonal container using CSS clip-path. */
export const Hexagon = forwardRef<HTMLDivElement, HexagonProps>(function Hexagon(
  { size = "md", className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="hexagon"
      className={cn(
        "inline-flex items-center justify-center",
        "bg-[var(--s-surface)]",
        sizeStyles[size],
        className,
      )}
      style={{
        clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
      }}
      {...rest}
    >
      {children}
    </div>
  );
});
