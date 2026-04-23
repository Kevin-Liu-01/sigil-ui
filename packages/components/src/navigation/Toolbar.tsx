"use client";

import { forwardRef, type ButtonHTMLAttributes, type HTMLAttributes } from "react";
import { cn } from "../utils";

export interface ToolbarProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

export const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(function Toolbar(
  { orientation = "horizontal", className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="toolbar"
      role="toolbar"
      aria-orientation={orientation}
      className={cn(
        "flex items-center gap-1 rounded-[var(--s-radius-md,6px)] border border-[var(--s-border)]",
        "bg-[var(--s-surface)] p-1",
        orientation === "vertical" && "flex-col",
        className,
      )}
      {...rest}
    />
  );
});

export const ToolbarButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  function ToolbarButton({ className, ...rest }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "inline-flex h-8 items-center justify-center rounded-[var(--s-radius-sm,4px)] px-2.5",
          "text-sm font-medium text-[var(--s-text)]",
          "transition-colors duration-[var(--s-duration-fast,150ms)]",
          "hover:bg-[var(--s-surface-elevated)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-primary)]",
          "disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        {...rest}
      />
    );
  },
);

export const ToolbarSeparator = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function ToolbarSeparator({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        role="separator"
        className={cn("mx-0.5 h-5 w-px shrink-0 bg-[var(--s-border)]", className)}
        {...rest}
      />
    );
  },
);

export interface ToolbarToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
}

export const ToolbarToggle = forwardRef<HTMLButtonElement, ToolbarToggleProps>(
  function ToolbarToggle({ pressed, onPressedChange, className, onClick, ...rest }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={pressed}
        onClick={(e) => {
          onPressedChange?.(!pressed);
          onClick?.(e);
        }}
        className={cn(
          "inline-flex h-8 items-center justify-center rounded-[var(--s-radius-sm,4px)] px-2.5",
          "text-sm font-medium text-[var(--s-text-muted)]",
          "transition-colors duration-[var(--s-duration-fast,150ms)]",
          "hover:bg-[var(--s-surface-elevated)] hover:text-[var(--s-text)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-primary)]",
          "disabled:pointer-events-none disabled:opacity-50",
          pressed && "bg-[var(--s-surface-elevated)] text-[var(--s-text)]",
          className,
        )}
        {...rest}
      />
    );
  },
);
