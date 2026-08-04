import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { NavMenuButton } from "./NavMenuButton";

const meta: Meta<typeof NavMenuButton> = {
  title: "Button/NavMenuButton",
  component: NavMenuButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Icon button for opening a mobile nav. Visibility at breakpoints is owned by `NavBar`, not this button.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NavMenuButton>;

const demoLinks = ["Reviews", "Guides", "Lists", "About"];

function ToggleDemo({ initiallyOpen = false }: { initiallyOpen?: boolean }) {
  const [open, setOpen] = useState(initiallyOpen);
  return (
    <div className="relative w-full max-w-sm border-b border-border bg-paper">
      <div className="flex items-center justify-between px-4 py-3">
        <span className="font-display text-xl">Checkpoint</span>
        <NavMenuButton
          aria-expanded={open}
          aria-controls="demo-nav"
          onClick={() => setOpen((value) => !value)}
        />
      </div>
      {open ? (
        <nav
          id="demo-nav"
          aria-label="Demo navigation"
          className="flex flex-col gap-4 border-t border-border px-4 py-4"
        >
          {demoLinks.map((label) => (
            <a
              key={label}
              href="#"
              className="font-sans text-sm uppercase tracking-wider text-foreground no-underline"
              onClick={(event) => {
                event.preventDefault();
                setOpen(false);
              }}
            >
              {label}
            </a>
          ))}
        </nav>
      ) : null}
    </div>
  );
}

export const Default: Story = {
  render: () => <ToggleDemo />,
};

export const Expanded: Story = {
  render: () => <ToggleDemo initiallyOpen />,
};
