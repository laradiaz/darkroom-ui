import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { NavMenuButton } from "./NavMenuButton";

afterEach(cleanup);

function ControlledMenu() {
  const [open, setOpen] = useState(false);
  return (
    <NavMenuButton
      aria-expanded={open}
      aria-controls="nav"
      onClick={() => setOpen((value) => !value)}
    />
  );
}

describe("NavMenuButton", () => {
  it("toggles aria-expanded when clicked", async () => {
    const user = userEvent.setup();
    render(<ControlledMenu />);

    const button = screen.getByRole("button", { name: "Toggle menu" });
    expect(button).toHaveAttribute("aria-expanded", "false");

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
  });
});
