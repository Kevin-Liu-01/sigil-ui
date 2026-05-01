"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export interface AsideProps extends HTMLAttributes<HTMLElement> {
  width?: number | string;
  sticky?: boolean;
  borderSide?: "left" | "right" | "none";
}

export const Aside = forwardRef<HTMLElement, AsideProps>(function Aside(
  { width = 256, sticky = true, borderSide = "right", className, style, children, ...props },
  ref,
) {
  return (
    <aside
      ref={ref}
      data-slot="aside"
      className={cn(
        "shrink-0 overflow-y-auto",
        sticky && "sticky top-0 h-screen",
        borderSide === "left" && "border-l",
        borderSide === "right" && "border-r",
        borderSide !== "none" && "border-[color:var(--s-border)]",
        className,
      )}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        borderColor: "var(--s-border)",
        backgroundColor: "var(--s-surface)",
        ...style,
      }}
      {...props}
    >
      {children}
    </aside>
  );
});
