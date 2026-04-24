"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export type MonoLabelVariant = "muted" | "accent" | "inverse";
export type MonoLabelSize = "xs" | "sm" | "md";

export interface MonoLabelProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual variant. @default "muted" */
  variant?: MonoLabelVariant;
  /** Size preset. @default "xs" */
  size?: MonoLabelSize;
  /** Render as a different element (e.g. "p", "label", "div"). @default "span" */
  as?: "span" | "p" | "label" | "div" | "dt" | "dd";
}

const variantStyles: Record<MonoLabelVariant, string> = {
  muted: "text-[var(--s-text-muted)]",
  accent: "text-[var(--s-primary)]",
  inverse: "text-[var(--s-text)]",
};

const sizeStyles: Record<MonoLabelSize, string> = {
  xs: "text-[10px] tracking-[0.2em]",
  sm: "text-[11px] tracking-[0.15em]",
  md: "text-[12px] tracking-[0.12em]",
};

/**
 * The instrument-label voice of the Sigil system.
 *
 * Mono-uppercase text used for section eyebrows, filter labels,
 * cart headers, announcement bars, badges, empty states,
 * and navigation breadcrumbs.
 *
 * ```tsx
 * <MonoLabel>Infrastructure</MonoLabel>
 * <MonoLabel variant="accent">FAQ</MonoLabel>
 * <MonoLabel size="sm">Ships Immediately</MonoLabel>
 * ```
 */
export const MonoLabel = forwardRef<HTMLSpanElement, MonoLabelProps>(
  function MonoLabel(
    { variant = "muted", size = "xs", as: Tag = "span", className, ...rest },
    ref,
  ) {
    return (
      <Tag
        ref={ref as any}
        data-slot="mono-label"
        className={cn(
          "font-[family-name:var(--s-font-mono)] font-semibold uppercase leading-none",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...rest}
      />
    );
  },
);
