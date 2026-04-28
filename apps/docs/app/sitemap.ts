import type { MetadataRoute } from "next";
import { source } from "@/lib/source";

const BASE_URL = "https://sigil-ui.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const docPages = source.getPages();

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/docs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  for (const page of docPages) {
    entries.push({
      url: `${BASE_URL}/docs/${page.slugs.join("/")}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  return entries;
}
