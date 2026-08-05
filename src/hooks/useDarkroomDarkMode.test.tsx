import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { DarkroomUIProvider } from "../config/DarkroomUIProvider";
import { useDarkroomDarkMode } from "./useDarkroomDarkMode";

afterEach(cleanup);

function ThemeProbe() {
  const { darkModeEnabled, toggle, theme } = useDarkroomDarkMode("light");
  return (
    <button type="button" onClick={toggle}>
      {theme}:{darkModeEnabled ? "dark" : "light"}
    </button>
  );
}

describe("useDarkroomDarkMode", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("toggles theme, persists, and sets html.dark", async () => {
    const user = userEvent.setup();
    render(<ThemeProbe />);

    expect(screen.getByRole("button")).toHaveTextContent("light:light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);

    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("button")).toHaveTextContent("dark:dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("darkroom-ui-theme")).toBe("dark");

    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("button")).toHaveTextContent("light:light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("darkroom-ui-theme")).toBe("light");
  });

  it("uses themeStorageKey from the provider", async () => {
    const user = userEvent.setup();
    render(
      <DarkroomUIProvider config={{ themeStorageKey: "app-theme" }}>
        <ThemeProbe />
      </DarkroomUIProvider>,
    );

    await user.click(screen.getByRole("button"));
    expect(localStorage.getItem("app-theme")).toBe("dark");
    expect(localStorage.getItem("darkroom-ui-theme")).toBeNull();
  });
});
