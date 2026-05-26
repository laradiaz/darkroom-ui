import type { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { labClassName } from "../../utils/labClassName";
import { splitSlotClassName } from "../../utils/mergeSlotProps";
import { useLabUnstyled } from "../../utils/useLabUnstyled";
import styles from "./Typography.module.css";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type TypographyTone = "default" | "inverse";

export type HeadingSlotProps = {
  root?: HTMLAttributes<HTMLHeadingElement>;
};

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  level?: HeadingLevel;
  /** Use `inverse` on dark backgrounds (e.g. Hero). */
  tone?: TypographyTone;
  unstyled?: boolean;
  slotProps?: HeadingSlotProps;
};

const tagMap: Record<HeadingLevel, "h1" | "h2" | "h3" | "h4" | "h5" | "h6"> = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
};

export function Heading({
  level = 2,
  tone = "default",
  unstyled,
  slotProps,
  className,
  children,
  ...rest
}: HeadingProps) {
  const isUnstyled = useLabUnstyled(unstyled);
  const Tag = tagMap[level];
  const rootSlot = splitSlotClassName(slotProps?.root);

  return (
    <Tag
      {...rest}
      {...rootSlot.rest}
      className={labClassName(
        isUnstyled,
        cn(
          tone === "inverse" ? styles.headingInverse : styles.heading,
          styles[`h${level}`],
        ),
        className,
        rootSlot.className,
      )}
    >
      {children}
    </Tag>
  );
}
