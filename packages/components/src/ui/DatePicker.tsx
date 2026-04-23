"use client";

import { forwardRef, useState, type ButtonHTMLAttributes } from "react";
import { Calendar } from "./Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../overlays/Popover";
import { cn } from "../utils";

export interface DatePickerProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  value?: Date;
  onValueChange?: (date: Date | undefined) => void;
  placeholder?: string;
}

export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(function DatePicker(
  { value, onValueChange, placeholder = "Pick a date", className, ...rest },
  ref,
) {
  const [open, setOpen] = useState(false);

  const formatted = value
    ? value.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        ref={ref}
        data-slot="date-picker"
        className={cn(
          "inline-flex h-10 w-[240px] cursor-pointer items-center justify-between px-3",
          "rounded-[var(--s-radius-md,6px)] border border-[style:var(--s-border-style,solid)] border-[var(--s-border)]",
          "bg-[var(--s-surface)] text-sm text-[var(--s-text)]",
          "transition-colors duration-[var(--s-duration-fast,150ms)]",
          "hover:border-[var(--s-border-strong)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-ring,var(--s-primary))]",
          !value && "text-[var(--s-text-muted)]",
          className,
        )}
        {...rest}
      >
        {formatted ?? placeholder}
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          className="shrink-0 text-[var(--s-text-muted)]"
        >
          <path
            d="M5.333 1.333v2M10.667 1.333v2M2 6h12M3.333 2.667h9.334c.736 0 1.333.597 1.333 1.333v9.333c0 .737-.597 1.334-1.333 1.334H3.333A1.333 1.333 0 0 1 2 13.333V4c0-.736.597-1.333 1.333-1.333Z"
            stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(day) => {
            onValueChange?.(day);
            setOpen(false);
          }}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
});
