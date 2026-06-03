# darkroom-ui

Monochrome editorial React component library — warm paper and charcoal tones, CSS-variable light/dark mode, no accent palette.

**Repository:** [github.com/laradiaz/darkroom-ui](https://github.com/laradiaz/darkroom-ui)  
**npm:** [darkroom-ui](https://www.npmjs.com/package/darkroom-ui)

## Install

```bash
npm install darkroom-ui
# or
pnpm add darkroom-ui
```

Install a specific version from Git (without npm):

```bash
pnpm add git+ssh://git@github.com:laradiaz/darkroom-ui.git#v0.2.0
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
  RecipeCard,
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

Or use `useDarkroomDarkMode()` — toggles `html.dark`, persists to `localStorage`, and exposes `darkModeEnabled`, `toggle`, and `setTheme`.

## Components

| Component | Description |
|-----------|-------------|
| `Heading`, `Text`, `Label` | Typography |
| `Button` | primary / ghost / link |
| `NavMenuButton` | Mobile nav menu toggle (hamburger) |
| `Badge` | default / stamp / outline |
| `RecipeCard`, `MediaCard` | Content cards |
| `Divider` | Section divider |
| `ContentGrid` | Responsive grid |
| `NavBar` | Navigation |
| `Hero` | Image/video hero |
| `NewsletterSignup` | Email form |
| `SocialLink` | Icon or text social link |
| `Figure` | Image with caption |
| `Footer` | Site footer |
| `Page`, `Container`, `Section` | Layout |

## Development

```bash
pnpm install
pnpm run build
pnpm run check-publish
pnpm run check-publish:full
pnpm run storybook
```

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
