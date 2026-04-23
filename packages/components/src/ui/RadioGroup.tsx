"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "../utils";
import { useSigilSound } from "../sound-context";

export interface RadioGroupProps extends ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {}
export interface RadioGroupItemProps extends ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {}

/** Vertical radio button group. */
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  function RadioGroup({ className, onValueChange, ...rest }, ref) {
    const { play } = useSigilSound();
    return (
      <RadioGroupPrimitive.Root
        ref={ref}
        data-slot="radio-group"
        className={cn("flex flex-col gap-2", className)}
        onValueChange={(value) => { play("tap"); onValueChange?.(value); }}
        {...rest}
      />
    );
  },
);

/** Individual radio item — 20px circular indicator with primary fill when checked. */
export const RadioGroupItem = forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  function RadioGroupItem({ className, ...rest }, ref) {
    return (
      <RadioGroupPrimitive.Item
        ref={ref}
        data-slot="radio-group-item"
        className={cn(
          "peer h-5 w-5 shrink-0 rounded-[var(--s-radius-full,9999px)] border border-[style:var(--s-border-style,solid)] border-[var(--s-border)]",
          "bg-transparent text-[var(--s-primary)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-primary)] focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[state=checked]:border-[var(--s-primary)]",
          className,
        )}
        {...rest}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden>
            <circle cx="5" cy="5" r="5" />
          </svg>
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
    );
  },
);
