"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  /** Divider orientation. @default "horizontal" */
  orientation?: "horizontal" | "vertical";
  /** If true, this is purely decorative (aria-hidden). @default true */
  decorative?: boolean;
}

/** Structural divider line — horizontal or vertical. */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(function Divider(
  { orientation = "horizontal", decorative = true, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="divider"
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      aria-hidden={decorative ? true : undefined}
      className={cn(
        "shrink-0 bg-[var(--s-border)]",
        orientation === "horizontal" ? "h-px w-full" : "w-px h-full",
        className,
      )}
      {...rest}
    />
  );
});
