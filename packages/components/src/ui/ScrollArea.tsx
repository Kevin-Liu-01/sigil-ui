"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  /** Max height before scrolling activates. */
  maxHeight?: string | number;
  children?: ReactNode;
}

/** Custom scrollbar styling wrapper. */
export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(function ScrollArea(
  { maxHeight, className, style, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="scroll-area"
      className={cn(
        "overflow-auto",
        "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2",
        "[&::-webkit-scrollbar-track]:bg-transparent",
        "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--s-border)]",
        "[&::-webkit-scrollbar-thumb]:hover:bg-[var(--s-border-strong)]",
        "scrollbar-thin scrollbar-thumb-[var(--s-border)] scrollbar-track-transparent",
        className,
      )}
      style={{
        maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
});
