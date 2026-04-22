"use client";

import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import type { SigilPreset } from "@sigil-ui/tokens";
import { presets, type PresetName } from "@sigil-ui/presets";

import { SigilTokenProvider, useSigilTokens } from "../../../components/sandbox/token-provider";
import { Canvas, type CanvasItemData } from "../../../components/sandbox/canvas";
import { COMPONENT_REGISTRY } from "../../../components/sandbox/canvas-item";

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
): CanvasItemData {
  return {
    id: nextId(),
    component,
    props: COMPONENT_REGISTRY[component]?.defaultProps ?? {},
    order,
  };
}

const ALL_PRESET_NAMES: PresetName[] = [
  "sigil", "crux", "alloy", "basalt", "forge", "onyx", "flux", "kova",
  "etch", "anvil", "rivet", "shard", "rune", "fang", "cobalt", "strata",
  "brass", "obsid", "axiom", "glyph", "cipher", "prism", "helix", "hex",
  "vex", "arc", "dsgn", "mrkr", "noir", "dusk", "mono",
];

// Default items for full-screen canvas
const INITIAL_ITEMS: CanvasItemData[] = [
  createCanvasItem("Hero", 0),
  createCanvasItem("FeatureFrame", 1),
  createCanvasItem("Pricing", 2),
  createCanvasItem("TestimonialCard", 3),
  createCanvasItem("CTA", 4),
  createCanvasItem("Footer", 5),
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function FullCanvasPage() {
  const searchParams = useSearchParams();
  const initialPreset = (searchParams.get("preset") as PresetName) || "sigil";

  const [presetName, setPresetName] = useState<PresetName>(
    ALL_PRESET_NAMES.includes(initialPreset) ? initialPreset : "sigil",
  );
  const [currentPreset, setCurrentPreset] = useState<SigilPreset | null>(null);
  const [items, setItems] = useState<CanvasItemData[]>(INITIAL_ITEMS);
  const [selectedId, setSelectedId] = useState<string | null>(null);

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
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      setItems((prev) => {
        const oldIndex = prev.findIndex((i) => i.id === active.id);
        const newIndex = prev.findIndex((i) => i.id === over.id);
        if (oldIndex === -1 || newIndex === -1) return prev;
        return arrayMove(prev, oldIndex, newIndex).map((item, idx) => ({
          ...item,
          order: idx,
        }));
      });
    },
    [],
  );

  const handleReorder = useCallback((reordered: CanvasItemData[]) => {
    setItems(reordered.map((item, idx) => ({ ...item, order: idx })));
  }, []);

  const handleRemove = useCallback((id: string) => {
    setItems((prev) =>
      prev
        .filter((i) => i.id !== id)
        .map((item, idx) => ({ ...item, order: idx })),
    );
    setSelectedId((prev) => (prev === id ? null : prev));
  }, []);

  const handleSelect = useCallback((id: string | null) => {
    setSelectedId(id);
  }, []);

  if (!currentPreset) {
    return (
      <div className="h-dvh flex items-center justify-center bg-[#0a0a0a] text-[#666]">
        <div className="flex items-center gap-2 text-sm">
          <svg className="animate-spin w-4 h-4" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="28" strokeDashoffset="7" />
          </svg>
          Loading {presetName} preset…
        </div>
      </div>
    );
  }

  return (
    <SigilTokenProvider
      initialPreset={presetName}
      initialTokens={currentPreset.tokens}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="h-dvh w-full flex flex-col bg-[var(--s-background)]">
          {/* Floating preset switcher */}
          <PresetSwitcher
            presetName={presetName}
            onPresetChange={setPresetName}
          />

          <Canvas
            items={items}
            onReorder={handleReorder}
            onRemove={handleRemove}
            onSelect={handleSelect}
            selectedId={selectedId}
          />
        </div>
      </DndContext>
    </SigilTokenProvider>
  );
}

// ---------------------------------------------------------------------------
// Floating preset switcher
// ---------------------------------------------------------------------------

function PresetSwitcher({
  presetName,
  onPresetChange,
}: {
  presetName: PresetName;
  onPresetChange: (name: PresetName) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setOpen((v) => !v)}
        className={[
          "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium",
          "bg-[var(--s-surface)]/90 backdrop-blur-md",
          "border border-[var(--s-border)] text-[var(--s-text)]",
          "shadow-[var(--s-shadow-lg)] hover:bg-[var(--s-surface-elevated)]",
          "transition-colors",
        ].join(" ")}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[var(--s-primary)]">
          <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M7 4v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        {presetName}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          className={[
            "transition-transform",
            open ? "rotate-180" : "",
          ].join(" ")}
        >
          <path d="M2.5 3.75L5 6.25l2.5-2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div
          className={[
            "absolute top-full right-0 mt-1.5 w-44 max-h-80 overflow-y-auto",
            "rounded-lg border border-[var(--s-border)]",
            "bg-[var(--s-surface)]/95 backdrop-blur-md",
            "shadow-[var(--s-shadow-xl)]",
            "py-1",
          ].join(" ")}
        >
          {ALL_PRESET_NAMES.map((name) => (
            <button
              key={name}
              onClick={() => {
                onPresetChange(name);
                setOpen(false);
              }}
              className={[
                "w-full text-left px-3 py-1.5 text-xs transition-colors",
                name === presetName
                  ? "bg-[var(--s-primary)]/10 text-[var(--s-primary)] font-medium"
                  : "text-[var(--s-text-secondary)] hover:bg-[var(--s-surface-elevated)] hover:text-[var(--s-text)]",
              ].join(" ")}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
