import type { Preview } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import { Title, Description, Controls, Stories } from "@storybook/blocks";
import type { ReactNode } from "react";
import "../src/theme/index.css";
import "../src/fonts.css";

const preview: Preview = {
  parameters: {
    layout: "padded",
    backgrounds: { disable: true },
    options: {
      storySort: {
        method: "alphabetical",
        order: ["Examples", "Form", "Button", "Content", "Layout"],
      },
    },
    docs: {
      // Skip the giant primary canvas — stories below already cover it.
      page: () => (
        <>
          <Title />
          <Description />
          <Controls />
          <Stories includePrimary />
        </>
      ),
    },
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
    (Story, context) => {
      const Wrapper = ({ children }: { children: ReactNode }) => (
        <div
          style={{
            // Canvas: fill the panel. Docs: hug content (100vh made autodocs huge).
            minHeight: context.viewMode === "docs" ? undefined : "100%",
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
