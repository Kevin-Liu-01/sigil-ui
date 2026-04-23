"use client";

import {
  forwardRef,
  useCallback,
  useState,
  type HTMLAttributes,
} from "react";
import { cn } from "../utils";

export interface ColorPickerProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  defaultValue?: string;
  onChange?: (color: string) => void;
  swatches?: string[];
  disabled?: boolean;
}

const DEFAULT_SWATCHES = [
  "#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4",
  "#3b82f6", "#8b5cf6", "#ec4899", "#6b7280", "#000000",
];

export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(function ColorPicker(
  { value: controlledValue, defaultValue = "#3b82f6", onChange, swatches = DEFAULT_SWATCHES, disabled, className, ...props },
  ref,
) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const color = controlledValue ?? internalValue;

  const update = useCallback(
    (next: string) => {
      if (!controlledValue) setInternalValue(next);
      onChange?.(next);
    },
    [controlledValue, onChange],
  );

  return (
    <div
      ref={ref}
      data-slot="color-picker"
      className={cn("flex flex-col gap-3", disabled && "opacity-50 pointer-events-none", className)}
      {...props}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "size-10 shrink-0 rounded-[var(--s-radius-md,6px)]",
            "border border-[var(--s-border)] border-[style:var(--s-border-style,solid)]",
          )}
          style={{ backgroundColor: color }}
        />
        <input
          type="color"
          value={color}
          onChange={(e) => update(e.target.value)}
          disabled={disabled}
          className="size-0 opacity-0 absolute"
          id="sigil-color-input"
        />
        <input
          type="text"
          value={color}
          onChange={(e) => update(e.target.value)}
          disabled={disabled}
          data-slot="color-picker-input"
          className={cn(
            "h-[var(--s-input-height,36px)] w-28 px-3 text-sm font-mono",
            "rounded-[var(--s-radius-input,var(--s-radius-md,6px))]",
            "border border-[var(--s-border)] border-[style:var(--s-border-style,solid)]",
            "bg-[var(--s-background)] text-[var(--s-text)]",
            "focus:outline-none focus:ring-1 focus:ring-[var(--s-primary)]/20 focus:border-[var(--s-primary)]",
            "transition-all duration-[var(--s-duration-fast,150ms)]",
          )}
        />
      </div>

      {swatches.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {swatches.map((swatch) => (
            <button
              key={swatch}
              type="button"
              disabled={disabled}
              onClick={() => update(swatch)}
              className={cn(
                "size-6 rounded-[var(--s-radius-sm,3px)]",
                "border-2 transition-all duration-[var(--s-duration-fast,150ms)]",
                "hover:scale-110",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-primary)] focus-visible:ring-offset-2",
                color === swatch
                  ? "border-[var(--s-primary)] ring-1 ring-[var(--s-primary)]"
                  : "border-transparent",
              )}
              style={{ backgroundColor: swatch }}
              aria-label={swatch}
            />
          ))}
        </div>
      )}
    </div>
  );
});
