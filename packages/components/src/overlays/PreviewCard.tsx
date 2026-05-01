"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { PreviewCard as PreviewCardBase } from "@base-ui/react/preview-card";
import { cn } from "../utils";

export interface PreviewCardProps extends ComponentPropsWithoutRef<typeof PreviewCardBase.Root> {}

export function PreviewCard(props: PreviewCardProps) {
  return <PreviewCardBase.Root {...props} />;
}

export const PreviewCardTrigger = forwardRef<
  HTMLAnchorElement,
  ComponentPropsWithoutRef<typeof PreviewCardBase.Trigger>
>(function PreviewCardTrigger({ className, ...rest }, ref) {
  return (
    <PreviewCardBase.Trigger
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
  extends ComponentPropsWithoutRef<typeof PreviewCardBase.Popup> {
  title?: string;
  description?: string;
  image?: string;
  sideOffset?: number;
  side?: "top" | "bottom" | "left" | "right";
}

export const PreviewCardContent = forwardRef<HTMLDivElement, PreviewCardContentProps>(
  function PreviewCardContent(
    { title, description, image, className, children, sideOffset = 8, side = "bottom", ...rest },
    ref,
  ) {
    return (
      <PreviewCardBase.Portal>
        <PreviewCardBase.Positioner side={side} sideOffset={sideOffset}>
          <PreviewCardBase.Popup
            ref={ref}
            data-slot="preview-card"
            className={cn(
              "z-50 w-72 overflow-hidden",
              "rounded-[var(--s-card-radius,8px)] border border-[style:var(--s-border-style,solid)] border-[color:var(--s-border)]",
              "bg-[var(--s-surface,oklch(0.97_0_0))] shadow-[var(--s-shadow-md,0_4px_16px_oklch(0_0_0/0.12))]",
              "transition-all duration-[var(--s-duration-fast,150ms)]",
              "data-[starting-style]:opacity-0 data-[starting-style]:scale-95",
              "data-[ending-style]:opacity-0 data-[ending-style]:scale-95",
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
          </PreviewCardBase.Popup>
        </PreviewCardBase.Positioner>
      </PreviewCardBase.Portal>
    );
  },
);
