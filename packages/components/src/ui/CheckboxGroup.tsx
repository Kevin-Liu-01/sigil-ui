"use client";

import { forwardRef, useCallback, type HTMLAttributes } from "react";
import { cn } from "../utils";

export interface CheckboxGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string[];
  onValueChange?: (value: string[]) => void;
  disabled?: boolean;
}

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  function CheckboxGroup({ value = [], onValueChange, disabled, className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        role="group"
        data-slot="checkbox-group"
        className={cn("flex flex-col gap-2", className)}
        data-disabled={disabled || undefined}
        {...rest}
      >
        {typeof children === "function" ? children : children}
      </div>
    );
  },
);

export interface CheckboxGroupItemProps extends Omit<HTMLAttributes<HTMLLabelElement>, "onChange"> {
  value: string;
  groupValue?: string[];
  onGroupChange?: (value: string[]) => void;
  disabled?: boolean;
  label: string;
}

export const CheckboxGroupItem = forwardRef<HTMLLabelElement, CheckboxGroupItemProps>(
  function CheckboxGroupItem({ value, groupValue = [], onGroupChange, disabled, label, className, ...rest }, ref) {
    const checked = groupValue.includes(value);

    const toggle = useCallback(() => {
      if (disabled) return;
      const next = checked
        ? groupValue.filter((v) => v !== value)
        : [...groupValue, value];
      onGroupChange?.(next);
    }, [checked, disabled, groupValue, value, onGroupChange]);

    return (
      <label
        ref={ref}
        className={cn(
          "flex items-center gap-2 cursor-pointer select-none",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
        {...rest}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={toggle}
          disabled={disabled}
          className={cn(
            "h-4 w-4 shrink-0 rounded-[var(--s-radius-sm,3px)]",
            "border border-[style:var(--s-border-style,solid)] border-[color:var(--s-border)] accent-[var(--s-primary)]",
            "focus-visible:outline-none focus-visible:ring-[length:var(--s-focus-ring-width)] focus-visible:ring-[var(--s-focus-ring-color)] focus-visible:ring-offset-[var(--s-focus-ring-offset)]",
          )}
        />
        <span className="text-sm text-[var(--s-text)]">{label}</span>
      </label>
    );
  },
);
