import type { Meta, StoryObj } from "@storybook/react";
import { formatStoryName } from "../../stories/formatStoryName";
import { RecipeCard } from "../Card";
import { ContentGrid } from "./ContentGrid";

const meta: Meta<typeof ContentGrid> = {
  title: "Components/ContentGrid",
  component: ContentGrid,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ContentGrid>;

const sampleImage =
  "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80";

const twoCol = formatStoryName("TwoColumns");
const threeCol = formatStoryName("ThreeColumns");
const fourCol = formatStoryName("FourColumnsWithCards");

const placeholder = (label: string) => (
  <div className="aspect-[4/3] bg-paper-dark rounded-sm flex items-center justify-center font-sans text-sm text-text-muted text-center px-2">
    {label}
  </div>
);

export const TwoColumns: Story = {
  render: () => (
    <ContentGrid columns={2}>
      {placeholder(twoCol)}
      {placeholder(twoCol)}
    </ContentGrid>
  ),
};

export const ThreeColumns: Story = {
  render: () => (
    <ContentGrid columns={3}>
      {placeholder(threeCol)}
      {placeholder(threeCol)}
      {placeholder(threeCol)}
    </ContentGrid>
  ),
};

export const FourColumnsWithCards: Story = {
  render: () => (
    <ContentGrid columns={4}>
      <RecipeCard href="#" image={sampleImage} category={fourCol} title={fourCol} />
      <RecipeCard href="#" image={sampleImage} category={fourCol} title={fourCol} />
      <RecipeCard href="#" image={sampleImage} category={fourCol} title={fourCol} />
      <RecipeCard href="#" image={sampleImage} category={fourCol} title={fourCol} />
    </ContentGrid>
  ),
};
