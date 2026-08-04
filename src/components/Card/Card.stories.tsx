import type { Meta, StoryObj } from "@storybook/react";
import { ContentGrid } from "../Grid";
import { PostCard } from "./PostCard";

const meta: Meta<typeof PostCard> = {
  title: "Content/PostCard",
  component: PostCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Linked content teaser with image, category label, title, and optional subtitle.",
      },
    },
  },
  args: {
    href: "#",
    image:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Dark gaming desk with controllers and a monitor",
    category: "Guides",
    title: "A desk that disappears",
    subtitle: "Lighting, cables, and the setup that stays out of the way",
  },
};

export default meta;
type Story = StoryObj<typeof PostCard>;

export const Post: Story = {};

export const PostGrid: Story = {
  render: (args) => (
    <ContentGrid columns={4}>
      <PostCard
        {...args}
        category="Retro"
        title="The commute console"
        subtitle="Why a scratched Game Boy still beats your phone queue"
        image="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80&auto=format&fit=crop"
        imageAlt="Game Boy and vintage computer hardware"
      />
      <PostCard
        {...args}
        category="Guides"
        title="A desk that disappears"
        subtitle="Lighting, cables, and the setup that stays out of the way"
      />
      <PostCard
        {...args}
        category="Hardware"
        title="Living with the PS5"
        subtitle="Two years in: noise, storage, and the games that stuck"
        image="https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&q=80&auto=format&fit=crop"
        imageAlt="PlayStation 5 console with DualSense controller"
      />
      <PostCard
        {...args}
        category="Lists"
        title="Couch co-op for rainy Sundays"
        subtitle="Eight local multiplayer picks that still hold a room"
        image="https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80&auto=format&fit=crop"
        imageAlt="Two people holding controllers in front of a TV"
      />
    </ContentGrid>
  ),
};
