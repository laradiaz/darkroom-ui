import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Label } from "./Label";

afterEach(cleanup);

describe("Label", () => {
  it("renders label text", () => {
    render(<Label>Category</Label>);
    expect(screen.getByText("Category")).toBeInTheDocument();
  });
});
