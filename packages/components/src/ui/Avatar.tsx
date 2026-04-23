"use client";

import { Children, forwardRef, type ComponentPropsWithoutRef } from "react";
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
  { src, alt, name, fallback, size = "md", className, style, ...props },
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
        "relative inline-flex shrink-0 items-center justify-center border",
        sizeMap[size],
        className,
      )}
      style={{
        borderRadius: "9999px",
        overflow: "hidden",
        borderColor: "var(--s-border-muted)",
        ...style,
      }}
      {...props}
    >
      {src && (
        <AvatarPrimitive.Image
          data-slot="avatar-image"
          src={src}
          alt={resolvedAlt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "9999px",
          }}
        />
      )}
      <AvatarPrimitive.Fallback
        data-slot="avatar-fallback"
        className="flex size-full items-center justify-center select-none"
        style={{
          backgroundColor: "var(--s-surface)",
          color: "var(--s-text-muted)",
          fontWeight: 500,
          borderRadius: "9999px",
        }}
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
    const childArray = Children.toArray(children);
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
          <div
            key={i}
            style={{
              position: "relative",
              borderRadius: "9999px",
              boxShadow: "0 0 0 2px var(--avatar-group-ring, var(--s-surface))",
              zIndex: visible.length - i,
            }}
          >
            {child}
          </div>
        ))}
        {overflow > 0 && (
          <div
            className={cn(
              "relative inline-flex shrink-0 items-center justify-center",
              sizeMap[size],
            )}
            style={{
              borderRadius: "9999px",
              overflow: "hidden",
              aspectRatio: "1 / 1",
              backgroundColor: "var(--s-surface-elevated, var(--s-surface))",
              color: "var(--s-text-muted)",
              fontWeight: 500,
              border: "1px solid var(--s-border-muted)",
              boxShadow: "0 0 0 2px var(--avatar-group-ring, var(--s-surface))",
            }}
          >
            +{overflow}
          </div>
        )}
      </div>
    );
  },
);
