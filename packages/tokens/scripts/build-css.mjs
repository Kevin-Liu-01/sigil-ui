#!/usr/bin/env node
/**
 * Post-build CSS generator for @sigil-ui/tokens.
 *
 * Produces the two artifacts referenced from `package.json`:
 *   - dist/sigil.css           — `:root` + dark-selector token block
 *   - dist/sigil.tailwind.css  — Tailwind v4 `@theme` block
 *
 * Both files compile from `defaultTokens`, so importing
 * `@sigil-ui/tokens/css` in any consumer drops in the canonical
 * Sigil token surface with zero hand-authored variables.
 */

import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { writeFileSync, mkdirSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DIST = resolve(ROOT, "dist");

const { compileToCss, compileToTailwind, defaultTokens } = await import(
  resolve(DIST, "index.js")
);

mkdirSync(DIST, { recursive: true });

const css = compileToCss(defaultTokens, {
  selector: ":root",
  darkSelector: ".dark, [data-theme=\"dark\"]",
});
writeFileSync(resolve(DIST, "sigil.css"), css, "utf8");

const tailwind = compileToTailwind(defaultTokens);
writeFileSync(resolve(DIST, "sigil.tailwind.css"), tailwind, "utf8");

console.log(
  `[tokens:build-css] sigil.css ${css.length}B + sigil.tailwind.css ${tailwind.length}B`,
);
