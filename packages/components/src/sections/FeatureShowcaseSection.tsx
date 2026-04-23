"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";
import { SectionHeading } from "./SectionHeading";

export interface FeatureShowcaseRow {
  label?: string;
  title: string;
  description: string;
  media: ReactNode;
  actions?: { label: string; href?: string }[];
}

export interface FeatureShowcaseSectionProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  label?: string;
  title?: ReactNode;
  description?: string;
  rows: FeatureShowcaseRow[];
}

export const FeatureShowcaseSection = forwardRef<HTMLElement, FeatureShowcaseSectionProps>(
  function FeatureShowcaseSection({ label, title, description, rows, className, ...props }, ref) {
    return (
      <section
        ref={ref}
        data-slot="feature-showcase-section"
        className={cn("border-t border-[var(--s-border)] py-[var(--s-section-py,64px)]", className)}
        {...props}
      >
        <div className="mx-auto max-w-[var(--s-content-max,1200px)] px-[var(--s-page-margin,24px)]">
          {title && <SectionHeading label={label} title={title} description={description} />}

          <div className="flex flex-col gap-20">
            {rows.map((row, i) => (
              <div
                key={i}
                className={cn(
                  "grid grid-cols-1 md:grid-cols-2 gap-12 items-center",
                  i % 2 === 1 && "md:[&>*:first-child]:order-2",
                )}
              >
                <div>
                  {row.label && (
                    <p className="font-[family-name:var(--s-font-mono)] text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[var(--s-primary)] mb-3">
                      {row.label}
                    </p>
                  )}
                  <h3 className="font-[family-name:var(--s-font-display)] text-2xl font-semibold leading-tight tracking-tight text-[var(--s-text)]">
                    {row.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--s-text-muted)]">
                    {row.description}
                  </p>
                  {row.actions && row.actions.length > 0 && (
                    <div className="mt-6 flex gap-3">
                      {row.actions.map((action, j) => (
                        <a
                          key={j}
                          href={action.href ?? "#"}
                          className={cn(
                            "inline-flex items-center gap-1 text-sm font-medium transition-colors duration-[var(--s-duration-fast,150ms)]",
                            j === 0
                              ? "text-[var(--s-primary)] hover:underline"
                              : "text-[var(--s-text-muted)] hover:text-[var(--s-text)]",
                          )}
                        >
                          {action.label}
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="ml-0.5" aria-hidden>
                            <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                <div className="rounded-[var(--s-radius-card,0px)] border border-[var(--s-border-muted)] bg-[var(--s-surface)] overflow-hidden">
                  {row.media}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  },
);
