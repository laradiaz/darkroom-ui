import type { Meta, StoryObj } from "@storybook/react";
import { formatStoryName } from "../../stories/formatStoryName";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "radio", options: ["straight", "tilted"] },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { children: formatStoryName("Default"), variant: "default" },
};

export const StampStraight: Story = {
  args: {
    children: formatStoryName("StampStraight"),
    variant: "stamp",
    orientation: "straight",
  },
};

export const StampTilted: Story = {
  args: {
    children: formatStoryName("StampTilted"),
    variant: "stamp",
    orientation: "tilted",
  },
};

export const OutlineStraight: Story = {
  args: {
    children: formatStoryName("OutlineStraight"),
    variant: "outline",
    orientation: "straight",
  },
};

export const OutlineTilted: Story = {
  args: {
    children: formatStoryName("OutlineTilted"),
    variant: "outline",
    orientation: "tilted",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8 items-center p-4">
      <Badge variant="default">{formatStoryName("Default")}</Badge>
      <Badge variant="stamp" orientation="straight">
        {formatStoryName("StampStraight")}
      </Badge>
      <Badge variant="stamp" orientation="tilted">
        {formatStoryName("StampTilted")}
      </Badge>
      <Badge variant="outline" orientation="straight">
        {formatStoryName("OutlineStraight")}
      </Badge>
      <Badge variant="outline" orientation="tilted">
        {formatStoryName("OutlineTilted")}
      </Badge>
    </div>
  ),
};
