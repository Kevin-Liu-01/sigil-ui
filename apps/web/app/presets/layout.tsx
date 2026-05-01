import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Presets",
  description:
    "46 curated presets across seven categories — structural, minimal, dark, colorful, editorial, industrial, and edgeless. Each preset rewrites all 519 tokens to create a distinct visual identity.",
  path: "/presets",
  ogTitle: "Preset Gallery — Sigil UI",
});

export default function PresetsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
