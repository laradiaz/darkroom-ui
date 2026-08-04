import type { Meta, StoryObj } from "@storybook/react";
import { formatStoryName } from "../../stories/formatStoryName";
import { Text } from "../Typography";
import { Container, Page, Section } from "./index";

const meta: Meta = {
  title: "Layout/Page",
  tags: ["autodocs"],
};

export default meta;

export const ContainerSizes: StoryObj = {
  render: () => (
    <Page className="space-y-4 py-8">
      {(["narrow", "md", "lg", "xl", "full"] as const).map((size) => (
        <Container key={size} size={size} className="bg-paper-dark py-4 rounded-sm">
          <Text size="body">{formatStoryName(size)}</Text>
        </Container>
      ))}
    </Page>
  ),
};

export const SectionSpacing: StoryObj = {
  render: () => (
    <Page>
      {(["sm", "md", "lg", "xl"] as const).map((spacing) => (
        <Section key={spacing} spacing={spacing} className="bg-paper-dark/50">
          <Text size="body">{formatStoryName(spacing)}</Text>
        </Section>
      ))}
    </Page>
  ),
};

export const PageTemplate: StoryObj = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <Page>
      <Section spacing="lg" className="bg-paper-dark">
        <Text size="subtitle">{formatStoryName("PageTemplate")} — header area</Text>
      </Section>
      <Section spacing="lg">
        <Text size="body">Main content uses contained sections with preset vertical rhythm.</Text>
      </Section>
      <Section spacing="md" className="bg-paper-dark">
        <Text size="caption">Footer-adjacent section</Text>
      </Section>
    </Page>
  ),
};
