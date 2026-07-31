import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Page } from "./Page";

afterEach(cleanup);

describe("Page", () => {
  it("renders children", () => {
    render(<Page>Shell</Page>);
    expect(screen.getByText("Shell")).toBeInTheDocument();
  });
});
