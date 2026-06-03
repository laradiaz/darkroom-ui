import {
  useId,
  useState,
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { NavMenuButton, type NavMenuButtonProps } from "../Button";
import { cn } from "../../utils/cn";
import { labClassName } from "../../utils/labClassName";
import { splitSlotClassName } from "../../utils/mergeSlotProps";
import { useDarkroomUnstyled } from "../../utils/useDarkroomUnstyled";
import styles from "./NavBar.module.css";

export type NavItem = {
  label: string;
  href: string;
};

export type NavBarSlotProps = {
  root?: HTMLAttributes<HTMLElement>;
  logo?: HTMLAttributes<HTMLDivElement>;
  menuButton?: NavMenuButtonProps;
  nav?: HTMLAttributes<HTMLElement>;
  list?: HTMLAttributes<HTMLUListElement>;
  link?: AnchorHTMLAttributes<HTMLAnchorElement>;
  cta?: HTMLAttributes<HTMLDivElement>;
};

export type NavBarProps = HTMLAttributes<HTMLElement> & {
  logo?: ReactNode;
  items: NavItem[];
  cta?: ReactNode;
  unstyled?: boolean;
  slotProps?: NavBarSlotProps;
};

export function NavBar({
  logo,
  items,
  cta,
  unstyled,
  slotProps,
  className,
  ...rest
}: NavBarProps) {
  const isUnstyled = useDarkroomUnstyled(unstyled);
  const [open, setOpen] = useState(false);
  const navId = useId();

  const rootSlot = splitSlotClassName(slotProps?.root);
  const logoSlot = splitSlotClassName(slotProps?.logo);
  const menuButtonSlot = splitSlotClassName(slotProps?.menuButton);
  const navSlot = splitSlotClassName(slotProps?.nav);
  const listSlot = splitSlotClassName(slotProps?.list);
  const linkSlot = splitSlotClassName(slotProps?.link);
  const ctaSlot = splitSlotClassName(slotProps?.cta);

  return (
    <header
      {...rest}
      {...rootSlot.rest}
      className={labClassName(isUnstyled, styles.navBar, className, rootSlot.className)}
    >
      {logo ? (
        <div
          {...logoSlot.rest}
          className={labClassName(isUnstyled, styles.logo, undefined, logoSlot.className)}
        >
          {logo}
        </div>
      ) : null}
      <NavMenuButton
        unstyled={isUnstyled}
        aria-expanded={open}
        aria-controls={navId}
        onClick={() => setOpen((v) => !v)}
        {...menuButtonSlot.rest}
        className={menuButtonSlot.className}
      />
      <nav
        id={navId}
        aria-label="Main navigation"
        {...navSlot.rest}
        className={labClassName(
          isUnstyled,
          cn(styles.nav, open && styles.navOpen),
          undefined,
          navSlot.className,
        )}
      >
        <ul
          {...listSlot.rest}
          className={labClassName(isUnstyled, styles.list, undefined, listSlot.className)}
        >
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                {...linkSlot.rest}
                className={labClassName(isUnstyled, styles.link, undefined, linkSlot.className)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        {cta ? (
          <div
            {...ctaSlot.rest}
            className={labClassName(isUnstyled, styles.cta, undefined, ctaSlot.className)}
          >
            {cta}
          </div>
        ) : null}
      </nav>
    </header>
  );
}
