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
  RecipeCard,
  Section,
  SocialLink,
  Text,
} from "../components";
import { sampleImage } from "./sampleImage";

const meta: Meta = {
  title: "Examples/Landing Page",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj;

const heroImage = sampleImage("landing-hero", 1600, 900);
const recipeImage = (n: number) => sampleImage(`landing-recipe-${n}`, 800, 600);

const lorem = {
  short: "Lorem ipsum",
  nav: "Lorem",
  heroTitle: "Lorem ipsum dolor sit amet consectetur",
  heroBody:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  sectionLabel: "Lorem ipsum",
  sectionTitle: "Dolor sit amet consectetur",
  recipeCategory: "Lorem ipsum",
  recipeTitle: "Dolor sit amet",
  recipeSubtitle: "Consectetur adipiscing elit",
  divider: "Lorem ipsum",
  footerBlurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut enim ad minim veniam.",
  copyright: "Lorem ipsum dolor sit amet",
};

function LandingPageExample() {
  return (
    <Page>
      <NavBar
        logo={<span className="font-display text-2xl tracking-tight">{lorem.short}</span>}
        items={[
          { label: lorem.nav, href: "#" },
          { label: lorem.nav, href: "#" },
          { label: lorem.nav, href: "#" },
          { label: lorem.nav, href: "#" },
          { label: lorem.nav, href: "#" },
        ]}
        cta={
          <Button variant="primary" size="sm">
            {lorem.short}
          </Button>
        }
      />

      <Hero image={heroImage} imageAlt={lorem.short}>
        <Heading level={1} tone="inverse">
          {lorem.heroTitle}
        </Heading>
        <Text size="subtitle" tone="inverse" className="mt-4">
          {lorem.heroBody}
        </Text>
        <div className="mt-8">
          <Button variant="primary" size="lg">
            {lorem.short}
          </Button>
        </div>
      </Hero>

      <Section spacing="lg" id="recipes">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <Label>{lorem.sectionLabel}</Label>
            <Heading level={2} className="mt-2">
              {lorem.sectionTitle}
            </Heading>
          </div>
          <Button variant="ghost" size="md">
            {lorem.short}
          </Button>
        </div>

        <ContentGrid columns={4}>
          <RecipeCard
            href="#"
            image={recipeImage(1)}
            category={lorem.recipeCategory}
            title={lorem.recipeTitle}
            subtitle={lorem.recipeSubtitle}
          />
          <RecipeCard
            href="#"
            image={recipeImage(2)}
            category={lorem.recipeCategory}
            title={lorem.recipeTitle}
            subtitle={lorem.recipeSubtitle}
          />
          <RecipeCard
            href="#"
            image={recipeImage(3)}
            category={lorem.recipeCategory}
            title={lorem.recipeTitle}
            subtitle={lorem.recipeSubtitle}
          />
          <RecipeCard
            href="#"
            image={recipeImage(4)}
            category={lorem.recipeCategory}
            title={lorem.recipeTitle}
            subtitle={lorem.recipeSubtitle}
          />
        </ContentGrid>
      </Section>

      <Section spacing="sm">
        <Divider>{lorem.divider}</Divider>
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
            title: lorem.short,
            links: [
              { label: lorem.nav, href: "#" },
              { label: lorem.nav, href: "#" },
              { label: lorem.nav, href: "#" },
              { label: lorem.nav, href: "#" },
              { label: lorem.nav, href: "#" },
            ],
          },
          {
            title: lorem.short,
            links: [
              { label: lorem.nav, href: "#" },
              { label: lorem.nav, href: "#" },
              { label: lorem.nav, href: "#" },
            ],
          },
        ]}
        newsletter={
          <div>
            <Heading level={4}>{lorem.short}</Heading>
            <Text size="caption" className="mt-2 mb-4 block max-w-sm">
              {lorem.footerBlurb}
            </Text>
            <NewsletterSignup
              submitLabel={lorem.short}
              placeholder={lorem.short}
              onSubmit={() => undefined}
            />
          </div>
        }
        copyright={lorem.copyright}
      />
    </Page>
  );
}

export const Default: Story = {
  render: () => <LandingPageExample />,
};
