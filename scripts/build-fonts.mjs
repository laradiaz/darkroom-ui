import { cpSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const libDir = join(root, "lib");
const fontsOutDir = join(libDir, "fonts");

/** Latin-only subsets matching src/fonts.css */
const fontFiles = [
  {
    pkg: "@fontsource/cormorant-garamond",
    file: "cormorant-garamond-latin-400-normal.woff2",
    family: "Cormorant Garamond",
    weight: 400,
  },
  {
    pkg: "@fontsource/cormorant-garamond",
    file: "cormorant-garamond-latin-600-normal.woff2",
    family: "Cormorant Garamond",
    weight: 600,
  },
  {
    pkg: "@fontsource/dm-sans",
    file: "dm-sans-latin-400-normal.woff2",
    family: "DM Sans",
    weight: 400,
  },
  {
    pkg: "@fontsource/dm-sans",
    file: "dm-sans-latin-500-normal.woff2",
    family: "DM Sans",
    weight: 500,
  },
  {
    pkg: "@fontsource/dm-sans",
    file: "dm-sans-latin-700-normal.woff2",
    family: "DM Sans",
    weight: 700,
  },
];

mkdirSync(fontsOutDir, { recursive: true });

const rules = fontFiles.map(({ pkg, file, family, weight }) => {
  const src = join(root, "node_modules", pkg, "files", file);
  cpSync(src, join(fontsOutDir, file));

  return `@font-face {
  font-family: '${family}';
  font-style: normal;
  font-display: swap;
  font-weight: ${weight};
  src: url('./fonts/${file}') format('woff2');
}`;
});

writeFileSync(join(libDir, "fonts.css"), `${rules.join("\n\n")}\n`);

let totalBytes = 0;
for (const { file } of fontFiles) {
  totalBytes += readFileSync(join(fontsOutDir, file)).length;
}

console.log(
  `build-fonts: wrote lib/fonts.css + ${fontFiles.length} woff2 files (${Math.round(totalBytes / 1024)} KB)`,
);
