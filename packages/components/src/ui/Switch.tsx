"use client";

import {
  forwardRef,
  useCallback,
  useId,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../utils";
import { useSigilSound } from "../sound-context";

const sizeConfig = {
  sm: {
    track: "h-5 w-9",
    thumb: "size-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
  },
  md: {
    track: "h-6 w-11",
    thumb: "size-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
  },
  lg: {
    track: "h-7 w-[3.25rem]",
    thumb: "size-6 data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0",
  },
} as const;

export interface SwitchProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  /** Whether the switch is on (controlled). */
  checked?: boolean;
  /** Default checked state (uncontrolled). */
  defaultChecked?: boolean;
  /** Callback fired when checked state changes. */
  onCheckedChange?: (checked: boolean) => void;
  /** Label text next to the switch. */
  label?: string;
  /** Size variant. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Form field name for hidden input. */
  name?: string;
  /** Form field value for hidden input. */
  value?: string;
  /** Whether the switch is required for form validation. */
  required?: boolean;
  children?: ReactNode;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  function Switch(
    {
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      label,
      size = "md",
      name,
      value,
      required,
      disabled,
      className,
      id,
      children,
      ...rest
    },
    ref,
  ) {
    const { play } = useSigilSound();
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isChecked = controlledChecked ?? internalChecked;
    const dataState = isChecked ? "checked" : "unchecked";
    const { track, thumb } = sizeConfig[size];

    const toggle = useCallback(() => {
      if (disabled) return;
      play("toggle");
      const next = !isChecked;
      if (controlledChecked === undefined) setInternalChecked(next);
      onCheckedChange?.(next);
    }, [disabled, play, isChecked, controlledChecked, onCheckedChange]);

    return (
      <div className="flex items-center gap-2">
        <button
          ref={ref}
          type="button"
          role="switch"
          id={inputId}
          data-slot="switch"
          aria-checked={isChecked}
          data-state={dataState}
          disabled={disabled}
          onClick={toggle}
          className={cn(
            "peer inline-flex shrink-0 cursor-pointer items-center rounded-full",
            "border-2 border-transparent",
            "bg-[var(--s-border)]",
            "transition-colors duration-[var(--s-duration-fast,150ms)]",
            "data-[state=checked]:bg-[var(--s-primary)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-ring,var(--s-primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--s-ring-offset,var(--s-background))]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([data-icon])]:size-4",
            track,
            className,
          )}
          {...rest}
        >
          <span
            data-state={dataState}
            className={cn(
              "pointer-events-none block rounded-full bg-[var(--s-background)] shadow-sm ring-0",
              "transition-transform duration-[var(--s-duration-fast,150ms)]",
              thumb,
            )}
          />
        </button>

        {name && (
          <input
            type="hidden"
            name={name}
            value={isChecked ? (value ?? "on") : ""}
            disabled={disabled}
            required={required}
          />
        )}

        {(label || children) && (
          <label
            htmlFor={inputId}
            className="cursor-pointer select-none text-sm text-[var(--s-text)] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {children ?? label}
          </label>
        )}
      </div>
    );
  },
);
