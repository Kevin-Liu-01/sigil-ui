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
import { useSigilSound } from "../sound-context";

interface DialogContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
  titleId: string;
  descId: string;
}

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogContext() {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error("Dialog compound components must be used within <Dialog>");
  return ctx;
}

export interface DialogProps {
  /** Controlled open state. */
  open?: boolean;
  /** Callback when open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Default open state for uncontrolled usage. */
  defaultOpen?: boolean;
  children: ReactNode;
}

export function Dialog({
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  children,
}: DialogProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const baseId = useId();
  const { play } = useSigilSound();
  const isOpen = controlledOpen ?? internalOpen;

  const setOpen = useCallback(
    (v: boolean) => {
      play(v ? "open" : "close");
      if (controlledOpen === undefined) setInternalOpen(v);
      onOpenChange?.(v);
    },
    [controlledOpen, onOpenChange, play],
  );

  return (
    <DialogContext.Provider
      value={{
        open: isOpen,
        setOpen,
        titleId: `${baseId}-title`,
        descId: `${baseId}-desc`,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}

export interface DialogTriggerProps
  extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const DialogTrigger = forwardRef<
  HTMLButtonElement,
  DialogTriggerProps
>(function DialogTrigger({ className, children, onClick, ...rest }, ref) {
  const { setOpen } = useDialogContext();
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
});

function XIcon() {
  return (
    <svg
      data-icon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export interface DialogContentProps
  extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  function DialogContent({ className, children, ...rest }, ref) {
    const { open, setOpen, titleId, descId } = useDialogContext();

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
        {/* Overlay */}
        <div
          data-state="open"
          className={cn(
            "fixed inset-0 z-50 bg-black/80",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          )}
          onClick={() => setOpen(false)}
          aria-hidden
        />

        {/* Content */}
        <div
          ref={ref}
          role="dialog"
          aria-modal
          aria-labelledby={titleId}
          aria-describedby={descId}
          data-slot="dialog"
          data-state="open"
          className={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]",
            "gap-4 border border-[var(--s-border)] bg-[var(--s-surface)] p-6 shadow-lg",
            "rounded-[var(--s-card-radius,8px)]",
            "duration-200",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
            "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
            "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([data-icon])]:size-4",
            className,
          )}
          {...rest}
        >
          {children}

          <button
            type="button"
            onClick={() => setOpen(false)}
            className={cn(
              "absolute right-4 top-4 rounded-[var(--s-radius-sm,0px)] opacity-70",
              "transition-opacity hover:opacity-100",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-ring,var(--s-primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--s-ring-offset,var(--s-background))]",
              "disabled:pointer-events-none",
            )}
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </button>
        </div>
      </div>
    );
  },
);

export const DialogHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function DialogHeader({ className, ...rest }, ref) {
  return (
    <div
      ref={ref}
      data-slot="dialog-header"
      className={cn(
        "flex flex-col gap-2 text-center sm:text-left",
        className,
      )}
      {...rest}
    />
  );
});

export const DialogTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(function DialogTitle({ className, ...rest }, ref) {
  const { titleId } = useDialogContext();
  return (
    <h2
      ref={ref}
      id={titleId}
      data-slot="dialog-title"
      className={cn(
        "text-lg font-semibold leading-none tracking-tight text-[var(--s-text)]",
        className,
      )}
      {...rest}
    />
  );
});

export const DialogDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(function DialogDescription({ className, ...rest }, ref) {
  const { descId } = useDialogContext();
  return (
    <p
      ref={ref}
      id={descId}
      data-slot="dialog-description"
      className={cn("text-sm text-[var(--s-text-muted)]", className)}
      {...rest}
    />
  );
});

export const DialogFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function DialogFooter({ className, ...rest }, ref) {
  return (
    <div
      ref={ref}
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className,
      )}
      {...rest}
    />
  );
});

export interface DialogCloseProps
  extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
  function DialogClose({ className, children, onClick, ...rest }, ref) {
    const { setOpen } = useDialogContext();
    return (
      <button
        ref={ref}
        type="button"
        onClick={(e) => {
          setOpen(false);
          onClick?.(e);
        }}
        className={className}
        {...rest}
      >
        {children ?? <span className="sr-only">Close</span>}
      </button>
    );
  },
);
