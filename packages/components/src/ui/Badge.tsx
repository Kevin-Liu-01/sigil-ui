"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export type BadgeVariant =
  | "default"
  | "secondary"
  | "outline"
  | "destructive"
  | "success"
  | "warning"
  | "info";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual variant. @default "default" */
  variant?: BadgeVariant;
  /** Badge size. @default "md" */
  size?: "sm" | "md";
  children?: ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-[var(--s-primary)] text-white border-transparent",
  secondary:
    "bg-[var(--s-surface-elevated)] text-[var(--s-text-secondary)] border-[var(--s-border)]",
  outline:
    "bg-transparent text-[var(--s-text)] border-[var(--s-border)]",
  destructive:
    "bg-[var(--s-error)] text-white border-transparent",
  success:
    "bg-[var(--s-success)] text-white border-transparent",
  warning:
    "bg-[var(--s-warning)] text-white border-transparent",
  info:
    "bg-[var(--s-info)] text-white border-transparent",
};

const sizeStyles: Record<string, string> = {
  sm: "text-[10px] px-1.5 py-0.5",
  md: "text-xs px-2.5 py-0.5",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = "default", size = "md", className, children, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      data-slot="badge"
      data-variant={variant}
      className={cn(
        "inline-flex items-center rounded-[var(--s-radius-badge,2px)] border px-2.5 py-0.5 text-xs font-semibold",
        "transition-colors duration-[var(--s-duration-fast,150ms)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-ring,var(--s-primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--s-ring-offset,var(--s-background))]",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([data-icon])]:size-3",
        "whitespace-nowrap",
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
