"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../utils";
import { useSigilSound } from "../sound-context";

export type TabsProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Root>;

export function Tabs({ onValueChange, ...props }: TabsProps) {
  const { play } = useSigilSound();
  return (
    <TabsPrimitive.Root
      onValueChange={(value) => { play("nav"); onValueChange?.(value); }}
      {...props}
    />
  );
}

export const TabsList = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(function TabsList({ className, ...props }, ref) {
  return (
    <TabsPrimitive.List
      ref={ref}
      data-slot="tabs-list"
      className={cn(
        "inline-flex h-9 items-center justify-center gap-1",
        "rounded-[var(--s-radius-md,0px)] bg-[var(--s-surface)] p-1",
        "text-[var(--s-text-muted)]",
        className,
      )}
      {...props}
    />
  );
});

export interface TabsTriggerProps
  extends ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  function TabsTrigger({ className, ...props }, ref) {
    return (
      <TabsPrimitive.Trigger
        ref={ref}
        data-slot="tabs-trigger"
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap",
          "rounded-[var(--s-radius-sm,0px)] px-3 py-1 text-sm font-medium",
          "transition-all duration-[var(--s-duration-fast,150ms)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-ring,var(--s-primary))] focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          "data-[state=active]:bg-[var(--s-background)] data-[state=active]:text-[var(--s-text)] data-[state=active]:shadow-sm",
          "data-[state=inactive]:text-[var(--s-text-muted)] data-[state=inactive]:hover:text-[var(--s-text)]",
          className,
        )}
        {...props}
      />
    );
  },
);

export interface TabsContentProps
  extends ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  function TabsContent({ className, ...props }, ref) {
    return (
      <TabsPrimitive.Content
        ref={ref}
        data-slot="tabs-content"
        className={cn(
          "mt-2",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-ring,var(--s-primary))] focus-visible:ring-offset-2",
          className,
        )}
        {...props}
      />
    );
  },
);
