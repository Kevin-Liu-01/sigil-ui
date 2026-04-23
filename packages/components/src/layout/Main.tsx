"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export interface MainProps extends HTMLAttributes<HTMLElement> {
  maxWidth?: string;
  center?: boolean;
}

export const Main = forwardRef<HTMLElement, MainProps>(function Main(
  { maxWidth, center = true, className, style, children, ...props },
  ref,
) {
  return (
    <main
      ref={ref}
      data-slot="main"
      className={cn("flex-1 min-w-0", center && "mx-auto w-full", className)}
      style={{
        maxWidth: maxWidth ?? "var(--s-content-max, 1200px)",
        paddingLeft: "var(--s-page-margin, 24px)",
        paddingRight: "var(--s-page-margin, 24px)",
        ...style,
      }}
      {...props}
    >
      {children}
    </main>
  );
});
