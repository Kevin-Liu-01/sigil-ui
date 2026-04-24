"use client";

import { useEffect, useRef, useState } from "react";

export interface UseInViewOptions {
  /** IntersectionObserver threshold (0–1). @default 0.15 */
  threshold?: number;
  /** Root margin string. @default "0px 0px -60px 0px" */
  rootMargin?: string;
  /** If true, stays visible once triggered. @default true */
  once?: boolean;
}

/**
 * Lightweight IntersectionObserver hook.
 * Returns a ref and a boolean indicating visibility.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {},
) {
  const { threshold = 0.15, rootMargin = "0px 0px -60px 0px", once = true } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}
