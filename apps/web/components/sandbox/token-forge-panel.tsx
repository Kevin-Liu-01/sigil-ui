"use client";

import { useState } from "react";
import { TOKEN_RECIPES, type TokenRecipe } from "./token-markdown";

type TokenForgePanelProps = {
  activeId: string;
  activeName: string;
  onGenerate: (recipe: TokenRecipe) => void;
  onCopyMarkdown: () => void;
};

export function TokenForgePanel({
  activeId,
  activeName,
  onGenerate,
  onCopyMarkdown,
}: TokenForgePanelProps) {
  const [expanded, setExpanded] = useState(true);

  if (!expanded) {
    return (
      <button
        type="button"
        onClick={() => setExpanded(true)}
        className="flex w-full items-center gap-3 border-b px-4 py-2 text-left"
        style={{ borderColor: "var(--s-border)", background: "var(--s-surface)", cursor: "pointer", border: "none", borderBottom: "1px solid var(--s-border)" }}
      >
        <span className="font-[family-name:var(--s-font-mono)] text-[10px] font-semibold uppercase tracking-[0.10em]" style={{ color: "var(--s-primary)" }}>
          Token Forge
        </span>
        <span className="font-[family-name:var(--s-font-mono)] text-[10px]" style={{ color: "var(--s-text-muted)" }}>
          {activeName}
        </span>
        <span className="ml-auto text-[10px]" style={{ color: "var(--s-text-subtle)" }}>expand</span>
      </button>
    );
  }

  return (
    <section
      className="border-b px-4 py-3"
      style={{
        borderColor: "var(--s-border)",
        background: "linear-gradient(90deg, color-mix(in oklch, var(--s-primary) 8%, var(--s-background)), var(--s-background) 48%)",
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="mb-1 font-[family-name:var(--s-font-mono)] text-[10px] font-semibold uppercase tracking-[0.10em]" style={{ color: "var(--s-primary)" }}>
            Token forge
          </div>
          <p className="m-0 text-[11px] leading-relaxed" style={{ color: "var(--s-text-muted)" }}>
            Pick a direction. Drag components from the library. See them rendered with your tokens.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={onCopyMarkdown} className="h-7 border border-[var(--s-border)] bg-transparent px-2.5 font-[family-name:var(--s-font-mono)] text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--s-text-muted)] cursor-pointer">
            Copy .md
          </button>
          <button type="button" onClick={() => setExpanded(false)} className="h-7 border border-[var(--s-border)] bg-transparent px-2.5 font-[family-name:var(--s-font-mono)] text-[10px] text-[var(--s-text-subtle)] cursor-pointer">
            collapse
          </button>
        </div>
      </div>

      <div className="mt-2 grid gap-1.5 grid-cols-2 lg:grid-cols-4">
        {TOKEN_RECIPES.map((recipe) => {
          const active = recipe.id === activeId;
          return (
            <button
              key={recipe.id}
              type="button"
              onClick={() => onGenerate(recipe)}
              className="cursor-pointer border p-2.5 text-left transition-all duration-[var(--s-duration-fast,120ms)] hover:-translate-y-px"
              style={{
                borderColor: active ? "var(--s-primary)" : "var(--s-border)",
                borderRadius: "var(--s-radius-sm, 4px)",
                background: active ? "color-mix(in oklch, var(--s-primary) 10%, var(--s-surface))" : "var(--s-surface)",
              }}
            >
              <div className="mb-2 flex items-center gap-1">
                <span style={{ width: 10, height: 10, background: recipe.primary.dark, border: "1px solid var(--s-border)" }} />
                <span style={{ width: 10, height: 10, background: recipe.secondary.dark, border: "1px solid var(--s-border)" }} />
                <span style={{ width: 10, height: 10, background: recipe.background.dark, border: "1px solid var(--s-border)" }} />
              </div>
              <div className="font-[family-name:var(--s-font-mono)] text-[10px] font-semibold uppercase tracking-[0.04em]">
                {recipe.label}
              </div>
              <div className="mt-0.5 text-[10px] leading-snug" style={{ color: "var(--s-text-muted)" }}>
                {recipe.mood}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
