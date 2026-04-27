"use client";

import { useMemo, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const CATEGORIES = {
  Layout: [
    { id: "box", name: "Box", icon: "□" },
    { id: "container", name: "Container", icon: "▭" },
    { id: "flex", name: "Flex", icon: "⟷" },
    { id: "simple-grid", name: "SimpleGrid", icon: "⊞" },
    { id: "center", name: "Center", icon: "◎" },
    { id: "spacer", name: "Spacer", icon: "↕" },
    { id: "stack", name: "Stack", icon: "☰" },
    { id: "grid", name: "Grid", icon: "⊞" },
    { id: "section", name: "Section", icon: "▭" },
    { id: "frame", name: "Frame", icon: "⬜" },
    { id: "app-shell", name: "AppShell", icon: "⊡" },
    { id: "main", name: "Main", icon: "▣" },
    { id: "aside", name: "Aside", icon: "◧" },
    { id: "header", name: "Header", icon: "▔" },
    { id: "banner", name: "Banner", icon: "⚑" },
    { id: "divider", name: "Divider", icon: "—" },
    { id: "hrule", name: "HRule", icon: "━" },
    { id: "voronoi-bento", name: "VoronoiBento", icon: "⬡" },
    { id: "aspect-ratio", name: "AspectRatio", icon: "⬒" },
    { id: "resizable-panel", name: "ResizablePanel", icon: "⇔" },
    { id: "button-group", name: "ButtonGroup", icon: "▢▢" },
  ],
  UI: [
    { id: "button", name: "Button", icon: "▢" },
    { id: "badge", name: "Badge", icon: "⬮" },
    { id: "card", name: "Card", icon: "▣" },
    { id: "label", name: "Label", icon: "Aa" },
    { id: "input", name: "Input", icon: "▤" },
    { id: "textarea", name: "Textarea", icon: "▧" },
    { id: "select", name: "Select", icon: "▾" },
    { id: "checkbox", name: "Checkbox", icon: "☑" },
    { id: "checkbox-group", name: "CheckboxGroup", icon: "☑☑" },
    { id: "switch", name: "Switch", icon: "⊘" },
    { id: "slider", name: "Slider", icon: "⊶" },
    { id: "progress", name: "Progress", icon: "▬" },
    { id: "separator", name: "Separator", icon: "│" },
    { id: "avatar", name: "Avatar", icon: "◉" },
    { id: "skeleton", name: "Skeleton", icon: "░" },
    { id: "accordion", name: "Accordion", icon: "≡" },
    { id: "tabs", name: "Tabs", icon: "⊟" },
    { id: "tooltip", name: "Tooltip", icon: "💬" },
    { id: "scroll-area", name: "ScrollArea", icon: "⇕" },
    { id: "kpi", name: "KPI", icon: "▲" },
    { id: "terminal", name: "Terminal", icon: "▥" },
    { id: "codeblock", name: "CodeBlock", icon: "⟨⟩" },
    { id: "loading-spinner", name: "Spinner", icon: "◎" },
    { id: "alert", name: "Alert", icon: "⚠" },
    { id: "collapsible", name: "Collapsible", icon: "⊞" },
    { id: "radio-group", name: "RadioGroup", icon: "◉" },
    { id: "toggle", name: "Toggle", icon: "⊡" },
    { id: "toggle-group", name: "ToggleGroup", icon: "⊡⊡" },
    { id: "form", name: "Form", icon: "📝" },
    { id: "combobox", name: "Combobox", icon: "⊞▾" },
    { id: "calendar", name: "Calendar", icon: "📅" },
    { id: "carousel", name: "Carousel", icon: "⟵⟶" },
    { id: "date-picker", name: "DatePicker", icon: "📆" },
    { id: "input-otp", name: "InputOTP", icon: "••••" },
    { id: "number-field", name: "NumberField", icon: "#" },
    { id: "meter", name: "Meter", icon: "▰▱" },
    { id: "data-table", name: "DataTable", icon: "▦" },
    { id: "chart", name: "Chart", icon: "📊" },
    { id: "field", name: "Field", icon: "⊡" },
    { id: "stepper", name: "Stepper", icon: "①②" },
    { id: "split-button", name: "SplitButton", icon: "▢▾" },
    { id: "item", name: "Item", icon: "≡" },
    { id: "tags-input", name: "TagsInput", icon: "⊞×" },
    { id: "color-picker", name: "ColorPicker", icon: "◉" },
    { id: "file-upload", name: "FileUpload", icon: "↑" },
    { id: "tree-view", name: "TreeView", icon: "⊢" },
    { id: "editable", name: "Editable", icon: "✎" },
    { id: "rating-group", name: "RatingGroup", icon: "★★" },
    { id: "signature-pad", name: "SignaturePad", icon: "✍" },
    { id: "kbd", name: "Kbd", icon: "⌘" },
    { id: "empty", name: "Empty", icon: "∅" },
    { id: "clipboard", name: "Clipboard", icon: "📋" },
    { id: "input-group", name: "InputGroup", icon: "▤$" },
    { id: "native-select", name: "NativeSelect", icon: "▾" },
  ],
  Navigation: [
    { id: "navbar", name: "Navbar", icon: "≡" },
    { id: "footer", name: "Footer", icon: "▂" },
    { id: "breadcrumb", name: "Breadcrumb", icon: "›" },
    { id: "pagination", name: "Pagination", icon: "‹ ›" },
    { id: "navigation-menu", name: "NavigationMenu", icon: "☰" },
    { id: "menubar", name: "Menubar", icon: "▤" },
    { id: "sidebar", name: "Sidebar", icon: "◧" },
    { id: "toolbar", name: "Toolbar", icon: "⊞" },
    { id: "social-icons", name: "SocialIcons", icon: "🔗" },
    { id: "split-button-nav", name: "SplitButton", icon: "▢▾" },
  ],
  Overlays: [
    { id: "dialog", name: "Dialog", icon: "◻" },
    { id: "sheet", name: "Sheet", icon: "◨" },
    { id: "popover", name: "Popover", icon: "◴" },
    { id: "toast", name: "Toast", icon: "◱" },
    { id: "alert-dialog", name: "AlertDialog", icon: "⚠◻" },
    { id: "command", name: "Command", icon: "⌘" },
    { id: "context-menu", name: "ContextMenu", icon: "☰" },
    { id: "dropdown-menu", name: "DropdownMenu", icon: "▾☰" },
    { id: "drawer", name: "Drawer", icon: "◫" },
    { id: "hover-card", name: "HoverCard", icon: "◳" },
    { id: "preview-card", name: "PreviewCard", icon: "◲" },
  ],
  Shapes: [
    { id: "diamond", name: "Diamond", icon: "◆" },
    { id: "hexagon", name: "Hexagon", icon: "⬡" },
    { id: "triangle", name: "Triangle", icon: "△" },
    { id: "diagonal", name: "Diagonal", icon: "╱" },
    { id: "shape", name: "Shape", icon: "◇" },
  ],
  "3D": [
    { id: "box3d", name: "Box3D", icon: "⧈" },
    { id: "box3d-grid", name: "Box3DGrid", icon: "⧈⧈" },
    { id: "card3d", name: "Card3D", icon: "⧉" },
    { id: "floating-ui", name: "FloatingUI", icon: "◫" },
    { id: "isometric-view", name: "Isometric", icon: "⬦" },
    { id: "isometric-prism", name: "IsoPrism", icon: "⬧" },
    { id: "isometric-cylinder", name: "IsoCylinder", icon: "⊙" },
    { id: "isometric-scene", name: "IsoScene", icon: "⬡" },
  ],
  Diagrams: [
    { id: "diagram", name: "Diagram", icon: "⊕" },
    { id: "diagram-node", name: "DiagramNode", icon: "▢" },
    { id: "diagram-connector", name: "Connector", icon: "⟶" },
    { id: "pipeline-diagram", name: "Pipeline", icon: "→→" },
    { id: "stack-diagram", name: "StackDiag", icon: "≡" },
    { id: "hub-spoke-diagram", name: "HubSpoke", icon: "✳" },
    { id: "before-after", name: "Before/After", icon: "⟺" },
    { id: "ecosystem-diagram", name: "Ecosystem", icon: "◉" },
    { id: "flow-diagram", name: "Flow", icon: "⟶" },
    { id: "exploded-view", name: "Exploded", icon: "⊕" },
    { id: "timeline", name: "Timeline", icon: "⟿" },
    { id: "comparison-table", name: "Compare", icon: "⟺" },
    { id: "architecture-diagram", name: "Architecture", icon: "⊞" },
    { id: "globe-diagram", name: "Globe", icon: "🌍" },
    { id: "sankey-diagram", name: "Sankey", icon: "⤨" },
  ],
  Marketing: [
    { id: "hero", name: "Hero", icon: "★" },
    { id: "feature-frame", name: "Feature", icon: "◈" },
    { id: "pricing", name: "Pricing", icon: "$" },
    { id: "cta", name: "CTA", icon: "→" },
    { id: "logo-bar", name: "LogoBar", icon: "⋯" },
    { id: "testimonial-card", name: "Testimonial", icon: "❝" },
    { id: "announcement-bar", name: "Announce", icon: "📢" },
    { id: "blog-grid", name: "BlogGrid", icon: "▦" },
    { id: "feature-grid", name: "FeatureGrid", icon: "⊞" },
    { id: "cost-calculator", name: "Calculator", icon: "🧮" },
    { id: "pricing-tiers", name: "PricingTiers", icon: "$$" },
  ],
  Sections: [
    { id: "section-heading", name: "SectionHead", icon: "H" },
    { id: "hero-section", name: "HeroSection", icon: "★" },
    { id: "feature-section", name: "Features", icon: "◈" },
    { id: "cta-section", name: "CTASection", icon: "→" },
    { id: "faq-section", name: "FAQ", icon: "?" },
    { id: "stats-section", name: "Stats", icon: "▲" },
    { id: "bento-section", name: "Bento", icon: "⬡" },
    { id: "testimonials-section", name: "Testimonials", icon: "❝" },
    { id: "logo-cloud-section", name: "LogoCloud", icon: "⋯" },
    { id: "comparison-section", name: "Comparison", icon: "⟺" },
    { id: "code-showcase-section", name: "CodeShow", icon: "⟨⟩" },
    { id: "team-section", name: "Team", icon: "👥" },
    { id: "timeline-section", name: "Timeline", icon: "⟿" },
    { id: "newsletter-section", name: "Newsletter", icon: "✉" },
    { id: "footer-section", name: "Footer", icon: "▂" },
    { id: "install-section", name: "Install", icon: "$" },
  ],
  Patterns: [
    { id: "pattern", name: "Pattern", icon: "⊞" },
    { id: "tessellation", name: "Tessellation", icon: "⬡⬡" },
    { id: "cross", name: "Cross", icon: "✚" },
  ],
} as const;

type CategoryName = keyof typeof CATEGORIES;
const CATEGORY_NAMES = Object.keys(CATEGORIES) as CategoryName[];
const CATEGORY_COUNTS = Object.fromEntries(
  CATEGORY_NAMES.map((cat) => [cat, (CATEGORIES[cat] as readonly { id: string }[]).length]),
) as Record<CategoryName, number>;
const TOTAL_COUNT = Object.values(CATEGORY_COUNTS).reduce((a, b) => a + b, 0);

type ComponentItem = { id: string; name: string; icon: string };

function DraggableCard({ item, onAdd }: { item: ComponentItem; onAdd: (component: string, props: Record<string, unknown>) => void }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `palette-${item.id}`,
    data: { component: item.id, props: {} },
  });

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={() => onAdd(item.id, {})}
      className="flex flex-col items-center justify-center gap-1 border bg-transparent cursor-grab transition-all duration-[var(--s-duration-fast,120ms)] hover:border-[var(--s-primary)] hover:-translate-y-px"
      style={{
        transform: transform ? CSS.Translate.toString(transform) : undefined,
        opacity: isDragging ? 0.4 : 1,
        borderColor: "var(--s-border)",
        background: "var(--s-background)",
        borderRadius: "var(--s-radius-sm, 4px)",
        padding: "10px 4px",
        fontFamily: "inherit",
        minHeight: "56px",
      }}
    >
      <span style={{ fontSize: 15, lineHeight: 1 }}>{item.icon}</span>
      <span
        className="font-[family-name:var(--s-font-mono)] overflow-hidden text-ellipsis whitespace-nowrap w-full text-center"
        style={{ fontSize: "9px", fontWeight: 500, color: "var(--s-text-muted)", padding: "0 2px" }}
      >
        {item.name}
      </span>
    </button>
  );
}

export function ComponentPalette({ onAddComponent }: { onAddComponent: (component: string, props: Record<string, unknown>) => void }) {
  const [activeCategory, setActiveCategory] = useState<CategoryName>("Marketing");
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return CATEGORIES[activeCategory] as readonly ComponentItem[];
    return Object.values(CATEGORIES).flat().filter(
      (item) => item.name.toLowerCase().includes(query) || item.id.toLowerCase().includes(query),
    );
  }, [search, activeCategory]);

  return (
    <div className="flex h-full flex-col">
      {/* Search */}
      <div className="shrink-0 px-3 pt-2 pb-1">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search ${TOTAL_COUNT} components...`}
          className="w-full border bg-[var(--s-background)] px-2.5 py-1.5 text-[11px] text-[var(--s-text)] outline-none font-[family-name:var(--s-font-mono)]"
          style={{ borderColor: "var(--s-border)", borderRadius: "var(--s-radius-sm, 4px)" }}
        />
      </div>

      {/* Category pills — vertical list for sidebar */}
      <div className="shrink-0 flex flex-wrap gap-1 px-3 py-2 border-b" style={{ borderColor: "var(--s-border)" }}>
        {CATEGORY_NAMES.map((cat) => {
          const isActive = !search && activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => { setSearch(""); setActiveCategory(cat); }}
              className="font-[family-name:var(--s-font-mono)] cursor-pointer border-none whitespace-nowrap transition-colors duration-[var(--s-duration-fast,120ms)]"
              style={{
                padding: "3px 8px",
                fontSize: "10px",
                fontWeight: 600,
                color: isActive ? "var(--s-primary)" : "var(--s-text-muted)",
                background: isActive ? "color-mix(in oklch, var(--s-primary) 12%, transparent)" : "transparent",
                borderRadius: "var(--s-radius-sm, 4px)",
              }}
            >
              {cat}
              <span className="ml-1 opacity-50">{CATEGORY_COUNTS[cat]}</span>
            </button>
          );
        })}
      </div>

      {/* 2-column component grid */}
      <div className="flex-1 overflow-y-auto px-3 py-2">
        {filteredItems.length === 0 ? (
          <div className="flex h-24 items-center justify-center text-[11px]" style={{ color: "var(--s-text-muted)" }}>
            No match for &ldquo;{search}&rdquo;
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-1.5">
            {filteredItems.map((item) => (
              <DraggableCard key={item.id} item={item} onAdd={onAddComponent} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
