import { useDarkroomUIConfig } from "../config/DarkroomUIProvider";

/** Resolve per-instance `unstyled` against optional `DarkroomUIProvider` default. */
export function useDarkroomUnstyled(unstyled?: boolean): boolean {
  const { unstyled: globalUnstyled } = useDarkroomUIConfig();
  return unstyled ?? globalUnstyled ?? false;
}
