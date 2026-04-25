"use client";

import { forwardRef, type ComponentPropsWithoutRef, type HTMLAttributes } from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cn } from "../utils";

export const Sheet = SheetPrimitive.Root;
export const SheetTrigger = SheetPrimitive.Trigger;
export const SheetClose = SheetPrimitive.Close;

export type SheetProps = ComponentPropsWithoutRef<typeof SheetPrimitive.Root>;
export type SheetTriggerProps = ComponentPropsWithoutRef<typeof SheetPrimitive.Trigger>;

const SheetOverlay = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(function SheetOverlay({ className, ...props }, ref) {
  return (
    <SheetPrimitive.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 z-50",
        "bg-[var(--s-overlay-bg)] backdrop-blur-[var(--s-overlay-blur)]",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className,
      )}
      {...props}
    />
  );
});

const sideVariants = {
  right: "inset-y-0 right-0 h-full w-3/4 max-w-sm border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
  left: "inset-y-0 left-0 h-full w-3/4 max-w-sm border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
  top: "inset-x-0 top-0 w-full max-h-[50vh] border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
  bottom: "inset-x-0 bottom-0 w-full max-h-[50vh] border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
} as const;

export interface SheetContentProps
  extends ComponentPropsWithoutRef<typeof SheetPrimitive.Content> {
  side?: keyof typeof sideVariants;
}

export const SheetContent = forwardRef<HTMLDivElement, SheetContentProps>(
  function SheetContent({ side = "right", className, children, ...props }, ref) {
    return (
      <SheetPrimitive.Portal>
        <SheetOverlay />
        <SheetPrimitive.Content
          ref={ref}
          data-slot="sheet"
          className={cn(
            "fixed z-50 flex flex-col gap-4 p-[var(--s-overlay-padding)]",
            "bg-[var(--s-overlay-surface)] border-[var(--s-overlay-border)] border-[style:var(--s-border-style,solid)]",
            "shadow-[var(--s-overlay-shadow)]",
            "transition-transform duration-[var(--s-duration-normal)] ease-out",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            sideVariants[side],
            className,
          )}
          {...props}
        >
          {children}
          <SheetPrimitive.Close
            className={cn(
              "absolute right-4 top-4 rounded-[var(--s-radius-sm,0px)] opacity-70",
              "transition-opacity hover:opacity-100",
              "focus-visible:outline-none focus-visible:ring-[length:var(--s-focus-ring-width)] focus-visible:ring-[var(--s-focus-ring-color)] focus-visible:ring-offset-[var(--s-focus-ring-offset)]",
            )}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        </SheetPrimitive.Content>
      </SheetPrimitive.Portal>
    );
  },
);

export const SheetHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function SheetHeader({ className, ...props }, ref) {
    return (
      <div ref={ref} data-slot="sheet-header" className={cn("flex flex-col gap-1.5", className)} {...props} />
    );
  },
);

export const SheetTitle = forwardRef<
  HTMLHeadingElement,
  ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(function SheetTitle({ className, ...props }, ref) {
  return (
    <SheetPrimitive.Title
      ref={ref}
      data-slot="sheet-title"
      className={cn("text-lg font-semibold text-[var(--s-text)]", className)}
      {...props}
    />
  );
});

export const SheetDescription = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(function SheetDescription({ className, ...props }, ref) {
  return (
    <SheetPrimitive.Description
      ref={ref}
      data-slot="sheet-description"
      className={cn("text-sm text-[var(--s-text-muted)]", className)}
      {...props}
    />
  );
});
