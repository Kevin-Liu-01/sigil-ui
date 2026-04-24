"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export type TabularValueSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface TabularValueProps extends HTMLAttributes<HTMLSpanElement> {
  /** Size preset. @default "sm" */
  size?: TabularValueSize;
  /** Render as a different element. @default "span" */
  as?: "span" | "div" | "td" | "p" | "dd" | "time";
  /** Muted text color. @default false */
  muted?: boolean;
}

const sizeStyles: Record<TabularValueSize, string> = {
  xs: "text-[10px]",
  sm: "text-[0.875rem]",
  md: "text-[1rem]",
  lg: "text-[1.25rem]",
  xl: "text-[1.5rem]",
};

/**
 * Tabular-nums mono pattern for prices, metrics, dates, and quantities.
 *
 * Every number that compares to another number uses `font-mono tabular-nums`.
 * The mono + tabular combination makes columns of numbers align optically
 * and reads as "data, not prose."
 *
 * ```tsx
 * <TabularValue>{formatPrice(amount, currency)}</TabularValue>
 * <TabularValue size="lg">$2,400.00</TabularValue>
 * <TabularValue as="time" muted>2024-01-15</TabularValue>
 * ```
 */
export const TabularValue = forwardRef<HTMLSpanElement, TabularValueProps>(
  function TabularValue(
    { size = "sm", as: Tag = "span", muted = false, className, ...rest },
    ref,
  ) {
    return (
      <Tag
        ref={ref as any}
        data-slot="tabular-value"
        className={cn(
          "font-[family-name:var(--s-font-mono)] tabular-nums",
          muted ? "text-[var(--s-text-muted)]" : "text-[var(--s-text)]",
          sizeStyles[size],
          className,
        )}
        {...rest}
      />
    );
  },
);
