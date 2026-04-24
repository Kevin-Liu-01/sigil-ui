"use client";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";

type ThemeOverride = { setTheme: (theme: string) => void };
const ThemeOverrideCtx = createContext<ThemeOverride | null>(null);

function ThemeGate({ children }: { children: ReactNode }) {
  const { setTheme: rawSetTheme } = useTheme();

  const setTheme = useCallback(
    (theme: string) => {
      const root = document.documentElement;
      const resolved =
        theme === "system"
          ? window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
          : theme;

      // 1. Kill transitions
      root.setAttribute("data-switching-theme", "");

      // 2. Apply class + data-theme synchronously so every element's
      //    CSS custom properties update in one shot — no staggering.
      root.classList.toggle("dark", resolved === "dark");
      root.classList.toggle("light", resolved === "light");
      root.setAttribute("data-theme", resolved);

      // 3. Force a single synchronous reflow — the browser computes
      //    ALL new token values right now while transitions are killed.
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      root.offsetHeight;

      // 4. Re-enable transitions
      root.removeAttribute("data-switching-theme");

      // 5. Let next-themes sync its internal React state (DOM is
      //    already correct so this causes no visible change).
      rawSetTheme(theme);
    },
    [rawSetTheme],
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
