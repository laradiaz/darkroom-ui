import type { Meta, StoryObj } from "@storybook/react";
import { useState, type ComponentProps } from "react";
import { formatStoryName } from "../../stories/formatStoryName";
import { FileDropzone } from "./FileDropzone";

const meta: Meta<typeof FileDropzone> = {
  title: "Form/FileDropzone",
  component: FileDropzone,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Drag-and-drop or click file picker. `acceptedFormats` sets the input filter and the chips. `onFiles` receives every selected file when `multiple` is set.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FileDropzone>;

function Demo(props: Partial<ComponentProps<typeof FileDropzone>>) {
  const [names, setNames] = useState<string[]>([]);
  return (
    <div className="max-w-xl space-y-3">
      <FileDropzone
        aria-label={formatStoryName("Demo")}
        acceptedFormats={[".csv", ".xlsx", ".xls", ".pdf"]}
        label="Drop a file here or click to browse"
        hint="Max 10 MB"
        onFiles={(files) => setNames(files.map((file) => file.name))}
        {...props}
      />
      {names.length > 0 ? (
        <p className="text-sm text-text-muted">Selected: {names.join(", ")}</p>
      ) : null}
    </div>
  );
}

export const Default: Story = {
  render: () => <Demo />,
};

export const Multiple: Story = {
  render: () => <Demo multiple label="Drop files here or click to browse" />,
};

export const Loading: Story = {
  render: () => <Demo loading />,
};

export const Disabled: Story = {
  render: () => <Demo disabled />,
};
