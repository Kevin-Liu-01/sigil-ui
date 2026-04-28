"use client";

import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "../utils";

export interface NativeSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string | boolean;
}

export const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  function NativeSelect({ className, error, children, ...props }, ref) {
    const hasError = Boolean(error);

    return (
      <div className="relative w-full">
        <select
          ref={ref}
          data-slot="native-select"
          aria-invalid={hasError || undefined}
          className={cn(
            "flex h-[var(--s-input-height,36px)] w-full appearance-none items-center justify-between",
            "rounded-[var(--s-radius-input,var(--s-radius-md,6px))]",
            "border border-[style:var(--s-border-style,solid)] bg-[var(--s-background)]",
            "px-3 py-1 pr-8",
            "transition-all duration-[var(--s-duration-fast,150ms)]",
            "focus:outline-none focus:ring-[length:var(--s-input-focus-ring-width)]",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--s-surface)] disabled:text-[var(--s-text-muted)]",
            "cursor-pointer",
            hasError
              ? "border-[var(--s-error)] focus:border-[var(--s-error)] focus:ring-[var(--s-error)]/20"
              : "border-[var(--s-border)] focus:border-[var(--s-input-focus-ring-color)] focus:ring-[var(--s-input-focus-ring-color)]/20",
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--s-text-muted)] opacity-50"
          aria-hidden
        >
          <path d="M4 5.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {typeof error === "string" && error && (
          <p className="mt-1 text-xs text-[var(--s-error)]" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);
