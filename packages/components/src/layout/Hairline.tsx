"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export interface HairlineProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
}

/**
 * Free-flow rule for editorial / hairline rhythm. Unlike `Divider`, this does
 * not reserve a structural grid band or participate in section snap.
 */
export const Hairline = forwardRef<HTMLHRElement, HairlineProps>(
  function Hairline(
    { orientation = "horizontal", className, style, ...props },
    ref,
  ) {
    const isHorizontal = orientation === "horizontal";
    return (
      <hr
        ref={ref}
        aria-orientation={orientation}
        data-slot="hairline"
        className={cn("border-0 shrink-0", className)}
        style={{
          width: isHorizontal ? "100%" : "var(--s-rhythm-hairline-width, 1px)",
          height: isHorizontal ? "var(--s-rhythm-hairline-width, 1px)" : "100%",
          marginBlock: isHorizontal
            ? "var(--s-rhythm-hairline-spacing, var(--s-divider-spacing, 0px))"
            : undefined,
          marginInline: isHorizontal
            ? undefined
            : "var(--s-rhythm-hairline-spacing, var(--s-divider-spacing, 0px))",
          background:
            "var(--s-divider-color, var(--s-grid-line-color, var(--s-border-muted)))",
          ...style,
        }}
        {...props}
      />
    );
  },
);
