// Exports one deck to pdf/<deck>.pdf with decktape and headless Chromium,
// one page per slide, then prints the page count.
// Usage: node scripts/pdf.mjs <deck>   Options: CHROME (default /usr/bin/chromium).
// The page loads with ?static: embeds show their fallback shot, scenes show
// their final state, and nothing animates.
import { spawn, spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { serve } from './serve.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const deck = process.argv[2] || 'starter';
const chrome = process.env.CHROME || '/usr/bin/chromium';
const out = `pdf/${deck}.pdf`;
mkdirSync(`${root}pdf`, { recursive: true });

const server = await serve(0);
const { port } = server.address();
// spawn, not spawnSync: the server runs in this process and must keep answering.
const status = await new Promise((done) => spawn('node', [
  'node_modules/decktape/decktape.js', 'reveal',
  '--size', '1920x1080', '--chrome-path', chrome, '--pause', '800', '--load-pause', '1000',
  `http://127.0.0.1:${port}/${deck}/index.html?static`, out,
], { cwd: root, stdio: 'inherit' }).on('close', done));
server.close();
if (status !== 0) process.exit(status ?? 1);

const info = spawnSync('pdfinfo', [`${root}${out}`], { encoding: 'utf8' });
const pages = info.status === 0
  ? Number(/Pages:\s+(\d+)/.exec(info.stdout)[1])
  : (readFileSync(`${root}${out}`, 'latin1').match(/\/Type\s*\/Page(?!s)/g) || []).length;
// Expect one page per leaf slide.
const html = readFileSync(`${root}${deck}/index.html`, 'utf8');
const opens = (html.match(/<section\b/g) || []).length;
const parents = (html.match(/<section\b[^>]*>\s*<section\b/g) || []).length;
const slides = opens - parents;
console.log(`${out}: ${pages} pages, ${slides} slides${pages === slides ? '' : ' (MISMATCH)'}`);
if (pages !== slides) process.exitCode = 1;
