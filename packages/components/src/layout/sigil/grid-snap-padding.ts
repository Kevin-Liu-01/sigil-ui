"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { usePageGridConfig } from "./grid-context";
import { measureStructuralCellPx, splitCssPadding } from "./grid-helpers";

function addCssLength(value: CSSProperties["paddingTop"], add: string): string {
  const raw = value === undefined || value === "" ? "0px" : String(value);
  const base = raw.trim() === "0" ? "0px" : raw;
  return `calc(${base} + ${add})`;
}

/**
 * Adds extra vertical padding so the section's bottom edge (distance from the
 * sigil content column top) lands on the full structural cell rhythm. The snap
 * amount is split between top and bottom padding so content remains centered in
 * the expanded section instead of getting pinned toward the top.
 */
export function mergeSnapIntoPaddingStyle(
  base: CSSProperties,
  snapPx: number,
): CSSProperties {
  if (snapPx <= 0) return base;
  // Keep the total added padding exact while avoiding two independently
  // rasterized fractional halves. Top gets whole pixels, bottom absorbs the
  // fractional remainder so the section boundary remains grid-snapped.
  const topAdd = `${Math.floor(snapPx / 2)}px`;
  const bottomAdd = `${snapPx - Math.floor(snapPx / 2)}px`;
  if (base.padding !== undefined && typeof base.padding === "string") {
    const [t, r, b, l] = splitCssPadding(base.padding);
    return {
      ...base,
      padding: undefined,
      paddingTop: addCssLength(t, topAdd),
      paddingRight: r,
      paddingBottom: addCssLength(b, bottomAdd),
      paddingLeft: l,
    };
  }
  return {
    ...base,
    paddingTop: addCssLength(base.paddingTop, topAdd),
    paddingBottom: addCssLength(base.paddingBottom, bottomAdd),
  };
}

/**
 * Computes snap padding (px) so the section bottom aligns to the next full
 * resolved `--s-grid-cell` (px), from the top of `[data-layout="sigil-content"]`.
 */
export function useSnapBottomToGridPadding(
  enabled: boolean,
  sectionEl: HTMLElement | null,
): number {
  const [snapPx, setSnapPx] = useState(0);
  const snapPxRef = useRef(0);
  const gridConfig = usePageGridConfig();

  const updateSnap = (next: number) => {
    snapPxRef.current = next;
    setSnapPx((prev) => (Math.abs(prev - next) < 1e-6 ? prev : next));
  };

  useLayoutEffect(() => {
    if (!enabled || !sectionEl) {
      updateSnap(0);
      return;
    }

    const content = sectionEl.closest(
      "[data-layout='sigil-content']",
    ) as HTMLElement | null;
    if (!content) {
      updateSnap(0);
      return;
    }

    let cancelled = false;

    const measure = () => {
      if (cancelled) return;
      const G = measureStructuralCellPx();
      if (!(G > 0)) return;

      const ct = content.getBoundingClientRect().top;
      const mb = sectionEl.getBoundingClientRect().bottom;
      // Measure the un-snapped geometry. `mb` includes the snap padding from
      // the previous render; if we don't subtract it, ResizeObserver oscillates
      // between "needs padding" and "already padded, remove it".
      const baseSpan = mb - ct - snapPxRef.current;
      const snapped = Math.ceil(baseSpan / G - 1e-9) * G;
      const pad = Math.max(0, snapped - baseSpan);
      updateSnap(pad);
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(content);
    ro.observe(sectionEl);

    window.addEventListener("resize", measure);

    void document.fonts?.ready?.then(() => {
      requestAnimationFrame(measure);
    });

    const onLoad = () => measure();
    if (document.readyState === "complete") {
      requestAnimationFrame(measure);
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    return () => {
      cancelled = true;
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", onLoad);
    };
  }, [enabled, sectionEl, gridConfig?.gridCell]);

  return snapPx;
}
