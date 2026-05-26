import type { HTMLAttributes, ImgHTMLAttributes, ReactNode } from "react";
import { labClassName } from "../../utils/labClassName";
import { splitSlotClassName } from "../../utils/mergeSlotProps";
import { useLabUnstyled } from "../../utils/useLabUnstyled";
import styles from "./Card.module.css";

export type MediaCardSlotProps = {
  root?: HTMLAttributes<HTMLDivElement>;
  image?: ImgHTMLAttributes<HTMLImageElement>;
  overlay?: HTMLAttributes<HTMLDivElement>;
};

export type MediaCardProps = HTMLAttributes<HTMLDivElement> & {
  image: string;
  imageAlt?: string;
  overlay?: ReactNode;
  unstyled?: boolean;
  slotProps?: MediaCardSlotProps;
};

export function MediaCard({
  image,
  imageAlt = "",
  overlay,
  unstyled,
  slotProps,
  className,
  children,
  ...rest
}: MediaCardProps) {
  const isUnstyled = useLabUnstyled(unstyled);
  const rootSlot = splitSlotClassName(slotProps?.root);
  const imageSlot = splitSlotClassName(slotProps?.image);
  const overlaySlot = splitSlotClassName(slotProps?.overlay);

  return (
    <div
      {...rest}
      {...rootSlot.rest}
      className={labClassName(isUnstyled, styles.mediaCard, className, rootSlot.className)}
    >
      <img
        src={image}
        alt={imageAlt}
        loading="lazy"
        {...imageSlot.rest}
        className={labClassName(isUnstyled, styles.mediaImage, undefined, imageSlot.className)}
      />
      {(overlay || children) && (
        <div
          {...overlaySlot.rest}
          className={labClassName(isUnstyled, styles.mediaOverlay, undefined, overlaySlot.className)}
        >
          {overlay ?? children}
        </div>
      )}
    </div>
  );
}
