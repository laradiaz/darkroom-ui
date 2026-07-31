import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Select } from "./Select";

afterEach(cleanup);

const options = [
  { label: "Alpha", value: "a" },
  { label: "Beta", value: "b" },
];

describe("Select", () => {
  it("opens, selects an option, and closes", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select value="a" options={options} onChange={onChange} aria-label="Pick" />);

    const trigger = screen.getByRole("button", { name: "Pick" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Beta" }));
    expect(onChange).toHaveBeenCalledWith("b");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("closes on Escape and outside click", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <button type="button">Outside</button>
        <Select value="a" options={options} onChange={() => {}} aria-label="Pick" />
      </div>,
    );

    await user.click(screen.getByRole("button", { name: "Pick" }));
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Pick" }));
    fireEvent.mouseDown(screen.getByRole("button", { name: "Outside" }));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("does not open when disabled", async () => {
    const user = userEvent.setup();
    render(
      <Select value="a" options={options} onChange={() => {}} disabled aria-label="Pick" />,
    );

    await user.click(screen.getByRole("button", { name: "Pick" }));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
