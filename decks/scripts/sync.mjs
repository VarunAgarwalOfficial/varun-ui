// Copies the site's tokens and pixel fonts from the shared shell into
// vendor/shell/, so the deck palette is the site palette, never retyped.
// SHELL is a folder or a URL; it defaults to ../shell in this repo,
// then to the published shell. Run when the shell changes: make sync
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const local = fileURLToPath(new URL('../../shell/', import.meta.url));
const shell = process.env.SHELL_DIR || (existsSync(local) ? local : 'https://varunswaika.github.io/varun-ui/shell/');
const out = `${root}vendor/shell/`;

async function get(name) {
  if (/^https?:/.test(shell)) {
    const r = await fetch(new URL(name, shell));
    if (!r.ok) throw new Error(`${name}: HTTP ${r.status}`);
    return Buffer.from(await r.arrayBuffer());
  }
  return readFileSync(`${shell}${name}`);
}

mkdirSync(`${out}fonts`, { recursive: true });
const tokens = (await get('tokens.css')).toString();
const from = shell === local ? '../shell/' : shell;
const stamp = `/* Copied by scripts/sync.mjs from ${from}tokens.css on ${new Date().toISOString().slice(0, 10)}.\n   Do not edit here: change the shell, then run make sync. */\n`;
writeFileSync(`${out}tokens.css`, stamp + tokens);

// Only the fonts a deck uses: Newsreader for text, Pixelify Sans for headings,
// Plex Mono for code.
for (const f of [
  'newsreader-latin-opsz-normal.woff2', 'newsreader-latin-opsz-italic.woff2', 'Newsreader-OFL.txt',
  'pixelify-sans-latin-400-normal.woff2', 'PixelifySans-OFL.txt',
  'ibm-plex-mono-latin-400-normal.woff2', 'ibm-plex-mono-latin-600-normal.woff2', 'IBM-Plex-OFL.txt',
]) writeFileSync(`${out}fonts/${f}`, await get(`fonts/${f}`));

console.log(`vendor/shell/: tokens and fonts from ${from}`);
