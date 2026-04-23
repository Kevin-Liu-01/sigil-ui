"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "../utils";

const sizeMap = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
  xl: "size-16 text-lg",
} as const;

export interface AvatarProps extends ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  src?: string;
  alt?: string;
  name?: string;
  fallback?: string;
  /** @default "md" */
  size?: keyof typeof sizeMap;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { src, alt, name, fallback, size = "md", className, ...props },
  ref,
) {
  const resolvedAlt = alt ?? name ?? "";
  const resolvedFallback =
    fallback ?? (name ? getInitials(name) : alt?.charAt(0)?.toUpperCase() ?? "?");

  return (
    <AvatarPrimitive.Root
      ref={ref}
      data-slot="avatar"
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-[var(--s-radius-avatar,9999px)]",
        sizeMap[size],
        className,
      )}
      {...props}
    >
      {src && (
        <AvatarPrimitive.Image
          data-slot="avatar-image"
          src={src}
          alt={resolvedAlt}
          className="aspect-square size-full object-cover"
        />
      )}
      <AvatarPrimitive.Fallback
        data-slot="avatar-fallback"
        className="flex size-full items-center justify-center bg-[var(--s-surface)] text-[var(--s-text-muted)] font-medium select-none"
      >
        {resolvedFallback}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
});

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: keyof typeof sizeMap;
  children: React.ReactNode;
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
