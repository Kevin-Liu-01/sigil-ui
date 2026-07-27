import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

import { SocialCard, SOCIAL_CARD_SIZE } from "@/components/social-card";
import { getSocialCardFonts } from "@/lib/social-card-fonts";
import { SIGIL_ONE_LINER } from "@/lib/product-stats";

export const runtime = "nodejs";

const TYPE_LABELS: Record<string, string> = {
  blog: "Field notes / 05",
  default: "Design system / 01",
  demo: "Demo archive / 04",
  docs: "Documentation / 02",
  preset: "Preset system / 03",
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const hasTitle = searchParams.has("title");
    const type = searchParams.get("type") || "default";
    const title = hasTitle
      ? (searchParams.get("title") || "Sigil UI").slice(0, 120)
      : "One markdown file\ncontrols your entire\ndesign system.";
    const description = hasTitle
      ? (searchParams.get("subtitle") || "Token-driven components. One editable source of truth.").slice(0, 180)
      : SIGIL_ONE_LINER;

    return new ImageResponse(
      <SocialCard
        description={description}
        label={TYPE_LABELS[type] || TYPE_LABELS.default}
        title={title}
      />,
      { ...SOCIAL_CARD_SIZE, fonts: await getSocialCardFonts() },
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`OG image generation failed: ${message}`);
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
