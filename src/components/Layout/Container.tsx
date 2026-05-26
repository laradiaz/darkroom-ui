import type { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { labClassName } from "../../utils/labClassName";
import { splitSlotClassName } from "../../utils/mergeSlotProps";
import { useDarkroomUnstyled } from "../../utils/useDarkroomUnstyled";
import styles from "./Layout.module.css";

export type ContainerSize = "narrow" | "md" | "lg" | "xl" | "full";

export type ContainerSlotProps = {
  root?: HTMLAttributes<HTMLDivElement>;
};

export type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  /** Max content width. Default: `lg` (72rem). */
  size?: ContainerSize;
  unstyled?: boolean;
  slotProps?: ContainerSlotProps;
};

export function Container({
  size = "lg",
  unstyled,
  slotProps,
  className,
  children,
  ...rest
}: ContainerProps) {
  const isUnstyled = useDarkroomUnstyled(unstyled);
  const rootSlot = splitSlotClassName(slotProps?.root);

  return (
    <div
      {...rest}
      {...rootSlot.rest}
      className={labClassName(
        isUnstyled,
        cn(styles.container, styles[`container${capitalize(size)}`]),
        className,
        rootSlot.className,
      )}
    >
      {children}
    </div>
  );
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
