"use client";

import { forwardRef, useId, type ComponentPropsWithoutRef, type ReactNode } from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "../utils";
import { useSigilSound } from "../sound-context";

const sizeMap = {
  sm: {
    track: "h-4 w-7",
    thumb: "size-3 data-[state=checked]:translate-x-3",
  },
  md: {
    track: "h-5 w-9",
    thumb: "size-4 data-[state=checked]:translate-x-4",
  },
  lg: {
    track: "h-6 w-11",
    thumb: "size-5 data-[state=checked]:translate-x-5",
  },
} as const;

export interface SwitchProps
  extends ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  size?: "sm" | "md" | "lg";
  label?: string;
  /** Content rendered inside the thumb (e.g. an icon). */
  thumbIcon?: ReactNode;
  /** Additional classes applied to the thumb element. */
  thumbClassName?: string;
}

export const Switch = forwardRef<
  React.ComponentRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(function Switch({ className, size = "md", label, id: idProp, onCheckedChange, thumbIcon, thumbClassName, ...props }, ref) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const s = sizeMap[size];
  const { play } = useSigilSound();

  const toggle = (
    <SwitchPrimitive.Root
      ref={ref}
      id={id}
      data-slot="switch"
      onCheckedChange={(checked) => { play("toggle"); onCheckedChange?.(checked); }}
      className={cn(
        "peer inline-flex shrink-0 cursor-pointer items-center rounded-[var(--s-radius-full,9999px)]",
        "border-2 border-transparent",
        "bg-[var(--s-border)] data-[state=checked]:bg-[var(--s-primary)]",
        "transition-colors duration-[var(--s-duration-fast,150ms)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-ring,var(--s-primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--s-ring-offset,var(--s-background))]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        s.track,
        !label && className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none rounded-[var(--s-radius-full,9999px)] bg-[var(--s-background)] shadow-[var(--s-shadow-sm)] ring-0",
          "transition-transform duration-[var(--s-duration-fast,150ms)]",
          "data-[state=unchecked]:translate-x-0",
          thumbIcon != null ? "relative flex items-center justify-center" : "block",
          s.thumb,
          thumbClassName,
        )}
      >
        {thumbIcon}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  );

  if (!label) return toggle;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {toggle}
      <label
        htmlFor={id}
        className="cursor-pointer text-sm leading-none text-[var(--s-text)] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
});
