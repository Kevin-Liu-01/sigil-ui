"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export type AlertVariant = "default" | "destructive" | "success" | "warning" | "info";
export type AlertFill = "outline" | "filled" | "soft";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual variant controlling accent color and background. @default "default" */
  variant?: AlertVariant;
  /** Fill style. "outline" = border only, "filled" = solid bg, "soft" = tinted bg. @default "outline" */
  fill?: AlertFill;
  /** Callback to render a close button. When provided, an X button appears. */
  onClose?: () => void;
  children?: ReactNode;
}

export interface AlertTitleProps
  extends HTMLAttributes<HTMLHeadingElement> {}

export interface AlertDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {}

const colorMap: Record<AlertVariant, { border: string; text: string; bg: string; softBg: string }> = {
  default:     { border: "var(--s-border)",      text: "var(--s-text)",    bg: "var(--s-surface)",              softBg: "var(--s-surface)" },
  destructive: { border: "var(--s-error)",        text: "var(--s-error)",   bg: "var(--s-error)",                softBg: "color-mix(in oklch, var(--s-error) 8%, transparent)" },
  success:     { border: "var(--s-success)",      text: "var(--s-success)", bg: "var(--s-success)",              softBg: "color-mix(in oklch, var(--s-success) 8%, transparent)" },
  warning:     { border: "var(--s-warning)",      text: "var(--s-warning)", bg: "var(--s-warning)",              softBg: "color-mix(in oklch, var(--s-warning) 8%, transparent)" },
  info:        { border: "var(--s-info)",         text: "var(--s-info)",    bg: "var(--s-info)",                 softBg: "color-mix(in oklch, var(--s-info) 8%, transparent)" },
};

function alertStyles(variant: AlertVariant, fill: AlertFill): { className: string; style: Record<string, string> } {
  const c = colorMap[variant];
  switch (fill) {
    case "filled":
      return {
        className: "[&>svg]:text-[var(--s-primary-contrast)]",
        style: { borderColor: c.bg, backgroundColor: c.bg, color: "var(--s-primary-contrast)" },
      };
    case "soft":
      return {
        className: `[&>svg]:text-[${c.text}]`,
        style: { borderColor: "transparent", backgroundColor: c.softBg, color: c.text },
      };
    case "outline":
    default:
      return {
        className: `[&>svg]:text-[${c.text}]`,
        style: { borderColor: c.border, color: c.text },
      };
  }
}

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
  { variant = "default", fill = "outline", onClose, className, children, style: styleProp, ...rest },
  ref,
) {
  const { className: variantClass, style: variantStyle } = alertStyles(variant, fill);

  return (
    <div
      ref={ref}
      role="alert"
      data-slot="alert"
      data-variant={variant}
      data-fill={fill}
      className={cn(
        "relative w-full rounded-[var(--s-radius-md,0px)] border border-[style:var(--s-border-style,solid)] p-4 text-sm",
        "[&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-current [&:has(svg)]:pl-11",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([data-icon])]:size-4",
        variantClass,
        onClose && "pr-10",
        className,
      )}
      style={{ ...variantStyle, ...styleProp }}
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
            "focus-visible:outline-none focus-visible:ring-[length:var(--s-focus-ring-width)] focus-visible:ring-[var(--s-focus-ring-color)] focus-visible:ring-offset-[var(--s-focus-ring-offset)]",
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
