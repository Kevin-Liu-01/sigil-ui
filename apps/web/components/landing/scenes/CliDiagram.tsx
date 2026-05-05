/**
 * Skeleton diagrams for the CLI Voronoi section.
 *
 * Each `variant` is a tiny pure-visual abstraction of one CLI command —
 * scaffold (create-sigil-app), init, add, preset, inspire, docs,
 * adapter, diff, doctor. They're rendered inside organic Voronoi
 * cells in `CLIVoronoiSection`.
 *
 * `accent` flips the palette to white/translucent for the one cell
 * that uses a primary-tinted background.
 */
export function CliDiagram({
  variant,
  accent,
}: {
  variant: string;
  accent?: boolean;
}) {
  const bd = accent ? "rgba(255,255,255,0.25)" : "var(--s-border)";
  const fill = accent ? "rgba(255,255,255,0.1)" : "var(--s-background)";
  const hi = accent ? "rgba(255,255,255,0.8)" : "var(--s-primary)";
  const dim = accent ? "rgba(255,255,255,0.18)" : "var(--s-border-muted)";

  if (variant === "scaffold") {
    return (
      <div className="relative w-[76px] h-[56px]">
        <div className="absolute bottom-0 left-0 w-[50px] h-[38px] border" style={{ borderColor: dim, background: fill }} />
        <div className="absolute bottom-[7px] left-[11px] w-[50px] h-[38px] border" style={{ borderColor: bd, background: fill }}>
          <div className="mt-3 mx-2 h-[3px] w-[18px]" style={{ background: hi }} />
          <div className="mt-1 mx-2 h-[2px] w-[26px]" style={{ background: dim }} />
        </div>
        <div className="absolute top-0 right-0 w-[50px] h-[38px] border" style={{ borderColor: bd, background: fill }}>
          <div className="mt-3 mx-2 h-[3px] w-[22px]" style={{ background: hi }} />
          <div className="mt-1 mx-2 h-[2px] w-[30px]" style={{ background: dim }} />
          <div className="mt-1 mx-2 h-[2px] w-[16px]" style={{ background: dim }} />
        </div>
      </div>
    );
  }
  if (variant === "init") {
    return (
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 border-2 rounded flex items-center justify-center" style={{ borderColor: bd }}>
          <div className="w-3.5 h-3.5 rounded-full border-2" style={{ borderColor: hi }} />
        </div>
        <div style={{ color: hi, fontSize: 14 }}>→</div>
        <div className="w-9 h-9 border rounded flex items-center justify-center" style={{ borderColor: hi, background: fill }}>
          <span style={{ color: hi, fontSize: 14, fontWeight: 700 }}>✓</span>
        </div>
      </div>
    );
  }
  if (variant === "add") {
    return (
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-7 h-10 border flex flex-col justify-end p-1 gap-0.5" style={{ borderColor: i === 1 ? hi : bd, background: fill }}>
            <div className="h-[3px] w-full" style={{ background: i === 1 ? hi : dim }} />
            <div className="h-[2px] w-3/4" style={{ background: dim }} />
          </div>
        ))}
      </div>
    );
  }
  if (variant === "preset") {
    return (
      <div className="flex gap-2.5 items-center">
        {["#9b99e8", "#d97706", "#22c55e", "#ec4899"].map((c, i) => (
          <div key={i} className="w-4 h-4 rounded-full" style={{ background: c, opacity: i === 0 ? 1 : 0.55, boxShadow: i === 0 ? `0 0 8px ${c}` : "none" }} />
        ))}
      </div>
    );
  }
  if (variant === "inspire") {
    return (
      <div className="flex items-center gap-2">
        <div className="border px-2 py-1.5" style={{ borderColor: bd, background: fill }}>
          <div className="h-[3px] w-14" style={{ background: dim }} />
        </div>
        <span style={{ color: hi, fontSize: 13, fontWeight: 600 }}>→</span>
        <div className="flex gap-1">
          {["#9b99e8", "#da8325", "#10b981"].map((c) => (
            <div key={c} className="w-3.5 h-3.5" style={{ background: c }} />
          ))}
        </div>
      </div>
    );
  }
  if (variant === "docs") {
    return (
      <div className="w-16 border p-2.5 flex flex-col gap-[5px]" style={{ borderColor: bd, background: fill }}>
        <div className="h-[3px] w-full" style={{ background: hi }} />
        <div className="h-[2px] w-full" style={{ background: dim }} />
        <div className="h-[2px] w-4/5" style={{ background: dim }} />
        <div className="h-[2px] w-3/5" style={{ background: dim }} />
      </div>
    );
  }
  if (variant === "adapter") {
    return (
      <div className="flex items-center gap-1.5">
        <div className="w-7 h-9 border flex flex-col justify-center gap-1 p-1" style={{ borderColor: bd, background: fill }}>
          <div className="h-[2px] w-full" style={{ background: dim }} />
          <div className="h-[2px] w-full" style={{ background: dim }} />
        </div>
        <div className="w-7 flex flex-col items-center gap-0.5">
          <div className="w-full h-[2px]" style={{ background: hi }} />
          <div className="w-full h-[2px]" style={{ background: hi, opacity: 0.4 }} />
        </div>
        <div className="w-7 h-9 border flex flex-col justify-center gap-1 p-1" style={{ borderColor: hi, background: fill }}>
          <div className="h-[2px] w-full" style={{ background: hi, opacity: 0.5 }} />
          <div className="h-[2px] w-full" style={{ background: hi, opacity: 0.5 }} />
        </div>
      </div>
    );
  }
  if (variant === "diff") {
    return (
      <div className="flex gap-1.5">
        <div className="w-9 border flex flex-col gap-[5px] p-2" style={{ borderColor: bd, background: fill }}>
          <div className="h-[2px] w-full" style={{ background: dim }} />
          <div className="h-[2px] w-full" style={{ background: "var(--s-error, oklch(0.65 0.2 25))", opacity: 0.7 }} />
          <div className="h-[2px] w-full" style={{ background: dim }} />
        </div>
        <div className="w-9 border flex flex-col gap-[5px] p-2" style={{ borderColor: hi, background: fill }}>
          <div className="h-[2px] w-full" style={{ background: dim }} />
          <div className="h-[2px] w-full" style={{ background: hi }} />
          <div className="h-[2px] w-full" style={{ background: dim }} />
        </div>
      </div>
    );
  }
  if (variant === "doctor") {
    return (
      <div className="flex flex-col gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 border flex items-center justify-center" style={{ borderColor: hi }}>
              <span style={{ color: hi, fontSize: 8, fontWeight: 700 }}>✓</span>
            </div>
            <div className="h-[2px]" style={{ width: `${24 + i * 8}px`, background: dim }} />
          </div>
        ))}
      </div>
    );
  }
  return null;
}

/**
 * Compute the pixel bounds of a Voronoi cell from its `points`
 * polygon string. Used to position the diagram + label inside each
 * cell at render time.
 */
export function voronoiBounds(points: string) {
  const coords = points.split(" ").map((pair) => pair.split(",").map(Number));
  const xs = coords.map(([x]) => x);
  const ys = coords.map(([, y]) => y);
  return {
    minX: Math.min(...xs),
    maxX: Math.max(...xs),
    minY: Math.min(...ys),
    maxY: Math.max(...ys),
    width: Math.max(...xs) - Math.min(...xs),
    height: Math.max(...ys) - Math.min(...ys),
  };
}
