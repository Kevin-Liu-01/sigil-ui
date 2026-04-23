"use client";

import { forwardRef, createElement, type HTMLAttributes, type ElementType } from "react";
import { cn } from "../utils";

export interface BoxProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  bg?: string;
  borderColor?: string;
  radius?: string;
  shadow?: string;
  p?: number | string;
  px?: number | string;
  py?: number | string;
  m?: number | string;
  mx?: number | string;
  my?: number | string;
}

function toSize(v: number | string | undefined): string | undefined {
  if (v === undefined) return undefined;
  return typeof v === "number" ? `${v}px` : v;
}

export const Box = forwardRef<HTMLElement, BoxProps>(function Box(
  { as: Tag = "div", bg, borderColor, radius, shadow, p, px, py, m, mx, my, className, style, children, ...props },
  ref,
) {
  const computed: React.CSSProperties = {
    ...(bg ? { background: bg.startsWith("var(") || bg.startsWith("#") || bg.startsWith("rgb") ? bg : `var(--s-${bg})` } : {}),
    ...(borderColor ? { borderColor: borderColor.startsWith("var(") ? borderColor : `var(--s-${borderColor})` } : {}),
    ...(radius ? { borderRadius: radius.startsWith("var(") ? radius : `var(--s-radius-${radius})` } : {}),
    ...(shadow ? { boxShadow: shadow.startsWith("var(") ? shadow : `var(--s-shadow-${shadow})` } : {}),
    ...(p !== undefined ? { padding: toSize(p) } : {}),
    ...(px !== undefined ? { paddingLeft: toSize(px), paddingRight: toSize(px) } : {}),
    ...(py !== undefined ? { paddingTop: toSize(py), paddingBottom: toSize(py) } : {}),
    ...(m !== undefined ? { margin: toSize(m) } : {}),
    ...(mx !== undefined ? { marginLeft: toSize(mx), marginRight: toSize(mx) } : {}),
    ...(my !== undefined ? { marginTop: toSize(my), marginBottom: toSize(my) } : {}),
    ...style,
  };

  return createElement(
    Tag,
    { ref, "data-slot": "box", className: cn(className), style: computed, ...props },
    children,
  );
});
