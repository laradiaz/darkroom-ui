import type { FormHTMLAttributes, InputHTMLAttributes } from "react";
import { Button, type ButtonProps } from "../Button";
import { labClassName } from "../../utils/labClassName";
import { splitSlotClassName } from "../../utils/mergeSlotProps";
import { useDarkroomUnstyled } from "../../utils/useDarkroomUnstyled";
import styles from "./NewsletterSignup.module.css";

export type NewsletterSignupSlotProps = {
  root?: FormHTMLAttributes<HTMLFormElement>;
  input?: InputHTMLAttributes<HTMLInputElement>;
  submit?: ButtonProps;
};

export type NewsletterSignupProps = Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> & {
  submitLabel?: string;
  placeholder?: string;
  /** Accessible name for the form. Default: "Newsletter signup" */
  formLabel?: string;
  onSubmit?: (email: string) => void;
  unstyled?: boolean;
  slotProps?: NewsletterSignupSlotProps;
};

export function NewsletterSignup({
  submitLabel = "Join",
  placeholder = "your@email.com",
  formLabel = "Newsletter signup",
  onSubmit,
  unstyled,
  slotProps,
  className,
  ...rest
}: NewsletterSignupProps) {
  const isUnstyled = useDarkroomUnstyled(unstyled);
  const rootSlot = splitSlotClassName(slotProps?.root);
  const inputSlot = splitSlotClassName(slotProps?.input);
  const submitSlot = slotProps?.submit ?? {};

  return (
    <form
      aria-label={formLabel}
      {...rest}
      {...rootSlot.rest}
      className={labClassName(isUnstyled, styles.form, className, rootSlot.className)}
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const input = form.elements.namedItem("email") as HTMLInputElement;
        onSubmit?.(input.value);
      }}
    >
      <input
        type="email"
        name="email"
        required
        placeholder={placeholder}
        aria-label="Email address"
        {...inputSlot.rest}
        className={labClassName(isUnstyled, styles.input, undefined, inputSlot.className)}
      />
      <Button type="submit" variant="primary" size="md" unstyled={isUnstyled} {...submitSlot}>
        {submitLabel}
      </Button>
    </form>
  );
}
