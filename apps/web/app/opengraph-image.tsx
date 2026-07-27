import { ImageResponse } from "next/og";

import { SocialCard, SOCIAL_CARD_SIZE } from "@/components/social-card";
import { getSocialCardFonts } from "@/lib/social-card-fonts";
import { SIGIL_ONE_LINER } from "@/lib/product-stats";

export const runtime = "nodejs";
export const alt = "Sigil UI — one markdown file controls your entire design system";
export const size = SOCIAL_CARD_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <SocialCard
      description={SIGIL_ONE_LINER}
      label="Design system / 01"
      title={"One markdown file\ncontrols your entire\ndesign system."}
    />,
    { ...size, fonts: await getSocialCardFonts() },
  );
}
