"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface FeatureFrameProps extends HTMLAttributes<HTMLDivElement> {
  /** Icon or visual element. */
  icon?: ReactNode;
  /** Feature title. */
  title: string;
  /** Feature description. */
  description?: string;
  children?: ReactNode;
}

/** Feature highlight frame with icon, title, and description. */
export const FeatureFrame = forwardRef<HTMLDivElement, FeatureFrameProps>(function FeatureFrame(
  { icon, title, description, className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="feature-frame"
      className={cn(
        "flex flex-col gap-3 p-6 rounded-[var(--s-card-radius,8px)]",
        "border border-[style:var(--s-border-style,solid)] border-[var(--s-border)] bg-[var(--s-surface)]",
        "transition-all duration-[var(--s-duration-normal,200ms)] hover:shadow-[var(--s-shadow-md)] hover:-translate-y-0.5",
        className,
      )}
      {...rest}
    >
      {icon && (
        <div className="flex items-center justify-center w-10 h-10 rounded-[var(--s-radius-md,6px)] bg-[var(--s-primary-muted)] text-[var(--s-primary)]">
          {icon}
        </div>
      )}
      <h3 className="text-base font-semibold text-[var(--s-text)]">{title}</h3>
      {description && (
        <p className="text-sm text-[var(--s-text-muted)] leading-relaxed">{description}</p>
      )}
      {children}
    </div>
  );
});
