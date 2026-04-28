"use client";

import { forwardRef, useEffect, useRef, useState, type ComponentProps } from "react";
import { DayPicker, getDefaultClassNames, type DayButton } from "react-day-picker";
import type { DropdownProps } from "react-day-picker";
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from "lucide-react";
import { Button } from "./Button";
import { cn } from "../utils";

export type CalendarProps = ComponentProps<typeof DayPicker> & {
  className?: string;
};

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(function Calendar(
  {
    className,
    classNames,
    showOutsideDays = true,
    fixedWeeks = true,
    captionLayout = "dropdown",
    startMonth,
    endMonth,
    components,
    ...rest
  },
  _ref,
) {
  const defaultClassNames = getDefaultClassNames();
  const defaultStart = startMonth ?? new Date(new Date().getFullYear() - 100, 0);
  const defaultEnd = endMonth ?? new Date(new Date().getFullYear() + 10, 11);

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      fixedWeeks={fixedWeeks}
      captionLayout={captionLayout}
      startMonth={defaultStart}
      endMonth={defaultEnd}
      className={cn(
        "group/calendar bg-[var(--s-background)] p-3 [--cell-size:2rem]",
        className,
      )}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn("relative flex flex-col gap-4 md:flex-row", defaultClassNames.months),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1 pointer-events-none",
          defaultClassNames.nav,
        ),
        button_previous: cn(
          "pointer-events-auto",
          "inline-flex size-[var(--cell-size)] items-center justify-center rounded-[var(--s-radius-sm,4px)] p-0",
          "text-[var(--s-text-muted)] transition-colors duration-[var(--s-duration-fast,150ms)]",
          "hover:bg-[var(--s-surface)] hover:text-[var(--s-text)]",
          "select-none aria-disabled:opacity-50",
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          "pointer-events-auto",
          "inline-flex size-[var(--cell-size)] items-center justify-center rounded-[var(--s-radius-sm,4px)] p-0",
          "text-[var(--s-text-muted)] transition-colors duration-[var(--s-duration-fast,150ms)]",
          "hover:bg-[var(--s-surface)] hover:text-[var(--s-text)]",
          "select-none aria-disabled:opacity-50",
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          "flex h-[var(--cell-size)] w-full items-center justify-center px-[var(--cell-size)]",
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          "flex h-[var(--cell-size)] w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn("relative", defaultClassNames.dropdown_root),
        dropdown: cn("absolute inset-0 opacity-0 pointer-events-none", defaultClassNames.dropdown),
        caption_label: cn(
          "font-medium text-[var(--s-text)] select-none",
          captionLayout === "label" ? "text-sm" : "flex h-8 items-center gap-1 rounded-[var(--s-radius-md,6px)] pr-1 pl-2 text-sm",
          defaultClassNames.caption_label,
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "flex-1 rounded-[var(--s-radius-sm,4px)] text-[0.8rem] font-normal text-[var(--s-text-muted)] select-none",
          defaultClassNames.weekday,
        ),
        week: cn("mt-2 flex w-full", defaultClassNames.week),
        week_number_header: cn("w-[var(--cell-size)] select-none", defaultClassNames.week_number_header),
        week_number: cn("text-[0.8rem] text-[var(--s-text-muted)] select-none", defaultClassNames.week_number),
        day: cn(
          "group/day relative aspect-square h-full w-full p-0 text-center select-none",
          "[&:first-child[data-selected=true]_button]:rounded-l-[var(--s-radius-sm,4px)]",
          "[&:last-child[data-selected=true]_button]:rounded-r-[var(--s-radius-sm,4px)]",
          defaultClassNames.day,
        ),
        range_start: cn("rounded-l-[var(--s-radius-sm,4px)] bg-[var(--s-surface)]", defaultClassNames.range_start),
        range_middle: cn("rounded-[var(--s-radius-none)]", defaultClassNames.range_middle),
        range_end: cn("rounded-r-[var(--s-radius-sm,4px)] bg-[var(--s-surface)]", defaultClassNames.range_end),
        today: cn(
          "rounded-[var(--s-radius-sm,4px)] bg-[var(--s-surface-elevated)] text-[var(--s-text)]",
          "data-[selected=true]:rounded-[var(--s-radius-none)]",
          defaultClassNames.today,
        ),
        outside: cn("text-[var(--s-text-muted)] opacity-40 aria-selected:text-[var(--s-text-muted)]", defaultClassNames.outside),
        disabled: cn("text-[var(--s-text-muted)] opacity-50", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className: rootCn, rootRef, ...rootProps }) => (
          <div data-slot="calendar" ref={rootRef} className={cn(rootCn)} {...rootProps} />
        ),
        Chevron: ({ className: chevronCn, orientation, ...chevronProps }) => {
          const Icon = orientation === "left"
            ? ChevronLeftIcon
            : orientation === "right"
              ? ChevronRightIcon
              : ChevronDownIcon;
          return <Icon className={cn("size-4", chevronCn)} {...chevronProps} />;
        },
        Dropdown: CalendarDropdown,
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...wnProps }) => (
          <td {...wnProps}>
            <div className="flex size-[var(--cell-size)] items-center justify-center text-center">
              {children}
            </div>
          </td>
        ),
        ...components,
      }}
      {...rest}
    />
  );
});

function CalendarDropdown({
  options,
  className: _className,
  components: _components,
  classNames: _classNames,
  value,
  onChange,
  disabled,
  ...rest
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const numericValue = Number(value);
  const selectedOption = options?.find((o) => o.value === numericValue);

  useEffect(() => {
    if (!open) return;

    const el = listRef.current?.querySelector("[data-active=true]");
    el?.scrollIntoView({ block: "nearest" });

    const onPointerDown = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const handleSelect = (optionValue: number) => {
    const syntheticEvent = {
      target: { value: String(optionValue) },
    } as React.ChangeEvent<HTMLSelectElement>;
    onChange?.(syntheticEvent);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        disabled={disabled}
        aria-label={rest["aria-label"]}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex h-8 items-center gap-1 rounded-[var(--s-radius-md,6px)] px-2 text-sm font-medium",
          "text-[var(--s-text)] bg-transparent",
          "border border-transparent",
          "transition-colors duration-[var(--s-duration-fast,150ms)]",
          "hover:bg-[var(--s-surface)] hover:border-[var(--s-border)]",
          "focus-visible:outline-none focus-visible:ring-[length:var(--s-focus-ring-width)] focus-visible:ring-[var(--s-focus-ring-color)]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "cursor-pointer select-none",
        )}
      >
        {selectedOption?.label}
        <ChevronDownIcon className={cn(
          "size-3.5 text-[var(--s-text-muted)] transition-transform duration-[var(--s-duration-fast,150ms)]",
          open && "rotate-180",
        )} />
      </button>
      {open && (
        <div
          className={cn(
            "absolute left-1/2 top-[calc(100%+4px)] z-50 -translate-x-1/2",
            "min-w-[8rem] overflow-hidden p-1",
            "rounded-[var(--s-card-radius,var(--s-radius-md,8px))]",
            "border border-[var(--s-border)] border-[style:var(--s-border-style,solid)]",
            "bg-[var(--s-surface)] text-[var(--s-text)] shadow-[var(--s-shadow-lg)]",
            "animate-in fade-in-0 zoom-in-95 slide-in-from-top-2",
          )}
        >
          <div
            ref={listRef}
            role="listbox"
            className="max-h-[280px] overflow-y-auto"
          >
            {options?.map(({ value: optValue, label, disabled: optDisabled }) => (
              <button
                key={optValue}
                type="button"
                role="option"
                disabled={optDisabled}
                aria-selected={optValue === numericValue}
                data-active={optValue === numericValue}
                onClick={() => handleSelect(optValue)}
                className={cn(
                  "relative flex h-8 w-full cursor-default select-none items-center",
                  "rounded-[var(--s-radius-sm,4px)] pl-8 pr-3 text-sm outline-none",
                  "text-[var(--s-text)] transition-colors duration-[var(--s-duration-fast,100ms)]",
                  "hover:bg-[var(--s-background)] focus-visible:bg-[var(--s-background)]",
                  "disabled:pointer-events-none disabled:opacity-50",
                  optValue === numericValue && "font-medium",
                )}
              >
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                  {optValue === numericValue && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                      <path
                        d="M3 7l3 3 5-6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "flex aspect-square size-auto w-full min-w-[var(--cell-size)] flex-col gap-1 leading-none font-normal",
        "group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10",
        "group-data-[focused=true]/day:ring-[length:var(--s-focus-ring-width)] group-data-[focused=true]/day:ring-[var(--s-focus-ring-color)]",
        "data-[selected-single=true]:bg-[var(--s-primary)] data-[selected-single=true]:text-[var(--s-primary-contrast)]",
        "data-[range-start=true]:rounded-[var(--s-radius-sm,4px)] data-[range-start=true]:rounded-l-[var(--s-radius-sm,4px)] data-[range-start=true]:bg-[var(--s-primary)] data-[range-start=true]:text-[var(--s-primary-contrast)]",
        "data-[range-end=true]:rounded-[var(--s-radius-sm,4px)] data-[range-end=true]:rounded-r-[var(--s-radius-sm,4px)] data-[range-end=true]:bg-[var(--s-primary)] data-[range-end=true]:text-[var(--s-primary-contrast)]",
        "data-[range-middle=true]:rounded-[var(--s-radius-none)] data-[range-middle=true]:bg-[var(--s-surface)] data-[range-middle=true]:text-[var(--s-text)]",
        "[&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

export { CalendarDayButton };
