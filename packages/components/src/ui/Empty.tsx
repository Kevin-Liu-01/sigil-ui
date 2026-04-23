"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface EmptyProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  title?: string;
  description?: string;
  action?: ReactNode;
}

export const Empty = forwardRef<HTMLDivElement, EmptyProps>(function Empty(
  { icon, title, description, action, className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="empty"
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-12 text-center",
        className,
      )}
      {...props}
    >
      {icon && (
        <div className="flex items-center justify-center text-[var(--s-text-muted)] [&>svg]:size-10">
          {icon}
        </div>
      )}
      {title && (
        <h3 className="text-base font-semibold text-[var(--s-text)]">{title}</h3>
      )}
      {description && (
        <p className="max-w-sm text-sm text-[var(--s-text-muted)]">{description}</p>
      )}
      {children}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
});
