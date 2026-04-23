"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";
import { SectionHeading } from "./SectionHeading";

export interface TimelineEvent {
  date: string;
  title: string;
  description?: string;
  icon?: ReactNode;
}

export interface TimelineSectionProps extends HTMLAttributes<HTMLElement> {
  label?: string;
  title?: string;
  description?: string;
  events: TimelineEvent[];
}

export const TimelineSection = forwardRef<HTMLElement, TimelineSectionProps>(
  function TimelineSection({ label, title, description, events, className, ...props }, ref) {
    return (
      <section
        ref={ref}
        data-slot="timeline-section"
        className={cn("border-t border-[var(--s-border)] py-[var(--s-section-py,64px)]", className)}
        {...props}
      >
        <div className="mx-auto max-w-[var(--s-content-max-narrow,680px)] px-[var(--s-page-margin,24px)]">
          {title && <SectionHeading label={label} title={title} description={description} align="center" />}

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-[var(--s-border)]" />
            <div className="flex flex-col gap-8">
              {events.map((event, i) => (
                <div key={i} className="relative pl-12">
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-[var(--s-radius-full,9999px)] border-2 border-[var(--s-border)] bg-[var(--s-background)] flex items-center justify-center text-[var(--s-text-muted)] [&_svg]:size-3.5">
                    {event.icon ?? (
                      <div className="w-2 h-2 rounded-[var(--s-radius-full,9999px)] bg-[var(--s-primary)]" />
                    )}
                  </div>
                  <div className="text-xs font-medium text-[var(--s-text-muted)] font-[family-name:var(--s-font-mono)] mb-1">{event.date}</div>
                  <h3 className="text-sm font-semibold text-[var(--s-text)]">{event.title}</h3>
                  {event.description && (
                    <p className="mt-1 text-sm leading-relaxed text-[var(--s-text-muted)]">{event.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  },
);
