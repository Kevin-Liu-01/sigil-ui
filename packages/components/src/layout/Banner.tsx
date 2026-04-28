"use client";

import { forwardRef, useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export type BannerVariant = "info" | "warning" | "error" | "success" | "default";

export interface BannerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: BannerVariant;
  icon?: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const variantStyles: Record<BannerVariant, { bg: string; border: string; text: string }> = {
  default: { bg: "var(--s-surface)", border: "var(--s-border)", text: "var(--s-text)" },
  info: { bg: "var(--s-info-muted)", border: "var(--s-info)", text: "var(--s-info)" },
  warning: { bg: "var(--s-warning-muted)", border: "var(--s-warning)", text: "var(--s-warning)" },
  error: { bg: "var(--s-error-muted)", border: "var(--s-error)", text: "var(--s-error)" },
  success: { bg: "var(--s-success-muted)", border: "var(--s-success)", text: "var(--s-success)" },
};

export const Banner = forwardRef<HTMLDivElement, BannerProps>(function Banner(
  { variant = "default", icon, dismissible = false, onDismiss, className, children, ...props },
  ref,
) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const v = variantStyles[variant];

  return (
    <div
      ref={ref}
      data-slot="banner"
      role="status"
      className={cn(
        "flex items-center gap-[var(--s-banner-icon-gap,12px)]",
        "px-[var(--s-banner-padding-x,16px)] py-[var(--s-banner-padding-y,8px)]",
        "text-[length:var(--s-banner-font-size,0.875rem)] font-[var(--s-banner-font-weight,500)]",
        "rounded-[var(--s-banner-radius,0px)]",
        className,
      )}
      style={{
        backgroundColor: v.bg,
        borderBottom: `var(--s-banner-border-width, 1px) solid ${v.border}`,
        color: v.text,
      }}
      {...props}
    >
      {icon && <span className="shrink-0 [&_svg]:size-[var(--s-banner-icon-size,16px)]">{icon}</span>}
      <span className="flex-1 min-w-0">{children}</span>
      {dismissible && (
        <button
          type="button"
          onClick={() => { setDismissed(true); onDismiss?.(); }}
          className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
          aria-label="Dismiss"
        >
          <svg className="size-[var(--s-banner-dismiss-size,16px)]" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
});
