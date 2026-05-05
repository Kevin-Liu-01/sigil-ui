/**
 * CSS emission helpers shared by every compiler in this directory.
 * Pure functions — no token-shape knowledge here, just string mechanics.
 */

const REM_BASE = 16;

/**
 * Convert px values to rem in a CSS value string.
 * Handles simple values ("50px" → "3.125rem"), compound shorthand
 * ("100px 25px" → "6.25rem 1.5625rem"), and fallbacks inside var()
 * ("var(--s-foo, 25px)" → "var(--s-foo, 1.5625rem)").
 * Non-px units (%, vw, em, rem, ms, etc.) pass through unchanged.
 */
export function pxToRem(value: string): string {
  return value.replace(/(\d+(?:\.\d+)?)px/g, (_, num) => {
    const px = parseFloat(num);
    if (px === 0) return "0";
    const rem = px / REM_BASE;
    const str = rem % 1 === 0 ? String(rem) : rem.toFixed(4).replace(/0+$/, "");
    return `${str}rem`;
  });
}

/**
 * CSS variables that should stay in px (borders, shadows, strokes,
 * timing, decorative patterns). Everything else converts to rem
 * for accessibility (scales with user font-size preference).
 */
const PX_ONLY_RE =
  /(?:border(?!.*radius)|shadow|stroke|outline|scrollbar|divider-(?:width|style)|duration|ease-|opacity|weight$|columns$|style$|separator|^--\w+-bg-|^--\w+-code-|^--\w+-cursor-|^--\w+-grid-(?!cell))/;

export function shouldConvertToRem(varName: string): boolean {
  return !PX_ONLY_RE.test(varName);
}

/**
 * Post-process assembled CSS variable lines, converting px → rem
 * for spacing/sizing tokens while leaving borders/shadows in px.
 */
export function convertVarsToRem(vars: string[]): string[] {
  return vars.map((line) => {
    const match = line.match(/^(--[\w-]+):\s*(.+);$/);
    if (!match) return line;
    const [, varName, value] = match;
    if (!shouldConvertToRem(varName)) return line;
    const converted = pxToRem(value);
    if (converted === value) return line;
    return `${varName}: ${converted};`;
  });
}

export function cssVar(prefix: string, ...segments: string[]): string {
  return `--${prefix}-${segments.join("-")}`;
}

export function indent(depth: number): string {
  return "  ".repeat(depth);
}

/**
 * Emit a flat group of `--{prefix}-{group}-{key}: {value};` declarations
 * from an object. Booleans encode as `1`/`0`. Skips `undefined`.
 */
export function emitTokenGroup(
  target: string[],
  prefix: string,
  group: string,
  tokens: Record<string, unknown> | undefined,
): void {
  if (!tokens) return;
  for (const [key, value] of Object.entries(tokens)) {
    if (value === undefined) continue;
    if (typeof value === "boolean") {
      target.push(`${cssVar(prefix, group, key)}: ${value ? "1" : "0"};`);
    } else {
      target.push(`${cssVar(prefix, group, key)}: ${value};`);
    }
  }
}
