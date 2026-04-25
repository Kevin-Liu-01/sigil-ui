"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  function ButtonGroup({ orientation = "horizontal", className, ...props }, ref) {
    return (
      <div
        ref={ref}
        role="group"
        data-slot="button-group"
        data-orientation={orientation}
        className={cn(
          "inline-flex",
          orientation === "horizontal"
            ? [
                "flex-row",
                "[&>*]:rounded-[var(--s-radius-none)] [&>*]:border-r-0",
                "[&>*:first-child]:rounded-l-[var(--s-radius-md,6px)]",
                "[&>*:last-child]:rounded-r-[var(--s-radius-md,6px)] [&>*:last-child]:border-r",
              ]
            : [
                "flex-col",
                "[&>*]:rounded-[var(--s-radius-none)] [&>*]:border-b-0",
                "[&>*:first-child]:rounded-t-[var(--s-radius-md,6px)]",
                "[&>*:last-child]:rounded-b-[var(--s-radius-md,6px)] [&>*:last-child]:border-b",
              ],
          className,
        )}
        {...props}
      />
    );
  },
);
