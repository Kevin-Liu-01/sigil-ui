import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { template: "%s — Sigil UI Demo", default: "Demo — Sigil UI" },
};

export default function DemoLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
