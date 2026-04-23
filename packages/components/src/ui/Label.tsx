"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "../utils";

export interface LabelProps extends ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  required?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { required, className, children, ...props },
  ref,
) {
  return (
    <LabelPrimitive.Root
      ref={ref}
      data-slot="label"
      className={cn(
        "text-sm font-medium leading-none text-[var(--s-text)]",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="text-[var(--s-error)] ml-0.5" aria-hidden>
          *
        </span>
      )}
    </LabelPrimitive.Root>
  );
});
