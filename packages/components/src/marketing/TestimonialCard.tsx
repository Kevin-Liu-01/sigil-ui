"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export type TestimonialCardProps = HTMLAttributes<HTMLDivElement> & {
  /** Quote text. */
  quote: string;
  /** Author name. */
  author: string;
  /** Author role / company. */
  role?: string;
  /** Avatar image URL. */
  avatar?: string;
};

/** Testimonial card with quote, author, and optional avatar. */
export const TestimonialCard = forwardRef<HTMLDivElement, TestimonialCardProps>(
  function TestimonialCard({ quote, author, role, avatar, className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-4 p-6 rounded-[var(--s-card-radius,8px)]",
          "border border-[style:var(--s-border-style,solid)] border-[var(--s-border)] bg-[var(--s-surface)] shadow-[var(--s-shadow-sm)]",
          className,
        )}
        {...rest}
      >
        <svg
          className="w-8 h-8 text-[var(--s-primary)] opacity-40"
          viewBox="0 0 32 32"
          fill="currentColor"
          aria-hidden
        >
          <path d="M4 20c0-4 2-8 8-12l2 2c-4 3-5 5-5 7h3c2 0 4 2 4 4s-2 4-4 4H8c-2 0-4-2-4-4zm16 0c0-4 2-8 8-12l2 2c-4 3-5 5-5 7h3c2 0 4 2 4 4s-2 4-4 4h-4c-2 0-4-2-4-4z" />
        </svg>
        <blockquote className="text-sm text-[var(--s-text)] leading-relaxed flex-1">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <div className="flex items-center gap-3 pt-2 border-t border-[style:var(--s-border-style,solid)] border-[var(--s-border)]">
          {avatar && (
            <img
              src={avatar}
              alt={author}
              className="w-10 h-10 rounded-full object-cover border border-[style:var(--s-border-style,solid)] border-[var(--s-border)]"
              loading="lazy"
            />
          )}
          <div>
            <div className="text-sm font-medium text-[var(--s-text)]">{author}</div>
            {role && <div className="text-xs text-[var(--s-text-muted)]">{role}</div>}
          </div>
        </div>
      </div>
    );
  },
);
