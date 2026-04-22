"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export interface MarginProps extends HTMLAttributes<HTMLDivElement> {
  /** Rail size. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Show visible border rail indicators. */
  visible?: boolean;
}

const sizeMap: Record<string, string> = {
  sm: "px-4",
  md: "px-6 md:px-8",
  lg: "px-8 md:px-12 lg:px-16",
};

/** Horizontal margin rails — wraps content with consistent side margins. */
export const Margin = forwardRef<HTMLDivElement, MarginProps>(function Margin(
  { size = "md", visible = false, className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        sizeMap[size],
        visible && "border-x border-[var(--s-border-muted)]",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
});
