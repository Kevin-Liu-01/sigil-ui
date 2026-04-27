"use client";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, type ReactNode } from "react";

type ThemeOverride = { setTheme: (theme: string) => void };
const ThemeOverrideCtx = createContext<ThemeOverride | null>(null);

function ThemeGate({ children }: { children: ReactNode }) {
  const { setTheme: rawSetTheme } = useTheme();
  const unlockFramesRef = useRef<number[]>([]);

  const cancelQueuedUnlock = useCallback(() => {
    for (const frame of unlockFramesRef.current) {
      cancelAnimationFrame(frame);
    }
    unlockFramesRef.current = [];
  }, []);

  const queueUnlock = useCallback((root: HTMLElement) => {
    cancelQueuedUnlock();
    const firstFrame = requestAnimationFrame(() => {
      const secondFrame = requestAnimationFrame(() => {
        root.removeAttribute("data-switching-theme");
        unlockFramesRef.current = [];
      });
      unlockFramesRef.current = [secondFrame];
    });
    unlockFramesRef.current = [firstFrame];
  }, [cancelQueuedUnlock]);

  useEffect(() => cancelQueuedUnlock, [cancelQueuedUnlock]);

  const setTheme = useCallback(
    (theme: string) => {
      const root = document.documentElement;
      const resolved =
        theme === "system"
          ? window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
          : theme;

      // Keep token-driven color transitions suppressed until next-themes has
      // synced its DOM writes. Transform/opacity animations keep running.
      root.setAttribute("data-switching-theme", "");

      root.classList.toggle("dark", resolved === "dark");
      root.classList.toggle("light", resolved === "light");
      root.setAttribute("data-theme", resolved);
      root.style.colorScheme = resolved;

      rawSetTheme(theme);
      queueUnlock(root);
    },
    [queueUnlock, rawSetTheme],
  );

  const value = useMemo(() => ({ setTheme }), [setTheme]);

  return (
    <ThemeOverrideCtx.Provider value={value}>
      {children}
    </ThemeOverrideCtx.Provider>
  );
}

export function useThemeSwitch() {
  const ctx = useContext(ThemeOverrideCtx);
  const fallback = useTheme();
  return ctx ? { ...fallback, setTheme: ctx.setTheme } : fallback;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute={["class", "data-theme"]}
      defaultTheme="dark"
      storageKey="sigil-theme"
    >
      <ThemeGate>{children}</ThemeGate>
    </NextThemesProvider>
  );
}
