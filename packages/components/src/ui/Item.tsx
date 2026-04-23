"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface ItemProps extends HTMLAttributes<HTMLDivElement> {
  media?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  /** Orientation of media relative to content. @default "horizontal" */
  orientation?: "horizontal" | "vertical";
}

export const Item = forwardRef<HTMLDivElement, ItemProps>(function Item(
  { media, title, description, action, orientation = "horizontal", className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="item"
      className={cn(
        "flex gap-3",
        orientation === "vertical" ? "flex-col" : "flex-row items-start",
        className,
      )}
      {...props}
    >
      {media && (
        <div
          data-slot="item-media"
          className={cn(
            "flex shrink-0 items-center justify-center",
            "[&>img]:rounded-[var(--s-radius-md,6px)] [&>img]:object-cover",
            "[&>svg]:size-5 [&>svg]:text-[var(--s-text-muted)]",
          )}
        >
          {media}
        </div>
      )}
      <div className="flex flex-1 flex-col gap-1 min-w-0">
        {title && (
          <div data-slot="item-title" className="text-sm font-medium text-[var(--s-text)] truncate">
            {title}
          </div>
        )}
        {description && (
          <div data-slot="item-description" className="text-sm text-[var(--s-text-muted)] line-clamp-2">
            {description}
          </div>
        )}
        {children}
      </div>
      {action && (
        <div data-slot="item-action" className="flex shrink-0 items-center">
          {action}
        </div>
      )}
    </div>
  );
});

export interface ItemGroupProps extends HTMLAttributes<HTMLDivElement> {}

export const ItemGroup = forwardRef<HTMLDivElement, ItemGroupProps>(function ItemGroup(
  { className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="item-group"
      role="list"
      className={cn(
        "flex flex-col divide-y divide-[var(--s-border)]",
        "[&>[data-slot=item]]:py-3 [&>[data-slot=item]:first-child]:pt-0 [&>[data-slot=item]:last-child]:pb-0",
        className,
      )}
      {...props}
    />
  );
});
