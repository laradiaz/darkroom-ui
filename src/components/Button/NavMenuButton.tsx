import type { ButtonHTMLAttributes, ReactNode } from "react";
import { labClassName } from "../../utils/labClassName";
import { splitSlotClassName } from "../../utils/mergeSlotProps";
import { useDarkroomUnstyled } from "../../utils/useDarkroomUnstyled";
import styles from "./NavMenuButton.module.css";

export type NavMenuButtonSlotProps = {
  root?: ButtonHTMLAttributes<HTMLButtonElement>;
};

export type NavMenuButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Screen reader label. Default: "Toggle menu" */
  label?: string;
  /** Custom icon content; default is a three-bar menu icon */
  icon?: ReactNode;
  unstyled?: boolean;
  slotProps?: NavMenuButtonSlotProps;
};

export function NavMenuButton({
  label = "Toggle menu",
  icon,
  unstyled,
  slotProps,
  className,
  type = "button",
  children,
  ...rest
}: NavMenuButtonProps) {
  const isUnstyled = useDarkroomUnstyled(unstyled);
  const { className: slotClassName, rest: slotRoot } = splitSlotClassName(slotProps?.root);

  const defaultIcon = (
    <span className={isUnstyled ? undefined : styles.menuIcon} aria-hidden>
      <span />
      <span />
      <span />
    </span>
  );

  return (
    <button
      type={type}
      {...rest}
      {...slotRoot}
      className={labClassName(
        isUnstyled,
        styles.navMenuButton,
        className,
        slotClassName,
      )}
    >
      {children ?? (
        <>
          {icon ?? defaultIcon}
          <span className={isUnstyled ? undefined : styles.visuallyHidden}>{label}</span>
        </>
      )}
    </button>
  );
}
