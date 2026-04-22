"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Enable hover lift effect. */
  hoverable?: boolean;
  children?: ReactNode;
}

/** Card container with optional hover elevation. */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { hoverable = false, className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-[var(--s-card-radius,8px)] border border-[var(--s-border)]",
        "bg-[var(--s-surface)] text-[var(--s-text)]",
        "shadow-[var(--s-shadow-sm)]",
        hoverable && "transition-all duration-200 hover:shadow-[var(--s-shadow-md)] hover:-translate-y-0.5",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

/** Card header section. */
export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardHeader({ className, ...rest }, ref) {
    return <div ref={ref} className={cn("flex flex-col gap-1.5 p-6", className)} {...rest} />;
  },
);

/** Card title. */
export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  function CardTitle({ className, children, ...rest }, ref) {
    return (
      <h3
        ref={ref}
        className={cn("text-lg font-semibold leading-none tracking-tight", className)}
        {...rest}
      >
        {children}
      </h3>
    );
  },
);

/** Card description text. */
export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  function CardDescription({ className, ...rest }, ref) {
    return (
      <p ref={ref} className={cn("text-sm text-[var(--s-text-muted)]", className)} {...rest} />
    );
  },
);

/** Card body content area. */
export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardContent({ className, ...rest }, ref) {
    return <div ref={ref} className={cn("p-6 pt-0", className)} {...rest} />;
  },
);

/** Card footer with action buttons. */
export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardFooter({ className, ...rest }, ref) {
    return (
      <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...rest} />
    );
  },
);
