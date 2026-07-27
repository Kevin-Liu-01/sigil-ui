import { readFile } from "node:fs/promises";
import path from "node:path";

type SocialCardFont = {
  data: ArrayBuffer;
  name: string;
  style: "normal";
  weight: 400 | 700;
};

const fontFiles = [
  { file: "PPNeueMontreal-Regular.otf", name: "PP Neue Montreal", weight: 400 },
  { file: "PPNeueMontreal-Medium.otf", name: "PP Neue Montreal", weight: 700 },
  { file: "PPFraktionMono-Regular.otf", name: "PP Fraktion Mono", weight: 400 },
] as const;

async function readPublicFont(file: string): Promise<ArrayBuffer> {
  const buffer = await readFile(path.join(process.cwd(), "public", "fonts", file));
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
}

const fontsPromise: Promise<SocialCardFont[]> = Promise.all(
  fontFiles.map(async ({ file, name, weight }) => ({
    data: await readPublicFont(file),
    name,
    style: "normal" as const,
    weight,
  })),
);

export function getSocialCardFonts(): Promise<SocialCardFont[]> {
  return fontsPromise;
}
