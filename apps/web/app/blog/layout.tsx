import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Blog",
  description:
    "Guides, tutorials, and updates from the Sigil UI team. Design tokens, preset authoring, agent workflows, and component patterns.",
  path: "/blog",
});

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
