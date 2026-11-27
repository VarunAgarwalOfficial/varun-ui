# varunUI for Svelte

A Svelte 5 component library and design system: warm paper colours, bold type, one colour for the main action and a named pastel palette. It has a light and a dark theme, and a catalogue site that shows every part.

## What is in it

The parts go from small to large. Each kind has one job:

- **Components** hold behaviour, state and keyboard handling. A button, a dialog, a date picker.
- **Pieces** are small arrangements of content and components, with no state of their own.
- **Layouts** set geometry only: flow, line length, columns, rails, overlap and how they collapse on small screens.
- **Blocks** do one job on a page, such as pricing plans or a newsletter sign-up, built from the parts above.
- **Pages** are whole pages made of blocks, in order.
- **Canvases** are square posters for social posts.
- **Characters** are drawn figures for empty states and campaign art.

[DESIGN.md](./DESIGN.md) has the full design rules: colour roles, spacing, sizes, borders, layout, motion, posters and a review checklist.

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

It runs `npm ci`, then `npm run validate`: the Prettier check, generation, the architecture and token audits, `svelte-check`, packaging and `publint`. CI runs the same.

## Layout

- `src/lib/components/varunui/component`: components.
- `src/lib/components/varunui/piece`: pieces.
- `src/lib/components/varunui/layout`: layouts.
- `src/lib/components/varunui/block`: blocks.
- `src/lib/components/varunui/page`: pages.
- `src/lib/components/varunui/canvas`: canvases.
- `src/lib/components/varunui/character`: characters.
- `src/lib/components/varunui/internal`: private helpers for accessibility, icons and brand assets. Not part of the catalogue.
- `src/showcase`: the catalogue site: rendering, search and previews.
- `scripts/registry/metadata`: the hand-written catalogue entries that `generate` reads.

## Adding a part

Read [CONTRIBUTING.md](./CONTRIBUTING.md) first. In short:

- Prefer one component to several that differ only in looks.
- A component needs its own behaviour or meaning. A layout needs geometry that more than one place uses.
- A block may hold product copy and data, but not its own private styles.
- Use the shared tokens for spacing, line length, rails, controls, colour and motion.
- Use one character or rotating seal per page region at most.
- Write the catalogue entry in `scripts/registry/metadata`, then run `generate`.

## Status

Working, as of 26 November 2026. See [STATUS.md](STATUS.md).

## Licence

MIT. See [LICENSE](LICENSE).
