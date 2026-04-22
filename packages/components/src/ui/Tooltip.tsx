"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface TooltipProps extends HTMLAttributes<HTMLSpanElement> {
  /** Tooltip text content. */
  content: string;
  /** Tooltip position. @default "top" */
  side?: "top" | "bottom" | "left" | "right";
  children: ReactNode;
}

const positionStyles: Record<string, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

/** CSS-only tooltip wrapper with configurable position. */
export const Tooltip = forwardRef<HTMLSpanElement, TooltipProps>(function Tooltip(
  { content, side = "top", className, children, ...rest },
  ref,
) {
  return (
    <span ref={ref} className={cn("relative inline-flex group", className)} {...rest}>
      {children}
      <span
        role="tooltip"
        className={cn(
          "absolute z-50 pointer-events-none whitespace-nowrap",
          "rounded-[var(--s-radius-sm,4px)] px-2 py-1 text-xs",
          "bg-[var(--s-text)] text-[var(--s-background)]",
          "opacity-0 scale-95 transition-all duration-150",
          "group-hover:opacity-100 group-hover:scale-100",
          "group-focus-within:opacity-100 group-focus-within:scale-100",
          positionStyles[side],
        )}
      >
        {content}
      </span>
    </span>
  );
});
