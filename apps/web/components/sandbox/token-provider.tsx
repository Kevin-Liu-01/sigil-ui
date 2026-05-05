"use client";

import {
  createContext,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
import type { SigilPreset, SigilTokens } from "@sigil-ui/tokens";
import { compileToCss } from "@sigil-ui/tokens";
import { presets, defaultPreset, type PresetName } from "@sigil-ui/presets";

/* ------------------------------------------------------------------ */
/* Synchronous DOM token writer                                        */
/*                                                                    */
/* Switching a preset on the home page used to trigger ~250–500ms     */
/* React renders before the visual swap was visible, because the      */
/* `<style data-sigil-tokens>` tag was rebuilt inside a useEffect that */
/* only fired after React reconciled every consumer of useSigilTokens.*/
/* Now we eagerly write the style tag from within the click handler,  */
/* so the visual change lands on the very next frame and React's      */
/* downstream re-render no longer blocks the perceived update.         */
/*                                                                    */
/* The CSS we write reuses `compileToCss` from @sigil-ui/tokens so      */
/* the runtime + build-time outputs are byte-for-byte identical (up    */
/* to the `!important` flag). This kills the historic naming drift     */
/* where buttons emitted `--s-btn-*` at runtime but `--s-button-*` at   */
/* build time — components only ever consumed `--s-button-*` and the   */
/* runtime layer silently lost overrides for the entire button block.  */
/* ------------------------------------------------------------------ */

const DEFAULT_STYLE_ATTR = "data-sigil-tokens";

// Per-attribute style-tag cache. Each SigilTokensProvider can opt in to its
// own dedicated tag (e.g. nested sandbox provider uses "data-sigil-sandbox"
// so its writes don't clobber the outer provider's tag). Writes are
// short-circuited per attr via lastCssByAttr.
const styleElByAttr = new Map<string, HTMLStyleElement>();
const lastCssByAttr = new Map<string, string>();

function getTokensStyleEl(attr: string): HTMLStyleElement | null {
  if (typeof document === "undefined") return null;
  const cached = styleElByAttr.get(attr);
  if (cached && cached.isConnected) return cached;
  const existing = document.querySelector(
    `style[${attr}]`,
  ) as HTMLStyleElement | null;
  if (existing) {
    styleElByAttr.set(attr, existing);
    return existing;
  }
  const el = document.createElement("style");
  el.setAttribute(attr, "true");
  document.head.appendChild(el);
  styleElByAttr.set(attr, el);
  return el;
}

/**
 * Serialize a token bag to CSS for runtime DOM injection.
 *
 * Wraps the canonical `compileToCss` and post-processes its output to
 * append `!important` on every declaration so the runtime tag wins over
 * the static stylesheet, then rewrites the dark selector to the runtime
 * convention (`.dark, [data-theme="dark"]`) used by the rest of the app.
 *
 * The result is byte-equivalent to the build-time CSS modulo the
 * `!important` flag and the dark-selector list — no hand-rolled emitter,
 * no per-category prefix table to drift out of sync.
 */
export function serializeTokensToCss(tokens: SigilTokens): string {
  const compiled = compileToCss(tokens, {
    selector: ":root",
    darkSelector: ".dark, [data-theme=\"dark\"]",
  });

  // Append `!important` to every declaration. We match the simple
  // `<varname>: <value>;` shape emitted by compileToCss; lines that
  // open/close blocks (`:root {`, `}`) and blank lines are passed through.
  return compiled
    .split("\n")
    .map((line) => {
      const m = /^(\s*)(--[\w-]+):\s*(.+);$/.exec(line);
      if (!m) return line;
      const [, indent, name, value] = m;
      return `${indent}${name}: ${value} !important;`;
    })
    .join("\n")
    .trimEnd();
}

// Synchronously write tokens to the DOM — call this from the user-input
// handler so the visual swap lands in the next paint, independent of when
// React decides to flush its re-render. Returns true if anything changed.
//
// `attr` selects which `<style>` tag to write to. Defaults to the global
// "data-sigil-tokens" tag; nested providers (e.g. /sandbox) pass a unique
// attribute so their writes layer on top via source order without clobbering
// the outer tag.
export function applyTokensToDom(
  tokens: SigilTokens,
  attr: string = DEFAULT_STYLE_ATTR,
): boolean {
  const el = getTokensStyleEl(attr);
  if (!el) return false;
  const css = serializeTokensToCss(tokens);
  if (css === lastCssByAttr.get(attr)) return false;
  lastCssByAttr.set(attr, css);
  el.textContent = css;
  return true;
}

// Defer a React state commit to a fresh macrotask after the browser has had
// a chance to paint. We use a double-rAF + postMessage fallback rather than
// setTimeout because setTimeout(0) is clamped to ~4ms and still runs in the
// same paint frame in some browsers. The double-rAF guarantees the browser
// has actually painted before React starts its (potentially slow) re-render.
function scheduleReactCommit(commit: () => void) {
  if (typeof requestAnimationFrame === "undefined") {
    commit();
    return;
  }
  requestAnimationFrame(() => {
    requestAnimationFrame(commit);
  });
}

type SigilTokensActions = {
  setPreset: (name: string) => Promise<void>;
  setTokens: (tokens: SigilTokens, name?: string) => void;
  patchTokens: (
    category: keyof SigilTokens,
    key: string,
    value: unknown,
  ) => void;
};

type SigilTokensContextValue = SigilTokensActions & {
  tokens: SigilTokens;
  activePreset: string;
};

// Three contexts so consumers can subscribe to only what they need:
//   - SigilTokensValueContext      changes on every token mutation
//   - SigilTokensActiveContext     changes only when preset name swaps
//   - SigilTokensActionsContext    stable for the lifetime of the provider
// The legacy SigilTokensContext keeps the full bag for back-compat with
// components that still call useSigilTokens(); new code should prefer the
// narrower hooks below to avoid unnecessary re-renders.
const SigilTokensContext = createContext<SigilTokensContextValue | null>(null);
const SigilTokensValueContext = createContext<SigilTokens | null>(null);
const SigilTokensActiveContext = createContext<string>("default");
const SigilTokensActionsContext = createContext<SigilTokensActions | null>(
  null,
);

export function SigilTokensProvider({
  children,
  initialPreset,
  initialTokens,
  styleTagAttr = DEFAULT_STYLE_ATTR,
}: {
  children: ReactNode;
  initialPreset?: string | SigilPreset;
  initialTokens?: SigilTokens;
  /**
   * Attribute name of the `<style>` tag this provider writes to. Defaults to
   * `"data-sigil-tokens"`. Nested providers (for example the sandbox page
   * mounting its own provider beneath the global `SigilShell` one) should
   * pass a unique attribute like `"data-sigil-sandbox"` so their CSS layers
   * on top via source order without clobbering the outer tag.
   */
  styleTagAttr?: string;
}) {
  const resolvedName =
    typeof initialPreset === "string"
      ? initialPreset
      : initialPreset?.name ?? "default";

  const resolvedTokens =
    initialTokens ??
    (typeof initialPreset === "object" ? initialPreset?.tokens : undefined) ??
    defaultPreset.tokens;

  const [tokens, setTokens] = useState<SigilTokens>(resolvedTokens);
  const [activePreset, setActivePreset] = useState(resolvedName);

  // Latest-wins guard: if the user clicks two presets in quick succession,
  // only the most recent click should commit state. This prevents the
  // earlier (still-loading) preset from racing in after the newer one.
  const presetSeqRef = useRef(0);
  // Cache loaded preset modules so repeat switches don't re-import.
  const presetCacheRef = useRef(new Map<string, SigilPreset>());
  // Stable ref to the current attribute so memoised actions can read it
  // without breaking memoisation when the attr prop changes.
  const styleAttrRef = useRef(styleTagAttr);
  styleAttrRef.current = styleTagAttr;

  // Write initial tokens eagerly on mount so the very first paint reflects
  // this provider's state. Non-default tags (e.g. the sandbox layer) get
  // torn down on unmount so their !important rules don't outlive the route.
  useIsomorphicLayoutEffect(() => {
    applyTokensToDom(tokens, styleTagAttr);
    if (styleTagAttr === DEFAULT_STYLE_ATTR) return;
    return () => {
      const el = styleElByAttr.get(styleTagAttr);
      el?.remove();
      styleElByAttr.delete(styleTagAttr);
      lastCssByAttr.delete(styleTagAttr);
    };
    // We only want this on (un)mount + when the attribute itself changes,
    // not on every token update — those are handled by the action writers.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [styleTagAttr]);

  const applyPreset = useCallback(
    (preset: SigilPreset, name: string, seq: number) => {
      // Discard stale applies if a newer preset switch has started.
      if (seq !== presetSeqRef.current) return;

      // Fire-and-forget font preload; tokens apply immediately so the swap
      // is visible on the next frame. Modern browsers will repaint with
      // fallback glyphs, then swap once the font is ready (display: swap).
      if (typeof document !== "undefined" && "fonts" in document) {
        const typo = preset.tokens.typography as
          | Record<string, unknown>
          | undefined;
        if (typo) {
          const families = ["font-display", "font-body", "font-mono"]
            .map((k) => typo[k])
            .filter((v): v is string => typeof v === "string");
          for (const f of families) {
            document.fonts.load(`400 16px ${f}`).catch(() => {});
            document.fonts.load(`700 16px ${f}`).catch(() => {});
          }
        }
      }

      // Eager DOM write — visual swap happens on the next paint without
      // waiting for React to reconcile every consumer of useSigilTokens.
      applyTokensToDom(preset.tokens, styleAttrRef.current);

      // The visual swap is already done; everything React does from here
      // on is editor / consumer bookkeeping. Mark it as a transition so
      // React schedules the work at lower priority and yields between
      // component renders — keeps scroll / click handlers responsive while
      // the heavy reconciliation finishes in the background.
      const commit = () => {
        startTransition(() => {
          setTokens(preset.tokens);
          setActivePreset(name);
        });
      };

      if (typeof document === "undefined") {
        commit();
        return;
      }

      // View Transitions on a large DOM are expensive (full before/after
      // snapshots + crossfade) and create multiple long tasks per switch.
      // Skip them when the user prefers reduced motion or when the doc
      // is too big to animate cheaply. Since we already wrote the CSS,
      // a missed VT just means an instant swap instead of a crossfade.
      const reduceMotion =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      const tooManyNodes =
        document.getElementsByTagName("*").length > 2500;

      if (
        typeof document.startViewTransition === "function" &&
        !reduceMotion &&
        !tooManyNodes
      ) {
        const vt = document.startViewTransition(commit);
        vt.finished.catch(() => {});
      } else {
        // Defer the React state update to a separate task so the browser
        // can paint the eager DOM write first. Without this, React's
        // re-render runs in the same task as the click handler and
        // blocks the browser from showing the visual swap until React
        // is done (200ms+ on the home page in dev mode).
        scheduleReactCommit(commit);
      }
    },
    [],
  );

  const setPreset = useCallback(
    async (name: string) => {
      const loader = presets[name as PresetName];
      if (!loader) return;
      const seq = ++presetSeqRef.current;

      // Synchronous path for already-loaded presets — no await tick before
      // we schedule the state update.
      const cached = presetCacheRef.current.get(name);
      if (cached) {
        applyPreset(cached, name, seq);
        return;
      }

      const preset = await loader();
      presetCacheRef.current.set(name, preset);
      applyPreset(preset, name, seq);
    },
    [applyPreset],
  );

  const setTokensDirect = useCallback(
    (next: SigilTokens, name?: string) => {
      applyTokensToDom(next, styleAttrRef.current);
      setTokens(next);
      setActivePreset(name ?? "custom");
    },
    [],
  );

  const patchTokens = useCallback(
    (category: keyof SigilTokens, key: string, value: unknown) => {
      setTokens((prev) => {
        const cat = { ...(prev[category] as Record<string, unknown>) };
        if (key.includes(".")) {
          const [parent, ...rest] = key.split(".");
          const child = rest.join(".");
          cat[parent!] = {
            ...((cat[parent!] as Record<string, unknown>) ?? {}),
            [child]: value,
          };
        } else {
          cat[key] = value;
        }
        const next = { ...prev, [category]: cat };
        // Eager DOM write so editor sliders feel real-time instead of
        // waiting for the React render cycle to flush a useEffect.
        applyTokensToDom(next, styleAttrRef.current);
        return next;
      });
      setActivePreset((prev) => (prev.endsWith("*") ? prev : `${prev}*`));
    },
    [],
  );

  // Actions are stable across renders — consumers that only need to call
  // setPreset / setTokens / patchTokens never re-render on token changes.
  const actions = useMemo<SigilTokensActions>(
    () => ({ setPreset, setTokens: setTokensDirect, patchTokens }),
    [setPreset, setTokensDirect, patchTokens],
  );

  // Legacy combined value for back-compat callers of useSigilTokens().
  const ctx = useMemo<SigilTokensContextValue>(
    () => ({ tokens, activePreset, ...actions }),
    [tokens, activePreset, actions],
  );

  return (
    <SigilTokensActionsContext.Provider value={actions}>
      <SigilTokensActiveContext.Provider value={activePreset}>
        <SigilTokensValueContext.Provider value={tokens}>
          <SigilTokensContext.Provider value={ctx}>
            {children}
          </SigilTokensContext.Provider>
        </SigilTokensValueContext.Provider>
      </SigilTokensActiveContext.Provider>
    </SigilTokensActionsContext.Provider>
  );
}

export function useSigilTokens() {
  const ctx = useContext(SigilTokensContext);
  if (!ctx)
    throw new Error("useSigilTokens must be used within SigilTokensProvider");
  return ctx;
}

// Narrow hooks — prefer these in new code so components subscribe to the
// smallest slice of state they actually need.
export function useSigilTokenValues(): SigilTokens {
  const v = useContext(SigilTokensValueContext);
  if (!v)
    throw new Error(
      "useSigilTokenValues must be used within SigilTokensProvider",
    );
  return v;
}

export function useSigilActivePreset(): string {
  return useContext(SigilTokensActiveContext);
}

export function useSigilActions(): SigilTokensActions {
  const a = useContext(SigilTokensActionsContext);
  if (!a)
    throw new Error("useSigilActions must be used within SigilTokensProvider");
  return a;
}

/* ------------------------------------------------------------------ */
/* Optional hooks — safe to call outside SigilTokensProvider           */
/*                                                                    */
/* The website composes some surfaces (the docs MDX renderer, the     */
/* preset-detail static pages) that may render without the provider   */
/* mounted — for example during SSG. Components that want to react    */
/* to tokens *if available* but degrade gracefully when not should    */
/* call these instead of wrapping the throwing variants in try/catch. */
/* ------------------------------------------------------------------ */

export function useOptionalSigilTokenValues(): SigilTokens | null {
  return useContext(SigilTokensValueContext);
}

export function useOptionalSigilActivePreset(): string | null {
  // Returns null when no provider is mounted — distinguish from the
  // default "default" string the throwing variant would synthesize.
  const v = useContext(SigilTokensActiveContext);
  // Active context has a default value of "default" baked into createContext;
  // we can't distinguish absent vs "default" without a sentinel, but the
  // useful fact for callers is that "always returns a string" is fine.
  return v;
}

export function useOptionalSigilActions(): SigilTokensActions | null {
  return useContext(SigilTokensActionsContext);
}

export const SigilTokenProvider = SigilTokensProvider;

/**
 * @deprecated SandboxTokenInjector is no longer needed. Pass
 * `styleTagAttr="data-sigil-sandbox"` (or another unique attribute) to the
 * inner `SigilTokensProvider` instead — the provider now writes eagerly to
 * its own dedicated tag and tears it down on unmount. This shim keeps the
 * old import path alive so existing call sites don't break.
 */
export function SandboxTokenInjector() {
  return null;
}
