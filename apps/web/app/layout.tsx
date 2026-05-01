import "./global.css";
import { Roboto_Mono } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SigilShell } from "@/components/sigil-shell";
import { ThemeProvider } from "@/components/theme-provider";
import { DocSearchPalette } from "@/components/doc-search-palette";
import {
  SIGIL_PRODUCT_SUMMARY,
  SIGIL_ONE_LINER,
  SIGIL_PRODUCT_STATS,
} from "@/lib/product-stats";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

const siteDescription = `${SIGIL_ONE_LINER} ${SIGIL_PRODUCT_SUMMARY} — all styled through CSS custom properties. Switch presets and every component updates instantly.`;
const ogDescription = `One token file. ${SIGIL_PRODUCT_SUMMARY}. Switch presets and your entire UI updates — colors, fonts, spacing, radius, motion, everything.`;

export const metadata: Metadata = {
  title: {
    default: "Sigil UI — Token-Driven React Components",
    template: "%s — Sigil UI",
  },
  description: siteDescription,
  keywords: [
    "sigil ui",
    "design tokens",
    "react component library",
    "design system",
    "tailwind css",
    "css custom properties",
    "theming presets",
    "token-driven components",
    "base ui primitives",
    "open source ui",
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
    title: "Sigil UI — One Token File Controls Everything",
    description: ogDescription,
  },
  twitter: {
    card: "summary_large_image",
    site: "@kevinliu",
    creator: "@kevinliu",
    title: "Sigil UI — One Token File Controls Everything",
    description: ogDescription,
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
      description: SIGIL_ONE_LINER,
      publisher: { "@id": "https://sigil-ui.com/#organization" },
    },
    {
      "@type": "Organization",
      "@id": "https://sigil-ui.com/#organization",
      name: "Sigil UI",
      url: "https://sigil-ui.com",
      logo: "https://sigil-ui.com/logo.svg",
      description: `Open-source React component library with ${SIGIL_PRODUCT_SUMMARY}. One token file controls every color, font, radius, and animation.`,
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
      description: `${SIGIL_ONE_LINER} ${SIGIL_PRODUCT_SUMMARY}, all styled through CSS custom properties from a single token layer.`,
      url: "https://sigil-ui.com",
      author: { "@id": "https://sigil-ui.com/#organization" },
      license: "https://opensource.org/licenses/MIT",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        `${SIGIL_PRODUCT_STATS.tokenCount} configurable design tokens in one file`,
        `${SIGIL_PRODUCT_STATS.componentCountLabel} React components built on Radix + Base UI primitives`,
        `${SIGIL_PRODUCT_STATS.presetCount} curated presets that change every token at once`,
        "OKLCH color system with perceptual uniformity",
        "Token-driven theming via CSS custom properties",
        "CLI for project setup, preset switching, and component scaffolding",
        "Agent-readable token layer for AI-assisted development",
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
