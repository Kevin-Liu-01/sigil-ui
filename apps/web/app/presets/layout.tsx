import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Presets",
  description:
    "46 curated preset themes spanning structural, minimal, dark, colorful, editorial, industrial, and edgeless aesthetics. Each preset configures all 519 tokens.",
  path: "/presets",
  ogTitle: "Preset Gallery — Sigil UI",
});

export default function PresetsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
