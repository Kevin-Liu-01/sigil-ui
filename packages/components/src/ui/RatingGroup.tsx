"use client";

import { forwardRef, useState, type HTMLAttributes } from "react";
import { cn } from "../utils";
import { useSigilSound } from "../sound-context";

export interface RatingGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  max?: number;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeMap = { sm: "size-4", md: "size-5", lg: "size-6" } as const;

export const RatingGroup = forwardRef<HTMLDivElement, RatingGroupProps>(function RatingGroup(
  { value: controlledValue, defaultValue = 0, onChange, max = 5, disabled, size = "md", className, ...props },
  ref,
) {
  const { play } = useSigilSound();
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [hovered, setHovered] = useState(0);
  const rating = controlledValue ?? internalValue;

  const update = (next: number) => {
    if (disabled) return;
    play("tap");
    if (controlledValue === undefined) setInternalValue(next);
    onChange?.(next);
  };

  return (
    <div
      ref={ref}
      data-slot="rating-group"
      role="radiogroup"
      className={cn("inline-flex gap-0.5", disabled && "opacity-50 pointer-events-none", className)}
      onMouseLeave={() => setHovered(0)}
      {...props}
    >
      {Array.from({ length: max }, (_, i) => {
        const val = i + 1;
        const filled = hovered ? val <= hovered : val <= rating;
        return (
          <button
            key={val}
            type="button"
            role="radio"
            aria-checked={val === rating}
            aria-label={`${val} star${val !== 1 ? "s" : ""}`}
            disabled={disabled}
            onClick={() => update(val)}
            onMouseEnter={() => setHovered(val)}
            className={cn(
              "cursor-pointer transition-colors duration-[var(--s-duration-fast,150ms)]",
              "focus-visible:outline-none focus-visible:ring-[length:var(--s-focus-ring-width)] focus-visible:ring-[var(--s-focus-ring-color)] rounded-[var(--s-radius-sm,2px)]",
              filled ? "text-[var(--s-warning)]" : "text-[var(--s-border)]",
            )}
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className={sizeMap[size]} aria-hidden>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
});
