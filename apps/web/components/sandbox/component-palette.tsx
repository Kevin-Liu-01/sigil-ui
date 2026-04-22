"use client";

import { useMemo, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const CATEGORIES = {
  Layout: [
    { id: "stack", name: "Stack", icon: "☰" },
    { id: "grid", name: "Grid", icon: "⊞" },
    { id: "section", name: "Section", icon: "▭" },
    { id: "frame", name: "Frame", icon: "⬜" },
    { id: "page-grid", name: "PageGrid", icon: "⊡" },
    { id: "margin", name: "Margin", icon: "▯" },
    { id: "gutter", name: "Gutter", icon: "┆" },
    { id: "divider", name: "Divider", icon: "—" },
    { id: "hrule", name: "HRule", icon: "━" },
    { id: "voronoi-bento", name: "VoronoiBento", icon: "⬡" },
    { id: "aspect-ratio", name: "AspectRatio", icon: "⬒" },
    { id: "resizable-panel", name: "ResizablePanel", icon: "⇔" },
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
  ],
  Diagrams: [
    { id: "diagram", name: "Diagram", icon: "⊕" },
    { id: "exploded-view", name: "Exploded", icon: "⊕" },
    { id: "flow-diagram", name: "Flow", icon: "⟶" },
    { id: "timeline", name: "Timeline", icon: "⟿" },
    { id: "comparison-table", name: "Compare", icon: "⟺" },
    { id: "architecture-diagram", name: "Architecture", icon: "⊞" },
  ],
  Marketing: [
    { id: "hero", name: "Hero", icon: "★" },
    { id: "feature-frame", name: "Feature", icon: "◈" },
    { id: "pricing", name: "Pricing", icon: "$" },
    { id: "cta", name: "CTA", icon: "→" },
    { id: "logo-bar", name: "LogoBar", icon: "⋯" },
    { id: "testimonial-card", name: "Testimonial", icon: "❝" },
  ],
  Patterns: [
    { id: "pattern", name: "Pattern", icon: "⊞" },
    { id: "tessellation", name: "Tessellation", icon: "⬡⬡" },
    { id: "cross", name: "Cross", icon: "✚" },
  ],
} as const;

type CategoryName = keyof typeof CATEGORIES;

const CATEGORY_NAMES = Object.keys(CATEGORIES) as CategoryName[];

type ComponentItem = {
  id: string;
  name: string;
  icon: string;
};

function DraggableCard({
  item,
  onAdd,
}: {
  item: ComponentItem;
  onAdd: (component: string, props: Record<string, any>) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `palette-${item.id}`,
      data: { component: item.id, props: {} },
    });

  const style = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={() => onAdd(item.id, {})}
      style={{
        ...style,
        width: 80,
        height: 60,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        background: "var(--s-surface)",
        border: "1px solid var(--s-border)",
        borderRadius: 6,
        cursor: "grab",
        fontFamily: "inherit",
        transition: "border-color 150ms, background 150ms",
      }}
    >
      <span style={{ fontSize: 16, lineHeight: 1 }}>{item.icon}</span>
      <span
        style={{
          fontSize: 10,
          color: "var(--s-text-muted)",
          fontWeight: 500,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "100%",
          padding: "0 4px",
        }}
      >
        {item.name}
      </span>
    </button>
  );
}

export function ComponentPalette({
  onAddComponent,
}: {
  onAddComponent: (component: string, props: Record<string, any>) => void;
}) {
  const [activeCategory, setActiveCategory] =
    useState<CategoryName>("Layout");
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return CATEGORIES[activeCategory] as readonly ComponentItem[];
    }
    return Object.values(CATEGORIES)
      .flat()
      .filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.id.toLowerCase().includes(query),
      );
  }, [search, activeCategory]);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Search */}
      <div
        style={{
          padding: "8px 16px 0",
          flexShrink: 0,
        }}
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search components..."
          style={{
            width: "100%",
            padding: "6px 10px",
            fontSize: 12,
            fontFamily: "inherit",
            background: "var(--s-surface)",
            border: "1px solid var(--s-border)",
            borderRadius: 6,
            color: "var(--s-text)",
            outline: "none",
          }}
        />
      </div>

      {/* Category tabs */}
      <div
        style={{
          display: "flex",
          gap: 2,
          padding: "6px 16px",
          borderBottom: "1px solid var(--s-border)",
          flexShrink: 0,
          overflowX: "auto",
        }}
      >
        {CATEGORY_NAMES.map((cat) => {
          const isActive = !search && activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                setSearch("");
                setActiveCategory(cat);
              }}
              style={{
                padding: "4px 10px",
                fontSize: 11,
                fontWeight: 500,
                color: isActive ? "var(--s-primary)" : "var(--s-text-muted)",
                background: isActive
                  ? "color-mix(in srgb, var(--s-primary) 10%, transparent)"
                  : "transparent",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
                whiteSpace: "nowrap",
                fontFamily: "inherit",
                transition: "color 150ms, background 150ms",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Component grid */}
      <div
        style={{
          flex: 1,
          padding: "10px 16px",
          overflowY: "auto",
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          alignContent: "start",
        }}
      >
        {filteredItems.length === 0 ? (
          <span
            style={{
              fontSize: 12,
              color: "var(--s-text-muted)",
              padding: "16px 0",
              width: "100%",
              textAlign: "center",
            }}
          >
            No components match &ldquo;{search}&rdquo;
          </span>
        ) : (
          filteredItems.map((item) => (
            <DraggableCard
              key={item.id}
              item={item}
              onAdd={onAddComponent}
            />
          ))
        )}
      </div>
    </div>
  );
}
