import type { Meta, StoryObj } from "@storybook/react";
import { formatStoryName } from "../../stories/formatStoryName";
import { Divider } from "./Divider";

const meta: Meta<typeof Divider> = {
  title: "Components/Divider",
  component: Divider,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Plain: Story = {
  render: () => <Divider />,
};

export const WithText: Story = {
  args: {
    children: formatStoryName("WithText"),
  },
};

export const SectionBreak: Story = {
  render: () => (
    <div className="max-w-2xl">
      <p className="font-sans text-text-muted mb-4">{formatStoryName("SectionBreak")}</p>
      <Divider>{formatStoryName("SectionBreak")}</Divider>
      <p className="font-sans text-text-muted mt-4">{formatStoryName("SectionBreak")}</p>
    </div>
  ),
};
