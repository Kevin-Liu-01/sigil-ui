import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CLI Tool — Sigil UI",
  description: "Sigil UI demo: CLI tool landing with the midnight preset",
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
