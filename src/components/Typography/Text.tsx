import type { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { labClassName } from "../../utils/labClassName";
import { splitSlotClassName } from "../../utils/mergeSlotProps";
import { useDarkroomUnstyled } from "../../utils/useDarkroomUnstyled";
import styles from "./Typography.module.css";

export type TextSize = "body" | "subtitle" | "caption";
export type TypographyTone = "default" | "inverse";

export type TextSlotProps = {
  root?: HTMLAttributes<HTMLParagraphElement>;
};

export type TextProps = HTMLAttributes<HTMLParagraphElement> & {
  size?: TextSize;
  as?: "p" | "span" | "div";
  /** Use `inverse` on dark backgrounds (e.g. Hero). */
  tone?: TypographyTone;
  unstyled?: boolean;
  slotProps?: TextSlotProps;
};

const inverseSizeClass: Record<TextSize, string> = {
  body: "bodyInverse",
  subtitle: "subtitleInverse",
  caption: "captionInverse",
};

export function Text({
  size = "body",
  tone = "default",
  as: Tag = "p",
  unstyled,
  slotProps,
  className,
  children,
  ...rest
}: TextProps) {
  const isUnstyled = useDarkroomUnstyled(unstyled);
  const rootSlot = splitSlotClassName(slotProps?.root);

  return (
    <Tag
      {...rest}
      {...rootSlot.rest}
      className={labClassName(
        isUnstyled,
        cn(
          tone === "inverse" ? styles.textInverse : styles.text,
          tone === "inverse" ? styles[inverseSizeClass[size]] : styles[size],
        ),
        className,
        rootSlot.className,
      )}
    >
      {children}
    </Tag>
  );
}
