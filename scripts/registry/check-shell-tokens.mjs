#!/usr/bin/env node
// Checks that the pixel tokens mirrored in src/lib/styles/tokens.css match
// shell/tokens.css, the one source for the pixel look. Every --site-* and
// --px-* property the library declares must exist in the shell with the same
// value. Exits 1 on a drift.

import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");

// The first value of each --site-* or --px-* property on :root. The shell's
// dark block repeats the light values, so the first one is the one to match.
function pixelTokens(source) {
  const tokens = new Map();
  const pattern = /--((?:site|px)-[\w-]+):\s*([^;]+);/g;
  for (const [, name, value] of source.matchAll(pattern)) {
    if (!tokens.has(name)) tokens.set(name, value.replace(/\s+/g, " ").trim());
  }
  return tokens;
}

const shell = pixelTokens(read("../../shell/tokens.css"));
const library = pixelTokens(read("../../src/lib/styles/tokens.css"));

let failed = 0;
for (const [name, value] of library) {
  if (!shell.has(name)) {
    failed += 1;
    console.log(`FAIL --${name} is not in shell/tokens.css`);
  } else if (shell.get(name).toLowerCase() !== value.toLowerCase()) {
    failed += 1;
    console.log(
      `FAIL --${name} is ${value} here but ${shell.get(name)} in shell/tokens.css`,
    );
  }
}

if (failed) {
  console.error(`${failed} pixel token(s) differ from shell/tokens.css.`);
  process.exit(1);
}
console.log(`${library.size} pixel tokens match shell/tokens.css.`);
