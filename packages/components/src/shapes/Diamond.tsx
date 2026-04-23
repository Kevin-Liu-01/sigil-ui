"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface DiamondProps extends HTMLAttributes<HTMLDivElement> {
  /** Diamond size. @default "md" */
  size?: "sm" | "md" | "lg" | "xl";
  children?: ReactNode;
}

const sizeStyles: Record<string, string> = {
  sm: "w-16 h-16",
  md: "w-24 h-24",
  lg: "w-32 h-32",
  xl: "w-48 h-48",
};

/** Diamond-shaped container using CSS clip-path. */
export const Diamond = forwardRef<HTMLDivElement, DiamondProps>(function Diamond(
  { size = "md", className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="diamond"
      className={cn(
        "inline-flex items-center justify-center",
        "bg-[var(--s-surface)] border-[var(--s-border)]",
        sizeStyles[size],
        className,
      )}
      style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
      {...rest}
    >
      {children}
    </div>
  );
});
