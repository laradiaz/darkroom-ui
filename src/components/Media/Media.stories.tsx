import type { Meta, StoryObj } from "@storybook/react";
import { Media } from "./Media";

const unsplash = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

const meta: Meta<typeof Media> = {
  title: "Content/Media",
  component: Media,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Photo block with optional caption, aspect ratio, and overlay. Renders a semantic figure.",
      },
    },
  },
  args: {
    src: unsplash("photo-1552820728-8b83bb6b773f", 1200),
    alt: "Controller on a desk under teal and orange light",
    aspect: "video",
  },
};

export default meta;
type Story = StoryObj<typeof Media>;

export const VideoAspect: Story = {
  args: {
    caption: "Evening session — DualShock on oak",
    aspect: "video",
  },
};

export const Square: Story = {
  args: {
    src: unsplash("photo-1606144042614-b2417e99c4e3", 800),
    alt: "PlayStation 5 console with DualSense controller",
    aspect: "square",
    caption: "Hardware still life",
  },
};

export const Portrait: Story = {
  args: {
    src: unsplash("photo-1612287230202-1ff1d85d1bdf", 800),
    alt: "Xbox controller under cyan and magenta light",
    aspect: "portrait",
    caption: "Neon controller study",
  },
};

export const WithOverlay: Story = {
  args: {
    src: unsplash("photo-1542751371-adc38448a05e", 1400),
    alt: "Player at a tournament desk focused on a match",
    aspect: "wide",
    overlay: <span className="font-display text-2xl">Live from the floor</span>,
  },
};
