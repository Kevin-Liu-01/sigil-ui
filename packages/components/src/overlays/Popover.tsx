"use client";

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../utils";

interface PopoverContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopoverContext() {
  const ctx = useContext(PopoverContext);
  if (!ctx) throw new Error("Popover compound components must be used within <Popover>");
  return ctx;
}

export interface PopoverProps {
  /** Controlled open state. */
  open?: boolean;
  /** Callback when open state changes. */
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

/** Popover provider. */
export function Popover({ open: controlledOpen, onOpenChange, children }: PopoverProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const isOpen = controlledOpen ?? internalOpen;

  const setOpen = useCallback(
    (v: boolean) => {
      if (controlledOpen === undefined) setInternalOpen(v);
      onOpenChange?.(v);
    },
    [controlledOpen, onOpenChange],
  );

  return (
    <PopoverContext.Provider value={{ open: isOpen, setOpen, triggerRef }}>
      <div className="relative inline-block">{children}</div>
    </PopoverContext.Provider>
  );
}

export interface PopoverTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/** Button that toggles the popover. */
export const PopoverTrigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  function PopoverTrigger({ className, children, onClick, ...rest }, ref) {
    const { open, setOpen, triggerRef } = usePopoverContext();
    return (
      <button
        ref={(el) => {
          (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = el;
          if (typeof ref === "function") ref(el);
          else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = el;
        }}
        type="button"
        aria-expanded={open}
        onClick={(e) => {
          setOpen(!open);
          onClick?.(e);
        }}
        className={className}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Popover alignment. @default "center" */
  align?: "start" | "center" | "end";
  /** Popover side. @default "bottom" */
  side?: "top" | "bottom";
  children: ReactNode;
}

/** Popover content panel. */
export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  function PopoverContent({ align = "center", side = "bottom", className, children, ...rest }, ref) {
    const { open, setOpen } = usePopoverContext();
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!open) return;
      const handleClick = (e: MouseEvent) => {
        if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      };
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      document.addEventListener("mousedown", handleClick);
      document.addEventListener("keydown", handleEsc);
      return () => {
        document.removeEventListener("mousedown", handleClick);
        document.removeEventListener("keydown", handleEsc);
      };
    }, [open, setOpen]);

    if (!open) return null;

    const alignStyles: Record<string, string> = {
      start: "left-0",
      center: "left-1/2 -translate-x-1/2",
      end: "right-0",
    };

    return (
      <div
        ref={(el) => {
          (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
          if (typeof ref === "function") ref(el);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
        }}
        className={cn(
          "absolute z-50 min-w-[8rem] p-4",
          "rounded-[var(--s-card-radius,8px)] border border-[var(--s-border)] border-[style:var(--s-border-style,solid)]",
          "bg-[var(--s-background)] shadow-[var(--s-shadow-md)]",
          "animate-[popoverIn_150ms_ease-out]",
          side === "bottom" ? "top-full mt-2" : "bottom-full mb-2",
          alignStyles[align],
          className,
        )}
        {...rest}
      >
        {children}
        <style>{`
          @keyframes popoverIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </div>
    );
  },
);
