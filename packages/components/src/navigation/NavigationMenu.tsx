"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as NavPrimitive from "@radix-ui/react-navigation-menu";
import { cn } from "../utils";

export const NavigationMenu = forwardRef<HTMLElement, ComponentPropsWithoutRef<typeof NavPrimitive.Root>>(
  function NavigationMenu({ className, children, ...rest }, ref) {
    return (
      <NavPrimitive.Root
        ref={ref}
        data-slot="navigation-menu"
        className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}
        {...rest}
      >
        {children}
        <NavigationMenuViewport />
      </NavPrimitive.Root>
    );
  },
);

export const NavigationMenuList = forwardRef<HTMLUListElement, ComponentPropsWithoutRef<typeof NavPrimitive.List>>(
  function NavigationMenuList({ className, ...rest }, ref) {
    return (
      <NavPrimitive.List
        ref={ref}
        className={cn("group flex flex-1 list-none items-center justify-center gap-1", className)}
        {...rest}
      />
    );
  },
);

export const NavigationMenuItem = NavPrimitive.Item;

const triggerStyle = cn(
  "group inline-flex h-9 w-max items-center justify-center gap-1 px-4 py-2",
  "rounded-[var(--s-radius-md,6px)] text-sm font-medium",
  "bg-transparent text-[var(--s-text)]",
  "transition-colors duration-[var(--s-duration-fast,150ms)]",
  "hover:bg-[var(--s-surface)] hover:text-[var(--s-text)]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-primary)]",
  "disabled:pointer-events-none disabled:opacity-50",
  "data-[active]:bg-[var(--s-surface-elevated)]",
  "data-[state=open]:bg-[var(--s-surface-elevated)]",
);

export const NavigationMenuTrigger = forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<typeof NavPrimitive.Trigger>>(
  function NavigationMenuTrigger({ className, children, ...rest }, ref) {
    return (
      <NavPrimitive.Trigger ref={ref} className={cn(triggerStyle, "group", className)} {...rest}>
        {children}
        <svg
          width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden
          className="ml-1 h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-180"
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </NavPrimitive.Trigger>
    );
  },
);

export const NavigationMenuContent = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof NavPrimitive.Content>>(
  function NavigationMenuContent({ className, ...rest }, ref) {
    return (
      <NavPrimitive.Content
        ref={ref}
        className={cn(
          "left-0 top-0 w-full md:absolute md:w-auto",
          "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out",
          "data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out",
          "data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52",
          "data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52",
          className,
        )}
        {...rest}
      />
    );
  },
);

export const NavigationMenuLink = forwardRef<HTMLAnchorElement, ComponentPropsWithoutRef<typeof NavPrimitive.Link>>(
  function NavigationMenuLink({ className, ...rest }, ref) {
    return (
      <NavPrimitive.Link ref={ref} className={cn(triggerStyle, className)} {...rest} />
    );
  },
);

function NavigationMenuViewport() {
  return (
    <div className="absolute left-0 top-full flex justify-center">
      <NavPrimitive.Viewport
        className={cn(
          "origin-top-center relative mt-1.5 w-full overflow-hidden",
          "h-[var(--radix-navigation-menu-viewport-height)]",
          "w-[var(--radix-navigation-menu-viewport-width)]",
          "rounded-[var(--s-card-radius,8px)] border border-[var(--s-border)]",
          "bg-[var(--s-background)] shadow-[var(--s-shadow-md)]",
          "data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-90",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95",
        )}
      />
    </div>
  );
}
