"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";
import { Box3D, type Box3DProps } from "./Box3D";

export interface Box3DGridItem extends Omit<Box3DProps, "children"> {
  /** Unique key for the item. */
  key: string;
  /** Content rendered inside the Box3D. */
  children?: ReactNode;
}

export interface Box3DGridProps extends HTMLAttributes<HTMLDivElement> {
  /** Items to display in the grid. */
  items: Box3DGridItem[];
  /** Number of columns. @default 3 */
  columns?: number;
  /** Gap between boxes. @default "1.5rem" */
  gap?: string | number;
}

/** Grid layout of 3D boxes. */
export const Box3DGrid = forwardRef<HTMLDivElement, Box3DGridProps>(function Box3DGrid(
  { items, columns = 3, gap = "1.5rem", className, style, ...rest },
  ref,
) {
  const resolvedGap = typeof gap === "number" ? `${gap}px` : gap;

  return (
    <div
      ref={ref}
      className={cn("grid", className)}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: resolvedGap,
        ...style,
      }}
      {...rest}
    >
      {items.map(({ key, children, ...boxProps }) => (
        <Box3D key={key} {...boxProps}>
          {children}
        </Box3D>
      ))}
    </div>
  );
});
