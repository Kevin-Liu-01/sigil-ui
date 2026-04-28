import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DocsPresetBar } from "@/components/docs-preset-bar";

export const metadata: Metadata = {
  title: {
    default: "Sigil UI — Design tokens that compound",
    template: "%s | Sigil UI",
  },
  description:
    "The component library where one token file updates everything. Built for agents.",
  metadataBase: new URL("https://sigil-ui.dev"),
  openGraph: {
    title: "Sigil UI — Design tokens that compound",
    description:
      "The component library where one token file updates everything. Built for agents.",
    siteName: "Sigil UI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sigil UI — Design tokens that compound",
    description:
      "The component library where one token file updates everything. Built for agents.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <RootProvider>{children}</RootProvider>
        <DocsPresetBar />
      </body>
    </html>
  );
}
