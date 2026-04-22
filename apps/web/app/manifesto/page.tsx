import type { Metadata } from "next";
import { ManifestoContent } from "./content";

export const metadata: Metadata = {
  title: "Manifesto",
  description:
    "Why Sigil exists: an opinionated design language built to kill the AI-generated aesthetic.",
};

export default function ManifestoPage() {
  return <ManifestoContent />;
}
