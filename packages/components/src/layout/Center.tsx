"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export interface CenterProps extends HTMLAttributes<HTMLDivElement> {
  /** Use inline-flex instead of flex. */
  inline?: boolean;
}

export const Center = forwardRef<HTMLDivElement, CenterProps>(function Center(
  { inline = false, className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="center"
      className={cn(
        inline ? "inline-flex" : "flex",
        "items-center justify-center",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
