"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";
import { SectionHeading } from "./SectionHeading";

export interface TestimonialItem {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: string;
}

export interface TestimonialsSectionProps extends HTMLAttributes<HTMLElement> {
  label?: string;
  title?: string;
  description?: string;
  testimonials: TestimonialItem[];
  columns?: 2 | 3;
}

export const TestimonialsSection = forwardRef<HTMLElement, TestimonialsSectionProps>(
  function TestimonialsSection({ label, title, description, testimonials, columns = 3, className, ...props }, ref) {
    return (
      <section
        ref={ref}
        data-slot="testimonials-section"
        className={cn("border-t border-[var(--s-border)] py-[var(--s-section-py,64px)]", className)}
        {...props}
      >
        <div className="mx-auto max-w-[var(--s-content-max,1200px)] px-[var(--s-page-margin,24px)]">
          {title && <SectionHeading label={label} title={title} description={description} align="center" />}

          <div className={cn("grid grid-cols-1 gap-6", columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3")}>
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="flex flex-col gap-4 p-6 rounded-[var(--s-radius-card,0px)] border border-[var(--s-border-muted)] bg-[var(--s-surface)]"
              >
                <svg width="24" height="18" viewBox="0 0 24 18" fill="none" className="text-[var(--s-text-subtle)] shrink-0" aria-hidden>
                  <path d="M0 18V7.2C0 2.88 3.12 0.36 7.2 0L8.4 2.76C5.88 3.24 4.56 4.8 4.32 6.84H7.2V18H0ZM13.2 18V7.2C13.2 2.88 16.32 0.36 20.4 0L21.6 2.76C19.08 3.24 17.76 4.8 17.52 6.84H20.4V18H13.2Z" fill="currentColor" />
                </svg>
                <p className="text-sm leading-relaxed text-[var(--s-text)] flex-1">{t.quote}</p>
                <div className="flex items-center gap-3 pt-2 border-t border-[var(--s-border-muted)]">
                  {t.avatar ? (
                    <img src={t.avatar} alt={t.author} className="w-8 h-8 rounded-[var(--s-radius-full,9999px)] object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-[var(--s-radius-full,9999px)] bg-[var(--s-primary-muted)] flex items-center justify-center text-xs font-semibold text-[var(--s-primary)]">
                      {t.author.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-medium text-[var(--s-text)]">{t.author}</div>
                    {(t.role || t.company) && (
                      <div className="text-xs text-[var(--s-text-muted)]">{[t.role, t.company].filter(Boolean).join(" at ")}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  },
);
