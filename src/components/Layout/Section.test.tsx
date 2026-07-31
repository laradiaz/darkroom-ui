import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { DarkroomUIProvider } from "../../config/DarkroomUIProvider";
import { Section } from "./Section";

afterEach(cleanup);

describe("Section", () => {
  it("renders contained children and inherits provider container size", () => {
    render(
      <DarkroomUIProvider config={{ containerSize: "narrow" }}>
        <Section>
          <p>Inside</p>
        </Section>
      </DarkroomUIProvider>,
    );

    expect(screen.getByText("Inside")).toBeInTheDocument();
    expect(screen.getByText("Inside").closest("section")).toBeTruthy();
  });

  it("can skip the inner container", () => {
    render(
      <Section contained={false}>
        <p>Bare</p>
      </Section>,
    );
    expect(screen.getByText("Bare")).toBeInTheDocument();
  });
});
