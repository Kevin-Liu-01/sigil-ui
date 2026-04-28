import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

const base = buildPageMetadata({
  title: "Demos",
  description:
    "17 full-page demo sites built with Sigil UI. Templates for AI SaaS, dashboards, e-commerce, portfolios, blogs, and more — plus showcase clones of Linear, Vercel, and Vite.",
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
