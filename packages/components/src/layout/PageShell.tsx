"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export interface PageShellProps extends HTMLAttributes<HTMLElement> {
  /** Constrain width further for reading-optimized layouts. */
  narrow?: boolean;
  /** Full-width inset mode — no outer padding, fills parent with flex-1. */
  inset?: boolean;
}

/**
 * Top-level `<main>` wrapper that centers content with token-driven max-width.
 * Use `inset` for full-bleed tool layouts inside an AppShell.
 */
export const PageShell = forwardRef<HTMLElement, PageShellProps>(
  function PageShell({ narrow, inset, className, children, ...rest }, ref) {
    return (
      <main
        ref={ref}
        data-slot="page-shell"
        className={cn(
          !inset &&
            "mx-auto w-[min(var(--s-content-max-width,1180px),calc(100vw-32px))] pt-22 pb-18 max-md:w-[min(100vw-20px,var(--s-content-max-width,1180px))] max-md:pt-21 max-md:pb-14",
          inset && "flex min-h-0 min-w-0 w-full flex-1 flex-col p-0",
          narrow &&
            !inset &&
            "w-[min(var(--s-content-narrow-width,720px),calc(100vw-32px))]",
          className,
        )}
        {...rest}
      >
        {children}
      </main>
    );
  },
);
