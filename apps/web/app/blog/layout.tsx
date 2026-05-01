import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Blog",
  description:
    "Guides, deep dives, and release notes from the Sigil UI project. Token architecture, preset authoring, component patterns, and practical workflows.",
  path: "/blog",
});

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
