"use client";

import { useState, useCallback, useEffect, useId } from "react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import type { SigilPreset } from "@sigil-ui/tokens";
import { presets, type PresetName } from "@sigil-ui/presets";

import { SigilTokensProvider } from "../../components/sandbox/token-provider";
import { Canvas, type CanvasItemData } from "../../components/sandbox/canvas";
import { COMPONENT_REGISTRY, REGISTRY_NAMES } from "../../components/sandbox/canvas-item";
import { AgentChat } from "../../components/sandbox/agent-chat";
import SandboxLayout from "./layout";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

let itemCounter = 0;
function nextId(): string {
  return `item-${++itemCounter}-${Date.now()}`;
}

function createCanvasItem(
  component: string,
  order: number,
  props?: Record<string, unknown>,
): CanvasItemData {
  return {
    id: nextId(),
    component,
    props: props ?? COMPONENT_REGISTRY[component]?.defaultProps ?? {},
    order,
  };
}

// ---------------------------------------------------------------------------
// Initial demo items
// ---------------------------------------------------------------------------

const INITIAL_ITEMS: CanvasItemData[] = [
  createCanvasItem("Hero", 0),
  createCanvasItem("Card", 1),
  createCanvasItem("Button", 2),
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function SandboxPage() {
  const [items, setItems] = useState<CanvasItemData[]>(INITIAL_ITEMS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [currentPreset, setCurrentPreset] = useState<SigilPreset | null>(null);
  const [presetName, setPresetName] = useState<PresetName>("sigil");

  // Load preset on mount and when presetName changes
  useEffect(() => {
    let cancelled = false;
    presets[presetName]().then((preset) => {
      if (!cancelled) setCurrentPreset(preset);
    });
    return () => {
      cancelled = true;
    };
  }, [presetName]);

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  // Handlers
  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveId(null);
      const { active, over } = event;
      if (!over) return;

      // Palette → canvas: active.id is a component name from the palette
      if (
        typeof active.id === "string" &&
        COMPONENT_REGISTRY[active.id] &&
        !items.find((i) => i.id === active.id)
      ) {
        const newItem = createCanvasItem(
          active.id,
          items.length,
        );
        setItems((prev) => [...prev, newItem]);
        setSelectedId(newItem.id);
        return;
      }

      // Reorder within canvas
      if (active.id !== over.id) {
        setItems((prev) => {
          const oldIndex = prev.findIndex((i) => i.id === active.id);
          const newIndex = prev.findIndex((i) => i.id === over.id);
          if (oldIndex === -1 || newIndex === -1) return prev;
          const moved = arrayMove(prev, oldIndex, newIndex);
          return moved.map((item, idx) => ({ ...item, order: idx }));
        });
      }
    },
    [items],
  );

  const handleReorder = useCallback((reordered: CanvasItemData[]) => {
    setItems(reordered.map((item, idx) => ({ ...item, order: idx })));
  }, []);

  const handleRemove = useCallback((id: string) => {
    setItems((prev) => {
      const filtered = prev.filter((i) => i.id !== id);
      return filtered.map((item, idx) => ({ ...item, order: idx }));
    });
    setSelectedId((prev) => (prev === id ? null : prev));
  }, []);

  const handleSelect = useCallback((id: string | null) => {
    setSelectedId(id);
  }, []);

  const handleAddComponent = useCallback(
    (componentName: string, props?: Record<string, unknown>) => {
      const newItem = createCanvasItem(componentName, items.length, props);
      setItems((prev) => [...prev, newItem]);
      setSelectedId(newItem.id);
    },
    [items.length],
  );

  if (!currentPreset) {
    return (
      <div className="h-dvh flex items-center justify-center bg-[#0a0a0a] text-[#666]">
        <div className="flex items-center gap-2 text-sm">
          <svg className="animate-spin w-4 h-4" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="28" strokeDashoffset="7" />
          </svg>
          Loading preset…
        </div>
      </div>
    );
  }

  return (
    <SigilTokensProvider
      initialPreset={presetName}
      initialTokens={currentPreset.tokens}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SandboxLayout
          chat={<AgentChat onAddComponent={handleAddComponent} />}
          toolbar={
            <Toolbar
              onAdd={handleAddComponent}
              presetName={presetName}
              onPresetChange={setPresetName}
            />
          }
        >
          <Canvas
            items={items}
            onReorder={handleReorder}
            onRemove={handleRemove}
            onSelect={handleSelect}
            selectedId={selectedId}
          />
        </SandboxLayout>
      </DndContext>
    </SigilTokensProvider>
  );
}

// ---------------------------------------------------------------------------
// Toolbar (component palette + preset switcher)
// ---------------------------------------------------------------------------

const PALETTE_GROUPS: Record<string, string[]> = {
  Marketing: ["Hero", "CTA", "Pricing", "FeatureFrame", "TestimonialCard", "LogoBar"],
  "Core UI": ["Button", "Card", "Badge", "Input", "Tabs", "Accordion", "Table"],
  Data: ["KPI", "Terminal", "CodeBlock", "Timeline", "Progress"],
  Layout: ["Grid", "Stack", "Navbar", "Footer", "Separator"],
  Shapes: ["Diamond", "Hexagon", "Triangle"],
  "3D": ["Box3D", "Card3D"],
  Misc: ["LoadingSpinner", "Avatar"],
};

const ALL_PRESET_NAMES: PresetName[] = [
  "sigil", "crux", "alloy", "basalt", "forge", "onyx", "flux", "kova",
  "etch", "anvil", "rivet", "shard", "rune", "fang", "cobalt", "strata",
  "brass", "obsid", "axiom", "glyph", "cipher", "prism", "helix", "hex",
  "vex", "arc", "dsgn", "mrkr", "noir", "dusk", "mono",
];

function Toolbar({
  onAdd,
  presetName,
  onPresetChange,
}: {
  onAdd: (name: string) => void;
  presetName: PresetName;
  onPresetChange: (name: PresetName) => void;
}) {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Preset row */}
      <div className="flex items-center gap-3 px-4 py-2 border-b border-[var(--s-border)] shrink-0">
        <label className="text-xs font-medium text-[var(--s-text-muted)] shrink-0">
          Preset
        </label>
        <select
          value={presetName}
          onChange={(e) => onPresetChange(e.target.value as PresetName)}
          className="text-xs bg-[var(--s-background)] text-[var(--s-text)] border border-[var(--s-border)] rounded-md px-2 py-1 outline-none focus:border-[var(--s-primary)]"
        >
          {ALL_PRESET_NAMES.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Component palette */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        <div className="flex flex-col gap-4">
          {Object.entries(PALETTE_GROUPS).map(([group, names]) => (
            <div key={group}>
              <h3 className="text-[10px] font-semibold uppercase tracking-wider text-[var(--s-text-subtle)] mb-2">
                {group}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {names.map((name) => {
                  const entry = COMPONENT_REGISTRY[name];
                  return (
                    <button
                      key={name}
                      onClick={() => onAdd(name)}
                      className={[
                        "text-xs px-2.5 py-1.5 rounded-md transition-colors",
                        "bg-[var(--s-surface)] border border-[var(--s-border)]",
                        "text-[var(--s-text-secondary)] hover:text-[var(--s-text)]",
                        "hover:border-[var(--s-border-strong)] hover:bg-[var(--s-surface-elevated)]",
                        "active:scale-[0.97]",
                      ].join(" ")}
                    >
                      {entry?.label ?? name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

