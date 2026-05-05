import type { ThemedColor } from "../types";

/**
 * Recursive partial — same shape as T but every leaf is optional.
 * Used by `mergePresets` and any other API that accepts override patches.
 */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export function isPlainObject(
  value: unknown,
): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Discriminator for `{ light, dark }` themed color values vs plain
 * `oklch(...)` strings. Used by every emitter that needs to split a
 * themed token across light/dark CSS selectors.
 */
export function isThemedColor(value: unknown): value is ThemedColor {
  return (
    typeof value === "object" &&
    value !== null &&
    "light" in value &&
    "dark" in value
  );
}

/**
 * Single canonical deep-merge used by every compiler entry point and
 * by `@sigil-ui/presets`. Recursively merges plain objects; arrays
 * and primitives replace wholesale. `undefined` overrides are ignored
 * so partial overrides can drop fields without nuking inherited values.
 */
export function deepMerge<T extends Record<string, unknown>>(
  base: T,
  override: Record<string, unknown>,
): T {
  const result: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const baseValue = result[key];
    if (isPlainObject(baseValue) && isPlainObject(value)) {
      result[key] = deepMerge(baseValue, value);
    } else if (value !== undefined) {
      result[key] = value;
    }
  }
  return result as T;
}
