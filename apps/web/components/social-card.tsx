import { SIGIL_PRODUCT_STATS } from "@/lib/product-stats";
import { SOCIAL_CARD_THEME } from "@/lib/social-card-theme";

export const SOCIAL_CARD_SIZE = { height: 630, width: 1200 } as const;

export type SocialCardProps = {
  description: string;
  label: string;
  title: string;
};

function titleSize(title: string): number {
  if (title.includes("\n")) return 58;
  if (title.length < 20) return 82;
  if (title.length > 88) return 44;
  if (title.length > 62) return 50;
  if (title.length > 42) return 56;
  return 64;
}

function SigilMark({ size }: { size: number }) {
  const { accent, ink } = SOCIAL_CARD_THEME.colors;

  return (
    <svg aria-hidden height={size} viewBox="0 0 120 120" width={size}>
      <polygon points="0,0 56,0 56,32 40,40 40,56 0,56" fill={ink} />
      <polygon points="120,0 120,56 88,56 80,40 64,40 64,0" fill={ink} />
      <polygon points="0,120 0,64 32,64 40,80 56,80 56,120" fill={ink} />
      <polygon points="120,120 64,120 64,88 80,80 80,64 120,64" fill={accent} />
    </svg>
  );
}

function BrandHeader() {
  return (
    <div style={{ alignItems: "center", display: "flex", left: 62, position: "absolute", top: 50 }}>
      <SigilMark size={36} />
      <div
        style={{
          display: "flex",
          fontFamily: SOCIAL_CARD_THEME.font.display,
          fontSize: 21,
          fontWeight: 700,
          letterSpacing: -0.6,
          marginLeft: 14,
        }}
      >
        SIGIL UI
      </div>
    </div>
  );
}

function CopyBlock({ description, label, title }: SocialCardProps) {
  const { accent, inkMuted } = SOCIAL_CARD_THEME.colors;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        left: 62,
        position: "absolute",
        top: 146,
        width: 620,
      }}
    >
      <div
        style={{
          alignItems: "center",
          color: inkMuted,
          display: "flex",
          fontFamily: SOCIAL_CARD_THEME.font.mono,
          fontSize: 11,
          letterSpacing: 2,
        }}
      >
        <span style={{ background: accent, display: "flex", height: 7, marginRight: 12, width: 7 }} />
        {label.toUpperCase()}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontFamily: SOCIAL_CARD_THEME.font.display,
          fontSize: titleSize(title),
          fontWeight: 700,
          letterSpacing: -3,
          lineHeight: 0.98,
          marginTop: 25,
          maxWidth: 610,
        }}
      >
        {title.split("\n").map((line, index) => (
          <div key={`${line}-${index}`} style={{ display: "flex" }}>
            {line}
          </div>
        ))}
      </div>
      <div
        style={{
          color: inkMuted,
          display: "flex",
          fontFamily: SOCIAL_CARD_THEME.font.display,
          fontSize: 20,
          lineHeight: 1.38,
          marginTop: 25,
          maxWidth: 570,
        }}
      >
        {description}
      </div>
    </div>
  );
}

type PipelineNodeProps = {
  caption: string;
  inverse?: boolean;
  label: string;
  primary?: boolean;
};

function PipelineNode({ caption, inverse = false, label, primary = false }: PipelineNodeProps) {
  const { accent, borderStrong, ink, reverse, reverseMuted, reverseText, surface } = SOCIAL_CARD_THEME.colors;

  return (
    <div
      style={{
        alignItems: "center",
        background: inverse ? reverse : primary ? accent : surface,
        border: inverse || primary ? "none" : `1px solid ${borderStrong}`,
        color: inverse ? reverseText : ink,
        display: "flex",
        height: 72,
        padding: "0 20px",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", fontFamily: SOCIAL_CARD_THEME.font.display, fontSize: 20, fontWeight: 700 }}>
        {label}
      </div>
      <div
        style={{
          color: inverse ? reverseMuted : ink,
          display: "flex",
          fontFamily: SOCIAL_CARD_THEME.font.mono,
          fontSize: 10,
          letterSpacing: 1.4,
          marginLeft: "auto",
          opacity: inverse ? 1 : 0.55,
        }}
      >
        {caption}
      </div>
    </div>
  );
}

function PipelineConnector() {
  const { accent, borderStrong } = SOCIAL_CARD_THEME.colors;

  return (
    <div style={{ alignItems: "center", display: "flex", height: 28, justifyContent: "center", position: "relative" }}>
      <div style={{ background: borderStrong, display: "flex", height: 28, opacity: 0.65, width: 1 }} />
      <div style={{ background: accent, bottom: 0, display: "flex", height: 6, position: "absolute", width: 6 }} />
    </div>
  );
}

function PipelineDiagram() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        right: 54,
        top: 72,
        width: 392,
      }}
    >
      <div
        style={{
          color: SOCIAL_CARD_THEME.colors.inkMuted,
          display: "flex",
          fontFamily: SOCIAL_CARD_THEME.font.mono,
          fontSize: 11,
          letterSpacing: 2,
          marginBottom: 18,
        }}
      >
        COMPILE PIPELINE
      </div>
      <PipelineNode caption="SOURCE" label="DESIGN.md" primary />
      <PipelineConnector />
      <PipelineNode caption="33 CATEGORIES" label={`${SIGIL_PRODUCT_STATS.tokenCount} tokens`} />
      <PipelineConnector />
      <PipelineNode caption="OUTPUTS" label="CSS · Tailwind · W3C" />
      <PipelineConnector />
      <PipelineNode caption="CONSUMERS" label={`${SIGIL_PRODUCT_STATS.componentCountLabel} components`} inverse />
    </div>
  );
}

export function SocialCard(props: SocialCardProps) {
  const { background, border, ink } = SOCIAL_CARD_THEME.colors;

  return (
    <div
      style={{
        background,
        border: `1px solid ${border}`,
        color: ink,
        display: "flex",
        fontFamily: SOCIAL_CARD_THEME.font.display,
        height: "100%",
        overflow: "hidden",
        position: "relative",
        width: "100%",
      }}
    >
      <div style={{ background: border, bottom: 46, display: "flex", left: 62, position: "absolute", right: 54, height: 1 }} />
      <div
        style={{
          color: SOCIAL_CARD_THEME.colors.inkMuted,
          display: "flex",
          fontFamily: SOCIAL_CARD_THEME.font.mono,
          fontSize: 10,
          left: 62,
          letterSpacing: 1.6,
          position: "absolute",
          top: 596,
        }}
      >
        EDIT TOKENS, NOT COMPONENTS
      </div>
      <BrandHeader />
      <CopyBlock {...props} />
      <PipelineDiagram />
    </div>
  );
}
