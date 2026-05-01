"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface SplitButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: ReactNode;
  icon?: ReactNode;
  onDropdownClick?: () => void;
  dropdownLabel?: string;
}

export const SplitButton = forwardRef<HTMLDivElement, SplitButtonProps>(
  function SplitButton(
    { children, icon, className, onClick, onDropdownClick, dropdownLabel = "More options", disabled, ...rest },
    ref,
  ) {
    return (
      <div
        ref={ref}
        data-slot="split-button"
        className={cn(
          "inline-flex items-stretch overflow-hidden",
          "rounded-[var(--s-radius-md,6px)] border border-[style:var(--s-border-style,solid)] border-[color:var(--s-border)]",
          "bg-[var(--s-surface)] text-sm",
          disabled && "opacity-50 pointer-events-none",
          className,
        )}
      >
        <button
          type="button"
          disabled={disabled}
          onClick={onClick}
          className={cn(
            "inline-flex items-center gap-1.5 px-3 h-8",
            "text-sm font-medium text-[var(--s-text)]",
            "transition-colors duration-[var(--s-duration-fast,150ms)]",
            "hover:bg-[var(--s-surface-elevated)]",
            "focus-visible:outline-none focus-visible:ring-[length:var(--s-focus-ring-width)] focus-visible:ring-[var(--s-focus-ring-color)]",
            "disabled:pointer-events-none disabled:opacity-50",
          )}
          {...rest}
        >
          {icon}
          {children}
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={onDropdownClick}
          aria-label={dropdownLabel}
          className={cn(
            "inline-flex items-center justify-center w-7 h-8 shrink-0",
            "border-l border-[color:var(--s-border)]",
            "text-[var(--s-text-muted)]",
            "transition-colors duration-[var(--s-duration-fast,150ms)]",
            "hover:bg-[var(--s-surface-elevated)] hover:text-[var(--s-text)]",
            "focus-visible:outline-none focus-visible:ring-[length:var(--s-focus-ring-width)] focus-visible:ring-[var(--s-focus-ring-color)]",
            "disabled:pointer-events-none disabled:opacity-50",
          )}
        >
          <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor" aria-hidden>
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </button>
      </div>
    );
  },
);
