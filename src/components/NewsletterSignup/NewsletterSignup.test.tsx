import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { NewsletterSignup } from "./NewsletterSignup";

afterEach(cleanup);

describe("NewsletterSignup", () => {
  it("submits the email value", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<NewsletterSignup onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText("Email address"), "hi@example.com");
    await user.click(screen.getByRole("button", { name: "Join" }));

    expect(onSubmit).toHaveBeenCalledWith("hi@example.com");
  });

  it("requires an email before submit", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<NewsletterSignup onSubmit={onSubmit} />);

    await user.click(screen.getByRole("button", { name: "Join" }));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByLabelText("Email address")).toBeInvalid();
  });
});
