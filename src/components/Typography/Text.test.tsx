import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Text } from "./Text";

afterEach(cleanup);

describe("Text", () => {
  it("renders body copy and supports as=span", () => {
    const { rerender } = render(<Text>Body</Text>);
    expect(screen.getByText("Body").tagName).toBe("P");

    rerender(<Text as="span">Inline</Text>);
    expect(screen.getByText("Inline").tagName).toBe("SPAN");
  });
});
