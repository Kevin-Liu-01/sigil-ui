"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as ToolbarPrimitive from "@radix-ui/react-toolbar";
import { cn } from "../utils";

export interface ToolbarProps extends ComponentPropsWithoutRef<typeof ToolbarPrimitive.Root> {}

export const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(function Toolbar(
  { className, ...props },
  ref,
) {
  return (
    <ToolbarPrimitive.Root
      ref={ref}
      data-slot="toolbar"
      className={cn(
        "flex items-center gap-1 rounded-[var(--s-radius-md,6px)]",
        "border border-[var(--s-border)] bg-[var(--s-surface)] p-1",
        className,
      )}
      {...props}
    />
  );
});

export const ToolbarButton = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.Button>
>(function ToolbarButton({ className, ...props }, ref) {
  return (
    <ToolbarPrimitive.Button
      ref={ref}
      className={cn(
        "inline-flex h-8 items-center justify-center rounded-[var(--s-radius-sm,4px)] px-2.5",
        "text-sm font-medium text-[var(--s-text)]",
        "transition-colors duration-[var(--s-duration-fast,150ms)]",
        "hover:bg-[var(--s-surface-elevated)]",
        "focus-visible:outline-none focus-visible:ring-[length:var(--s-focus-ring-width)] focus-visible:ring-[var(--s-focus-ring-color)]",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
});

export const ToolbarSeparator = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.Separator>
>(function ToolbarSeparator({ className, ...props }, ref) {
  return (
    <ToolbarPrimitive.Separator
      ref={ref}
      className={cn("mx-0.5 h-5 w-px shrink-0 bg-[var(--s-border)]", className)}
      {...props}
    />
  );
});

export const ToolbarToggleGroup = ToolbarPrimitive.ToggleGroup;
export const ToolbarToggleItem = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToggleItem>
>(function ToolbarToggleItem({ className, ...props }, ref) {
  return (
    <ToolbarPrimitive.ToggleItem
      ref={ref}
      className={cn(
        "inline-flex h-8 items-center justify-center rounded-[var(--s-radius-sm,4px)] px-2.5",
        "text-sm font-medium text-[var(--s-text-muted)]",
        "transition-colors duration-[var(--s-duration-fast,150ms)]",
        "hover:bg-[var(--s-surface-elevated)] hover:text-[var(--s-text)]",
        "focus-visible:outline-none focus-visible:ring-[length:var(--s-focus-ring-width)] focus-visible:ring-[var(--s-focus-ring-color)]",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[state=on]:bg-[var(--s-surface-elevated)] data-[state=on]:text-[var(--s-text)]",
        className,
      )}
      {...props}
    />
  );
});

export const ToolbarLink = forwardRef<
  HTMLAnchorElement,
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.Link>
>(function ToolbarLink({ className, ...props }, ref) {
  return (
    <ToolbarPrimitive.Link
      ref={ref}
      className={cn(
        "inline-flex h-8 items-center justify-center px-2.5 text-sm text-[var(--s-text-muted)]",
        "hover:text-[var(--s-text)] transition-colors duration-[var(--s-duration-fast,150ms)]",
        className,
      )}
      {...props}
    />
  );
});
