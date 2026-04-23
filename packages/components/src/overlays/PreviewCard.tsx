"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { cn } from "../utils";

export interface PreviewCardProps extends ComponentPropsWithoutRef<typeof HoverCardPrimitive.Root> {}

export function PreviewCard({ openDelay = 300, closeDelay = 150, ...rest }: PreviewCardProps) {
  return <HoverCardPrimitive.Root openDelay={openDelay} closeDelay={closeDelay} {...rest} />;
}

export const PreviewCardTrigger = forwardRef<
  HTMLAnchorElement,
  ComponentPropsWithoutRef<typeof HoverCardPrimitive.Trigger>
>(function PreviewCardTrigger({ className, ...rest }, ref) {
  return (
    <HoverCardPrimitive.Trigger
      ref={ref}
      className={cn(
        "underline decoration-[var(--s-border)] underline-offset-4",
        "transition-colors duration-[var(--s-duration-fast,150ms)]",
        "hover:decoration-[var(--s-primary)]",
        className,
      )}
      {...rest}
    />
  );
});

export interface PreviewCardContentProps
  extends ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> {
  title?: string;
  description?: string;
  image?: string;
}

export const PreviewCardContent = forwardRef<HTMLDivElement, PreviewCardContentProps>(
  function PreviewCardContent(
    { title, description, image, className, children, sideOffset = 8, ...rest },
    ref,
  ) {
    return (
      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content
          ref={ref}
          data-slot="preview-card"
          sideOffset={sideOffset}
          className={cn(
            "z-50 w-72 overflow-hidden",
            "rounded-[var(--s-card-radius,8px)] border border-[style:var(--s-border-style,solid)] border-[var(--s-border)]",
            "bg-[var(--s-surface)] shadow-[var(--s-shadow-md)]",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
            className,
          )}
          {...rest}
        >
          {image && (
            <div className="h-32 w-full overflow-hidden bg-[var(--s-surface-elevated)]">
              <img src={image} alt="" className="h-full w-full object-cover" />
            </div>
          )}
          <div className="p-3">
            {title && (
              <p className="text-sm font-semibold text-[var(--s-text)] line-clamp-1">{title}</p>
            )}
            {description && (
              <p className="mt-1 text-xs text-[var(--s-text-muted)] line-clamp-2">{description}</p>
            )}
            {children}
          </div>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    );
  },
);
