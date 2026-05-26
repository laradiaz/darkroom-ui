import type { HTMLAttributes } from "react";
import { labClassName } from "../../utils/labClassName";
import { splitSlotClassName } from "../../utils/mergeSlotProps";
import { useLabUnstyled } from "../../utils/useLabUnstyled";
import styles from "./Typography.module.css";

export type LabelSlotProps = {
  root?: HTMLAttributes<HTMLSpanElement>;
};

export type LabelProps = HTMLAttributes<HTMLSpanElement> & {
  unstyled?: boolean;
  slotProps?: LabelSlotProps;
};

export function Label({ unstyled, slotProps, className, children, ...rest }: LabelProps) {
  const isUnstyled = useLabUnstyled(unstyled);
  const rootSlot = splitSlotClassName(slotProps?.root);

  return (
    <span
      {...rest}
      {...rootSlot.rest}
      className={labClassName(isUnstyled, styles.label, className, rootSlot.className)}
    >
      {children}
    </span>
  );
}
