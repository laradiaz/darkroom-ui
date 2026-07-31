import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Container } from "./Container";

afterEach(cleanup);

describe("Container", () => {
  it("renders children", () => {
    render(<Container size="md">Content</Container>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});
