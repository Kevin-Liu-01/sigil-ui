"use client";

import { forwardRef, createContext, useContext, useCallback, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

type SegmentedControlContextValue = {
  value: string;
  onValueChange: (value: string) => void;
};

const SegmentedControlContext = createContext<SegmentedControlContextValue | null>(null);

export interface SegmentedControlProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
}

export interface SegmentedControlItemProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
  children: ReactNode;
}

/** iOS-style segmented control for mutually exclusive options. */
export const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(
  function SegmentedControl({ value, onValueChange, className, children, ...rest }, ref) {
    return (
      <SegmentedControlContext.Provider value={{ value, onValueChange }}>
        <div
          ref={ref}
          role="radiogroup"
          data-slot="segmented-control"
          className={cn(
            "inline-flex items-center gap-1 p-1",
            "rounded-[var(--s-radius-md,6px)]",
            "bg-[var(--s-surface-sunken,var(--s-surface))]",
            "border border-[style:var(--s-border-style,solid)] border-[var(--s-border)]",
            className,
          )}
          {...rest}
        >
          {children}
        </div>
      </SegmentedControlContext.Provider>
    );
  },
);

export const SegmentedControlItem = forwardRef<HTMLButtonElement, SegmentedControlItemProps>(
  function SegmentedControlItem({ value, disabled, className, children, ...rest }, ref) {
    const ctx = useContext(SegmentedControlContext);
    if (!ctx) throw new Error("SegmentedControlItem must be used within SegmentedControl");

    const isActive = ctx.value === value;
    const handleClick = useCallback(() => {
      if (!disabled) ctx.onValueChange(value);
    }, [ctx, value, disabled]);

    return (
      <button
        ref={ref}
        type="button"
        role="radio"
        aria-checked={isActive}
        disabled={disabled}
        data-state={isActive ? "active" : "inactive"}
        onClick={handleClick}
        className={cn(
          "inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium",
          "rounded-[calc(var(--s-radius-md,6px)-2px)]",
          "transition-all duration-[var(--s-duration-fast,150ms)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-ring,var(--s-primary))]",
          "disabled:pointer-events-none disabled:opacity-50",
          isActive
            ? "bg-[var(--s-background)] text-[var(--s-text)] shadow-[var(--s-shadow-sm,0_1px_3px_rgba(0,0,0,0.1))]"
            : "bg-transparent text-[var(--s-text-muted)] hover:text-[var(--s-text)]",
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    );
  },
);
