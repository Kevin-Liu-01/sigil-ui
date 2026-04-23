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

/** Modal dialog provider. */
export function Dialog({ open: controlledOpen, onOpenChange, defaultOpen = false, children }: DialogProps) {
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
    <DialogContext.Provider value={{ open: isOpen, setOpen, titleId: `${baseId}-title`, descId: `${baseId}-desc` }}>
      {children}
    </DialogContext.Provider>
  );
}

export interface DialogTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/** Button that opens the dialog. */
export const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  function DialogTrigger({ className, children, onClick, ...rest }, ref) {
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
  },
);

export interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/** Dialog content overlay with backdrop. */
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
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-[fadeIn_150ms_ease-out]"
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
            "relative z-10 w-full max-w-lg mx-4 p-6 rounded-[var(--s-card-radius,8px)]",
            "bg-[var(--s-background)] border border-[var(--s-border)] border-[style:var(--s-border-style,solid)]",
            "shadow-[var(--s-shadow-lg)]",
            "animate-[dialogIn_200ms_ease-out]",
            className,
          )}
          style={{
            // @ts-expect-error -- CSS keyframes injected via style
            "--dialog-in": "dialogIn",
          }}
          {...rest}
        >
          {children}
        </div>
        <style>{`
          @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
          @keyframes dialogIn {
            from { opacity: 0; transform: scale(0.95) translateY(8px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}</style>
      </div>
    );
  },
);

/** Dialog header section. */
export const DialogHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function DialogHeader({ className, ...rest }, ref) {
    return <div ref={ref} className={cn("flex flex-col gap-1.5 mb-4", className)} {...rest} />;
  },
);

/** Dialog title. */
export const DialogTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  function DialogTitle({ className, ...rest }, ref) {
    const { titleId } = useDialogContext();
    return (
      <h2
        ref={ref}
        id={titleId}
        className={cn("text-lg font-semibold text-[var(--s-text)]", className)}
        {...rest}
      />
    );
  },
);

/** Dialog description. */
export const DialogDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  function DialogDescription({ className, ...rest }, ref) {
    const { descId } = useDialogContext();
    return (
      <p
        ref={ref}
        id={descId}
        className={cn("text-sm text-[var(--s-text-muted)]", className)}
        {...rest}
      />
    );
  },
);

/** Dialog footer for action buttons. */
export const DialogFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function DialogFooter({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-end gap-2 mt-6", className)}
        {...rest}
      />
    );
  },
);

export interface DialogCloseProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

/** Button that closes the dialog. */
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
        {children ?? (
          <span className="sr-only">Close</span>
        )}
      </button>
    );
  },
);
