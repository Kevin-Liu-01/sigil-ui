"use client";

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../utils";

type SheetSide = "left" | "right" | "top" | "bottom";

interface SheetContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
  side: SheetSide;
  titleId: string;
  descId: string;
}

const SheetContext = createContext<SheetContextValue | null>(null);

function useSheetContext() {
  const ctx = useContext(SheetContext);
  if (!ctx) throw new Error("Sheet compound components must be used within <Sheet>");
  return ctx;
}

export interface SheetProps {
  /** Controlled open state. */
  open?: boolean;
  /** Callback when open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Which side the sheet slides from. @default "right" */
  side?: SheetSide;
  children: ReactNode;
}

/** Slide-out panel (side drawer) provider. */
export function Sheet({ open: controlledOpen, onOpenChange, side = "right", children }: SheetProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const baseId = useId();
  const isOpen = controlledOpen ?? internalOpen;

  const setOpen = useCallback(
    (v: boolean) => {
      if (controlledOpen === undefined) setInternalOpen(v);
      onOpenChange?.(v);
    },
    [controlledOpen, onOpenChange],
  );

  return (
    <SheetContext.Provider value={{ open: isOpen, setOpen, side, titleId: `${baseId}-title`, descId: `${baseId}-desc` }}>
      {children}
    </SheetContext.Provider>
  );
}

export interface SheetTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/** Button that opens the sheet. */
export const SheetTrigger = forwardRef<HTMLButtonElement, SheetTriggerProps>(
  function SheetTrigger({ className, children, onClick, ...rest }, ref) {
    const { setOpen } = useSheetContext();
    return (
      <button
        ref={ref}
        type="button"
        onClick={(e) => {
          setOpen(true);
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

const slideTransforms: Record<SheetSide, { open: string; closed: string }> = {
  right: { open: "translateX(0)", closed: "translateX(100%)" },
  left: { open: "translateX(0)", closed: "translateX(-100%)" },
  top: { open: "translateY(0)", closed: "translateY(-100%)" },
  bottom: { open: "translateY(0)", closed: "translateY(100%)" },
};

const sidePositions: Record<SheetSide, string> = {
  right: "right-0 top-0 bottom-0 h-full w-full max-w-sm",
  left: "left-0 top-0 bottom-0 h-full w-full max-w-sm",
  top: "top-0 left-0 right-0 w-full max-h-[50vh]",
  bottom: "bottom-0 left-0 right-0 w-full max-h-[50vh]",
};

export interface SheetContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/** Sheet content panel. */
export const SheetContent = forwardRef<HTMLDivElement, SheetContentProps>(
  function SheetContent({ className, children, ...rest }, ref) {
    const { open, setOpen, side, titleId, descId } = useSheetContext();
    const transforms = slideTransforms[side];

    useEffect(() => {
      if (!open) return;
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleEsc);
        document.body.style.overflow = "";
      };
    }, [open, setOpen]);

    if (!open) return null;

    return (
      <div className="fixed inset-0 z-50">
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-[var(--s-duration-normal,200ms)]"
          onClick={() => setOpen(false)}
          aria-hidden
        />
        <div
          ref={ref}
          role="dialog"
          aria-modal
          aria-labelledby={titleId}
          aria-describedby={descId}
          className={cn(
            "fixed z-10 p-6 bg-[var(--s-background)] border-[var(--s-border)] border-[style:var(--s-border-style,solid)] shadow-[var(--s-shadow-lg)]",
            "transition-transform duration-[var(--s-duration-normal,200ms)] ease-out",
            side === "left" || side === "right" ? "border-x" : "border-y",
            sidePositions[side],
            className,
          )}
          style={{ transform: open ? transforms.open : transforms.closed }}
          {...rest}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 text-[var(--s-text-muted)] hover:text-[var(--s-text)] transition-colors"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          {children}
        </div>
      </div>
    );
  },
);

/** Sheet header section. */
export const SheetHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function SheetHeader({ className, ...rest }, ref) {
    return <div ref={ref} className={cn("flex flex-col gap-1.5 mb-4", className)} {...rest} />;
  },
);

/** Sheet title. */
export const SheetTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  function SheetTitle({ className, ...rest }, ref) {
    const { titleId } = useSheetContext();
    return (
      <h2 ref={ref} id={titleId} className={cn("text-lg font-semibold text-[var(--s-text)]", className)} {...rest} />
    );
  },
);

/** Sheet description. */
export const SheetDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  function SheetDescription({ className, ...rest }, ref) {
    const { descId } = useSheetContext();
    return (
      <p ref={ref} id={descId} className={cn("text-sm text-[var(--s-text-muted)]", className)} {...rest} />
    );
  },
);
