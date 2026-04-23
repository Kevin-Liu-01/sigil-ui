"use client";

import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "../utils";
import { useSigilSound } from "../sound-context";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** Error message — puts the select in error state when truthy. */
  error?: string | boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { error, className, children, onChange, ...rest },
  ref,
) {
  const { play } = useSigilSound();
  const hasError = Boolean(error);

  return (
    <div className="relative w-full">
      <select
        ref={ref}
        data-slot="select"
        aria-invalid={hasError || undefined}
        className={cn(
          "flex h-9 w-full items-center justify-between rounded-[var(--s-radius-input,0px)] border border-[var(--s-border)] bg-[var(--s-background)] px-3 py-1 text-sm",
          "text-[var(--s-text)]",
          "appearance-none cursor-pointer",
          "pr-10",
          "transition-all duration-[var(--s-duration-fast,150ms)]",
          "focus-visible:outline-none focus-visible:border-[var(--s-primary)] focus-visible:ring-1 focus-visible:ring-[var(--s-primary)]/20",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--s-surface)] disabled:text-[var(--s-text-muted)]",
          "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([data-icon])]:size-4",
          hasError
            ? "border-[var(--s-error)] focus-visible:ring-[var(--s-error)]"
            : "border-[var(--s-border)]",
          className,
        )}
        onChange={(e) => { play("tap"); onChange?.(e); }}
        {...rest}
      >
        {children}
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--s-text-muted)] opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        data-icon
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
      {typeof error === "string" && error && (
        <p className="mt-1 text-xs text-[var(--s-error)]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});
