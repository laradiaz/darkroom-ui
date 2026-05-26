import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { useDarkroomUIConfig } from "../../config/DarkroomUIProvider";
import { cn } from "../../utils/cn";
import { labClassName } from "../../utils/labClassName";
import { splitSlotClassName } from "../../utils/mergeSlotProps";
import { useDarkroomUnstyled } from "../../utils/useDarkroomUnstyled";
import { SocialPlatformIcon, socialPlatformLabels, type SocialPlatform } from "./icons";
import styles from "./SocialLink.module.css";

export type { SocialPlatform } from "./icons";

export type SocialLinkMode = "icon" | "text";

export type SocialLinkSlotProps = {
  root?: AnchorHTMLAttributes<HTMLAnchorElement>;
  icon?: HTMLAttributes<HTMLSpanElement>;
  platform?: HTMLAttributes<HTMLSpanElement>;
  label?: HTMLAttributes<HTMLSpanElement>;
};

export type SocialLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & {
  platform: SocialPlatform;
  /** `icon` — platform icon only. `text` — labels only. Default: from provider or `icon`. */
  mode?: SocialLinkMode;
  /** Override the default platform label (e.g. "YouTube"). Used for text mode and icon `aria-label`. */
  platformLabel?: string;
  /** Secondary line in text mode. Defaults to the platform label. */
  children?: ReactNode;
  unstyled?: boolean;
  slotProps?: SocialLinkSlotProps;
};

export function SocialLink({
  platform,
  mode,
  platformLabel,
  children,
  unstyled,
  slotProps,
  className,
  ...rest
}: SocialLinkProps) {
  const isUnstyled = useDarkroomUnstyled(unstyled);
  const { socialLinkMode: defaultMode } = useDarkroomUIConfig();
  const resolvedMode = mode ?? defaultMode ?? "icon";
  const label = platformLabel ?? socialPlatformLabels[platform];
  const secondary = children ?? label;

  const rootSlot = splitSlotClassName(slotProps?.root);
  const iconSlot = splitSlotClassName(slotProps?.icon);
  const platformSlot = splitSlotClassName(slotProps?.platform);
  const labelSlot = splitSlotClassName(slotProps?.label);

  if (resolvedMode === "icon") {
    return (
      <a
        aria-label={label}
        {...rest}
        {...rootSlot.rest}
        className={labClassName(
          isUnstyled,
          cn(styles.link, styles.linkIcon),
          className,
          rootSlot.className,
        )}
      >
        <span
          {...iconSlot.rest}
          className={labClassName(isUnstyled, styles.icon, undefined, iconSlot.className)}
        >
          <SocialPlatformIcon platform={platform} />
        </span>
      </a>
    );
  }

  return (
    <a
      {...rest}
      {...rootSlot.rest}
      className={labClassName(
        isUnstyled,
        cn(styles.link, styles.linkText),
        className,
        rootSlot.className,
      )}
    >
      <span
        {...platformSlot.rest}
        className={labClassName(isUnstyled, styles.platform, undefined, platformSlot.className)}
      >
        {label}
      </span>
      {secondary ? (
        <span
          {...labelSlot.rest}
          className={labClassName(isUnstyled, styles.label, undefined, labelSlot.className)}
        >
          {secondary}
        </span>
      ) : null}
    </a>
  );
}
