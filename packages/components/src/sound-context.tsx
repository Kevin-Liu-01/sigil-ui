"use client";

import { createContext, useContext, type ReactNode } from "react";

export type SigilSoundName =
  | "tap"
  | "click"
  | "toggle"
  | "success"
  | "error"
  | "hover"
  | "preset"
  | "slide"
  | "open"
  | "close"
  | "expand"
  | "nav"
  | "notify"
  | "delete"
  | string;

export type SigilSoundContextValue = {
  play: (name?: SigilSoundName) => void;
  enabled: boolean;
};

const noopValue: SigilSoundContextValue = { play: () => {}, enabled: false };

export const SigilSoundContext = createContext<SigilSoundContextValue>(noopValue);

export function SigilSoundProvider({
  children,
  value = noopValue,
}: {
  children: ReactNode;
  value?: SigilSoundContextValue;
}) {
  return (
    <SigilSoundContext.Provider value={value}>
      {children}
    </SigilSoundContext.Provider>
  );
}

export function useSigilSound(): SigilSoundContextValue {
  return useContext(SigilSoundContext);
}

