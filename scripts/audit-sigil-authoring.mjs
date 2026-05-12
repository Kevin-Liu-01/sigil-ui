#!/usr/bin/env node
/**
 * Static authoring audit for the Sigil codebase.
 *
 * This is intentionally different from browser audits: it checks whether code
 * is being written at the right layer. App pages should read like Sigil
 * composition, while token/preset decisions stay out of component JSX.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const CHECKS = [
  {
    id: "raw-grid-cell-math-in-app",
    root: "apps",
    include: /\.(tsx|ts)$/,
    exclude: [
      /apps\/web\/app\/api\//,
      /apps\/web\/components\/(sandbox|control-panel|devbar)/,
    ],
    pattern: /calc\(var\(--s-grid-cell\)/,
    severity: "error",
    message:
      "Use SigilSection space, SigilRhythmBox, SigilInline, SigilStack, or tokens instead of raw grid-cell math in app code.",
  },
  {
    id: "raw-sigilsection-padding",
    root: "apps",
    include: /\.(tsx|ts)$/,
    pattern: /<SigilSection[^>\n]*\s+padding=/,
    severity: "error",
    message:
      "Use SigilSection space=\"hero|compact|normal|spacious|footer|none\" instead of raw padding strings.",
  },
  {
    id: "structural-half-divider",
    root: "apps",
    include: /\.(tsx|ts)$/,
    pattern: /<Divider[^>\n]*size=["']sm["'][^>\n]*showBorders|<SigilDivider[^>\n]*size=["']sm["'][^>\n]*showBorders/,
    severity: "error",
    message:
      "Use size=\"md\" for structural section dividers; use Hairline for free-flow rules.",
  },
  {
    id: "page-local-rhythm-map",
    root: "apps",
    include: /\.(tsx|ts)$/,
    pattern: /const\s+grid\s*=\s*\{|SIGIL_RHYTHM_STYLES\s+as\s+grid/,
    severity: "error",
    message:
      "Do not create page-local rhythm maps. Add/consume package-level Sigil primitives instead.",
  },
  {
    id: "component-hardcoded-hex",
    root: "packages/components/src",
    include: /\.(tsx|ts)$/,
    exclude: [
      /Color/,
      /color-picker/i,
      /chart/i,
      /evil-/i,
    ],
    pattern: /(?<!&)#[0-9a-fA-F]{3,8}\b/,
    severity: "warning",
    message:
      "Visual colors in components should usually be tokens/presets, not hardcoded hex.",
  },
  {
    id: "component-tailwind-visual-shortcut",
    root: "packages/components/src",
    include: /\.(tsx|ts)$/,
    exclude: [
      /layout\/sigil\/SigilComposition\.tsx$/,
    ],
    pattern: /(^|[\s"'`])(rounded-(sm|md|lg|xl|2xl|full)|shadow-(sm|md|lg|xl)|duration-(75|100|150|200|300|500)|bg-(white|black)|text-(white|black))(\s|["'`]|$)/,
    severity: "warning",
    message:
      "Prefer component/preset tokens (`var(--s-*)`) over Tailwind visual shortcuts in package components.",
  },
];

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".next" || entry.name === "dist") {
      continue;
    }
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const findings = [];
for (const check of CHECKS) {
  const files = walk(path.join(ROOT, check.root));
  for (const file of files) {
    const rel = path.relative(ROOT, file);
    if (!check.include.test(file)) continue;
    if (check.exclude?.some((re) => re.test(rel))) continue;
    const source = fs.readFileSync(file, "utf8");
    const lines = source.split(/\r?\n/);
    lines.forEach((line, index) => {
      if (check.pattern.test(line)) {
        findings.push({
          id: check.id,
          severity: check.severity,
          file: rel,
          line: index + 1,
          message: check.message,
          excerpt: line.trim().slice(0, 180),
        });
      }
    });
  }
}

const errors = findings.filter((f) => f.severity === "error");
const warnings = findings.filter((f) => f.severity === "warning");

console.log("Sigil authoring audit");
console.log(`Errors: ${errors.length}`);
console.log(`Warnings: ${warnings.length}`);

for (const finding of findings) {
  const marker = finding.severity === "error" ? "ERROR" : "WARN";
  console.log(
    `${marker} ${finding.id} ${finding.file}:${finding.line}\n  ${finding.message}\n  ${finding.excerpt}`,
  );
}

if (errors.length > 0) process.exit(1);
