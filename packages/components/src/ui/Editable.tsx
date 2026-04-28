"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
} from "react";
import { cn } from "../utils";

export interface EditableProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const Editable = forwardRef<HTMLDivElement, EditableProps>(function Editable(
  { value: controlledValue, defaultValue = "", onChange, placeholder = "Click to edit...", disabled, className, ...props },
  ref,
) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const text = controlledValue ?? internalValue;

  const commit = useCallback(
    (next: string) => {
      if (!controlledValue) setInternalValue(next);
      onChange?.(next);
      setEditing(false);
    },
    [controlledValue, onChange],
  );

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  return (
    <div ref={ref} data-slot="editable" className={cn("inline-flex", className)} {...props}>
      {editing ? (
        <input
          ref={inputRef}
          type="text"
          defaultValue={text}
          onBlur={(e) => commit(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") commit((e.target as HTMLInputElement).value);
            if (e.key === "Escape") setEditing(false);
          }}
          className={cn(
            "inline-flex min-w-[40px] bg-transparent text-[var(--s-text)]",
            "border-b-2 border-[var(--s-primary)]",
            "focus:outline-none",
            "text-inherit font-inherit",
          )}
        />
      ) : (
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setEditing(true)}
          className={cn(
            "inline-flex text-[var(--s-text)]",
            "border-b border-transparent",
            "hover:border-[var(--s-border)]",
            "transition-colors duration-[var(--s-duration-fast,150ms)]",
            "focus-visible:outline-none focus-visible:ring-[length:var(--s-focus-ring-width)] focus-visible:ring-[var(--s-focus-ring-color)]",
            "rounded-[var(--s-radius-sm,2px)]",
            !text && "text-[var(--s-text-muted)] italic",
            disabled && "cursor-default opacity-70",
          )}
        >
          {text || placeholder}
        </button>
      )}
    </div>
  );
});
