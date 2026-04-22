import type { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
  title: "Sigil UI — Change the tokens. Everything updates.",
  description:
    "The component library where one token file updates everything. 70+ components, 5 presets, built for AI agents. The modern shadcn alternative with centralized design tokens.",
  keywords: [
    "react design system",
    "shadcn alternative",
    "ui components",
    "design tokens",
    "tailwind components",
    "agent-friendly ui",
    "ai b2b saas ui",
    "modern ui components",
    "react component library",
    "design system npm",
  ],
  openGraph: {
    title: "Sigil UI — Change the tokens. Everything updates.",
    description:
      "The component library where one token file updates everything. 70+ components, 5 presets, built for AI agents.",
    siteName: "Sigil UI",
    type: "website",
    locale: "en_US",
    url: "https://sigil-ui.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sigil UI — Change the tokens. Everything updates.",
    description:
      "The component library where one token file updates everything. 70+ components, 5 presets, built for AI agents.",
  },
  alternates: {
    canonical: "https://sigil-ui.dev",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Sigil UI",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  description:
    "A React component library with centralized design tokens. One markdown file controls your entire design system. 70+ components, 5 presets, built for AI agents.",
  url: "https://sigil-ui.dev",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Person",
    name: "Kevin Liu",
    url: "https://github.com/Kevin-Liu-01",
  },
  license: "https://opensource.org/licenses/MIT",
  programmingLanguage: ["TypeScript", "React", "CSS"],
  softwareRequirements: "React 18+, Tailwind CSS 4+",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
