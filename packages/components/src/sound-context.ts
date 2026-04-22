"use client";

import { createContext, useContext } from "react";

export type SigilSoundName =
  | "tap"
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
  | "delete";

export type SigilSoundContextValue = {
  play: (name: SigilSoundName) => void;
  enabled: boolean;
};

export const SigilSoundContext = createContext<SigilSoundContextValue | null>(null);

export function useSigilSound(): SigilSoundContextValue {
  const ctx = useContext(SigilSoundContext);
  if (!ctx) return { play: () => {}, enabled: false };
  return ctx;
}
