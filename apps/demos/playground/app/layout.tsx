import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Component Playground — Sigil UI",
  description: "Sigil UI demo: Explore every component with live preset switching",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="sigil">
      <body>{children}</body>
    </html>
  );
}
