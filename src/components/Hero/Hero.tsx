import type {
  HTMLAttributes,
  ImgHTMLAttributes,
  ReactNode,
  VideoHTMLAttributes,
} from "react";
import { labClassName } from "../../utils/labClassName";
import { splitSlotClassName } from "../../utils/mergeSlotProps";
import { useLabUnstyled } from "../../utils/useLabUnstyled";
import styles from "./Hero.module.css";

export type HeroSlotProps = {
  root?: HTMLAttributes<HTMLElement>;
  media?: ImgHTMLAttributes<HTMLImageElement> & VideoHTMLAttributes<HTMLVideoElement>;
  overlay?: HTMLAttributes<HTMLDivElement>;
  content?: HTMLAttributes<HTMLDivElement>;
};

export type HeroProps = HTMLAttributes<HTMLElement> & {
  image?: string;
  imageAlt?: string;
  videoSrc?: string;
  children?: ReactNode;
  /** Accessible name when the hero has no visible heading inside */
  "aria-label"?: string;
  unstyled?: boolean;
  slotProps?: HeroSlotProps;
};

export function Hero({
  image,
  imageAlt,
  videoSrc,
  children,
  className,
  unstyled,
  slotProps,
  "aria-label": ariaLabel,
  ...rest
}: HeroProps) {
  const isUnstyled = useLabUnstyled(unstyled);
  const hasMedia = Boolean(videoSrc || image);
  const alt = imageAlt ?? (image ? "" : undefined);

  const rootSlot = splitSlotClassName(slotProps?.root);
  const mediaSlot = splitSlotClassName(slotProps?.media);
  const overlaySlot = splitSlotClassName(slotProps?.overlay);
  const contentSlot = splitSlotClassName(slotProps?.content);

  return (
    <section
      aria-label={ariaLabel}
      {...rest}
      {...rootSlot.rest}
      className={labClassName(isUnstyled, styles.hero, className, rootSlot.className)}
    >
      {videoSrc ? (
        <video
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
          {...mediaSlot.rest}
          className={labClassName(isUnstyled, styles.media, undefined, mediaSlot.className)}
        />
      ) : image ? (
        <img
          src={image}
          alt={alt ?? ""}
          decoding="async"
          fetchPriority="high"
          {...mediaSlot.rest}
          className={labClassName(isUnstyled, styles.media, undefined, mediaSlot.className)}
        />
      ) : null}
      {hasMedia ? (
        <div
          aria-hidden
          {...overlaySlot.rest}
          className={labClassName(isUnstyled, styles.overlay, undefined, overlaySlot.className)}
        />
      ) : null}
      {children ? (
        <div
          {...contentSlot.rest}
          className={labClassName(isUnstyled, styles.content, undefined, contentSlot.className)}
        >
          {children}
        </div>
      ) : null}
    </section>
  );
}
