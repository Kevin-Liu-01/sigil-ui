"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { cn } from "../utils";
import { useSigilSound } from "../sound-context";

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
}

export const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(function Combobox(
  {
    options,
    value,
    onValueChange,
    placeholder = "Select…",
    searchPlaceholder = "Search…",
    emptyText = "No results.",
    className,
  },
  ref,
) {
  const { play } = useSigilSound();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const setOpenWithSound = useCallback((nextOrFn: boolean | ((prev: boolean) => boolean)) => {
    setOpen((prev) => {
      const next = typeof nextOrFn === "function" ? nextOrFn(prev) : nextOrFn;
      if (next !== prev) play(next ? "open" : "close");
      return next;
    });
  }, [play]);

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(query.toLowerCase()),
  );
  const enabledIndexes = filtered.flatMap((option, index) => option.disabled ? [] : [index]);

  const selectedLabel = options.find((o) => o.value === value)?.label ?? "";

  const select = useCallback(
    (val: string) => {
      onValueChange?.(val);
      setOpenWithSound(false);
      setQuery("");
      setActiveIndex(-1);
    },
    [onValueChange, setOpenWithSound],
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => enabledIndexes[Math.min(enabledIndexes.indexOf(i) + 1, enabledIndexes.length - 1)] ?? -1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => enabledIndexes[Math.max(enabledIndexes.indexOf(i) - 1, 0)] ?? -1);
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      const item = filtered[activeIndex];
      if (item) select(item.value);
    } else if (e.key === "Escape") {
      setOpenWithSound(false);
      setQuery("");
    }
  };

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const root = (ref as React.RefObject<HTMLDivElement>)?.current ?? inputRef.current?.parentElement;
      if (root && !root.contains(e.target as Node)) {
        setOpenWithSound(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, ref]);

  useEffect(() => {
    if (open && listRef.current && activeIndex >= 0) {
      const item = listRef.current.children[activeIndex] as HTMLElement | undefined;
      item?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex, open]);

  return (
    <div ref={ref} data-slot="combobox" className={cn("relative w-full", className)}>
      <button
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => {
          setOpenWithSound((o) => !o);
          setTimeout(() => inputRef.current?.focus(), 0);
        }}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-[var(--s-radius-md,6px)] border border-[style:var(--s-border-style,solid)] px-3 py-2",
          "bg-[var(--s-background)] border-[var(--s-border)]",
          "transition-colors duration-[var(--s-duration-fast,150ms)]",
          "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-ring,var(--s-primary))]",
        )}
      >
        <span className={value ? "" : "text-[var(--s-text-muted)]"}>
          {selectedLabel || placeholder}
        </span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0 text-[var(--s-text-muted)]">
          <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className={cn(
          "absolute z-50 mt-1 w-full rounded-[var(--s-radius-md,6px)] border border-[style:var(--s-border-style,solid)] border-[var(--s-border)]",
          "bg-[var(--s-surface)] shadow-[var(--s-shadow-md)]",
        )}>
          <div className="p-2">
            <input
              ref={inputRef}
              type="text"
              role="searchbox"
              aria-label={searchPlaceholder}
              placeholder={searchPlaceholder}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIndex(-1);
              }}
              onKeyDown={handleKeyDown}
              className={cn(
                "flex h-8 w-full rounded-[var(--s-radius-sm,4px)] border border-[style:var(--s-border-style,solid)] border-[var(--s-border)] px-2 text-sm",
                "bg-[var(--s-background)] text-[var(--s-text)] placeholder:text-[var(--s-text-muted)]",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--s-ring,var(--s-primary))]",
              )}
            />
          </div>

          <ul ref={listRef} role="listbox" className="max-h-56 overflow-y-auto p-1">
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-sm text-[var(--s-text-muted)]">{emptyText}</li>
            ) : (
              filtered.map((option, i) => {
                const isActive = i === activeIndex;
                const isSelected = option.value === value;
                return (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={option.disabled || undefined}
                    data-active={isActive || undefined}
                    onClick={() => !option.disabled && select(option.value)}
                    onMouseEnter={() => !option.disabled && setActiveIndex(i)}
                    className={cn(
                      "flex cursor-pointer items-center justify-between rounded-[var(--s-radius-sm,4px)] px-3 py-2",
                      "transition-colors duration-[var(--s-duration-fast,150ms)]",
                      option.disabled && "cursor-not-allowed opacity-50",
                      isActive && "bg-[var(--s-primary)]/10 text-[var(--s-text)]",
                      !isActive && "text-[var(--s-text)] hover:bg-[var(--s-primary)]/5",
                    )}
                  >
                    <span>{option.label}</span>
                    {isSelected && (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                        <path d="M3 7l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
});
