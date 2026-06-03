import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "darkroom-ui-theme";

export type DarkroomTheme = "light" | "dark" | "system";

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(resolved: "light" | "dark") {
  document.documentElement.classList.toggle("dark", resolved === "dark");
}

function resolveTheme(theme: DarkroomTheme): "light" | "dark" {
  if (theme === "system") return getSystemTheme();
  return theme;
}

export function useDarkroomDarkMode(defaultTheme: DarkroomTheme = "system") {
  const [theme, setThemeState] = useState<DarkroomTheme>(() => {
    if (typeof window === "undefined") return defaultTheme;
    const stored = localStorage.getItem(STORAGE_KEY) as DarkroomTheme | null;
    return stored ?? defaultTheme;
  });

  const resolved = resolveTheme(theme);

  useEffect(() => {
    applyTheme(resolved);
  }, [resolved]);

  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme(getSystemTheme());
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  const setTheme = useCallback((next: DarkroomTheme) => {
    setThemeState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggle = useCallback(() => {
    setTheme(resolved === "dark" ? "light" : "dark");
  }, [resolved, setTheme]);

  return { theme, resolved, setTheme, toggle, darkModeEnabled: resolved === "dark" };
}
