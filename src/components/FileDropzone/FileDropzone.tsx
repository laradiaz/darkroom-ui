import {
  useState,
  type ChangeEvent,
  type DragEvent,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../utils/cn";
import { labClassName } from "../../utils/labClassName";
import { splitSlotClassName } from "../../utils/mergeSlotProps";
import { useDarkroomUnstyled } from "../../utils/useDarkroomUnstyled";
import styles from "./FileDropzone.module.css";

export type FileDropzoneSlotProps = {
  root?: HTMLAttributes<HTMLLabelElement>;
  input?: InputHTMLAttributes<HTMLInputElement>;
  icon?: HTMLAttributes<SVGSVGElement>;
  label?: HTMLAttributes<HTMLParagraphElement>;
  hint?: HTMLAttributes<HTMLParagraphElement>;
  acceptedFormats?: HTMLAttributes<HTMLDivElement>;
};

export type FileDropzoneProps = {
  /** Selected / dropped files (one item unless `multiple`). */
  onFiles: (files: File[]) => void;
  /** Allowed types for the input and display chips (e.g. `.pdf`, `image/*`). */
  acceptedFormats?: string[];
  label?: string;
  loadingLabel?: string;
  hint?: string;
  loading?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  /** Skip CSS module classes; use your own `className` / `slotProps` */
  unstyled?: boolean;
  className?: string;
  "aria-label"?: string;
  /** Replace the default icon + label + format chips content */
  children?: ReactNode;
  slotProps?: FileDropzoneSlotProps;
};

/** Chip label from an accept token: `.pdf` → `PDF`, `image/*` → `IMAGE/*`. */
export function formatAcceptChip(token: string): string {
  return token.replace(/^\./, "").toUpperCase();
}

function UploadIcon({ className, ...rest }: HTMLAttributes<SVGSVGElement>) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      {...rest}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
      />
    </svg>
  );
}

export function FileDropzone({
  onFiles,
  acceptedFormats = [],
  label = "Drop a file here or click to browse",
  loadingLabel = "Processing file…",
  hint,
  loading = false,
  disabled = false,
  multiple = false,
  unstyled,
  className,
  children,
  slotProps,
  ...aria
}: FileDropzoneProps) {
  const isUnstyled = useDarkroomUnstyled(unstyled);
  const [dragging, setDragging] = useState(false);
  const isDisabled = disabled || loading;

  const rootSlot = splitSlotClassName(slotProps?.root);
  const inputSlot = splitSlotClassName(slotProps?.input);
  const iconSlot = splitSlotClassName(slotProps?.icon);
  const labelSlot = splitSlotClassName(slotProps?.label);
  const hintSlot = splitSlotClassName(slotProps?.hint);
  const formatsSlot = splitSlotClassName(slotProps?.acceptedFormats);

  const takeFiles = (fileList: FileList | null) => {
    if (!fileList?.length) return;
    const files = Array.from(fileList);
    onFiles(multiple ? files : files.slice(0, 1));
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    takeFiles(event.target.files);
    event.target.value = "";
  };

  const onDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(false);
    if (isDisabled) return;
    takeFiles(event.dataTransfer.files);
  };

  return (
    <label
      aria-label={aria["aria-label"] ?? label}
      aria-busy={loading || undefined}
      onDragOver={(event) => {
        event.preventDefault();
        if (!isDisabled) setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      {...rootSlot.rest}
      className={labClassName(
        isUnstyled,
        cn(styles.root, dragging && styles.dragging, isDisabled && styles.disabled),
        className,
        rootSlot.className,
      )}
    >
      <input
        type="file"
        accept={acceptedFormats.length > 0 ? acceptedFormats.join(",") : undefined}
        multiple={multiple}
        disabled={isDisabled}
        onChange={onInputChange}
        className={labClassName(isUnstyled, styles.input, undefined, inputSlot.className)}
        {...inputSlot.rest}
      />

      {children ?? (
        <>
          <UploadIcon
            {...iconSlot.rest}
            className={labClassName(isUnstyled, styles.icon, undefined, iconSlot.className)}
          />
          <div>
            <p
              {...labelSlot.rest}
              className={labClassName(isUnstyled, styles.label, undefined, labelSlot.className)}
            >
              {loading ? loadingLabel : label}
            </p>
            {hint ? (
              <p
                {...hintSlot.rest}
                className={labClassName(isUnstyled, styles.hint, undefined, hintSlot.className)}
              >
                {hint}
              </p>
            ) : null}
          </div>
          {acceptedFormats.length > 0 ? (
            <div
              {...formatsSlot.rest}
              className={labClassName(
                isUnstyled,
                styles.acceptedFormats,
                undefined,
                formatsSlot.className,
              )}
            >
              {acceptedFormats.map((format) => (
                <span key={format} className={labClassName(isUnstyled, styles.acceptedFormat)}>
                  {formatAcceptChip(format)}
                </span>
              ))}
            </div>
          ) : null}
        </>
      )}
    </label>
  );
}
