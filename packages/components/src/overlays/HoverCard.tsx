"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { cn } from "../utils";

export const HoverCard = ({
  openDelay = 200,
  closeDelay = 100,
  ...rest
}: ComponentPropsWithoutRef<typeof HoverCardPrimitive.Root>) => (
  <HoverCardPrimitive.Root openDelay={openDelay} closeDelay={closeDelay} {...rest} />
);

export const HoverCardTrigger = HoverCardPrimitive.Trigger;

export const HoverCardContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(function HoverCardContent({ className, align = "center", sideOffset = 4, ...rest }, ref) {
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        ref={ref}
        data-slot="hover-card"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-80 p-4",
          "rounded-[var(--s-card-radius,8px)] border border-[color:var(--s-border)] border-[style:var(--s-border-style,solid)]",
          "bg-[var(--s-surface,oklch(0.97_0_0))] text-[var(--s-text)] shadow-[var(--s-shadow-md,0_4px_16px_oklch(0_0_0/0.12))]",
          "outline-none",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className,
        )}
        {...rest}
      />
    </HoverCardPrimitive.Portal>
  );
});
