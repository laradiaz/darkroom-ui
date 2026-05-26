import type { Meta, StoryObj } from "@storybook/react";
import { formatStoryName } from "../../stories/formatStoryName";
import type { SocialPlatform } from "./icons";
import { SocialLink } from "./SocialLink";

const meta: Meta<typeof SocialLink> = {
  title: "Components/SocialLink",
  component: SocialLink,
  tags: ["autodocs"],
  argTypes: {
    platform: {
      control: "select",
      options: ["youtube", "instagram", "tiktok", "twitch", "discord"] satisfies SocialPlatform[],
    },
    mode: { control: "radio", options: ["icon", "text"] },
  },
};

export default meta;
type Story = StoryObj<typeof SocialLink>;

export const IconYouTube: Story = {
  name: "Icon / YouTube",
  args: { platform: "youtube", href: "#", mode: "icon" },
};

export const TextYouTube: Story = {
  name: "Text / YouTube",
  args: {
    platform: "youtube",
    href: "#",
    mode: "text",
    children: formatStoryName("YouTube"),
  },
};

export const IconRow: Story = {
  name: "Icon Row",
  render: () => (
    <div className="flex flex-wrap gap-10">
      <SocialLink platform="youtube" href="#" mode="icon" />
      <SocialLink platform="instagram" href="#" mode="icon" />
      <SocialLink platform="tiktok" href="#" mode="icon" />
      <SocialLink platform="twitch" href="#" mode="icon" />
      <SocialLink platform="discord" href="#" mode="icon" />
    </div>
  ),
};

export const TextRow: Story = {
  name: "Text Row",
  render: () => (
    <div className="flex flex-wrap gap-10">
      <SocialLink platform="youtube" href="#" mode="text" children={formatStoryName("YouTube")} />
      <SocialLink platform="instagram" href="#" mode="text" children={formatStoryName("Instagram")} />
      <SocialLink platform="tiktok" href="#" mode="text" children={formatStoryName("TikTok")} />
    </div>
  ),
};
