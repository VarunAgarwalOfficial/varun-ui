// Checks the kit and every deck. Exits 1 on an error; warnings only print.
// - vendor files are there and reveal.js matches the pinned version
// - no purple or lavender in decks or the theme (hue 250 to 300)
// - every embed has a fallback picture that exists
// - every slide has speaker notes (warning)
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { decks } from './serve.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const errors = [];
const warnings = [];

const pin = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).dependencies['reveal.js'];
for (const f of ['reveal/reveal.js', 'reveal/reveal.css', 'reveal/reset.css', 'reveal/plugin/notes.js', 'shell/tokens.css', 'shell/fonts/newsreader-latin-opsz-normal.woff2', 'world/world.js']) {
  if (!existsSync(join(root, 'vendor', f))) errors.push(`vendor/${f} is missing: run make build`);
}
const rjs = join(root, 'vendor/reveal/reveal.js');
if (existsSync(rjs)) {
  // The minified build keeps the version as a bare string, e.g. Ee=`6.0.2`.
  const m = /=\s*["'`](\d+\.\d+\.\d+)["'`]\s*;\s*function/.exec(readFileSync(rjs, 'utf8'));
  if (m && m[1] !== pin) errors.push(`vendor reveal.js is ${m[1]}, package.json pins ${pin}: run make vendor`);
  if (!m) warnings.push('could not read the reveal.js version from vendor/reveal/reveal.js');
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
  const leaves = [...html.matchAll(/<section\b[^>]*>([\s\S]*?)<\/section>/g)].filter((m) => !/<section\b/.test(m[1]));
  const bare = leaves.filter((m) => !/<aside class="notes"/.test(m[1])).length;
  if (bare) warnings.push(`${deck}: ${bare} of ${leaves.length} slides have no speaker notes`);
}

for (const w of warnings) console.log(`warning: ${w}`);
for (const e of errors) console.log(`error: ${e}`);
console.log(errors.length ? `${errors.length} errors` : `ok: ${decks().join(', ')}`);
process.exit(errors.length ? 1 : 0);
