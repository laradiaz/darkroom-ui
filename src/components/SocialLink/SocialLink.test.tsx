import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { SocialLink } from "./SocialLink";

afterEach(cleanup);

describe("SocialLink", () => {
  it("renders icon mode with accessible label", () => {
    render(<SocialLink platform="youtube" href="https://youtube.com" mode="icon" />);
    expect(screen.getByRole("link", { name: "YouTube" })).toHaveAttribute(
      "href",
      "https://youtube.com",
    );
  });

  it("renders text mode labels", () => {
    render(
      <SocialLink platform="instagram" href="https://instagram.com" mode="text">
        @darkroom
      </SocialLink>,
    );
    expect(screen.getByText("Instagram")).toBeInTheDocument();
    expect(screen.getByText("@darkroom")).toBeInTheDocument();
  });
});
