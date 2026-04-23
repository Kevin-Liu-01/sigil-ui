"use client";

import { useState, useCallback, useEffect } from "react";
import type { SigilPreset } from "@sigil-ui/tokens";
import { presets, type PresetName } from "@sigil-ui/presets";

import {
  SigilTokensProvider,
  SandboxTokenInjector,
} from "../../components/sandbox/token-provider";
import { ComponentPreview } from "../../components/sandbox/component-preview";
import { PresetEditor } from "../../components/sandbox/preset-editor";
import { AgentChat } from "../../components/sandbox/agent-chat";
import { SandboxLayout } from "../../components/sandbox/sandbox-layout";

const ALL_PRESET_NAMES: PresetName[] = [
  "sigil", "crux", "alloy", "basalt", "forge", "onyx", "flux", "kova",
  "etch", "anvil", "rivet", "shard", "rune", "fang", "cobalt", "strata",
  "brass", "obsid", "axiom", "glyph", "cipher", "prism", "helix", "hex",
  "vex", "arc", "dsgn", "mrkr", "noir", "dusk", "mono",
];

export default function SandboxPage() {
  const [currentPreset, setCurrentPreset] = useState<SigilPreset | null>(null);
  const [presetName, setPresetName] = useState<PresetName>("sigil");
  const [initialPresetName, setInitialPresetName] = useState<PresetName>("sigil");

  useEffect(() => {
    let cancelled = false;
    presets[presetName]().then((preset) => {
      if (!cancelled) setCurrentPreset(preset);
    });
    return () => {
      cancelled = true;
    };
  }, [presetName]);

  const handlePresetChange = useCallback((name: string) => {
    setPresetName(name as PresetName);
    setInitialPresetName(name as PresetName);
  }, []);

  const handleReset = useCallback(() => {
    setPresetName(initialPresetName);
    let cancelled = false;
    presets[initialPresetName]().then((preset) => {
      if (!cancelled) setCurrentPreset(preset);
    });
    return () => {
      cancelled = true;
    };
  }, [initialPresetName]);

  const handleExport = useCallback(() => {
    const el = document.querySelector("style[data-sigil-sandbox]");
    if (el?.textContent) {
      navigator.clipboard.writeText(el.textContent);
    }
  }, []);

  if (!currentPreset) {
    return (
      <div className="h-dvh flex items-center justify-center bg-[var(--s-background)] text-[var(--s-text-muted)]">
        <div className="flex items-center gap-2 text-sm font-mono">
          <svg className="animate-spin w-4 h-4" viewBox="0 0 16 16" fill="none">
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
          Loading preset...
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
      <SandboxLayout
        presetName={presetName}
        presetList={ALL_PRESET_NAMES}
        onPresetChange={handlePresetChange}
        onExport={handleExport}
        onReset={handleReset}
        preview={<ComponentPreview className="flex-1" />}
        editor={<PresetEditor className="flex-1" onCopy={() => {}} onExport={handleExport} />}
        chat={<SandboxAgentChat />}
      />
    </SigilTokensProvider>
  );
}

function SandboxAgentChat() {
  const noop = useCallback(() => {}, []);
  return (
    <AgentChat
      onAddComponent={noop}
      onRemoveComponent={noop}
      onClearCanvas={noop}
      canvasItems={[]}
    />
  );
}
