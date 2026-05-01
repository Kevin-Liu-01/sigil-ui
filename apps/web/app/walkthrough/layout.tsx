import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Walkthrough",
  description:
    "A step-by-step guide showing how Sigil tokens flow from a markdown file to CSS custom properties to live components. Understand the full pipeline in five minutes.",
  path: "/walkthrough",
});

export default function WalkthroughLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
