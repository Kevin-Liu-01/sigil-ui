"use client";

import { createContext, useContext, type ReactNode } from "react";

export type SigilSoundName = "click" | "open" | "close" | "toggle" | string;
export type SigilSoundContextValue = { play: (name?: SigilSoundName) => void };

export const SigilSoundContext = createContext<SigilSoundContextValue>({ play: () => {} });

export function SigilSoundProvider({ children }: { children: ReactNode }) {
  return (
    <SigilSoundContext.Provider value={{ play: () => {} }}>
      {children}
    </SigilSoundContext.Provider>
  );
}

export function useSigilSound() {
  return useContext(SigilSoundContext);
}

