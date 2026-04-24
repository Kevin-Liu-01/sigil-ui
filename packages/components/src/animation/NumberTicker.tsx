"use client";

import { forwardRef, useEffect, useRef, useState, type HTMLAttributes } from "react";
import { cn } from "../utils";
import { useInView, type UseInViewOptions } from "./useInView";
import { useReducedMotion } from "./useReducedMotion";

export interface NumberTickerProps extends HTMLAttributes<HTMLSpanElement> {
  /** Target value to count to. */
  value: number;
  /** Starting value. @default 0 */
  from?: number;
  /** Animation duration in ms. @default 1200 */
  duration?: number;
  /** Base delay in ms. @default 0 */
  delay?: number;
  /** Number of decimal places. @default 0 */
  decimals?: number;
  /** Prefix string (e.g. "$"). */
  prefix?: string;
  /** Suffix string (e.g. "%"). */
  suffix?: string;
  /** Use locale number formatting with separators. @default true */
  formatNumber?: boolean;
  trigger?: "scroll" | "mount";
  viewOptions?: UseInViewOptions;
}

function easeOutExpo(t: number): number {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export const NumberTicker = forwardRef<HTMLSpanElement, NumberTickerProps>(
  function NumberTicker(
    {
      value,
      from = 0,
      duration = 1200,
      delay = 0,
      decimals = 0,
      prefix = "",
      suffix = "",
      formatNumber = true,
      trigger = "scroll",
      viewOptions,
      className,
      ...rest
    },
    outerRef,
  ) {
    const reduced = useReducedMotion();
    const { ref: viewRef, inView } = useInView<HTMLSpanElement>(viewOptions);
    const visible = reduced || trigger === "mount" ? true : inView;
    const [display, setDisplay] = useState(from);
    const raf = useRef<number>(0);
    const started = useRef(false);

    const mergedRef = (el: HTMLSpanElement | null) => {
      (viewRef as React.MutableRefObject<HTMLSpanElement | null>).current = el;
      if (typeof outerRef === "function") outerRef(el);
      else if (outerRef) (outerRef as React.MutableRefObject<HTMLSpanElement | null>).current = el;
    };

    useEffect(() => {
      if (!visible || started.current) return;

      if (reduced) {
        setDisplay(value);
        started.current = true;
        return;
      }

      const timeout = setTimeout(() => {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = easeOutExpo(progress);
          setDisplay(from + (value - from) * eased);
          if (progress < 1) raf.current = requestAnimationFrame(tick);
        };
        raf.current = requestAnimationFrame(tick);
      }, delay);

      return () => {
        clearTimeout(timeout);
        cancelAnimationFrame(raf.current);
      };
    }, [visible, value, from, duration, delay, reduced]);

    const formatted = formatNumber
      ? display.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
      : display.toFixed(decimals);

    return (
      <span
        ref={mergedRef}
        data-slot="number-ticker"
        className={cn("sigil-number-ticker tabular-nums", className)}
        {...rest}
      >
        {prefix}{formatted}{suffix}
      </span>
    );
  },
);
