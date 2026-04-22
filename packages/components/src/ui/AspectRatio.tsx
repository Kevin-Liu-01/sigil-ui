"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  ratio?: number;
}

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(function AspectRatio(
  { ratio = 16 / 9, className, style, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn("relative w-full overflow-hidden", className)}
      style={{ paddingBottom: `${(1 / ratio) * 100}%`, ...style }}
      {...rest}
    >
      <div className="absolute inset-0">{children}</div>
    </div>
  );
});
