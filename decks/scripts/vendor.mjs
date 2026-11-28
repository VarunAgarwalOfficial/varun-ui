// Copies the pinned reveal.js and KaTeX out of node_modules into vendor/,
// and bundles crisptex for the browser, so every deck runs from this folder
// with no network and no install.
// Run after npm ci or after changing a pin: make vendor
import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = fileURLToPath(new URL('..', import.meta.url));
const nm = `${root}node_modules/`;
const out = `${root}vendor/`;
const pins = JSON.parse(readFileSync(`${root}package.json`, 'utf8')).dependencies;
const version = (name) => {
  const v = JSON.parse(readFileSync(`${nm}${name}/package.json`, 'utf8')).version;
  const pin = pins[name].replace(/^file:vendor\/[a-z]+-(.+)\.tgz$/, '$1');
  if (v !== pin) throw new Error(`node_modules has ${name} ${v}, package.json pins ${pin}: run npm ci`);
  return v;
};

// reveal.js
const reveal = version('reveal.js');
rmSync(`${out}reveal`, { recursive: true, force: true });
mkdirSync(`${out}reveal/plugin`, { recursive: true });
for (const f of ['reveal.js', 'reveal.css', 'reset.css', 'plugin/notes.js']) {
  cpSync(`${nm}reveal.js/dist/${f}`, `${out}reveal/${f}`);
}
cpSync(`${nm}reveal.js/LICENSE`, `${out}reveal/LICENSE`);

// KaTeX: the browser build (make check runs the same file) and the
// woff2 fonts only. The stylesheet is cut to woff2, which every browser
// that runs reveal.js reads.
const katex = version('katex');
rmSync(`${out}katex`, { recursive: true, force: true });
mkdirSync(`${out}katex/fonts`, { recursive: true });
cpSync(`${nm}katex/dist/katex.min.js`, `${out}katex/katex.min.js`);
cpSync(`${nm}katex/LICENSE`, `${out}katex/LICENSE`);
for (const f of readdirSync(`${nm}katex/dist/fonts`).filter((f) => f.endsWith('.woff2'))) {
  cpSync(`${nm}katex/dist/fonts/${f}`, `${out}katex/fonts/${f}`);
}
const css = readFileSync(`${nm}katex/dist/katex.min.css`, 'utf8')
  .replace(/,\s*url\(fonts\/[^)]+\.(?:woff|ttf)\) format\("(?:woff|truetype)"\)/g, '');
if (/\.(?:woff|ttf)\)/.test(css)) throw new Error('katex.min.css still names woff or ttf fonts');
writeFileSync(`${out}katex/katex.min.css`, css);

// crisptex: one script that sets window.Crisptex. It uses the KaTeX already
// on the page (window.katex) rather than a second copy.
const crisptex = version('crisptex');
rmSync(`${out}crisptex`, { recursive: true, force: true });
mkdirSync(`${out}crisptex`, { recursive: true });
await build({
  entryPoints: [`${nm}crisptex/dist/index.js`],
  bundle: true,
  minify: true,
  format: 'iife',
  globalName: 'Crisptex',
  target: 'es2020',
  outfile: `${out}crisptex/crisptex.js`,
  banner: { js: `/* crisptex ${crisptex}, MIT; glyphs SIL OFL 1.1. Built by scripts/vendor.mjs. */` },
  plugins: [{
    name: 'katex-global',
    setup(b) {
      b.onResolve({ filter: /^katex$/ }, () => ({ path: 'katex', namespace: 'katex-global' }));
      b.onLoad({ filter: /.*/, namespace: 'katex-global' }, () => ({ contents: 'module.exports = globalThis.katex;' }));
    },
  }],
  tsconfigRaw: {},
  logLevel: 'warning',
});
cpSync(`${nm}crisptex/LICENSE`, `${out}crisptex/LICENSE`);
cpSync(`${nm}crisptex/font/OFL.txt`, `${out}crisptex/OFL.txt`);

console.log(`vendor/: reveal.js ${reveal}, KaTeX ${katex}, crisptex ${crisptex}`);
