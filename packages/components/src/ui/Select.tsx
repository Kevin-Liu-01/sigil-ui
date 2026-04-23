"use client";

import { forwardRef, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../utils";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string | boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ className, error, children, ...props }, ref) {
    const hasError = Boolean(error);

    return (
      <div className="relative w-full">
        <select
          ref={ref}
          data-slot="select"
          aria-invalid={hasError || undefined}
          className={cn(
            "flex h-9 w-full appearance-none items-center justify-between",
            "rounded-[var(--s-radius-input,0px)]",
            "border bg-[var(--s-background)]",
            "px-3 py-1 pr-8 text-sm text-[var(--s-text)]",
            "transition-all duration-[var(--s-duration-fast,150ms)]",
            "focus:outline-none focus:ring-1",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--s-surface)] disabled:text-[var(--s-text-muted)]",
            "cursor-pointer",
            hasError
              ? "border-[var(--s-error)] focus:border-[var(--s-error)] focus:ring-[var(--s-error)]/20"
              : "border-[var(--s-border)] focus:border-[var(--s-primary)] focus:ring-[var(--s-primary)]/20",
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-[var(--s-text-muted)] opacity-50" />
        {typeof error === "string" && error && (
          <p className="mt-1 text-xs text-[var(--s-error)]" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);
