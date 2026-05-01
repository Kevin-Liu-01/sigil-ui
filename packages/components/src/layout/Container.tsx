"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Width variant. @default "default" */
  size?: "narrow" | "default" | "wide";
  /** Center the container. @default true */
  center?: boolean;
}

const maxWidthMap = {
  narrow: "var(--s-content-max-narrow, 680px)",
  default: "var(--s-content-max, 1200px)",
  wide: "var(--s-content-max-wide, 1400px)",
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { size = "default", center = true, className, style, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="container"
      className={cn("w-full", center && "mx-auto", className)}
      style={{
        maxWidth: maxWidthMap[size],
        paddingLeft: "var(--s-page-margin, 1.5625rem)",
        paddingRight: "var(--s-page-margin, 1.5625rem)",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
});
