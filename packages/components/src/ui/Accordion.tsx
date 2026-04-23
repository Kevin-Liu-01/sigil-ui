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
import { ChevronDown } from "lucide-react";
import { cn } from "../utils";
import { useSigilSound } from "../sound-context";

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Accordion (root)
// ---------------------------------------------------------------------------
export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  /** Allow multiple items open at once. @default false */
  multiple?: boolean;
  /** Radix-compatible: "single" | "multiple". Maps to `multiple`. */
  type?: "single" | "multiple";
  /** Radix-compatible: allow collapsing all. (Accepted but unused — always collapsible.) */
  collapsible?: boolean;
  /** Default open item value(s). */
  defaultValue?: string | string[];
  children?: ReactNode;
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  { multiple: multipleProp, type, collapsible: _collapsible, defaultValue, className, children, ...rest },
  ref,
) {
  const multiple = multipleProp ?? (type === "multiple");
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
      <div
        ref={ref}
        data-slot="accordion"
        className={cn("w-full", className)}
        {...rest}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
});

// ---------------------------------------------------------------------------
// AccordionItem
// ---------------------------------------------------------------------------
export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  children?: ReactNode;
}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  function AccordionItem({ value, className, children, ...rest }, ref) {
    const { openItems } = useAccordionContext();

    return (
      <div
        ref={ref}
        data-slot="accordion-item"
        data-value={value}
        data-state={openItems.has(value) ? "open" : "closed"}
        className={cn("border-b border-[var(--s-border)]", className)}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

// ---------------------------------------------------------------------------
// AccordionTrigger
// ---------------------------------------------------------------------------
export interface AccordionTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  function AccordionTrigger({ className, children, ...rest }, ref) {
    const { openItems, toggle } = useAccordionContext();
    const { play } = useSigilSound();
    const itemEl = useRef<HTMLElement | null>(null);
    const generatedId = useId();

    const getValue = (el: HTMLElement | null): string => {
      const item = el?.closest("[data-value]") as HTMLElement | null;
      return item?.dataset.value ?? "";
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      itemEl.current = e.currentTarget;
      play("expand");
      toggle(getValue(e.currentTarget));
    };

    const isOpen = openItems.has(getValue(itemEl.current));

    return (
      <h3 className="flex">
        <button
          ref={ref}
          type="button"
          data-slot="accordion-trigger"
          data-state={isOpen ? "open" : "closed"}
          aria-expanded={isOpen}
          id={generatedId}
          onClick={handleClick}
          className={cn(
            "flex flex-1 items-center justify-between py-4 text-sm font-medium",
            "text-[var(--s-text)]",
            "transition-all duration-200 hover:underline",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-ring,var(--s-primary))] focus-visible:ring-offset-2",
            "[&[data-state=open]>svg]:rotate-180",
            className,
          )}
          {...rest}
        >
          {children}
          <ChevronDown className="size-4 shrink-0 text-[var(--s-text-muted)] transition-transform duration-200" />
        </button>
      </h3>
    );
  },
);

// ---------------------------------------------------------------------------
// AccordionContent
// ---------------------------------------------------------------------------
export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

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
        data-slot="accordion-content"
        data-state={isOpen ? "open" : "closed"}
        role="region"
        className={cn(
          "overflow-hidden transition-all duration-200 ease-out",
          isOpen ? "grid grid-rows-[1fr] opacity-100" : "grid grid-rows-[0fr] opacity-0",
          className,
        )}
        {...rest}
      >
        <div className="overflow-hidden">
          <div className="pb-4 text-sm text-[var(--s-text-muted)]">{children}</div>
        </div>
      </div>
    );
  },
);
