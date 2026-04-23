"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: boolean | "wrap" | "nowrap" | "wrap-reverse";
  gap?: number | string;
  inline?: boolean;
}

const alignMap: Record<string, string> = {
  start: "items-start", center: "items-center", end: "items-end",
  stretch: "items-stretch", baseline: "items-baseline",
};

const justifyMap: Record<string, string> = {
  start: "justify-start", center: "justify-center", end: "justify-end",
  between: "justify-between", around: "justify-around", evenly: "justify-evenly",
};

export const Flex = forwardRef<HTMLDivElement, FlexProps>(function Flex(
  { direction = "row", align, justify, wrap, gap, inline = false, className, style, children, ...props },
  ref,
) {
  const wrapClass = wrap === true || wrap === "wrap" ? "flex-wrap"
    : wrap === "wrap-reverse" ? "flex-wrap-reverse"
    : wrap === "nowrap" ? "flex-nowrap" : "";

  return (
    <div
      ref={ref}
      data-slot="flex"
      className={cn(
        inline ? "inline-flex" : "flex",
        direction === "column" && "flex-col",
        direction === "row-reverse" && "flex-row-reverse",
        direction === "column-reverse" && "flex-col-reverse",
        align && alignMap[align],
        justify && justifyMap[justify],
        wrapClass,
        className,
      )}
      style={{
        ...(gap !== undefined ? { gap: typeof gap === "number" ? `${gap}px` : gap } : {}),
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
});
