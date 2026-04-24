#!/usr/bin/env node
/**
 * Reads every component source in packages/components/src and generates
 * MDX doc pages for apps/docs/content/docs with live <ComponentPreview>.
 *
 * Usage:  node apps/docs/scripts/generate-docs.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "fs";
import { join, basename, dirname } from "path";

const ROOT = join(import.meta.dirname, "..", "..", "..", "packages", "components", "src");
const DOCS = join(import.meta.dirname, "..", "content", "docs");

// ---- helpers ----

function readFile(p) {
  try { return readFileSync(p, "utf-8"); } catch { return null; }
}

function slug(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

function extractPropsInterface(source, componentName) {
  const patterns = [
    new RegExp(`export\\s+(?:interface|type)\\s+${componentName}Props[^{]*\\{([^}]+(?:\\{[^}]*\\}[^}]*)*)\\}`, "s"),
    new RegExp(`export\\s+(?:interface|type)\\s+${componentName}Props[^{]*\\{([\\s\\S]*?)\\n\\}`, "m"),
  ];

  for (const pattern of patterns) {
    const m = source.match(pattern);
    if (m) return parseProps(m[1]);
  }
  return [];
}

function parseProps(body) {
  const props = [];
  const lines = body.split("\n");
  let currentComment = "";

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("/**") || trimmed.startsWith("/*") || trimmed.startsWith("*")) {
      const commentText = trimmed.replace(/^\/?\*+\s?|\*\/$/g, "").trim();
      if (commentText) currentComment += (currentComment ? " " : "") + commentText;
      continue;
    }
    if (trimmed.startsWith("//")) {
      currentComment = trimmed.replace(/^\/\/\s?/, "").trim();
      continue;
    }

    // match: propName?: Type; or propName: Type;
    const propMatch = trimmed.match(/^(\w+)(\?)?:\s*(.+?);?\s*$/);
    if (propMatch) {
      const [, name, optional, rawType] = propMatch;
      if (name === "children" || name === "className" || name === "style" || name === "ref") {
        currentComment = "";
        continue;
      }
      let type = rawType.replace(/;$/, "").trim();
      // extract @default
      let defaultVal = "—";
      const defaultMatch = currentComment.match(/@default\s+"?([^"]+)"?/);
      if (defaultMatch) {
        defaultVal = `\`${defaultMatch[1].trim()}\``;
        currentComment = currentComment.replace(/@default\s+"?[^"]*"?\s*/, "").trim();
      }

      // clean up type for display
      type = type.replace(/\s+/g, " ");
      if (type.length > 60) type = type.slice(0, 57) + "...";

      props.push({
        name,
        type: `\`${type}\``,
        default: defaultVal,
        required: !optional,
        description: currentComment || "—",
      });
      currentComment = "";
    } else {
      if (!trimmed || trimmed === "}" || trimmed.startsWith("extends")) {
        // skip
      }
      currentComment = "";
    }
  }
  return props;
}

function extractExportedComponents(source) {
  const names = [];
  const re = /export\s+(?:const|function)\s+(\w+)/g;
  let m;
  while ((m = re.exec(source))) {
    if (m[1][0] === m[1][0].toUpperCase()) names.push(m[1]);
  }
  return names;
}

function getTokenVars(source) {
  const vars = new Set();
  const re = /var\(--s-([a-z0-9-]+)/g;
  let m;
  while ((m = re.exec(source))) vars.add(`--s-${m[1]}`);
  return [...vars].slice(0, 12);
}

// ---- MDX generation per category ----

const CATEGORIES = [
  {
    dir: "ui",
    docsDir: "components",
    label: "Components",
    skip: ["Direction", "VisuallyHidden", "AccessibleIcon", "Form", "Field"],
  },
  { dir: "layout", docsDir: "layout", label: "Layout", skip: [] },
  { dir: "navigation", docsDir: "navigation", label: "Navigation", skip: [] },
  { dir: "overlays", docsDir: "overlays", label: "Overlays", skip: [] },
  { dir: "shapes", docsDir: "shapes", label: "Shapes", skip: [] },
  { dir: "3d", docsDir: "3d", label: "3D", skip: [] },
  { dir: "diagrams", docsDir: "diagrams", label: "Diagrams", skip: [] },
  { dir: "marketing", docsDir: "marketing", label: "Marketing", skip: [] },
  { dir: "patterns", docsDir: "patterns", label: "Patterns", skip: [] },
  { dir: "sections", docsDir: "sections", label: "Sections", skip: [] },
  { dir: "playbook", docsDir: "playbook", label: "Playbook", skip: [] },
  { dir: "animation", docsDir: "animation", label: "Animation", skip: [] },
];

function getComponentFiles(srcDir) {
  const files = [];
  if (!existsSync(srcDir)) return files;
  for (const f of readdirSync(srcDir, { withFileTypes: true })) {
    if (f.isFile() && f.name.endsWith(".tsx") && f.name[0] === f.name[0].toUpperCase()) {
      files.push(join(srcDir, f.name));
    }
    if (f.isDirectory() && f.name === "templates") {
      for (const tf of readdirSync(join(srcDir, f.name))) {
        if (tf.endsWith(".tsx") && tf[0] === tf[0].toUpperCase()) {
          files.push(join(srcDir, f.name, tf));
        }
      }
    }
  }
  return files;
}

function generatePreview(componentName, props) {
  const simpleComponents = [
    "Separator", "Divider", "HRule", "Spacer", "Skeleton",
    "Progress", "CircularProgress", "Meter", "ScrollProgress",
  ];
  const textComponents = [
    "Badge", "Label", "Kbd", "MonoLabel", "InlineCode",
  ];

  if (simpleComponents.includes(componentName)) {
    return `<ComponentPreview>\n  <${componentName} />\n</ComponentPreview>`;
  }

  if (textComponents.includes(componentName)) {
    return `<ComponentPreview>\n  <${componentName}>${componentName} example</${componentName}>\n</ComponentPreview>`;
  }

  if (componentName === "Button") {
    return `<ComponentPreview>\n  <Button variant="primary">Primary</Button>\n  <Button variant="secondary">Secondary</Button>\n  <Button variant="outline">Outline</Button>\n  <Button variant="ghost">Ghost</Button>\n</ComponentPreview>`;
  }
  if (componentName === "Input") {
    return `<ComponentPreview vertical>\n  <Input placeholder="Enter text..." />\n</ComponentPreview>`;
  }
  if (componentName === "Textarea") {
    return `<ComponentPreview vertical>\n  <Textarea placeholder="Write something..." />\n</ComponentPreview>`;
  }
  if (componentName === "Switch") {
    return `<ComponentPreview>\n  <Switch />\n</ComponentPreview>`;
  }
  if (componentName === "Checkbox") {
    return `<ComponentPreview>\n  <Checkbox />\n</ComponentPreview>`;
  }
  if (componentName === "Slider") {
    return `<ComponentPreview>\n  <Slider defaultValue={[50]} />\n</ComponentPreview>`;
  }
  if (componentName === "Toggle") {
    return `<ComponentPreview>\n  <Toggle>Toggle</Toggle>\n</ComponentPreview>`;
  }
  if (componentName === "Avatar") {
    return `<ComponentPreview>\n  <Avatar name="Kevin Liu" />\n</ComponentPreview>`;
  }

  // For components with children prop
  const hasChildren = props.some(p => p.name === "children");
  if (hasChildren || componentName.match(/Section|Card|Panel|Banner|Alert|Hero|CTA/)) {
    return `<ComponentPreview vertical>\n  <${componentName}>\n    ${componentName} content\n  </${componentName}>\n</ComponentPreview>`;
  }

  return `<ComponentPreview>\n  <${componentName} />\n</ComponentPreview>`;
}

function generateMdx(componentName, source, filePath, category) {
  const props = extractPropsInterface(source, componentName);
  const exports = extractExportedComponents(source);
  const tokens = getTokenVars(source);
  const isLayout = category.dir === "layout";
  const isAnimation = category.dir === "animation";
  const isDiagram = category.dir === "diagrams";
  const isSection = category.dir === "sections";

  // Build description
  let description = `A ${componentName} component from the Sigil design system.`;
  const docComment = source.match(/\/\*\*\s*\n([^*]*(?:\*(?!\/)[^*]*)*)\*\//);
  if (docComment) {
    const cleaned = docComment[1].replace(/\s*\*\s*/g, " ").trim();
    if (cleaned.length > 10 && cleaned.length < 200) description = cleaned;
  }

  // Build import path
  const importName = exports.length > 0 ? exports.join(", ") : componentName;
  const importPath = "@sigil-ui/components";

  // Build preview — only for components that make sense to preview inline
  const noPreview = isDiagram || isSection || isAnimation || 
    ["AppShell", "PageShell", "PageGrid", "SigilPageGrid", "SigilNavbar", "Footer", "Navbar",
     "Sidebar", "NavigationMenu", "Menubar", "Toolbar",
     "Dialog", "Sheet", "AlertDialog", "Drawer", "Command", "CommandDialog",
     "ContextMenu", "DropdownMenu", "Popover", "HoverCard", "PreviewCard",
     "Toaster", "Sonner", "toast", "sonnerToast",
     "Form", "FormField", "FormItem",
     "Carousel", "Calendar", "DatePicker", "DataTable",
     "ChartContainer", "Chart",
     "DirectionProvider",
     "TooltipProvider",
     "LayoutControls",
    ].includes(componentName);

  let preview = "";
  if (!noPreview) {
    preview = `\n## Preview\n\n${generatePreview(componentName, props)}\n`;
  }

  // Build props table
  let propsTable = "";
  if (props.length > 0) {
    propsTable = `\n## Props\n\n| Prop | Type | Default | Description |\n|---|---|---|---|\n`;
    for (const p of props) {
      propsTable += `| \`${p.name}\` | ${p.type} | ${p.default} | ${p.description} |\n`;
    }
  }

  // Build token table
  let tokenTable = "";
  if (tokens.length > 0) {
    tokenTable = `\n## Token integration\n\n| CSS Variable | Purpose |\n|---|---|\n`;
    for (const t of tokens) {
      const purpose = t.replace("--s-", "").replace(/-/g, " ");
      tokenTable += `| \`${t}\` | ${purpose.charAt(0).toUpperCase() + purpose.slice(1)} |\n`;
    }
  }

  // Build sub-component docs
  let subComponents = "";
  if (exports.length > 1) {
    const subExports = exports.filter(e => e !== componentName);
    if (subExports.length > 0) {
      subComponents = `\n## Sub-components\n\nThis component includes the following parts:\n\n${subExports.map(s => `- \`<${s}>\``).join("\n")}\n`;
    }
  }

  return `---
title: ${componentName}
description: "${description.replace(/"/g, '\\"')}"
---

## Import

\`\`\`tsx
import { ${importName} } from "${importPath}";
\`\`\`
${preview}
## Usage

\`\`\`tsx
<${componentName}>${exports.length <= 1 && !noPreview ? `${componentName} content` : "..."}</${componentName}>
\`\`\`
${subComponents}${propsTable}${tokenTable}`;
}

// ---- main ----

let totalGenerated = 0;
const allMetaUpdates = {};

for (const cat of CATEGORIES) {
  const srcDir = join(ROOT, cat.dir);
  const docsDir = join(DOCS, cat.docsDir);
  mkdirSync(docsDir, { recursive: true });

  const files = getComponentFiles(srcDir);
  const pageNames = [];

  // Special handling for playbook (index.ts barrel)
  if (cat.dir === "playbook") {
    const indexPath = join(srcDir, "index.ts");
    const indexSource = readFile(indexPath);
    if (indexSource) {
      const exportMatch = indexSource.matchAll(/export\s*\{[^}]*\}\s*from\s*"\.\/(\w+)"/g);
      for (const m of exportMatch) {
        const modName = m[1];
        const modPath = join(srcDir, `${modName}.tsx`);
        const modSource = readFile(modPath);
        if (!modSource) continue;
        const exports = extractExportedComponents(modSource);
        const mainComponent = exports[0];
        if (!mainComponent || cat.skip.includes(mainComponent)) continue;
        const s = slug(mainComponent);
        const mdx = generateMdx(mainComponent, modSource, modPath, cat);
        writeFileSync(join(docsDir, `${s}.mdx`), mdx);
        pageNames.push(s);
        totalGenerated++;
      }
    }
    allMetaUpdates[cat.docsDir] = { title: cat.label, pages: pageNames };
    continue;
  }

  for (const filePath of files) {
    const source = readFile(filePath);
    if (!source) continue;

    const fileName = basename(filePath, ".tsx");
    if (cat.skip.includes(fileName)) continue;

    const exports = extractExportedComponents(source);
    const mainComponent = exports[0] || fileName;
    if (cat.skip.includes(mainComponent)) continue;

    // Skip hooks and utility-only files
    if (fileName.startsWith("use") || fileName === "animate") continue;

    const s = slug(mainComponent);
    const outPath = join(docsDir, `${s}.mdx`);

    // Don't overwrite manually curated pages (button, card, input)
    if (existsSync(outPath) && ["button", "card", "input"].includes(s)) {
      pageNames.push(s);
      continue;
    }

    const mdx = generateMdx(mainComponent, source, filePath, cat);
    writeFileSync(outPath, mdx);
    pageNames.push(s);
    totalGenerated++;
  }

  allMetaUpdates[cat.docsDir] = { title: cat.label, pages: pageNames };
}

// Write meta.json for each category
for (const [dir, meta] of Object.entries(allMetaUpdates)) {
  if (meta.pages.length === 0) continue;
  const metaPath = join(DOCS, dir, "meta.json");
  writeFileSync(metaPath, JSON.stringify(meta, null, 2) + "\n");
}

// Update root meta.json
const rootMeta = {
  title: "Docs",
  pages: [
    "---Getting Started---",
    "index",
    "installation",
    "theming",
    "cli",
    "---Components---",
    "...components",
    "---Layout---",
    "...layout",
    "---Navigation---",
    "...navigation",
    "---Overlays---",
    "...overlays",
    "---Shapes---",
    "...shapes",
    "---3D---",
    "...3d",
    "---Diagrams---",
    "...diagrams",
    "---Marketing---",
    "...marketing",
    "---Patterns---",
    "...patterns",
    "---Sections---",
    "...sections",
    "---Playbook---",
    "...playbook",
    "---Animation---",
    "...animation",
  ],
};
writeFileSync(join(DOCS, "meta.json"), JSON.stringify(rootMeta, null, 2) + "\n");

console.log(`Generated ${totalGenerated} component doc pages.`);
console.log("Categories:", Object.entries(allMetaUpdates).map(([k, v]) => `${k}(${v.pages.length})`).join(", "));
