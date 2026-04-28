import "./global.css";
import { Roboto_Mono } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SigilShell } from "@/components/sigil-shell";
import { ThemeProvider } from "@/components/theme-provider";
import { DocSearchPalette } from "@/components/doc-search-palette";
import { SIGIL_PRODUCT_SUMMARY } from "@/lib/product-stats";

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
    `The component library where tokens control your entire design system. ${SIGIL_PRODUCT_SUMMARY}, built for AI agents.`,
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
    "component library",
  ],
  authors: [{ name: "Kevin Liu", url: "https://kevinliu.me" }],
  creator: "Kevin Liu",
  category: "technology",
  metadataBase: new URL("https://sigil-ui.com"),
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
    type: "website",
    locale: "en_US",
    url: "https://sigil-ui.com",
    siteName: "Sigil UI",
    title: "Sigil UI — Change the tokens. Everything updates.",
    description:
      `${SIGIL_PRODUCT_SUMMARY}, and an agent-first design system built for AI agents.`,
  },
  twitter: {
    card: "summary_large_image",
    site: "@kevinliu",
    creator: "@kevinliu",
    title: "Sigil UI — Change the tokens. Everything updates.",
    description:
      `${SIGIL_PRODUCT_SUMMARY}, and an agent-first design system built for AI agents.`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://sigil-ui.com/#website",
      name: "Sigil UI",
      url: "https://sigil-ui.com",
      description:
        "Token-driven component library. Change the tokens, everything updates.",
      publisher: { "@id": "https://sigil-ui.com/#organization" },
    },
    {
      "@type": "Organization",
      "@id": "https://sigil-ui.com/#organization",
      name: "Sigil UI",
      url: "https://sigil-ui.com",
      logo: "https://sigil-ui.com/logo.svg",
      description: `Open-source design system with ${SIGIL_PRODUCT_SUMMARY}. Built for AI agents.`,
      sameAs: [
        "https://github.com/keiranlovett/reticle-ui",
        "https://www.npmjs.com/org/sigil-ui",
        "https://x.com/kevinliu",
      ],
      founder: {
        "@type": "Person",
        name: "Kevin Liu",
        url: "https://kevinliu.me",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://sigil-ui.com/#app",
      name: "Sigil UI",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      description: `React component library with ${SIGIL_PRODUCT_SUMMARY}, and an agent-first design system.`,
      url: "https://sigil-ui.com",
      author: { "@id": "https://sigil-ui.com/#organization" },
      license: "https://opensource.org/licenses/MIT",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "519 configurable design tokens",
        "200+ React components",
        "46 curated presets",
        "AI agent-first workflow",
        "OKLCH color system",
        "Token-driven theming via CSS custom properties",
        "CLI for init, preset switching, and component scaffolding",
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={robotoMono.variable}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <SigilShell>
            {children}
            <DocSearchPalette />
          </SigilShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
