"use client";

import { useRef } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CanvasItem } from "./canvas-item";

export type CanvasItemData = {
  id: string;
  component: string;
  props: Record<string, unknown>;
  order: number;
  colSpan: number;
};

type CanvasProps = {
  items: CanvasItemData[];
  onReorder: (items: CanvasItemData[]) => void;
  onRemove: (id: string) => void;
  onSelect: (id: string | null) => void;
  onResize: (id: string, colSpan: number) => void;
  selectedId: string | null;
};

const GUTTER_W = 24;
const CONTENT_MAX = 1200;
const CELL = 48;
const INNER_GAP = 16;

export function Canvas({
  items,
  onReorder,
  onRemove,
  onSelect,
  onResize,
  selectedId,
}: CanvasProps) {
  const { setNodeRef, isOver } = useDroppable({ id: "canvas-drop-zone" });
  const contentRef = useRef<HTMLDivElement>(null);

  const sorted = [...items].sort((a, b) => a.order - b.order);
  const ids = sorted.map((i) => i.id);

  return (
    <div
      ref={setNodeRef}
      onClick={() => onSelect(null)}
      className="relative flex-1 overflow-y-auto"
      style={{ minHeight: 0 }}
    >
      <div
        className="grid min-h-full"
        style={{
          gridTemplateColumns: `1fr ${GUTTER_W}px minmax(0,${CONTENT_MAX}px) ${GUTTER_W}px 1fr`,
        }}
      >
        <MarginCol />
        <GutterCol />

        {/* ---- content column ---- */}
        <div
          ref={contentRef}
          className="relative py-6"
          style={{ minHeight: "100%", background: "var(--s-background)" }}
        >
          <ColGuides />

          {sorted.length === 0 ? (
            <EmptyState isOver={isOver} />
          ) : (
            <SortableContext items={ids} strategy={rectSortingStrategy}>
              <div
                data-grid-inner
                className="relative grid"
                style={{
                  gridTemplateColumns: "repeat(12, 1fr)",
                  gap: `${INNER_GAP}px`,
                }}
              >
                {sorted.map((item) => (
                  <CanvasItem
                    key={item.id}
                    item={item}
                    selected={item.id === selectedId}
                    onSelect={onSelect}
                    onRemove={onRemove}
                    onResize={onResize}
                    contentRef={contentRef}
                  />
                ))}
              </div>
            </SortableContext>
          )}
        </div>

        <GutterCol />
        <MarginCol />
      </div>
    </div>
  );
}

function MarginCol() {
  return (
    <div
      aria-hidden
      className="relative overflow-hidden select-none"
      style={{ background: "var(--s-background)" }}
    >
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.025,
          backgroundImage: `linear-gradient(to bottom, transparent ${Math.round(CELL / 3) - 1}px, currentColor ${Math.round(CELL / 3) - 1}px)`,
          backgroundSize: `100% ${Math.round(CELL / 3)}px`,
        }}
      />
    </div>
  );
}

function GutterCol() {
  return (
    <div
      aria-hidden
      className="relative overflow-hidden select-none"
      style={{
        borderLeft: "1px solid var(--s-border)",
        borderRight: "1px solid var(--s-border)",
        background: "var(--s-background)",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.045,
          backgroundImage: [
            `linear-gradient(to right, currentColor 1px, transparent 1px)`,
            `linear-gradient(to bottom, transparent ${CELL - 1}px, currentColor ${CELL - 1}px)`,
          ].join(", "),
          backgroundSize: `${CELL}px ${CELL}px`,
        }}
      />
    </div>
  );
}

function ColGuides() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gap: `${INNER_GAP}px`,
      }}
    >
      {Array.from({ length: 12 }, (_, i) => (
        <div
          key={i}
          style={{
            background: "currentColor",
            opacity: 0.018,
            borderRadius: "2px",
          }}
        />
      ))}
    </div>
  );
}

function EmptyState({ isOver }: { isOver: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] select-none relative">
      <div
        className="flex flex-col items-center gap-4 transition-transform duration-200"
        style={{ transform: isOver ? "scale(1.03)" : "scale(1)" }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-200"
          style={{
            border: `2px dashed ${isOver ? "var(--s-primary)" : "var(--s-border)"}`,
            background: isOver ? "var(--s-primary-muted, rgba(0,0,0,0.03))" : "transparent",
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            style={{ color: isOver ? "var(--s-primary)" : "var(--s-text-muted)" }}
          >
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="text-center">
          <p
            className="text-sm font-medium"
            style={{ color: isOver ? "var(--s-primary)" : "var(--s-text-muted)" }}
          >
            {isOver ? "Release to add" : "Drop components here"}
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--s-text-subtle)" }}>
            Use the palette below or ask the agent
          </p>
        </div>
      </div>
    </div>
  );
}
