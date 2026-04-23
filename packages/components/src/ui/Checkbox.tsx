"use client";

import {
  forwardRef,
  useCallback,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../utils";
import { useSigilSound } from "../sound-context";

export interface CheckboxProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  /** Whether the checkbox is checked (controlled). */
  checked?: boolean;
  /** Default checked state (uncontrolled). */
  defaultChecked?: boolean;
  /** Set to `true` for the indeterminate (minus) visual. */
  indeterminate?: boolean;
  /** Callback fired when checked state changes. */
  onCheckedChange?: (checked: boolean) => void;
  /** Label text next to the checkbox. */
  label?: string;
  /** Form field name for hidden input. */
  name?: string;
  /** Form field value for hidden input. */
  value?: string;
  /** Whether the checkbox is required for form validation. */
  required?: boolean;
  children?: ReactNode;
}

function CheckIcon() {
  return (
    <svg
      data-icon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg
      data-icon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  function Checkbox(
    {
      checked: controlledChecked,
      defaultChecked = false,
      indeterminate = false,
      onCheckedChange,
      label,
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
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isChecked = controlledChecked ?? internalChecked;

    const dataState = indeterminate
      ? "indeterminate"
      : isChecked
        ? "checked"
        : "unchecked";

    const inputId =
      id ??
      (label
        ? `checkbox-${label.replace(/\s+/g, "-").toLowerCase()}`
        : undefined);

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
          role="checkbox"
          id={inputId}
          data-slot="checkbox"
          aria-checked={indeterminate ? "mixed" : isChecked}
          data-state={dataState}
          disabled={disabled}
          onClick={toggle}
          className={cn(
            "peer inline-flex size-4 shrink-0 items-center justify-center rounded-[var(--s-radius-sm,0px)]",
            "border border-[var(--s-border)] bg-[var(--s-background)]",
            "transition-colors duration-[var(--s-duration-fast,150ms)]",
            "data-[state=checked]:bg-[var(--s-primary)] data-[state=checked]:text-white data-[state=checked]:border-[var(--s-primary)]",
            "data-[state=indeterminate]:bg-[var(--s-primary)] data-[state=indeterminate]:text-white data-[state=indeterminate]:border-[var(--s-primary)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-ring,var(--s-primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--s-ring-offset,var(--s-background))]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "cursor-pointer",
            "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([data-icon])]:size-4",
            className,
          )}
          {...rest}
        >
          {dataState === "checked" && <CheckIcon />}
          {dataState === "indeterminate" && <MinusIcon />}
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
            className="cursor-pointer select-none text-sm leading-none text-[var(--s-text)] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {children ?? label}
          </label>
        )}
      </div>
    );
  },
);
