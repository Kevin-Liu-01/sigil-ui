"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../utils";
import { useSigilSound } from "../sound-context";

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Show the current value label. */
  showValue?: boolean;
}

/** Range slider input. */
export const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider(
  { showValue, className, onInput, ...rest },
  ref,
) {
  const { play } = useSigilSound();
  return (
    <div className="w-full">
      <input
        ref={ref}
        type="range"
        onInput={(e) => { play("slide"); onInput?.(e); }}
        className={cn(
          "w-full h-2 rounded-full appearance-none cursor-pointer",
          "bg-[var(--s-border)]",
          "accent-[var(--s-primary)]",
          "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4",
          "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--s-primary)]",
          "[&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:cursor-pointer",
          "[&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full",
          "[&::-moz-range-thumb]:bg-[var(--s-primary)] [&::-moz-range-thumb]:border-0",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-primary)]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className,
        )}
        {...rest}
      />
    </div>
  );
});
