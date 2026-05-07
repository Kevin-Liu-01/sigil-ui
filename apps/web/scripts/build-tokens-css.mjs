#!/usr/bin/env node
/**
 * Build-time generator for `apps/web/app/_generated/sigil-tokens.css`.
 *
 * Compiles the active preset (default: "default") into CSS custom
 * properties. The output IS the static stylesheet — components read
 * `var(--s-*)` from it on first paint, with zero runtime injection
 * needed. The `SigilTokensProvider` only creates a `<style>` tag when
 * a user explicitly switches presets at runtime.
 *
 * Usage: pnpm --filter @sigil-ui/web run tokens:build
 * Override preset: SIGIL_PRESET=cobalt pnpm ... tokens:build
 */

import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { writeFileSync, mkdirSync } from "node:fs";
import { compileToCss } from "@sigil-ui/tokens";
import { presets } from "@sigil-ui/presets";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const HEADER = `\
/* ================================================================== */
/* Sigil Tokens — apps/web  (AUTO-GENERATED — do not edit by hand)    */
/*                                                                    */
/* Source: build-tokens-css.mjs → compileToCss(preset.tokens)         */
/* Regenerate: pnpm --filter @sigil-ui/web run tokens:build           */
/*                                                                    */
/* This file is the single source of truth for the web app's CSS      */
/* variables. The runtime SigilTokensProvider reads from this file    */
/* on first paint and only injects a <style> when a preset is         */
/* explicitly switched.                                               */
/* ================================================================== */

`;

async function main() {
  const presetName = process.env.SIGIL_PRESET ?? "default";
  const loader = presets[presetName];
  if (!loader) {
    console.error(`[build-tokens-css] unknown preset: ${presetName}`);
    process.exit(1);
  }
  const preset = await loader();

  const css = compileToCss(preset.tokens, {
    selector: ":root",
    darkSelector: ".dark, [data-theme=\"dark\"]",
  });

  const outDir = resolve(ROOT, "app/_generated");
  mkdirSync(outDir, { recursive: true });
  const outPath = resolve(outDir, "sigil-tokens.css");
  writeFileSync(outPath, HEADER + css, "utf8");
  console.log(`[build-tokens-css] preset=${presetName} → ${outPath} (${css.length} bytes)`);
}

main().catch((err) => {
  console.error("[build-tokens-css]", err);
  process.exit(1);
});
