"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export const H1 = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  function H1({ className, ...props }, ref) {
    return (
      <h1
        ref={ref}
        data-slot="h1"
        className={cn(
          "scroll-m-20 font-[var(--s-font-display,inherit)]",
          "text-[var(--s-heading-h1-size,2.25rem)] font-[var(--s-heading-h1-weight,800)]",
          "leading-[var(--s-heading-h1-leading,1.1)] tracking-[var(--s-heading-h1-tracking,-0.02em)]",
          "text-[var(--s-text)] text-balance",
          className,
        )}
        {...props}
      />
    );
  },
);

export const H2 = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  function H2({ className, ...props }, ref) {
    return (
      <h2
        ref={ref}
        data-slot="h2"
        className={cn(
          "scroll-m-20 font-[var(--s-font-display,inherit)]",
          "text-[var(--s-heading-h2-size,1.875rem)] font-[var(--s-heading-h2-weight,700)]",
          "leading-[var(--s-heading-h2-leading,1.15)] tracking-[var(--s-heading-h2-tracking,-0.01em)]",
          "text-[var(--s-text)] text-balance",
          "border-b border-[var(--s-border)] pb-2 first:mt-0",
          className,
        )}
        {...props}
      />
    );
  },
);

export const H3 = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  function H3({ className, ...props }, ref) {
    return (
      <h3
        ref={ref}
        data-slot="h3"
        className={cn(
          "scroll-m-20 font-[var(--s-font-display,inherit)]",
          "text-[var(--s-heading-h3-size,1.5rem)] font-[var(--s-heading-h3-weight,600)]",
          "leading-[var(--s-heading-h3-leading,1.2)] tracking-[var(--s-heading-h3-tracking,0)]",
          "text-[var(--s-text)]",
          className,
        )}
        {...props}
      />
    );
  },
);

export const H4 = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  function H4({ className, ...props }, ref) {
    return (
      <h4
        ref={ref}
        data-slot="h4"
        className={cn(
          "scroll-m-20 font-[var(--s-font-display,inherit)]",
          "text-[var(--s-heading-h4-size,1.25rem)] font-[var(--s-heading-h4-weight,600)]",
          "leading-[var(--s-heading-h4-leading,1.3)] tracking-[var(--s-heading-h4-tracking,0)]",
          "text-[var(--s-text)]",
          className,
        )}
        {...props}
      />
    );
  },
);

export const Paragraph = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  function Paragraph({ className, ...props }, ref) {
    return (
      <p
        ref={ref}
        data-slot="paragraph"
        className={cn(
          "leading-7 text-[var(--s-text)] [&:not(:first-child)]:mt-4",
          className,
        )}
        {...props}
      />
    );
  },
);

export const Lead = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  function Lead({ className, ...props }, ref) {
    return (
      <p
        ref={ref}
        data-slot="lead"
        className={cn("text-xl text-[var(--s-text-muted)]", className)}
        {...props}
      />
    );
  },
);

export const Large = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function Large({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="large"
        className={cn("text-lg font-semibold text-[var(--s-text)]", className)}
        {...props}
      />
    );
  },
);

export const Small = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  function Small({ className, ...props }, ref) {
    return (
      <small
        ref={ref}
        data-slot="small"
        className={cn("text-sm font-medium leading-none text-[var(--s-text)]", className)}
        {...props}
      />
    );
  },
);

export const Muted = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  function Muted({ className, ...props }, ref) {
    return (
      <p
        ref={ref}
        data-slot="muted"
        className={cn("text-sm text-[var(--s-text-muted)]", className)}
        {...props}
      />
    );
  },
);

export const InlineCode = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  function InlineCode({ className, ...props }, ref) {
    return (
      <code
        ref={ref}
        data-slot="inline-code"
        className={cn(
          "relative rounded-[var(--s-radius-sm,3px)] bg-[var(--s-surface)] px-[0.3rem] py-[0.2rem]",
          "font-mono text-sm font-semibold text-[var(--s-text)]",
          className,
        )}
        {...props}
      />
    );
  },
);

export const Blockquote = forwardRef<HTMLQuoteElement, HTMLAttributes<HTMLQuoteElement>>(
  function Blockquote({ className, ...props }, ref) {
    return (
      <blockquote
        ref={ref}
        data-slot="blockquote"
        className={cn(
          "border-l-2 border-[var(--s-border)] pl-6 italic text-[var(--s-text-muted)]",
          className,
        )}
        {...props}
      />
    );
  },
);
