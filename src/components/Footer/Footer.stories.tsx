import type { Meta, StoryObj } from "@storybook/react";
import { formatStoryName } from "../../stories/formatStoryName";
import { Heading } from "../Typography";
import { NewsletterSignup } from "../NewsletterSignup";
import { SocialLink } from "../SocialLink";
import { Footer } from "./Footer";

const meta: Meta<typeof Footer> = {
  title: "Components/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

const defaultLabel = formatStoryName("Default");

const siteMapColumns = [
  {
    title: defaultLabel,
    links: [
      { label: defaultLabel, href: "#" },
      { label: defaultLabel, href: "#" },
    ],
  },
];

export const Default: Story = {
  render: () => (
    <Footer
      columns={siteMapColumns}
      newsletter={
        <div>
          <Heading level={4}>{defaultLabel}</Heading>
          <p className="font-sans text-sm text-text-muted mt-2 mb-4 max-w-sm">{defaultLabel}</p>
          <NewsletterSignup
            submitLabel={defaultLabel}
            placeholder={defaultLabel}
            onSubmit={() => undefined}
          />
        </div>
      }
      social={
        <>
          <SocialLink platform="instagram" href="#" mode="icon" />
          <SocialLink platform="youtube" href="#" mode="icon" />
        </>
      }
      copyright={defaultLabel}
    />
  ),
};

export const Minimal: Story = {
  args: {
    columns: [
      {
        links: [
          { label: formatStoryName("Minimal"), href: "#" },
          { label: formatStoryName("Minimal"), href: "#" },
        ],
      },
    ],
    copyright: formatStoryName("Minimal"),
  },
};
