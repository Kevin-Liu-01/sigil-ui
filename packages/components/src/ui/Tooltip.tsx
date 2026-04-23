"use client";

import {
  forwardRef,
  useCallback,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../utils";

// ---------------------------------------------------------------------------
// Arrow positioning
// ---------------------------------------------------------------------------
const arrowMap = {
  top: "bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-t-[var(--s-border)] border-x-transparent border-b-transparent",
  bottom: "top-0 left-1/2 -translate-x-1/2 -translate-y-full border-b-[var(--s-border)] border-x-transparent border-t-transparent",
  left: "right-0 top-1/2 -translate-y-1/2 translate-x-full border-l-[var(--s-border)] border-y-transparent border-r-transparent",
  right: "left-0 top-1/2 -translate-y-1/2 -translate-x-full border-r-[var(--s-border)] border-y-transparent border-l-transparent",
} as const;

const arrowFillMap = {
  top: "bottom-px left-1/2 -translate-x-1/2 translate-y-full border-t-[var(--s-surface)] border-x-transparent border-b-transparent",
  bottom: "top-px left-1/2 -translate-x-1/2 -translate-y-full border-b-[var(--s-surface)] border-x-transparent border-t-transparent",
  left: "right-px top-1/2 -translate-y-1/2 translate-x-full border-l-[var(--s-surface)] border-y-transparent border-r-transparent",
  right: "left-px top-1/2 -translate-y-1/2 -translate-x-full border-r-[var(--s-surface)] border-y-transparent border-l-transparent",
} as const;

const positionMap = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
} as const;

const originMap = {
  top: "origin-bottom",
  bottom: "origin-top",
  left: "origin-right",
  right: "origin-left",
} as const;

// ---------------------------------------------------------------------------
// Tooltip
// ---------------------------------------------------------------------------
export interface TooltipProps extends HTMLAttributes<HTMLSpanElement> {
  /** Tooltip text content. */
  content: string;
  /** @default "top" */
  side?: "top" | "bottom" | "left" | "right";
  /** Delay in ms before the tooltip appears. @default 200 */
  delayDuration?: number;
  children: ReactNode;
}

export const Tooltip = forwardRef<HTMLSpanElement, TooltipProps>(function Tooltip(
  { content, side = "top", delayDuration = 200, className, children, ...rest },
  ref,
) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setOpen(true), delayDuration);
  }, [delayDuration]);

  const hide = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
    setOpen(false);
  }, []);

  return (
    <span
      ref={ref}
      className={cn("relative inline-flex", className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      {...rest}
    >
      {children}
      <span
        role="tooltip"
        data-slot="tooltip"
        data-state={open ? "open" : "closed"}
        data-side={side}
        className={cn(
          "absolute z-50 pointer-events-none whitespace-nowrap",
          "overflow-hidden rounded-[var(--s-radius-sm,2px)]",
          "border border-[var(--s-border)] bg-[var(--s-surface)] px-3 py-1.5 text-sm shadow-md",
          "text-[var(--s-text)]",
          "transition-all duration-150",
          originMap[side],
          open
            ? "animate-in fade-in-0 zoom-in-95"
            : "animate-out fade-out-0 zoom-out-95 invisible",
          positionMap[side],
        )}
      >
        {content}
        {/* Arrow border */}
        <span
          className={cn(
            "absolute size-0 border-[5px]",
            arrowMap[side],
          )}
        />
        {/* Arrow fill (covers border to create clean arrow) */}
        <span
          className={cn(
            "absolute size-0 border-[5px]",
            arrowFillMap[side],
          )}
        />
      </span>
    </span>
  );
});
