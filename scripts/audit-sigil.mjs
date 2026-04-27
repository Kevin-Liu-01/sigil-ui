import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const componentRoot = path.join(root, "packages/components/src");
const indexPath = path.join(componentRoot, "index.ts");
const webDocsRoot = path.join(root, "apps/web/content/docs");
const docsRoot = path.join(root, "apps/docs/content/docs");
const showcasePath = path.join(root, "apps/web/components/landing/component-showcase.tsx");
const canvasRegistryPath = path.join(root, "apps/web/components/sandbox/canvas-item.tsx");
const presetCatalogPath = path.join(root, "packages/presets/src/catalog.ts");

const exportNames = extractExports(read(indexPath));
const webDocs = listMdxSlugs(webDocsRoot);
const docsDocs = listMdxSlugs(docsRoot);
const showcaseNames = extractStringValues(read(showcasePath), /name:\s*"([^"]+)"/g);
const canvasNames = extractRegistryKeys(read(canvasRegistryPath));

const sourceFiles = walk(componentRoot).filter((file) => /\.(tsx?|json)$/.test(file));
const violations = scanTokenViolations(sourceFiles);
const staleCliDocs = scanStaleCliDocs([webDocsRoot, docsRoot]);
const presetNames = extractStringValues(read(presetCatalogPath), /\bname:\s*"([^"]+)"/g);
const productFactDrift = scanProductFactDrift(presetNames.size);

const report = {
  exports: {
    count: exportNames.length,
    names: exportNames,
  },
  docs: {
    webCount: webDocs.size,
    docsCount: docsDocs.size,
    missingInWeb: [...docsDocs].filter((slug) => !webDocs.has(slug)).sort(),
    missingInDocs: [...webDocs].filter((slug) => !docsDocs.has(slug)).sort(),
  },
  demos: {
    showcaseCount: showcaseNames.size,
    canvasCount: canvasNames.size,
    exportedWithoutShowcase: exportNames.filter((name) => shouldHaveDemo(name) && !showcaseNames.has(name)).sort(),
    exportedWithoutCanvas: exportNames.filter((name) => shouldHaveCanvasDemo(name) && !canvasNames.has(name)).sort(),
  },
  tokenViolations: violations,
  staleCliDocs,
  productFacts: {
    presetCount: presetNames.size,
    drift: productFactDrift,
  },
};

printReport(report);

const hasErrors = staleCliDocs.length > 0 || productFactDrift.length > 0;
if (hasErrors) {
  process.exitCode = 1;
}

function read(file) {
  return fs.readFileSync(file, "utf-8");
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return full;
  });
}

function extractExports(source) {
  const names = new Set();
  const exportBlocks = source.matchAll(/export\s*\{([\s\S]*?)\}\s*from\s*"[^"]+"/g);
  for (const block of exportBlocks) {
    const entries = block[1].split(",");
    for (const raw of entries) {
      const entry = raw.trim();
      if (!entry || entry.startsWith("type ")) continue;
      const clean = entry.replace(/^type\s+/, "").split(/\s+as\s+/).pop()?.trim();
      if (clean && /^[A-Z][A-Za-z0-9]+$/.test(clean)) names.add(clean);
    }
  }
  return [...names].sort();
}

function listMdxSlugs(dir) {
  const slugs = new Set();
  if (!fs.existsSync(dir)) return slugs;
  for (const file of walk(dir)) {
    if (!file.endsWith(".mdx")) continue;
    const rel = path.relative(dir, file).replaceAll(path.sep, "/").replace(/\.mdx$/, "");
    slugs.add(rel);
  }
  return slugs;
}

function extractStringValues(source, regex) {
  return new Set([...source.matchAll(regex)].map((match) => match[1]));
}

function extractRegistryKeys(source) {
  const registryMatch = source.match(/COMPONENT_REGISTRY[\s\S]*?=\s*\{([\s\S]*?)\n\};/);
  if (!registryMatch) return new Set();
  return new Set([...registryMatch[1].matchAll(/^\s*([A-Z][A-Za-z0-9]+):/gm)].map((match) => match[1]));
}

function shouldHaveDemo(name) {
  if (/^(SigilSoundContext|SigilSoundProvider|Provider|Toaster|Spinner|PRESETS)$/.test(name)) return false;
  if (/^(H1|H2|H3|H4|Lead|Large|Small|Muted|Paragraph|InlineCode)$/.test(name)) return false;
  if (/(Trigger|Content|Header|Footer|Title|Description|Close|Action|Cancel|Item|Group|Label|Separator|Provider|Value|Input|List|Empty|Body|Row|Head|Cell|Caption|Previous|Next|Handle|Addon|Text|Button|Field|Control|Message)$/.test(name)) return false;
  if (/^(CardHeader|CardTitle|CardDescription|CardContent|CardFooter|TableHeader|TableBody|TableRow|TableHead|TableCell|TableCaption)$/.test(name)) return false;
  if (/^(SigilFrame|SigilGutter|SigilFullBleed|VoronoiCell|GapPixelCell|AccentActive|DiagramCalloutLine)$/.test(name)) return false;
  if (/^(SigilGrid|Section|Frame|PageGrid|Margin|Gutter|SigilPageGrid|SigilSection|SigilNavbar|LayoutControls|SectionDivider|Main|Aside|PageShell)$/.test(name)) return false;
  if (/^(SigilCursor|InputOTPSlot|ChartContainer|ChartTooltip|ChartLegend|Fieldset|FieldError|InputGroupTextarea|AccessibleIcon|VisuallyHidden)$/.test(name)) return false;
  if (/^(NavbarLogo|NavbarLinks|NavbarActions|NavigationMenuLink|MenubarMenu|ToolbarLink|CommandDialog|ContextMenuSub|DropdownMenuSub)$/.test(name)) return false;
  if (/^(ExplodedBox3D|FeaturedGrid)$/.test(name)) return false;
  if (/^(ScrollTrigger)$/.test(name)) return false;
  return true;
}

function shouldHaveCanvasDemo(name) {
  return /^(Button|Card|Badge|Input|Textarea|Select|Checkbox|Switch|Slider|Progress|Avatar|KPI|Terminal|CodeBlock|Stack|Box|Container|Flex|SimpleGrid|Center|Hero|CTA|Pricing|Navbar|Table|Tabs|Accordion|Tooltip|LoadingSpinner)$/.test(name);
}

function scanTokenViolations(files) {
  const patterns = [
    { id: "hex-color", regex: /#[0-9a-fA-F]{3,8}\b/g },
    { id: "rgb-color", regex: /\brgba?\(/g },
    { id: "hard-shadow", regex: /\bshadow-(?:sm|md|lg|xl|2xl)\b/g },
    { id: "hard-radius", regex: /\brounded-(?:none|sm|md|lg|xl|2xl|3xl|full)\b/g },
    { id: "hard-duration", regex: /\bduration-(?:75|100|150|200|300|500|700|1000)\b/g },
    { id: "text-white", regex: /\btext-white\b/g },
    { id: "border-token-as-fill", regex: /(?:backgroundColor|fill|bg-)\s*[:=]?\s*["'`][^"'`]*var\(--s-border/g },
  ];

  const results = [];
  for (const file of files) {
    if (file.endsWith("spinners-catalog.json")) continue;
    const source = read(file);
    for (const pattern of patterns) {
      const matches = [...source.matchAll(pattern.regex)].filter((match) => {
        const start = match.index ?? 0;
        const context = source.slice(Math.max(0, start - 12), start + match[0].length + 12);
        if (pattern.id === "hex-color" && path.basename(file) === "ColorPicker.tsx") return false;
        if (pattern.id === "hex-color" && source[start - 1] === "&") return false;
        return !context.includes("--s-");
      });
      if (matches.length === 0) continue;
      results.push({
        id: pattern.id,
        file: path.relative(root, file).replaceAll(path.sep, "/"),
        count: matches.length,
      });
    }
  }
  return results.sort((a, b) => a.id.localeCompare(b.id) || b.count - a.count);
}

function scanStaleCliDocs(dirs) {
  const stale = [];
  const patterns = [
    /npx sigil\b/,
    /sigil compile\b/,
    /sigil eject\b/,
    /--skip-install\b/,
    /--cwd\b/,
    /CLI ships with the `@sigil-ui\/tokens` package/,
  ];

  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    for (const file of walk(dir)) {
      if (!file.endsWith(".mdx")) continue;
      const source = read(file);
      for (const pattern of patterns) {
        if (pattern.test(source)) {
          stale.push(path.relative(root, file).replaceAll(path.sep, "/"));
          break;
        }
      }
    }
  }
  return [...new Set(stale)].sort();
}

function scanProductFactDrift(presetCount) {
  const files = [
    path.join(root, "README.md"),
    path.join(root, "AGENTS.md"),
    path.join(root, "packages/cli/README.md"),
    path.join(root, "packages/create-sigil-app/README.md"),
    path.join(root, "packages/components/README.md"),
    path.join(root, "packages/presets/README.md"),
    path.join(root, "packages/tokens/README.md"),
    ...walk(path.join(root, "apps/web/app")).filter((file) => /\.(tsx?|mdx?)$/.test(file)),
    ...walk(path.join(root, "apps/web/components")).filter((file) => /\.(tsx?|mdx?)$/.test(file)),
    ...walk(webDocsRoot).filter((file) => file.endsWith(".mdx")),
    ...walk(docsRoot).filter((file) => file.endsWith(".mdx")),
  ].filter((file) => fs.existsSync(file));

  const stale = [];
  const wrongPresetCount = new RegExp(`\\b(?!${presetCount}\\b)\\d+\\s+presets\\b`, "i");
  const staleExamples = [
    /--preset\s+(?:minimal|brutalist)\b/,
    /\bsigil\s+preset\s+brutalist\b/,
    /\b@sigil-ui\/cli\s+compile\b/,
  ];

  for (const file of files) {
    const source = read(file);
    const failures = [];
    if (wrongPresetCount.test(source)) failures.push(`preset count must be ${presetCount}`);
    for (const pattern of staleExamples) {
      if (pattern.test(source)) failures.push(`stale example: ${pattern}`);
    }
    if (failures.length === 0) continue;
    stale.push({
      file: path.relative(root, file).replaceAll(path.sep, "/"),
      failures,
    });
  }

  return stale.sort((a, b) => a.file.localeCompare(b.file));
}

function printReport(data) {
  console.log("Sigil audit");
  console.log(`- exports: ${data.exports.count}`);
  console.log(`- docs: web=${data.docs.webCount}, docs=${data.docs.docsCount}`);
  console.log(`- missing web docs from docs app: ${data.docs.missingInWeb.length}`);
  console.log(`- missing docs app pages from web: ${data.docs.missingInDocs.length}`);
  console.log(`- showcase demos: ${data.demos.showcaseCount}`);
  console.log(`- canvas demos: ${data.demos.canvasCount}`);
  console.log(`- exported without showcase: ${data.demos.exportedWithoutShowcase.length}`);
  console.log(`- exported without canvas baseline: ${data.demos.exportedWithoutCanvas.length}`);
  console.log(`- token-pattern findings: ${data.tokenViolations.length}`);
  console.log(`- stale CLI docs: ${data.staleCliDocs.length}`);
  console.log(`- preset catalog count: ${data.productFacts.presetCount}`);
  console.log(`- product fact drift: ${data.productFacts.drift.length}`);

  if (data.staleCliDocs.length > 0) {
    console.log("\nStale CLI docs:");
    for (const file of data.staleCliDocs) console.log(`  - ${file}`);
  }

  if (data.productFacts.drift.length > 0) {
    console.log("\nProduct fact drift:");
    for (const item of data.productFacts.drift) {
      console.log(`  - ${item.file}: ${item.failures.join("; ")}`);
    }
  }

  const topViolations = data.tokenViolations.slice(0, 20);
  if (topViolations.length > 0) {
    console.log("\nTop token-pattern findings:");
    for (const item of topViolations) {
      console.log(`  - ${item.id}: ${item.file} (${item.count})`);
    }
  }
}

