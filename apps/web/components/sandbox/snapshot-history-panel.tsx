"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { SigilTokens } from "@sigil-ui/tokens";
import { useSigilTokens } from "./token-provider";

const STORAGE_KEY = "sigil:sandbox:design-snapshots:v1";

type DesignSnapshot = {
  version: 1;
  id: string;
  name: string;
  createdAt: string;
  activePreset: string;
  tokens: SigilTokens;
};

type SnapshotHistoryPanelProps = {
  onRestore?: (tokens: SigilTokens, name: string) => void;
};

export function SnapshotHistoryPanel({ onRestore }: SnapshotHistoryPanelProps) {
  const { tokens, activePreset, setTokens } = useSigilTokens();
  const [snapshots, setSnapshots] = useState<DesignSnapshot[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    setSnapshots(readSnapshots());
  }, []);

  const selected = useMemo(
    () => snapshots.find((snapshot) => snapshot.id === selectedId) ?? snapshots[0],
    [selectedId, snapshots],
  );

  const diff = useMemo(() => {
    if (!selected) return [];
    return diffTokens(selected.tokens, tokens).slice(0, 80);
  }, [selected, tokens]);

  const persist = useCallback((next: DesignSnapshot[]) => {
    setSnapshots(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next.slice(0, 24)));
  }, []);

  const saveCurrent = useCallback(() => {
    const fallback = `${activePreset.replace(/\*$/, "")} ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    const name = window.prompt("Name this design state", fallback);
    if (!name) return;

    const snapshot: DesignSnapshot = {
      version: 1,
      id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
      name,
      createdAt: new Date().toISOString(),
      activePreset,
      tokens: deepClone(tokens),
    };
    persist([snapshot, ...snapshots]);
    setSelectedId(snapshot.id);
  }, [activePreset, persist, snapshots, tokens]);

  const restoreSnapshot = useCallback((snapshot: DesignSnapshot) => {
    setTokens(snapshot.tokens, snapshot.name);
    onRestore?.(snapshot.tokens, snapshot.name);
  }, [onRestore, setTokens]);

  const deleteSnapshot = useCallback((snapshot: DesignSnapshot) => {
    const next = snapshots.filter((item) => item.id !== snapshot.id);
    persist(next);
    setSelectedId((current) => current === snapshot.id ? next[0]?.id ?? null : current);
  }, [persist, snapshots]);

  const exportSnapshot = useCallback((snapshot: DesignSnapshot) => {
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${snapshot.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "sigil-snapshot"}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }, []);

  return (
    <div className="flex h-full flex-col bg-[var(--s-background)] text-[var(--s-text)]">
      <div className="flex items-center justify-between gap-3 border-b border-[var(--s-border)] bg-[var(--s-surface)] p-3">
        <div>
          <div className="font-[family-name:var(--s-font-mono)] text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--s-text-muted)]">
            Design History
          </div>
          <div className="mt-1 text-xs text-[var(--s-text-subtle)]">
            {snapshots.length} saved state{snapshots.length === 1 ? "" : "s"}
          </div>
        </div>
        <button
          type="button"
          onClick={saveCurrent}
          className="border border-[var(--s-border)] bg-[var(--s-primary)] px-3 py-1.5 font-[family-name:var(--s-font-mono)] text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--s-primary-contrast)] transition-opacity hover:opacity-90"
        >
          Save
        </button>
      </div>

      <div className="grid min-h-0 flex-1 grid-rows-[minmax(0,0.9fr)_minmax(0,1fr)]">
        <div className="min-h-0 overflow-auto border-b border-[var(--s-border)]">
          {snapshots.length === 0 ? (
            <div className="p-4 text-sm leading-6 text-[var(--s-text-muted)]">
              Save the current token state to create a named version. Snapshots store the full token object so restores are lossless.
            </div>
          ) : (
            <div className="divide-y divide-[var(--s-border)]">
              {snapshots.map((snapshot) => {
                const isSelected = selected?.id === snapshot.id;
                return (
                  <button
                    key={snapshot.id}
                    type="button"
                    onClick={() => setSelectedId(snapshot.id)}
                    className="block w-full p-3 text-left transition-colors hover:bg-[var(--s-surface)]"
                    style={{
                      background: isSelected ? "var(--s-surface)" : "transparent",
                    }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold">{snapshot.name}</span>
                      <span className="font-[family-name:var(--s-font-mono)] text-[10px] text-[var(--s-text-subtle)]">
                        {formatDate(snapshot.createdAt)}
                      </span>
                    </div>
                    <div className="mt-1 font-[family-name:var(--s-font-mono)] text-[10px] uppercase tracking-[0.08em] text-[var(--s-text-muted)]">
                      {snapshot.activePreset}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="min-h-0 overflow-auto p-3">
          {selected ? (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <ActionButton onClick={() => restoreSnapshot(selected)}>Restore</ActionButton>
                <ActionButton onClick={() => exportSnapshot(selected)}>Export JSON</ActionButton>
                <ActionButton tone="danger" onClick={() => deleteSnapshot(selected)}>Delete</ActionButton>
              </div>

              <div className="border border-[var(--s-border)] bg-[var(--s-surface)]">
                <div className="border-b border-[var(--s-border)] px-3 py-2 font-[family-name:var(--s-font-mono)] text-[10px] uppercase tracking-[0.12em] text-[var(--s-text-muted)]">
                  Compare to current
                </div>
                {diff.length === 0 ? (
                  <div className="p-3 text-sm text-[var(--s-text-muted)]">
                    No token differences.
                  </div>
                ) : (
                  <div className="max-h-72 overflow-auto">
                    {diff.map((item) => (
                      <div key={item.path} className="border-b border-[var(--s-border-muted)] p-3 last:border-b-0">
                        <div className="font-[family-name:var(--s-font-mono)] text-[10px] text-[var(--s-primary)]">
                          {item.path}
                        </div>
                        <div className="mt-2 grid gap-1 text-[11px] leading-5">
                          <code className="break-all text-[var(--s-text-muted)]">saved: {item.before}</code>
                          <code className="break-all text-[var(--s-text)]">current: {item.after}</code>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-sm text-[var(--s-text-muted)]">
              Select or save a snapshot to compare.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ActionButton({
  children,
  onClick,
  tone = "default",
}: {
  children: string;
  onClick: () => void;
  tone?: "default" | "danger";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border px-3 py-1.5 font-[family-name:var(--s-font-mono)] text-[10px] font-semibold uppercase tracking-[0.08em] transition-colors"
      style={{
        borderColor: tone === "danger" ? "var(--s-error)" : "var(--s-border)",
        color: tone === "danger" ? "var(--s-error)" : "var(--s-text)",
        background: "transparent",
      }}
    >
      {children}
    </button>
  );
}

function readSnapshots(): DesignSnapshot[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as DesignSnapshot[];
    return Array.isArray(parsed) ? parsed.filter((item) => item.version === 1 && item.tokens) : [];
  } catch {
    return [];
  }
}

function diffTokens(before: SigilTokens, after: SigilTokens) {
  const beforeFlat = flatten(before);
  const afterFlat = flatten(after);
  const paths = new Set([...Object.keys(beforeFlat), ...Object.keys(afterFlat)]);
  return [...paths]
    .sort()
    .filter((key) => beforeFlat[key] !== afterFlat[key])
    .map((key) => ({
      path: key,
      before: beforeFlat[key] ?? "(missing)",
      after: afterFlat[key] ?? "(missing)",
    }));
}

function flatten(value: unknown, prefix = "", out: Record<string, string> = {}) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
      flatten(child, prefix ? `${prefix}.${key}` : key, out);
    }
    return out;
  }
  out[prefix] = String(value);
  return out;
}

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}
