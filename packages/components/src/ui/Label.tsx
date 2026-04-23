"use client";

import { forwardRef, type LabelHTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /** Show a required asterisk indicator. */
  required?: boolean;
  children?: ReactNode;
}

/** Form label with optional required indicator. */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { required, className, children, ...rest },
  ref,
) {
  return (
    <label
      ref={ref}
      data-slot="label"
      className={cn(
        "text-sm font-medium leading-none text-[var(--s-text)]",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...rest}
    >
      {children}
      {required && (
        <span className="text-[var(--s-error)] ml-0.5" aria-hidden>
          *
        </span>
      )}
    </label>
  );
});
