"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Enable hover lift effect. */
  hoverable?: boolean;
  children?: ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { hoverable = false, className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="card"
      className={cn(
        "flex flex-col gap-4 rounded-[var(--s-radius-card,0px)] border border-[var(--s-border)] bg-[var(--s-surface)] p-0 text-[var(--s-text)] shadow-sm",
        hoverable && "transition-all duration-[var(--s-duration-normal,200ms)] hover:shadow-[var(--s-shadow-md)] hover:-translate-y-0.5",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardHeader({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="card-header"
        className={cn(
          "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 p-6 pb-0",
          "has-data-[slot=card-action]:grid-cols-[1fr_auto]",
          "[.border-b]:pb-6",
          className,
        )}
        {...rest}
      />
    );
  },
);

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  function CardTitle({ className, children, ...rest }, ref) {
    return (
      <h3
        ref={ref}
        data-slot="card-title"
        className={cn("text-lg font-semibold leading-none tracking-tight text-[var(--s-text)]", className)}
        {...rest}
      >
        {children}
      </h3>
    );
  },
);

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  function CardDescription({ className, ...rest }, ref) {
    return (
      <p
        ref={ref}
        data-slot="card-description"
        className={cn("text-sm text-[var(--s-text-muted)]", className)}
        {...rest}
      />
    );
  },
);

export const CardAction = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardAction({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="card-action"
        className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
        {...rest}
      />
    );
  },
);

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardContent({ className, ...rest }, ref) {
    return <div ref={ref} data-slot="card-content" className={cn("p-6 pt-4", className)} {...rest} />;
  },
);

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardFooter({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="card-footer"
        className={cn("flex items-center p-6 pt-0 [.border-t]:pt-6", className)}
        {...rest}
      />
    );
  },
);
