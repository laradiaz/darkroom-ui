import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Figure } from "./Figure";

afterEach(cleanup);

describe("Figure", () => {
  it("renders image with caption", () => {
    render(<Figure src="/shot.jpg" alt="Shot" caption="On location" />);

    expect(screen.getByRole("img", { name: "Shot" })).toHaveAttribute("src", "/shot.jpg");
    expect(screen.getByText("On location")).toBeInTheDocument();
  });
});
