"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../utils";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Label text next to the checkbox. */
  label?: string;
}

/** Styled checkbox with optional label. */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, className, id, ...rest },
  ref,
) {
  const inputId = id ?? (label ? `checkbox-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);

  return (
    <div className="flex items-center gap-2">
      <input
        ref={ref}
        type="checkbox"
        id={inputId}
        className={cn(
          "h-4 w-4 shrink-0 rounded-[var(--s-radius-sm,3px)]",
          "border border-[var(--s-border)]",
          "accent-[var(--s-primary)]",
          "cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-primary)] focus-visible:ring-offset-1",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...rest}
      />
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm text-[var(--s-text)] cursor-pointer select-none leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      )}
    </div>
  );
});
