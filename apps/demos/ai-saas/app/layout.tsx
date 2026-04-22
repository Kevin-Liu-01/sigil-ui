import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI SaaS Landing — Sigil UI",
  description: "Sigil UI demo: AI SaaS landing page with the sigil preset",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
