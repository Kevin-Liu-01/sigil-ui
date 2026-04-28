import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sigil UI — Token-driven component library";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BRAND = {
  bg: "#09090b",
  text: "#fafafa",
  accent: "#6366f1",
  muted: "#71717a",
  gridLine: "#ffffff08",
} as const;

export default async function Image() {
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
        {/* Grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage: `linear-gradient(${BRAND.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${BRAND.gridLine} 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Glow */}
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
            padding: "80px",
            height: "100%",
            position: "relative",
          }}
        >
          {/* Sigil mark */}
          <div style={{ display: "flex", marginBottom: 40 }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 120 120"
              width={56}
              height={56}
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
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: BRAND.text,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              maxWidth: 900,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            Change the tokens. Everything updates.
          </div>

          {/* Stats */}
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
            200+ components · 519 tokens · 46 presets
          </div>
        </div>

        {/* Bottom accent bar */}
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
    { ...size },
  );
}
