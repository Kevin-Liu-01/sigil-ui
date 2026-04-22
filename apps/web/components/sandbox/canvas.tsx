"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CanvasItem } from "./canvas-item";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type CanvasItemData = {
  id: string;
  component: string;
  props: Record<string, unknown>;
  order: number;
};

type CanvasProps = {
  items: CanvasItemData[];
  onReorder: (items: CanvasItemData[]) => void;
  onRemove: (id: string) => void;
  onSelect: (id: string | null) => void;
  selectedId: string | null;
};

// ---------------------------------------------------------------------------
// Canvas
// ---------------------------------------------------------------------------

export function Canvas({
  items,
  onReorder,
  onRemove,
  onSelect,
  selectedId,
}: CanvasProps) {
  const { setNodeRef, isOver } = useDroppable({ id: "canvas-drop-zone" });

  const sortedItems = [...items].sort((a, b) => a.order - b.order);
  const itemIds = sortedItems.map((i) => i.id);

  return (
    <div
      ref={setNodeRef}
      onClick={() => onSelect(null)}
      className={[
        "relative flex-1 overflow-y-auto p-6",
        "transition-colors duration-150",
        isOver ? "bg-[var(--s-primary)]/5" : "",
      ].join(" ")}
      style={{ minHeight: 0 }}
    >
      {sortedItems.length === 0 ? (
        <EmptyState />
      ) : (
        <SortableContext
          items={itemIds}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-4 max-w-4xl mx-auto pb-12">
            {sortedItems.map((item) => (
              <CanvasItem
                key={item.id}
                item={item}
                selected={item.id === selectedId}
                onSelect={onSelect}
                onRemove={onRemove}
              />
            ))}
          </div>
        </SortableContext>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Empty state with grid background
// ---------------------------------------------------------------------------

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] select-none">
      {/* Grid background pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative flex flex-col items-center gap-3">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          className="text-[var(--s-text-muted)] opacity-40"
        >
          <rect
            x="6"
            y="6"
            width="36"
            height="36"
            rx="4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <path
            d="M24 16v16M16 24h16"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <p className="text-sm text-[var(--s-text-muted)]">
          Drag components here
        </p>
        <p className="text-xs text-[var(--s-text-subtle)]">
          or use the toolbar palette below
        </p>
      </div>
    </div>
  );
}
