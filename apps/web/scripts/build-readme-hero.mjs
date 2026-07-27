import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, "../../..");
const fontDirectory = path.join(repositoryRoot, "apps/web/public/fonts");

async function encodedFont(file) {
  return (await readFile(path.join(fontDirectory, file))).toString("base64");
}

const [displayRegular, displayBold, monoRegular] = await Promise.all([
  encodedFont("PPNeueMontreal-Regular.otf"),
  encodedFont("PPNeueMontreal-Bold.otf"),
  encodedFont("PPFraktionMono-Regular.otf"),
]);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="720" viewBox="0 0 1600 720" role="img" aria-labelledby="title description">
  <title id="title">Sigil UI — one markdown file controls your entire design system</title>
  <desc id="description">The Sigil UI mark, product statement, and compile pipeline from DESIGN.md to token-driven components.</desc>
  <defs>
    <style>
      @font-face { font-family: "PP Neue Montreal"; src: url("data:font/otf;base64,${displayRegular}") format("opentype"); font-weight: 400; }
      @font-face { font-family: "PP Neue Montreal"; src: url("data:font/otf;base64,${displayBold}") format("opentype"); font-weight: 700; }
      @font-face { font-family: "PP Fraktion Mono"; src: url("data:font/otf;base64,${monoRegular}") format("opentype"); font-weight: 400; }
      .display { font-family: "PP Neue Montreal", sans-serif; }
      .mono { font-family: "PP Fraktion Mono", monospace; }
    </style>
  </defs>

  <rect width="1600" height="720" fill="#f9fafb" />
  <path d="M990 0V720" stroke="#c3c4c8" />

  <g transform="translate(66 54) scale(.4)">
    <path d="M0 0H56V32L40 40V56H0V0Z" fill="#0a0b0f" />
    <path d="M120 0V56H88L80 40H64V0H120Z" fill="#0a0b0f" />
    <path d="M0 120V64H32L40 80H56V120H0Z" fill="#0a0b0f" />
    <path d="M120 120H64V88L80 80V64H120V120Z" fill="#7281fb" />
  </g>
  <text class="display" x="130" y="88" fill="#0a0b0f" font-size="28" font-weight="700" letter-spacing="-.7">SIGIL UI</text>

  <rect x="70" y="157" width="9" height="9" fill="#7281fb" />
  <text class="mono" x="98" y="167" fill="#707176" font-size="14" letter-spacing="2.4">TOKEN-DRIVEN DESIGN SYSTEM</text>

  <text class="display" x="68" y="286" fill="#0a0b0f" font-size="88" font-weight="700" letter-spacing="-4.4">One markdown file</text>
  <text class="display" x="68" y="370" fill="#0a0b0f" font-size="88" font-weight="700" letter-spacing="-4.4">controls your entire</text>
  <text class="display" x="68" y="454" fill="#0a0b0f" font-size="88" font-weight="700" letter-spacing="-4.4">design system.</text>

  <text class="display" x="72" y="527" fill="#707176" font-size="25">Edit DESIGN.md. CSS, Tailwind v4, and W3C JSON recompile automatically.</text>
  <path d="M70 634H920" stroke="#c3c4c8" />
  <text class="mono" x="70" y="668" fill="#707176" font-size="13" letter-spacing="1.7">EDIT TOKENS, NOT COMPONENTS</text>

  <text class="mono" x="1060" y="87" fill="#707176" font-size="13" letter-spacing="2.2">COMPILE PIPELINE</text>

  <rect x="1060" y="122" width="460" height="86" fill="#7281fb" />
  <text class="display" x="1084" y="175" fill="#0a0b0f" font-size="25" font-weight="700">DESIGN.md</text>
  <text class="mono" x="1496" y="171" fill="#0a0b0f" font-size="11" letter-spacing="1.5" text-anchor="end">SOURCE</text>
  <path d="M1290 208V246" stroke="#707176" />
  <rect x="1287" y="240" width="7" height="7" fill="#7281fb" />

  <rect x="1060" y="246" width="460" height="86" fill="#f4f5f7" stroke="#707176" />
  <text class="display" x="1084" y="299" fill="#0a0b0f" font-size="25" font-weight="700">519 tokens</text>
  <text class="mono" x="1496" y="295" fill="#707176" font-size="11" letter-spacing="1.5" text-anchor="end">33 CATEGORIES</text>
  <path d="M1290 332V370" stroke="#707176" />
  <rect x="1287" y="364" width="7" height="7" fill="#7281fb" />

  <rect x="1060" y="370" width="460" height="86" fill="#f4f5f7" stroke="#707176" />
  <text class="display" x="1084" y="423" fill="#0a0b0f" font-size="25" font-weight="700">CSS · Tailwind · W3C</text>
  <text class="mono" x="1496" y="419" fill="#707176" font-size="11" letter-spacing="1.5" text-anchor="end">OUTPUTS</text>
  <path d="M1290 456V494" stroke="#707176" />
  <rect x="1287" y="488" width="7" height="7" fill="#7281fb" />

  <rect x="1060" y="494" width="460" height="86" fill="#010104" />
  <text class="display" x="1084" y="547" fill="#e6e8eb" font-size="25" font-weight="700">350+ components</text>
  <text class="mono" x="1496" y="543" fill="#8d8f92" font-size="11" letter-spacing="1.5" text-anchor="end">CONSUMERS</text>
</svg>
`;

await writeFile(path.join(repositoryRoot, ".github/readme-hero.svg"), svg);
