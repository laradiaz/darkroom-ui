import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Badge } from "./Badge";

afterEach(cleanup);

describe("Badge", () => {
  it("renders badge content", () => {
    render(<Badge variant="outline">New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });
});
