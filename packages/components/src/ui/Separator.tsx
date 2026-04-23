"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "../utils";

export interface SeparatorProps extends ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {}

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(function Separator(
  { className, orientation = "horizontal", decorative = true, ...props },
  ref,
) {
  return (
    <SeparatorPrimitive.Root
      ref={ref}
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-[var(--s-border)]",
        orientation === "horizontal" ? "h-px w-full" : "w-px h-full self-stretch",
        className,
      )}
      {...props}
    />
  );
});
