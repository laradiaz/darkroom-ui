import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { formatStoryName } from "../../stories/formatStoryName";
import { Select, type SelectOption } from "./Select";

const currencyOptions: SelectOption[] = [
  { label: "USD", value: "USD" },
  { label: "EUR", value: "EUR" },
  { label: "ARS", value: "ARS" },
];

const meta: Meta<typeof Select> = {
  title: "Form/Select",
  component: Select,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Select>;

function ControlledSelect(props: {
  options?: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
}) {
  const [value, setValue] = useState(props.options?.[0]?.value ?? "");
  return (
    <div className="w-64">
      <Select
        aria-label={formatStoryName("Controlled")}
        value={value}
        options={props.options ?? currencyOptions}
        onChange={setValue}
        placeholder={props.placeholder}
        disabled={props.disabled}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <ControlledSelect />,
};

export const WithPlaceholder: Story = {
  render: () => (
    <ControlledSelect
      options={[{ label: "Todas", value: "" }, ...currencyOptions]}
      placeholder="Elegí moneda"
    />
  ),
};

export const Disabled: Story = {
  render: () => <ControlledSelect disabled />,
};
