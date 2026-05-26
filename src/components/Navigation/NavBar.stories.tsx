import type { Meta, StoryObj } from "@storybook/react";
import { formatStoryName } from "../../stories/formatStoryName";
import { Button } from "../Button";
import { NavBar } from "./NavBar";

const meta: Meta<typeof NavBar> = {
  title: "Components/NavBar",
  component: NavBar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof NavBar>;

const navLabel = formatStoryName("Default");

const defaultItems = [
  { label: navLabel, href: "#" },
  { label: navLabel, href: "#" },
  { label: navLabel, href: "#" },
];

export const Default: Story = {
  args: {
    logo: <span className="font-display text-xl">{formatStoryName("Default")}</span>,
    items: defaultItems,
    cta: <Button variant="primary" size="sm">{formatStoryName("Default")}</Button>,
  },
};

export const WithoutCta: Story = {
  args: {
    logo: <span className="font-display text-xl">{formatStoryName("WithoutCta")}</span>,
    items: defaultItems.map((item) => ({ ...item, label: formatStoryName("WithoutCta") })),
  },
};
