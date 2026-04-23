"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export interface KbdProps extends HTMLAttributes<HTMLElement> {}

export const Kbd = forwardRef<HTMLElement, KbdProps>(function Kbd(
  { className, ...props },
  ref,
) {
  return (
    <kbd
      ref={ref}
      data-slot="kbd"
      className={cn(
        "inline-flex h-5 items-center justify-center gap-1",
        "rounded-[var(--s-radius-sm,3px)]",
        "border border-[var(--s-border)] border-b-2 border-[style:var(--s-border-style,solid)]",
        "bg-[var(--s-surface)] px-1.5",
        "font-[family-name:var(--s-font-mono)] text-[10px] font-medium text-[var(--s-text-muted)]",
        "select-none",
        className,
      )}
      {...props}
    />
  );
});

export interface KbdGroupProps extends HTMLAttributes<HTMLDivElement> {}

export const KbdGroup = forwardRef<HTMLDivElement, KbdGroupProps>(function KbdGroup(
  { className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-0.5", className)}
      {...props}
    />
  );
});
