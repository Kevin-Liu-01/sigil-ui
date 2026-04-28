"use client";

import { forwardRef, type ComponentPropsWithoutRef, type HTMLAttributes, type ReactNode } from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "../utils";

/** Root provider — controls open state of the alert dialog. */
export const AlertDialog = AlertDialogPrimitive.Root;

/** Button that opens the alert dialog. */
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

export interface AlertDialogContentProps extends ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> {}

/** Centered modal content with backdrop blur overlay. */
export const AlertDialogContent = forwardRef<HTMLDivElement, AlertDialogContentProps>(
  function AlertDialogContent({ className, children, ...rest }, ref) {
    return (
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50",
            "bg-[var(--s-overlay-bg,oklch(0_0_0/0.55))] backdrop-blur-[var(--s-overlay-blur,2px)]",
            "data-[state=open]:animate-[fadeIn_var(--s-duration-fast)_ease-out] data-[state=closed]:animate-[fadeIn_var(--s-duration-fast)_ease-out_reverse]",
          )}
        />
        <AlertDialogPrimitive.Content
          ref={ref}
          data-slot="alert-dialog"
          className={cn(
            "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
            "w-full max-w-[500px] p-[var(--s-overlay-padding,24px)] rounded-[var(--s-overlay-radius,var(--s-radius-lg,12px))]",
            "bg-[var(--s-overlay-surface,var(--s-surface))] border border-[style:var(--s-border-style,solid)] border-[var(--s-overlay-border,var(--s-border))]",
            "shadow-[var(--s-overlay-shadow,var(--s-shadow-xl))]",
            "ring-1 ring-[var(--s-text)]/[0.04]",
            "data-[state=open]:animate-[dialogIn_var(--s-duration-normal)_ease-out]",
            className,
          )}
          {...rest}
        >
          {children}
        </AlertDialogPrimitive.Content>
        <style>{`
          @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
          @keyframes dialogIn {
            from { opacity: 0; transform: translate(-50%,-50%) scale(0.95); }
            to { opacity: 1; transform: translate(-50%,-50%) scale(1); }
          }
        `}</style>
      </AlertDialogPrimitive.Portal>
    );
  },
);

/** Header group for title + description. */
export const AlertDialogHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function AlertDialogHeader({ className, ...rest }, ref) {
    return <div ref={ref} className={cn("flex flex-col gap-1.5 mb-4", className)} {...rest} />;
  },
);

/** Footer group for action buttons. */
export const AlertDialogFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function AlertDialogFooter({ className, ...rest }, ref) {
    return <div ref={ref} className={cn("flex items-center justify-end gap-2 mt-6", className)} {...rest} />;
  },
);

/** Alert dialog title. */
export const AlertDialogTitle = forwardRef<HTMLHeadingElement, ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>>(
  function AlertDialogTitle({ className, ...rest }, ref) {
    return (
      <AlertDialogPrimitive.Title
        ref={ref}
        className={cn("text-lg font-semibold text-[var(--s-text)]", className)}
        {...rest}
      />
    );
  },
);

/** Alert dialog description text. */
export const AlertDialogDescription = forwardRef<HTMLParagraphElement, ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>>(
  function AlertDialogDescription({ className, ...rest }, ref) {
    return (
      <AlertDialogPrimitive.Description
        ref={ref}
        className={cn("text-sm text-[var(--s-text-muted)]", className)}
        {...rest}
      />
    );
  },
);

/** Confirm action button — styled with primary token. */
export const AlertDialogAction = forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>>(
  function AlertDialogAction({ className, ...rest }, ref) {
    return (
      <AlertDialogPrimitive.Action
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-[var(--s-radius-md,6px)] px-4 py-2 text-sm font-medium",
          "bg-[var(--s-primary)] text-[var(--s-primary-contrast)] hover:opacity-90",
          "transition-opacity duration-[var(--s-duration-fast)]",
          "focus-visible:outline-none focus-visible:ring-[length:var(--s-focus-ring-width)] focus-visible:ring-[var(--s-focus-ring-color)] focus-visible:ring-offset-[var(--s-focus-ring-offset)]",
          className,
        )}
        {...rest}
      />
    );
  },
);

/** Cancel button — styled with secondary/ghost appearance. */
export const AlertDialogCancel = forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>>(
  function AlertDialogCancel({ className, ...rest }, ref) {
    return (
      <AlertDialogPrimitive.Cancel
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-[var(--s-radius-md,6px)] px-4 py-2 text-sm font-medium",
          "border border-[style:var(--s-border-style,solid)] border-[var(--s-border)] bg-transparent text-[var(--s-text)]",
          "hover:bg-[var(--s-surface-elevated)]",
          "transition-colors duration-[var(--s-duration-fast,150ms)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-primary)] focus-visible:ring-offset-2",
          className,
        )}
        {...rest}
      />
    );
  },
);
