"use client";

import { createContext, useContext, type ReactNode } from "react";

type Dir = "ltr" | "rtl";

const DirectionContext = createContext<Dir>("ltr");

export interface DirectionProviderProps {
  dir: Dir;
  children: ReactNode;
}

export function DirectionProvider({ dir, children }: DirectionProviderProps) {
  return (
    <DirectionContext.Provider value={dir}>
      <div dir={dir}>{children}</div>
    </DirectionContext.Provider>
  );
}

export function useDirection(): Dir {
  return useContext(DirectionContext);
}
