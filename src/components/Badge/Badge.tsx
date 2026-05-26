import type { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { labClassName } from "../../utils/labClassName";
import { splitSlotClassName } from "../../utils/mergeSlotProps";
import { useDarkroomUnstyled } from "../../utils/useDarkroomUnstyled";
import styles from "./Badge.module.css";

export type BadgeVariant = "default" | "stamp" | "outline";
export type BadgeOrientation = "straight" | "tilted";

export type BadgeSlotProps = {
  root?: HTMLAttributes<HTMLSpanElement>;
};

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  orientation?: BadgeOrientation;
  unstyled?: boolean;
  slotProps?: BadgeSlotProps;
};

export function Badge({
  variant = "default",
  orientation = "straight",
  unstyled,
  slotProps,
  className,
  children,
  ...rest
}: BadgeProps) {
  const isUnstyled = useDarkroomUnstyled(unstyled);
  const rootSlot = splitSlotClassName(slotProps?.root);

  return (
    <span
      {...rest}
      {...rootSlot.rest}
      className={labClassName(
        isUnstyled,
        cn(
          styles.badge,
          styles[variant],
          orientation === "tilted" && variant !== "default" && styles.tilted,
        ),
        className,
        rootSlot.className,
      )}
    >
      {children}
    </span>
  );
}
