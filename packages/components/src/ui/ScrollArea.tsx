"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "../utils";

export interface ScrollAreaProps extends ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  /** Orientation of the scrollbar. @default "vertical" */
  orientation?: "vertical" | "horizontal";
}

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  function ScrollArea({ className, children, orientation = "vertical", ...props }, ref) {
    return (
      <ScrollAreaPrimitive.Root
        ref={ref}
        data-slot="scroll-area"
        className={cn("relative overflow-hidden", className)}
        {...props}
      >
        <ScrollAreaPrimitive.Viewport className="size-full rounded-[inherit]">
          {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar orientation={orientation} />
        <ScrollAreaPrimitive.Corner />
      </ScrollAreaPrimitive.Root>
    );
  },
);

const ScrollBar = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Scrollbar>
>(function ScrollBar({ className, orientation = "vertical", ...props }, ref) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      ref={ref}
      orientation={orientation}
      className={cn(
        "flex touch-none select-none transition-colors duration-[var(--s-duration-fast,150ms)]",
        orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-px",
        orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-px",
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-[var(--s-border)]" />
    </ScrollAreaPrimitive.Scrollbar>
  );
});
