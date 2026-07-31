import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Divider } from "./Divider";

afterEach(cleanup);

describe("Divider", () => {
  it("renders a separator with optional label", () => {
    render(<Divider>Or</Divider>);
    expect(screen.getByRole("separator")).toBeInTheDocument();
    expect(screen.getByText("Or")).toBeInTheDocument();
  });
});
