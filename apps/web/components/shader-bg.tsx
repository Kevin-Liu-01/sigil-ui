"use client";

import dynamic from "next/dynamic";

const ShaderComponent = dynamic(
  () =>
    import("shaders/react").then((mod) => {
      const {
        Shader,
        Aurora,
        LinearGradient,
        FloatingParticles,
        Fog,
        FlowField,
        Glitch,
        DotGrid,
        Grid,
        Plasma,
        Halftone,
        FallingLines,
        Godrays,
        ChromaFlow,
        HexGrid,
        FlowingGradient,
        FilmGrain,
        Dither,
        Noise,
        Neon,
        ContourLines,
      } = mod;

      function ShaderBg({ preset = "sigil" }: { preset?: string }) {
        const configs: Record<string, JSX.Element> = {
          sigil: (
            <>
              <DotGrid colorA="#9b99e8" colorB="#4f46e5" dotSize={2} spacing={24} />
              <Fog color="#9b99e8" density={15} speed={1} />
            </>
          ),
          crux: <></>,
          alloy: (
            <>
              <Grid color="#b87333" lineWidth={0.5} spacing={48} />
              <FilmGrain intensity={8} />
            </>
          ),
          basalt: <FallingLines color="#14b8a6" count={40} speed={3} length={80} />,
          forge: <Plasma colorA="#ea580c" colorB="#dc2626" colorC="#f97316" speed={2} complexity={4} />,
          onyx: <Godrays colorA="#a855f7" colorB="#ec4899" angle={-30} intensity={20} />,
          flux: <FlowField colorA="#06b6d4" colorB="#a855f7" speed={3} density={8} />,
          kova: <FloatingParticles color="#38bdf8" count={60} speed={0.5} particleSize={2} />,
          etch: <Halftone color="#15803d" dotSize={3} contrast={40} />,
          anvil: <Grid color="#1e40af" lineWidth={1} spacing={32} />,
          rivet: <DotGrid colorA="#c2410c" colorB="#71717a" dotSize={3} spacing={20} />,
          shard: <Glitch colorA="#7c3aed" colorB="#ec4899" intensity={15} speed={4} />,
          rune: <Fog color="#b45309" density={20} speed={0.5} />,
          fang: <FallingLines color="#84cc16" count={80} speed={8} length={40} />,
          cobalt: (
            <Aurora
              colorA="#2563eb"
              colorB="#06b6d4"
              colorC="#3b82f6"
              intensity={25}
              speed={2}
              height={70}
            />
          ),
          strata: <LinearGradient colorA="#92400e" colorB="#f5f2ed" angle={180} />,
          brass: <FilmGrain intensity={12} />,
          obsid: (
            <>
              <Fog color="#be123c" density={10} speed={1} />
              <Neon color="#be123c" intensity={15} />
            </>
          ),
          axiom: <Grid color="#2563eb" lineWidth={0.3} spacing={40} />,
          glyph: <></>,
          cipher: <FallingLines color="#22c55e" count={100} speed={6} length={60} />,
          prism: <ChromaFlow colorA="#8b5cf6" colorB="#ec4899" colorC="#06b6d4" speed={2} />,
          helix: <FloatingParticles color="#059669" count={40} speed={1} particleSize={3} />,
          hex: <HexGrid color="#d946ef" lineWidth={0.5} spacing={30} />,
          vex: <Glitch colorA="#ec4899" colorB="#000000" intensity={25} speed={6} />,
          arc: <FlowingGradient colorA="#7c3aed" colorB="#f43f5e" colorC="#a78bfa" speed={1} />,
          dsgn: <Grid color="#2563eb" lineWidth={0.5} spacing={24} />,
          mrkr: <></>,
          noir: (
            <>
              <Fog color="#d97706" density={8} speed={0.5} />
              <Godrays colorA="#d97706" colorB="#000000" angle={-45} intensity={10} />
            </>
          ),
          dusk: (
            <Aurora
              colorA="#a78bfa"
              colorB="#f472b6"
              colorC="#7c3aed"
              intensity={20}
              speed={1.5}
              height={60}
            />
          ),
          mono: <Halftone color="#525252" dotSize={2} contrast={30} />,
        };

        const shaderContent = configs[preset];
        if (
          !shaderContent ||
          ((shaderContent as any).props?.children === undefined &&
            (shaderContent as any).type === Symbol.for("react.fragment"))
        ) {
          return null;
        }

        return (
          <Shader className="fixed inset-0 -z-10 pointer-events-none opacity-30">
            {shaderContent}
          </Shader>
        );
      }

      return ShaderBg;
    }),
  { ssr: false }
);

export function ShaderBackground({ preset = "sigil" }: { preset?: string }) {
  return <ShaderComponent preset={preset} />;
}
