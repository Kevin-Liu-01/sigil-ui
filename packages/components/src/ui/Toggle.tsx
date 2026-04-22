"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cn } from "../utils";

export interface ToggleProps extends ComponentPropsWithoutRef<typeof TogglePrimitive.Root> {
  /** Visual variant. @default "default" */
  variant?: "default" | "outline";
  /** Toggle size. @default "md" */
  size?: "sm" | "md" | "lg";
}

const variantStyles: Record<string, string> = {
  default: "bg-transparent hover:bg-[var(--s-surface-elevated)] data-[state=on]:bg-[var(--s-surface)] data-[state=on]:border-[var(--s-border-strong)]",
  outline: "border border-[var(--s-border)] hover:bg-[var(--s-surface-elevated)] data-[state=on]:bg-[var(--s-surface)] data-[state=on]:border-[var(--s-border-strong)]",
};

const sizeStyles: Record<string, string> = {
  sm: "h-8 px-2 text-xs",
  md: "h-9 px-3 text-sm",
  lg: "h-10 px-4 text-sm",
};

/** Pressable toggle button with on/off state. */
export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
  { variant = "default", size = "md", className, ...rest },
  ref,
) {
  return (
    <TogglePrimitive.Root
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-[var(--s-radius-md,6px)]",
        "font-medium text-[var(--s-text-secondary)]",
        "transition-colors duration-[var(--s-duration-fast,150ms)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-primary)] focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[state=on]:text-[var(--s-text)]",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...rest}
    />
  );
});
