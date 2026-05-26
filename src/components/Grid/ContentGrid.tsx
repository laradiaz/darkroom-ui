import type { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { labClassName } from "../../utils/labClassName";
import { splitSlotClassName } from "../../utils/mergeSlotProps";
import { useLabUnstyled } from "../../utils/useLabUnstyled";
import styles from "./Grid.module.css";

export type ContentGridSlotProps = {
  root?: HTMLAttributes<HTMLDivElement>;
};

export type ContentGridProps = HTMLAttributes<HTMLDivElement> & {
  columns?: 2 | 3 | 4;
  unstyled?: boolean;
  slotProps?: ContentGridSlotProps;
};

export function ContentGrid({
  columns = 4,
  unstyled,
  slotProps,
  className,
  children,
  ...rest
}: ContentGridProps) {
  const isUnstyled = useLabUnstyled(unstyled);
  const rootSlot = splitSlotClassName(slotProps?.root);

  return (
    <div
      {...rest}
      {...rootSlot.rest}
      className={labClassName(
        isUnstyled,
        cn(styles.grid, styles[`cols${columns}`]),
        className,
        rootSlot.className,
      )}
    >
      {children}
    </div>
  );
}
