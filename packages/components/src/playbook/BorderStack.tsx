"use client";

import { forwardRef, Children, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface BorderStackProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Which borders to show. @default "between" */
  borders?: "between" | "all" | "none";
  /** Element type. @default "div" */
  as?: "div" | "main" | "article" | "section";
}

/**
 * Vertical stack of bordered bands — the Sigil section rhythm.
 *
 * Sections are separated by `border-t border-[var(--s-border)]`,
 * not by spacing or shadows. The page reads as a vertical stack
 * of bordered bands:
 *
 * ```
 * [nav]
 * ─── border ───
 * [hero]
 * ─── border ───
 * [features]
 * ─── border ───
 * [footer]
 * ```
 *
 * ```tsx
 * <BorderStack>
 *   <nav>...</nav>
 *   <section>Hero</section>
 *   <section>Features</section>
 *   <footer>...</footer>
 * </BorderStack>
 * ```
 */
export const BorderStack = forwardRef<HTMLDivElement, BorderStackProps>(
  function BorderStack(
    { borders = "between", as: Tag = "div", className, children, ...rest },
    ref,
  ) {
    const items = Children.toArray(children);

    if (borders === "none") {
      return (
        <Tag
          ref={ref}
          data-slot="border-stack"
          className={cn("flex flex-col", className)}
          {...rest}
        >
          {children}
        </Tag>
      );
    }

    return (
      <Tag
        ref={ref}
        data-slot="border-stack"
        className={cn("flex flex-col", className)}
        {...rest}
      >
        {items.map((child, i) => (
          <div
            key={i}
            className={cn(
              borders === "all" && "border-b border-[var(--s-border)]",
              borders === "all" && i === 0 && "border-t",
              borders === "between" && i > 0 && "border-t border-[var(--s-border)]",
            )}
          >
            {child}
          </div>
        ))}
      </Tag>
    );
  },
);
