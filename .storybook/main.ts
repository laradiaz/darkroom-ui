import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-themes"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      css: {
        modules: {
          localsConvention: "camelCaseOnly",
          generateScopedName: "_[name]_[local]_[hash:base64:5]",
        },
      },
    });
  },
};

export default config;
