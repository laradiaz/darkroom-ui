import { useId, type HTMLAttributes, type ImgHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { labClassName } from "../../utils/labClassName";
import { splitSlotClassName } from "../../utils/mergeSlotProps";
import { useLabUnstyled } from "../../utils/useLabUnstyled";
import styles from "./Figure.module.css";

export type FigureAspect = "square" | "video" | "portrait" | "wide";

export type FigureSlotProps = {
  root?: HTMLAttributes<HTMLElement>;
  imageWrap?: HTMLAttributes<HTMLDivElement>;
  image?: ImgHTMLAttributes<HTMLImageElement>;
  overlay?: HTMLAttributes<HTMLDivElement>;
  caption?: HTMLAttributes<HTMLElement>;
};

export type FigureProps = HTMLAttributes<HTMLElement> & {
  src: string;
  alt: string;
  caption?: string;
  aspect?: FigureAspect;
  overlay?: React.ReactNode;
  unstyled?: boolean;
  slotProps?: FigureSlotProps;
};

export function Figure({
  src,
  alt,
  caption,
  aspect = "video",
  overlay,
  unstyled,
  slotProps,
  className,
  ...rest
}: FigureProps) {
  const isUnstyled = useLabUnstyled(unstyled);
  const captionId = useId();
  const rootSlot = splitSlotClassName(slotProps?.root);
  const imageWrapSlot = splitSlotClassName(slotProps?.imageWrap);
  const imageSlot = splitSlotClassName(slotProps?.image);
  const overlaySlot = splitSlotClassName(slotProps?.overlay);
  const captionSlot = splitSlotClassName(slotProps?.caption);

  return (
    <figure
      {...rest}
      {...rootSlot.rest}
      className={labClassName(
        isUnstyled,
        cn(styles.figure, styles[aspect]),
        className,
        rootSlot.className,
      )}
    >
      <div
        {...imageWrapSlot.rest}
        className={labClassName(isUnstyled, styles.imageWrap, undefined, imageWrapSlot.className)}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          aria-describedby={caption ? captionId : undefined}
          {...imageSlot.rest}
          className={labClassName(isUnstyled, styles.image, undefined, imageSlot.className)}
        />
        {overlay ? (
          <div
            {...overlaySlot.rest}
            className={labClassName(isUnstyled, styles.overlay, undefined, overlaySlot.className)}
          >
            {overlay}
          </div>
        ) : null}
      </div>
      {caption ? (
        <figcaption
          id={captionId}
          {...captionSlot.rest}
          className={labClassName(isUnstyled, styles.caption, undefined, captionSlot.className)}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
