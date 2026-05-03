"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { cn } from "../utils";

export const Menubar = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>>(
  function Menubar({ className, ...rest }, ref) {
    return (
      <MenubarPrimitive.Root
        ref={ref}
        data-slot="menubar"
        className={cn(
          "flex h-10 items-center gap-1 rounded-[var(--s-radius-md,6px)] border border-[style:var(--s-border-style,solid)] border-[color:var(--s-border)]",
          "bg-[var(--s-surface)] px-1",
          className,
        )}
        {...rest}
      />
    );
  },
);

export const MenubarMenu: typeof MenubarPrimitive.Menu = MenubarPrimitive.Menu;

export const MenubarTrigger = forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>>(
  function MenubarTrigger({ className, ...rest }, ref) {
    return (
      <MenubarPrimitive.Trigger
        ref={ref}
        data-slot="menubar-trigger"
        className={cn(
          "flex cursor-default select-none items-center rounded-[var(--s-radius-sm,4px)] px-3 py-1.5",
          "text-sm font-medium text-[var(--s-text)] outline-none",
          "hover:bg-[var(--s-surface-elevated)]",
          "focus:bg-[var(--s-surface-elevated)]",
          "data-[state=open]:bg-[var(--s-surface-elevated)]",
          className,
        )}
        {...rest}
      />
    );
  },
);

const contentClass = cn(
  "z-50 min-w-[12rem] overflow-hidden rounded-[var(--s-radius-md,6px)] p-1 outline-none",
  "border border-[style:var(--s-border-style,solid)] border-[color:var(--s-border)] bg-[var(--s-surface)] shadow-[var(--s-shadow-md)]",
  "text-[var(--s-text)]",
  "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
  "data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
);

export const MenubarContent = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>>(
  function MenubarContent({ className, align = "start", alignOffset = -4, sideOffset = 8, ...rest }, ref) {
    return (
      <MenubarPrimitive.Portal>
        <MenubarPrimitive.Content
          ref={ref}
          data-slot="menubar-content"
          align={align}
          alignOffset={alignOffset}
          sideOffset={sideOffset}
          className={cn(contentClass, className)}
          {...rest}
        />
      </MenubarPrimitive.Portal>
    );
  },
);

const itemBase = cn(
  "relative flex cursor-default select-none items-center rounded-[var(--s-radius-sm,4px)] px-2 py-1.5",
  "text-sm outline-none transition-colors duration-[var(--s-duration-fast,150ms)]",
  "focus:bg-[var(--s-surface-elevated)] focus:text-[var(--s-text)]",
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
);

export const MenubarItem = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof MenubarPrimitive.Item>>(
  function MenubarItem({ className, ...rest }, ref) {
    return <MenubarPrimitive.Item ref={ref} data-slot="menubar-item" className={cn(itemBase, className)} {...rest} />;
  },
);

export const MenubarSeparator = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>>(
  function MenubarSeparator({ className, ...rest }, ref) {
    return (
      <MenubarPrimitive.Separator
        ref={ref}
        data-slot="menubar-separator"
        className={cn("-mx-1 my-1 h-px bg-[var(--s-border)]", className)}
        {...rest}
      />
    );
  },
);

export const MenubarCheckboxItem = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>>(
  function MenubarCheckboxItem({ className, children, checked, ...rest }, ref) {
    return (
      <MenubarPrimitive.CheckboxItem ref={ref} data-slot="menubar-checkbox-item" className={cn(itemBase, "pl-8", className)} checked={checked} {...rest}>
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <MenubarPrimitive.ItemIndicator>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 6l2.5 2.5 4.5-5" /></svg>
          </MenubarPrimitive.ItemIndicator>
        </span>
        {children}
      </MenubarPrimitive.CheckboxItem>
    );
  },
);

export const MenubarRadioItem = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>>(
  function MenubarRadioItem({ className, children, ...rest }, ref) {
    return (
      <MenubarPrimitive.RadioItem ref={ref} data-slot="menubar-radio-item" className={cn(itemBase, "pl-8", className)} {...rest}>
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <MenubarPrimitive.ItemIndicator>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor"><circle cx="4" cy="4" r="4" /></svg>
          </MenubarPrimitive.ItemIndicator>
        </span>
        {children}
      </MenubarPrimitive.RadioItem>
    );
  },
);
