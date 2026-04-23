"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  /** Column definitions for the footer link grid. */
  columns?: FooterColumn[];
  children?: ReactNode;
}

/** Site footer with multi-column link layout. */
export const Footer = forwardRef<HTMLElement, FooterProps>(function Footer(
  { columns, className, children, ...rest },
  ref,
) {
  return (
    <footer
      ref={ref}
      data-slot="footer"
      className={cn(
        "w-full border-t border-[var(--s-border)] border-[style:var(--s-border-style,solid)] bg-[var(--s-surface)]",
        "px-6 py-[var(--s-footer-py,48px)]",
        className,
      )}
      {...rest}
    >
      {columns && columns.length > 0 && (
        <div
          className="grid gap-8 mb-8"
          style={{
            gridTemplateColumns: `repeat(${Math.min(columns.length, 4)}, minmax(0, 1fr))`,
          }}
        >
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-[var(--s-text)] mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-[var(--s-text-muted)] hover:text-[var(--s-text)] transition-colors duration-[var(--s-duration-fast,150ms)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      {children}
    </footer>
  );
});
