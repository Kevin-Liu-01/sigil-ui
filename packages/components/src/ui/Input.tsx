"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Error message — puts the input in error state when truthy. */
  error?: string | boolean;
  /** Icon or element to display on the left. */
  iconLeft?: ReactNode;
  /** Icon or element to display on the right. */
  iconRight?: ReactNode;
}

/** Styled text input with error state and icon slots. */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { error, iconLeft, iconRight, className, ...rest },
  ref,
) {
  const hasError = Boolean(error);

  return (
    <div className="relative w-full">
      {iconLeft && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--s-text-muted)] pointer-events-none">
          {iconLeft}
        </span>
      )}
      <input
        ref={ref}
        aria-invalid={hasError || undefined}
        className={cn(
          "flex h-10 w-full rounded-[var(--s-radius-md,6px)] border px-3 py-2 text-sm",
          "bg-[var(--s-background)] text-[var(--s-text)]",
          "placeholder:text-[var(--s-text-muted)]",
          "transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-primary)] focus-visible:ring-offset-1",
          "disabled:cursor-not-allowed disabled:opacity-50",
          hasError
            ? "border-[var(--s-error)] focus-visible:ring-[var(--s-error)]"
            : "border-[var(--s-border)]",
          iconLeft && "pl-10",
          iconRight && "pr-10",
          className,
        )}
        {...rest}
      />
      {iconRight && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--s-text-muted)]">
          {iconRight}
        </span>
      )}
      {typeof error === "string" && error && (
        <p className="mt-1 text-xs text-[var(--s-error)]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});
