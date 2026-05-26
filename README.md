# lab-ui

Editorial React component library with CSS-variable theming and light/dark mode.

## Install

```bash
npm install lab-ui
# or
pnpm add lab-ui
```

**Peer dependencies:** `react` and `react-dom` (v18+).

Before publishing, verify the package name is available: `npm view lab-ui`.

## Usage

Import component styles once in your app entry (~35 KB):

```tsx
import "lab-ui/style.css";
```

Load fonts separately — bundled latin subsets (~87 KB woff2), or use your own:

```tsx
import "lab-ui/fonts.css";
```

Or host fonts yourself (Google Fonts, `@fontsource`, etc.) and only import `style.css`. Typography uses `"Cormorant Garamond"` and `"DM Sans"`.

Use components:

```tsx
import {
  Button,
  Heading,
  RecipeCard,
  NavBar,
  Hero,
  Footer,
  useLabDarkMode,
  LabUIProvider,
} from "lab-ui";

function App() {
  const { toggle, isDark } = useLabDarkMode();

  return (
    <LabUIProvider config={{ containerSize: "lg" }}>
      <button type="button" onClick={toggle}>
        {isDark ? "Light" : "Dark"}
      </button>
      <Heading level={1}>Hello</Heading>
      <Button variant="primary">Get started</Button>
    </LabUIProvider>
  );
}
```

### Tree-shaking entry (no CSS side effects)

```tsx
import { Button } from "lab-ui/core";
import "lab-ui/style.css";
import "lab-ui/fonts.css";
```

### Per-component subpaths

```tsx
import { Button } from "lab-ui/button";
import { Hero } from "lab-ui/hero";
import "lab-ui/style.css";
```

### Design tokens only

```css
@import "lab-ui/tokens.css";
```

### CSS bundle sizes

| Import | Approx. size |
|--------|----------------|
| `lab-ui/style.css` | ~35 KB (Tailwind + component styles) |
| `lab-ui/fonts.css` | ~1 KB CSS + ~87 KB woff2 in `lib/fonts/` |
| `lab-ui/tokens.css` | ~1 KB (CSS variables only) |

## Optional provider

`LabUIProvider` sets defaults for the whole tree:

| Config | Purpose |
|--------|---------|
| `unstyled` | Skip CSS module classes (bring your own `className`) |
| `containerSize` | Default `Container` width in layout |
| `socialLinkMode` | Default `SocialLink` display mode |
| `themeStorageKey` | Reserved for theme persistence customization |

All components accept optional `unstyled` and `slotProps` for pass-through DOM customization. Complex components expose named slots (e.g. `Hero` → `media`, `overlay`, `content`; `RecipeCard` → `image`, `title`).

```tsx
<Hero
  slotProps={{ content: { className: "text-left" } }}
  aria-label="Featured recipes"
/>
<Button slotProps={{ root: { "data-testid": "submit" } }} />
<LabUIProvider config={{ unstyled: true }}>{/* all components skip module classes */}</LabUIProvider>
```

## Dark mode

Dark mode uses the `dark` class on `<html>`:

```html
<html class="dark">
```

Or use `useLabDarkMode()` — it toggles `html.dark` and persists preference to `localStorage`.

## Components

| Component | Description |
|-----------|-------------|
| `Heading`, `Text`, `Label` | Typography |
| `Button` | primary / ghost / link |
| `Badge` | Category tags |
| `RecipeCard`, `MediaCard` | Content cards |
| `Divider` | Section divider |
| `ContentGrid` | Responsive grid |
| `NavBar` | Navigation with accessible mobile menu |
| `Hero` | Image/video hero |
| `NewsletterSignup` | Email form |
| `SocialLink` | Icon or text social link |
| `Figure` | Image with caption |
| `Footer` | Site footer |
| `Page`, `Container`, `Section` | Layout primitives |

## Development

```bash
pnpm install
pnpm run build
pnpm run check-publish
pnpm run check-publish:full   # also runs build-storybook
pnpm run storybook
```

## Publish

```bash
npm login
pnpm run build
pnpm run check-publish
npm publish --access public
```

Or `./scripts/release.sh patch` (runs build via `prepublishOnly`).

## License

MIT
