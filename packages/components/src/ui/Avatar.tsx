"use client";

import { forwardRef, useState, type HTMLAttributes } from "react";
import { cn } from "../utils";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  /** Image source URL. */
  src?: string;
  /** Alt text for the image. */
  alt?: string;
  /** Fallback initials when no image is available. */
  fallback?: string;
  /** Avatar size. @default "md" */
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeStyles: Record<string, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

/** Avatar with image support and initials fallback. */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
  { src, alt, fallback, size = "md", className, ...rest },
  ref,
) {
  const [imgError, setImgError] = useState(false);
  const showImage = src && !imgError;

  return (
    <div
      ref={ref}
      className={cn(
        "relative inline-flex items-center justify-center shrink-0 overflow-hidden rounded-full",
        "bg-[var(--s-surface-elevated)] border border-[var(--s-border)]",
        sizeStyles[size],
        className,
      )}
      {...rest}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt ?? ""}
          onError={() => setImgError(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="font-medium text-[var(--s-text-secondary)] select-none">
          {fallback ?? alt?.charAt(0)?.toUpperCase() ?? "?"}
        </span>
      )}
    </div>
  );
});
