#!/usr/bin/env node
/**
 * Component Auditor — visits every /docs/components/<slug> page on the local
 * dev server and validates that the preview renders, has no console errors,
 * looks visually populated, and follows Sigil token conventions.
 *
 * Output: output/audit/<timestamp>/{report.json, report.md, screenshots/*.png}
 *
 * Usage:
 *   node scripts/audit-components.mjs
 *     --base=http://localhost:3000     # dev server base URL
 *     --concurrency=6                  # parallel pages (default 6)
 *     --slug=button,carousel           # only audit specific slugs (comma-list)
 *     --skip-screenshots               # skip preview screenshots (faster)
 *     --quick                          # skip interactive sub-checks
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DOCS_DIR = path.join(ROOT, "apps/web/content/docs/components");
const COMPONENTS_DIR = path.join(ROOT, "packages/components/src");
const OUT_BASE = path.join(ROOT, "output/audit");

/* ─────────────────────────────  CLI parsing  ───────────────────────────── */

const args = parseArgs(process.argv.slice(2));
const BASE = args.base ?? "http://localhost:3000";
const CONCURRENCY = Number(args.concurrency ?? 2);
const SLUG_FILTER = args.slug ? new Set(String(args.slug).split(",").map((s) => s.trim())) : null;
const SKIP_SCREENSHOTS = Boolean(args["skip-screenshots"]);
const QUICK = Boolean(args.quick);
const NAV_TIMEOUT = Number(args.timeout ?? 60_000);
const RETRY = Number(args.retry ?? 1);

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

/* ──────────────────────────  Static MDX analysis  ──────────────────────── */

function readMdx(slug) {
  return fs.readFileSync(path.join(DOCS_DIR, `${slug}.mdx`), "utf-8");
}

function listSlugs() {
  return fs
    .readdirSync(DOCS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
    .sort();
}

function extractPreviewBody(source) {
  const re = /<ComponentPreview([^>]*)>([\s\S]*?)<\/ComponentPreview>/;
  const match = source.match(re);
  if (!match) return null;
  return { attrs: match[1].trim(), body: match[2].trim() };
}

function staticAnalyze(slug) {
  const src = readMdx(slug);
  const preview = extractPreviewBody(src);
  const findings = [];

  if (!preview) {
    findings.push({ id: "no-preview-block", severity: "error", note: "no <ComponentPreview> block in MDX" });
    return { slug, hasPreview: false, findings };
  }

  const body = preview.body;
  // bare = a single self-closing component tag with no children / props
  const bareSelfClosing = /^<([A-Z][A-Za-z0-9]*)\s*\/>$/.test(body);
  const hasChildren = />[\s\S]*</.test(body);
  const wordCount = body.replace(/<[^>]+>/g, "").trim().split(/\s+/).filter(Boolean).length;

  // detect components that need data to look interesting
  const dataHungry = [
    "Carousel", "Tabs", "Accordion", "DataTable", "Table", "Chart", "BarChart",
    "LineChart", "AreaChart", "PieChart", "DonutChart", "ChangelogTable",
    "Combobox", "Select", "RadioGroup", "ToggleGroup", "CheckboxGroup",
    "TreeView", "Stepper", "Breadcrumb", "Pagination", "Sidebar", "Hero",
    "Pricing", "PricingTiers", "FeatureGrid", "BlogGrid", "LogoBar",
    "TestimonialsSection", "FAQSection", "Timeline", "ActivityFeed",
    "CommitGrid", "Command", "Empty", "InputOTP", "Stepper", "Footer",
    "FlowDiagram", "MermaidDiagram", "PipelineDiagram", "StackDiagram",
    "ContentTabs", "AppHeader", "AnchorNav", "AnnouncementBar", "BannerAlert",
    "DataList", "DataGrid", "BlogHeader", "TeamSection", "StatsSection",
    "PricingTable", "SpecTable", "StatusTable", "LeaderboardTable",
    "ComparisonTable", "FeatureFrame", "InstallSection", "BulkActions",
    "Form", "ButtonGroup", "ToolBar", "Toolbar", "Menubar", "NavigationMenu",
    "ToggleGroup", "ButtonGroup", "GanttChart", "FunnelChart", "MatrixDiagram",
    "DependencyGraph", "NetworkGraph", "HeatmapGrid", "VennDiagram",
    "RadarChart", "TreeDiagram", "Sidebar", "Drawer", "DropdownMenu",
    "ContextMenu", "Dialog", "Sheet", "Popover", "AlertDialog", "Calendar",
    "DatePicker", "DateRangeField", "DateTimePicker", "TagsInput",
    "PricingTable", "Banner", "BarList", "MiniBarList", "BillingChart",
    "WaterfallChart",
  ];

  const tagMatch = body.match(/<([A-Z][A-Za-z0-9]*)/);
  const componentName = tagMatch ? tagMatch[1] : null;

  if (componentName && dataHungry.includes(componentName) && bareSelfClosing) {
    findings.push({
      id: "bare-data-hungry-demo",
      severity: "warning",
      note: `<${componentName} /> rendered with no props/children — preview will look empty`,
    });
  }

  if (bareSelfClosing && wordCount === 0 && componentName && !["Loading","Spinner","Progress","Skeleton","Avatar","Badge","Button","Switch","Checkbox","Slider","Separator","Divider","HRule","Spacer"].includes(componentName)) {
    findings.push({
      id: "bare-demo",
      severity: "info",
      note: `bare <${componentName} /> demo — consider adding example props`,
    });
  }

  return { slug, hasPreview: true, componentName, bareSelfClosing, wordCount, findings };
}

/* ──────────────────────────  Browser audit  ────────────────────────────── */

async function auditPage(ctx, slug, outDir, attempt = 0) {
  const url = `${BASE}/docs/components/${slug}`;
  const page = await ctx.newPage();

  const consoleMessages = [];
  const pageErrors = [];

  page.on("console", (msg) => {
    const t = msg.type();
    if (t === "error" || t === "warning") {
      const text = msg.text();
      // Ignore noisy network failures from analytics/fonts that don't reflect
      // real component behavior. We still catch app-level errors via the
      // pageerror channel.
      if (/Failed to load resource: net::ERR/.test(text)) return;
      consoleMessages.push({ type: t, text: text.slice(0, 600) });
    }
  });
  page.on("pageerror", (err) => {
    pageErrors.push(String(err).slice(0, 600));
  });

  const result = { slug, url, ok: false, attempt };
  try {
    const resp = await page.goto(url, { waitUntil: "domcontentloaded", timeout: NAV_TIMEOUT });
    result.status = resp?.status() ?? null;

    // Wait for the preview block to mount.
    await page.waitForSelector(".sigil-preview", { timeout: 25_000 });

    // The preview children are rendered client-only (to dodge Radix/Portal
    // SSR mismatches), so we additionally wait for the placeholder span to
    // be replaced by real content.
    await page.waitForFunction(
      () => {
        const el = document.querySelector(".sigil-preview");
        if (!el) return false;
        // If only the placeholder span is present, we're not mounted yet.
        if (el.children.length === 0) return false;
        if (
          el.children.length === 1 &&
          el.firstElementChild instanceof HTMLElement &&
          el.firstElementChild.getAttribute("aria-hidden") === "true" &&
          el.firstElementChild.textContent?.trim() === "·"
        ) {
          return false;
        }
        return true;
      },
      { timeout: 15_000 },
    ).catch(() => {});

    // Let any animations / hydration / lazy charts settle.
    await page.waitForTimeout(QUICK ? 250 : 500);

    // Measure the preview block.
    const metrics = await page.evaluate(() => {
      const el = document.querySelector(".sigil-preview");
      if (!el) return null;
      const r = el.getBoundingClientRect();
      // count meaningful child elements (skip pseudo-only / empty wrappers)
      const direct = el.children.length;
      const allEls = el.querySelectorAll("*").length;
      const text = (el.textContent ?? "").trim();
      const visibleSvg = el.querySelectorAll("svg").length;
      const visibleImg = el.querySelectorAll("img").length;
      // detect clipped content
      const overflowX = el.scrollWidth - el.clientWidth;
      const overflowY = el.scrollHeight - el.clientHeight;
      // approximate visible pixels by text length + el count
      const empty = direct === 0 && allEls === 0 && !text;
      return {
        width: Math.round(r.width),
        height: Math.round(r.height),
        directChildren: direct,
        descendantElements: allEls,
        textLength: text.length,
        svgs: visibleSvg,
        images: visibleImg,
        overflowX,
        overflowY,
        empty,
      };
    });
    result.metrics = metrics;

    // Look for catastrophic states.
    const catastrophic = await page.evaluate(() => {
      const body = document.body.textContent ?? "";
      const flags = {};
      flags.appError = /Application error|This page is not (yet )?available|Internal Server Error/i.test(body);
      flags.hydrationFail = /Hydration failed|did not match|Text content does not match/i.test(body);
      flags.missingComponent = /Element type is invalid|is not defined/i.test(body);
      // Static DOM check: a <button> nesting a <button> is invalid HTML
      // and triggers React's "<button> cannot be a descendant of <button>"
      // hydration warning. Catch it before runtime by walking the DOM.
      flags.nestedButton = false;
      for (const btn of document.querySelectorAll("button")) {
        if (btn.querySelector("button")) {
          flags.nestedButton = true;
          break;
        }
      }
      return flags;
    });
    result.flags = catastrophic;

    // Optionally capture preview screenshot.
    if (!SKIP_SCREENSHOTS) {
      try {
        const previewEl = page.locator(".sigil-preview").first();
        const shotPath = path.join(outDir, "screenshots", `${slug}.png`);
        await previewEl.screenshot({ path: shotPath, omitBackground: false, animations: "disabled" });
        result.screenshot = path.relative(outDir, shotPath);
      } catch (e) {
        result.screenshotError = String(e).slice(0, 200);
      }
    }

    result.consoleErrors = consoleMessages.filter((m) => m.type === "error");
    result.consoleWarnings = consoleMessages.filter((m) => m.type === "warning");
    result.pageErrors = pageErrors;
    result.ok = true;
  } catch (e) {
    result.fatal = String(e).slice(0, 600);
    // Retry with a fresh page on timeout / connection-reset (Next.js dev hiccups)
    if (
      attempt < RETRY &&
      /TimeoutError|ERR_CONNECTION|ERR_NETWORK|ERR_EMPTY|ERR_FAILED|net::/.test(result.fatal)
    ) {
      await page.close().catch(() => {});
      await new Promise((r) => setTimeout(r, 500 + attempt * 1000));
      return auditPage(ctx, slug, outDir, attempt + 1);
    }
  } finally {
    await page.close().catch(() => {});
  }

  return result;
}

/* ──────────────────────  Heuristics & severity rules  ──────────────────── */

function deriveFindings(result, staticInfo) {
  const findings = [...staticInfo.findings];

  if (!result.ok) {
    findings.push({ id: "page-fatal", severity: "error", note: result.fatal ?? "page failed to audit" });
    return findings;
  }
  if (result.status && result.status >= 400) {
    findings.push({ id: "http-error", severity: "error", note: `HTTP ${result.status}` });
  }
  if (result.flags?.appError) {
    findings.push({ id: "next-app-error", severity: "error", note: "Next.js application error visible" });
  }
  if (result.flags?.hydrationFail) {
    findings.push({ id: "hydration-mismatch", severity: "error", note: "hydration warning detected in DOM" });
  }
  if (result.flags?.missingComponent) {
    findings.push({ id: "missing-component", severity: "error", note: "Element type is invalid / undefined" });
  }
  if (result.flags?.nestedButton) {
    findings.push({ id: "nested-button", severity: "error", note: "<button> nested inside <button> — invalid HTML, will trigger hydration warning" });
  }
  for (const err of result.pageErrors ?? []) {
    findings.push({ id: "page-error", severity: "error", note: err });
  }
  for (const err of result.consoleErrors ?? []) {
    findings.push({ id: "console-error", severity: "error", note: err.text });
  }
  // tolerate Next dev/HMR warnings; surface React warnings
  for (const w of result.consoleWarnings ?? []) {
    if (/Warning:|forwardRef|Each child|deprecated|Hydration|Invalid DOM|aria-/.test(w.text)) {
      findings.push({ id: "react-warning", severity: "warning", note: w.text });
    }
  }
  if (result.metrics) {
    const { height, descendantElements, textLength, empty } = result.metrics;
    if (empty) {
      findings.push({ id: "empty-preview", severity: "error", note: "preview rendered no children" });
    }
    if (height < 60 && descendantElements < 3) {
      findings.push({
        id: "tiny-preview",
        severity: "warning",
        note: `preview is ${height}px tall with ${descendantElements} descendants`,
      });
    }
    if (descendantElements < 4 && textLength < 4 && !empty) {
      findings.push({
        id: "shallow-preview",
        severity: "info",
        note: `only ${descendantElements} descendant elements, ${textLength} chars of text`,
      });
    }
  }
  return findings;
}

function severityRank(s) {
  return s === "error" ? 0 : s === "warning" ? 1 : s === "info" ? 2 : 3;
}

/* ────────────────────────  Token compliance scan  ──────────────────────── */

function scanTokenViolations() {
  const sourceFiles = walk(COMPONENTS_DIR).filter((f) => /\.tsx$/.test(f));
  const patterns = [
    { id: "hex-color", regex: /#[0-9a-fA-F]{3,8}\b/g, allowList: ["ColorPicker.tsx"] },
    // shadow-none is explicit zero; rounded-full and rounded-none are
    // semantic (pill / explicit zero), not bypasses. Flag scale values.
    { id: "hard-shadow", regex: /\bshadow-(?:sm|md|lg|xl|2xl|inner)\b/g },
    { id: "hard-radius", regex: /\brounded-(?:sm|md|lg|xl|2xl|3xl)\b/g },
    { id: "hard-duration", regex: /\bduration-(?:75|100|150|200|300|500|700|1000)\b/g },
    { id: "text-white", regex: /\btext-white\b/g },
    { id: "text-black", regex: /\btext-black\b/g },
    { id: "bg-white", regex: /\bbg-white\b/g },
    { id: "bg-black", regex: /\bbg-black\b/g },
  ];

  const violations = {};
  for (const file of sourceFiles) {
    const src = fs.readFileSync(file, "utf-8");
    const rel = path.relative(ROOT, file);
    for (const p of patterns) {
      if (p.allowList?.some((a) => file.endsWith(a))) continue;
      const matches = [...src.matchAll(p.regex)].filter((m) => {
        const start = m.index ?? 0;
        const ctx = src.slice(Math.max(0, start - 20), start + m[0].length + 20);
        // skip patterns inside `var(--s-*)` definitions
        if (ctx.includes("--s-")) return false;
        return true;
      });
      if (matches.length === 0) continue;
      const componentName = path.basename(file).replace(/\.tsx$/, "");
      violations[componentName] = violations[componentName] ?? [];
      violations[componentName].push({ id: p.id, file: rel, count: matches.length });
    }
  }
  return violations;
}

function walk(dir) {
  const out = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

/* ──────────────────────────────  Runner  ───────────────────────────────── */

async function run() {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const outDir = path.join(OUT_BASE, stamp);
  fs.mkdirSync(path.join(outDir, "screenshots"), { recursive: true });

  const slugs = listSlugs().filter((s) => !SLUG_FILTER || SLUG_FILTER.has(s));
  console.log(`Auditing ${slugs.length} component pages on ${BASE} (concurrency=${CONCURRENCY})`);

  const tokenViolations = scanTokenViolations();
  console.log(`Token-violation scan complete: ${Object.keys(tokenViolations).length} components flagged`);

  const browser = await chromium.launch({ headless: true });

  // Each worker keeps its own context so cookies, service workers, and the
  // dev server's hot-cache don't churn across pages.
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
      let r;
      try {
        r = await auditPage(ctx, slug, outDir);
      } catch (e) {
        r = {
          slug,
          ok: false,
          fatal: String(e).slice(0, 600),
        };
      }
      const staticInfo = staticAnalyze(slug);
      r.findings = deriveFindings(r, staticInfo);
      r.componentName = staticInfo.componentName ?? null;
      r.bareSelfClosing = staticInfo.bareSelfClosing ?? false;
      r.tokenViolations = r.componentName ? tokenViolations[r.componentName] ?? [] : [];
      results.push(r);
      done++;
      const errors = r.findings.filter((f) => f.severity === "error").length;
      const warnings = r.findings.filter((f) => f.severity === "warning").length;
      const flag = errors ? `❌ ${errors}E` : warnings ? `⚠ ${warnings}W` : "✓";
      const retry = (r.attempt ?? 0) > 0 ? ` (retry ${r.attempt})` : "";
      console.log(`  [${done}/${total}] ${flag.padEnd(6)} ${slug}${retry}`);
    }
  }

  await Promise.all(contexts.map((ctx) => worker(ctx)));
  await Promise.all(contexts.map((ctx) => ctx.close().catch(() => {})));
  await browser.close();

  results.sort((a, b) => {
    const sa = Math.min(...(a.findings ?? []).map((f) => severityRank(f.severity)).concat(99));
    const sb = Math.min(...(b.findings ?? []).map((f) => severityRank(f.severity)).concat(99));
    if (sa !== sb) return sa - sb;
    return a.slug.localeCompare(b.slug);
  });

  const summary = {
    base: BASE,
    timestamp: new Date().toISOString(),
    total: results.length,
    pages: {
      withErrors: results.filter((r) => r.findings?.some((f) => f.severity === "error")).length,
      withWarnings: results.filter((r) => r.findings?.some((f) => f.severity === "warning") && !r.findings.some((f) => f.severity === "error")).length,
      clean: results.filter((r) => !r.findings?.some((f) => f.severity === "error" || f.severity === "warning")).length,
    },
    tokenViolationComponents: Object.keys(tokenViolations).length,
  };

  fs.writeFileSync(
    path.join(outDir, "report.json"),
    JSON.stringify({ summary, results, tokenViolations }, null, 2),
  );
  fs.writeFileSync(path.join(outDir, "report.md"), formatMarkdown(summary, results, tokenViolations));

  console.log("\nSummary:");
  console.log(`  total       ${summary.total}`);
  console.log(`  errors      ${summary.pages.withErrors}`);
  console.log(`  warnings    ${summary.pages.withWarnings}`);
  console.log(`  clean       ${summary.pages.clean}`);
  console.log(`  token comp  ${summary.tokenViolationComponents} components with token violations`);
  console.log(`\nReport: ${path.relative(ROOT, outDir)}/report.md`);
}

/* ───────────────────────────  Markdown report  ─────────────────────────── */

function formatMarkdown(summary, results, tokenViolations) {
  const lines = [];
  lines.push(`# Sigil Component Audit`);
  lines.push("");
  lines.push(`Generated ${summary.timestamp} against \`${summary.base}\``);
  lines.push("");
  lines.push(`| Metric | Count |`);
  lines.push(`|---|---|`);
  lines.push(`| Total component pages | ${summary.total} |`);
  lines.push(`| Pages with errors | ${summary.pages.withErrors} |`);
  lines.push(`| Pages with warnings only | ${summary.pages.withWarnings} |`);
  lines.push(`| Clean pages | ${summary.pages.clean} |`);
  lines.push(`| Components with token violations | ${summary.tokenViolationComponents} |`);
  lines.push("");

  const errored = results.filter((r) => r.findings?.some((f) => f.severity === "error"));
  const warned = results.filter((r) => !r.findings?.some((f) => f.severity === "error") && r.findings?.some((f) => f.severity === "warning"));
  const informed = results.filter((r) => !r.findings?.some((f) => f.severity === "error" || f.severity === "warning") && r.findings?.some((f) => f.severity === "info"));

  if (errored.length) {
    lines.push(`## Errors (${errored.length})`);
    lines.push("");
    lines.push(formatTable(errored));
    lines.push("");
  }
  if (warned.length) {
    lines.push(`## Warnings (${warned.length})`);
    lines.push("");
    lines.push(formatTable(warned));
    lines.push("");
  }
  if (informed.length) {
    lines.push(`## Info (${informed.length})`);
    lines.push("");
    lines.push(formatTable(informed));
    lines.push("");
  }

  if (Object.keys(tokenViolations).length) {
    lines.push(`## Token violations`);
    lines.push("");
    lines.push(`| Component | Violations |`);
    lines.push(`|---|---|`);
    for (const [name, vs] of Object.entries(tokenViolations).sort()) {
      const pretty = vs.map((v) => `${v.id}×${v.count}`).join(", ");
      lines.push(`| ${name} | ${pretty} |`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

function formatTable(rows) {
  const out = [`| Slug | Component | Findings |`, `|---|---|---|`];
  for (const r of rows) {
    const findings = (r.findings ?? [])
      .sort((a, b) => severityRank(a.severity) - severityRank(b.severity))
      .map((f) => `\`${f.id}\` — ${escape(f.note)}`)
      .join("<br>");
    out.push(`| [${r.slug}](${r.url ?? `${BASE}/docs/components/${r.slug}`}) | ${r.componentName ?? "—"} | ${findings || "—"} |`);
  }
  return out.join("\n");
}

function escape(text) {
  return String(text ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ").slice(0, 280);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
