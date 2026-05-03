"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "../utils";
import { useSigilSound } from "../sound-context";

/* ---------------------------------- Root ---------------------------------- */

export function Select({ onOpenChange, ...props }: ComponentPropsWithoutRef<typeof SelectPrimitive.Root>) {
  const { play } = useSigilSound();
  return (
    <SelectPrimitive.Root
      onOpenChange={(open) => { if (open) play("open"); onOpenChange?.(open); }}
      {...props}
    />
  );
}

export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;

/* -------------------------------- Trigger -------------------------------- */

export interface SelectTriggerProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  error?: string | boolean;
}

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  function SelectTrigger({ className, children, error, ...props }, ref) {
    const hasError = Boolean(error);

    return (
      <SelectPrimitive.Trigger
        ref={ref}
        data-slot="select"
        aria-invalid={hasError || undefined}
        className={cn(
          "flex h-[var(--s-input-height,36px)] w-full items-center justify-between gap-2",
          "rounded-[var(--s-radius-input,var(--s-radius-md,6px))]",
          "border border-[style:var(--s-border-style,solid)] bg-[var(--s-background)]",
          "px-3",
          "transition-all duration-[var(--s-duration-fast,150ms)]",
          "focus:outline-none focus:ring-[length:var(--s-input-focus-ring-width)]",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--s-surface)] disabled:text-[var(--s-text-muted)]",
          "cursor-pointer",
          "placeholder:text-[var(--s-text-muted)]",
          "[&>span]:truncate",
          hasError
            ? "border-[color:var(--s-error)] focus:border-[color:var(--s-error)] focus:ring-[var(--s-error)]/20"
            : "border-[color:var(--s-border)] focus:border-[color:var(--s-input-focus-ring-color)] focus:ring-[var(--s-input-focus-ring-color)]/20",
          className,
        )}
        {...props}
      >
        {children}
        <SelectPrimitive.Icon asChild>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="shrink-0 text-[var(--s-text-muted)] opacity-50"
            aria-hidden
          >
            <path
              d="M4 5.5l3 3 3-3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    );
  },
);

/* -------------------------------- Content -------------------------------- */

export const SelectContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(function SelectContent(
  { className, children, position = "popper", sideOffset = 4, ...props },
  ref,
) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        position={position}
        sideOffset={sideOffset}
        className={cn(
          "relative z-50 max-h-[min(var(--radix-select-content-available-height,384px),384px)] min-w-[8rem] overflow-hidden outline-none",
          "rounded-[var(--s-card-radius,var(--s-radius-md,8px))]",
          "border border-[color:var(--s-border)] border-[style:var(--s-border-style,solid)]",
          "bg-[var(--s-surface)] text-[var(--s-text)] shadow-[var(--s-shadow-lg)]",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className,
        )}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});

/* --------------------------------- Item ---------------------------------- */

export const SelectItem = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(function SelectItem({ className, children, ...props }, ref) {
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex h-8 w-full cursor-default select-none items-center rounded-[var(--s-radius-sm,4px)] pl-8 pr-2 text-sm outline-none",
        "text-[var(--s-text)] transition-colors duration-[var(--s-duration-fast,100ms)]",
        "focus:bg-[var(--s-background)] focus:text-[var(--s-text)]",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden
          >
            <path
              d="M3 7l3 3 5-6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
});

/* --------------------------------- Label --------------------------------- */

export const SelectLabel = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(function SelectLabel({ className, ...props }, ref) {
  return (
    <SelectPrimitive.Label
      ref={ref}
      className={cn(
        "px-2 py-1.5 text-xs font-medium text-[var(--s-text-muted)]",
        className,
      )}
      {...props}
    />
  );
});

/* ------------------------------- Separator ------------------------------- */

export const SelectSeparator = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(function SelectSeparator({ className, ...props }, ref) {
  return (
    <SelectPrimitive.Separator
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-[var(--s-border)]", className)}
      {...props}
    />
  );
});

/* ----------------------------- Scroll buttons ----------------------------- */

function SelectScrollUpButton({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      className={cn(
        "flex cursor-default items-center justify-center py-1 text-[var(--s-text-muted)]",
        className,
      )}
      {...props}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden
      >
        <path
          d="M10 8.5l-3-3-3 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      className={cn(
        "flex cursor-default items-center justify-center py-1 text-[var(--s-text-muted)]",
        className,
      )}
      {...props}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden
      >
        <path
          d="M4 5.5l3 3 3-3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SelectPrimitive.ScrollDownButton>
  );
}

/* -------------------------------- Legacy --------------------------------- */

export interface SelectProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.Root> {}
