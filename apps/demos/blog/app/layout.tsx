import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blog — Sigil UI",
  description: "Sigil UI demo: Blog with the editorial preset",
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
