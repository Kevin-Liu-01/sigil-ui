"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { defineSound } from "@web-kits/audio";
// @ts-expect-error — dts not generated for workspace package; resolves at bundle time
import { SigilSoundContext } from "@sigil-ui/components";

// ---------------------------------------------------------------------------
// Sound types (mirrored from @sigil-ui/components/src/sound-context)
// ---------------------------------------------------------------------------

type SigilSoundName =
  | "tap" | "toggle" | "success" | "error" | "hover" | "preset"
  | "slide" | "open" | "close" | "expand" | "nav" | "notify" | "delete";

type SoundDef = {
  source: { type: string; frequency: number | { start: number; end: number } };
  envelope: { attack?: number; decay: number; sustain?: number; release?: number };
  gain: number;
  delay?: number;
};

type LayeredSoundDef = { layers: (SoundDef & { delay?: number })[] };
type SoundPatch = Record<SigilSoundName, SoundDef | LayeredSoundDef>;

// ---------------------------------------------------------------------------
// Sonic profile → patch factory
// ---------------------------------------------------------------------------

type SonicProfile = {
  wave: "sine" | "triangle" | "sawtooth" | "square";
  alt: "sine" | "triangle" | "sawtooth" | "square";
  freq: number;
  vol: number;
  speed: number;
  atk: number;
};

function buildPatch(p: SonicProfile): SoundPatch {
  const { wave, alt, freq, vol, speed, atk } = p;
  return {
    tap:     { source: { type: wave, frequency: { start: freq * 1.2, end: freq * 0.8 } }, envelope: { attack: atk, decay: 0.04 * speed }, gain: vol },
    toggle:  { source: { type: alt, frequency: { start: freq, end: freq * 0.7 } }, envelope: { attack: atk, decay: 0.06 * speed }, gain: vol * 0.8 },
    success: { layers: [
      { source: { type: alt, frequency: freq * 1.05 }, envelope: { attack: atk, decay: 0.15 * speed }, gain: vol * 0.8 },
      { source: { type: alt, frequency: freq * 1.32 }, envelope: { attack: atk, decay: 0.15 * speed }, gain: vol * 0.8, delay: 0.08 },
    ] },
    error:   { source: { type: "sawtooth", frequency: { start: freq * 0.4, end: freq * 0.24 } }, envelope: { decay: 0.15 * speed }, gain: vol * 0.6 },
    hover:   { source: { type: "sine", frequency: { start: freq * 1.6, end: freq * 1.5 } }, envelope: { decay: 0.02 }, gain: vol * 0.3 },
    preset:  { layers: [
      { source: { type: "sine", frequency: freq * 0.88 }, envelope: { attack: 0.02, decay: 0.1 * speed }, gain: vol * 0.6 },
      { source: { type: "sine", frequency: freq * 1.11 }, envelope: { attack: 0.02, decay: 0.1 * speed }, gain: vol * 0.6, delay: 0.05 },
      { source: { type: "sine", frequency: freq * 1.32 }, envelope: { attack: 0.02, decay: 0.15 * speed }, gain: vol * 0.6, delay: 0.1 },
    ] },
    slide:   { source: { type: wave, frequency: { start: freq * 0.6, end: freq * 1.0 } }, envelope: { attack: 0.01, decay: 0.08 * speed }, gain: vol * 0.4 },
    open:    { source: { type: alt, frequency: { start: freq * 0.8, end: freq * 1.2 } }, envelope: { attack: 0.01, decay: 0.1 * speed }, gain: vol * 0.5 },
    close:   { source: { type: alt, frequency: { start: freq * 1.2, end: freq * 0.6 } }, envelope: { decay: 0.08 * speed }, gain: vol * 0.4 },
    expand:  { source: { type: wave, frequency: { start: freq * 0.9, end: freq * 1.1 } }, envelope: { attack: 0.02, decay: 0.12 * speed }, gain: vol * 0.45 },
    nav:     { source: { type: "sine", frequency: { start: freq, end: freq * 0.85 } }, envelope: { decay: 0.05 * speed }, gain: vol * 0.35 },
    notify:  { layers: [
      { source: { type: "triangle", frequency: freq * 1.2 }, envelope: { attack: 0.01, decay: 0.12 * speed }, gain: vol * 0.6 },
      { source: { type: "triangle", frequency: freq * 1.5 }, envelope: { attack: 0.01, decay: 0.15 * speed }, gain: vol * 0.45, delay: 0.06 },
    ] },
    delete:  { source: { type: "sawtooth", frequency: { start: freq * 0.5, end: freq * 0.2 } }, envelope: { decay: 0.2 * speed }, gain: vol * 0.6 },
  };
}

// ---------------------------------------------------------------------------
// 31 preset patches — each with a unique sonic character
// ---------------------------------------------------------------------------

const PATCHES: Record<string, SoundPatch> = {
  // Structural: clean sine/triangle, precise, short decay
  sigil:  buildPatch({ wave: "sine",     alt: "triangle", freq: 500, vol: 0.22, speed: 1.0, atk: 0 }),
  kova:   buildPatch({ wave: "triangle", alt: "sine",     freq: 460, vol: 0.18, speed: 0.9, atk: 0.01 }),
  cobalt: buildPatch({ wave: "sine",     alt: "triangle", freq: 540, vol: 0.20, speed: 0.8, atk: 0 }),
  helix:  buildPatch({ wave: "triangle", alt: "sine",     freq: 480, vol: 0.19, speed: 1.1, atk: 0.01 }),
  hex:    buildPatch({ wave: "sine",     alt: "sine",     freq: 520, vol: 0.21, speed: 0.85, atk: 0 }),

  // Minimal: soft sine, gentle, lower volume
  crux:   buildPatch({ wave: "sine",     alt: "sine",     freq: 440, vol: 0.14, speed: 1.2, atk: 0.02 }),
  axiom:  buildPatch({ wave: "sine",     alt: "triangle", freq: 420, vol: 0.15, speed: 1.3, atk: 0.03 }),
  arc:    buildPatch({ wave: "sine",     alt: "sine",     freq: 460, vol: 0.16, speed: 1.1, atk: 0.02 }),
  mono:   buildPatch({ wave: "square",   alt: "square",   freq: 400, vol: 0.12, speed: 0.7, atk: 0 }),

  // Dark: low freq, dramatic, longer decays
  basalt: buildPatch({ wave: "sawtooth", alt: "triangle", freq: 300, vol: 0.24, speed: 1.5, atk: 0 }),
  onyx:   buildPatch({ wave: "sawtooth", alt: "sawtooth", freq: 320, vol: 0.22, speed: 1.4, atk: 0 }),
  fang:   buildPatch({ wave: "square",   alt: "sawtooth", freq: 280, vol: 0.25, speed: 1.0, atk: 0 }),
  obsid:  buildPatch({ wave: "sine",     alt: "triangle", freq: 340, vol: 0.18, speed: 1.6, atk: 0.02 }),
  cipher: buildPatch({ wave: "square",   alt: "square",   freq: 600, vol: 0.15, speed: 0.5, atk: 0 }),
  noir:   buildPatch({ wave: "sine",     alt: "sine",     freq: 260, vol: 0.18, speed: 1.8, atk: 0.04 }),

  // Colorful: bright, varied, playful
  flux:   buildPatch({ wave: "triangle", alt: "sine",     freq: 560, vol: 0.22, speed: 0.9, atk: 0.01 }),
  shard:  buildPatch({ wave: "triangle", alt: "triangle", freq: 580, vol: 0.20, speed: 0.8, atk: 0 }),
  prism:  buildPatch({ wave: "sine",     alt: "triangle", freq: 620, vol: 0.21, speed: 0.9, atk: 0.01 }),
  vex:    buildPatch({ wave: "sawtooth", alt: "square",   freq: 500, vol: 0.24, speed: 0.7, atk: 0 }),
  dsgn:   buildPatch({ wave: "sine",     alt: "sine",     freq: 550, vol: 0.18, speed: 1.0, atk: 0.01 }),
  dusk:   buildPatch({ wave: "sine",     alt: "triangle", freq: 380, vol: 0.17, speed: 1.3, atk: 0.02 }),

  // Editorial: muted, refined, gentle
  etch:   buildPatch({ wave: "sine",     alt: "sine",     freq: 450, vol: 0.14, speed: 1.2, atk: 0.02 }),
  rune:   buildPatch({ wave: "sine",     alt: "triangle", freq: 400, vol: 0.13, speed: 1.4, atk: 0.03 }),
  strata: buildPatch({ wave: "triangle", alt: "sine",     freq: 430, vol: 0.15, speed: 1.3, atk: 0.02 }),
  glyph:  buildPatch({ wave: "sine",     alt: "sine",     freq: 360, vol: 0.12, speed: 1.5, atk: 0.04 }),
  mrkr:   buildPatch({ wave: "sine",     alt: "sine",     freq: 410, vol: 0.14, speed: 1.3, atk: 0.03 }),

  // Industrial: sawtooth, harsh, metallic
  alloy:  buildPatch({ wave: "sawtooth", alt: "square",   freq: 480, vol: 0.22, speed: 0.7, atk: 0 }),
  forge:  buildPatch({ wave: "sawtooth", alt: "sawtooth", freq: 440, vol: 0.24, speed: 0.6, atk: 0 }),
  anvil:  buildPatch({ wave: "square",   alt: "sawtooth", freq: 360, vol: 0.26, speed: 0.8, atk: 0 }),
  rivet:  buildPatch({ wave: "sawtooth", alt: "square",   freq: 520, vol: 0.20, speed: 0.7, atk: 0 }),
  brass:  buildPatch({ wave: "sawtooth", alt: "triangle", freq: 400, vol: 0.21, speed: 0.9, atk: 0 }),
};

// ---------------------------------------------------------------------------
// Web-app sound control context (has extra fields for the devbar/control-panel)
// ---------------------------------------------------------------------------

type SoundControlValue = {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  play: (name: SigilSoundName) => void;
  activePreset: string;
  setActivePreset: (name: string) => void;
};

const SoundControlContext = createContext<SoundControlValue | null>(null);

export function useSigilSound(): SoundControlValue {
  const ctx = useContext(SoundControlContext);
  if (!ctx) return { play: () => {}, enabled: false, setEnabled: () => {}, activePreset: "sigil", setActivePreset: () => {} };
  return ctx;
}

// ---------------------------------------------------------------------------
// Provider — wraps both the web-app control context and the component context
// ---------------------------------------------------------------------------

export function SigilSoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [activePreset, setActivePreset] = useState("sigil");

  const compiledSounds = useMemo(() => {
    const patch = PATCHES[activePreset] ?? PATCHES.sigil!;
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
    (name: SigilSoundName) => {
      if (!enabled) return;
      const fn = compiledSounds[name];
      if (fn) {
        try { fn(); } catch { /* audio context not ready */ }
      }
    },
    [enabled, compiledSounds],
  );

  const controlValue = useMemo<SoundControlValue>(
    () => ({ enabled, setEnabled, play, activePreset, setActivePreset }),
    [enabled, setEnabled, play, activePreset, setActivePreset],
  );

  const soundValue = useMemo(
    () => ({ play, enabled }),
    [play, enabled],
  );

  return (
    <SoundControlContext.Provider value={controlValue}>
      <SigilSoundContext.Provider value={soundValue}>
        {children}
      </SigilSoundContext.Provider>
    </SoundControlContext.Provider>
  );
}
