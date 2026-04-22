import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agency — Sigil UI",
  description: "Sigil UI demo: Agency landing with the sigil preset",
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
