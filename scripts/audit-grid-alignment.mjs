#!/usr/bin/env node

import { chromium } from "playwright";

const args = new Map(
  process.argv.slice(2).map((arg) => {
    const [key, ...rest] = arg.split("=");
    return [key.replace(/^--/, ""), rest.join("=") || "true"];
  }),
);

const base = args.get("base") ?? "http://localhost:3000";
const path = args.get("path") ?? "/";
const epsilon = Number(args.get("epsilon") ?? 0.5);
const viewportWidth = Number(args.get("width") ?? 1024);
const viewportHeight = Number(args.get("height") ?? 768);

function formatPx(value) {
  return `${Number(value).toFixed(3)}px`;
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: viewportWidth, height: viewportHeight },
  colorScheme: args.get("scheme") === "dark" ? "dark" : "light",
});

await page.goto(new URL(path, base).toString(), {
  waitUntil: "domcontentloaded",
  timeout: Number(args.get("timeout") ?? 30_000),
});
await page.waitForTimeout(Number(args.get("settle") ?? 2_500));

const result = await page.evaluate(() => {
  const box = (el) => {
    const r = el.getBoundingClientRect();
    return {
      top: r.top,
      bottom: r.bottom,
      height: r.height,
    };
  };

  const resolvedGridCellPx = () => {
    const probe = document.createElement("div");
    probe.style.cssText =
      "position:absolute;left:-9999px;top:0;width:1px;height:var(--s-grid-cell);visibility:hidden;pointer-events:none;margin:0;padding:0;border:0;box-sizing:border-box;";
    document.body.appendChild(probe);
    const height = probe.getBoundingClientRect().height;
    document.body.removeChild(probe);
    return height;
  };

  const content = document.querySelector("[data-layout='sigil-content']");
  if (!content) {
    return {
      ok: false,
      error: "Missing [data-layout='sigil-content']; SigilPageGrid content origin is not discoverable.",
    };
  }

  const G = resolvedGridCellPx();
  const origin = content.getBoundingClientRect().top;
  const mod = (value) => {
    const raw = ((value % G) + G) % G;
    return raw > G / 2 ? raw - G : raw;
  };

  const sections = [...document.querySelectorAll("[data-slot='sigilsection']")].map(
    (section, index) => {
      const b = box(section);
      const top = b.top - origin;
      const bottom = b.bottom - origin;
      return {
        kind: "section",
        index,
        top,
        bottom,
        height: b.height,
        topRemainder: mod(top),
        bottomRemainder: mod(bottom),
        snapPad: section.getAttribute("data-sigil-snap-pad"),
      };
    },
  );

  const dividers = [...document.querySelectorAll("[data-slot='divider']")].map(
    (divider, index) => {
      const b = box(divider);
      const fill = divider.firstElementChild;
      const style = getComputedStyle(divider);
      const fillStyle = fill ? getComputedStyle(fill) : null;
      const top = b.top - origin;
      const bottom = b.bottom - origin;
      return {
        kind: "divider",
        index,
        top,
        bottom,
        height: b.height,
        topRemainder: mod(top),
        bottomRemainder: mod(bottom),
        heightRemainder: mod(b.height),
        borderTop: style.borderTopWidth,
        borderBottom: style.borderBottomWidth,
        boxShadow: style.boxShadow,
        fillTop: fillStyle?.top ?? null,
        fillBottom: fillStyle?.bottom ?? null,
      };
    },
  );

  return {
    ok: true,
    url: location.href,
    gridCellPx: G,
    sections,
    dividers,
  };
});

await browser.close();

if (!result.ok) {
  console.error(result.error);
  process.exit(1);
}

const failures = [];
for (const item of [...result.sections, ...result.dividers]) {
  for (const key of ["topRemainder", "bottomRemainder"]) {
    if (Math.abs(item[key]) > epsilon) {
      failures.push({ ...item, failed: key });
    }
  }
  if (
    item.kind === "divider" &&
    Math.abs(item.heightRemainder) > epsilon &&
    Math.abs(Math.abs(item.heightRemainder) - result.gridCellPx) > epsilon
  ) {
    failures.push({ ...item, failed: "heightRemainder" });
  }
}

console.log(`Grid alignment audit: ${result.url}`);
console.log(`Resolved --s-grid-cell: ${formatPx(result.gridCellPx)}`);
console.log(`Sections checked: ${result.sections.length}`);
console.log(`Dividers checked: ${result.dividers.length}`);

if (failures.length > 0) {
  console.error(`\n${failures.length} alignment failure(s):`);
  for (const failure of failures) {
    console.error(
      `- ${failure.kind}[${failure.index}] ${failure.failed}: top=${formatPx(
        failure.top,
      )} bottom=${formatPx(failure.bottom)} height=${formatPx(
        failure.height,
      )} remainder=${formatPx(failure[failure.failed])}`,
    );
  }
  process.exit(1);
}

console.log("All section and divider boundaries land on full grid-cell intervals.");
