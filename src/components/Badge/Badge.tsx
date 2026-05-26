import type { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { labClassName } from "../../utils/labClassName";
import { splitSlotClassName } from "../../utils/mergeSlotProps";
import { useLabUnstyled } from "../../utils/useLabUnstyled";
import styles from "./Badge.module.css";

export type BadgeVariant = "default" | "stamp" | "outline";
export type BadgeOrientation = "straight" | "tilted";
/** Green stamp or terracotta accent. `neutral` is outline-only (foreground border). */
export type BadgeTone = "stamp" | "accent" | "neutral";

export type BadgeSlotProps = {
  root?: HTMLAttributes<HTMLSpanElement>;
};

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  orientation?: BadgeOrientation;
  tone?: BadgeTone;
  unstyled?: boolean;
  slotProps?: BadgeSlotProps;
};

function resolveTone(variant: BadgeVariant, tone?: BadgeTone): BadgeTone {
  if (tone) return tone;
  if (variant === "stamp") return "stamp";
  return "neutral";
}

export function Badge({
  variant = "default",
  orientation = "straight",
  tone,
  unstyled,
  slotProps,
  className,
  children,
  ...rest
}: BadgeProps) {
  const isUnstyled = useLabUnstyled(unstyled);
  const isBordered = variant === "stamp" || variant === "outline";
  const resolvedTone = resolveTone(variant, tone);
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
          variant !== "default" && resolvedTone === "stamp" && styles.toneStamp,
          variant !== "default" && resolvedTone === "accent" && styles.toneAccent,
          isBordered && orientation === "tilted" && styles.tilted,
        ),
        className,
        rootSlot.className,
      )}
    >
      {children}
    </span>
  );
}
