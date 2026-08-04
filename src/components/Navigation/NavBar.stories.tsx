import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { NavBar } from "./NavBar";

const meta: Meta<typeof NavBar> = {
  title: "Layout/NavBar",
  component: NavBar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Site header with logo, links, optional CTA, and a mobile menu button (visible below the `md` breakpoint).",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NavBar>;

const items = [
  { label: "Reviews", href: "#reviews" },
  { label: "Guides", href: "#guides" },
  { label: "Lists", href: "#lists" },
  { label: "About", href: "#about" },
];

export const Default: Story = {
  render: () => (
    <NavBar
      logo={<span className="font-display text-xl">Checkpoint</span>}
      items={items}
      cta={
        <Button variant="primary" size="sm">
          Subscribe
        </Button>
      }
    />
  ),
};

export const WithoutCta: Story = {
  render: () => (
    <NavBar
      logo={<span className="font-display text-xl">Checkpoint</span>}
      items={items}
    />
  ),
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  decorators: [
    (Story) => (
      <div className="min-h-64 bg-paper">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <NavBar
      logo={<span className="font-display text-xl">Checkpoint</span>}
      items={items}
      cta={
        <Button variant="primary" size="sm">
          Subscribe
        </Button>
      }
    />
  ),
};
