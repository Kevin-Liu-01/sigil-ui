"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export interface VisuallyHiddenProps extends HTMLAttributes<HTMLSpanElement> {}

/** Hides content visually while keeping it accessible to screen readers. */
export const VisuallyHidden = forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  function VisuallyHidden({ className, ...rest }, ref) {
    return (
      <span
        ref={ref}
        data-slot="visually-hidden"
        className={cn("sr-only", className)}
        {...rest}
      />
    );
  },
);
