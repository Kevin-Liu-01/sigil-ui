"use client";

import { forwardRef, type ComponentProps } from "react";
import { DayPicker } from "react-day-picker";
import { cn } from "../utils";

export type CalendarProps = ComponentProps<typeof DayPicker> & {
  className?: string;
};

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(function Calendar(
  { className, classNames, showOutsideDays = true, ...rest },
  ref,
) {
  return (
    <div ref={ref} data-slot="calendar" className={cn("p-3", className)}>
      <DayPicker
        showOutsideDays={showOutsideDays}
        classNames={{
          months: "flex flex-col sm:flex-row gap-4",
          month: "flex flex-col gap-4",
          month_caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium text-[var(--s-text)]",
          nav: "flex items-center gap-1",
          button_previous: cn(
            "absolute left-1 inline-flex h-7 w-7 items-center justify-center rounded-[var(--s-radius-sm,4px)]",
            "text-[var(--s-text-muted)] transition-colors duration-[var(--s-duration-fast,150ms)]",
            "hover:bg-[var(--s-primary)]/10 hover:text-[var(--s-text)]",
          ),
          button_next: cn(
            "absolute right-1 inline-flex h-7 w-7 items-center justify-center rounded-[var(--s-radius-sm,4px)]",
            "text-[var(--s-text-muted)] transition-colors duration-[var(--s-duration-fast,150ms)]",
            "hover:bg-[var(--s-primary)]/10 hover:text-[var(--s-text)]",
          ),
          month_grid: "w-full border-collapse table-fixed",
          weekdays: "",
          weekday: "text-center text-[0.8rem] font-normal text-[var(--s-text-muted)] pb-1 w-9",
          week: "mt-0.5",
          day: cn(
            "relative h-9 w-9 text-center rounded-[var(--s-radius-sm,4px)] p-0 text-sm",
            "text-[var(--s-text)] transition-colors duration-[var(--s-duration-fast,150ms)]",
            "hover:bg-[var(--s-primary)]/10",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-ring,var(--s-primary))]",
            "aria-selected:opacity-100",
          ),
          day_button: cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-[var(--s-radius-sm,4px)]",
            "cursor-pointer bg-transparent p-0 text-sm font-normal",
          ),
          selected: cn(
            "bg-[var(--s-primary)] text-[var(--s-primary-foreground,white)]",
            "hover:bg-[var(--s-primary)] hover:text-[var(--s-primary-foreground,white)]",
            "focus:bg-[var(--s-primary)] focus:text-[var(--s-primary-foreground,white)]",
          ),
          today: "ring-1 ring-[var(--s-primary)]/40",
          outside: "text-[var(--s-text-muted)] opacity-50",
          disabled: "text-[var(--s-text-muted)] opacity-30 cursor-not-allowed",
          range_middle: "bg-[var(--s-primary)]/15 text-[var(--s-text)]",
          range_start: "rounded-l-[var(--s-radius-sm,4px)]",
          range_end: "rounded-r-[var(--s-radius-sm,4px)]",
          hidden: "invisible",
          ...classNames,
        }}
        {...rest}
      />
    </div>
  );
});
