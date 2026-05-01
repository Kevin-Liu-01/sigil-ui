import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

const base = buildPageMetadata({
  title: "Demos",
  description:
    "17 production-ready templates built with Sigil UI — SaaS, dashboards, e-commerce, portfolios, dev docs, and more. Each uses a different preset to show how the same components create distinct products.",
  path: "/demos",
  ogTitle: "Demo Sites — Sigil UI",
});

export const metadata: Metadata = {
  ...base,
  title: { template: "%s — Sigil UI Demo", default: "Demos" },
};

export default function DemoLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
