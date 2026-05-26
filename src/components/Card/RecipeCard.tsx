import type { AnchorHTMLAttributes, HTMLAttributes, ImgHTMLAttributes } from "react";
import { Label } from "../Typography";
import { labClassName } from "../../utils/labClassName";
import { splitSlotClassName } from "../../utils/mergeSlotProps";
import { useDarkroomUnstyled } from "../../utils/useDarkroomUnstyled";
import styles from "./Card.module.css";

export type RecipeCardSlotProps = {
  root?: AnchorHTMLAttributes<HTMLAnchorElement>;
  imageWrap?: HTMLAttributes<HTMLDivElement>;
  image?: ImgHTMLAttributes<HTMLImageElement>;
  content?: HTMLAttributes<HTMLDivElement>;
  title?: HTMLAttributes<HTMLHeadingElement>;
  subtitle?: HTMLAttributes<HTMLParagraphElement>;
};

export type RecipeCardProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  image: string;
  imageAlt?: string;
  category: string;
  title: string;
  subtitle?: string;
  href: string;
  unstyled?: boolean;
  slotProps?: RecipeCardSlotProps;
};

export function RecipeCard({
  image,
  imageAlt = "",
  category,
  title,
  subtitle,
  href,
  unstyled,
  slotProps,
  className,
  ...rest
}: RecipeCardProps) {
  const isUnstyled = useDarkroomUnstyled(unstyled);
  const rootSlot = splitSlotClassName(slotProps?.root);
  const imageWrapSlot = splitSlotClassName(slotProps?.imageWrap);
  const imageSlot = splitSlotClassName(slotProps?.image);
  const contentSlot = splitSlotClassName(slotProps?.content);
  const titleSlot = splitSlotClassName(slotProps?.title);
  const subtitleSlot = splitSlotClassName(slotProps?.subtitle);

  return (
    <a
      href={href}
      {...rest}
      {...rootSlot.rest}
      className={labClassName(isUnstyled, styles.recipeCard, className, rootSlot.className)}
    >
      <div
        {...imageWrapSlot.rest}
        className={labClassName(isUnstyled, styles.imageWrap, undefined, imageWrapSlot.className)}
      >
        <img
          src={image}
          alt={imageAlt || title}
          loading="lazy"
          {...imageSlot.rest}
          className={labClassName(isUnstyled, styles.image, undefined, imageSlot.className)}
        />
      </div>
      <div
        {...contentSlot.rest}
        className={labClassName(isUnstyled, styles.content, undefined, contentSlot.className)}
      >
        <Label unstyled={isUnstyled}>{category}</Label>
        <h3
          {...titleSlot.rest}
          className={labClassName(isUnstyled, styles.title, undefined, titleSlot.className)}
        >
          {title}
        </h3>
        {subtitle ? (
          <p
            {...subtitleSlot.rest}
            className={labClassName(isUnstyled, styles.subtitle, undefined, subtitleSlot.className)}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
    </a>
  );
}
