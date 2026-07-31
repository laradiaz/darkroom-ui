import { useEffect, useId, useRef, useState, type ButtonHTMLAttributes, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { labClassName } from "../../utils/labClassName";
import { splitSlotClassName } from "../../utils/mergeSlotProps";
import { useDarkroomUnstyled } from "../../utils/useDarkroomUnstyled";
import styles from "./Select.module.css";

export type SelectOption = {
  label: string;
  value: string;
};

export type SelectSlotProps = {
  root?: HTMLAttributes<HTMLDivElement>;
  trigger?: ButtonHTMLAttributes<HTMLButtonElement>;
  list?: HTMLAttributes<HTMLUListElement>;
  option?: ButtonHTMLAttributes<HTMLButtonElement>;
};

export type SelectProps = {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  /** Skip CSS module classes; use your own `className` / `slotProps` */
  unstyled?: boolean;
  className?: string;
  "aria-label"?: string;
  slotProps?: SelectSlotProps;
};

export function Select({
  value,
  options,
  onChange,
  placeholder,
  disabled = false,
  unstyled,
  className,
  slotProps,
  ...aria
}: SelectProps) {
  const isUnstyled = useDarkroomUnstyled(unstyled);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = options.find((option) => option.value === value);
  const label = selected?.label ?? (placeholder && !value ? placeholder : options[0]?.label ?? value);
  const isPlaceholder = Boolean(placeholder && !value && !selected);

  const rootSlot = splitSlotClassName(slotProps?.root);
  const triggerSlot = splitSlotClassName(slotProps?.trigger);
  const listSlot = splitSlotClassName(slotProps?.list);
  const optionSlot = splitSlotClassName(slotProps?.option);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      {...rootSlot.rest}
      className={labClassName(isUnstyled, styles.root, className, rootSlot.className)}
    >
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={aria["aria-label"]}
        onClick={() => setOpen((current) => !current)}
        {...triggerSlot.rest}
        className={labClassName(isUnstyled, styles.trigger, undefined, triggerSlot.className)}
      >
        <span className={labClassName(isUnstyled, isPlaceholder ? styles.placeholder : undefined)}>
          {label}
        </span>
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          className={labClassName(
            isUnstyled,
            cn(styles.chevron, open && styles.chevronOpen),
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 8l4 4 4-4" />
        </svg>
      </button>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          {...listSlot.rest}
          className={labClassName(isUnstyled, styles.list, undefined, listSlot.className)}
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <li key={option.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  {...optionSlot.rest}
                  className={labClassName(
                    isUnstyled,
                    cn(styles.option, isSelected && styles.optionSelected),
                    undefined,
                    optionSlot.className,
                  )}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                >
                  <span>{option.label}</span>
                  {isSelected ? (
                    <span className={labClassName(isUnstyled, styles.check)} aria-hidden>
                      ✓
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
