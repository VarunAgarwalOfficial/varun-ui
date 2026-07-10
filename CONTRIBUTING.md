# Contributing to varunUI

Thanks for helping make varunUI clearer, more useful, and more recognizable.
The project values a small coherent system over a large menu of alternatives.

## Start here

Requirements: Node `20.19+` or `22.12+` and npm.

```sh
npm install
npm run dev
```

Before opening a change, run the same gate used in CI:

```sh
npm run validate
```

This checks formatting, generated catalog and registry output, architecture,
token use, Svelte types, the distributable package, and package metadata.

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
- provide reduced-motion behavior and keyboard-visible focus.

Keep example language in the varunUI world. Avoid invented companies, remote
photo dependencies, or filler copy that obscures the component's job.
