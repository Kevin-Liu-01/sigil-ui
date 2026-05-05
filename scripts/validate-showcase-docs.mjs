#!/usr/bin/env node
/**
 * Resolve every entry in component-showcase.tsx to a doc path the same way
 * the runtime does, then verify the corresponding MDX file exists. Reports
 * showcase entries that point at missing or null-but-shouldn't-be docs.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SHOWCASE = path.join(ROOT, "apps/web/components/landing/component-showcase.tsx");
const DOCS = path.join(ROOT, "apps/web/content/docs");

const src = fs.readFileSync(SHOWCASE, "utf-8");

// Parse DOC_SECTION_BY_CATEGORY
const catRe = /DOC_SECTION_BY_CATEGORY[^=]*=\s*\{([\s\S]*?)\n\};/;
const catBlock = src.match(catRe)?.[1] ?? "";
const sectionByCat = Object.fromEntries(
  [...catBlock.matchAll(/(?:"([^"]+)"|(\w+)):\s*"([^"]+)"/g)].map((m) => [m[1] ?? m[2], m[3]]),
);

// Parse DOC_PATH_OVERRIDES
const ovrRe = /DOC_PATH_OVERRIDES[^=]*=\s*\{([\s\S]*?)\n\};/;
const ovrBlock = src.match(ovrRe)?.[1] ?? "";
const overrides = new Map();
for (const m of ovrBlock.matchAll(/(?:"([^"]+)"|(\w+)):\s*("[^"]*"|null)/g)) {
  const key = m[1] ?? m[2];
  const val = m[3] === "null" ? null : m[3].slice(1, -1);
  overrides.set(key, val);
}

// Parse showcase entries
const entryRe = /^\s+\{\s*name:\s*"([^"]+)",\s*category:\s*"([^"]+)"(?:,\s*variants:\s*\d+)?(?:,\s*docPath:\s*("[^"]*"|null))?/gm;
const entries = [];
for (const m of src.matchAll(entryRe)) {
  entries.push({
    name: m[1],
    category: m[2],
    docPathInline: m[3] === undefined ? undefined : m[3] === "null" ? null : m[3].slice(1, -1),
  });
}

function componentSlug(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .replace(/^-/, "")
    .toLowerCase();
}

function resolveDocPath(entry) {
  if (entry.docPathInline !== undefined) return entry.docPathInline;
  if (overrides.has(entry.name)) return overrides.get(entry.name);
  const section = sectionByCat[entry.category] ?? "components";
  return `/docs/${section}/${componentSlug(entry.name)}`;
}

function docExists(href) {
  if (!href || !href.startsWith("/docs/")) return false;
  const slug = href.replace(/^\/docs\//, "");
  const file = path.join(DOCS, `${slug}.mdx`);
  return fs.existsSync(file);
}

let total = 0;
let nullCount = 0;
let missingCount = 0;
const missing = [];
const dupNames = new Map();

for (const entry of entries) {
  total++;
  dupNames.set(entry.name, (dupNames.get(entry.name) ?? 0) + 1);

  const href = resolveDocPath(entry);
  if (href === null) { nullCount++; continue; }
  if (!docExists(href)) {
    missingCount++;
    missing.push({ ...entry, resolved: href });
  }
}

console.log(`Showcase entries:  ${total}`);
console.log(`  intentionally null doc: ${nullCount}`);
console.log(`  resolves to missing MDX: ${missingCount}`);
console.log(`  unique names: ${[...dupNames.keys()].length}`);

const dups = [...dupNames.entries()].filter(([_, n]) => n > 1);
if (dups.length) {
  console.log(`\nDuplicate showcase names (${dups.length}):`);
  for (const [name, n] of dups) console.log(`  ${name} × ${n}`);
}

if (missing.length) {
  console.log(`\nMissing docs (${missing.length}):`);
  for (const m of missing) {
    console.log(`  ${m.name.padEnd(28)}  →  ${m.resolved}  [category: ${m.category}]`);
  }
}
