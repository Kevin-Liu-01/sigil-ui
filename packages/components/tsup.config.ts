import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: false,
  splitting: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  outDir: "dist",
  external: ["react", "react-dom", "@sigil-ui/tokens"],
  esbuildOptions(options) {
    options.banner = { js: '"use client";' };
  },
});
