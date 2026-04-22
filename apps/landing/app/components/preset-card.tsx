type PresetCardProps = {
  name: string;
  fonts: string;
  colors: string[];
  bg: string;
  text: string;
  border: string;
  active?: boolean;
};

export function PresetCard({
  name,
  fonts,
  colors,
  bg,
  text,
  border,
  active = false,
}: PresetCardProps) {
  return (
    <div
      className="flex flex-col justify-between transition-transform r-press"
      style={{
        padding: "var(--r-space-6)",
        borderRadius: "var(--r-card-radius)",
        border: `1px solid ${border}`,
        background: bg,
        color: text,
        minHeight: 180,
        cursor: "pointer",
        outline: active ? "2px solid var(--r-primary)" : "none",
        outlineOffset: 2,
      }}
    >
      <div>
        <div
          className="r-mono font-semibold"
          style={{
            fontSize: "14px",
            marginBottom: "var(--r-space-2)",
            letterSpacing: "-0.01em",
          }}
        >
          {name}
        </div>
        <div
          className="r-mono"
          style={{
            fontSize: "11px",
            opacity: 0.6,
            lineHeight: 1.5,
          }}
        >
          {fonts}
        </div>
      </div>

      {/* Color swatches */}
      <div className="flex gap-1.5" style={{ marginTop: "var(--r-space-4)" }}>
        {colors.map((color, i) => (
          <div
            key={i}
            style={{
              width: 24,
              height: 24,
              borderRadius: "var(--r-radius-sm)",
              background: color,
              border: `1px solid ${border}`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
