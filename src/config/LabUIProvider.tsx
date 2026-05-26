import { createContext, useContext, type ReactNode } from "react";
import type { ContainerSize } from "../components/Layout/Container";
import type { SocialLinkMode } from "../components/SocialLink/SocialLink";

export type LabUIConfig = {
  /** Render components without CSS module classes */
  unstyled?: boolean;
  /** Default Container width inside Section */
  containerSize?: ContainerSize;
  /** Default SocialLink display mode */
  socialLinkMode?: SocialLinkMode;
  /** localStorage key for useLabDarkMode */
  themeStorageKey?: string;
};

const LabUIContext = createContext<LabUIConfig>({});

export type LabUIProviderProps = {
  config?: LabUIConfig;
  children: ReactNode;
};

export function LabUIProvider({ config = {}, children }: LabUIProviderProps) {
  return <LabUIContext.Provider value={config}>{children}</LabUIContext.Provider>;
}

export function useLabUIConfig(): LabUIConfig {
  return useContext(LabUIContext);
}
