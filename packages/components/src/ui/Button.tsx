"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../utils";
import { useSigilSound } from "../sound-context";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant. @default "primary" */
  variant?: "primary" | "secondary" | "ghost" | "outline" | "destructive";
  /** Button size. @default "md" */
  size?: "sm" | "md" | "lg" | "icon";
  /** Render as child element (Radix Slot pattern for links). */
  asChild?: boolean;
  children?: ReactNode;
}

const variantStyles: Record<string, string> = {
  primary: [
    "bg-[var(--s-primary)] text-white",
    "hover:bg-[var(--s-primary-hover)]",
    "active:brightness-90",
    "shadow-sm",
  ].join(" "),
  secondary: [
    "bg-[var(--s-surface)] text-[var(--s-text)]",
    "border border-[var(--s-border)]",
    "hover:bg-[var(--s-surface-elevated)]",
  ].join(" "),
  ghost: [
    "bg-transparent text-[var(--s-text)]",
    "hover:bg-[var(--s-surface)]",
  ].join(" "),
  outline: [
    "bg-transparent text-[var(--s-text)]",
    "border border-[var(--s-border)]",
    "hover:bg-[var(--s-surface)]",
  ].join(" "),
  destructive: [
    "bg-[var(--s-error)] text-white",
    "hover:brightness-110",
    "active:brightness-90",
  ].join(" "),
};

const sizeStyles: Record<string, string> = {
  sm: "h-8 px-3 text-xs rounded-[var(--s-radius-sm,4px)]",
  md: "h-10 px-4 text-sm rounded-[var(--s-radius-md,6px)]",
  lg: "h-12 px-6 text-base rounded-[var(--s-radius-md,6px)]",
  icon: "h-10 w-10 rounded-[var(--s-radius-md,6px)] p-0 inline-flex items-center justify-center",
};

/** Multi-variant button with Radix Slot support for polymorphic rendering. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", asChild = false, className, children, onClick, ...rest },
  ref,
) {
  const { play } = useSigilSound();
  const Component = asChild ? Slot : "button";

  return (
    <Component
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium",
        "transition-all duration-150 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-primary)] focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:pointer-events-none",
        "select-none cursor-pointer",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      onClick={(e) => { play("tap"); onClick?.(e); }}
      {...rest}
    >
      {children}
    </Component>
  );
});
