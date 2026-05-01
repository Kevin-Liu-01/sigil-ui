"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export interface NewsletterSectionProps extends Omit<HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  title?: string;
  description?: string;
  placeholder?: string;
  buttonLabel?: string;
  onSubmit?: (email: string) => void;
}

export const NewsletterSection = forwardRef<HTMLElement, NewsletterSectionProps>(
  function NewsletterSection({ title = "Stay updated", description = "Get the latest news delivered to your inbox.", placeholder = "you@example.com", buttonLabel = "Subscribe", onSubmit, className, ...props }, ref) {
    return (
      <section
        ref={ref}
        data-slot="newsletter-section"
        className={cn("py-[var(--s-section-py,64px)]", className)}
        {...props}
      >
        <div className="mx-auto max-w-md px-[var(--s-page-margin,24px)] text-center">
          <h2 className="font-[family-name:var(--s-font-display)] text-xl font-semibold text-[var(--s-text)]">{title}</h2>
          {description && <p className="mt-2 text-sm text-[var(--s-text-muted)]">{description}</p>}
          <form
            className="mt-6 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const input = form.elements.namedItem("email") as HTMLInputElement;
              onSubmit?.(input.value);
            }}
          >
            <input
              name="email"
              type="email"
              required
              placeholder={placeholder}
              className={cn(
                "flex-1 h-10 px-3 text-sm rounded-[var(--s-radius-input,0px)]",
                "border border-[color:var(--s-border)] bg-[var(--s-background)] text-[var(--s-text)]",
                "placeholder:text-[var(--s-text-muted)]",
                "focus:outline-none focus:border-[color:var(--s-input-focus-ring-color)] focus:ring-[length:var(--s-input-focus-ring-width)] focus:ring-[var(--s-input-focus-ring-color)]/20",
              )}
            />
            <button
              type="submit"
              className={cn(
                "h-10 px-5 text-sm font-medium rounded-[var(--s-radius-button,0px)]",
                "bg-[var(--s-primary)] text-[var(--s-primary-contrast)]",
                "hover:brightness-110 transition-all duration-[var(--s-duration-fast,150ms)]",
              )}
            >
              {buttonLabel}
            </button>
          </form>
        </div>
      </section>
    );
  },
);
