"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual variant. @default "default" */
  variant?: "default" | "secondary" | "outline" | "destructive";
  /** Badge size. @default "md" */
  size?: "sm" | "md";
  children?: ReactNode;
}

const variantStyles: Record<string, string> = {
  default: "bg-[var(--s-primary)] text-white",
  secondary: "bg-[var(--s-surface-elevated)] text-[var(--s-text-secondary)] border border-[var(--s-border)] border-[style:var(--s-border-style,solid)]",
  outline: "bg-transparent text-[var(--s-text)] border border-[var(--s-border)] border-[style:var(--s-border-style,solid)]",
  destructive: "bg-[var(--s-error)] text-white",
};

const sizeStyles: Record<string, string> = {
  sm: "text-[10px] px-1.5 py-0.5",
  md: "text-xs px-2.5 py-0.5",
};

/** Inline status badge with variant and size options. */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = "default", size = "md", className, children, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center font-medium rounded-full whitespace-nowrap",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
});
