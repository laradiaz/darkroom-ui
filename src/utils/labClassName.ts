import { cn } from "./cn";

/** Apply CSS module classes unless the component (or provider) is unstyled. */
export function labClassName(
  isUnstyled: boolean,
  styled: string | false | undefined,
  className?: string,
  slotClassName?: string,
): string | undefined {
  if (isUnstyled) return cn(className, slotClassName);
  return cn(styled, className, slotClassName);
}
