import type { Meta, StoryObj } from "@storybook/react";
import { NavMenuButton } from "./NavMenuButton";

const meta: Meta<typeof NavMenuButton> = {
  title: "Components/NavMenuButton",
  component: NavMenuButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NavMenuButton>;

export const Default: Story = {
  args: { "aria-expanded": false },
};

export const Expanded: Story = {
  args: { "aria-expanded": true },
};
