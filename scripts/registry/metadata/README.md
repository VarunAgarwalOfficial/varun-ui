# Registry Metadata

Why: registry metadata is human-authored library intent. Svelte files own
implementation and demo props; generated registry/catalog/static files are
adapters only.

- `blocks/<domain>.json`: complete usage examples.
- `components/<domain>.json`: reusable semantic/state/accessibility contracts,
  grouped by the product surface they serve.
- `layouts/<family>.json`: composition grammar and section rhythm.
- `pieces/<domain>.json`: compact contextual fragments and mock internals.

Each entry keeps the canonical key format: `kind:name`.
Metadata files group related entries; the file name does not need to prefix
each entry name.

`npm run audit` is the audit command. It enforces public-layer
ownership and strict token use. Compile and build checks remain the source of
truth for implementation correctness.
