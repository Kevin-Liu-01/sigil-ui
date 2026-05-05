"use client";

import { useEffect, useLayoutEffect, type ReactNode } from "react";
import {
  SigilTokensProvider,
  applyTokensToDom,
  useSigilTokenValues,
} from "./sandbox/token-provider";
import { SigilDevBar, DevBarProvider } from "./devbar";
import { SigilSoundProvider } from "./sound-provider";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Most token mutations call applyTokensToDom() eagerly from within the
// dispatching action (setPreset, patchTokens, setTokens), so the visual
// update lands without waiting for React. This effect is the safety net
// for any state path that doesn't go through those actions (e.g. a setter
// passed to a third-party tool or hydration after SSR), and for keeping
// the body font-family in sync when typography changes.
function TokenStyleInjector() {
  const tokens = useSigilTokenValues();

  useIsomorphicLayoutEffect(() => {
    applyTokensToDom(tokens);

    const fontBody = tokens.typography?.["font-body"];
    if (typeof fontBody === "string" && fontBody) {
      const probe = `400 16px ${fontBody}`;
      const setFamily = () => {
        document.body.style.fontFamily = fontBody;
      };
      if (document.fonts.check(probe)) {
        setFamily();
      } else {
        document.fonts.load(probe).then(setFamily, setFamily);
      }
    }
  }, [tokens]);

  return null;
}

export function SigilShell({ children }: { children: ReactNode }) {
  return (
    <SigilTokensProvider>
      <SigilSoundProvider>
        <DevBarProvider>
          <TokenStyleInjector />
          <SigilDevBar>
            {children}
          </SigilDevBar>
        </DevBarProvider>
      </SigilSoundProvider>
    </SigilTokensProvider>
  );
}
