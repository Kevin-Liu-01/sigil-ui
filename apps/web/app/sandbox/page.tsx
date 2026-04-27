"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import type { SigilPreset } from "@sigil-ui/tokens";
import { presets, type PresetName } from "@sigil-ui/presets";
import { presetCatalog } from "@sigil-ui/presets/catalog";
import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCenter,
  type DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import {
  SigilTokensProvider,
  SandboxTokenInjector,
  useSigilTokens,
} from "../../components/sandbox/token-provider";
import { ComponentPreview } from "../../components/sandbox/component-preview";
import { PresetEditor } from "../../components/sandbox/preset-editor";
import { AgentChat } from "../../components/sandbox/agent-chat";
import { SandboxLayout } from "../../components/sandbox/sandbox-layout";
import { SnapshotHistoryPanel } from "../../components/sandbox/snapshot-history-panel";
import { TokenForgePanel } from "../../components/sandbox/token-forge-panel";
import { ComponentPalette } from "../../components/sandbox/component-palette";
import { Canvas, type CanvasItemData } from "../../components/sandbox/canvas";
import {
  createTokensFromRecipe,
  TOKEN_RECIPES,
  tokensToMarkdown,
  type TokenRecipe,
} from "../../components/sandbox/token-markdown";

const ALL_PRESET_NAMES = presetCatalog.map((preset) => preset.name as PresetName);

let nextId = 1;
function genId() {
  return `item-${nextId++}-${Date.now().toString(36)}`;
}

export default function SandboxPage() {
  const [currentPreset, setCurrentPreset] = useState<SigilPreset | null>(null);
  const [presetName, setPresetName] = useState<PresetName>("sigil");

  useEffect(() => {
    let cancelled = false;
    presets[presetName]().then((preset) => {
      if (!cancelled) setCurrentPreset(preset);
    });
    return () => { cancelled = true; };
  }, [presetName]);

  if (!currentPreset) {
    return (
      <div className="h-dvh flex items-center justify-center bg-[var(--s-background)] text-[var(--s-text-muted)]">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin w-4 h-4" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="28" strokeDashoffset="7" />
          </svg>
          <span className="font-[family-name:var(--s-font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--s-text-muted)]">
            Loading preset...
          </span>
        </div>
      </div>
    );
  }

  return (
    <SigilTokensProvider initialPreset={presetName} initialTokens={currentPreset.tokens}>
      <SandboxTokenInjector />
      <SandboxWorkbench
        presetName={presetName}
        presetList={ALL_PRESET_NAMES}
        onPresetNameChange={(name) => setPresetName(name as PresetName)}
      />
    </SigilTokensProvider>
  );
}

function SandboxWorkbench({
  presetName,
  presetList,
  onPresetNameChange,
}: {
  presetName: PresetName;
  presetList: PresetName[];
  onPresetNameChange: (name: string) => void;
}) {
  const { tokens, activePreset, setTokens } = useSigilTokens();
  const initialMarkdown = useMemo(() => tokensToMarkdown(tokens, "sigil-reference"), [tokens]);
  const [activeRecipeId, setActiveRecipeId] = useState(TOKEN_RECIPES[0].id);
  const [markdownText, setMarkdownText] = useState(initialMarkdown);
  const [rightMode, setRightMode] = useState<"agent" | "code" | "history">("agent");

  // Canvas state
  const [items, setItems] = useState<CanvasItemData[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  // Canvas handlers
  const addComponent = useCallback((component: string, props?: Record<string, unknown>, colSpan?: number) => {
    const id = genId();
    setItems((prev) => [
      ...prev,
      { id, component, props: props ?? {}, order: prev.length, colSpan: colSpan ?? 12 },
    ]);
  }, []);

  const removeComponent = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id).map((i, idx) => ({ ...i, order: idx })));
    setSelectedId((prev) => (prev === id ? null : prev));
  }, []);

  const clearCanvas = useCallback(() => {
    setItems([]);
    setSelectedId(null);
  }, []);

  const resizeItem = useCallback((id: string, colSpan: number) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, colSpan } : i)));
  }, []);

  const reorderItems = useCallback((reordered: CanvasItemData[]) => {
    setItems(reordered);
  }, []);

  // DnD handler: reorder canvas items or add from palette
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    if (activeId.startsWith("palette-")) {
      const componentId = (active.data.current as { component?: string })?.component;
      if (componentId) {
        const pascalName = componentId.split("-").map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join("");
        addComponent(pascalName, {}, 12);
      }
      return;
    }

    if (activeId !== overId) {
      setItems((prev) => {
        const sorted = [...prev].sort((a, b) => a.order - b.order);
        const oldIndex = sorted.findIndex((i) => i.id === activeId);
        const newIndex = sorted.findIndex((i) => i.id === overId);
        if (oldIndex === -1 || newIndex === -1) return prev;
        const moved = arrayMove(sorted, oldIndex, newIndex);
        return moved.map((item, idx) => ({ ...item, order: idx }));
      });
    }
  }, [addComponent]);

  // Token forge
  const copyMarkdown = useCallback(() => { navigator.clipboard.writeText(markdownText); }, [markdownText]);

  const generateFromScratch = useCallback((recipe: TokenRecipe) => {
    const nextTokens = createTokensFromRecipe(recipe);
    setTokens(nextTokens, recipe.id);
    setActiveRecipeId(recipe.id);
    setMarkdownText(tokensToMarkdown(nextTokens, recipe.id));
  }, [setTokens]);

  const loadReferencePreset = useCallback(async (name: string) => {
    const loader = presets[name as PresetName];
    if (!loader) return;
    const preset = await loader();
    setTokens(preset.tokens, name);
    onPresetNameChange(name);
    setActiveRecipeId("preset-reference");
    setMarkdownText(tokensToMarkdown(preset.tokens, `${name}-reference`));
  }, [onPresetNameChange, setTokens]);

  const resetToScratch = useCallback(() => { generateFromScratch(TOKEN_RECIPES[0]); }, [generateFromScratch]);
  const exportMarkdown = useCallback(() => { navigator.clipboard.writeText(markdownText); }, [markdownText]);

  const hasCanvasItems = items.length > 0;

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SandboxLayout
        presetName={presetName}
        presetList={presetList}
        onPresetChange={loadReferencePreset}
        onExport={exportMarkdown}
        onReset={resetToScratch}
        rightMode={rightMode}
        onRightModeChange={setRightMode}
        forge={
          <TokenForgePanel
            activeId={activeRecipeId}
            activeName={activePreset}
            onGenerate={generateFromScratch}
            onCopyMarkdown={copyMarkdown}
          />
        }
        library={<ComponentPalette onAddComponent={addComponent} />}
        canvas={
          hasCanvasItems ? (
            <Canvas
              items={items}
              onReorder={reorderItems}
              onRemove={removeComponent}
              onSelect={setSelectedId}
              onResize={resizeItem}
              selectedId={selectedId}
            />
          ) : (
            <ComponentPreview className="flex-1" />
          )
        }
        rightPanel={
          rightMode === "agent" ? (
            <AgentChat
              onAddComponent={addComponent}
              onRemoveComponent={removeComponent}
              onClearCanvas={clearCanvas}
              canvasItems={items}
            />
          ) : rightMode === "history" ? (
            <SnapshotHistoryPanel
              onRestore={(nextTokens, name) => {
                setActiveRecipeId("snapshot");
                setMarkdownText(tokensToMarkdown(nextTokens, name));
              }}
            />
          ) : (
            <PresetEditor className="flex-1" markdownText={markdownText} onCopy={() => {}} onExport={exportMarkdown} />
          )
        }
      />
    </DndContext>
  );
}
