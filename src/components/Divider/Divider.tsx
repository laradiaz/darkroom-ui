import type { HTMLAttributes } from "react";
import { labClassName } from "../../utils/labClassName";
import { splitSlotClassName } from "../../utils/mergeSlotProps";
import { useDarkroomUnstyled } from "../../utils/useDarkroomUnstyled";
import styles from "./Divider.module.css";

export type DividerSlotProps = {
  root?: HTMLAttributes<HTMLDivElement>;
  text?: HTMLAttributes<HTMLSpanElement>;
};

export type DividerProps = HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
  unstyled?: boolean;
  slotProps?: DividerSlotProps;
};

export function Divider({
  children,
  unstyled,
  slotProps,
  className,
  ...rest
}: DividerProps) {
  const isUnstyled = useDarkroomUnstyled(unstyled);
  const rootSlot = splitSlotClassName(slotProps?.root);
  const textSlot = splitSlotClassName(slotProps?.text);

  return (
    <div
      role="separator"
      {...rest}
      {...rootSlot.rest}
      className={labClassName(isUnstyled, styles.divider, className, rootSlot.className)}
    >
      {children ? (
        <span
          {...textSlot.rest}
          className={labClassName(isUnstyled, styles.text, undefined, textSlot.className)}
        >
          {children}
        </span>
      ) : null}
    </div>
  );
}
