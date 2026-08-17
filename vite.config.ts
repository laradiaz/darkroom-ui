/// <reference types="vitest/config" />
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
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
  grid: resolve(__dirname, "src/entries/grid.ts"),
  divider: resolve(__dirname, "src/entries/divider.ts"),
  media: resolve(__dirname, "src/entries/media.ts"),
  card: resolve(__dirname, "src/entries/card.ts"),
  hero: resolve(__dirname, "src/entries/hero.ts"),
  navigation: resolve(__dirname, "src/entries/navigation.ts"),
  footer: resolve(__dirname, "src/entries/footer.ts"),
};

function libFileName(format: "es" | "cjs", entryName: string): string {
  const ext = format === "es" ? "mjs" : "cjs";
  return `${entryName}.${ext}`;
}

/** Drop Tailwind's license URL so Socket doesn't flag style.css as network-capable. */
function scrubPublishedCssUrls(): Plugin {
  const styleCss = resolve(__dirname, "lib/style.css");
  return {
    name: "scrub-published-css-urls",
    closeBundle() {
      if (!existsSync(styleCss)) return;
      const css = readFileSync(styleCss, "utf8");
      const next = css.replace(/https?:\/\/tailwindcss\.com/g, "");
      if (next !== css) writeFileSync(styleCss, next);
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    ...(isStorybook
      ? []
      : [
          dts({
            include: ["src/**/*.ts", "src/**/*.tsx"],
            exclude: [
              "src/**/*.stories.tsx",
              "src/**/*.{test,spec}.{ts,tsx}",
              "src/stories/**",
              "src/test/**",
            ],
            outDir: "lib",
            entryRoot: "src",
            rollupTypes: true,
          }),
          scrubPublishedCssUrls(),
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
        // npm libs should ship readable code — Socket flags minify as a quality alert
        minify: false,
      },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
      generateScopedName: "_[name]_[local]_[hash:base64:5]",
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: true,
  },
});
