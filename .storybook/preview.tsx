import type { Preview } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import type { ReactNode } from "react";
import "../src/theme/index.css";
import "../src/fonts.css";

const preview: Preview = {
  parameters: {
    layout: "padded",
    backgrounds: { disable: true },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
      parentSelector: "html",
    }),
    (Story) => {
      const Wrapper = ({ children }: { children: ReactNode }) => (
        <div
          style={{
            minHeight: "100vh",
            background: "var(--background)",
            color: "var(--foreground)",
          }}
        >
          {children}
        </div>
      );
      return (
        <Wrapper>
          <Story />
        </Wrapper>
      );
    },
  ],
};

export default preview;
