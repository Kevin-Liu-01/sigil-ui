"use client";

import { forwardRef, useId, type ComponentPropsWithoutRef } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { cn } from "../utils";
import { useSigilSound } from "../sound-context";

export interface CheckboxProps
  extends ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string;
}

export const Checkbox = forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(function Checkbox({ className, checked, label, id: idProp, onCheckedChange, ...props }, ref) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const { play } = useSigilSound();

  const box = (
    <CheckboxPrimitive.Root
      ref={ref}
      id={id}
      data-slot="checkbox"
      checked={checked}
      onCheckedChange={(val) => { play("toggle"); onCheckedChange?.(val); }}
      className={cn(
        "peer size-4 shrink-0 border border-[style:var(--s-border-style,solid)] border-[var(--s-border)] bg-[var(--s-background)]",
        "rounded-[var(--s-radius-sm,0px)]",
        "transition-colors duration-[var(--s-duration-fast,150ms)]",
        "data-[state=checked]:bg-[var(--s-primary)] data-[state=checked]:border-[var(--s-primary)] data-[state=checked]:text-[var(--s-primary-contrast)]",
        "data-[state=indeterminate]:bg-[var(--s-primary)] data-[state=indeterminate]:border-[var(--s-primary)] data-[state=indeterminate]:text-[var(--s-primary-contrast)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-ring,var(--s-primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--s-ring-offset,var(--s-background))]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "cursor-pointer",
        !label && className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        {checked === "indeterminate" ? (
          <Minus className="size-3" />
        ) : (
          <Check className="size-3" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );

  if (!label) return box;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {box}
      <label
        htmlFor={id}
        className="cursor-pointer text-sm leading-none text-[var(--s-text)] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
});
