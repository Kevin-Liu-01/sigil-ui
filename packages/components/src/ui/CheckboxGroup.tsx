"use client";

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { Checkbox } from "./Checkbox";
import { cn } from "../utils";

/* ───────────────────────────── Context ───────────────────────────── */

interface CheckboxGroupContextValue {
  value: string[];
  toggle: (value: string) => void;
  disabled: boolean;
  name?: string;
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null);

function useCheckboxGroup() {
  const ctx = useContext(CheckboxGroupContext);
  if (!ctx)
    throw new Error("<CheckboxGroupItem> must be used within a <CheckboxGroup>");
  return ctx;
}

/* ────────────────────────── Group container ──────────────────────── */

export interface CheckboxGroupItemConfig {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
}

export interface CheckboxGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** Controlled selected values. */
  value?: string[];
  /** Uncontrolled fallback. */
  defaultValue?: string[];
  /** Fires on every change with the next selection. */
  onValueChange?: (value: string[]) => void;
  /** When true every item is disabled. */
  disabled?: boolean;
  /** Optional `name` used for hidden form fields. */
  name?: string;
  /**
   * Optional shorthand. Pass an array of items and the group renders them
   * with sensible defaults instead of children.
   */
  items?: CheckboxGroupItemConfig[];
  /** Layout direction. */
  orientation?: "vertical" | "horizontal";
}

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  function CheckboxGroup(
    {
      value,
      defaultValue,
      onValueChange,
      disabled = false,
      name,
      items,
      orientation = "vertical",
      className,
      children,
      ...rest
    },
    ref,
  ) {
    // Lightweight controlled/uncontrolled handling without useState to keep
    // the API stateless when nothing is passed in.
    const internal = useMemo(() => value ?? defaultValue ?? [], [value, defaultValue]);

    const toggle = useCallback(
      (next: string) => {
        const current = value ?? internal;
        const updated = current.includes(next)
          ? current.filter((v) => v !== next)
          : [...current, next];
        onValueChange?.(updated);
      },
      [value, internal, onValueChange],
    );

    const ctx = useMemo<CheckboxGroupContextValue>(
      () => ({ value: value ?? internal, toggle, disabled, name }),
      [value, internal, toggle, disabled, name],
    );

    return (
      <CheckboxGroupContext.Provider value={ctx}>
        <div
          ref={ref}
          role="group"
          data-slot="checkbox-group"
          data-orientation={orientation}
          data-disabled={disabled || undefined}
          className={cn(
            "flex gap-3",
            orientation === "vertical" ? "flex-col" : "flex-row flex-wrap",
            className,
          )}
          {...rest}
        >
          {items?.map((item) => (
            <CheckboxGroupItem
              key={item.value}
              value={item.value}
              label={item.label}
              description={item.description}
              disabled={item.disabled}
            />
          ))}
          {children}
        </div>
      </CheckboxGroupContext.Provider>
    );
  },
);

/* ─────────────────────────── Group item ──────────────────────────── */

export interface CheckboxGroupItemProps
  extends Omit<HTMLAttributes<HTMLLabelElement>, "onChange"> {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
}

export const CheckboxGroupItem = forwardRef<HTMLLabelElement, CheckboxGroupItemProps>(
  function CheckboxGroupItem(
    { value, label, description, disabled: itemDisabled, className, ...rest },
    ref,
  ) {
    const { value: groupValue, toggle, disabled: groupDisabled, name } = useCheckboxGroup();
    const checked = groupValue.includes(value);
    const disabled = itemDisabled || groupDisabled;

    return (
      <label
        ref={ref}
        data-slot="checkbox-group-item"
        data-state={checked ? "checked" : "unchecked"}
        data-disabled={disabled || undefined}
        className={cn(
          "group flex items-start gap-3 cursor-pointer select-none",
          "text-[var(--s-text)] text-sm leading-snug",
          disabled && "cursor-not-allowed opacity-60",
          className,
        )}
        {...rest}
      >
        <Checkbox
          checked={checked}
          onCheckedChange={() => toggle(value)}
          disabled={disabled}
          name={name}
          value={value}
          className="mt-0.5"
        />
        <span className="flex flex-col gap-0.5">
          <span className="font-medium">{label}</span>
          {description ? (
            <span className="text-xs text-[var(--s-text-muted)] leading-relaxed">
              {description}
            </span>
          ) : null}
        </span>
      </label>
    );
  },
);
