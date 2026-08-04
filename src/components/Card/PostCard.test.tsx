import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { PostCard } from "./PostCard";

afterEach(cleanup);

describe("PostCard", () => {
  it("renders link, title, and category", () => {
    render(
      <PostCard
        href="/posts/1"
        image="/img.jpg"
        category="Indie"
        title="Hollow Reach"
        subtitle="A quiet metroidvania"
      />,
    );

    expect(screen.getByRole("link", { name: /Hollow Reach/i })).toHaveAttribute(
      "href",
      "/posts/1",
    );
    expect(screen.getByText("Indie")).toBeInTheDocument();
    expect(screen.getByText("A quiet metroidvania")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Hollow Reach" })).toHaveAttribute("src", "/img.jpg");
  });
});
