import type { Meta, StoryObj } from "@storybook/react";
import { formatStoryName } from "../../stories/formatStoryName";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { children: formatStoryName("Primary"), variant: "primary", size: "md" },
};

export const Ghost: Story = {
  args: { children: formatStoryName("Ghost"), variant: "ghost", size: "md" },
};

export const Link: Story = {
  args: { children: formatStoryName("Link"), variant: "link", size: "md" },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button size="sm">{formatStoryName("AllSizes")}</Button>
      <Button size="md">{formatStoryName("AllSizes")}</Button>
      <Button size="lg">{formatStoryName("AllSizes")}</Button>
    </div>
  ),
};
