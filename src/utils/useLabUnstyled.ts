import { useLabUIConfig } from "../config/LabUIProvider";

/** Resolve per-instance `unstyled` against optional `LabUIProvider` default. */
export function useLabUnstyled(unstyled?: boolean): boolean {
  const { unstyled: globalUnstyled } = useLabUIConfig();
  return unstyled ?? globalUnstyled ?? false;
}
