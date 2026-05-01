import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DocsPresetBar } from "@/components/docs-preset-bar";

const docsDescription =
  "Documentation for Sigil UI — the React component library where one token file controls every color, font, radius, and animation. Guides for tokens, presets, components, and the CLI.";

export const metadata: Metadata = {
  title: {
    default: "Sigil UI Docs — Tokens, Presets, Components, CLI",
    template: "%s | Sigil UI Docs",
  },
  description: docsDescription,
  metadataBase: new URL("https://sigil-ui.dev"),
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Sigil UI Docs — Tokens, Presets, Components, CLI",
    description: docsDescription,
    siteName: "Sigil UI Docs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@kevinliu",
    creator: "@kevinliu",
    title: "Sigil UI Docs — Tokens, Presets, Components, CLI",
    description: docsDescription,
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
