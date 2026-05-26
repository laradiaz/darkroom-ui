import { createContext, useContext, type ReactNode } from "react";
import type { ContainerSize } from "../components/Layout/Container";
import type { SocialLinkMode } from "../components/SocialLink/SocialLink";

export type DarkroomUIConfig = {
  /** Render components without CSS module classes */
  unstyled?: boolean;
  /** Default Container width inside Section */
  containerSize?: ContainerSize;
  /** Default SocialLink display mode */
  socialLinkMode?: SocialLinkMode;
  /** localStorage key for useDarkroomDarkMode */
  themeStorageKey?: string;
};

const DarkroomUIContext = createContext<DarkroomUIConfig>({});

export type DarkroomUIProviderProps = {
  config?: DarkroomUIConfig;
  children: ReactNode;
};

export function DarkroomUIProvider({ config = {}, children }: DarkroomUIProviderProps) {
  return <DarkroomUIContext.Provider value={config}>{children}</DarkroomUIContext.Provider>;
}

export function useDarkroomUIConfig(): DarkroomUIConfig {
  return useContext(DarkroomUIContext);
}
