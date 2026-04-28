"use client";

import {
  forwardRef,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "../utils";

export interface DrawerProps {
  shouldScaleBackground?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
}

export const Drawer = ({
  shouldScaleBackground = true,
  ...rest
}: DrawerProps) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...rest} />
);

export const DrawerTrigger = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(function DrawerTrigger(props, ref) {
  return <DrawerPrimitive.Trigger ref={ref} {...props} />;
});

export const DrawerClose = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(function DrawerClose(props, ref) {
  return <DrawerPrimitive.Close ref={ref} {...props} />;
});

export const DrawerContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function DrawerContent({ className, children, ...rest }, ref) {
  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Overlay className="fixed inset-0 z-50 bg-[var(--s-overlay-bg,oklch(0_0_0/0.55))] backdrop-blur-[var(--s-overlay-blur,2px)]" />
      <DrawerPrimitive.Content
        ref={ref}
        data-slot="drawer"
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col",
          "rounded-t-[var(--s-overlay-radius,var(--s-radius-lg,12px))]",
          "border border-b-0 border-[var(--s-overlay-border,var(--s-border))] border-[style:var(--s-border-style,solid)]",
          "bg-[var(--s-overlay-surface,var(--s-surface))] shadow-[var(--s-overlay-shadow,var(--s-shadow-xl))]",
          className,
        )}
        {...rest}
      >
        <div className="mx-auto mt-4 h-1.5 w-12 shrink-0 rounded-[var(--s-radius-full,9999px)] bg-[var(--s-border)]" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPrimitive.Portal>
  );
});

export const DrawerHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function DrawerHeader({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
        {...rest}
      />
    );
  },
);

export const DrawerFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function DrawerFooter({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn("mt-auto flex flex-col gap-2 p-4", className)}
        {...rest}
      />
    );
  },
);

export const DrawerTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(function DrawerTitle({ className, ...rest }, ref) {
  return (
    <DrawerPrimitive.Title
      ref={ref}
      className={cn("text-lg font-semibold leading-none text-[var(--s-text)]", className)}
      {...rest}
    />
  );
});

export const DrawerDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(function DrawerDescription({ className, ...rest }, ref) {
  return (
    <DrawerPrimitive.Description
      ref={ref}
      className={cn("text-sm text-[var(--s-text-muted)]", className)}
      {...rest}
    />
  );
});
