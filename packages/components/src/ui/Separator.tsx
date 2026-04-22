"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  /** Separator orientation. @default "horizontal" */
  orientation?: "horizontal" | "vertical";
  /** If decorative, hides from assistive technology. @default true */
  decorative?: boolean;
}

/** Visual separator — horizontal or vertical hairline. */
export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(function Separator(
  { orientation = "horizontal", decorative = true, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      aria-hidden={decorative || undefined}
      className={cn(
        "shrink-0 bg-[var(--s-border)]",
        orientation === "horizontal" ? "h-px w-full" : "w-px h-full self-stretch",
        className,
      )}
      {...rest}
    />
  );
});
