import {
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
} from "react";
import { cn } from "../../utils/cn";
import { labClassName } from "../../utils/labClassName";
import { splitSlotClassName } from "../../utils/mergeSlotProps";
import { useDarkroomUnstyled } from "../../utils/useDarkroomUnstyled";
import { useStableId } from "../../utils/useStableId";
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

function clampIndex(index: number, length: number) {
  if (length <= 0) return 0;
  return Math.max(0, Math.min(index, length - 1));
}

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
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listId = useStableId();
  const selected = options.find((option) => option.value === value);
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );
  const label = selected?.label ?? (placeholder && !value ? placeholder : options[0]?.label ?? value);
  const isPlaceholder = Boolean(placeholder && !value && !selected);
  const activeOptionId = open && options[activeIndex] ? `${listId}-opt-${activeIndex}` : undefined;

  const rootSlot = splitSlotClassName(slotProps?.root);
  const triggerSlot = splitSlotClassName(slotProps?.trigger);
  const listSlot = splitSlotClassName(slotProps?.list);
  const optionSlot = splitSlotClassName(slotProps?.option);

  const openList = (index = selectedIndex) => {
    setActiveIndex(clampIndex(index, options.length));
    setOpen(true);
  };

  const closeList = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  const selectIndex = (index: number) => {
    const option = options[index];
    if (!option) return;
    onChange(option.value);
    closeList();
  };

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!open) openList(selectedIndex);
        else setActiveIndex((i) => clampIndex(i + 1, options.length));
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!open) openList(selectedIndex);
        else setActiveIndex((i) => clampIndex(i - 1, options.length));
        break;
      case "Home":
        if (!open) return;
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        if (!open) return;
        event.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case "Enter":
      case " ":
        if (!open) return;
        event.preventDefault();
        selectIndex(activeIndex);
        break;
      case "Escape":
        if (!open) return;
        event.preventDefault();
        closeList();
        break;
      default:
        break;
    }
  };

  return (
    <div
      ref={rootRef}
      {...rootSlot.rest}
      className={labClassName(isUnstyled, styles.root, className, rootSlot.className)}
    >
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={activeOptionId}
        aria-label={aria["aria-label"]}
        onClick={() => (open ? closeList() : openList())}
        onKeyDown={onTriggerKeyDown}
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
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isActive = index === activeIndex;
            return (
              <li
                key={option.value}
                id={`${listId}-opt-${index}`}
                role="option"
                aria-selected={isSelected}
              >
                <button
                  type="button"
                  tabIndex={-1}
                  {...optionSlot.rest}
                  className={labClassName(
                    isUnstyled,
                    cn(
                      styles.option,
                      isSelected && styles.optionSelected,
                      isActive && styles.optionActive,
                    ),
                    undefined,
                    optionSlot.className,
                  )}
                  onClick={() => selectIndex(index)}
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
