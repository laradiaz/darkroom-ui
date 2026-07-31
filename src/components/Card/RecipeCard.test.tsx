import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { RecipeCard } from "./RecipeCard";

afterEach(cleanup);

describe("RecipeCard", () => {
  it("renders link, title, and category", () => {
    render(
      <RecipeCard
        href="/recipes/1"
        image="/img.jpg"
        category="Dinner"
        title="Pasta"
        subtitle="Quick"
      />,
    );

    expect(screen.getByRole("link", { name: /Pasta/i })).toHaveAttribute("href", "/recipes/1");
    expect(screen.getByText("Dinner")).toBeInTheDocument();
    expect(screen.getByText("Quick")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Pasta" })).toHaveAttribute("src", "/img.jpg");
  });
});
