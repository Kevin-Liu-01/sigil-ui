"use client";

import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cn } from "../utils";
import { useSigilSound } from "../sound-context";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Label text next to the switch. */
  label?: string;
}

/** Toggle switch built on a styled checkbox. */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, className, id, onChange, ...rest },
  ref,
) {
  const { play } = useSigilSound();
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor={inputId}
        className={cn(
          "relative inline-flex items-center h-6 w-11 shrink-0 cursor-pointer rounded-full",
          "border-2 border-transparent",
          "transition-colors duration-200",
          "bg-[var(--s-border)]",
          "has-[:checked]:bg-[var(--s-primary)]",
          "has-[:disabled]:opacity-50 has-[:disabled]:cursor-not-allowed",
          "focus-within:ring-2 focus-within:ring-[var(--s-primary)] focus-within:ring-offset-2",
          className,
        )}
      >
        <input ref={ref} type="checkbox" id={inputId} className="sr-only peer" onChange={(e) => { play("toggle"); onChange?.(e); }} {...rest} />
        <span
          className={cn(
            "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm",
            "transition-transform duration-200",
            "translate-x-0 peer-checked:translate-x-5",
          )}
        />
      </label>
      {label && (
        <label htmlFor={inputId} className="text-sm text-[var(--s-text)] cursor-pointer select-none">
          {label}
        </label>
      )}
    </div>
  );
});
