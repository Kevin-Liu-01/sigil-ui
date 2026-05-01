import { buildPageMetadata } from "@/lib/metadata";
import { ManifestoContent } from "./content";

export const metadata = buildPageMetadata({
  title: "Manifesto",
  description:
    "Why we built Sigil — every AI-coded site looks the same because agents get components without opinions. Sigil gives them a token layer with real design identity.",
  path: "/manifesto",
});

export default function ManifestoPage() {
  return <ManifestoContent />;
}
