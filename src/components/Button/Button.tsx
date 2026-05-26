import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { labClassName } from "../../utils/labClassName";
import { splitSlotClassName } from "../../utils/mergeSlotProps";
import { useDarkroomUnstyled } from "../../utils/useDarkroomUnstyled";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "ghost" | "link";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonSlotProps = {
  root?: ButtonHTMLAttributes<HTMLButtonElement>;
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Skip CSS module classes; use your own `className` */
  unstyled?: boolean;
  slotProps?: ButtonSlotProps;
};

export function Button({
  variant = "primary",
  size = "md",
  unstyled,
  slotProps,
  className,
  type = "button",
  children,
  ...rest
}: ButtonProps) {
  const isUnstyled = useDarkroomUnstyled(unstyled);
  const { className: slotClassName, rest: slotRoot } = splitSlotClassName(slotProps?.root);

  return (
    <button
      type={type}
      {...rest}
      {...slotRoot}
      className={labClassName(
        isUnstyled,
        cn(styles.button, styles[variant], styles[size]),
        className,
        slotClassName,
      )}
    >
      {children}
    </button>
  );
}
