import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("theme tokens", () => {
  it("keeps --color-on-media light in dark mode (overlay text)", () => {
    const css = readFileSync(resolve(__dirname, "tokens.css"), "utf8");
    const dark = css.split("html.dark")[1] ?? "";
    expect(dark).toMatch(/--color-on-media:\s*#faf9f7/);
  });
});
