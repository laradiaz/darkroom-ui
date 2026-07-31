import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Footer } from "./Footer";

afterEach(cleanup);

describe("Footer", () => {
  it("renders columns, links, and copyright", () => {
    render(
      <Footer
        columns={[
          {
            title: "Explore",
            links: [{ label: "Recipes", href: "/recipes" }],
          },
        ]}
        copyright="© Darkroom"
      />,
    );

    expect(screen.getByRole("heading", { name: "Explore" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Recipes" })).toHaveAttribute("href", "/recipes");
    expect(screen.getByText("© Darkroom")).toBeInTheDocument();
  });
});
