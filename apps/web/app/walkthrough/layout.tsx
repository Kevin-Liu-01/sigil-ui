import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Walkthrough",
  description:
    "Step-by-step guide to the Sigil UI token pipeline. See how tokens flow from markdown to CSS custom properties to components.",
  path: "/walkthrough",
});

export default function WalkthroughLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
