import type { Meta, StoryObj } from "@storybook/react";
import {
  Button,
  ContentGrid,
  Divider,
  Footer,
  Heading,
  Hero,
  Label,
  NavBar,
  NewsletterSignup,
  Page,
  PostCard,
  Section,
  SocialLink,
  Text,
} from "../components";

const meta: Meta = {
  title: "Examples/Landing Page",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj;

/** Unsplash — gaming photos used only in this Storybook example. */
const unsplash = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

const heroImage = unsplash("photo-1542751371-adc38448a05e", 1600);

const reviews = [
  {
    category: "Retro",
    title: "The commute console",
    subtitle: "Why a scratched Game Boy still beats your phone queue",
    image: unsplash("photo-1550745165-9bc0b252726f", 800),
    imageAlt: "Game Boy and vintage computer hardware under neon light",
  },
  {
    category: "Guides",
    title: "A desk that disappears",
    subtitle: "Lighting, cables, and the setup that stays out of the way",
    image: unsplash("photo-1593305841991-05c297ba4575", 800),
    imageAlt: "Dark gaming desk with controllers and a monitor",
  },
  {
    category: "Hardware",
    title: "Living with the PS5",
    subtitle: "Two years in: noise, storage, and the games that stuck",
    image: unsplash("photo-1606144042614-b2417e99c4e3", 800),
    imageAlt: "PlayStation 5 console with DualSense controller",
  },
  {
    category: "Lists",
    title: "Couch co-op for rainy Sundays",
    subtitle: "Eight local multiplayer picks that still hold a room",
    image: unsplash("photo-1493711662062-fa541adb3fc8", 800),
    imageAlt: "Two people holding controllers in front of a TV",
  },
] as const;

function LandingPageExample() {
  return (
    <Page>
      <NavBar
        logo={<span className="font-display text-2xl tracking-tight">Checkpoint</span>}
        items={[
          { label: "Reviews", href: "#reviews" },
          { label: "Guides", href: "#" },
          { label: "Lists", href: "#" },
          { label: "Hardware", href: "#" },
          { label: "About", href: "#" },
        ]}
        cta={
          <Button variant="primary" size="sm">
            Subscribe
          </Button>
        }
      />

      <Hero image={heroImage} imageAlt="Player at a tournament desk focused on a match">
        <Heading level={1} tone="inverse">
          Clear takes on the games we finish
        </Heading>
        <Text size="subtitle" tone="inverse" className="mt-4">
          Reviews, setup guides, and long lists from a small gaming blog that
          cares more about playtime than hype cycles.
        </Text>
        <div className="mt-8">
          <Button variant="primary" size="lg">
            Browse reviews
          </Button>
        </div>
      </Hero>

      <Section spacing="lg" id="reviews">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <Label>This week</Label>
            <Heading level={2} className="mt-2">
              Fresh from the queue
            </Heading>
          </div>
          <Button variant="ghost" size="md">
            View all
          </Button>
        </div>

        <ContentGrid columns={4}>
          {reviews.map((review) => (
            <PostCard
              key={review.title}
              href="#"
              image={review.image}
              imageAlt={review.imageAlt}
              category={review.category}
              title={review.title}
              subtitle={review.subtitle}
            />
          ))}
        </ContentGrid>
      </Section>

      <Section spacing="sm">
        <Divider>Watch &amp; chat</Divider>
        <div className="flex flex-wrap justify-center gap-10 mt-6">
          <SocialLink platform="youtube" href="#" mode="icon" />
          <SocialLink platform="instagram" href="#" mode="icon" />
          <SocialLink platform="tiktok" href="#" mode="icon" />
          <SocialLink platform="twitch" href="#" mode="icon" />
          <SocialLink platform="discord" href="#" mode="icon" />
        </div>
      </Section>

      <Footer
        columns={[
          {
            title: "Explore",
            links: [
              { label: "Reviews", href: "#reviews" },
              { label: "Guides", href: "#" },
              { label: "Lists", href: "#" },
              { label: "Hardware", href: "#" },
              { label: "Archive", href: "#" },
            ],
          },
          {
            title: "Checkpoint",
            links: [
              { label: "About", href: "#" },
              { label: "Contact", href: "#" },
              { label: "Privacy", href: "#" },
            ],
          },
        ]}
        newsletter={
          <div>
            <Heading level={4}>Friday patch notes</Heading>
            <Text size="caption" className="mt-2 mb-4 block max-w-sm">
              One email a week: new reviews, a short list, and what we&apos;re
              playing next.
            </Text>
            <NewsletterSignup
              submitLabel="Join"
              placeholder="you@email.com"
              onSubmit={() => undefined}
            />
          </div>
        }
        copyright="© Checkpoint — a sample gaming blog for darkroom-ui"
      />
    </Page>
  );
}

export const Default: Story = {
  render: () => <LandingPageExample />,
};
