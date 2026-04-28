import { buildPageMetadata } from "@/lib/metadata";
import { ManifestoContent } from "./content";

export const metadata = buildPageMetadata({
  title: "Manifesto",
  description:
    "Why Sigil exists: an opinionated design language built to kill the AI-generated aesthetic.",
  path: "/manifesto",
});

export default function ManifestoPage() {
  return <ManifestoContent />;
}
