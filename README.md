# varunUI for Svelte

varunUI is an opinionated Svelte system for building colorful, paper-textured products without rebuilding the same page decisions every time.

The system has one clear hierarchy:

- **Components** own behavior, state, accessibility, and a durable product meaning.
- **Pieces** are small, stateless arrangements of content and components.
- **Layouts** own geometry only: flow, measure, columns, rails, overlap, and responsive collapse.
- **Blocks** complete one real page job by composing the public system.
- **Pages** are complete, ordered flows that show which blocks belong together and why.
- **Canvases** are ready-to-post square posters for campaigns and social publishing.
- **Characters** are reusable storytellers for product states and campaign moments.

The visual language is warm paper, strong typography, one primary action color, and a named pastel palette. Light and dark are the only themes. Markers, characters, and rotating seals are accents—not wallpaper.

Read [DESIGN.md](./DESIGN.md) for the complete human-facing design contract:
color roles, spacing, sizing, borders, layout grammar, motion, poster rules, and
the review checklist.

## Project Shape

- `src/lib/components/varunui/internal`: private accessibility adapters, icons, and brand assets; never a catalog tier.
- `src/lib/components/varunui/component`: public semantic components.
- `src/lib/components/varunui/piece`: public stateless arrangements.
- `src/lib/components/varunui/layout`: public composition grammar.
- `src/lib/components/varunui/character`: character storytellers.
- `src/lib/components/varunui/canvas`: ready-to-post 1:1 poster compositions.
- `src/lib/components/varunui/block`: complete block examples.
- `src/lib/components/varunui/page`: full curated page compositions.
- `src/showcase`: catalog-only rendering, search, and preview code.
- `scripts/registry/metadata`: authored catalog intent.

Generated outputs:

- `src/showcase/catalog.generated.ts`
- `static/registry/*.json`

Do not hand-edit generated outputs. Run the registry scripts instead.

## Use the Library

```ts
import { Button, StoryScene, Section } from "varunui";
import "varunui/styles.css";
```

## Run it

```sh
npm install
npm run dev
npm run generate
npm run validate
```

`generate` produces both the catalog data and installable registry. `validate` is
the contributor gate: generation, architecture and token audits, Svelte checks,
library packaging, and package publication checks.

Node `20.19+` or `22.12+` is required. See
[CONTRIBUTING.md](./CONTRIBUTING.md) before adding a public concept: the catalog
is intentionally opinionated, so a new variant or layer needs to earn its place.

## Architecture Rules

- Prefer one canonical component over cosmetic variants.
- A component earns its place through behavior or product meaning; a layout earns its place through reusable geometry.
- Blocks may contain product copy and data, but may not hide a second private design system.
- Use shared spacing, measure, rail, control, color, and motion tokens.
- Use fun accents deliberately: normally one character or rotating seal per page region, with Marker as the recurring kicker.
- Author registry metadata; generate registry artifacts.

## Status

Working, as of 26 November 2026. See [STATUS.md](STATUS.md).

## Licence

MIT
