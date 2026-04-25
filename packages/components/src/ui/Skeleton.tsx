"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export type SkeletonVariant =
  | "text"
  | "heading"
  | "avatar"
  | "card"
  | "image"
  | "button"
  | "badge"
  | "default";

const VARIANT_STYLES: Record<SkeletonVariant, string> = {
  text:    "h-4 w-full rounded-[var(--s-radius-sm,4px)]",
  heading: "h-8 w-3/4 rounded-[var(--s-radius-md,6px)]",
  avatar:  "h-10 w-10 rounded-[var(--s-radius-full)]",
  card:    "h-48 w-full rounded-[var(--s-radius-lg,12px)]",
  image:   "h-40 w-full rounded-[var(--s-radius-md,6px)]",
  button:  "h-10 w-24 rounded-[var(--s-radius-md,6px)]",
  badge:   "h-5 w-16 rounded-[var(--s-radius-full)]",
  default: "",
};

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Shape / size preset. @default "default" */
  variant?: SkeletonVariant;
}

/** Loading skeleton placeholder with pulse animation and variant presets. */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton({ variant = "default", className, style, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="skeleton"
        aria-hidden
        className={cn(
          "animate-pulse bg-[var(--s-component-surface-border-muted)]",
          VARIANT_STYLES[variant],
          className,
        )}
        style={{
          animationDuration: "var(--s-duration-slow)",
          ...style,
        }}
        {...rest}
      />
    );
  },
);
