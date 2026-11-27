// Copies the pinned reveal.js out of node_modules into vendor/,
// so every deck runs from this folder with no network and no install.
// Run after npm ci or after changing a pin: make vendor
import { cpSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const nm = `${root}node_modules/`;
const out = `${root}vendor/`;

const reveal = JSON.parse(readFileSync(`${nm}reveal.js/package.json`, 'utf8')).version;
const pinned = JSON.parse(readFileSync(`${root}package.json`, 'utf8')).dependencies['reveal.js'];
if (reveal !== pinned) throw new Error(`node_modules has reveal.js ${reveal}, package.json pins ${pinned}: run npm ci`);

rmSync(`${out}reveal`, { recursive: true, force: true });
mkdirSync(`${out}reveal/plugin`, { recursive: true });
for (const f of ['reveal.js', 'reveal.css', 'reset.css', 'plugin/notes.js']) {
  cpSync(`${nm}reveal.js/dist/${f}`, `${out}reveal/${f}`);
}
cpSync(`${nm}reveal.js/LICENSE`, `${out}reveal/LICENSE`);

console.log(`vendor/: reveal.js ${reveal}`);
