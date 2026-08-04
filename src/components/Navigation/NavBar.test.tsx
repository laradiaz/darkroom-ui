import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { NavBar } from "./NavBar";

afterEach(cleanup);

describe("NavBar", () => {
  it("renders nav items and toggles mobile menu", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <NavBar
        logo={<span>Brand</span>}
        items={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
      />,
    );

    expect(screen.getByText("Brand")).toBeInTheDocument();
    const nav = container.querySelector("nav");
    expect(nav).toHaveAttribute("aria-label", "Main navigation");
    expect(container.querySelector('a[href="/"]')).toHaveTextContent("Home");

    const menu = screen.getByRole("button", { name: "Toggle menu" });
    expect(menu).toHaveAttribute("aria-expanded", "false");
    expect(nav?.className.includes("navOpen")).toBe(false);

    await user.click(menu);
    expect(menu).toHaveAttribute("aria-expanded", "true");
    expect(nav?.className.includes("navOpen")).toBe(true);

    await user.click(menu);
    expect(menu).toHaveAttribute("aria-expanded", "false");
    expect(nav?.className.includes("navOpen")).toBe(false);
  });
});
