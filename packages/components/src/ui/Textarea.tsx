"use client";

import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "../utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Error message — puts the textarea in error state when truthy. */
  error?: string | boolean;
}

/** Multi-line text input with error state. */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { error, className, ...rest },
  ref,
) {
  const hasError = Boolean(error);

  return (
    <div className="w-full">
      <textarea
        ref={ref}
        aria-invalid={hasError || undefined}
        className={cn(
          "flex min-h-[80px] w-full rounded-[var(--s-radius-md,6px)] border px-3 py-2 text-sm",
          "bg-[var(--s-background)] text-[var(--s-text)]",
          "placeholder:text-[var(--s-text-muted)]",
          "transition-colors duration-150 resize-y",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-primary)] focus-visible:ring-offset-1",
          "disabled:cursor-not-allowed disabled:opacity-50",
          hasError
            ? "border-[var(--s-error)] focus-visible:ring-[var(--s-error)]"
            : "border-[var(--s-border)]",
          className,
        )}
        {...rest}
      />
      {typeof error === "string" && error && (
        <p className="mt-1 text-xs text-[var(--s-error)]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});
