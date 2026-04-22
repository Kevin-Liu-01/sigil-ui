"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  /** Breadcrumb trail items. The last item is treated as the current page. */
  items: BreadcrumbItem[];
  /** Separator character. @default "/" */
  separator?: ReactNode;
}

/** Breadcrumb navigation trail. */
export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(function Breadcrumb(
  { items, separator = "/", className, ...rest },
  ref,
) {
  return (
    <nav ref={ref} aria-label="Breadcrumb" className={cn("flex items-center", className)} {...rest}>
      <ol className="flex items-center gap-1.5 text-sm">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && (
                <span className="text-[var(--s-text-muted)] select-none" aria-hidden>
                  {separator}
                </span>
              )}
              {isLast || !item.href ? (
                <span
                  className={cn(
                    isLast ? "text-[var(--s-text)] font-medium" : "text-[var(--s-text-muted)]",
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="text-[var(--s-text-muted)] hover:text-[var(--s-text)] transition-colors"
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
});
