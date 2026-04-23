"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "../utils";
import { useSigilSound } from "../sound-context";

export type AccordionProps = ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>;

export function Accordion({ onValueChange, ...props }: AccordionProps) {
  const { play } = useSigilSound();
  return (
    <AccordionPrimitive.Root
      onValueChange={(value: string | string[]) => { play("expand"); onValueChange?.(value as any); }}
      {...props}
    />
  );
}

export const AccordionItem = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(function AccordionItem({ className, ...props }, ref) {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      data-slot="accordion-item"
      className={cn("border-b border-[var(--s-border)]", className)}
      {...props}
    />
  );
});

export type AccordionItemProps = ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>;

export const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(function AccordionTrigger({ className, children, ...props }, ref) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        data-slot="accordion-trigger"
        className={cn(
          "flex flex-1 items-center justify-between py-4 text-sm font-medium text-[var(--s-text)]",
          "transition-all duration-[var(--s-duration-fast,150ms)]",
          "hover:underline",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-ring,var(--s-primary))] focus-visible:ring-offset-2",
          "[&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="size-4 shrink-0 text-[var(--s-text-muted)] transition-transform duration-[var(--s-duration-fast,150ms)]"
          aria-hidden
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});

export type AccordionTriggerProps = ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>;

export const AccordionContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(function AccordionContent({ className, children, ...props }, ref) {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      data-slot="accordion-content"
      className="overflow-hidden text-sm text-[var(--s-text-muted)] data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
});

export type AccordionContentProps = ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>;
