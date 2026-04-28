"use client";

import { forwardRef, useState, type HTMLAttributes } from "react";
import { cn } from "../utils";
import { SectionHeading } from "./SectionHeading";

export interface CodeTab {
  label: string;
  language?: string;
  code: string;
}

export interface CodeShowcaseSectionProps extends HTMLAttributes<HTMLElement> {
  label?: string;
  title?: string;
  description?: string;
  tabs: CodeTab[];
}

export const CodeShowcaseSection = forwardRef<HTMLElement, CodeShowcaseSectionProps>(
  function CodeShowcaseSection({ label, title, description, tabs, className, ...props }, ref) {
    const [active, setActive] = useState(0);

    return (
      <section
        ref={ref}
        data-slot="code-showcase-section"
        className={cn("py-[var(--s-section-py,64px)]", className)}
        {...props}
      >
        <div className="mx-auto max-w-[var(--s-content-max-narrow,680px)] px-[var(--s-page-margin,24px)]">
          {title && <SectionHeading label={label} title={title} description={description} align="center" />}

          <div className="rounded-[var(--s-radius-card,0px)] border border-[var(--s-border)] overflow-hidden">
            {tabs.length > 1 && (
              <div className="flex border-b border-[var(--s-border)] bg-[var(--s-surface)]">
                {tabs.map((tab, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    className={cn(
                      "px-4 py-2 text-xs font-medium font-[family-name:var(--s-font-mono)] transition-colors",
                      active === i
                        ? "text-[var(--s-text)] border-b-2 border-[var(--s-primary)]"
                        : "text-[var(--s-text-muted)] hover:text-[var(--s-text)]",
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}
            <pre className="p-4 overflow-x-auto bg-[var(--s-surface-sunken,var(--s-surface))] text-sm leading-relaxed font-[family-name:var(--s-font-mono)] text-[var(--s-text)]">
              <code>{tabs[active]?.code ?? ""}</code>
            </pre>
          </div>
        </div>
      </section>
    );
  },
);
