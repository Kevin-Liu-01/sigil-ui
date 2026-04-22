import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Developer Docs — Sigil UI",
  description: "Sigil UI demo: Developer docs with the editorial preset",
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
