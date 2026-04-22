import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/index.ts"],
    format: ["esm"],
    target: "node18",
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    banner: {
      js: "#!/usr/bin/env node",
    },
  },
  {
    entry: ["src/utils/config.ts"],
    format: ["esm"],
    target: "node18",
    dts: true,
    splitting: false,
    sourcemap: true,
    outDir: "dist/utils",
  },
]);
