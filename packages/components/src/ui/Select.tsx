"use client";

import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "../utils";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** Error message — puts the select in error state when truthy. */
  error?: string | boolean;
}

/** Styled native select wrapper. */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { error, className, children, ...rest },
  ref,
) {
  const hasError = Boolean(error);

  return (
    <div className="w-full">
      <select
        ref={ref}
        aria-invalid={hasError || undefined}
        className={cn(
          "flex h-10 w-full rounded-[var(--s-radius-md,6px)] border px-3 py-2 text-sm",
          "bg-[var(--s-background)] text-[var(--s-text)]",
          "appearance-none cursor-pointer",
          "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')]",
          "bg-[length:12px] bg-[right_12px_center] bg-no-repeat",
          "pr-10",
          "transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-primary)] focus-visible:ring-offset-1",
          "disabled:cursor-not-allowed disabled:opacity-50",
          hasError
            ? "border-[var(--s-error)] focus-visible:ring-[var(--s-error)]"
            : "border-[var(--s-border)]",
          className,
        )}
        {...rest}
      >
        {children}
      </select>
      {typeof error === "string" && error && (
        <p className="mt-1 text-xs text-[var(--s-error)]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});
