#!/usr/bin/env node
/**
 * Build-time generator for `apps/web/app/_generated/sigil-tokens.css`.
 *
 * The generated file is the single source of truth for the web app's
 * runtime CSS variables. Today the file is hand-authored to preserve
 * the exact OKLCH light-mode palette of the live site; this script is
 * the dogfood pipeline that will eventually replace that hand-authored
 * source with `compileToCss(preset.tokens)` output.
 *
 * Usage (manual): pnpm --filter @sigil-ui/web run tokens:build
 *
 * Until the typed `webPreset` definition mirrors the live values
 * exactly, this script writes to a `.preview.css` sibling so we can
 * diff the two outputs without disturbing the production file.
 */

import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { writeFileSync, mkdirSync } from "node:fs";
import { compileToCss } from "@sigil-ui/tokens";
import { presets } from "@sigil-ui/presets";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

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
  const outPath = resolve(outDir, "sigil-tokens.preview.css");
  writeFileSync(outPath, css, "utf8");
  console.log(`[build-tokens-css] preset=${presetName} → ${outPath} (${css.length} bytes)`);
}

main().catch((err) => {
  console.error("[build-tokens-css]", err);
  process.exit(1);
});
