import type { Meta, StoryObj } from "@storybook/react";
import { formatStoryName } from "../../stories/formatStoryName";
import { sampleImage } from "../../stories/sampleImage";
import { Button } from "../Button";
import { Heading, Text } from "../Typography";
import { Hero } from "./Hero";

const meta: Meta<typeof Hero> = {
  title: "Components/Hero",
  component: Hero,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Hero>;

const label = formatStoryName("Default");

export const Default: Story = {
  render: () => (
    <Hero image={sampleImage("hero-default", 1600, 900)} imageAlt={label}>
      <Heading level={1} tone="inverse">
        {label}
      </Heading>
      <Text size="subtitle" tone="inverse">
        {label}
      </Text>
      <div className="mt-6">
        <Button variant="primary" size="lg">
          {label}
        </Button>
      </div>
    </Hero>
  ),
};
