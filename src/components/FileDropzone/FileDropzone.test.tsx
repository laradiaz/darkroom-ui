import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { FileDropzone } from "./FileDropzone";

afterEach(cleanup);

describe("FileDropzone", () => {
  it("calls onFile from input change", async () => {
    const user = userEvent.setup();
    const onFile = vi.fn();
    const { container } = render(<FileDropzone onFile={onFile} label="Upload" />);

    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(["hello"], "note.txt", { type: "text/plain" });
    await user.upload(input, file);

    expect(onFile).toHaveBeenCalledTimes(1);
    expect(onFile.mock.calls[0][0].name).toBe("note.txt");
  });

  it("calls onFile from drop", () => {
    const onFile = vi.fn();
    const { container } = render(
      <FileDropzone onFile={onFile} label="Drop here" aria-label="File dropzone" />,
    );

    const dropzone = container.querySelector("label") as HTMLLabelElement;
    const file = new File(["x"], "drop.csv", { type: "text/csv" });
    fireEvent.drop(dropzone, {
      dataTransfer: { files: [file] },
    });

    expect(onFile).toHaveBeenCalledTimes(1);
    expect(onFile.mock.calls[0][0].name).toBe("drop.csv");
  });

  it("does not call onFile when disabled or loading", async () => {
    const user = userEvent.setup();
    const onFile = vi.fn();

    const disabled = render(
      <FileDropzone onFile={onFile} disabled label="Browse" aria-label="Disabled zone" />,
    );
    const disabledInput = disabled.container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    expect(disabledInput).toBeDisabled();
    fireEvent.drop(disabled.container.querySelector("label") as HTMLLabelElement, {
      dataTransfer: { files: [new File(["x"], "a.txt")] },
    });
    disabled.unmount();

    const loading = render(
      <FileDropzone onFile={onFile} loading label="Browse" aria-label="Loading zone" />,
    );
    const loadingInput = loading.container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    expect(loadingInput).toBeDisabled();
    expect(screen.getByText("Processing file…")).toBeInTheDocument();
    fireEvent.drop(loading.container.querySelector("label") as HTMLLabelElement, {
      dataTransfer: { files: [new File(["x"], "b.txt")] },
    });
    await user.upload(loadingInput, new File(["x"], "c.txt"));

    expect(onFile).not.toHaveBeenCalled();
  });
});
