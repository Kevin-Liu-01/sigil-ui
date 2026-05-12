#!/usr/bin/env node
/**
 * Unified Sigil layout-system audit.
 *
 * This orchestrates the invariants that matter after touching layout, rhythm,
 * tokens, docs previews, or showcase pages:
 * - full-cell section/divider alignment on key pages
 * - /components showcase hydration + category smoke
 * - /components showcase visual sizing
 * - /docs/components preview runtime/visual checks
 *
 * Usage:
 *   node scripts/audit-layout-system.mjs --base=http://localhost:3000 --quick
 *   node scripts/audit-layout-system.mjs --base=http://localhost:4000
 */

import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const args = parseArgs(process.argv.slice(2));
const BASE = args.base ?? "http://localhost:3000";
const QUICK = Boolean(args.quick);
const SKIP_SCREENSHOTS = Boolean(args["skip-screenshots"]);
const STAMP = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const OUT_DIR = path.join(ROOT, "output/audit", STAMP, "layout-system");

const GRID_PATHS = (args.paths ?? "/,/components,/presets,/walkthrough")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

fs.mkdirSync(OUT_DIR, { recursive: true });

function parseArgs(argv) {
  const out = {};
  for (const arg of argv) {
    if (!arg.startsWith("--")) continue;
    const eq = arg.indexOf("=");
    if (eq === -1) out[arg.slice(2)] = true;
    else out[arg.slice(2, eq)] = arg.slice(eq + 1);
  }
  return out;
}

function run(label, command, commandArgs, options = {}) {
  return new Promise((resolve) => {
    const started = Date.now();
    const child = spawn(command, commandArgs, {
      cwd: ROOT,
      env: process.env,
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (buf) => {
      const text = String(buf);
      stdout += text;
      process.stdout.write(text);
    });
    child.stderr.on("data", (buf) => {
      const text = String(buf);
      stderr += text;
      process.stderr.write(text);
    });
    child.on("close", (code) => {
      const result = {
        label,
        command: [command, ...commandArgs].join(" "),
        code,
        ok: code === 0,
        elapsedMs: Date.now() - started,
        stdout,
        stderr,
        optional: Boolean(options.optional),
      };
      resolve(result);
    });
  });
}

const results = [];

console.log(`# Sigil layout-system audit`);
console.log(`Base: ${BASE}`);
console.log(`Output: ${path.relative(ROOT, OUT_DIR)}`);
console.log(`Quick: ${QUICK ? "yes" : "no"}`);

for (const pagePath of GRID_PATHS) {
  console.log(`\n## Grid alignment: ${pagePath}`);
  results.push(
    await run("grid:" + pagePath, "node", [
      "scripts/audit-grid-alignment.mjs",
      `--base=${BASE}`,
      `--path=${pagePath}`,
      "--settle=2500",
    ]),
  );
}

console.log(`\n## /components showcase smoke`);
results.push(
  await run("showcase", "node", [
    "scripts/audit-showcase.mjs",
    `--base=${BASE}`,
    "--headless=true",
  ]),
);

console.log(`\n## /components showcase visual`);
results.push(
  await run("showcase-visual", "node", [
    "scripts/audit-showcase-visual.mjs",
    `--base=${BASE}`,
  ]),
);

console.log(`\n## /docs/components preview audit`);
const componentArgs = [
  "scripts/audit-components.mjs",
  `--base=${BASE}`,
  QUICK ? "--quick" : "",
  QUICK ? "--concurrency=1" : "--concurrency=4",
  QUICK ? "--timeout=120000" : "--timeout=90000",
  QUICK ? "--slug=button,card,divider,sigil-section" : "",
  SKIP_SCREENSHOTS ? "--skip-screenshots" : "",
].filter(Boolean);
results.push(await run("docs-components", "node", componentArgs));

console.log(`\n## /docs/components visual audit`);
const visualArgs = [
  "scripts/audit-visual.mjs",
  `--base=${BASE}`,
  QUICK ? "--concurrency=1" : "--concurrency=4",
  QUICK ? "--slug=button,card,divider,sigil-section" : "",
].filter(Boolean);
results.push(await run("docs-visual", "node", visualArgs));

const summary = {
  base: BASE,
  timestamp: new Date().toISOString(),
  quick: QUICK,
  failed: results.filter((r) => !r.ok && !r.optional).length,
  results: results.map(({ stdout: _stdout, stderr: _stderr, ...rest }) => rest),
};

fs.writeFileSync(path.join(OUT_DIR, "report.json"), JSON.stringify({ summary, results }, null, 2));

const md = [];
md.push("# Sigil Layout-System Audit");
md.push("");
md.push(`Generated: ${summary.timestamp}`);
md.push(`Base: \`${BASE}\``);
md.push("");
md.push("| Check | OK | Exit | Elapsed |");
md.push("|---|---|---:|---:|");
for (const result of results) {
  md.push(
    `| ${result.label} | ${result.ok ? "yes" : "no"} | ${result.code} | ${Math.round(
      result.elapsedMs / 1000,
    )}s |`,
  );
}
fs.writeFileSync(path.join(OUT_DIR, "report.md"), md.join("\n"));

console.log(`\nReport: ${path.relative(ROOT, OUT_DIR)}/report.md`);
if (summary.failed > 0) {
  console.error(`Failed checks: ${summary.failed}`);
  process.exit(1);
}
console.log("All layout-system audit checks passed.");
