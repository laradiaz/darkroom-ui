/** Components only — no fonts or global CSS. Import `lab-ui/style.css` separately. */
export * from "./components";
export { useLabDarkMode, type LabTheme } from "./hooks/useLabDarkMode";
export { LabUIProvider, useLabUIConfig, type LabUIConfig } from "./config/LabUIProvider";
export { cn } from "./utils/cn";
