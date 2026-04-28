"use client";

import { forwardRef, useCallback, useState, type InputHTMLAttributes } from "react";
import { cn } from "../utils";

export interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Whether to show a visibility toggle button. @default true */
  showToggle?: boolean;
}

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M3 3l10 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/** Password input with built-in visibility toggle. */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput({ showToggle = true, className, ...rest }, ref) {
    const [visible, setVisible] = useState(false);
    const toggle = useCallback(() => setVisible((v) => !v), []);

    return (
      <div className="relative" data-slot="password-input">
        <input
          ref={ref}
          type={visible ? "text" : "password"}
          className={cn(
            "flex w-full rounded-[var(--s-radius-md,6px)] border border-[style:var(--s-border-style,solid)] border-[var(--s-border)]",
            "bg-[var(--s-background)] px-3 py-2 text-sm text-[var(--s-text)]",
            "h-[var(--s-input-height,40px)]",
            "placeholder:text-[var(--s-text-muted)]",
            "focus-visible:outline-none focus-visible:ring-[length:var(--s-focus-ring-width)] focus-visible:ring-[var(--s-focus-ring-color)]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            showToggle && "pr-10",
            className,
          )}
          {...rest}
        />
        {showToggle && (
          <button
            type="button"
            onClick={toggle}
            tabIndex={-1}
            aria-label={visible ? "Hide password" : "Show password"}
            className={cn(
              "absolute right-0 top-0 flex h-full w-10 items-center justify-center",
              "text-[var(--s-text-muted)] hover:text-[var(--s-text)]",
              "transition-colors duration-[var(--s-duration-fast,150ms)]",
            )}
          >
            {visible ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>
    );
  },
);
