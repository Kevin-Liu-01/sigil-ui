"use client";

/**
 * Frosted grainy background textures — one per preset.
 *
 * Each texture is a CSS-only background (gradients + noise SVG filter)
 * that gives cards and sections a material feel. The aesthetic:
 * plain color + subtle grain/frost overlay = physical, not flat.
 */

export type TextureName =
  | "sigil" | "crux" | "alloy" | "basalt" | "forge" | "onyx"
  | "flux" | "kova" | "etch" | "anvil" | "rivet" | "shard"
  | "rune" | "fang" | "cobalt" | "strata" | "brass" | "obsid"
  | "axiom" | "glyph" | "cipher" | "prism" | "helix" | "hex"
  | "vex" | "arc" | "dsgn" | "mrkr" | "noir" | "dusk" | "mono";

type TextureDef = {
  bg: string;
  overlay?: string;
  grain: "light" | "dark" | "none";
  image?: string;
};

const NOISE_SVG_LIGHT = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`;

const NOISE_SVG_DARK = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`;

export const TEXTURES: Record<TextureName, TextureDef> = {
  sigil: {
    bg: "linear-gradient(135deg, #0c0c14 0%, #12121f 50%, #0a0a12 100%)",
    grain: "dark",
  },
  crux: {
    bg: "#ffffff",
    grain: "light",
  },
  alloy: {
    bg: "linear-gradient(160deg, #1a1815 0%, #211e19 50%, #18160f 100%)",
    overlay: "radial-gradient(ellipse at 30% 20%, rgba(184,115,51,0.06) 0%, transparent 60%)",
    grain: "dark",
  },
  basalt: {
    bg: "linear-gradient(170deg, #0a1020 0%, #0f1a2a 50%, #080e1a 100%)",
    overlay: "radial-gradient(ellipse at 70% 80%, rgba(20,184,166,0.04) 0%, transparent 50%)",
    grain: "dark",
    image: "/textures/nyx-waves.png",
  },
  forge: {
    bg: "linear-gradient(145deg, #1a1410 0%, #1f1810 50%, #15100a 100%)",
    overlay: "radial-gradient(ellipse at 50% 30%, rgba(234,88,12,0.08) 0%, transparent 60%)",
    grain: "dark",
  },
  onyx: {
    bg: "linear-gradient(160deg, #050505 0%, #0a0a0a 50%, #020202 100%)",
    overlay: "radial-gradient(ellipse at 40% 40%, rgba(168,85,247,0.04) 0%, transparent 50%)",
    grain: "dark",
    image: "/textures/nyx-waves.png",
  },
  flux: {
    bg: "linear-gradient(135deg, #0a0c14 0%, #0f1220 50%, #080a12 100%)",
    overlay: "radial-gradient(ellipse at 60% 30%, rgba(6,182,212,0.06) 0%, transparent 50%)",
    grain: "dark",
  },
  kova: {
    bg: "linear-gradient(180deg, #f6f8fc 0%, #eef2f8 50%, #f4f6fa 100%)",
    overlay: "radial-gradient(ellipse at 50% 0%, rgba(56,189,248,0.04) 0%, transparent 50%)",
    grain: "light",
    image: "/textures/cloud-lines.png",
  },
  etch: {
    bg: "linear-gradient(170deg, #f7f5f0 0%, #f2efe8 50%, #f5f2ec 100%)",
    overlay: "radial-gradient(ellipse at 30% 70%, rgba(21,128,61,0.03) 0%, transparent 50%)",
    grain: "light",
    image: "/textures/cloud-lines.png",
  },
  anvil: {
    bg: "linear-gradient(155deg, #e0e3e8 0%, #d5d8de 50%, #dcdfe5 100%)",
    grain: "light",
  },
  rivet: {
    bg: "linear-gradient(160deg, #f5f4f0 0%, #eeede8 50%, #f2f0ec 100%)",
    grain: "light",
  },
  shard: {
    bg: "linear-gradient(135deg, #0a090e 0%, #100e18 50%, #08070c 100%)",
    overlay: "radial-gradient(ellipse at 70% 20%, rgba(124,58,237,0.06) 0%, transparent 50%)",
    grain: "dark",
  },
  rune: {
    bg: "linear-gradient(170deg, #f0ebe0 0%, #e8e2d5 50%, #ede7dc 100%)",
    overlay: "radial-gradient(ellipse at 40% 60%, rgba(180,83,9,0.04) 0%, transparent 50%)",
    grain: "light",
  },
  fang: {
    bg: "#000000",
    overlay: "radial-gradient(ellipse at 50% 50%, rgba(132,204,22,0.03) 0%, transparent 40%)",
    grain: "dark",
  },
  cobalt: {
    bg: "linear-gradient(160deg, #020510 0%, #040818 50%, #01030a 100%)",
    overlay: "radial-gradient(ellipse at 50% 30%, rgba(37,99,235,0.06) 0%, transparent 50%)",
    grain: "dark",
    image: "/textures/nyx-lines.png",
  },
  strata: {
    bg: "linear-gradient(180deg, #f0ece5 0%, #e8e3da 33%, #f2eee6 66%, #ebe6dd 100%)",
    grain: "light",
  },
  brass: {
    bg: "linear-gradient(170deg, #faf8f0 0%, #f5f0e5 50%, #f8f5ed 100%)",
    overlay: "radial-gradient(ellipse at 60% 40%, rgba(161,98,7,0.04) 0%, transparent 50%)",
    grain: "light",
  },
  obsid: {
    bg: "linear-gradient(155deg, #030303 0%, #080808 50%, #020202 100%)",
    overlay: "radial-gradient(ellipse at 30% 50%, rgba(190,18,60,0.04) 0%, transparent 40%)",
    grain: "dark",
    image: "/textures/nyx-waves.png",
  },
  axiom: {
    bg: "#ffffff",
    grain: "none",
  },
  glyph: {
    bg: "#fafafa",
    grain: "light",
  },
  cipher: {
    bg: "#000000",
    overlay: "radial-gradient(ellipse at 50% 50%, rgba(34,197,94,0.03) 0%, transparent 40%)",
    grain: "dark",
    image: "/textures/nyx-lines.png",
  },
  prism: {
    bg: "linear-gradient(135deg, #f8f5ff 0%, #f0e8ff 50%, #f5f0ff 100%)",
    overlay: "radial-gradient(ellipse at 30% 30%, rgba(139,92,246,0.04) 0%, transparent 40%), radial-gradient(ellipse at 70% 70%, rgba(236,72,153,0.03) 0%, transparent 40%)",
    grain: "light",
  },
  helix: {
    bg: "linear-gradient(170deg, #f8fcf8 0%, #f0f8f0 50%, #f5faf5 100%)",
    overlay: "radial-gradient(ellipse at 50% 30%, rgba(5,150,105,0.04) 0%, transparent 50%)",
    grain: "light",
  },
  hex: {
    bg: "linear-gradient(135deg, #0a0518 0%, #120828 50%, #080414 100%)",
    overlay: "radial-gradient(ellipse at 50% 40%, rgba(217,70,239,0.06) 0%, transparent 50%)",
    grain: "dark",
  },
  vex: {
    bg: "#fef08a",
    grain: "light",
  },
  arc: {
    bg: "linear-gradient(160deg, #f2f0ff 0%, #ebe5ff 50%, #f0ecff 100%)",
    overlay: "radial-gradient(ellipse at 40% 40%, rgba(124,58,237,0.04) 0%, transparent 50%)",
    grain: "light",
  },
  dsgn: {
    bg: "#ffffff",
    grain: "light",
  },
  mrkr: {
    bg: "linear-gradient(180deg, #fefce8 0%, #fef9c3 50%, #fefce8 100%)",
    grain: "light",
  },
  noir: {
    bg: "linear-gradient(160deg, #000000 0%, #050505 50%, #000000 100%)",
    overlay: "radial-gradient(ellipse at 40% 30%, rgba(217,119,6,0.03) 0%, transparent 40%)",
    grain: "dark",
    image: "/textures/nyx-waves.png",
  },
  dusk: {
    bg: "linear-gradient(160deg, #161020 0%, #1e1530 50%, #140e1c 100%)",
    overlay: "radial-gradient(ellipse at 50% 30%, rgba(167,139,250,0.05) 0%, transparent 50%)",
    grain: "dark",
  },
  mono: {
    bg: "#ffffff",
    grain: "light",
  },
};

export function getTextureStyle(name: TextureName): React.CSSProperties {
  const tex = TEXTURES[name];
  if (!tex) return {};

  const backgrounds: string[] = [];

  if (tex.grain === "dark") backgrounds.push(NOISE_SVG_DARK);
  else if (tex.grain === "light") backgrounds.push(NOISE_SVG_LIGHT);

  if (tex.overlay) backgrounds.push(tex.overlay);
  backgrounds.push(tex.bg);

  const style: React.CSSProperties = {
    background: backgrounds.join(", "),
  };

  if (tex.image) {
    style.backgroundImage = `${backgrounds.slice(0, -1).join(", ")}, url(${tex.image})`;
    style.backgroundSize = "cover";
    style.backgroundBlendMode = "overlay";
  }

  return style;
}

type TextureBoxProps = {
  preset?: TextureName;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  as?: keyof JSX.IntrinsicElements;
};

export function TextureBox({
  preset = "sigil",
  className,
  children,
  style,
  as: Tag = "div",
}: TextureBoxProps) {
  const texStyle = getTextureStyle(preset);

  return (
    // @ts-expect-error dynamic tag
    <Tag
      className={className}
      style={{ ...texStyle, ...style }}
    >
      {children}
    </Tag>
  );
}
