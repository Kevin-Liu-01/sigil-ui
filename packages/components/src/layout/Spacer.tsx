"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export interface SpacerProps extends HTMLAttributes<HTMLDivElement> {
  /** Fixed height (block spacer). If omitted, grows to fill flex space. */
  height?: number | string;
  /** Fixed width (inline spacer). */
  width?: number | string;
}

export const Spacer = forwardRef<HTMLDivElement, SpacerProps>(function Spacer(
  { height, width, className, style, ...props },
  ref,
) {
  const isFixed = height !== undefined || width !== undefined;

  return (
    <div
      ref={ref}
      data-slot="spacer"
      aria-hidden
      className={cn(!isFixed && "flex-1", className)}
      style={{
        ...(height !== undefined ? { height: typeof height === "number" ? `${height}px` : height } : {}),
        ...(width !== undefined ? { width: typeof width === "number" ? `${width}px` : width } : {}),
        ...style,
      }}
      {...props}
    />
  );
});
