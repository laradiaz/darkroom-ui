import type { Meta, StoryObj } from "@storybook/react";
import { useState, type ComponentProps } from "react";
import { formatStoryName } from "../../stories/formatStoryName";
import { FileDropzone } from "./FileDropzone";

const meta: Meta<typeof FileDropzone> = {
  title: "Components/FileDropzone",
  component: FileDropzone,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FileDropzone>;

function Demo(props: Partial<ComponentProps<typeof FileDropzone>>) {
  const [name, setName] = useState<string | null>(null);
  return (
    <div className="max-w-xl space-y-3">
      <FileDropzone
        aria-label={formatStoryName("Demo")}
        accept=".csv,.xlsx,.xls,.pdf"
        formats={["CSV", "XLSX", "PDF"]}
        label="Drop a file here or click to browse"
        hint="Max 10 MB"
        onFile={(file) => setName(file.name)}
        {...props}
      />
      {name ? <p className="text-sm text-text-muted">Selected: {name}</p> : null}
    </div>
  );
}

export const Default: Story = {
  render: () => <Demo />,
};

export const Loading: Story = {
  render: () => <Demo loading />,
};

export const Disabled: Story = {
  render: () => <Demo disabled />,
};
