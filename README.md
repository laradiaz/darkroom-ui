# darkroom-ui

Monochrome editorial React component library — warm paper and charcoal tones, CSS-variable light/dark mode, no accent palette.

| | |
|---|---|
| **Site** | [darkroom-ui.dev](https://darkroom-ui.dev) |
| **Storybook** | [storybook.darkroom-ui.dev](https://storybook.darkroom-ui.dev) |
| **npm** | [darkroom-ui](https://www.npmjs.com/package/darkroom-ui) |
| **Repository** | [github.com/laradiaz/darkroom-ui](https://github.com/laradiaz/darkroom-ui) |

## Install

```bash
npm install darkroom-ui
# or
pnpm add darkroom-ui
```

Install a specific version from Git (without npm):

```bash
pnpm add git+ssh://git@github.com:laradiaz/darkroom-ui.git#v0.2.2
```

**Peer dependencies:** `react` and `react-dom` (v18+).

## Usage

Import component styles once in your app entry (~35 KB):

```tsx
import "darkroom-ui/style.css";
```

Load fonts separately (optional, ~87 KB woff2):

```tsx
import "darkroom-ui/fonts.css";
```

```tsx
import {
  Button,
  Heading,
  PostCard,
  NavBar,
  Hero,
  Footer,
  useDarkroomDarkMode,
  DarkroomUIProvider,
} from "darkroom-ui";

function App() {
  const { toggle, darkModeEnabled } = useDarkroomDarkMode();

  return (
    <DarkroomUIProvider config={{ containerSize: "lg" }}>
      <Button type="button" variant="ghost" onClick={toggle}>
        {darkModeEnabled ? "Light" : "Dark"}
      </Button>
      <Heading level={1}>Hello</Heading>
      <Button variant="primary">Get started</Button>
    </DarkroomUIProvider>
  );
}
```

### Tree-shaking entry (no CSS side effects)

```tsx
import { Button } from "darkroom-ui/core";
import "darkroom-ui/style.css";
import "darkroom-ui/fonts.css";
```

### Per-component subpaths

```tsx
import { Button } from "darkroom-ui/button";
import { Hero } from "darkroom-ui/hero";
import "darkroom-ui/style.css";
```

Available subpaths: `button`, `select`, `file-dropzone`, `badge`, `typography`, `layout`, `card`, `hero`, `navigation`, `footer`, `core`.

### Design tokens only

```css
@import "darkroom-ui/tokens.css";
```

### CSS bundle sizes

| Import | Approx. size |
|--------|----------------|
| `darkroom-ui/style.css` | ~35 KB |
| `darkroom-ui/fonts.css` | ~1 KB CSS + ~87 KB woff2 |
| `darkroom-ui/tokens.css` | ~1 KB |

## Optional provider

`DarkroomUIProvider` sets defaults for the whole tree:

| Config | Purpose |
|--------|---------|
| `unstyled` | Skip CSS module classes |
| `containerSize` | Default `Container` width |
| `socialLinkMode` | Default `SocialLink` mode |
| `themeStorageKey` | Reserved for theme persistence |

All components accept `unstyled` and `slotProps` for DOM customization.

## Dark mode

Dark mode uses the `dark` class on `<html>`:

```html
<html class="dark">
```

Or use `useDarkroomDarkMode()` — toggles `html.dark`, persists to `localStorage`, and returns:

| Value | Description |
|-------|-------------|
| `theme` | `"light"` \| `"dark"` \| `"system"` |
| `resolved` | Effective `"light"` \| `"dark"` |
| `setTheme` | Set preference |
| `toggle` | Flip light ↔ dark |
| `darkModeEnabled` | `resolved === "dark"` |

## Components

### Form
| Component | Description |
|-----------|-------------|
| `FileDropzone` | Drag-and-drop / click file picker |
| `NewsletterSignup` | Email form |
| `Select` | Custom listbox select |

### Button
| Component | Description |
|-----------|-------------|
| `Button` | primary / ghost / link |
| `NavMenuButton` | Mobile nav menu toggle (hamburger) |

### Content
| Component | Description |
|-----------|-------------|
| `Badge` | default / stamp / outline |
| `Divider` | Section divider |
| `Heading`, `Text`, `Label` | Typography |
| `Media` | Image with caption / overlay |
| `PostCard` | Linked content teaser |

### Layout
| Component | Description |
|-----------|-------------|
| `ContentGrid` | Responsive grid |
| `Footer` | Site footer |
| `Hero` | Image/video hero |
| `NavBar` | Navigation |
| `Page`, `Container`, `Section` | Page shell |
| `SocialLink` | Icon or text social link |

Interactive docs: [storybook.darkroom-ui.dev](https://storybook.darkroom-ui.dev).

## Development

```bash
pnpm install
pnpm run build
pnpm test
pnpm run check-publish
pnpm run check-publish:full
pnpm run storybook
```

Storybook deploys to GitHub Pages on push to `main` (`pnpm run build-storybook`).

## Publish

Maintainers only:

```bash
npm login
pnpm run build
pnpm run check-publish
npm publish --access public
```

For version bumps after the initial release: `./scripts/release.sh patch` (or `minor` / `major`).

## License

MIT
