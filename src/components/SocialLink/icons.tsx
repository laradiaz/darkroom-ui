import type { SVGProps } from "react";

export type SocialPlatform = "youtube" | "instagram" | "tiktok" | "twitch" | "discord";

type IconProps = SVGProps<SVGSVGElement>;

const iconDefaults: IconProps = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "currentColor",
  "aria-hidden": true,
};

export function YouTubeIcon(props: IconProps) {
  return (
    <svg {...iconDefaults} {...props}>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1 31.5 31.5 0 0 0 .5-5.8 31.5 31.5 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...iconDefaults} {...props}>
      <path d="M12 2.2c2.7 0 3 0 4.1.1 1 0 1.6.2 2.2.4.6.2 1.1.5 1.6 1 .5.5.8 1 1 1.6.2.6.4 1.2.4 2.2.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c0 1-.2 1.6-.4 2.2-.2.6-.5 1.1-1 1.6-.5.5-1 .8-1.6 1-.6.2-1.2.4-2.2.4-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-1 0-1.6-.2-2.2-.4-.6-.2-1.1-.5-1.6-1-.5-.5-.8-1-1-1.6-.2-.6-.4-1.2-.4-2.2-.1-1.1-.1-1.4-.1-4.1s0-3 .1-4.1c0-1 .2-1.6.4-2.2.2-.6.5-1.1 1-1.6.5-.5 1-.8 1.6-1 .6-.2 1.2-.4 2.2-.4 1.1-.1 1.4-.1 4.1-.1ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm5.3-9.7a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z" />
    </svg>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <svg {...iconDefaults} {...props}>
      <path d="M19.6 7.4a5.8 5.8 0 0 1-3.5-1.2v7.8a6.7 6.7 0 1 1-5.9-6.6v3.2a3.5 3.5 0 1 0 2.5 3.3V2.2h3.4a5.8 5.8 0 0 0 3.5 5.2Z" />
    </svg>
  );
}

export function TwitchIcon(props: IconProps) {
  return (
    <svg {...iconDefaults} {...props}>
      <path d="M2 3.5v17l4.5-4.5h3.6l3.2 3.2V16h3.6l3.2 3.2V3.5H2Zm13.5 10.7-2.2-2.2v-5h2.2v5Zm-5.4 0-2.2-2.2v-5h2.2v5Z" />
    </svg>
  );
}

export function DiscordIcon(props: IconProps) {
  return (
    <svg {...iconDefaults} {...props}>
      <path d="M18.9 5.3A15.4 15.4 0 0 0 15 4.2l-.4.7a14 14 0 0 0-5.2 0L9 4.2a15.3 15.3 0 0 0-3.9 1.1C3.5 8.5 2.6 11.6 3 14.6a15.6 15.6 0 0 0 4.8 2.4l.6-.8a10.5 10.5 0 0 1-1.6-.8l.4-.3c3 .9 6.3.9 9.2 0l.4.3c-.5.3-1 .6-1.6.8l.6.8a15.5 15.5 0 0 0 4.8-2.4c.6-3.8-.2-6.9-2.1-9.3ZM8.7 13.2c-.9 0-1.6-.8-1.6-1.7s.7-1.7 1.6-1.7 1.6.8 1.6 1.7-.7 1.7-1.6 1.7Zm6.6 0c-.9 0-1.6-.8-1.6-1.7s.7-1.7 1.6-1.7 1.6.8 1.6 1.7-.7 1.7-1.6 1.7Z" />
    </svg>
  );
}

const iconMap = {
  youtube: YouTubeIcon,
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  twitch: TwitchIcon,
  discord: DiscordIcon,
} as const;

export const socialPlatformLabels: Record<SocialPlatform, string> = {
  youtube: "YouTube",
  instagram: "Instagram",
  tiktok: "TikTok",
  twitch: "Twitch",
  discord: "Discord",
};

export function SocialPlatformIcon({
  platform,
  ...props
}: { platform: SocialPlatform } & IconProps) {
  const Icon = iconMap[platform];
  return <Icon {...props} />;
}
