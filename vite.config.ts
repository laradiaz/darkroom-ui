import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const isStorybook = Boolean(process.env.STORYBOOK);

const libEntries = {
  "darkroom-ui": resolve(__dirname, "src/index.ts"),
  style: resolve(__dirname, "src/entries/style.ts"),
  core: resolve(__dirname, "src/core.ts"),
  button: resolve(__dirname, "src/entries/button.ts"),
  select: resolve(__dirname, "src/entries/select.ts"),
  "file-dropzone": resolve(__dirname, "src/entries/file-dropzone.ts"),
  badge: resolve(__dirname, "src/entries/badge.ts"),
  typography: resolve(__dirname, "src/entries/typography.ts"),
  layout: resolve(__dirname, "src/entries/layout.ts"),
  card: resolve(__dirname, "src/entries/card.ts"),
  hero: resolve(__dirname, "src/entries/hero.ts"),
  navigation: resolve(__dirname, "src/entries/navigation.ts"),
  footer: resolve(__dirname, "src/entries/footer.ts"),
};

function libFileName(format: "es" | "cjs", entryName: string): string {
  const ext = format === "es" ? "mjs" : "cjs";
  return `${entryName}.${ext}`;
}

export default defineConfig({
  plugins: [
    react(),
    ...(isStorybook
      ? []
      : [
          dts({
            include: ["src/**/*.ts", "src/**/*.tsx"],
            exclude: ["src/**/*.stories.tsx", "src/stories/**"],
            outDir: "lib",
            entryRoot: "src",
            rollupTypes: true,
          }),
        ]),
  ],
  build: isStorybook
    ? undefined
    : {
        lib: {
          entry: libEntries,
          formats: ["es", "cjs"],
          fileName: libFileName,
        },
        outDir: "lib",
        cssCodeSplit: false,
        assetsInlineLimit: 0,
        rollupOptions: {
          external: ["react", "react-dom", "react/jsx-runtime"],
          output: {
            assetFileNames: "style.css",
            exports: "named",
          },
        },
        sourcemap: true,
        minify: "esbuild",
      },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
      generateScopedName: "_[name]_[local]_[hash:base64:5]",
    },
  },
});
