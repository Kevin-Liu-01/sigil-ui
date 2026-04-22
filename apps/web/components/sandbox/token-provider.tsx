"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { SigilPreset, SigilTokens } from "@sigil-ui/tokens";
import { defaultTokens } from "@sigil-ui/tokens";
import { presets, type PresetName } from "@sigil-ui/presets";

type SigilTokensContextValue = {
  tokens: SigilTokens;
  activePreset: string;
  setPreset: (name: string) => Promise<void>;
  patchTokens: (
    category: keyof SigilTokens,
    key: string,
    value: unknown,
  ) => void;
};

const SigilTokensContext = createContext<SigilTokensContextValue | null>(null);

export function SigilTokensProvider({
  children,
  initialPreset,
  initialTokens,
}: {
  children: ReactNode;
  initialPreset?: string | SigilPreset;
  initialTokens?: SigilTokens;
}) {
  const resolvedName =
    typeof initialPreset === "string"
      ? initialPreset
      : initialPreset?.name ?? "sigil";

  const resolvedTokens =
    initialTokens ??
    (typeof initialPreset === "object" ? initialPreset?.tokens : undefined) ??
    defaultTokens;

  const [tokens, setTokens] = useState<SigilTokens>(resolvedTokens);
  const [activePreset, setActivePreset] = useState(resolvedName);

  const setPreset = useCallback(async (name: string) => {
    const loader = presets[name as PresetName];
    if (!loader) return;
    const preset = await loader();
    setTokens(preset.tokens);
    setActivePreset(name);
  }, []);

  const patchTokens = useCallback(
    (category: keyof SigilTokens, key: string, value: unknown) => {
      setTokens((prev) => ({
        ...prev,
        [category]: {
          ...(prev[category] as Record<string, unknown>),
          [key]: value,
        },
      }));
      setActivePreset((prev) => (prev.endsWith("*") ? prev : `${prev}*`));
    },
    [],
  );

  const ctx = useMemo<SigilTokensContextValue>(
    () => ({ tokens, activePreset, setPreset, patchTokens }),
    [tokens, activePreset, setPreset, patchTokens],
  );

  return (
    <SigilTokensContext.Provider value={ctx}>
      {children}
    </SigilTokensContext.Provider>
  );
}

export function useSigilTokens() {
  const ctx = useContext(SigilTokensContext);
  if (!ctx)
    throw new Error("useSigilTokens must be used within SigilTokensProvider");
  return ctx;
}

export const SigilTokenProvider = SigilTokensProvider;
