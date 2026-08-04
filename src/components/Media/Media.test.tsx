import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Media } from "./Media";

afterEach(cleanup);

describe("Media", () => {
  it("renders image with caption", () => {
    render(<Media src="/shot.jpg" alt="Shot" caption="On location" />);

    expect(screen.getByRole("img", { name: "Shot" })).toHaveAttribute("src", "/shot.jpg");
    expect(screen.getByText("On location")).toBeInTheDocument();
  });

  it("renders overlay content", () => {
    render(
      <Media src="/hero.jpg" alt="Hero" overlay={<span>Overlay</span>} aspect="video" />,
    );

    expect(screen.getByRole("img", { name: "Hero" })).toHaveAttribute("src", "/hero.jpg");
    expect(screen.getByText("Overlay")).toBeInTheDocument();
  });
});
