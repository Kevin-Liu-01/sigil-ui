"use client";

import {
  forwardRef,
  useCallback,
  useRef,
  useState,
  useEffect,
  type HTMLAttributes,
  type PointerEvent as ReactPointerEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { cn } from "../utils";
import { useSigilSound } from "../sound-context";

export interface SliderProps extends HTMLAttributes<HTMLDivElement> {
  /** Current value. */
  value?: number;
  /** Default uncontrolled value. @default 0 */
  defaultValue?: number;
  /** Minimum value. @default 0 */
  min?: number;
  /** Maximum value. @default 100 */
  max?: number;
  /** Step increment. @default 1 */
  step?: number;
  disabled?: boolean;
  /** Controlled change handler. */
  onValueChange?: (value: number) => void;
  name?: string;
}

function clamp(val: number, min: number, max: number) {
  return Math.min(max, Math.max(min, val));
}

function snapToStep(val: number, min: number, step: number) {
  return Math.round((val - min) / step) * step + min;
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(function Slider(
  {
    value: controlledValue,
    defaultValue = 0,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    onValueChange,
    name,
    className,
    ...rest
  },
  ref,
) {
  const { play } = useSigilSound();
  const trackRef = useRef<HTMLDivElement>(null);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const current = isControlled ? controlledValue : internalValue;

  const pct = ((clamp(current, min, max) - min) / (max - min)) * 100;

  const setValue = useCallback(
    (next: number) => {
      const clamped = clamp(snapToStep(next, min, step), min, max);
      if (!isControlled) setInternalValue(clamped);
      onValueChange?.(clamped);
    },
    [isControlled, min, max, step, onValueChange],
  );

  const getValueFromPointer = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return current;
      const rect = track.getBoundingClientRect();
      const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
      return min + ratio * (max - min);
    },
    [min, max, current],
  );

  const onPointerDown = useCallback(
    (e: ReactPointerEvent) => {
      if (disabled) return;
      e.preventDefault();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      play("slide");
      setValue(getValueFromPointer(e.clientX));
    },
    [disabled, play, setValue, getValueFromPointer],
  );

  const onPointerMove = useCallback(
    (e: ReactPointerEvent) => {
      if (disabled || !((e.target as HTMLElement).hasPointerCapture?.(e.pointerId))) return;
      setValue(getValueFromPointer(e.clientX));
    },
    [disabled, setValue, getValueFromPointer],
  );

  const onKeyDown = useCallback(
    (e: ReactKeyboardEvent) => {
      if (disabled) return;
      let next = current;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          next = current + step;
          break;
        case "ArrowLeft":
        case "ArrowDown":
          next = current - step;
          break;
        case "Home":
          next = min;
          break;
        case "End":
          next = max;
          break;
        default:
          return;
      }
      e.preventDefault();
      setValue(next);
    },
    [disabled, current, step, min, max, setValue],
  );

  // Sync internal state when controlled value changes externally
  useEffect(() => {
    if (isControlled) setInternalValue(controlledValue);
  }, [isControlled, controlledValue]);

  return (
    <div
      ref={ref}
      data-slot="slider"
      data-disabled={disabled || undefined}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      {...rest}
    >
      {name && <input type="hidden" name={name} value={current} />}
      <div
        ref={trackRef}
        data-slot="slider-track"
        className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-[var(--s-surface)]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
      >
        <div
          data-slot="slider-range"
          className="absolute h-full bg-[var(--s-primary)]"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div
        role="slider"
        data-slot="slider-thumb"
        tabIndex={disabled ? -1 : 0}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={current}
        aria-disabled={disabled || undefined}
        className={cn(
          "absolute block size-4 rounded-full border-2 border-[var(--s-primary)] bg-[var(--s-background)] shadow-sm",
          "transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-ring,var(--s-primary))] focus-visible:ring-offset-2",
          "disabled:pointer-events-none",
        )}
        style={{ left: `calc(${pct}% - 0.5rem)` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onKeyDown={onKeyDown}
      />
    </div>
  );
});
