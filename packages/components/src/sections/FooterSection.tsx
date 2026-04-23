"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

export interface FooterSectionProps extends HTMLAttributes<HTMLElement> {
  logo?: ReactNode;
  tagline?: string;
  groups: FooterLinkGroup[];
  socials?: { label: string; href: string; icon: ReactNode }[];
  copyright?: string;
  legal?: { label: string; href: string }[];
}

export const FooterSection = forwardRef<HTMLElement, FooterSectionProps>(
  function FooterSection({ logo, tagline, groups, socials, copyright, legal, className, ...props }, ref) {
    return (
      <footer
        ref={ref}
        data-slot="footer-section"
        className={cn("border-t border-[var(--s-border)] py-[var(--s-footer-py,48px)]", className)}
        {...props}
      >
        <div className="mx-auto max-w-[var(--s-content-max,1200px)] px-[var(--s-page-margin,24px)]">
          <div className="grid grid-cols-2 md:grid-cols-[1.5fr_repeat(auto-fit,1fr)] gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              {logo && <div className="mb-3 [&_svg]:h-6 [&_svg]:w-auto">{logo}</div>}
              {tagline && <p className="text-sm text-[var(--s-text-muted)] max-w-xs">{tagline}</p>}
              {socials && socials.length > 0 && (
                <div className="flex gap-3 mt-4">
                  {socials.map((s, i) => (
                    <a key={i} href={s.href} aria-label={s.label} className="text-[var(--s-text-muted)] hover:text-[var(--s-text)] transition-colors [&_svg]:size-5">
                      {s.icon}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {groups.map((group, i) => (
              <div key={i}>
                <h3 className="text-sm font-semibold text-[var(--s-text)] mb-3">{group.title}</h3>
                <ul className="flex flex-col gap-2">
                  {group.links.map((link, j) => (
                    <li key={j}>
                      <a href={link.href} className="text-sm text-[var(--s-text-muted)] hover:text-[var(--s-text)] transition-colors duration-[var(--s-duration-fast,150ms)]">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[var(--s-border-muted)]">
            {copyright && <span className="text-xs text-[var(--s-text-subtle)]">{copyright}</span>}
            {legal && legal.length > 0 && (
              <div className="flex gap-4">
                {legal.map((l, i) => (
                  <a key={i} href={l.href} className="text-xs text-[var(--s-text-subtle)] hover:text-[var(--s-text-muted)] transition-colors">
                    {l.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </footer>
    );
  },
);
