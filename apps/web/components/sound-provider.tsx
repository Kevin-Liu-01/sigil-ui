"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { defineSound } from "@web-kits/audio";

type SoundDef = {
  source: { type: string; frequency: number | { start: number; end: number } };
  envelope: { attack?: number; decay: number; sustain?: number; release?: number };
  gain: number;
  delay?: number;
};

type SoundPatch = {
  tap: SoundDef | { layers: (SoundDef & { delay?: number })[] };
  toggle: SoundDef | { layers: (SoundDef & { delay?: number })[] };
  success: SoundDef | { layers: (SoundDef & { delay?: number })[] };
  error: SoundDef | { layers: (SoundDef & { delay?: number })[] };
  hover: SoundDef | { layers: (SoundDef & { delay?: number })[] };
  preset: SoundDef | { layers: (SoundDef & { delay?: number })[] };
};

const PATCHES: Record<string, SoundPatch> = {
  sigil: {
    tap: { source: { type: "sine", frequency: { start: 600, end: 400 } }, envelope: { decay: 0.04 }, gain: 0.25 },
    toggle: { source: { type: "triangle", frequency: { start: 500, end: 350 } }, envelope: { decay: 0.06 }, gain: 0.2 },
    success: { layers: [
      { source: { type: "triangle", frequency: 523 }, envelope: { decay: 0.15 }, gain: 0.2 },
      { source: { type: "triangle", frequency: 659 }, envelope: { decay: 0.15 }, gain: 0.2, delay: 0.08 },
    ] },
    error: { source: { type: "sawtooth", frequency: { start: 200, end: 120 } }, envelope: { decay: 0.15 }, gain: 0.15 },
    hover: { source: { type: "sine", frequency: { start: 800, end: 750 } }, envelope: { decay: 0.02 }, gain: 0.08 },
    preset: { layers: [
      { source: { type: "sine", frequency: 440 }, envelope: { decay: 0.1 }, gain: 0.15 },
      { source: { type: "sine", frequency: 554 }, envelope: { decay: 0.1 }, gain: 0.15, delay: 0.05 },
      { source: { type: "sine", frequency: 659 }, envelope: { decay: 0.15 }, gain: 0.15, delay: 0.1 },
    ] },
  },
  noir: {
    tap: { source: { type: "sine", frequency: { start: 300, end: 200 } }, envelope: { decay: 0.06 }, gain: 0.2 },
    toggle: { source: { type: "sine", frequency: { start: 250, end: 180 } }, envelope: { decay: 0.08 }, gain: 0.15 },
    success: { source: { type: "triangle", frequency: { start: 400, end: 350 } }, envelope: { attack: 0.02, decay: 0.2 }, gain: 0.18 },
    error: { source: { type: "square", frequency: { start: 150, end: 80 } }, envelope: { decay: 0.2 }, gain: 0.1 },
    hover: { source: { type: "sine", frequency: { start: 500, end: 480 } }, envelope: { decay: 0.015 }, gain: 0.05 },
    preset: { source: { type: "sine", frequency: { start: 350, end: 250 } }, envelope: { attack: 0.05, decay: 0.3 }, gain: 0.15 },
  },
  forge: {
    tap: { source: { type: "sawtooth", frequency: { start: 800, end: 500 } }, envelope: { decay: 0.03 }, gain: 0.2 },
    toggle: { source: { type: "square", frequency: { start: 600, end: 400 } }, envelope: { decay: 0.04 }, gain: 0.18 },
    success: { layers: [
      { source: { type: "sawtooth", frequency: 440 }, envelope: { decay: 0.08 }, gain: 0.15 },
      { source: { type: "sawtooth", frequency: 660 }, envelope: { decay: 0.1 }, gain: 0.15, delay: 0.04 },
    ] },
    error: { source: { type: "sawtooth", frequency: { start: 300, end: 100 } }, envelope: { decay: 0.1 }, gain: 0.2 },
    hover: { source: { type: "sawtooth", frequency: { start: 1000, end: 900 } }, envelope: { decay: 0.015 }, gain: 0.06 },
    preset: { source: { type: "sawtooth", frequency: { start: 500, end: 300 } }, envelope: { decay: 0.15 }, gain: 0.18 },
  },
  cipher: {
    tap: { source: { type: "square", frequency: { start: 1200, end: 600 } }, envelope: { decay: 0.02 }, gain: 0.15 },
    toggle: { source: { type: "square", frequency: { start: 800, end: 400 } }, envelope: { decay: 0.03 }, gain: 0.12 },
    success: { source: { type: "square", frequency: { start: 400, end: 800 } }, envelope: { decay: 0.08 }, gain: 0.15 },
    error: { source: { type: "square", frequency: { start: 200, end: 60 } }, envelope: { decay: 0.15 }, gain: 0.12 },
    hover: { source: { type: "square", frequency: { start: 2000, end: 1800 } }, envelope: { decay: 0.01 }, gain: 0.04 },
    preset: { source: { type: "square", frequency: { start: 600, end: 1200 } }, envelope: { decay: 0.1 }, gain: 0.12 },
  },
  arc: {
    tap: { source: { type: "sine", frequency: { start: 700, end: 500 } }, envelope: { attack: 0.01, decay: 0.06 }, gain: 0.22 },
    toggle: { source: { type: "sine", frequency: { start: 550, end: 400 } }, envelope: { attack: 0.02, decay: 0.08 }, gain: 0.18 },
    success: { layers: [
      { source: { type: "sine", frequency: 523 }, envelope: { attack: 0.02, decay: 0.2 }, gain: 0.2 },
      { source: { type: "sine", frequency: 784 }, envelope: { attack: 0.02, decay: 0.25 }, gain: 0.18, delay: 0.1 },
    ] },
    error: { source: { type: "sine", frequency: { start: 300, end: 150 } }, envelope: { attack: 0.01, decay: 0.2 }, gain: 0.15 },
    hover: { source: { type: "sine", frequency: { start: 900, end: 850 } }, envelope: { decay: 0.02 }, gain: 0.06 },
    preset: { layers: [
      { source: { type: "sine", frequency: 440 }, envelope: { attack: 0.03, decay: 0.15 }, gain: 0.15 },
      { source: { type: "sine", frequency: 660 }, envelope: { attack: 0.03, decay: 0.2 }, gain: 0.12, delay: 0.08 },
    ] },
  },
};

function getDefaultPatch(): SoundPatch {
  return PATCHES.sigil!;
}

type SoundName = keyof SoundPatch;

type SoundContextValue = {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  play: (name: SoundName) => void;
  activePreset: string;
  setActivePreset: (name: string) => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);

export function useSigilSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) return { play: () => {}, enabled: false, setEnabled: () => {} };
  return ctx;
}

export function SigilSoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [activePreset, setActivePreset] = useState("sigil");

  const compiledSounds = useMemo(() => {
    const patch = PATCHES[activePreset] ?? getDefaultPatch();
    const compiled: Record<string, ReturnType<typeof defineSound>> = {};

    for (const [name, def] of Object.entries(patch)) {
      try {
        compiled[name] = defineSound(def as any);
      } catch {
        // Skip sounds that fail to compile
      }
    }

    return compiled;
  }, [activePreset]);

  const play = useCallback(
    (name: SoundName) => {
      if (!enabled) return;
      const fn = compiledSounds[name];
      if (fn) {
        try { fn(); } catch { /* audio context not ready */ }
      }
    },
    [enabled, compiledSounds],
  );

  const value = useMemo<SoundContextValue>(
    () => ({ enabled, setEnabled, play, activePreset, setActivePreset }),
    [enabled, setEnabled, play, activePreset, setActivePreset],
  );

  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  );
}
