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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sigil-ui.com",
    siteName: "Sigil UI",
    title: "Sigil UI — Change the tokens. Everything updates.",
    description:
      `${SIGIL_PRODUCT_SUMMARY}, and an agent-first design system built for AI agents.`,
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
      `${SIGIL_PRODUCT_SUMMARY}, and an agent-first design system built for AI agents.`,
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
    `React component library with ${SIGIL_PRODUCT_SUMMARY}, and an agent-first design system.`,
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
      className={robotoMono.variable}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
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
