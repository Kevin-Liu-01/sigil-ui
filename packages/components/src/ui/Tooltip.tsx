"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "../utils";

export const TooltipProvider = TooltipPrimitive.Provider;

export interface TooltipProps extends ComponentPropsWithoutRef<typeof TooltipPrimitive.Root> {
  content: string;
  side?: "top" | "bottom" | "left" | "right";
  delayDuration?: number;
  children: React.ReactNode;
}

export const Tooltip = forwardRef<HTMLButtonElement, TooltipProps>(function Tooltip(
  { content, side = "top", delayDuration = 200, children, ...props },
  ref,
) {
  return (
    <TooltipPrimitive.Root delayDuration={delayDuration} {...props}>
      <TooltipPrimitive.Trigger ref={ref} asChild>
        {children}
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          sideOffset={4}
          data-slot="tooltip"
          className={cn(
            "z-50 overflow-hidden",
            "rounded-[var(--s-radius-sm,4px)]",
            "border border-[style:var(--s-border-style,solid)] border-[color:var(--s-border)] bg-[var(--s-surface)]",
            "px-3 py-1.5 text-xs text-[var(--s-text)]",
            "shadow-[var(--s-shadow-sm)]",
            "animate-in fade-in-0 zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
            "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          )}
        >
          {content}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
});
