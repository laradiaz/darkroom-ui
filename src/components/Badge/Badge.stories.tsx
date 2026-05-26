import type { Meta, StoryObj } from "@storybook/react";
import { formatStoryName } from "../../stories/formatStoryName";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "radio", options: ["straight", "tilted"] },
    tone: { control: "radio", options: ["stamp", "accent", "neutral"] },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { children: formatStoryName("Default"), variant: "default" },
};

export const StampGreenStraight: Story = {
  args: {
    children: formatStoryName("StampGreenStraight"),
    variant: "stamp",
    tone: "stamp",
    orientation: "straight",
  },
};

export const StampGreenTilted: Story = {
  args: {
    children: formatStoryName("StampGreenTilted"),
    variant: "stamp",
    tone: "stamp",
    orientation: "tilted",
  },
};

export const StampAccentTilted: Story = {
  args: {
    children: formatStoryName("StampAccentTilted"),
    variant: "stamp",
    tone: "accent",
    orientation: "tilted",
  },
};

export const OutlineNeutral: Story = {
  args: {
    children: formatStoryName("OutlineNeutral"),
    variant: "outline",
    tone: "neutral",
    orientation: "straight",
  },
};

export const OutlineAccentTilted: Story = {
  args: {
    children: formatStoryName("OutlineAccentTilted"),
    variant: "outline",
    tone: "accent",
    orientation: "tilted",
  },
};

export const OutlineStampStraight: Story = {
  args: {
    children: formatStoryName("OutlineStampStraight"),
    variant: "outline",
    tone: "stamp",
    orientation: "straight",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-10 p-4">
      <section className="flex flex-wrap gap-8 items-center">
        <Badge variant="stamp" tone="stamp" orientation="straight">
          {formatStoryName("StampGreenStraight")}
        </Badge>
        <Badge variant="stamp" tone="stamp" orientation="tilted">
          {formatStoryName("StampGreenTilted")}
        </Badge>
        <Badge variant="stamp" tone="accent" orientation="straight">
          {formatStoryName("StampAccentStraight")}
        </Badge>
        <Badge variant="stamp" tone="accent" orientation="tilted">
          {formatStoryName("StampAccentTilted")}
        </Badge>
      </section>
      <section className="flex flex-wrap gap-8 items-center">
        <Badge variant="outline" tone="neutral" orientation="straight">
          {formatStoryName("OutlineNeutral")}
        </Badge>
        <Badge variant="outline" tone="stamp" orientation="tilted">
          {formatStoryName("OutlineStampTilted")}
        </Badge>
        <Badge variant="outline" tone="accent" orientation="straight">
          {formatStoryName("OutlineAccentStraight")}
        </Badge>
        <Badge variant="outline" tone="accent" orientation="tilted">
          {formatStoryName("OutlineAccentTilted")}
        </Badge>
      </section>
    </div>
  ),
};
