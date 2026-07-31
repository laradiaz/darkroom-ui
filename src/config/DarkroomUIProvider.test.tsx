import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import {
  DarkroomUIProvider,
  useDarkroomUIConfig,
} from "./DarkroomUIProvider";

afterEach(cleanup);

function ConfigProbe() {
  const config = useDarkroomUIConfig();
  return (
    <div>
      unstyled:{String(Boolean(config.unstyled))} size:{config.containerSize ?? "none"}
    </div>
  );
}

describe("DarkroomUIProvider", () => {
  it("exposes config to consumers", () => {
    render(
      <DarkroomUIProvider config={{ unstyled: true, containerSize: "md" }}>
        <ConfigProbe />
      </DarkroomUIProvider>,
    );

    expect(screen.getByText("unstyled:true size:md")).toBeInTheDocument();
  });
});
