import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Components",
  description:
    "200+ token-driven React components. Buttons, cards, inputs, navigation, overlays, data viz, and more — all styled via CSS custom properties.",
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
