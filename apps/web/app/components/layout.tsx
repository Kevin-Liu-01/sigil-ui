import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Components",
  description:
    "Browse 350+ React components — buttons, cards, inputs, navigation, overlays, charts, and more. Every component is styled through design tokens, not hardcoded values.",
  path: "/components",
  ogTitle: "Component Gallery — Sigil UI",
});

export default function ComponentsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
