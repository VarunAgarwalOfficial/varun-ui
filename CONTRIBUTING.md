# Contributing to varunUI

Thanks for helping make varunUI clearer, more useful, and more recognizable.
The project values a small coherent system over a large menu of alternatives.

## Start here

Requirements: Node `20.19+` or `22.12+` and npm.

```sh
npm install
npm run dev
```

Before merging a change, run the same gate used in CI:

```sh
make check
```

This checks formatting, generated catalog and registry output, architecture,
token use, Svelte types, the distributable package, and package metadata.

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

## Choose the right layer

- **Components** own reusable semantics, behavior, accessibility, state, and
  feedback. Button, Link, Marker, Range Field, and Animated Number live here.
- **Pieces** are small stateless content relationships composed from Components.
- **Layouts** own geometry and responsive flow only.
- **Blocks** complete one domain-specific page job.
- **Pages** establish a complete route-level information flow.
- **Emails** and **Canvases** are constrained complete outputs.
- **Internal** files are private accessibility adapters or implementation parts.
  They are not a hidden public tier.

There is no public Primitive tier. If a concept is only a span, pseudo-element,
or implementation detail, keep it inside its owner. If consumers would select
it deliberately and it has a durable name, make it a Component or Piece.

## Add a catalog item

1. Add one top-level `.svelte` file to the correct public tier.
2. Compose existing public layers instead of creating private local patterns.
3. Add explicit metadata under `scripts/registry/metadata/<tier>`.
4. Export reusable Components, Pieces, and Layouts from `src/lib/index.ts`.
5. Run `npm run generate` and inspect the catalog preview.
6. Run `npm run validate`.

Do not edit `src/showcase/catalog.generated.ts` or `static/registry` by hand.

## Design review

Read `DESIGN.md`. In particular:

- prefer one excellent default over cosmetic variants;
- use tokens for shared spacing, sizing, color, radius, and motion;
- use one outline per grouping level and no bordered cards inside cards;
- let Layouts control geometry and Components control interaction feedback;
- treat Marker, characters, pastel fields, and rotating seals as purposeful
  accents, not mandatory decoration;
- use one character or rotating seal per page region at most;
- provide reduced-motion behavior and keyboard-visible focus.

Keep example language in the varunUI world. Avoid invented companies, remote
photo dependencies, or filler copy that obscures the component's job.

## Contrast

Text colours read at 4.5:1 or more and borders at 3:1 or more (WCAG 2.2 AA), in the theme and the email tokens. This includes status text on its own 10 to 20% tint and muted text on every pastel field. The lowest text pair is 4.56:1 (success text on its 20% tint). `npm run audit` checks these pairs with `scripts/registry/check-contrast.mjs`, and checks with `scripts/registry/check-shell-tokens.mjs` that the pixel tokens mirrored in `src/lib/styles/tokens.css` match `shell/tokens.css`.

Not covered: the named colours and chart colours when used alone as icons, stars or chart marks. Yellow (1.60:1), green, blue and pink, and the blue, yellow, pink and cyan chart colours are under 3:1 on the page. Pair them with a label or shape, as DESIGN.md says.
