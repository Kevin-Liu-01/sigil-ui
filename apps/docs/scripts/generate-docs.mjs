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
    "Badge", "Label", "Kbd", "MonoLabel", "InlineCode", "Small", "Muted", "Large", "Lead",
  ];
  const statusComponents = [
    "StatusBadge", "StatusDot", "StatusPill", "OnlineIndicator",
  ];

  if (simpleComponents.includes(componentName)) {
    return `<ComponentPreview>\n  <${componentName} />\n</ComponentPreview>`;
  }

  if (textComponents.includes(componentName)) {
    return `<ComponentPreview>\n  <${componentName}>${componentName} example</${componentName}>\n</ComponentPreview>`;
  }

  if (statusComponents.includes(componentName)) {
    return `<ComponentPreview>\n  <${componentName} status="success" />\n  <${componentName} status="warning" />\n  <${componentName} status="error" />\n</ComponentPreview>`;
  }

  const specific = {
    Button: `<ComponentPreview>\n  <Button variant="primary">Primary</Button>\n  <Button variant="secondary">Secondary</Button>\n  <Button variant="outline">Outline</Button>\n  <Button variant="ghost">Ghost</Button>\n</ComponentPreview>`,
    Input: `<ComponentPreview vertical>\n  <Input placeholder="Enter text..." />\n</ComponentPreview>`,
    Textarea: `<ComponentPreview vertical>\n  <Textarea placeholder="Write something..." rows={3} />\n</ComponentPreview>`,
    Switch: `<ComponentPreview>\n  <Switch />\n</ComponentPreview>`,
    Checkbox: `<ComponentPreview>\n  <Checkbox />\n</ComponentPreview>`,
    Slider: `<ComponentPreview>\n  <Slider defaultValue={[50]} />\n</ComponentPreview>`,
    Toggle: `<ComponentPreview>\n  <Toggle>Toggle</Toggle>\n</ComponentPreview>`,
    Avatar: `<ComponentPreview>\n  <Avatar name="Kevin Liu" />\n</ComponentPreview>`,
    Accordion: `<ComponentPreview vertical>\n  <Accordion type="single" collapsible>\n    <AccordionItem value="item-1">\n      <AccordionTrigger>What is Sigil UI?</AccordionTrigger>\n      <AccordionContent>A token-driven design system where one file updates everything.</AccordionContent>\n    </AccordionItem>\n  </Accordion>\n</ComponentPreview>`,
    Tabs: `<ComponentPreview vertical>\n  <Tabs defaultValue="tab1">\n    <TabsList>\n      <TabsTrigger value="tab1">Overview</TabsTrigger>\n      <TabsTrigger value="tab2">Usage</TabsTrigger>\n    </TabsList>\n    <TabsContent value="tab1">Overview content</TabsContent>\n    <TabsContent value="tab2">Usage content</TabsContent>\n  </Tabs>\n</ComponentPreview>`,
    Select: `<ComponentPreview>\n  <Select>\n    <SelectTrigger className="w-48">\n      <SelectValue placeholder="Choose option" />\n    </SelectTrigger>\n    <SelectContent>\n      <SelectItem value="a">Option A</SelectItem>\n      <SelectItem value="b">Option B</SelectItem>\n    </SelectContent>\n  </Select>\n</ComponentPreview>`,
    RadioGroup: `<ComponentPreview>\n  <RadioGroup defaultValue="a">\n    <RadioGroupItem value="a" />\n    <RadioGroupItem value="b" />\n  </RadioGroup>\n</ComponentPreview>`,
    ToggleGroup: `<ComponentPreview>\n  <ToggleGroup type="single">\n    <ToggleGroupItem value="a">A</ToggleGroupItem>\n    <ToggleGroupItem value="b">B</ToggleGroupItem>\n    <ToggleGroupItem value="c">C</ToggleGroupItem>\n  </ToggleGroup>\n</ComponentPreview>`,
    LoadingSpinner: `<ComponentPreview>\n  <LoadingSpinner />\n</ComponentPreview>`,
    BrailleSpinner: `<ComponentPreview>\n  <BrailleSpinner />\n</ComponentPreview>`,
    NumberField: `<ComponentPreview>\n  <NumberField defaultValue={42} />\n</ComponentPreview>`,
    PasswordInput: `<ComponentPreview vertical>\n  <PasswordInput placeholder="Enter password..." />\n</ComponentPreview>`,
    SearchInput: `<ComponentPreview vertical>\n  <SearchInput placeholder="Search..." />\n</ComponentPreview>`,
    CopyInput: `<ComponentPreview vertical>\n  <CopyInput value="npm install @sigil-ui/components" />\n</ComponentPreview>`,
    Stepper: `<ComponentPreview vertical>\n  <Stepper steps={["Step 1", "Step 2", "Step 3"]} currentStep={1} />\n</ComponentPreview>`,
    Timeline: `<ComponentPreview vertical>\n  <Timeline>\n    Timeline content\n  </Timeline>\n</ComponentPreview>`,
    KPI: `<ComponentPreview>\n  <KPI label="Revenue" value="$12,340" />\n</ComponentPreview>`,
    StatCard: `<ComponentPreview>\n  <StatCard label="Users" value="1,234" />\n</ComponentPreview>`,
    MetricCard: `<ComponentPreview>\n  <MetricCard label="Uptime" value="99.9%" />\n</ComponentPreview>`,
    Empty: `<ComponentPreview vertical>\n  <Empty>No items found</Empty>\n</ComponentPreview>`,
    Callout: `<ComponentPreview vertical>\n  <Callout>This is an important callout message.</Callout>\n</ComponentPreview>`,
    Blockquote: `<ComponentPreview vertical>\n  <Blockquote>Design is not just what it looks like. Design is how it works.</Blockquote>\n</ComponentPreview>`,
    Terminal: `<ComponentPreview vertical>\n  <Terminal>$ npx @sigil-ui/cli init</Terminal>\n</ComponentPreview>`,
    CodeBlock: `<ComponentPreview vertical>\n  <CodeBlock>const x = 42;</CodeBlock>\n</ComponentPreview>`,
    TagsInput: `<ComponentPreview vertical>\n  <TagsInput placeholder="Add tag..." />\n</ComponentPreview>`,
    Notification: `<ComponentPreview vertical>\n  <Notification title="Update available" description="A new version is ready." />\n</ComponentPreview>`,
    AvatarGroup: `<ComponentPreview>\n  <AvatarGroup>\n    <Avatar name="Alice" />\n    <Avatar name="Bob" />\n    <Avatar name="Charlie" />\n  </AvatarGroup>\n</ComponentPreview>`,
    ButtonGroup: `<ComponentPreview>\n  <ButtonGroup>\n    <Button variant="outline">Left</Button>\n    <Button variant="outline">Center</Button>\n    <Button variant="outline">Right</Button>\n  </ButtonGroup>\n</ComponentPreview>`,
    Breadcrumb: `<ComponentPreview>\n  <Breadcrumb>\n    Docs / Components / Button\n  </Breadcrumb>\n</ComponentPreview>`,
    Pagination: `<ComponentPreview>\n  <Pagination totalPages={10} currentPage={3} />\n</ComponentPreview>`,
    SegmentedControl: `<ComponentPreview>\n  <SegmentedControl>\n    <SegmentedControlItem value="a">All</SegmentedControlItem>\n    <SegmentedControlItem value="b">Active</SegmentedControlItem>\n  </SegmentedControl>\n</ComponentPreview>`,
    Tooltip: `<ComponentPreview>\n  <TooltipProvider>\n    <Tooltip>\n      <span>Hover me</span>\n    </Tooltip>\n  </TooltipProvider>\n</ComponentPreview>`,
    Alert: `<ComponentPreview vertical>\n  <Alert>\n    <AlertTitle>Heads up</AlertTitle>\n    <AlertDescription>This is an alert message.</AlertDescription>\n  </Alert>\n</ComponentPreview>`,
    InlineAlert: `<ComponentPreview vertical>\n  <InlineAlert>Something went wrong. Please try again.</InlineAlert>\n</ComponentPreview>`,
    Pricing: `<ComponentPreview vertical>\n  <Pricing>\n    Pricing content\n  </Pricing>\n</ComponentPreview>`,
    Cross: `<ComponentPreview>\n  <Cross size={48} />\n</ComponentPreview>`,
    Diamond: `<ComponentPreview>\n  <Diamond size={48} />\n</ComponentPreview>`,
    Hexagon: `<ComponentPreview>\n  <Hexagon size={48} />\n</ComponentPreview>`,
    Triangle: `<ComponentPreview>\n  <Triangle size={48} />\n</ComponentPreview>`,
    Shape: `<ComponentPreview>\n  <Shape variant="circle" size={48} />\n</ComponentPreview>`,
    Marquee: `<ComponentPreview vertical>\n  <Marquee>Sigil UI — Design tokens that compound — </Marquee>\n</ComponentPreview>`,
    GradientText: `<ComponentPreview>\n  <GradientText>Gradient text example</GradientText>\n</ComponentPreview>`,
    LetterPullUp: `<ComponentPreview>\n  <LetterPullUp text="Hello World" />\n</ComponentPreview>`,
    NumberTicker: `<ComponentPreview>\n  <NumberTicker value={1234} />\n</ComponentPreview>`,
    WordRotate: `<ComponentPreview>\n  <WordRotate words={["Design", "Build", "Ship"]} />\n</ComponentPreview>`,
    TextReveal: `<ComponentPreview>\n  <TextReveal text="Hover to reveal" />\n</ComponentPreview>`,
    TypeWriter: `<ComponentPreview>\n  <TypeWriter text="Hello, World!" />\n</ComponentPreview>`,
    Pattern: `<ComponentPreview>\n  <div style={{position:"relative",width:"100%",height:120}}>\n    <Pattern />\n  </div>\n</ComponentPreview>`,
    GrainGradient: `<ComponentPreview>\n  <div style={{position:"relative",width:"100%",height:120,borderRadius:8,overflow:"hidden"}}>\n    <GrainGradient />\n  </div>\n</ComponentPreview>`,
    ScrollArea: `<ComponentPreview>\n  <ScrollArea className="h-32 w-48 rounded-[var(--s-radius-md,6px)] border border-[var(--s-border)]">\n    <div className="p-4">Scrollable content goes here. Add more text to see scrolling behavior.</div>\n  </ScrollArea>\n</ComponentPreview>`,
    Collapsible: `<ComponentPreview vertical>\n  <Collapsible>\n    <CollapsibleTrigger>Toggle content</CollapsibleTrigger>\n    <CollapsibleContent>Hidden content here</CollapsibleContent>\n  </Collapsible>\n</ComponentPreview>`,
    AspectRatio: `<ComponentPreview>\n  <AspectRatio ratio={16/9} className="bg-[var(--s-surface)] rounded">\n    <div className="flex items-center justify-center h-full text-[var(--s-text-muted)]">16:9</div>\n  </AspectRatio>\n</ComponentPreview>`,
    Editable: `<ComponentPreview>\n  <Editable defaultValue="Click to edit" />\n</ComponentPreview>`,
    Clipboard: `<ComponentPreview>\n  <Clipboard value="npx @sigil-ui/cli init" />\n</ComponentPreview>`,
    RatingGroup: `<ComponentPreview>\n  <RatingGroup defaultValue={3} />\n</ComponentPreview>`,
    ColorPicker: `<ComponentPreview>\n  <ColorPicker />\n</ComponentPreview>`,
    SignaturePad: `<ComponentPreview vertical>\n  <SignaturePad />\n</ComponentPreview>`,
    KeyboardKey: `<ComponentPreview>\n  <KeyboardKey>⌘</KeyboardKey>\n  <KeyboardKey>K</KeyboardKey>\n</ComponentPreview>`,
  };

  if (specific[componentName]) {
    return specific[componentName];
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
  const noPreview =
    ["AppShell", "PageShell", "PageGrid", "SigilPageGrid", "SigilNavbar",
     "NavigationMenu", "Menubar",
     "Dialog", "Sheet", "AlertDialog", "Drawer", "Command", "CommandDialog",
     "ContextMenu", "DropdownMenu",
     "Toaster", "Sonner", "toast", "sonnerToast",
     "Form", "FormField", "FormItem",
     "DataTable", "ChartContainer", "Chart",
     "DirectionProvider", "TooltipProvider",
     "LayoutControls", "FloatingUI",
     "Modal", "ConfirmDialog", "PromptDialog", "ResponsiveDialog",
     "Lightbox", "ImagePreview", "Spotlight", "CommandMenu",
     "ActionMenu", "OverflowMenu", "MegaMenu", "ContextPanel",
     "PopoverForm", "FloatingPanel",
     "Tour", "TourStep", "Coachmark",
     "HotkeyProvider", "ShortcutRecorder",
     "Box3DGrid", "BentoSection", "CodeBlock", "TreeView", "SigilCursor",
     "BlogGrid", "BlogHeader", "LogoBar", "LogoCloudSection",
     "TeamSection", "TestimonialsSection", "TestimonialCard",
     "ComparisonTable", "PricingTiers", "PricingTable",
     "WaterfallChart", "BarChart", "PieChart", "LineChart", "AreaChart",
     "RadarChart", "FunnelChart", "DonutChart", "HeatmapGrid",
     "CommitGrid", "SparkLine", "UsageGauge", "BillingChart",
     "ChangelogTable", "StatusTable", "SpecTable", "LeaderboardTable",
     "Carousel", "Calendar", "DatePicker", "DateRangePicker",
     "DateTimePicker", "TimePicker",
     "Popover", "HoverCard", "PreviewCard",
     "Toolbar", "Sidebar", "Footer", "Navbar",
     "SigilGrid", "SigilGridCell", "SigilGutter", "SigilFrame",
     "SigilFullBleed", "SigilSection",
     "Diagram", "DiagramNode", "DiagramConnector", "DiagramLabel",
     "TypeWriter", "Breadcrumb", "Combobox", "DensityText",
     "Carousel", "TreeView", "DataGrid", "VirtualList", "TreeTable",
     "MasonryGrid", "Listbox", "DataList",
     "ComboboxField", "AsyncSelect", "CreatableSelect", "Autocomplete",
     "MultiSelect", "FileDropzone", "FileUpload",
     "Table", "DataTable", "DataToolbar", "DataFilters", "DataPagination",
     "ColumnVisibility", "BulkActions", "EmptyTable",
     "Box3D", "Card3D", "ExplodedBox3D", "ExplodedView",
     "IsometricScene", "IsometricView", "IsometricStackDiagram",
     "IsometricCylinder", "IsometricPrism",
     "ParallaxLayer", "ScrollProgress",
     "Marquee", "Stagger", "BlurFade", "FadeIn", "ScaleIn", "SlideIn",
     "AnimateOnMount", "AnimateOnScroll",
     "CrossHatch", "Tessellation",
     "VoronoiBento", "VoronoiCell", "GapPixelGrid", "GapPixelCell",
     "SimpleGrid", "IsolationStack", "BorderStack",
     "FrostedPanel", "Frame",
     "FeatureFrame", "FeatureGrid", "FeaturedGrid", "CapabilityGrid",
     "SocialIcons", "CodeTabs", "CodePreview", "CodeBlock",
     "ThemeSwitcher", "ThemeSwatch", "TokenPreview",
     "ChatThread", "MessageComposer", "ChatMessage",
     "ActivityTimeline", "AuditLog", "Changelog",
     "PromptInput", "CopyButton",
     "UnitPricing", "CostCalculator", "ComparisonSection",
     "Pricing", "PricingCard",
    ].includes(componentName) || isDiagram || isSection;

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

    // Skip hooks, utility-only files, and non-component exports
    if (fileName.startsWith("use") || fileName === "animate") continue;
    if (mainComponent === "SPINNER_NAMES" || mainComponent === "SigilCursor") continue;

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
