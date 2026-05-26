import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { labClassName } from "../../utils/labClassName";
import { splitSlotClassName } from "../../utils/mergeSlotProps";
import { useDarkroomUnstyled } from "../../utils/useDarkroomUnstyled";
import styles from "./Footer.module.css";

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterColumn = {
  title?: string;
  links: FooterLink[];
};

export type FooterSlotProps = {
  root?: HTMLAttributes<HTMLElement>;
  grid?: HTMLAttributes<HTMLDivElement>;
  column?: HTMLAttributes<HTMLDivElement>;
  columnTitle?: HTMLAttributes<HTMLHeadingElement>;
  link?: AnchorHTMLAttributes<HTMLAnchorElement>;
  newsletter?: HTMLAttributes<HTMLDivElement>;
  social?: HTMLAttributes<HTMLDivElement>;
  copyright?: HTMLAttributes<HTMLParagraphElement>;
};

export type FooterProps = {
  columns?: FooterColumn[];
  social?: ReactNode;
  newsletter?: ReactNode;
  copyright?: string;
  unstyled?: boolean;
  slotProps?: FooterSlotProps;
  className?: string;
};

export function Footer({
  columns = [],
  social,
  newsletter,
  copyright,
  unstyled,
  slotProps,
  className,
}: FooterProps) {
  const isUnstyled = useDarkroomUnstyled(unstyled);
  const rootSlot = splitSlotClassName(slotProps?.root);
  const gridSlot = splitSlotClassName(slotProps?.grid);
  const columnSlot = splitSlotClassName(slotProps?.column);
  const columnTitleSlot = splitSlotClassName(slotProps?.columnTitle);
  const linkSlot = splitSlotClassName(slotProps?.link);
  const newsletterSlot = splitSlotClassName(slotProps?.newsletter);
  const socialSlot = splitSlotClassName(slotProps?.social);
  const copyrightSlot = splitSlotClassName(slotProps?.copyright);

  return (
    <footer
      {...rootSlot.rest}
      className={labClassName(isUnstyled, styles.footer, className, rootSlot.className)}
    >
      <div
        {...gridSlot.rest}
        className={labClassName(isUnstyled, styles.grid, undefined, gridSlot.className)}
      >
        {columns.map((col, i) => (
          <div
            key={i}
            {...columnSlot.rest}
            className={labClassName(isUnstyled, styles.column, undefined, columnSlot.className)}
          >
            {col.title ? (
              <h4
                {...columnTitleSlot.rest}
                className={labClassName(
                  isUnstyled,
                  styles.columnTitle,
                  undefined,
                  columnTitleSlot.className,
                )}
              >
                {col.title}
              </h4>
            ) : null}
            <ul className={isUnstyled ? undefined : styles.linkList}>
              {col.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    {...linkSlot.rest}
                    className={labClassName(
                      isUnstyled,
                      styles.link,
                      undefined,
                      linkSlot.className,
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {newsletter ? (
          <div
            {...newsletterSlot.rest}
            className={labClassName(
              isUnstyled,
              styles.newsletter,
              undefined,
              newsletterSlot.className,
            )}
          >
            {newsletter}
          </div>
        ) : null}
      </div>
      {social ? (
        <div
          {...socialSlot.rest}
          className={labClassName(isUnstyled, styles.social, undefined, socialSlot.className)}
        >
          {social}
        </div>
      ) : null}
      {copyright ? (
        <p
          {...copyrightSlot.rest}
          className={labClassName(
            isUnstyled,
            styles.copyright,
            undefined,
            copyrightSlot.className,
          )}
        >
          {copyright}
        </p>
      ) : null}
    </footer>
  );
}
