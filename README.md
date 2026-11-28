<p align="center"><img src="docs/banner.png" alt="Pixel art: a catalogue page with buttons, a toggle, a slider, a checkbox, a card and pastel colour swatches" width="100%"></p>

# varunUI for Svelte

A Svelte 5 component library and design system in the pixel look: a cream ground, brown ink, square corners, Pixelify Sans for headings and keys, Newsreader for text, one colour for the main action and a named pastel palette. It is light only and never uses purple or lavender. A catalogue site shows every part. The colours and fonts come from `shell/tokens.css`.

## What is in it

The parts go from small to large. Each kind has one job:

- **Components** hold behaviour, state and keyboard handling. A button, a dialog, a date picker.
- **Pieces** are small arrangements of content and components, with no state of their own.
- **Layouts** set geometry only: flow, line length, columns, rails, overlap and how they collapse on small screens.
- **Blocks** do one job on a page, such as pricing plans or a newsletter sign-up, built from the parts above.
- **Pages** are whole pages made of blocks, in order.
- **Canvases** are square posters for social posts.
- **Characters** are drawn figures for empty states and campaign art.

[DESIGN.md](./DESIGN.md) has the full design rules: colour roles, spacing, sizes, borders, layout, motion, posters and a review checklist. [CONTRIBUTING.md](./CONTRIBUTING.md) has the folder layout, how to add a part, and the contrast rules.

## Use it

```ts
import { Button, StoryScene, Section } from "varunui";
import "varunui/styles.css";
```

## Run it

You need Node `20.19+` or `22.12+`.

```sh
npm install
npm run dev        # the catalogue site
npm run generate   # rebuild the catalogue data and the registry files
```

`generate` writes `src/showcase/catalog.generated.ts` and `static/registry/*.json`. Do not edit those by hand.

## Test

```sh
make check
```

It runs `npm ci`, then `npm run validate`: the Prettier check, generation, the architecture, token and contrast audits, `svelte-check`, packaging and `publint`. CI runs the same.

## Status

Status: complete (frozen 27 November 2026). See [STATUS.md](STATUS.md).

## Licence

MIT. See [LICENSE](LICENSE).
