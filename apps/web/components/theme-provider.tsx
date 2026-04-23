"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute={["class", "data-theme"]}
      defaultTheme="dark"
      storageKey="sigil-theme"
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
