import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { FileDropzone, formatAcceptChip } from "./FileDropzone";

afterEach(cleanup);

describe("formatAcceptChip", () => {
  it("strips a leading dot and uppercases", () => {
    expect(formatAcceptChip(".pdf")).toBe("PDF");
    expect(formatAcceptChip("image/*")).toBe("IMAGE/*");
  });
});

describe("FileDropzone", () => {
  it("calls onFiles from input change", async () => {
    const user = userEvent.setup();
    const onFiles = vi.fn();
    const { container } = render(<FileDropzone onFiles={onFiles} label="Upload" />);

    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(["hello"], "note.txt", { type: "text/plain" });
    await user.upload(input, file);

    expect(onFiles).toHaveBeenCalledTimes(1);
    expect(onFiles.mock.calls[0][0]).toHaveLength(1);
    expect(onFiles.mock.calls[0][0][0].name).toBe("note.txt");
  });

  it("wires acceptedFormats to input accept and chips", () => {
    const { container } = render(
      <FileDropzone
        onFiles={() => undefined}
        acceptedFormats={[".csv", ".pdf"]}
        label="Upload"
      />,
    );

    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input.accept).toBe(".csv,.pdf");
    expect(screen.getByText("CSV")).toBeInTheDocument();
    expect(screen.getByText("PDF")).toBeInTheDocument();
  });

  it("calls onFiles with all files when multiple", async () => {
    const user = userEvent.setup();
    const onFiles = vi.fn();
    const { container } = render(
      <FileDropzone onFiles={onFiles} multiple label="Upload many" />,
    );

    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    await user.upload(input, [
      new File(["a"], "a.txt", { type: "text/plain" }),
      new File(["b"], "b.txt", { type: "text/plain" }),
    ]);

    expect(onFiles).toHaveBeenCalledTimes(1);
    expect(onFiles.mock.calls[0][0].map((f: File) => f.name)).toEqual(["a.txt", "b.txt"]);
  });

  it("calls onFiles from drop", () => {
    const onFiles = vi.fn();
    const { container } = render(
      <FileDropzone onFiles={onFiles} label="Drop here" aria-label="File dropzone" />,
    );

    const dropzone = container.querySelector("label") as HTMLLabelElement;
    const file = new File(["x"], "drop.csv", { type: "text/csv" });
    fireEvent.drop(dropzone, {
      dataTransfer: { files: [file] },
    });

    expect(onFiles).toHaveBeenCalledTimes(1);
    expect(onFiles.mock.calls[0][0][0].name).toBe("drop.csv");
  });

  it("does not call onFiles when disabled or loading", async () => {
    const user = userEvent.setup();
    const onFiles = vi.fn();

    const disabled = render(
      <FileDropzone onFiles={onFiles} disabled label="Browse" aria-label="Disabled zone" />,
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
      <FileDropzone onFiles={onFiles} loading label="Browse" aria-label="Loading zone" />,
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

    expect(onFiles).not.toHaveBeenCalled();
  });
});
