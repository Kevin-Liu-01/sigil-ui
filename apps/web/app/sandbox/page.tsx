"use client";

import { useState, useCallback, useEffect } from "react";
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

import {
  SigilTokensProvider,
  SandboxTokenInjector,
} from "../../components/sandbox/token-provider";
import { Canvas, type CanvasItemData } from "../../components/sandbox/canvas";
import {
  COMPONENT_REGISTRY,
  REGISTRY_NAMES,
} from "../../components/sandbox/canvas-item";
import { AgentChat } from "../../components/sandbox/agent-chat";
import { SandboxLayout } from "../../components/sandbox/sandbox-layout";

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
  colSpan?: number,
): CanvasItemData {
  return {
    id: nextId(),
    component,
    props: props ?? COMPONENT_REGISTRY[component]?.defaultProps ?? {},
    order,
    colSpan: colSpan ?? 12,
  };
}

// ---------------------------------------------------------------------------
// Initial demo items — show off the grid
// ---------------------------------------------------------------------------

const INITIAL_ITEMS: CanvasItemData[] = [
  createCanvasItem("Hero", 0, {}, 12),
  createCanvasItem("Card", 1, {}, 6),
  createCanvasItem("KPI", 2, {}, 6),
];

// ---------------------------------------------------------------------------
// All presets
// ---------------------------------------------------------------------------

const ALL_PRESET_NAMES: PresetName[] = [
  "sigil", "crux", "alloy", "basalt", "forge", "onyx", "flux", "kova",
  "etch", "anvil", "rivet", "shard", "rune", "fang", "cobalt", "strata",
  "brass", "obsid", "axiom", "glyph", "cipher", "prism", "helix", "hex",
  "vex", "arc", "dsgn", "mrkr", "noir", "dusk", "mono",
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

  useEffect(() => {
    let cancelled = false;
    presets[presetName]().then((preset) => {
      if (!cancelled) setCurrentPreset(preset);
    });
    return () => {
      cancelled = true;
    };
  }, [presetName]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = useCallback((e: DragStartEvent) => {
    setActiveId(String(e.active.id));
  }, []);

  const handleDragEnd = useCallback(
    (e: DragEndEvent) => {
      setActiveId(null);
      const { active, over } = e;
      if (!over) return;

      if (
        typeof active.id === "string" &&
        COMPONENT_REGISTRY[active.id] &&
        !items.find((i) => i.id === active.id)
      ) {
        const newItem = createCanvasItem(active.id, items.length);
        setItems((prev) => [...prev, newItem]);
        setSelectedId(newItem.id);
        return;
      }

      if (active.id !== over.id) {
        setItems((prev) => {
          const oldIdx = prev.findIndex((i) => i.id === active.id);
          const newIdx = prev.findIndex((i) => i.id === over.id);
          if (oldIdx === -1 || newIdx === -1) return prev;
          const moved = arrayMove(prev, oldIdx, newIdx);
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

  const handleResize = useCallback((id: string, colSpan: number) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, colSpan } : i)),
    );
  }, []);

  const handleAddComponent = useCallback(
    (
      componentName: string,
      props?: Record<string, unknown>,
      colSpan?: number,
    ) => {
      const newItem = createCanvasItem(
        componentName,
        items.length,
        props,
        colSpan,
      );
      setItems((prev) => [...prev, newItem]);
      setSelectedId(newItem.id);
    },
    [items.length],
  );

  const handleClearCanvas = useCallback(() => {
    setItems([]);
    setSelectedId(null);
  }, []);

  if (!currentPreset) {
    return (
      <div className="h-dvh flex items-center justify-center bg-[#0a0a0a] text-[#666]">
        <div className="flex items-center gap-2 text-sm">
          <svg
            className="animate-spin w-4 h-4"
            viewBox="0 0 16 16"
            fill="none"
          >
            <circle
              cx="8"
              cy="8"
              r="6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="28"
              strokeDashoffset="7"
            />
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
      <SandboxTokenInjector />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SandboxLayout
          presetName={presetName}
          presetList={ALL_PRESET_NAMES}
          onPresetChange={setPresetName}
          chat={
            <AgentChat
              onAddComponent={handleAddComponent}
              onRemoveComponent={handleRemove}
              onClearCanvas={handleClearCanvas}
              canvasItems={items}
            />
          }
          toolbar={<Toolbar onAdd={handleAddComponent} />}
        >
          <Canvas
            items={items}
            onReorder={handleReorder}
            onRemove={handleRemove}
            onSelect={handleSelect}
            onResize={handleResize}
            selectedId={selectedId}
          />
        </SandboxLayout>
      </DndContext>
    </SigilTokensProvider>
  );
}

// ---------------------------------------------------------------------------
// Toolbar (component palette)
// ---------------------------------------------------------------------------

const PALETTE_GROUPS: Record<string, string[]> = {
  Marketing: [
    "Hero",
    "CTA",
    "Pricing",
    "FeatureFrame",
    "TestimonialCard",
    "LogoBar",
  ],
  "Core UI": [
    "Button",
    "Card",
    "Badge",
    "Input",
    "Tabs",
    "Accordion",
    "Table",
  ],
  Data: ["KPI", "Terminal", "CodeBlock", "Timeline", "Progress"],
  Layout: ["Grid", "Stack", "Navbar", "Footer", "Separator"],
  Shapes: ["Diamond", "Hexagon", "Triangle"],
  "3D": ["Box3D", "Card3D"],
  Misc: ["LoadingSpinner", "Avatar"],
};

function Toolbar({
  onAdd,
}: {
  onAdd: (name: string, props?: Record<string, unknown>, colSpan?: number) => void;
}) {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto px-4 py-2.5">
        <div className="flex flex-col gap-3">
          {Object.entries(PALETTE_GROUPS).map(([group, names]) => (
            <div key={group}>
              <h3 className="text-[10px] font-semibold uppercase tracking-wider text-[var(--s-text-subtle)] mb-1.5">
                {group}
              </h3>
              <div className="flex flex-wrap gap-1">
                {names.map((name) => {
                  const entry = COMPONENT_REGISTRY[name];
                  return (
                    <button
                      key={name}
                      onClick={() => onAdd(name)}
                      className={[
                        "text-[11px] px-2 py-1 rounded-md transition-colors",
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
