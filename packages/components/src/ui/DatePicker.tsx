"use client";

import { forwardRef, useState, type ButtonHTMLAttributes } from "react";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "./Calendar";
import { Button } from "./Button";
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
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          variant="outline"
          data-slot="date-picker"
          data-empty={!value}
          className={cn(
            "w-[240px] justify-between text-left font-normal",
            "data-[empty=true]:text-[var(--s-text-muted)]",
            className,
          )}
          {...rest}
        >
          {formatted ?? placeholder}
          <ChevronDownIcon className="size-4 text-[var(--s-text-muted)]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          defaultMonth={value}
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
