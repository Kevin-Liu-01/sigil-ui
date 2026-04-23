"use client";

import { forwardRef, useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

// ---------------------------------------------------------------------------
// Size map
// ---------------------------------------------------------------------------
const sizeMap = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
  xl: "size-16 text-lg",
} as const;

// ---------------------------------------------------------------------------
// Avatar
// ---------------------------------------------------------------------------
export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  /** @default "md" */
  size?: keyof typeof sizeMap;
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
  { src, alt, fallback, size = "md", className, ...rest },
  ref,
) {
  const [imgError, setImgError] = useState(false);
  const showImage = src && !imgError;

  return (
    <div
      ref={ref}
      data-slot="avatar"
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-[var(--s-radius-avatar,9999px)]",
        sizeMap[size],
        className,
      )}
      {...rest}
    >
      {showImage ? (
        <img
          data-slot="avatar-image"
          src={src}
          alt={alt ?? ""}
          onError={() => setImgError(true)}
          className="aspect-square size-full object-cover"
        />
      ) : (
        <span
          data-slot="avatar-fallback"
          className="flex size-full items-center justify-center bg-[var(--s-surface)] text-[var(--s-text-muted)] text-sm font-medium select-none"
        >
          {fallback ?? alt?.charAt(0)?.toUpperCase() ?? "?"}
        </span>
      )}
    </div>
  );
});

// ---------------------------------------------------------------------------
// AvatarGroup
// ---------------------------------------------------------------------------
export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Max avatars to show before "+N" overflow badge. -1 = show all. @default -1 */
  max?: number;
  /** Size passed to child Avatars for the overflow badge. @default "md" */
  size?: keyof typeof sizeMap;
  children: ReactNode;
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  function AvatarGroup({ max = -1, size = "md", className, children, ...rest }, ref) {
    const childArray = Array.isArray(children) ? children : [children];
    const visible = max > 0 ? childArray.slice(0, max) : childArray;
    const overflow = max > 0 ? childArray.length - max : 0;

    return (
      <div
        ref={ref}
        data-slot="avatar-group"
        className={cn("flex -space-x-3", className)}
        {...rest}
      >
        {visible.map((child, i) => (
          <div key={i} className="ring-2 ring-[var(--s-background)] rounded-full">
            {child}
          </div>
        ))}
        {overflow > 0 && (
          <div
            className={cn(
              "relative flex shrink-0 items-center justify-center rounded-full",
              "bg-[var(--s-surface)] text-[var(--s-text-muted)] font-medium ring-2 ring-[var(--s-background)]",
              sizeMap[size],
            )}
          >
            +{overflow}
          </div>
        )}
      </div>
    );
  },
);
