import type { Meta, StoryObj } from "@storybook/react";
import { formatStoryName } from "../../stories/formatStoryName";
import { NewsletterSignup } from "./NewsletterSignup";

const meta: Meta<typeof NewsletterSignup> = {
  title: "Components/NewsletterSignup",
  component: NewsletterSignup,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NewsletterSignup>;

export const Default: Story = {
  args: {
    submitLabel: formatStoryName("Default"),
    placeholder: formatStoryName("Default"),
    onSubmit: (email) => console.log("submit", email),
  },
};

export const CustomLabels: Story = {
  args: {
    submitLabel: formatStoryName("CustomLabels"),
    placeholder: formatStoryName("CustomLabels"),
    onSubmit: (email) => console.log("submit", email),
  },
};
