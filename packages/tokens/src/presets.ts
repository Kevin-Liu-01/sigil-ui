import type { PresetMetadata, SigilPreset, SigilTokens } from "./types";
import { defaultTokens } from "./tokens";
import { deepMerge, type DeepPartial } from "./compile/merge";

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
    tokens: deepMerge(
      base.tokens as unknown as Record<string, unknown>,
      overrides as Record<string, unknown>,
    ) as unknown as SigilTokens,
    metadata: { ...base.metadata, ...metadata },
  };
}
