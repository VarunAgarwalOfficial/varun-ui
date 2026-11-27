// Bundles the website's pixel world (the valley and its cast) into
// vendor/world/world.js, so story decks draw the same world as the site.
// WEBSITE is the website checkout (default ~/Personal/projects/website).
// Run when the world changes: make world
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = fileURLToPath(new URL('..', import.meta.url));
const site = process.env.WEBSITE || `${homedir()}/Personal/projects/website`;
const pixel = `${site}/src/directions/pixel`;
if (!existsSync(`${pixel}/world/valley.ts`)) throw new Error(`no pixel world at ${pixel}: set WEBSITE`);

let rev = 'unknown';
try {
  rev = execFileSync('git', ['-C', site, 'log', '-1', '--format=%h %cs (%D)'], { encoding: 'utf8' }).trim();
} catch {}

mkdirSync(`${root}vendor/world`, { recursive: true });
await build({
  entryPoints: [`${root}scripts/world/entry.ts`],
  bundle: true,
  format: 'esm',
  target: 'es2020',
  minify: false,
  legalComments: 'none',
  alias: { '@world': `${pixel}/world`, '@art': `${pixel}/art` },
  banner: { js: `// Bundled by scripts/world.mjs from the website's src/directions/pixel, commit ${rev}.\n// Do not edit here: change the website, then run make world.` },
  outfile: `${root}vendor/world/world.js`,
});
const size = readFileSync(`${root}vendor/world/world.js`).length;
console.log(`vendor/world/world.js: ${Math.round(size / 1024)} KB from ${rev}`);
