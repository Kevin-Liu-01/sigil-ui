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
        "relative inline-flex shrink-0 items-center justify-center",
        sizeMap[size],
        className,
      )}
      style={{
        borderRadius: "var(--s-radius-avatar, 9999px)",
        overflow: "hidden",
        aspectRatio: "1 / 1",
        // Ring is rendered as a box-shadow ON THE AVATAR ITSELF so it
        // follows whatever border-radius the avatar actually has. By
        // default no ring; AvatarGroup activates it by setting the two
        // --avatar-ring-* custom properties on the wrapping div, which
        // cascade down to this element.
        boxShadow:
          "0 0 0 var(--avatar-ring-width, 0) var(--avatar-ring-color, transparent)",
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
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
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
          // Inherit the avatar's actual border-radius so the fallback
          // matches whatever shape the consumer applied.
          borderRadius: "inherit",
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
        className={cn("inline-flex items-center", className)}
        style={{ gap: 0 }}
        {...rest}
      >
        {visible.map((child, i) => (
          <div
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flex: "0 0 auto",
              width: "fit-content",
              height: "fit-content",
              position: "relative",
              zIndex: visible.length - i,
              marginLeft: i === 0 ? 0 : "-0.5rem",
              // Activate the ring on the inner Avatar via CSS variables
              // so the shadow follows the avatar's actual border-radius
              // (square, rounded, full pill, whatever) instead of being
              // baked to a circle on this wrapper.
              ["--avatar-ring-width" as string]: "2px",
              ["--avatar-ring-color" as string]:
                "var(--avatar-group-ring, var(--s-background))",
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
              borderRadius: "var(--s-radius-avatar, 9999px)",
              overflow: "hidden",
              backgroundColor: "var(--s-surface-elevated, var(--s-surface))",
              color: "var(--s-text-muted)",
              fontWeight: 500,
              boxShadow:
                "0 0 0 2px var(--avatar-group-ring, var(--s-background))",
              marginLeft: "-0.5rem",
              zIndex: 0,
            }}
          >
            +{overflow}
          </div>
        )}
      </div>
    );
  },
);
