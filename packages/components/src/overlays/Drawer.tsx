"use client";

import { forwardRef, type ComponentPropsWithoutRef, type HTMLAttributes } from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "../utils";

export const Drawer = ({
  shouldScaleBackground = true,
  ...rest
}: ComponentPropsWithoutRef<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...rest} />
);

export const DrawerTrigger = DrawerPrimitive.Trigger;
export const DrawerClose = DrawerPrimitive.Close;

export const DrawerContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(function DrawerContent({ className, children, ...rest }, ref) {
  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
      <DrawerPrimitive.Content
        ref={ref}
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col",
          "rounded-t-[var(--s-card-radius,8px)]",
          "border border-b-0 border-[var(--s-border)]",
          "bg-[var(--s-background)] shadow-[var(--s-shadow-lg)]",
          className,
        )}
        {...rest}
      >
        <div className="mx-auto mt-4 h-1.5 w-12 shrink-0 rounded-full bg-[var(--s-border)]" />
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
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
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
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(function DrawerDescription({ className, ...rest }, ref) {
  return (
    <DrawerPrimitive.Description
      ref={ref}
      className={cn("text-sm text-[var(--s-text-muted)]", className)}
      {...rest}
    />
  );
});
