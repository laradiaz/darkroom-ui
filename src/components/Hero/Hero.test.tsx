import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Hero } from "./Hero";

afterEach(cleanup);

describe("Hero", () => {
  it("renders image hero with content", () => {
    render(
      <Hero image="/bg.jpg" imageAlt="Background" aria-label="Hero">
        <h1>Welcome</h1>
      </Hero>,
    );

    expect(screen.getByRole("region", { name: "Hero" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Background" })).toHaveAttribute("src", "/bg.jpg");
    expect(screen.getByRole("heading", { name: "Welcome" })).toBeInTheDocument();
  });
});
