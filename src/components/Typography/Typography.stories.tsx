import type { Meta, StoryObj } from "@storybook/react";
import type { CSSProperties } from "react";
import { Heading, Label, Text } from "./index";

const meta: Meta = {
  title: "Content/Typography",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Display uses `--font-display`; UI/body uses `--font-sans`. Defaults are Cormorant Garamond + DM Sans. Pairings below are free Google Fonts loaded only in Storybook.",
      },
    },
  },
};

export default meta;

const sample = {
  kicker: "Volume 04 — Field notes",
  headline: "Clear takes on the games we finish",
  deck: "Reviews, setup guides, and long lists from a small desk that cares more about playtime than hype cycles.",
  body: "The best sessions leave a residue: a half-finished save, a notepad of routes, a controller still warm. Write like you played — patient, specific, and willing to admit when the magic was luck.",
  paragraphs: [
    "Most games ask for attention; a few earn it. The difference shows up in the quiet stretches — loading screens you do not resent, menus that stay out of the way, a difficulty curve that trusts you to notice the pattern before the tutorial spells it out.",
    "We keep a short list of titles we actually finished this season. Not the ones we meant to return to, not the demos that lived on the desktop for a month. Finished means credits, a cleared save, or the rare moment when walking away felt complete.",
    "If a review reads like a changelog, we rewrote it. The point is not to catalog every system; it is to say what the game does to an evening, and whether that evening was worth the trade.",
  ],
  mono: "PATCH 1.4.2 — inventory sync · softlock fix · audio ducking",
};

export const Headings: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-3xl">
      <Heading level={1}>{sample.headline}</Heading>
      <Heading level={2}>{sample.headline}</Heading>
      <Heading level={3}>{sample.headline}</Heading>
    </div>
  ),
};

export const TextStyles: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-lg">
      <Label>{sample.kicker}</Label>
      <Text size="subtitle">{sample.deck}</Text>
      <Text size="body">{sample.body}</Text>
      <Text size="caption">{sample.mono}</Text>
    </div>
  ),
};

export const Paragraphs: StoryObj = {
  render: () => (
    <article className="flex flex-col gap-6 max-w-prose">
      <Label>{sample.kicker}</Label>
      <Heading level={2}>{sample.headline}</Heading>
      <Text size="subtitle">{sample.deck}</Text>
      {sample.paragraphs.map((paragraph) => (
        <Text key={paragraph.slice(0, 24)} size="body" className="block">
          {paragraph}
        </Text>
      ))}
      <Text size="caption">{sample.mono}</Text>
    </article>
  ),
};

type Pairing = {
  name: string;
  mood: string;
  display: string;
  sans: string;
};

const pairings: Pairing[] = [
  {
    name: "Default",
    mood: "Bundled with darkroom-ui",
    display: '"Cormorant Garamond", serif',
    sans: '"DM Sans", sans-serif',
  },
  {
    name: "Modern editorial",
    mood: "Newsreader + IBM Plex Mono",
    display: "Newsreader, serif",
    sans: '"IBM Plex Mono", monospace',
  },
  {
    name: "Literary / archive",
    mood: "EB Garamond + Courier Prime",
    display: '"EB Garamond", serif',
    sans: '"Courier Prime", monospace',
  },
  {
    name: "Fashion / art",
    mood: "Instrument Serif + Cutive Mono",
    display: '"Instrument Serif", serif',
    sans: '"Cutive Mono", monospace',
  },
  {
    name: "Newspaper",
    mood: "Noticia Text + Special Elite accent",
    display: "Noticia Text, serif",
    sans: '"Special Elite", monospace',
  },
];

function PairingCard({ pairing }: { pairing: Pairing }) {
  const style = {
    "--font-display": pairing.display,
    "--font-sans": pairing.sans,
  } as CSSProperties;

  return (
    <article
      style={style}
      className="flex flex-col gap-4 border border-border rounded-sm p-6 bg-paper max-w-prose"
    >
      <Label>{pairing.name}</Label>
      <Text size="caption">{pairing.mood}</Text>
      <Heading level={2}>{sample.headline}</Heading>
      <Text size="subtitle">{sample.deck}</Text>
      {sample.paragraphs.map((paragraph) => (
        <Text key={paragraph.slice(0, 24)} size="body" className="block">
          {paragraph}
        </Text>
      ))}
      <Text size="caption" className="font-sans">
        {sample.mono}
      </Text>
    </article>
  );
}

export const FontPairings: StoryObj = {
  name: "Font pairings",
  render: () => (
    <div className="flex flex-col gap-10">
      {pairings.map((pairing) => (
        <PairingCard key={pairing.name} pairing={pairing} />
      ))}
    </div>
  ),
};
