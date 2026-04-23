"use client";

import { forwardRef, type ComponentPropsWithoutRef, type HTMLAttributes } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "../utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogPortal = DialogPrimitive.Portal;

export type DialogProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Root>;
export type DialogTriggerProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>;
export type DialogCloseProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Close>;

const DialogOverlay = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(function DialogOverlay({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 z-50",
        "bg-[var(--s-overlay-bg,rgba(0,0,0,0.55))] backdrop-blur-[var(--s-overlay-blur,2px)]",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className,
      )}
      {...props}
    />
  );
});

export interface DialogContentProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  function DialogContent({ className, children, ...props }, ref) {
    return (
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          ref={ref}
          data-slot="dialog"
          className={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]",
            "gap-4 border border-[style:var(--s-border-style,solid)] border-[var(--s-border)] bg-[var(--s-surface)] p-6",
            "shadow-[var(--s-dialog-shadow,0_16px_48px_-8px_rgba(0,0,0,0.35),0_4px_16px_-4px_rgba(0,0,0,0.2))]",
            "ring-1 ring-[var(--s-text)]/[0.04]",
            "rounded-[var(--s-card-radius,8px)]",
            "duration-[var(--s-duration-fast,200ms)]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
            "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
            className,
          )}
          {...props}
        >
          {children}
          <DialogPrimitive.Close
            className={cn(
              "absolute right-4 top-4 rounded-[var(--s-radius-sm,0px)] opacity-70",
              "transition-opacity hover:opacity-100",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-ring,var(--s-primary))] focus-visible:ring-offset-2",
              "disabled:pointer-events-none",
            )}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPortal>
    );
  },
);

export const DialogHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function DialogHeader({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="dialog-header"
        className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
        {...props}
      />
    );
  },
);

export const DialogTitle = forwardRef<
  HTMLHeadingElement,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(function DialogTitle({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      data-slot="dialog-title"
      className={cn(
        "text-lg font-semibold leading-none tracking-tight text-[var(--s-text)]",
        className,
      )}
      {...props}
    />
  );
});

export const DialogDescription = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(function DialogDescription({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      data-slot="dialog-description"
      className={cn("text-sm text-[var(--s-text-muted)]", className)}
      {...props}
    />
  );
});

export const DialogFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function DialogFooter({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="dialog-footer"
        className={cn(
          "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
          className,
        )}
        {...props}
      />
    );
  },
);
