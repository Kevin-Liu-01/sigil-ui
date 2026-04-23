"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual variant controlling accent color and background. @default "default" */
  variant?: "default" | "destructive" | "success" | "warning" | "info";
  children?: ReactNode;
}

export interface AlertTitleProps extends HTMLAttributes<HTMLHeadingElement> {}
export interface AlertDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

const variantStyles: Record<string, string> = {
  default: "border-l-[var(--s-border-strong)] bg-[var(--s-surface-elevated)]",
  destructive: "border-l-[var(--s-error)] bg-[var(--s-error)]/8",
  success: "border-l-[var(--s-success)] bg-[var(--s-success)]/8",
  warning: "border-l-[var(--s-warning)] bg-[var(--s-warning)]/8",
  info: "border-l-[var(--s-info)] bg-[var(--s-info)]/8",
};

/** Contextual alert banner with variant-colored left accent border. */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { variant = "default", className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      role="alert"
      className={cn(
        "relative flex gap-3 w-full rounded-[var(--s-card-radius,8px)] border border-[var(--s-border)] border-[style:var(--s-border-style,solid)] border-l-4 p-4",
        "text-sm text-[var(--s-text)]",
        variantStyles[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

/** Alert heading rendered as an h5. */
export const AlertTitle = forwardRef<HTMLHeadingElement, AlertTitleProps>(
  function AlertTitle({ className, ...rest }, ref) {
    return (
      <h5
        ref={ref}
        className={cn("font-semibold leading-none tracking-tight text-[var(--s-text)]", className)}
        {...rest}
      />
    );
  },
);

/** Alert body text. */
export const AlertDescription = forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
  function AlertDescription({ className, ...rest }, ref) {
    return (
      <p
        ref={ref}
        className={cn("text-sm text-[var(--s-text-secondary)] [&_p]:leading-relaxed", className)}
        {...rest}
      />
    );
  },
);
