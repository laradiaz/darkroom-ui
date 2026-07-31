import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ContentGrid } from "./ContentGrid";

afterEach(cleanup);

describe("ContentGrid", () => {
  it("renders children", () => {
    render(
      <ContentGrid columns={2}>
        <div>One</div>
        <div>Two</div>
      </ContentGrid>,
    );
    expect(screen.getByText("One")).toBeInTheDocument();
    expect(screen.getByText("Two")).toBeInTheDocument();
  });
});
