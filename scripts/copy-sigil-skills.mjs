import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const packageRootArg = process.argv[2] ?? ".";
const packageRoot = path.resolve(process.cwd(), packageRootArg);
const repoRoot = path.resolve(packageRoot, "..", "..");
const source = path.join(repoRoot, "skills");
const destination = path.join(packageRoot, "dist", "assets", "skills");

if (!existsSync(path.join(source, "sigil-tokens", "SKILL.md"))) {
  throw new Error(`Could not find Sigil skills source at ${source}`);
}

await fs.rm(destination, { recursive: true, force: true });
await fs.cp(source, destination, { recursive: true });
console.log(`Copied Sigil skills to ${path.relative(packageRoot, destination)}`);
