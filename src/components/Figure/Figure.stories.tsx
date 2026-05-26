import type { Meta, StoryObj } from "@storybook/react";
import { formatStoryName } from "../../stories/formatStoryName";
import { sampleImage } from "../../stories/sampleImage";
import { Figure } from "./Figure";

const meta: Meta<typeof Figure> = {
  title: "Components/Figure",
  component: Figure,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Figure>;

export const VideoAspect: Story = {
  args: {
    src: sampleImage("figure-video", 800, 450),
    alt: formatStoryName("VideoAspect"),
    caption: formatStoryName("VideoAspect"),
    aspect: "video",
  },
};

export const Square: Story = {
  args: {
    src: sampleImage("figure-square", 600, 600),
    alt: formatStoryName("Square"),
    aspect: "square",
  },
};

export const Portrait: Story = {
  args: {
    src: sampleImage("figure-portrait", 600, 800),
    alt: formatStoryName("Portrait"),
    aspect: "portrait",
    caption: formatStoryName("Portrait"),
  },
};

export const WithOverlay: Story = {
  args: {
    src: sampleImage("figure-wide", 1200, 514),
    alt: formatStoryName("WithOverlay"),
    aspect: "wide",
    overlay: (
      <span className="font-display text-2xl text-paper">{formatStoryName("WithOverlay")}</span>
    ),
  },
};
