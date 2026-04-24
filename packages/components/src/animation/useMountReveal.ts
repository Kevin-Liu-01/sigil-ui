"use client";

import { useEffect, useState } from "react";

export function useMountReveal(enabled = true): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setMounted(false);
      return;
    }

    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, [enabled]);

  return mounted;
}
