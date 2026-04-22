"use client";

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../utils";

interface AccordionContextValue {
  openItems: Set<string>;
  toggle: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("Accordion compound components must be used within <Accordion>");
  return ctx;
}

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  /** Allow multiple items open at once. @default false */
  multiple?: boolean;
  /** Default open item value(s). */
  defaultValue?: string | string[];
  children?: ReactNode;
}

/** Expandable accordion container. */
export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  { multiple = false, defaultValue, className, children, ...rest },
  ref,
) {
  const [openItems, setOpenItems] = useState<Set<string>>(() => {
    if (!defaultValue) return new Set();
    return new Set(Array.isArray(defaultValue) ? defaultValue : [defaultValue]);
  });

  const toggle = useCallback(
    (value: string) => {
      setOpenItems((prev) => {
        const next = new Set(prev);
        if (next.has(value)) {
          next.delete(value);
        } else {
          if (!multiple) next.clear();
          next.add(value);
        }
        return next;
      });
    },
    [multiple],
  );

  return (
    <AccordionContext.Provider value={{ openItems, toggle }}>
      <div ref={ref} className={cn("w-full divide-y divide-[var(--s-border)]", className)} {...rest}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
});

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Unique value for this item. */
  value: string;
  children?: ReactNode;
}

/** Single accordion item wrapper. */
export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  function AccordionItem({ value, className, children, ...rest }, ref) {
    return (
      <div ref={ref} data-value={value} className={cn("py-0", className)} {...rest}>
        {children}
      </div>
    );
  },
);

export interface AccordionTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

/** Accordion item trigger button. Must be a child of AccordionItem. */
export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  function AccordionTrigger({ className, children, ...rest }, ref) {
    const { openItems, toggle } = useAccordionContext();
    const itemEl = useRef<HTMLElement | null>(null);

    const getValue = (el: HTMLElement | null): string => {
      const item = el?.closest("[data-value]") as HTMLElement | null;
      return item?.dataset.value ?? "";
    };

    const generatedId = useId();
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      itemEl.current = e.currentTarget;
      toggle(getValue(e.currentTarget));
    };

    return (
      <h3 className="flex">
        <button
          ref={ref}
          type="button"
          aria-expanded={openItems.has(getValue(itemEl.current))}
          id={generatedId}
          onClick={handleClick}
          className={cn(
            "flex flex-1 items-center justify-between py-4 text-sm font-medium",
            "transition-all duration-150 hover:underline",
            "text-[var(--s-text)]",
            "[&>svg]:transition-transform [&>svg]:duration-200",
            className,
          )}
          {...rest}
        >
          {children}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className={cn(
              "shrink-0 text-[var(--s-text-muted)]",
              "transition-transform duration-200",
            )}
            style={{
              transform: openItems.has(getValue(itemEl.current)) ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </h3>
    );
  },
);

export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/** Accordion item content panel with expand/collapse animation. Must be child of AccordionItem. */
export const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  function AccordionContent({ className, children, ...rest }, ref) {
    const { openItems } = useAccordionContext();
    const contentRef = useRef<HTMLDivElement>(null);

    const getValue = (): string => {
      const item = contentRef.current?.closest("[data-value]") as HTMLElement | null;
      return item?.dataset.value ?? "";
    };

    const isOpen = openItems.has(getValue());

    return (
      <div
        ref={(el) => {
          (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
          if (typeof ref === "function") ref(el);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
        }}
        role="region"
        className={cn(
          "overflow-hidden transition-all duration-200 ease-out",
          isOpen ? "grid grid-rows-[1fr] opacity-100" : "grid grid-rows-[0fr] opacity-0",
          className,
        )}
        {...rest}
      >
        <div className="overflow-hidden">
          <div className="pb-4 text-sm text-[var(--s-text-secondary)]">{children}</div>
        </div>
      </div>
    );
  },
);
