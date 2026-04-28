import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const BRAND = {
  bg: "#09090b",
  text: "#fafafa",
  accent: "#6366f1",
  muted: "#71717a",
  gridLine: "#ffffff08",
} as const;

function SigilMark({ size = 48 }: { size?: number }) {
  const s = size;
  const unit = s / 120;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      width={s}
      height={s}
    >
      <polygon
        points="0,0 56,0 56,32 40,40 40,56 0,56"
        fill={BRAND.text}
      />
      <polygon
        points="120,0 120,56 88,56 80,40 64,40 64,0"
        fill={BRAND.text}
      />
      <polygon
        points="0,120 0,64 32,64 40,80 56,80 56,120"
        fill={BRAND.text}
      />
      <polygon
        points="120,120 64,120 64,88 80,80 80,64 120,64"
        fill={BRAND.accent}
      />
    </svg>
  );
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const title = (searchParams.get("title") || "Sigil UI").slice(0, 120);
    const subtitle = searchParams.get("subtitle") || "";
    const type = searchParams.get("type") || "default";

    const isDefault = type === "default" && !searchParams.has("title");

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: BRAND.bg,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              backgroundImage: `linear-gradient(${BRAND.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${BRAND.gridLine} 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Accent glow in bottom-right */}
          <div
            style={{
              position: "absolute",
              bottom: -120,
              right: -120,
              width: 480,
              height: 480,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${BRAND.accent}18 0%, transparent 70%)`,
              display: "flex",
            }}
          />

          {/* Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "80px 80px",
              height: "100%",
              position: "relative",
            }}
          >
            {/* Logo + wordmark */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                marginBottom: isDefault ? 40 : 32,
              }}
            >
              <SigilMark size={isDefault ? 56 : 44} />
              {!isDefault && (
                <span
                  style={{
                    fontSize: 24,
                    fontFamily: "monospace",
                    color: BRAND.muted,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Sigil UI
                </span>
              )}
            </div>

            {/* Title */}
            <div
              style={{
                fontSize: isDefault ? 64 : type === "blog" ? 52 : 56,
                fontWeight: 700,
                color: BRAND.text,
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                maxWidth: 900,
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {isDefault
                ? "Change the tokens. Everything updates."
                : title}
            </div>

            {/* Subtitle / stats */}
            <div
              style={{
                fontSize: 24,
                color: BRAND.accent,
                marginTop: 24,
                letterSpacing: "0.02em",
                fontFamily: "monospace",
                display: "flex",
              }}
            >
              {isDefault
                ? "200+ components · 519 tokens · 46 presets"
                : subtitle ||
                  (type === "docs"
                    ? "Documentation"
                    : type === "blog"
                      ? "Blog"
                      : type === "preset"
                        ? "Preset Gallery"
                        : "Token-driven component library")}
            </div>
          </div>

          {/* Bottom bar */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 4,
              background: `linear-gradient(90deg, ${BRAND.accent}, ${BRAND.accent}40)`,
              display: "flex",
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    console.error(`OG image generation failed: ${message}`);
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
