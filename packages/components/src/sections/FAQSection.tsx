"use client";

import { forwardRef, type HTMLAttributes } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "../utils";
import { SectionHeading } from "./SectionHeading";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSectionProps extends HTMLAttributes<HTMLElement> {
  label?: string;
  title?: string;
  description?: string;
  items: FAQItem[];
  columns?: 1 | 2;
}

export const FAQSection = forwardRef<HTMLElement, FAQSectionProps>(
  function FAQSection({ label = "FAQ", title = "Frequently asked questions", description, items, columns = 1, className, ...props }, ref) {
    return (
      <section
        ref={ref}
        data-slot="faq-section"
        className={cn("py-[var(--s-section-py,64px)]", className)}
        {...props}
      >
        <div className="mx-auto max-w-[var(--s-content-max,1200px)] px-[var(--s-page-margin,24px)]">
          <SectionHeading label={label} title={title} description={description} align={columns === 1 ? "center" : "left"} />

          <div className={cn("mx-auto", columns === 1 ? "max-w-2xl" : "grid md:grid-cols-2 gap-x-12 gap-y-0 max-w-4xl")}>
            <AccordionPrimitive.Root type="single" collapsible className="w-full">
              {items.map((item, i) => (
                <AccordionPrimitive.Item key={i} value={`faq-${i}`} className="border-b border-[var(--s-border)]">
                  <AccordionPrimitive.Header className="flex">
                    <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-4 text-sm font-medium text-[var(--s-text)] transition-all hover:underline [&[data-state=open]>svg]:rotate-180">
                      {item.question}
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 ml-2 text-[var(--s-text-muted)] transition-transform duration-[var(--s-duration-fast,150ms)]" aria-hidden>
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>
                  <AccordionPrimitive.Content className="overflow-hidden text-sm text-[var(--s-text-muted)] data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="pb-4 leading-relaxed">{item.answer}</div>
                  </AccordionPrimitive.Content>
                </AccordionPrimitive.Item>
              ))}
            </AccordionPrimitive.Root>
          </div>
        </div>
      </section>
    );
  },
);
