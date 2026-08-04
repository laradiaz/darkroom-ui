import type { Meta, StoryObj } from "@storybook/react";
import { formatStoryName } from "../../stories/formatStoryName";
import { Heading, Label, Text } from "./index";

const meta: Meta = {
  title: "Content/Typography",
  tags: ["autodocs"],
};

export default meta;

export const Headings: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Heading level={1}>{formatStoryName("Headings")}</Heading>
      <Heading level={2}>{formatStoryName("Headings")}</Heading>
      <Heading level={3}>{formatStoryName("Headings")}</Heading>
    </div>
  ),
};

export const TextStyles: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-lg">
      <Label>{formatStoryName("TextStyles")}</Label>
      <Text size="subtitle">{formatStoryName("TextStyles")}</Text>
      <Text size="body">{formatStoryName("TextStyles")}</Text>
      <Text size="caption">{formatStoryName("TextStyles")}</Text>
    </div>
  ),
};
