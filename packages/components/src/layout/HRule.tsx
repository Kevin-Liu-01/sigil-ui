"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface HRuleProps extends HTMLAttributes<HTMLDivElement> {
  /** Optional label rendered in the center of the rule. */
  label?: ReactNode;
  /** Show cross marks at endpoints. */
  showCross?: boolean;
}

function CrossMark({ className }: { className?: string }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <line
        x1="0"
        y1="5"
        x2="10"
        y2="5"
        stroke="var(--s-border)"
        strokeWidth="var(--s-cross-stroke, 1)"
      />
      <line
        x1="5"
        y1="0"
        x2="5"
        y2="10"
        stroke="var(--s-border)"
        strokeWidth="var(--s-cross-stroke, 1)"
      />
    </svg>
  );
}

/** Horizontal rule with optional cross marks and inline label. */
export const HRule = forwardRef<HTMLDivElement, HRuleProps>(function HRule(
  { label, showCross = false, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="h-rule"
      role="none"
      aria-hidden
      className={cn("flex items-center gap-2 w-full", className)}
      {...rest}
    >
      {showCross && <CrossMark />}
      <div className="flex-1 h-px bg-[var(--s-border)]" />
      {label && (
        <span className="text-xs font-[family-name:var(--s-font-mono)] text-[var(--s-text-muted)] px-2 shrink-0">
          {label}
        </span>
      )}
      {label && <div className="flex-1 h-px bg-[var(--s-border)]" />}
      {showCross && <CrossMark />}
    </div>
  );
});
