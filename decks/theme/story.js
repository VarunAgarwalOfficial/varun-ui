// Story mode: a pixel scene behind the slides, drawn from the website's
// valley, with the site's cast walking between slides.
//
//   <div class="reveal story"> ... <section data-phase="night"
//        data-cast="a knight 40 140; b knight 280 140 flip"> ...
//   <span class="fragment" data-cast="m courier 60 118"></span>
//
// A cast entry is `name sprite x y [flip]`, or `name x y` to move someone
// already there, or `name -` to send them off. x and y are art pixels on the
// 320 by 180 grid (one art pixel is 6px on a 1920 by 1080 slide), measured
// to the middle of the feet. Each slide starts from the cast and phase the
// slide before it ended with, so a deck reads top to bottom like a script.
//
// The rules: one art pixel size, whole-number scale, moves in whole art
// pixels at 10 drawn frames a second, things appear and go through an
// ordered dither (never a fade), and under reduced motion or ?static every
// change jumps to its end and nothing moves.
import { Valley, KNIGHT, BEE, PACKET, BUTTERFLY, VARUN, Pix, paint } from '../vendor/world/world.js';

const FPS = 10;
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

// The cast. Each part is a sprite and its offset from the sprite's top left;
// frames alternate while the actor is moving (or always, for wings).
const one = (pix, dx = 0, dy = 0) => ({ pix, dx, dy });
export const CAST = {
  knight: { frames: [[one(KNIGHT)]], bob: true },
  bee: { frames: [[one(BEE[0])], [one(BEE[1])]], flap: true },
  courier: { frames: [[one(BEE[0]), one(PACKET, 2, 6)], [one(BEE[1]), one(PACKET, 2, 6)]], flap: true },
  packet: { frames: [[one(PACKET)]] },
  butterfly: { frames: [[one(BUTTERFLY[0][0])], [one(BUTTERFLY[0][1])]], flap: true },
  'butterfly-blue': { frames: [[one(BUTTERFLY[1][0])], [one(BUTTERFLY[1][1])]], flap: true },
  varun: { frames: [[one(VARUN)]] },
};
for (const c of Object.values(CAST)) {
  c.w = Math.max(...c.frames[0].map((p) => p.dx + p.pix.w));
  c.h = Math.max(...c.frames[0].map((p) => p.dy + p.pix.h));
}

// The default scene: a valley with no buildings in view (the one place the
// world needs stands off the left edge), a pond in the middle, sunflowers
// at the sides. Pass your own layout to start() for another scene.
export const VALLEY = {
  hz: 0.42,
  knoll: 0.2,
  places: { teaching: [-2, 0.86] },
  signs: {},
  band: true,
  tall: [[0.025, 62, false], [0.975, 70, true]],
  small: [[0.16, 0.9], [0.22, 0.85], [0.3, 0.93], [0.68, 0.92], [0.76, 0.86], [0.84, 0.9]],
  trees: [[0.1, 0.48], [0.36, 0.45], [0.64, 0.46], [0.9, 0.49]],
  pond: [0.5, 0.88, 26, 6],
  name: [0, 0, 0, 0],
};

// Whole-pixel positions along a move, one per drawn frame, easing out.
function steps(from, to, frames) {
  const out = [];
  for (let k = 1; k <= frames; k++) {
    const t = 1 - (1 - k / frames) ** 2;
    out.push([Math.round(from[0] + (to[0] - from[0]) * t), Math.round(from[1] + (to[1] - from[1]) * t)]);
  }
  return out;
}

function parse(text) {
  return (text || '').split(';').map((s) => s.trim().split(/\s+/)).filter((t) => t[0]);
}

// Applies one data-cast string to a cast state (a Map, in drawing order).
function apply(state, text) {
  for (const t of parse(text)) {
    const [name] = t;
    if (t[1] === '-') { state.delete(name); continue; }
    const named = Number.isNaN(Number(t[1]));
    const sprite = named ? t[1] : state.get(name)?.sprite;
    if (!CAST[sprite]) { console.warn(`story: no cast member "${sprite}" for "${name}"`); continue; }
    const at = named ? t.slice(2) : t.slice(1);
    state.set(name, { sprite, x: Number(at[0]), y: Number(at[1]), flip: at.includes('flip') });
  }
}

export function start(Reveal, options = {}) {
  const deck = Reveal.getRevealElement();
  const slidesEl = deck.querySelector('.slides');
  const { width, height } = Reveal.getConfig();
  const W = Math.round(width / 6);
  const H = Math.round(height / 6);
  const still = document.documentElement.classList.contains('static') || matchMedia('(prefers-reduced-motion: reduce)').matches;
  const layout = options.layout || VALLEY;

  const canvas = document.createElement('canvas');
  canvas.className = 'story-scene';
  canvas.width = W;
  canvas.height = H;
  canvas.setAttribute('aria-hidden', 'true');
  slidesEl.prepend(canvas);
  const ctx = canvas.getContext('2d');

  // Each slide's script, worked out from the document once: the cast and
  // phase at the start of the slide, then after each fragment.
  const script = new Map();
  let cast = new Map();
  let phase = 'day';
  for (const s of Reveal.getSlides()) {
    if (s.hasAttribute('data-cast-reset')) cast = new Map();
    phase = s.dataset.phase || phase;
    apply(cast, s.dataset.cast);
    const base = new Map(cast);
    const frags = [...s.querySelectorAll('.fragment[data-cast]')];
    script.set(s, { base, phase, frags });
    for (const f of frags) apply(cast, f.dataset.cast);
  }

  const valleys = new Map();
  const valley = (p) => {
    if (!valleys.has(p)) {
      const v = new Valley(W, H, p, layout);
      v.knight = [-999, -999]; // the world's own knight sits out; the story brings its own
      valleys.set(p, v);
    }
    return valleys.get(p);
  };

  const actors = new Map(); // name -> { sprite, x, y, flip, level, goal, path }
  let current = 'day';
  let previous = null; // the last scene, while the new one dithers in
  let swap = 1;
  let tick = 0;
  let img;

  function target(slide) {
    const s = script.get(slide);
    if (!s) return null;
    const state = new Map(s.base);
    for (const f of s.frags) if (f.classList.contains('visible')) apply(state, f.dataset.cast);
    return { state, phase: s.phase };
  }

  function go(slide) {
    const t = target(slide);
    if (!t) return;
    if (t.phase !== current) {
      previous = still ? null : valley(current).frame(0, true).data.slice();
      current = t.phase;
      swap = still ? 1 : 0;
    }
    for (const [name, a] of actors) if (!t.state.has(name)) a.goal = 0;
    for (const [name, want] of t.state) {
      const a = actors.get(name);
      if (!a || a.goal === 0 || a.sprite !== want.sprite) {
        actors.set(name, { ...want, level: still ? 1 : 0, goal: 1, path: [] });
        continue;
      }
      a.flip = want.flip;
      const dist = Math.hypot(want.x - a.x, want.y - a.y);
      a.path = still || dist === 0 ? [] : steps([a.x, a.y], [want.x, want.y], Math.max(3, Math.min(14, Math.round(dist / 6))));
      if (still) { a.x = want.x; a.y = want.y; }
    }
    if (still) {
      for (const [name, a] of actors) if (a.goal === 0) actors.delete(name);
      draw();
    }
  }

  // Stamps one sprite part, keeping only the pixels the dither level allows.
  function stamp(out, pix, x0, y0, flip, level) {
    const cut = level * 16;
    for (let j = 0; j < pix.h; j++) {
      const y = y0 + j;
      if (y < 0 || y >= out.h) continue;
      for (let i = 0; i < pix.w; i++) {
        const c = pix.data[j * pix.w + (flip ? pix.w - 1 - i : i)];
        const x = x0 + i;
        if (!c || x < 0 || x >= out.w) continue;
        if (BAYER[(y & 3) * 4 + (x & 3)] >= cut) continue;
        out.data[y * out.w + x] = c;
      }
    }
  }

  function draw() {
    const v = valley(current);
    const out = v.frame(tick / FPS, still);
    if (previous && swap < 1) {
      const cut = swap * 16;
      for (let y = 0; y < H; y++)
        for (let x = 0; x < W; x++)
          if (BAYER[(y & 3) * 4 + (x & 3)] >= cut) out.data[y * W + x] = previous[y * W + x];
    }
    for (const a of actors.values()) {
      const c = CAST[a.sprite];
      const moving = a.path.length > 0;
      const f = c.frames[(c.flap || moving) && !still ? tick % c.frames.length : 0];
      const bob = c.bob && moving && tick % 2 ? -1 : 0;
      const left = a.x - (c.w >> 1);
      const top = a.y - c.h + bob;
      for (const p of f) {
        const dx = a.flip ? c.w - p.dx - p.pix.w : p.dx;
        stamp(out, p.pix, left + dx, top + p.dy, a.flip, a.level);
      }
    }
    img = paint(ctx, out, img);
  }

  function step() {
    tick++;
    valley(current).step(1 / FPS);
    if (swap < 1) swap = Math.min(1, swap + 0.25);
    for (const [name, a] of actors) {
      if (a.path.length) [a.x, a.y] = a.path.shift();
      if (a.level < a.goal) a.level = Math.min(a.goal, a.level + 0.25);
      if (a.level > a.goal) a.level = Math.max(a.goal, a.level - 0.25);
      if (a.goal === 0 && a.level === 0) actors.delete(name);
    }
    draw();
  }

  const update = () => go(Reveal.getCurrentSlide());
  Reveal.on('slidechanged', update);
  Reveal.on('fragmentshown', update);
  Reveal.on('fragmenthidden', update);
  update();
  draw();

  if (!still) {
    let last = 0;
    const loop = (now) => {
      requestAnimationFrame(loop);
      if (document.hidden || now - last < 1000 / FPS) return;
      last = now - ((now - last) % (1000 / FPS));
      step();
    };
    requestAnimationFrame(loop);
  }
  return { canvas, actors };
}
