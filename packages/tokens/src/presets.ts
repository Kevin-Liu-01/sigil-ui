import type { PresetMetadata, SigilPreset, SigilTokens } from "./types";
import { defaultTokens } from "./tokens";

/**
 * The default Sigil preset — precision-instrument aesthetic with
 * OKLCH colors, Nacelle display, 4/8px spacing, editorial radius.
 */
export const sigilPreset: SigilPreset = {
  name: "sigil",
  tokens: defaultTokens,
  metadata: {
    description:
      "Default Sigil UI preset — structural precision with selective accent",
    author: "sigil-ui",
    version: "0.1.0",
  },
};

/**
 * Create a named preset from a full token set.
 */
export function createPreset(
  name: string,
  tokens: SigilTokens,
  metadata: PresetMetadata = { description: "" },
): SigilPreset {
  return { name, tokens, metadata };
}

/**
 * Deep-merge a partial token override onto a base preset, producing a
 * new preset. Useful for theme variants that only change a few values.
 */
export function mergePresets(
  base: SigilPreset,
  overrides: DeepPartial<SigilTokens>,
  name?: string,
  metadata?: PresetMetadata,
): SigilPreset {
  return {
    name: name ?? base.name,
    tokens: deepMerge(base.tokens, overrides) as SigilTokens,
    metadata: { ...base.metadata, ...metadata },
  };
}

// ---------------------------------------------------------------------------
// Deep merge utility
// ---------------------------------------------------------------------------

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function deepMerge(
  target: Record<string, unknown>,
  source: Record<string, unknown>,
): Record<string, unknown> {
  const result: Record<string, unknown> = { ...target };

  for (const key of Object.keys(source)) {
    const sourceVal = source[key];
    const targetVal = target[key];

    if (isPlainObject(sourceVal) && isPlainObject(targetVal)) {
      result[key] = deepMerge(targetVal, sourceVal);
    } else if (sourceVal !== undefined) {
      result[key] = sourceVal;
    }
  }

  return result;
}

export type { DeepPartial };
