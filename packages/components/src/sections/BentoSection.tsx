"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";
import { SectionHeading } from "./SectionHeading";

export interface BentoCell {
  title?: string;
  description?: string;
  content?: ReactNode;
  span?: "1x1" | "2x1" | "1x2" | "2x2";
  className?: string;
}

export interface BentoSectionProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  label?: string;
  title?: ReactNode;
  description?: string;
  cells: BentoCell[];
}

const spanStyles: Record<string, string> = {
  "1x1": "",
  "2x1": "md:col-span-2",
  "1x2": "md:row-span-2",
  "2x2": "md:col-span-2 md:row-span-2",
};

export const BentoSection = forwardRef<HTMLElement, BentoSectionProps>(
  function BentoSection({ label, title, description, cells, className, ...props }, ref) {
    return (
      <section
        ref={ref}
        data-slot="bento-section"
        className={cn("border-t border-[var(--s-border)] py-[var(--s-section-py,64px)]", className)}
        {...props}
      >
        <div className="mx-auto max-w-[var(--s-content-max,1200px)] px-[var(--s-page-margin,24px)]">
          {title && <SectionHeading label={label} title={title} description={description} />}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cells.map((cell, i) => (
              <div
                key={i}
                className={cn(
                  "relative overflow-hidden p-6",
                  "rounded-[var(--s-radius-card,0px)]",
                  "border border-[var(--s-border-muted)] bg-[var(--s-surface)]",
                  "transition-colors duration-[var(--s-duration-fast,150ms)]",
                  "hover:border-[var(--s-border)]",
                  spanStyles[cell.span ?? "1x1"],
                  cell.className,
                )}
              >
                {cell.title && (
                  <h3 className="text-sm font-semibold text-[var(--s-text)] mb-1">{cell.title}</h3>
                )}
                {cell.description && (
                  <p className="text-xs leading-relaxed text-[var(--s-text-muted)] mb-4">{cell.description}</p>
                )}
                {cell.content && (
                  <div className="mt-auto">{cell.content}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  },
);
