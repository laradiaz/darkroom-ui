import type { Meta, StoryObj } from "@storybook/react";
import { formatStoryName } from "../../stories/formatStoryName";
import { ContentGrid } from "../Grid";
import { MediaCard, RecipeCard } from "./index";

const meta: Meta = {
  title: "Components/Card",
  tags: ["autodocs"],
};

export default meta;

const sampleImage =
  "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80";

const recipeLabel = formatStoryName("Recipe");
const gridLabel = formatStoryName("RecipeGrid");
const mediaLabel = formatStoryName("Media");

export const Recipe: StoryObj = {
  render: () => (
    <RecipeCard
      href="#"
      image={sampleImage}
      category={recipeLabel}
      title={recipeLabel}
      subtitle={recipeLabel}
    />
  ),
};

export const RecipeGrid: StoryObj = {
  render: () => (
    <ContentGrid columns={4}>
      <RecipeCard href="#" image={sampleImage} category={gridLabel} title={gridLabel} />
      <RecipeCard href="#" image={sampleImage} category={gridLabel} title={gridLabel} subtitle={gridLabel} />
      <RecipeCard href="#" image={sampleImage} category={gridLabel} title={gridLabel} />
      <RecipeCard href="#" image={sampleImage} category={gridLabel} title={gridLabel} subtitle={gridLabel} />
    </ContentGrid>
  ),
};

export const Media: StoryObj = {
  render: () => (
    <MediaCard
      image={sampleImage}
      overlay={<span className="font-display text-3xl">{mediaLabel}</span>}
    />
  ),
};
