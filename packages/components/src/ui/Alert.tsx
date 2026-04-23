"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual variant controlling accent color and background. @default "default" */
  variant?: "default" | "destructive" | "success" | "warning" | "info";
  /** Callback to render a close button. When provided, an X button appears. */
  onClose?: () => void;
  children?: ReactNode;
}

export interface AlertTitleProps
  extends HTMLAttributes<HTMLHeadingElement> {}

export interface AlertDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {}

const variantStyles: Record<string, string> = {
  default:
    "border-[var(--s-border)] text-[var(--s-text)] [&>svg]:text-[var(--s-text)]",
  destructive:
    "border-[var(--s-error)]/50 text-[var(--s-error)] [&>svg]:text-[var(--s-error)]",
  success:
    "border-[var(--s-success)]/50 text-[var(--s-success)] [&>svg]:text-[var(--s-success)]",
  warning:
    "border-[var(--s-warning)]/50 text-[var(--s-warning)] [&>svg]:text-[var(--s-warning)]",
  info: "border-[var(--s-info)]/50 text-[var(--s-info)] [&>svg]:text-[var(--s-info)]",
};

function XIcon() {
  return (
    <svg
      data-icon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { variant = "default", onClose, className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      role="alert"
      data-slot="alert"
      className={cn(
        "relative w-full rounded-[var(--s-radius-md,2px)] border border-[var(--s-border)] px-4 py-3 text-sm",
        "[&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-current [&:has(svg)]:pl-11",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([data-icon])]:size-4",
        variantStyles[variant],
        onClose && "pr-10",
        className,
      )}
      {...rest}
    >
      {children}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className={cn(
            "absolute right-3 top-3 rounded-[var(--s-radius-sm,0px)] opacity-70",
            "transition-opacity hover:opacity-100",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-ring,var(--s-primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--s-ring-offset,var(--s-background))]",
          )}
        >
          <XIcon />
          <span className="sr-only">Close</span>
        </button>
      )}
    </div>
  );
});

export const AlertTitle = forwardRef<HTMLHeadingElement, AlertTitleProps>(
  function AlertTitle({ className, ...rest }, ref) {
    return (
      <h5
        ref={ref}
        data-slot="alert-title"
        className={cn(
          "mb-1 font-medium leading-none tracking-tight",
          className,
        )}
        {...rest}
      />
    );
  },
);

export const AlertDescription = forwardRef<
  HTMLParagraphElement,
  AlertDescriptionProps
>(function AlertDescription({ className, ...rest }, ref) {
  return (
    <div
      ref={ref}
      data-slot="alert-description"
      className={cn(
        "text-sm [&_p]:leading-relaxed",
        className,
      )}
      {...rest}
    />
  );
});
