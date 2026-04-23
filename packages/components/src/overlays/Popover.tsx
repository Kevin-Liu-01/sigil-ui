"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "../utils";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverAnchor = PopoverPrimitive.Anchor;

export type PopoverProps = ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>;
export type PopoverTriggerProps = ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>;

export interface PopoverContentProps
  extends ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {}

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  function PopoverContent(
    { className, align = "center", sideOffset = 4, ...props },
    ref,
  ) {
    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          ref={ref}
          data-slot="popover"
          align={align}
          sideOffset={sideOffset}
          className={cn(
            "z-50 w-72 p-4",
            "rounded-[var(--s-card-radius,8px)]",
            "border border-[var(--s-border)] border-[style:var(--s-border-style,solid)]",
            "bg-[var(--s-surface)] text-[var(--s-text)]",
            "shadow-[var(--s-shadow-md)]",
            "outline-none",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
            "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className,
          )}
          {...props}
        />
      </PopoverPrimitive.Portal>
    );
  },
);
