"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Tighter padding rhythm. */
  compact?: boolean;
  /** Flush corners + tighter rhythm for inset/detail layouts. */
  square?: boolean;
}

export interface PanelHeadProps extends HTMLAttributes<HTMLDivElement> {}

/** Bordered content container with token-driven surface and border. */
export const Panel = forwardRef<HTMLDivElement, PanelProps>(
  function Panel({ compact, square, className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="panel"
        className={cn(
          "grid border border-[style:var(--s-border-style,solid)] border-[var(--s-border)] bg-[var(--s-surface)]/92",
          square
            ? cn("rounded-[var(--s-radius-none)] gap-4", compact ? "p-4" : "p-5 sm:p-6")
            : cn(
                "gap-5 rounded-[var(--s-card-radius,8px)]",
                compact ? "p-5" : "p-6",
              ),
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

/** Flex header row for Panel — wraps items end-aligned with a gap. */
export const PanelHead = forwardRef<HTMLDivElement, PanelHeadProps>(
  function PanelHead({ className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="panel-head"
        className={cn(
          "flex flex-wrap items-end justify-between gap-3",
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
