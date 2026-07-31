import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MediaCard } from "./MediaCard";

afterEach(cleanup);

describe("MediaCard", () => {
  it("renders image and overlay content", () => {
    render(<MediaCard image="/hero.jpg" imageAlt="Hero" overlay={<span>Overlay</span>} />);

    expect(screen.getByRole("img", { name: "Hero" })).toHaveAttribute("src", "/hero.jpg");
    expect(screen.getByText("Overlay")).toBeInTheDocument();
  });
});
