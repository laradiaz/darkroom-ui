import type { HTMLAttributes } from "react";
import { useDarkroomUIConfig } from "../../config/DarkroomUIProvider";
import { cn } from "../../utils/cn";
import { labClassName } from "../../utils/labClassName";
import { splitSlotClassName } from "../../utils/mergeSlotProps";
import { useDarkroomUnstyled } from "../../utils/useDarkroomUnstyled";
import { Container, type ContainerSize } from "./Container";
import styles from "./Layout.module.css";

export type SectionSpacing = "none" | "sm" | "md" | "lg" | "xl";

export type SectionSlotProps = {
  root?: HTMLAttributes<HTMLElement>;
};

export type SectionProps = HTMLAttributes<HTMLElement> & {
  /** Vertical padding. Default: `lg`. */
  spacing?: SectionSpacing;
  /** Wrap children in a centered Container. Default: `true`. */
  contained?: boolean;
  /** Container width when `contained` is true. Default: provider or `lg`. */
  containerSize?: ContainerSize;
  unstyled?: boolean;
  slotProps?: SectionSlotProps;
};

export function Section({
  spacing = "lg",
  contained = true,
  containerSize,
  unstyled,
  slotProps,
  className,
  children,
  ...rest
}: SectionProps) {
  const isUnstyled = useDarkroomUnstyled(unstyled);
  const { containerSize: defaultContainerSize } = useDarkroomUIConfig();
  const resolvedSize = containerSize ?? defaultContainerSize ?? "lg";
  const rootSlot = splitSlotClassName(slotProps?.root);

  return (
    <section
      {...rest}
      {...rootSlot.rest}
      className={labClassName(
        isUnstyled,
        cn(styles.section, styles[`section${capitalize(spacing)}`]),
        className,
        rootSlot.className,
      )}
    >
      {contained ? (
        <Container size={resolvedSize} unstyled={isUnstyled}>
          {children}
        </Container>
      ) : (
        children
      )}
    </section>
  );
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
