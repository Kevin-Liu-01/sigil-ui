"use client";

type PresetRow = {
  name: string;
  category: string;
  primary: string;
  background: string;
  font: string;
  radius: string;
};

const PRESET_DATA: PresetRow[] = [
  { name: "sigil", category: "structural", primary: "oklch(0.65 0.15 280)", background: "#0a0a0f", font: "Monument Grotesk", radius: "0px" },
  { name: "forge", category: "industrial", primary: "oklch(0.60 0.20 30)", background: "#1c1917", font: "PP Supply Sans", radius: "0px" },
  { name: "noir", category: "dark", primary: "oklch(0.70 0.12 70)", background: "#000000", font: "PP Neue Montreal", radius: "0px" },
  { name: "arc", category: "minimal", primary: "oklch(0.55 0.20 290)", background: "#f5f3ff", font: "PP Mori", radius: "12px" },
  { name: "vex", category: "colorful", primary: "oklch(0.65 0.25 340)", background: "#fef08a", font: "PP Gosha Sans", radius: "8px" },
  { name: "cipher", category: "dark", primary: "oklch(0.60 0.18 145)", background: "#000000", font: "PP Fraktion Mono", radius: "0px" },
];

export function PresetTable() {
  return (
    <table className="s-data-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Primary</th>
          <th>Background</th>
          <th>Font</th>
          <th>Radius</th>
        </tr>
      </thead>
      <tbody>
        {PRESET_DATA.map((row) => (
          <tr key={row.name}>
            <td style={{ fontWeight: 600, color: "var(--s-text)" }}>{row.name}</td>
            <td>{row.category}</td>
            <td>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    width: 10,
                    height: 10,
                    background: row.primary,
                    border: "1px solid var(--s-border)",
                    borderRadius: 0,
                    flexShrink: 0,
                  }}
                />
                {row.primary}
              </span>
            </td>
            <td>{row.background}</td>
            <td>{row.font}</td>
            <td>{row.radius}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
