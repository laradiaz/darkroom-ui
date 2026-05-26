import type { HTMLAttributes } from "react";
import { labClassName } from "../../utils/labClassName";
import { splitSlotClassName } from "../../utils/mergeSlotProps";
import { useLabUnstyled } from "../../utils/useLabUnstyled";
import styles from "./Layout.module.css";

export type PageSlotProps = {
  root?: HTMLAttributes<HTMLDivElement>;
};

export type PageProps = HTMLAttributes<HTMLDivElement> & {
  unstyled?: boolean;
  slotProps?: PageSlotProps;
};

/** Root page shell — min height, paper background, default text color. */
export function Page({ unstyled, slotProps, className, children, ...rest }: PageProps) {
  const isUnstyled = useLabUnstyled(unstyled);
  const rootSlot = splitSlotClassName(slotProps?.root);

  return (
    <div
      {...rest}
      {...rootSlot.rest}
      className={labClassName(isUnstyled, styles.page, className, rootSlot.className)}
    >
      {children}
    </div>
  );
}
