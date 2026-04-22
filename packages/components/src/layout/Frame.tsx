"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface FrameProps extends HTMLAttributes<HTMLDivElement> {
  /** Border style variant. @default "default" */
  variant?: "default" | "accent" | "dashed";
  children?: ReactNode;
}

const variantStyles: Record<string, string> = {
  default: "border-[var(--s-border)]",
  accent: "border-[var(--s-primary)]",
  dashed: "border-[var(--s-border)] border-dashed",
};

/** Structural-visibility border frame for visual containment. */
export const Frame = forwardRef<HTMLDivElement, FrameProps>(function Frame(
  { variant = "default", className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "border rounded-[var(--s-card-radius,6px)] p-4",
        variantStyles[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
});
