// Checks the kit and every deck. Exits 1 on an error; warnings only print.
// - vendor files are there and reveal.js matches the pinned version
// - no purple or lavender in decks or the theme (hue 250 to 300, or a
//   purple name in \color)
// - every embed has a fallback picture that exists
// - every slide has speaker notes (warning)
// - every deck loads the maths, and every formula in it parses in KaTeX with
//   the deck macros; pixel maths crisptex can't draw is a warning
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import vm from 'node:vm';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { decks } from './serve.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const errors = [];
const warnings = [];

const pins = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).dependencies;
const pin = pins['reveal.js'];
for (const f of ['reveal/reveal.js', 'reveal/reveal.css', 'reveal/reset.css', 'reveal/plugin/notes.js', 'shell/tokens.css', 'shell/fonts/newsreader-latin-opsz-normal.woff2', 'world/world.js',
  'katex/katex.min.js', 'katex/katex.min.css', 'katex/fonts/KaTeX_Main-Regular.woff2', 'crisptex/crisptex.js']) {
  if (!existsSync(join(root, 'vendor', f))) errors.push(`vendor/${f} is missing: run make build`);
}
const rjs = join(root, 'vendor/reveal/reveal.js');
if (existsSync(rjs)) {
  // The minified build keeps the version as a bare string, e.g. Ee=`6.0.2`.
  const m = /=\s*["'`](\d+\.\d+\.\d+)["'`]\s*;\s*function/.exec(readFileSync(rjs, 'utf8'));
  if (m && m[1] !== pin) errors.push(`vendor reveal.js is ${m[1]}, package.json pins ${pin}: run make vendor`);
  if (!m) warnings.push('could not read the reveal.js version from vendor/reveal/reveal.js');
}

// KaTeX and crisptex, run as the browser runs them: the vendored files,
// then the theme's macros and splitter, in one sandbox.
const box = vm.createContext({ console: { ...console, warn: (m) => warnings.push(`KaTeX: ${m}`) } });
const load = (f) => existsSync(f) && (vm.runInContext(readFileSync(f, 'utf8'), box, { filename: f }), true);
const mathsReady = load(join(root, 'vendor/katex/katex.min.js'));
load(join(root, 'vendor/crisptex/crisptex.js'));
load(join(root, 'theme/macros.js'));
load(join(root, 'theme/maths.js'));
if (box.katex && box.katex.version !== pins.katex) errors.push(`vendor KaTeX is ${box.katex.version}, package.json pins ${pins.katex}: run make vendor`);
const ctPin = pins.crisptex.replace(/^.*crisptex-(.+)\.tgz$/, '$1');
const ctFile = join(root, 'vendor/crisptex/crisptex.js');
if (existsSync(ctFile) && !readFileSync(ctFile, 'utf8').startsWith(`/* crisptex ${ctPin},`)) errors.push(`vendor crisptex is not ${ctPin}: run make vendor`);

// The text a browser would show, as { text, pixel }, skipping what maths.js
// skips. A small tokenizer: decks are hand-written HTML.
const RAW = new Set(['script', 'style', 'textarea']);
const SKIPTAG = new Set(['script', 'style', 'pre', 'code', 'textarea']);
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
const decode = (t) => t.replace(/&(#x[0-9a-f]+|#\d+|lt|gt|amp|quot|apos|nbsp);/gi, (_, e) =>
  e[0] === '#' ? String.fromCodePoint(e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : Number(e.slice(1)))
    : { lt: '<', gt: '>', amp: '&', quot: '"', apos: "'", nbsp: '\u00a0' }[e.toLowerCase()]);
function* texts(html) {
  const stack = [];
  const re = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][\w-]*)([^>]*)>|([^<]+)/g;
  for (let m = re.exec(html); m; m = re.exec(html)) {
    if (m[4] !== undefined) {
      if (!stack.some((s) => s.skip)) yield { text: decode(m[4]), pixel: stack.findLast((s) => s.math)?.math === 'pixel' };
      continue;
    }
    if (!m[2]) continue;
    const tag = m[2].toLowerCase();
    if (m[1]) {
      const i = stack.map((s) => s.tag).lastIndexOf(tag);
      if (i >= 0) stack.length = i;
      continue;
    }
    if (RAW.has(tag)) {
      const close = html.toLowerCase().indexOf(`</${tag}`, re.lastIndex);
      re.lastIndex = close < 0 ? html.length : close;
    }
    if (VOID.has(tag) || /\/\s*$/.test(m[3])) continue;
    const cls = (/\bclass="([^"]*)"/.exec(m[3])?.[1] || '').split(/\s+/);
    const math = /\bdata-math="([^"]*)"/.exec(m[3])?.[1];
    stack.push({ tag, math, skip: SKIPTAG.has(tag) || (tag === 'aside' && cls.includes('notes')) || cls.includes('no-math') });
  }
}
function maths(deck, html) {
  if (!/src="\.\.\/theme\/maths\.js"/.test(html)) errors.push(`${deck}: does not load theme/maths.js (and KaTeX, macros.js)`);
  if (!mathsReady || !box.DeckMaths) return 0;
  let n = 0;
  for (const { text, pixel } of texts(html)) {
    for (const p of box.DeckMaths.split(text)) {
      if (p.tex === undefined) {
        const stray = /\$\$|\$\\|\\\[|\\\(|\\begin\{(?:align|gather)/.exec(p.text);
        if (stray) errors.push(`${deck}: ${stray[0]} with no end, near ${JSON.stringify(p.text.trim().slice(0, 60))}`);
        continue;
      }
      n++;
      try {
        box.katex.renderToString(p.tex, { ...box.DeckMaths.options(p.display), throwOnError: true });
      } catch (e) {
        errors.push(`${deck}: ${e.message.replace(/\s+/g, ' ')}`);
        continue;
      }
      if (pixel && box.Crisptex) {
        const r = box.Crisptex.render(p.tex, { display: p.display, macros: box.DeckMacros });
        if (!r.ok) warnings.push(`${deck}: pixel maths falls back to KaTeX for ${JSON.stringify(p.tex)} (no pixels for ${r.unsupported.join(', ')})`);
      }
    }
  }
  return n;
}

// Purple: any hex colour whose hue is 250 to 300 with some saturation.
function hue(hex) {
  let h = hex.slice(1);
  if (h.length === 3) h = [...h].map((c) => c + c).join('');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  const l = (max + min) / 2;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (d === 0) return { h: 0, s };
  let hh = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return { h: (hh * 60 + 360) % 360, s };
}
function purple(file) {
  const text = readFileSync(file, 'utf8');
  for (const m of text.matchAll(/\\(?:text)?colou?r\{\s*(purple|violet|lavender|lilac|mauve|magenta|indigo|plum|orchid)/gi)) {
    errors.push(`${file.replace(root, '')}: \\color{${m[1]}} is purple`);
  }
  for (const m of text.matchAll(/#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g)) {
    const { h, s } = hue(m[0]);
    if (h >= 250 && h <= 300 && s > 0.15) errors.push(`${file.replace(root, '')}: ${m[0]} is purple`);
  }
}
const files = (dir, ext) => readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
  d.isDirectory() && !['vendor', 'node_modules', 'pdf', 'shots'].includes(d.name) ? files(join(dir, d.name), ext)
    : ext.some((e) => d.name.endsWith(e)) ? [join(dir, d.name)] : []);
for (const f of files(join(root, 'theme'), ['.css', '.js'])) purple(f);

for (const deck of decks()) {
  const dir = join(root, deck);
  for (const f of files(dir, ['.html', '.css', '.js'])) purple(f);
  const html = readFileSync(join(dir, 'index.html'), 'utf8');
  for (const fig of html.matchAll(/<figure class="embed[^"]*"[\s\S]*?<\/figure>/g)) {
    const fb = /class="fallback"[^>]*src="([^"]+)"|src="([^"]+)"[^>]*class="fallback"/.exec(fig[0]);
    const src = fb && (fb[1] || fb[2]);
    if (!src) errors.push(`${deck}: an embed has no fallback picture (the PDF would be blank there)`);
    else if (!existsSync(join(dir, src))) errors.push(`${deck}: fallback ${src} does not exist`);
  }
  const formulas = maths(deck, html);
  if (formulas) console.log(`${deck}: ${formulas} formulas`);
  const leaves = [...html.matchAll(/<section\b[^>]*>([\s\S]*?)<\/section>/g)].filter((m) => !/<section\b/.test(m[1]));
  const bare = leaves.filter((m) => !/<aside class="notes"/.test(m[1])).length;
  if (bare) warnings.push(`${deck}: ${bare} of ${leaves.length} slides have no speaker notes`);
}

for (const w of warnings) console.log(`warning: ${w}`);
for (const e of errors) console.log(`error: ${e}`);
console.log(errors.length ? `${errors.length} errors` : `ok: ${decks().join(', ')}`);
process.exit(errors.length ? 1 : 0);
