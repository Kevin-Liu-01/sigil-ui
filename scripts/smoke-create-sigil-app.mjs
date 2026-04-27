import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "sigil-create-app-"));
const appDir = path.join(tmp, "golden-path");
const createBin = path.join(root, "packages/create-sigil-app/dist/index.js");
const cliBin = path.join(root, "packages/cli/dist/index.js");

for (const file of [createBin, cliBin]) {
  if (!fs.existsSync(file)) {
    throw new Error(`${path.relative(root, file)} does not exist. Run pnpm build first.`);
  }
}

const env = {
  ...process.env,
  npm_config_user_agent: process.env.npm_config_user_agent ?? "pnpm/9.15.0",
};

try {
  execFileSync(
    process.execPath,
    [createBin, appDir, "--yes", "--no-install", "--no-git"],
    { cwd: root, env, stdio: "inherit" },
  );

  execFileSync(process.execPath, [cliBin, "doctor"], {
    cwd: appDir,
    env,
    stdio: "inherit",
  });

  console.log(`Sigil create-app smoke passed in ${appDir}`);
} finally {
  fs.rmSync(tmp, { force: true, recursive: true });
}
