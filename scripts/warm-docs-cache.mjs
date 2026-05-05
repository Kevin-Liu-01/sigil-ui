#!/usr/bin/env node
/**
 * Pre-compile every component doc route by hitting each URL once. After this
 * runs, `audit-components.mjs` can use higher concurrency without dev-server
 * compile contention.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DOCS_DIR = path.join(ROOT, "apps/web/content/docs/components");
const BASE = process.env.SIGIL_BASE ?? "http://localhost:3000";
const CONCURRENCY = Number(process.env.SIGIL_WARM_CONCURRENCY ?? 4);

const slugs = fs
  .readdirSync(DOCS_DIR)
  .filter((f) => f.endsWith(".mdx"))
  .map((f) => f.replace(/\.mdx$/, ""))
  .sort();

console.log(`Warming ${slugs.length} docs routes via ${BASE} (concurrency=${CONCURRENCY})`);

let i = 0;
let done = 0;
const start = Date.now();

async function worker() {
  while (i < slugs.length) {
    const slug = slugs[i++];
    if (!slug) break;
    const url = `${BASE}/docs/components/${slug}`;
    const t0 = Date.now();
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 180_000);
      const resp = await fetch(url, { method: "GET", signal: ctrl.signal });
      clearTimeout(timer);
      // drain body so Next finishes streaming
      await resp.text();
      const ms = Date.now() - t0;
      done++;
      const tag = resp.ok ? "✓" : `${resp.status}`;
      console.log(`  [${done}/${slugs.length}] ${tag.padEnd(4)} ${slug} (${ms}ms)`);
    } catch (e) {
      done++;
      const ms = Date.now() - t0;
      console.log(`  [${done}/${slugs.length}] FAIL ${slug} (${ms}ms) — ${String(e).slice(0, 120)}`);
    }
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

console.log(`\nDone in ${(Date.now() - start) / 1000}s`);
