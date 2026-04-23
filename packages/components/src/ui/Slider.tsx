"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "../utils";

export interface SliderProps
  extends ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  className?: string;
}

export const Slider = forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  SliderProps
>(function Slider({ className, ...props }, ref) {
  return (
    <SliderPrimitive.Root
      ref={ref}
      data-slot="slider"
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="relative h-1.5 w-full grow overflow-hidden rounded-[var(--s-radius-sm,0px)] bg-[var(--s-surface)]"
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="absolute h-full bg-[var(--s-primary)]"
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        data-slot="slider-thumb"
        className={cn(
          "block size-4 border-2 border-[style:var(--s-border-style,solid)] border-[var(--s-primary)] bg-[var(--s-background)] shadow-[var(--s-shadow-sm)]",
          "rounded-[var(--s-radius-full,9999px)]",
          "transition-colors duration-[var(--s-duration-fast,150ms)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-ring,var(--s-primary))] focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          "cursor-pointer",
        )}
      />
    </SliderPrimitive.Root>
  );
});
