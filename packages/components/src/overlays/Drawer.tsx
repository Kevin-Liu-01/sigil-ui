"use client";

import {
  forwardRef,
  isValidElement,
  type ComponentPropsWithoutRef,
  type HTMLAttributes,
  type ReactElement,
} from "react";
import { Drawer as DrawerBase } from "@base-ui/react/drawer";
import { cn } from "../utils";

export interface DrawerProps extends ComponentPropsWithoutRef<typeof DrawerBase.Root> {}

export function Drawer(props: DrawerProps) {
  return <DrawerBase.Root {...props} />;
}

/**
 * Drawer trigger. Accepts the Radix-style `asChild` prop to merge into the
 * provided child element instead of rendering its own <button>. Without
 * this, Base UI's Drawer.Trigger always wraps children in a <button>,
 * which produces invalid <button>-in-<button> DOM when combined with our
 * <Button> component.
 */
type DrawerTriggerProps = ComponentPropsWithoutRef<typeof DrawerBase.Trigger> & {
  asChild?: boolean;
};

export function DrawerTrigger({ asChild, render, children, ...props }: DrawerTriggerProps) {
  if (asChild && isValidElement(children)) {
    return <DrawerBase.Trigger render={children as ReactElement} {...props} />;
  }
  return (
    <DrawerBase.Trigger render={render} {...props}>
      {children}
    </DrawerBase.Trigger>
  );
}

type DrawerCloseProps = ComponentPropsWithoutRef<typeof DrawerBase.Close> & {
  asChild?: boolean;
};

export function DrawerClose({ asChild, render, children, ...props }: DrawerCloseProps) {
  if (asChild && isValidElement(children)) {
    return <DrawerBase.Close render={children as ReactElement} {...props} />;
  }
  return (
    <DrawerBase.Close render={render} {...props}>
      {children}
    </DrawerBase.Close>
  );
}

export const DrawerContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof DrawerBase.Popup>
>(function DrawerContent({ className, children, ...rest }, ref) {
  return (
    <DrawerBase.Portal>
      <DrawerBase.Backdrop
        className={cn(
          "fixed inset-0 z-50",
          "bg-[var(--s-overlay-bg,oklch(0_0_0/0.55))] backdrop-blur-[var(--s-overlay-blur,2px)]",
          "transition-opacity duration-[var(--s-duration-fast,150ms)]",
          "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
        )}
      />
      <DrawerBase.Viewport className="fixed inset-0 z-50">
        <DrawerBase.Popup
          ref={ref}
          data-slot="drawer"
          className={cn(
            "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col",
            "rounded-t-[var(--s-overlay-radius,var(--s-radius-lg,12px))]",
            "border border-b-0 border-[color:var(--s-overlay-border,var(--s-border))] border-[style:var(--s-border-style,solid)]",
            "bg-[var(--s-overlay-surface,var(--s-surface))] shadow-[var(--s-overlay-shadow,var(--s-shadow-xl))]",
            className,
          )}
          {...rest}
        >
          <div className="mx-auto mt-4 h-1.5 w-12 shrink-0 rounded-[var(--s-radius-full,9999px)] bg-[var(--s-border)]" />
          {children}
        </DrawerBase.Popup>
      </DrawerBase.Viewport>
    </DrawerBase.Portal>
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
  ComponentPropsWithoutRef<typeof DrawerBase.Title>
>(function DrawerTitle({ className, ...rest }, ref) {
  return (
    <DrawerBase.Title
      ref={ref}
      className={cn("text-lg font-semibold leading-none text-[var(--s-text)]", className)}
      {...rest}
    />
  );
});

export const DrawerDescription = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithoutRef<typeof DrawerBase.Description>
>(function DrawerDescription({ className, ...rest }, ref) {
  return (
    <DrawerBase.Description
      ref={ref}
      className={cn("text-sm text-[var(--s-text-muted)]", className)}
      {...rest}
    />
  );
});
