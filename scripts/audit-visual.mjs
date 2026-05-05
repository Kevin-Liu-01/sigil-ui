#!/usr/bin/env node
/**
 * Visual quality auditor — catches components that render at extreme
 * dimensions (too narrow, too tall, too short) which usually means the
 * preview is collapsing to content instead of laying out properly.
 *
 * Output: output/audit/<timestamp>/visual/{report.md, report.json, screenshots/*.png}
 *
 * Usage:
 *   node scripts/audit-visual.mjs --base=http://localhost:4000
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DOCS_DIR = path.join(ROOT, "apps/web/content/docs/components");
const OUT_BASE = path.join(ROOT, "output/audit");

const args = parseArgs(process.argv.slice(2));
const BASE = args.base ?? "http://localhost:4000";
const CONCURRENCY = Number(args.concurrency ?? 6);
const SLUG_FILTER = args.slug ? new Set(String(args.slug).split(",").map((s) => s.trim())) : null;

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

const slugs = fs
  .readdirSync(DOCS_DIR)
  .filter((f) => f.endsWith(".mdx"))
  .map((f) => f.replace(/\.mdx$/, ""))
  .filter((s) => !SLUG_FILTER || SLUG_FILTER.has(s))
  .sort();

const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const outDir = path.join(OUT_BASE, stamp, "visual");
fs.mkdirSync(path.join(outDir, "screenshots"), { recursive: true });

console.log(`Visual audit: ${slugs.length} pages on ${BASE} (concurrency=${CONCURRENCY})`);

const browser = await chromium.launch({ headless: true });
const contexts = await Promise.all(
  Array.from({ length: CONCURRENCY }, () =>
    browser.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 }),
  ),
);

const queue = [...slugs];
const results = [];
let done = 0;
const total = slugs.length;

async function worker(ctx) {
  while (queue.length > 0) {
    const slug = queue.shift();
    if (!slug) break;
    const r = await measure(ctx, slug);
    results.push(r);
    done++;
    const flag = r.flags.length ? "⚠" : "✓";
    console.log(`  [${done}/${total}] ${flag.padEnd(2)} ${slug}${r.flags.length ? " — " + r.flags.join(", ") : ""}`);
  }
}

async function measure(ctx, slug) {
  const url = `${BASE}/docs/components/${slug}`;
  const page = await ctx.newPage();
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30_000 });
    await page.waitForSelector(".sigil-preview", { timeout: 15_000 });
    // wait for placeholder span to be replaced
    await page.waitForFunction(
      () => {
        const el = document.querySelector(".sigil-preview");
        if (!el || el.children.length === 0) return false;
        if (
          el.children.length === 1 &&
          el.firstElementChild instanceof HTMLElement &&
          el.firstElementChild.getAttribute("aria-hidden") === "true"
        ) return false;
        return true;
      },
      { timeout: 8_000 },
    ).catch(() => {});
    await page.waitForTimeout(300);

    const data = await page.evaluate(() => {
      const preview = document.querySelector(".sigil-preview");
      if (!preview) return null;
      const pr = preview.getBoundingClientRect();

      // Walk direct + grand-children to find the dominant rendered element
      const directKids = [...preview.children].filter(
        (el) => el instanceof HTMLElement && !el.hasAttribute("aria-hidden"),
      );
      const childMetrics = directKids.map((el) => {
        const r = el.getBoundingClientRect();
        return {
          tag: el.tagName.toLowerCase(),
          slot: el.getAttribute("data-slot"),
          width: Math.round(r.width),
          height: Math.round(r.height),
          area: Math.round(r.width * r.height),
          // Categorize component "shape" by data-slot if present
          dataSlot: el.querySelector("[data-slot]")?.getAttribute("data-slot") ?? null,
        };
      });

      // Detect "card-like" components (anything with data-slot=card or
      // a Card descendant) which should never be < 280px wide.
      const hasCard = preview.querySelector('[data-slot="card"]') !== null;
      const hasTable = preview.querySelector('table') !== null;
      const hasChart = preview.querySelector('[data-slot="chart"]') !== null;
      const hasSection = preview.querySelector('[data-slot$="-section"]') !== null;

      return {
        preview: {
          width: Math.round(pr.width),
          height: Math.round(pr.height),
          contentWidth: preview.clientWidth,
        },
        children: childMetrics,
        kinds: { hasCard, hasTable, hasChart, hasSection },
      };
    });

    if (!data) {
      return { slug, flags: ["no-preview"], data: null };
    }

    // Compute flags
    const flags = [];
    const previewW = data.preview.width;
    const previewH = data.preview.height;
    const dominant = data.children.sort((a, b) => b.area - a.area)[0];

    // Components that are intentionally small or sidebar-shaped.
    const KNOWN_SMALL = new Set([
      "accessible-icon",
      "announcement-bar",
      "avatar",
      "badge",
      "braille-spinner",
      "circular-progress",
      "color-swatch",
      "diamond",
      "hexagon",
      "kbd",
      "keyboard-key",
      "loading-spinner",
      "online-indicator",
      "presence-avatar",
      "shape",
      "spinner-overlay",
      "status-badge",
      "status-dot",
      "status-pill",
      "switch",
      "theme-swatch",
      "tree-view",
      "triangle",
      "version-badge",
    ]);
    const KNOWN_TALL = new Set([
      "aside",
      "sidebar",
      "sidebar-nav",
      "navigation-menu",
    ]);
    // These render at intentionally compact sizes — the table heuristic
    // shouldn't flag them.
    const KNOWN_COMPACT = new Set([
      "calendar",
      "date-picker",
      "date-time-picker",
      "color-picker",
      "input-otp",
    ]);

    if (dominant && !KNOWN_SMALL.has(slug)) {
      const widthRatio = dominant.width / Math.max(previewW, 1);
      const aspectRatio = dominant.height / Math.max(dominant.width, 1);

      // Card-shaped, narrow (< 240px) → almost certainly a layout bug
      if (data.kinds.hasCard && dominant.width < 240) {
        flags.push(`narrow-card(${dominant.width}px)`);
      }
      // Section-shaped, narrow (< 400px)
      if (data.kinds.hasSection && dominant.width < 400) {
        flags.push(`narrow-section(${dominant.width}px)`);
      }
      // Chart/table narrower than half the preview
      if (
        !KNOWN_COMPACT.has(slug) &&
        (data.kinds.hasChart || data.kinds.hasTable) &&
        widthRatio < 0.5
      ) {
        flags.push(`narrow-${data.kinds.hasChart ? "chart" : "table"}(${dominant.width}px / ${previewW}px)`);
      }
      // Extreme aspect ratio (taller than 3× wide) — skip for known-tall slugs
      if (
        !KNOWN_TALL.has(slug) &&
        aspectRatio > 3 &&
        dominant.width > 0 &&
        dominant.width < previewW * 0.6
      ) {
        flags.push(`tall-narrow(${dominant.width}×${dominant.height})`);
      }
      // Tiny dominant child
      if (dominant.area < 800 && dominant.height > 1) {
        flags.push(`tiny-element(${dominant.width}×${dominant.height})`);
      }
    }

    // Capture screenshot only if flagged (saves disk)
    let screenshot = null;
    if (flags.length) {
      const previewEl = page.locator(".sigil-preview").first();
      const shotPath = path.join(outDir, "screenshots", `${slug}.png`);
      await previewEl.screenshot({ path: shotPath, animations: "disabled" }).catch(() => {});
      screenshot = path.relative(outDir, shotPath);
    }

    return { slug, url, flags, data, screenshot };
  } catch (e) {
    return { slug, flags: ["audit-error"], error: String(e).slice(0, 300) };
  } finally {
    await page.close().catch(() => {});
  }
}

await Promise.all(contexts.map((ctx) => worker(ctx)));
await Promise.all(contexts.map((ctx) => ctx.close().catch(() => {})));
await browser.close();

results.sort((a, b) => {
  const af = a.flags.length;
  const bf = b.flags.length;
  if (af !== bf) return bf - af;
  return a.slug.localeCompare(b.slug);
});

const flagged = results.filter((r) => r.flags.length > 0);
const summary = {
  base: BASE,
  timestamp: new Date().toISOString(),
  total: results.length,
  flagged: flagged.length,
  clean: results.length - flagged.length,
};

fs.writeFileSync(path.join(outDir, "report.json"), JSON.stringify({ summary, results }, null, 2));

const md = [];
md.push(`# Visual Quality Audit`);
md.push(``);
md.push(`Generated ${summary.timestamp} against \`${summary.base}\``);
md.push(``);
md.push(`| Metric | Count |`);
md.push(`|---|---|`);
md.push(`| Pages audited | ${summary.total} |`);
md.push(`| Flagged for visual issues | ${summary.flagged} |`);
md.push(`| Clean | ${summary.clean} |`);
md.push(``);
if (flagged.length) {
  md.push(`## Flagged components (${flagged.length})`);
  md.push(``);
  md.push(`| Slug | Flags | Dominant element | Preview |`);
  md.push(`|---|---|---|---|`);
  for (const r of flagged) {
    const dom = (r.data?.children ?? []).sort((a, b) => b.area - a.area)[0];
    const domStr = dom ? `${dom.width}×${dom.height}px (${dom.slot ?? dom.tag})` : "—";
    const prv = r.data?.preview ? `${r.data.preview.width}×${r.data.preview.height}px` : "—";
    md.push(`| [${r.slug}](${r.url}) | ${r.flags.join("<br>")} | ${domStr} | ${prv} |`);
  }
}
fs.writeFileSync(path.join(outDir, "report.md"), md.join("\n"));

console.log(`\nSummary:`);
console.log(`  total:    ${summary.total}`);
console.log(`  flagged:  ${summary.flagged}`);
console.log(`  clean:    ${summary.clean}`);
console.log(`  report:   ${path.relative(ROOT, outDir)}/report.md`);
