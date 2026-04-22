import "./global.css";
import { Roboto_Mono } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SigilShell } from "@/components/sigil-shell";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sigil UI",
    template: "%s — Sigil UI",
  },
  description:
    "The component library where one markdown file controls your entire design system. 100+ token-driven components, 300+ tokens, 30 presets, built for AI agents.",
  keywords: [
    "sigil ui",
    "design tokens",
    "component library",
    "react components",
    "tailwind css",
    "design system",
    "ai agents",
    "presets",
    "token-driven",
    "shadcn alternative",
  ],
  authors: [{ name: "Kevin Liu", url: "https://kevinliu.me" }],
  creator: "Kevin Liu",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sigil-ui.com",
    siteName: "Sigil UI",
    title: "Sigil UI — Change the tokens. Everything updates.",
    description:
      "100+ token-driven React components, 300+ tokens, 30 presets, and a markdown-first design system built for AI agents.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Sigil UI — Token-driven component library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sigil UI — Change the tokens. Everything updates.",
    description:
      "100+ token-driven React components, 300+ tokens, 30 presets, and a markdown-first design system built for AI agents.",
    images: ["/og.png"],
    creator: "@kevinliu",
  },
  metadataBase: new URL("https://sigil-ui.com"),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Sigil UI",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  description:
    "Token-driven React component library with 100+ components, 300+ tokens, 30 presets, and markdown-first design system for AI agents.",
  url: "https://sigil-ui.com",
  author: {
    "@type": "Person",
    name: "Kevin Liu",
    url: "https://kevinliu.me",
  },
  license: "https://opensource.org/licenses/MIT",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${robotoMono.variable}`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <body style={{ paddingBottom: 40 }} suppressHydrationWarning>
        <SigilShell>
          {children}
        </SigilShell>
      </body>
    </html>
  );
}
