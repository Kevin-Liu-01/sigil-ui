"use client";

import { forwardRef, useCallback, type HTMLAttributes } from "react";
import { cn } from "../utils";

export interface NumberFieldProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

export const NumberField = forwardRef<HTMLDivElement, NumberFieldProps>(function NumberField(
  { value = 0, onValueChange, min = -Infinity, max = Infinity, step = 1, disabled, className, ...rest },
  ref,
) {
  const clamp = useCallback(
    (v: number) => Math.min(max, Math.max(min, v)),
    [min, max],
  );

  const decrement = () => onValueChange?.(clamp(value - step));
  const increment = () => onValueChange?.(clamp(value + step));

  const btnBase = cn(
    "inline-flex h-full w-10 cursor-pointer items-center justify-center shrink-0",
    "text-[var(--s-text-muted)] transition-colors duration-[var(--s-duration-fast,150ms)]",
    "hover:bg-[var(--s-surface-elevated)] hover:text-[var(--s-text)]",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  );

  return (
    <div
      ref={ref}
      data-slot="number-field"
      className={cn(
        "inline-flex h-[var(--s-input-height,36px)] items-center overflow-hidden",
        "rounded-[var(--s-radius-input,0px)] border border-[style:var(--s-border-style,solid)] border-[var(--s-border)]",
        "bg-[var(--s-background)] text-sm",
        "focus-within:ring-1 focus-within:ring-[var(--s-primary)]/20 focus-within:border-[var(--s-primary)]",
        className,
      )}
      {...rest}
    >
      <button type="button" disabled={disabled || value <= min} onClick={decrement} className={cn(btnBase, "border-r border-[var(--s-border)]")} aria-label="Decrease">
        <svg width="14" height="2" viewBox="0 0 14 2" fill="currentColor" aria-hidden><rect width="14" height="2" rx="1" /></svg>
      </button>
      <span className="min-w-[3rem] px-2 text-center tabular-nums font-medium text-[var(--s-text)] select-none">
        {value}
      </span>
      <button type="button" disabled={disabled || value >= max} onClick={increment} className={cn(btnBase, "border-l border-[var(--s-border)]")} aria-label="Increase">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden>
          <rect y="6" width="14" height="2" rx="1" />
          <rect x="6" width="2" height="14" rx="1" />
        </svg>
      </button>
    </div>
  );
});
