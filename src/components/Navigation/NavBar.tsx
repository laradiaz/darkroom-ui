import {
  useId,
  useState,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../utils/cn";
import { labClassName } from "../../utils/labClassName";
import { splitSlotClassName } from "../../utils/mergeSlotProps";
import { useLabUnstyled } from "../../utils/useLabUnstyled";
import styles from "./NavBar.module.css";

export type NavItem = {
  label: string;
  href: string;
};

export type NavBarSlotProps = {
  root?: HTMLAttributes<HTMLElement>;
  logo?: HTMLAttributes<HTMLDivElement>;
  menuButton?: ButtonHTMLAttributes<HTMLButtonElement>;
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
  const isUnstyled = useLabUnstyled(unstyled);
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
      <button
        type="button"
        aria-expanded={open}
        aria-controls={navId}
        onClick={() => setOpen((v) => !v)}
        {...menuButtonSlot.rest}
        className={labClassName(
          isUnstyled,
          styles.menuButton,
          undefined,
          menuButtonSlot.className,
        )}
      >
        <span className={isUnstyled ? undefined : styles.menuIcon} aria-hidden>
          <span />
          <span />
          <span />
        </span>
        <span className={isUnstyled ? undefined : styles.visuallyHidden}>Toggle menu</span>
      </button>
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
