/**
 * Compile pipeline barrel.
 *
 * Each file owns one concern:
 * - merge.ts      → deep-merge primitives shared by every emitter
 * - emit.ts       → CSS string mechanics (cssVar, indent, px→rem)
 * - css.ts        → compileToCss + compileInteractionCss
 * - tailwind.ts   → compileToTailwind (Tailwind v4 @theme)
 * - w3c.ts        → compileToW3CJson (W3C Design Tokens)
 * - serialize.ts  → compileToTs + compileToJson
 * - markdown.ts   → parseMarkdownTokens (legacy 8-group) + parseDesignMarkdown (full DESIGN.md)
 * - design.ts     → compileDesignMd (round-trip generator)
 */

export { deepMerge, isPlainObject, isThemedColor, type DeepPartial } from "./merge";
export { compileToCss, compileInteractionCss } from "./css";
export { compileToTailwind } from "./tailwind";
export { compileToW3CJson } from "./w3c";
export { compileToTs, compileToJson } from "./serialize";
export { parseMarkdownTokens, parseDesignMarkdown } from "./markdown";
export { compileDesignMd } from "./design";
