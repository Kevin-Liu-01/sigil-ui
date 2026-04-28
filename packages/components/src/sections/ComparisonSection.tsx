"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";
import { SectionHeading } from "./SectionHeading";

export interface ComparisonFeature {
  name: string;
  us: boolean | string;
  them: boolean | string;
}

export interface ComparisonSectionProps extends HTMLAttributes<HTMLElement> {
  label?: string;
  title?: string;
  description?: string;
  usLabel?: string;
  themLabel?: string;
  features: ComparisonFeature[];
}

export const ComparisonSection = forwardRef<HTMLElement, ComparisonSectionProps>(
  function ComparisonSection({ label, title = "How we compare", description, usLabel = "Us", themLabel = "Others", features, className, ...props }, ref) {
    const renderCell = (val: boolean | string) => {
      if (typeof val === "string") return <span className="text-sm text-[var(--s-text)]">{val}</span>;
      return val ? (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-[var(--s-success)]" aria-label="Yes">
          <path d="M5 9l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-[var(--s-text-subtle)]" aria-label="No">
          <path d="M6 6l6 6M12 6l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    };

    return (
      <section
        ref={ref}
        data-slot="comparison-section"
        className={cn("py-[var(--s-section-py,64px)]", className)}
        {...props}
      >
        <div className="mx-auto max-w-[var(--s-content-max-narrow,680px)] px-[var(--s-page-margin,24px)]">
          {title && <SectionHeading label={label} title={title} description={description} align="center" />}

          <div className="border border-[var(--s-border)] rounded-[var(--s-radius-card,0px)] overflow-hidden">
            <div className="grid grid-cols-3 bg-[var(--s-surface)] border-b border-[var(--s-border)]">
              <div className="p-3 text-sm text-[var(--s-text-muted)]">Feature</div>
              <div className="p-3 text-sm font-semibold text-[var(--s-text)] text-center">{usLabel}</div>
              <div className="p-3 text-sm text-[var(--s-text-muted)] text-center">{themLabel}</div>
            </div>
            {features.map((f, i) => (
              <div key={i} className={cn("grid grid-cols-3 border-b border-[var(--s-border-muted)] last:border-b-0", i % 2 === 0 ? "bg-[var(--s-background)]" : "bg-[var(--s-surface)]")}>
                <div className="p-3 text-sm text-[var(--s-text)]">{f.name}</div>
                <div className="p-3 flex items-center justify-center">{renderCell(f.us)}</div>
                <div className="p-3 flex items-center justify-center">{renderCell(f.them)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  },
);
