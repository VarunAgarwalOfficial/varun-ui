// Bundled by scripts/world.mjs from the website's src/directions/pixel, commit cdf8186 2026-11-27 (HEAD -> direction-pixel, origin/direction-pixel).
// Do not edit here: change the website, then run make world.
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// ../../../../../../home/varun/Personal/projects/website/src/directions/pixel/art/buffer.ts
var BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5]
];
var bayer = (x, y) => BAYER[y & 3][x & 3];
var Pix = class {
  constructor(w, h, data) {
    __publicField(this, "w");
    __publicField(this, "h");
    __publicField(this, "data");
    this.w = w;
    this.h = h;
    this.data = data ?? new Uint32Array(w * h);
  }
  fill(c) {
    this.data.fill(c);
  }
  copyFrom(o) {
    this.data.set(o.data);
  }
  p(x, y, c) {
    x |= 0;
    y |= 0;
    if (x >= 0 && x < this.w && y >= 0 && y < this.h) this.data[y * this.w + x] = c;
  }
  get(x, y) {
    x |= 0;
    y |= 0;
    if (x < 0 || x >= this.w || y < 0 || y >= this.h) return 0;
    return this.data[y * this.w + x];
  }
  rect(x0, y0, x1, y1, c) {
    const ya = Math.max(0, Math.round(y0));
    const yb = Math.min(this.h - 1, Math.round(y1));
    const xa = Math.max(0, Math.round(x0));
    const xb = Math.min(this.w - 1, Math.round(x1));
    for (let y = ya; y <= yb; y++) this.data.fill(c, y * this.w + xa, y * this.w + xb + 1);
  }
  hline(x0, x1, y, c) {
    this.rect(Math.min(x0, x1), y, Math.max(x0, x1), y, c);
  }
  vline(x, y0, y1, c) {
    this.rect(x, Math.min(y0, y1), x, Math.max(y0, y1), c);
  }
  /** Bresenham line. */
  line(x0, y0, x1, y1, c) {
    x0 = Math.round(x0);
    y0 = Math.round(y0);
    x1 = Math.round(x1);
    y1 = Math.round(y1);
    const dx = Math.abs(x1 - x0);
    const dy = -Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx + dy;
    for (; ; ) {
      this.p(x0, y0, c);
      if (x0 === x1 && y0 === y1) break;
      const e2 = 2 * err;
      if (e2 >= dy) {
        err += dy;
        x0 += sx;
      }
      if (e2 <= dx) {
        err += dx;
        y0 += sy;
      }
    }
  }
  /** Fill a polygon (even-odd, sampled at pixel centres). */
  poly(pts, c) {
    const ys = pts.map((p) => p[1]);
    const ya = Math.max(0, Math.floor(Math.min(...ys)));
    const yb = Math.min(this.h - 1, Math.ceil(Math.max(...ys)));
    for (let y = ya; y <= yb; y++) {
      const yc = y + 0.5;
      const xs = [];
      for (let i = 0; i < pts.length; i++) {
        const [x0, y0] = pts[i];
        const [x1, y1] = pts[(i + 1) % pts.length];
        if (y0 <= yc !== y1 <= yc) xs.push(x0 + (yc - y0) / (y1 - y0) * (x1 - x0));
      }
      xs.sort((a, b) => a - b);
      for (let i = 0; i + 1 < xs.length; i += 2) {
        const xa = Math.max(0, Math.ceil(xs[i] - 0.5));
        const xb = Math.min(this.w - 1, Math.floor(xs[i + 1] - 0.5));
        if (xb >= xa) this.data.fill(c, y * this.w + xa, y * this.w + xb + 1);
      }
    }
  }
  /** Draw another buffer on top, skipping its empty (zero) pixels. */
  over(o) {
    const a = this.data;
    const b = o.data;
    for (let i = 0; i < b.length; i++) if (b[i]) a[i] = b[i];
  }
  /** Colour c on a fraction `level` (0 to 1) of the pixels in a box. */
  dither(x0, y0, x1, y1, c, level) {
    const t = level * 16;
    for (let y = Math.max(0, y0); y <= Math.min(this.h - 1, y1); y++)
      for (let x = Math.max(0, x0); x <= Math.min(this.w - 1, x1); x++)
        if (bayer(x, y) < t) this.data[y * this.w + x] = c;
  }
  /** A vertical dithered gradient through [[y, colour], ...]. */
  stops(stops) {
    for (let i = 0; i + 1 < stops.length; i++) {
      const [ya, ca] = stops[i];
      const [yb, cb] = stops[i + 1];
      const n = Math.max(1, yb - ya);
      for (let y = Math.max(0, ya); y < Math.min(this.h, yb); y++) {
        const lv = (y - ya) / n * 16;
        const row = y * this.w;
        for (let x = 0; x < this.w; x++) this.data[row + x] = bayer(x, y) < lv ? cb : ca;
      }
    }
  }
  /**
   * Step colours one place up a ramp with a dithered density that falls off
   * from a centre (a sun's glow on the sky).
   */
  lighten(cx, cy, r, ramp, peak = 1, power = 2, sy = 1, steps = 1) {
    const next = /* @__PURE__ */ new Map();
    ramp.forEach((a, i) => next.set(a, ramp[Math.min(ramp.length - 1, i + steps)]));
    const ya = Math.max(0, Math.floor(cy - r * sy));
    const yb = Math.min(this.h - 1, Math.ceil(cy + r * sy));
    const xa = Math.max(0, Math.floor(cx - r));
    const xb = Math.min(this.w - 1, Math.ceil(cx + r));
    for (let y = ya; y <= yb; y++)
      for (let x = xa; x <= xb; x++) {
        const d = Math.hypot(x - cx, (y - cy) / sy);
        if (d >= r) continue;
        const i = y * this.w + x;
        const n = next.get(this.data[i]);
        if (n !== void 0 && bayer(x, y) < peak * (1 - d / r) ** power * 16) this.data[i] = n;
      }
  }
  /** Copy into an ImageData's buffer. */
  blit(img) {
    new Uint32Array(img.data.buffer).set(this.data);
  }
};
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = a + 1831565813 >>> 0;
    let t = a;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

// ../../../../../../home/varun/Personal/projects/website/src/directions/pixel/palette.ts
var art = {
  // Sky, top to horizon, then the sun.
  sky0: "#a9d8ef",
  sky1: "#c9e7ec",
  sky2: "#eef3d4",
  sky3: "#fff3bf",
  sky4: "#ffe596",
  sky5: "#ffd36e",
  sky6: "#fff0b0",
  sun: "#fffbe6",
  // Browns: outlines, edges, frames.
  d0: "#7a4824",
  d1: "#b97a3c",
  d2: "#e2c08c",
  // The board: cream and wheat, with a brown edge.
  b0: "#fffaea",
  b1: "#f6dc9a",
  b2: "#ecc878",
  b3: "#b97a3c",
  // White pieces and dark pieces.
  w0: "#fffdf2",
  w1: "#f7eed3",
  w2: "#ddc89c",
  p0: "#8a5530",
  p1: "#5a341c",
  // Light: mint and baby pink, each with a deeper core.
  m0: "#b6f2df",
  m1: "#effff8",
  m2: "#86d6c4",
  mt: "#3fa893",
  pk: "#ffb8cb",
  pr: "#ec6f98",
  // Peach light.
  e0: "#ffd2b8",
  e1: "#f58a5c",
  // Far hills and the meadow, pale to deep.
  h0: "#9fcfc4",
  h1: "#c8e6c8",
  g0: "#b5d88a",
  g1: "#7fb85e",
  g2: "#55945a",
  g3: "#2f6248",
  // Sunflower petals, light to shade, and seeds.
  f0: "#fff0a0",
  f1: "#ffd23f",
  f2: "#f2a922",
  f3: "#c46f1c",
  s0: "#b97a3c",
  s1: "#7a4824",
  s2: "#4a2c18",
  // Varun: skin, hair, his teal top, the coral and pink blanket.
  sk1: "#c4875a",
  sk2: "#94603e",
  hr: "#2a2321",
  t0: "#2c5a52",
  t1: "#45747a",
  k1: "#ff8f6b",
  k2: "#ffc6d3",
  // The darkest ink, for tiny details.
  ink: "#3b2a1a"
};
var branchLight = {
  research: { halo: art.sky0, core: "#4f86d6", head: art.w0 },
  teaching: { halo: art.e0, core: art.e1, head: art.sun },
  tools: { halo: art.m0, core: art.mt, head: art.m1 },
  writing: { halo: art.pk, core: art.pr, head: art.w0 }
};
var tokens = {
  // Grounds.
  "--px-ground": "#fffbf0",
  "--px-ground-2": "#fff6df",
  "--px-ink": "#3b2a1a",
  "--px-ink-2": "#6b4a2c",
  "--px-rule": "#f0e2bd",
  // The six pastels.
  "--px-sunflower": art.f1,
  "--px-peach": art.e0,
  "--px-mint": art.m0,
  "--px-blue": art.sky0,
  "--px-blush": art.pk,
  "--px-butter": art.sky6,
  // A mid tone of each, for markers, underlines, button shadows and chip
  // borders: still soft, but it shows on cream.
  "--px-sunflower-mid": "#f7c234",
  "--px-peach-mid": "#f7a985",
  "--px-mint-mid": "#6fcfb5",
  "--px-blue-mid": "#7fb6e0",
  "--px-blush-mid": "#f49ab4",
  // Their deeper shades, for text, rules and focus (AA on the ground).
  "--px-sunflower-deep": "#875306",
  "--px-peach-deep": "#9c4a2f",
  "--px-mint-deep": "#2c7064",
  "--px-blue-deep": "#2f6297",
  "--px-blush-deep": "#a8355f",
  "--px-butter-deep": "#7d5f14",
  // Frames: a sunflower line round a near-white inside.
  "--px-frame-hi": art.w0,
  "--px-frame-lo": "#f7c234"
};
function packed(hex) {
  const n = parseInt(hex.slice(1), 16);
  return (4278190080 | (n & 255) << 16 | n & 65280 | n >> 16) >>> 0;
}
var P = Object.fromEntries(
  Object.entries(art).map(([k, v]) => [k, packed(v)])
);

// ../../../../../../home/varun/Personal/projects/website/src/directions/pixel/world/colors.ts
var HEX = {
  o: "#5a3a22",
  // outline, warm brown
  k: "#3b2a1a",
  // ink
  B: "#8a5a34",
  // brown
  w: "#c4875a",
  // wood, skin
  t: "#e2c08c",
  // tan
  C: "#fff3d6",
  // cream
  W: "#fffdf2",
  // near white
  Y: "#fff0a0",
  // butter
  S: "#ffd23f",
  // sunflower
  D: "#f2a922",
  // deep sunflower
  A: "#d98a2b",
  // amber
  p: "#ffd2b8",
  // peach
  P: "#f58a5c",
  // coral
  r: "#ffb8cb",
  // baby pink
  R: "#f49ab4",
  // pink
  Q: "#d9668a",
  // rose
  e: "#d6eef8",
  // pale sky
  b: "#a9d8ef",
  // baby blue
  u: "#7fb6e0",
  // blue
  U: "#4f86c6",
  // deep blue
  n: "#34557a",
  // night
  N: "#223a56",
  // deep night
  i: "#d4f5e9",
  // pale mint
  m: "#a6e3cf",
  // mint
  M: "#6fcfb5",
  // mid mint
  T: "#3fa893",
  // teal
  h: "#c8e6a0",
  // pale grass
  g: "#9fd07a",
  // grass
  G: "#6fb35e",
  // mid grass
  v: "#3f8a4e",
  // deep grass
  F: "#2f6248"
  // forest
};
var K = Object.fromEntries(Object.entries(HEX).map(([k, v]) => [k, packed(v)]));
var SKY = {
  dawn: ["u", "b", "e", "C", "p", "Y"],
  day: ["u", "b", "e", "C", "Y"],
  sunset: ["b", "e", "p", "r", "R", "P", "S"],
  night: ["N", "n", "U", "u"]
};
var SHIFT = {
  dawn: { W: "C", e: "p" },
  day: {},
  sunset: { W: "p", C: "p", e: "p", b: "p", u: "P", i: "p", h: "g", Y: "S" },
  night: {
    W: "u",
    C: "u",
    Y: "S",
    S: "D",
    D: "A",
    A: "B",
    t: "w",
    w: "B",
    B: "o",
    p: "w",
    P: "A",
    r: "M",
    R: "u",
    Q: "U",
    e: "u",
    b: "U",
    u: "U",
    U: "n",
    n: "N",
    i: "M",
    m: "T",
    M: "T",
    T: "F",
    h: "T",
    g: "v",
    G: "F",
    v: "F",
    F: "N"
  }
};
function shiftMap(phase) {
  const m = /* @__PURE__ */ new Map();
  for (const [a, b] of Object.entries(SHIFT[phase])) m.set(K[a], K[b]);
  return m;
}

// ../../../../../../home/varun/Personal/projects/website/src/directions/pixel/world/sprites.ts
var GLASS = 4278387201;
var GLASS2 = 4278387202;
function ascii(rows) {
  const p = new Pix(Math.max(...rows.map((r) => r.length)), rows.length);
  rows.forEach((row, y) => [...row].forEach((ch, x) => ch !== "." && ch !== " " && p.p(x, y, K[ch])));
  return p;
}
function stamp(dst, src, x, y, flip = false, map) {
  x = Math.round(x);
  y = Math.round(y);
  for (let j = 0; j < src.h; j++) {
    const yy = y + j;
    if (yy < 0 || yy >= dst.h) continue;
    for (let i = 0; i < src.w; i++) {
      const c = src.data[j * src.w + (flip ? src.w - 1 - i : i)];
      if (!c) continue;
      const xx = x + i;
      if (xx >= 0 && xx < dst.w) dst.data[yy * dst.w + xx] = map?.get(c) ?? c;
    }
  }
}
function outline(p, c = K.o) {
  const src = p.data.slice();
  for (let y = 0; y < p.h; y++)
    for (let x = 0; x < p.w; x++) {
      if (src[y * p.w + x]) continue;
      const at = (xx, yy) => xx >= 0 && yy >= 0 && xx < p.w && yy < p.h && src[yy * p.w + xx] !== 0;
      if (at(x - 1, y) || at(x + 1, y) || at(x, y - 1) || at(x, y + 1)) p.data[y * p.w + x] = c;
    }
  return p;
}
function windowAt(p, x0, y0, w, h, frame = K.w) {
  p.rect(x0 - 1, y0 - 1, x0 + w, y0 + h, frame);
  p.rect(x0, y0, x0 + w - 1, y0 + h - 1, GLASS2);
  p.rect(x0, y0, x0 + w - 1, y0 + Math.floor(h / 2) - 1, GLASS);
  if (w >= 4) p.vline(x0 + Math.floor(w / 2), y0, y0 + h - 1, frame);
}
function shingles(p, pts, base, line, light, y0) {
  const tmp = new Pix(p.w, p.h);
  tmp.poly(pts, 1);
  for (let i = 0; i < tmp.data.length; i++) {
    if (!tmp.data[i]) continue;
    const x = i % p.w;
    const y = i / p.w | 0;
    const r = y - y0;
    let c = base;
    if (r <= 1) c = light;
    else if (r % 3 === 0) c = line;
    else if (r % 3 === 1 && (x + (r / 3 | 0) % 2 * 2) % 4 === 0) c = line;
    p.data[i] = c;
  }
}
function schoolhouse() {
  const p = new Pix(48, 46);
  const G = 44;
  shingles(p, [[11, 16], [27, 16], [37, 28], [21, 28]], K.P, K.Q, K.p, 16);
  p.rect(20, 28, 36, G, K.W);
  p.rect(20, 28, 36, 28, K.t);
  p.rect(20, G - 2, 36, G, K.t);
  p.poly([[3, 28], [20, 28], [11.5, 18]], K.C);
  p.rect(3, 28, 19, G, K.C);
  p.rect(3, G - 2, 19, G, K.t);
  p.vline(3, 28, G, K.t);
  p.line(1, 29, 11, 16, K.P);
  p.line(2, 29, 11, 17, K.P);
  p.line(12, 16, 21, 28, K.Q);
  p.line(12, 17, 20, 28, K.P);
  p.hline(1, 2, 29, K.P);
  p.rect(10, 22, 13, 25, K.w);
  p.rect(11, 23, 12, 24, GLASS);
  p.p(12, 24, GLASS2);
  p.rect(8, 33, 14, G - 1, K.B);
  p.rect(9, 34, 13, G - 1, K.w);
  p.vline(11, 34, G - 1, K.B);
  p.p(13, 39, K.S);
  p.rect(7, G, 15, G, K.t);
  windowAt(p, 23, 32, 4, 5);
  windowAt(p, 30, 32, 4, 5);
  p.rect(14, 9, 19, 16, K.C);
  p.rect(18, 9, 19, 16, K.W);
  p.rect(15, 11, 17, 14, K.B);
  p.rect(15, 12, 17, 14, K.S);
  p.p(17, 12, K.Y);
  p.p(16, 14, K.A);
  p.poly([[12.5, 10], [21.5, 10], [17, 4]], K.P);
  p.line(17, 4, 21, 9, K.Q);
  p.rect(30, 12, 32, 21, K.B);
  p.rect(30, 12, 32, 12, K.k);
  p.p(31, 15, K.w);
  p.p(30, 18, K.w);
  p.line(39, 33, 38, G, K.B);
  p.line(45, 33, 46, G, K.B);
  p.rect(38, 32, 46, 39, K.w);
  p.rect(39, 33, 45, 38, K.F);
  p.hline(40, 42, 34, K.W);
  p.p(43, 35, K.W);
  p.hline(40, 41, 36, K.W);
  p.hline(43, 44, 37, K.i);
  outline(p);
  return { pix: p, marks: { smoke: [31, 10], door: [11, G + 1], bell: [16, 13] } };
}
function observatory() {
  const p = new Pix(46, 50);
  const G = 48;
  for (let x = 5; x <= 21; x++) {
    const c = x <= 6 ? K.t : x <= 12 ? K.C : x <= 19 ? K.W : K.C;
    p.vline(x, 25, G, c);
  }
  p.rect(5, 25, 21, 26, K.B);
  p.rect(5, 27, 21, 27, K.t);
  p.rect(5, G - 1, 21, G, K.t);
  p.rect(10, 39, 14, G, K.B);
  p.rect(11, 38, 13, 38, K.B);
  p.rect(11, 40, 13, G, K.w);
  windowAt(p, 17, 31, 2, 4);
  for (let y = 14; y <= 24; y++)
    for (let x = 3; x <= 23; x++) {
      const dx = (x - 13) / 10.5;
      const dy = (y - 24.5) / 10.5;
      if (dx * dx + dy * dy > 1) continue;
      const l = dx * 0.8 - dy * 0.4;
      p.p(x, y, l > 0.62 ? K.e : l > -0.05 ? K.b : K.u);
    }
  p.rect(11, 15, 12, 24, K.n);
  p.line(12, 20, 19, 11, K.U);
  p.line(12, 21, 20, 12, K.U);
  p.line(13, 21, 20, 13, K.k);
  p.p(20, 11, K.k);
  p.rect(23, 34, 40, G, K.m);
  p.rect(36, 34, 40, G, K.i);
  p.rect(22, 32, 41, 33, K.T);
  p.hline(22, 41, 32, K.M);
  windowAt(p, 26, 37, 4, 4);
  p.rect(33, 39, 35, G, K.T);
  p.p(35, 43, K.S);
  p.rect(24, 29, 29, 31, K.n);
  p.rect(31, 29, 36, 31, K.n);
  p.hline(24, 29, 29, K.U);
  p.hline(31, 36, 29, K.U);
  p.vline(25, 26, 28, K.k);
  p.vline(35, 26, 28, K.k);
  p.vline(39, 20, 31, K.k);
  p.hline(38, 40, 24, K.k);
  outline(p);
  return {
    pix: p,
    marks: { door: [12, G + 1], led1: [26, 30], led2: [28, 30], led3: [33, 30], led4: [35, 30], mast: [39, 19] }
  };
}
function workshop() {
  const p = new Pix(58, 42);
  const G = 40;
  shingles(p, [[15, 10], [31, 10], [44, 22], [28, 22]], K.u, K.U, K.b, 10);
  p.rect(28, 22, 43, G, K.t);
  for (let x = 30; x <= 43; x += 4) p.vline(x, 23, G, K.w);
  p.hline(28, 43, 22, K.w);
  p.poly([[3, 22], [28, 22], [15.5, 11]], K.w);
  p.rect(3, 22, 27, G, K.w);
  for (let x = 5; x <= 27; x += 4) p.vline(x, 14 + Math.abs(x - 15.5) * 0.85, G, K.B);
  p.vline(3, 22, G, K.B);
  p.line(1, 23, 15, 10, K.U);
  p.line(2, 23, 15, 11, K.u);
  p.line(16, 10, 29, 22, K.U);
  p.rect(8, 26, 22, G, K.B);
  p.rect(9, 27, 21, G, K.w);
  p.line(9, 27, 21, G, K.B);
  p.line(21, 27, 9, G, K.B);
  p.hline(7, 23, 25, K.k);
  windowAt(p, 31, 26, 4, 4);
  p.rect(36, 5, 37, 15, K.k);
  p.hline(35, 38, 5, K.k);
  p.rect(40, 31, 43, G, K.k);
  p.rect(41, 32, 43, G, K.B);
  for (const x of [44, 56]) p.vline(x, 36, G, K.B);
  p.rect(41, 34, 57, 35, K.k);
  outline(p);
  return { pix: p, marks: { smoke: [36, 3], door: [15, G + 1], gear: [15, 19], belt0: [42, 33], belt1: [57, 33] } };
}
function treehouse() {
  const p = new Pix(52, 64);
  const G = 62;
  for (let y = 30; y <= G; y++) {
    const flare = y > G - 5 ? (y - (G - 5)) * 0.8 : 0;
    const x0 = Math.round(22 - flare);
    const x1 = Math.round(29 + flare);
    for (let x = x0; x <= x1; x++) p.p(x, y, x >= x1 - 2 ? K.w : x <= x0 + 1 ? K.k : K.B);
  }
  p.line(28, 40, 34, 34, K.B);
  const blobs = [
    [26, 22, 15],
    [12, 28, 9],
    [40, 28, 9],
    [26, 10, 10],
    [15, 16, 8],
    [37, 16, 8]
  ];
  for (let y = 0; y < 44; y++)
    for (let x = 0; x < 52; x++) {
      let best = -9;
      for (const [cx, cy, r] of blobs) {
        const dx = (x - cx) / r;
        const dy = (y - cy) / r;
        if (dx * dx + dy * dy <= 1) best = Math.max(best, dx * 0.6 - dy * 0.6 + (1 - Math.hypot(dx, dy)) * 0.3);
      }
      if (best === -9) continue;
      const b = bayer(x, y) / 16 - 0.5;
      p.p(x, y, best + b * 0.12 > 0.5 ? K.h : best + b * 0.12 > 0.05 ? K.g : best + b * 0.12 > -0.35 ? K.G : K.v);
    }
  p.rect(15, 24, 33, 36, K.r);
  p.rect(30, 24, 33, 36, K.C);
  p.poly([[12, 25], [36, 25], [24, 13]], K.R);
  p.line(24, 13, 36, 25, K.Q);
  p.line(24, 14, 35, 25, K.Q);
  p.hline(12, 36, 25, K.Q);
  for (const [dx, dy] of [[-2, -1], [-2, 0], [-2, 1], [2, -1], [2, 0], [2, 1], [-1, -2], [0, -2], [1, -2], [-1, 2], [0, 2], [1, 2]])
    p.p(20 + dx, 30 + dy, K.w);
  p.rect(19, 29, 21, 31, GLASS);
  p.rect(19, 31, 21, 31, GLASS2);
  p.rect(26, 29, 29, 36, K.B);
  p.p(28, 33, K.S);
  p.rect(10, 37, 38, 38, K.w);
  p.hline(10, 38, 38, K.B);
  for (let x = 10; x <= 38; x += 4) p.vline(x, 34, 37, K.B);
  p.hline(10, 38, 34, K.w);
  p.hline(12, 15, 36, K.U);
  p.hline(11, 15, 35, K.S);
  p.hline(12, 14, 34, K.M);
  p.p(15, 34, K.W);
  for (let y = 39; y <= G; y++) {
    p.p(34, y, K.t);
    p.p(37, y, K.t);
    if (y % 3 === 0) p.hline(35, 36, y, K.w);
  }
  p.line(40, 30, 44, 30, K.B);
  p.vline(44, 31, 32, K.k);
  p.rect(43, 33, 45, 35, K.S);
  p.hline(43, 45, 33, K.k);
  p.p(44, 34, K.Y);
  outline(p);
  return { pix: p, marks: { door: [35, G + 1], lantern: [44, 34], lamp: [20, 30] } };
}
function noticeBoard() {
  const p = new Pix(26, 26);
  const G = 24;
  p.rect(4, 7, 5, G, K.B);
  p.rect(20, 7, 21, G, K.B);
  p.p(5, 12, K.w);
  p.p(21, 14, K.w);
  p.poly([[1, 6], [24, 6], [21, 2], [4, 2]], K.P);
  p.hline(4, 21, 2, K.p);
  p.hline(1, 24, 6, K.Q);
  p.rect(3, 7, 22, 17, K.B);
  p.rect(4, 8, 21, 16, K.t);
  for (let y = 8; y <= 16; y++) for (let x = 4; x <= 21; x++) if (bayer(x, y) === 0) p.p(x, y, K.w);
  p.rect(5, 9, 9, 14, K.W);
  p.hline(6, 8, 11, K.t);
  p.hline(6, 7, 13, K.t);
  p.rect(11, 9, 14, 12, K.r);
  p.rect(16, 10, 20, 15, K.b);
  p.hline(17, 19, 12, K.W);
  p.rect(11, 14, 14, 16, K.m);
  p.p(7, 9, K.Q);
  p.p(12, 9, K.U);
  p.p(18, 10, K.Q);
  p.p(12, 14, K.T);
  outline(p);
  return { pix: p, marks: { door: [12, G + 1] } };
}
var ICON = {
  research: ["..S..", "SSSSS", ".SSS.", ".S.S.", "....."],
  teaching: ["FFFFF", "FWFFF", "FFWWF", "FFFFF", ".B.B."],
  tools: [".k.k.", "kkkkk", "kk.kk", "kkkkk", ".k.k."],
  writing: ["QQ.QQ", "QWQWQ", "QWQWQ", "QWQWQ", "QQQQQ"],
  cv: [".WWW.", ".WkW.", ".WWW.", ".WkW.", ".WWW."]
};
function signpost(id) {
  const p = new Pix(11, 14);
  p.rect(4, 7, 5, 13, K.B);
  p.vline(5, 8, 13, K.w);
  p.rect(0, 0, 10, 7, K.t);
  p.hline(0, 10, 7, K.w);
  p.hline(0, 10, 0, K.C);
  stamp(p, ascii(ICON[id]), 3, 1);
  const q = new Pix(13, 16);
  stamp(q, p, 1, 1);
  return outline(q);
}
var KNIGHT = ascii([
  "....oo.....",
  "...oWWo....",
  "..oWWWWo...",
  ".oWWkWWWo..",
  "oWWWWWWWCo.",
  "oWoooWWWCo.",
  ".o..oWWWCo.",
  "...oWWWWCo.",
  "..oWWWWWCo.",
  "..oCCCCCCo.",
  ".oWWWWWWCCo",
  ".ooooooooo."
]);
var BEE = [
  ascii(["..WW.WW.", "..WWWWW.", ".SkSkSk.", "kSkSkSkk", ".SkSkSk.", "...k.k.."]),
  ascii(["........", "..WWWWW.", ".SkSkSk.", "kSkSkSkk", ".SkSkSk.", "...k.k.."])
];
var PACKET = ascii(["ooooo", "oWkWo", "oWWWo", "ooooo"]);
var BUTTERFLY = [
  [ascii(["RR.RR", "rRkRr", ".rkr.", "..k.."]), ascii(["..k..", ".RkR.", ".rkr.", "..k.."])],
  [ascii(["uu.uu", "bukub", ".bkb.", "..k.."]), ascii(["..k..", ".uku.", ".bkb.", "..k.."])]
];
var VARUN = ascii([
  ".........k..k...........",
  ".......kkkkkkkkk........",
  ".....kkkkkkkkkkkkk......",
  "....kkkkkkkkkkkkkkkk....",
  "...kkkkkkkkkkkkkkkkkk...",
  "...kkkkkkkkkkkkkkkkkk...",
  "..kkkkkkkkkkkkkkkkkkkk..",
  "..kkkkkkkwwkkkkkkkkkkk..",
  "..kkkwwwwwwwwwkkkwwkkk..",
  "..kkwwwwwwwwwwwwwwwwkk..",
  ".BkkwwkWwwwwwwwkWwwwkkB.",
  ".BwwwwkkwwwwwwwkkwwwBBB.",
  "..wwwwkkwwwwwwwkkwwwwB..",
  "..wrrwwwwwwwwwwwwwrrwB..",
  "...wwwwwwBwwwwBwwwwwB...",
  "....BwwwwwBBBBwwwwBB....",
  "......BBBBBBBBBBBB......",
  ".......kkkkkkkkkk.......",
  ".....FFFkkkkkkkkFFF.....",
  "...FFFTFFFFFFFFFFFTFF...",
  "..FFFFTWWWWWWWWWWWTFFF..",
  "..FFFFWWWWPWWWWWWWFFFF..",
  "..FFFFWWWWWPWWWWWWFFFF..",
  "..FFFFWWWWWPWWWWWWFFFF..",
  "..FF..WWWWPWPWWWWW..FF..",
  "..FF..WWWWPWPWWWWW..FF..",
  ".BBBBBeeeeeeeeeeeeeeBBB.",
  "BBBBBBBBBBBBBBBBBBBBBBBB",
  "WWBBBBBBBBBBBBBBBBBBBWW."
]);

// ../../../../../../home/varun/Personal/projects/website/src/directions/pixel/world/valley.ts
var PLACE_IDS = ["research", "teaching", "tools", "writing", "cv"];
var WIDE = {
  hz: 0.4,
  knoll: 0.47,
  places: {
    research: [0.47, 0.5],
    teaching: [0.17, 0.64],
    tools: [0.67, 0.8],
    writing: [0.86, 0.66],
    cv: [0.42, 0.8]
  },
  signs: { research: [-12, 3], teaching: [-12, 4], tools: [-13, 4], writing: [-10, 4], cv: [-17, 6] },
  picnic: [0.255, 0.91],
  tall: [
    [0.025, 92, false],
    [0.075, 66, false],
    [0.935, 62, true],
    [0.985, 88, false]
  ],
  small: [
    [0.33, 0.8],
    [0.35, 0.83],
    [0.52, 0.86],
    [0.55, 0.83],
    [0.58, 0.88],
    [0.76, 0.84],
    [0.79, 0.87],
    [0.06, 0.66],
    [0.27, 0.67],
    [0.3, 0.7],
    [0.74, 0.69]
  ],
  trees: [[0.07, 0.47], [0.3, 0.46], [0.61, 0.47], [0.95, 0.45], [0.36, 0.53], [0.75, 0.55]],
  pond: [0.6, 0.925, 20, 5],
  name: [0, 0, 0.42, 0.34]
};
var TALL = {
  hz: 0.3,
  knoll: 0.72,
  places: {
    research: [0.72, 0.39],
    teaching: [0.73, 0.62],
    tools: [0.33, 0.755],
    writing: [0.25, 0.505],
    cv: [0.72, 0.85]
  },
  signs: { research: [-12, 3], teaching: [-12, 4], tools: [-13, 4], writing: [11, 3], cv: [-17, 6] },
  picnic: [0.33, 0.95],
  tall: [
    [0.03, 74, false],
    [0.95, 60, true]
  ],
  small: [[0.5, 0.66], [0.55, 0.7], [0.12, 0.66], [0.6, 0.79], [0.9, 0.74], [0.47, 0.88]],
  trees: [[0.1, 0.33], [0.42, 0.34], [0.93, 0.33], [0.5, 0.45]],
  name: [0, 0, 1, 0.22]
};
var band = (id, x, rest) => ({
  hz: rest.hz ?? 0.42,
  knoll: 0.2,
  places: { [id]: [x, 0.86] },
  signs: {},
  band: true,
  tall: rest.tall,
  small: rest.small,
  trees: rest.trees,
  name: [0, 0, 0, 0]
});
var TOOLS_BAND = band("tools", 0.5, {
  tall: [[0.03, 70, false], [0.97, 58, true]],
  small: [[0.18, 0.86], [0.22, 0.9], [0.27, 0.84], [0.74, 0.9], [0.8, 0.85], [0.85, 0.92]],
  trees: [[0.1, 0.5], [0.34, 0.47], [0.88, 0.49]]
});
var RESEARCH_BAND = band("research", 0.55, {
  hz: 0.38,
  tall: [[0.04, 64, true], [0.96, 72, false]],
  small: [[0.2, 0.88], [0.26, 0.84], [0.32, 0.91], [0.76, 0.86], [0.83, 0.9]],
  trees: [[0.14, 0.47], [0.3, 0.44], [0.82, 0.46]]
});
var TEACHING_BAND = band("teaching", 0.45, {
  tall: [[0.03, 60, false], [0.96, 70, false]],
  small: [[0.16, 0.9], [0.22, 0.85], [0.66, 0.88], [0.72, 0.84], [0.8, 0.91]],
  trees: [[0.12, 0.49], [0.7, 0.45], [0.86, 0.5]]
});
var WRITING_BAND = band("writing", 0.5, {
  hz: 0.36,
  tall: [[0.04, 72, false], [0.96, 62, true]],
  small: [[0.2, 0.86], [0.26, 0.91], [0.7, 0.88], [0.77, 0.84], [0.83, 0.9]],
  trees: [[0.12, 0.45], [0.86, 0.47]]
});
var CV_BAND = band("cv", 0.5, {
  tall: [[0.04, 66, true], [0.96, 60, false]],
  small: [[0.18, 0.86], [0.24, 0.91], [0.3, 0.84], [0.7, 0.9], [0.76, 0.85], [0.82, 0.92]],
  trees: [[0.12, 0.48], [0.32, 0.45], [0.68, 0.46], [0.88, 0.49]]
});
var TINT = { research: "u", teaching: "P", tools: "M", writing: "R", cv: "S" };
var ROUTES = [
  ["research", "teaching"],
  ["tools", "writing"],
  ["cv", "research"],
  ["teaching", "tools"]
];
var PATHS = [
  ["teaching", "cv"],
  ["research", "cv"],
  ["cv", "tools"],
  ["tools", "writing"],
  ["research", "writing"]
];
var DARKER = {
  W: "C",
  C: "t",
  Y: "S",
  S: "D",
  D: "A",
  A: "B",
  t: "w",
  w: "B",
  B: "o",
  p: "P",
  r: "R",
  R: "Q",
  e: "b",
  b: "u",
  u: "U",
  U: "n",
  n: "N",
  i: "m",
  m: "M",
  M: "T",
  T: "F",
  h: "g",
  g: "G",
  G: "v",
  v: "F",
  F: "N"
};
var cubic = (a, b, c, d, s) => {
  const u = 1 - s;
  return [
    u * u * u * a[0] + 3 * u * u * s * b[0] + 3 * u * s * s * c[0] + s * s * s * d[0],
    u * u * u * a[1] + 3 * u * u * s * b[1] + 3 * u * s * s * c[1] + s * s * s * d[1]
  ];
};
var quad = (a, b, c, s) => {
  const u = 1 - s;
  return [u * u * a[0] + 2 * u * s * b[0] + s * s * c[0], u * u * a[1] + 2 * u * s * b[1] + s * s * c[1]];
};
var ease = (s) => s * s * (3 - 2 * s);
var MUG = ascii(["oooooo.", "oBBBBo.", "oWWWWoo", "oWWWWWo", "oWWWWoo", "oooooo."]);
var HAND = [ascii([".oo..", "owwo.", "owwwo", "owwo.", ".oo.."]), ascii(["..oo.", ".owwo", "owwwo", ".owwo", "..oo."])];
var Valley = class {
  constructor(W, H, phase, layout) {
    __publicField(this, "W");
    __publicField(this, "H");
    __publicField(this, "tall");
    __publicField(this, "phase");
    __publicField(this, "places");
    __publicField(this, "L");
    __publicField(this, "out");
    __publicField(this, "sky");
    __publicField(this, "far");
    __publicField(this, "back");
    __publicField(this, "land");
    __publicField(this, "M", 12);
    __publicField(this, "map");
    __publicField(this, "dark", /* @__PURE__ */ new Map());
    __publicField(this, "clouds", []);
    __publicField(this, "stars", []);
    __publicField(this, "signPix", /* @__PURE__ */ new Map());
    __publicField(this, "routes", []);
    __publicField(this, "glow");
    __publicField(this, "pond", null);
    // Things that move.
    __publicField(this, "time", 0);
    __publicField(this, "pointer", null);
    __publicField(this, "par", [0, 0]);
    __publicField(this, "parGoal", [0, 0]);
    __publicField(this, "focus", null);
    __publicField(this, "hot", -1);
    __publicField(this, "card", { bee: -1, until: 0, seq: 0 });
    __publicField(this, "waving", false);
    __publicField(this, "knight");
    __publicField(this, "hops", []);
    __publicField(this, "hop", null);
    __publicField(this, "rest", 0);
    __publicField(this, "tour", 0);
    __publicField(this, "bits", []);
    __publicField(this, "petals", []);
    __publicField(this, "rain", 0);
    __publicField(this, "flowers");
    this.W = W;
    this.H = H;
    this.phase = phase;
    this.tall = W / H < 1;
    this.L = layout ?? (this.tall ? TALL : WIDE);
    this.map = shiftMap(phase);
    for (const [a, b] of Object.entries(DARKER)) {
      const c = this.c(a);
      this.dark.set(c, this.c(b));
    }
    this.out = new Pix(W, H);
    this.sky = new Pix(W, H);
    this.far = new Pix(W + 2 * this.M, H);
    this.back = new Pix(W + 2 * this.M, H);
    this.land = new Pix(W, H);
    this.glow = phase === "night" ? [K.S, K.D] : phase === "sunset" ? [K.p, K.r] : phase === "dawn" ? [K.W, K.r] : [K.e, K.b];
    const L = this.L;
    const mk = {
      research: observatory,
      teaching: schoolhouse,
      tools: workshop,
      writing: treehouse,
      cv: noticeBoard
    };
    this.places = PLACE_IDS.filter((id) => L.places[id]).map((id) => {
      const built = mk[id]();
      const [fx, fy] = L.places[id];
      const ax = Math.round(fx * W);
      const ay = Math.round(fy * H);
      const x = ax - (built.pix.w >> 1);
      const y = ay - (built.pix.h - 2);
      const d = built.marks.door;
      const door = [x + d[0], y + d[1]];
      const off = L.signs[id] ?? [0, 0];
      const sign = [door[0] + off[0], door[1] + off[1]];
      this.signPix.set(id, signpost(id));
      return { id, built, x, y, door, sign };
    });
    const home = this.places.find((p) => p.id === "cv") ?? this.places[0];
    const kx = home.id === "cv" ? home.door[0] + 36 : home.x - 12;
    this.knight = L.band ? [kx, home.door[1] + 2] : [home.door[0] + 6, home.door[1]];
    this.flowers = L.tall.map(([fx, h, glasses], i) => ({
      x: Math.round(fx * W),
      h: Math.round(h * (this.tall ? 0.9 : 1)),
      glasses,
      seed: i * 1.7 + 0.4,
      face: 0.4
    }));
    for (const [a, b] of ROUTES.filter(([a2, b2]) => L.places[a2] && L.places[b2])) {
      const p0 = this.mid(a);
      const p2 = this.mid(b);
      const lift = Math.hypot(p2[0] - p0[0], p2[1] - p0[1]) * 0.35;
      const p1 = [(p0[0] + p2[0]) / 2, Math.min(p0[1], p2[1]) - lift];
      this.routes.push({ a, b, p0, p1, p2 });
    }
    this.buildSky();
    this.buildHills();
    this.buildLand();
  }
  c(ch) {
    const k = K[ch];
    return this.map.get(k) ?? k;
  }
  at(id) {
    return this.places.find((p) => p.id === id);
  }
  /** Where a bee lands: just above the place's roof line. */
  mid(id) {
    const p = this.at(id);
    return [p.x + (p.built.pix.w >> 1), p.y + Math.round(p.built.pix.h * 0.3)];
  }
  /** The signpost boxes, for the page to lay its links over. */
  signs() {
    return this.places.map((p) => ({ id: p.id, x: p.sign[0] - 6, y: p.sign[1] - 15, w: 13, h: 16 }));
  }
  /** The area the page's name and line sit over, in art pixels. */
  get nameBox() {
    const [x0, y0, x1, y1] = this.L.name;
    return [x0 * this.W, y0 * this.H, x1 * this.W, y1 * this.H];
  }
  // ---------- building the still layers ----------
  buildSky() {
    const { W, H, sky } = this;
    const bands = SKY[this.phase];
    const hz = Math.round(this.L.hz * H);
    const n = bands.length;
    for (let y = 0; y < H; y++) {
      const f = Math.min(0.999, Math.max(0, y / hz)) * (n - 1);
      const i = Math.floor(f);
      const frac = f - i;
      for (let x = 0; x < W; x++) {
        const next = Math.min(n - 1, i + 1);
        sky.data[y * W + x] = K[frac * 16 > bayer(x, y) + 7 + (frac > 0.75 ? -6 : 0) ? bands[next] : bands[i]];
      }
    }
    const R = rng(7);
    if (this.phase === "night") {
      for (let i = 0; i < W * hz / 260; i++) this.stars.push([Math.floor(R() * W), Math.floor(R() * hz * 0.85)]);
      const mx = Math.round(W * (this.tall ? 0.8 : 0.83));
      const my = Math.round(H * (this.tall ? 0.09 : 0.15));
      for (let y = my - 14; y <= my + 14; y++)
        for (let x = mx - 14; x <= mx + 14; x++) {
          const d = Math.hypot(x - mx, y - my);
          if (d <= 6.5 && Math.hypot(x - mx + 3, y - my + 2) > 5.5) sky.p(x, y, d > 5.5 && x < mx ? K.Y : K.C);
          else if (d <= 13 && d > 6.5 && bayer(x, y) < (13 - d) * 1.2) sky.p(x, y, K.U);
        }
    } else {
      const sx = Math.round(W * (this.tall ? 0.82 : 0.84));
      let sy = Math.round(this.phase === "day" ? H * (this.tall ? 0.08 : 0.14) : hz - (this.tall ? 26 : 30));
      const r = this.phase === "sunset" ? 12 : 9;
      if (this.L.band && this.phase !== "day") sy = Math.max(r + 3, hz - 14);
      const core = this.phase === "sunset" ? K.S : K.W;
      const ring = this.phase === "sunset" ? K.D : K.Y;
      const halo = this.phase === "day" ? K.Y : this.phase === "sunset" ? K.S : K.Y;
      for (let y = sy - r * 2; y <= sy + r * 2; y++)
        for (let x = sx - r * 2; x <= sx + r * 2; x++) {
          const d = Math.hypot(x - sx, y - sy);
          if (d <= r - 2.5) sky.p(x, y, core);
          else if (d <= r) sky.p(x, y, ring);
          else if (d <= r * 1.9 && bayer(x, y) < (r * 1.9 - d) * (12 / r)) sky.p(x, y, halo);
        }
    }
    const cols = {
      dawn: ["W", "p", "P"],
      day: ["W", "C", "e"],
      sunset: ["Y", "p", "P"],
      night: ["U", "n", "n"]
    };
    const [top, mid, under] = cols[this.phase];
    const count = this.tall ? 3 : 5;
    for (let i = 0; i < count; i++) {
      const w = 22 + Math.floor(R() * 26);
      const h = 9 + Math.floor(R() * 5);
      const p = new Pix(w, h);
      const bumps = 3 + Math.floor(R() * 2);
      const cs = [];
      for (let b = 0; b < bumps; b++) {
        const r = 3 + R() * (h - 4);
        cs.push([3 + (w - 6) * (b + 0.5) / bumps + (R() - 0.5) * 3, h - 2, r]);
      }
      for (let y = 0; y < h - 1; y++)
        for (let x = 0; x < w; x++) {
          let inside = false;
          let l = -9;
          for (const [cx, cy, r] of cs) {
            const dx = (x - cx) / r;
            const dy = (y - cy) / r;
            if (dx * dx + dy * dy <= 1) {
              inside = true;
              l = Math.max(l, dx * 0.5 - dy);
            }
          }
          if (!inside) continue;
          p.p(x, y, K[y >= h - 3 ? under : l > 0.55 ? top : l > 0.2 && bayer(x, y) > 6 ? top : mid]);
        }
      this.clouds.push({
        pix: p,
        x: R() * (W + 60),
        y: Math.round(4 + R() * (hz * (this.tall ? 0.55 : 0.6))),
        v: 0.6 + R() * 1.2
      });
    }
  }
  ridge(seed, base, amp, freq) {
    const R = rng(seed);
    const ph = [R() * 6, R() * 6, R() * 6];
    return (x) => base - amp * (0.55 * Math.sin(x * freq + ph[0]) + 0.3 * Math.sin(x * freq * 2.3 + ph[1]) + 0.15 * Math.sin(x * freq * 5.1 + ph[2]) + 0.6);
  }
  /** A hill layer: fill, a lit rim on slopes facing the sun, a darker rim on the others. */
  hill(pix, f, fill, lit, shade, under) {
    for (let x = 0; x < pix.w; x++) {
      const y0 = Math.round(f(x));
      const slope = f(x + 1) - f(x - 1);
      for (let y = Math.max(0, y0); y < pix.h; y++) {
        let c = fill;
        if (y === y0) c = slope > 0.15 ? lit : slope < -0.15 ? shade : lit;
        else if (y === y0 + 1 && slope > 0.4) c = lit;
        else if (under && y > y0 + 6 && bayer(x, y) < Math.min(15, (y - y0 - 6) * 1.5)) c = under;
        pix.data[y * pix.w + x] = this.c(c);
      }
    }
  }
  buildHills() {
    const { H, M } = this;
    const hz = this.L.hz * H;
    const s = this.tall ? 0.6 : 1;
    const farF = this.ridge(3, hz - 6, 26 * s, this.tall ? 0.05 : 0.022);
    this.hill(this.far, (x) => farF(x - M), "b", "e", "u");
    const backF = this.ridge(11, hz - 2, 18 * s, this.tall ? 0.07 : 0.035);
    this.hill(this.back, (x) => backF(x - M), "m", "i", "M");
    const hash = (a, b) => (Math.sin(a * 12.9898 + b * 78.233) * 43758.5453 % 1 + 1) % 1;
    const kinds = [["g", "S"], ["m", "m"], ["i", "r"], ["h", "h"], ["g", "S"], ["t", "w"], ["m", "i"]];
    for (let x = 0; x < this.back.w; x++) {
      const y0 = Math.round(backF(x - M));
      for (let y = y0 + 3; y < H; y++) {
        const r = y - y0 - 3;
        const band2 = Math.floor(r / 6);
        const col = Math.floor((x + band2 * 13) / (20 + band2 % 3 * 6));
        const [base, dot] = kinds[Math.floor(hash(band2, col) * kinds.length)];
        let c = base;
        if (r % 6 === 5 || (x + band2 * 13) % (20 + band2 % 3 * 6) === 0) c = "G";
        else if (dot !== base && r % 2 === 0 && (x + r) % 2 === 0) c = dot;
        this.back.data[y * this.back.w + x] = this.c(c);
      }
    }
    const R = rng(5);
    for (let x = M; x < this.back.w - M; x += 5 + Math.floor(R() * 9)) {
      const y = Math.round(backF(x - M));
      if (R() < 0.45) continue;
      const h = 3 + Math.floor(R() * 3);
      for (let j = 0; j < h; j++) {
        const w = j === 0 || j === h - 1 ? 1 : 2;
        for (let i = -w + 1; i <= w - 1; i++) this.back.p(x + i, y - j, this.c(i > 0 ? "G" : "v"));
      }
    }
  }
  ground(x) {
    const { W, H, L } = this;
    const hz = L.hz * H;
    const k = (x - L.knoll * W) / (this.tall ? 34 : 46);
    return hz + 3 * Math.sin(x * 0.045) + 2 * Math.sin(x * 0.11 + 1) - 16 * Math.exp(-k * k);
  }
  buildLand() {
    const { W, H, land, L } = this;
    const hz = L.hz * H;
    const R = rng(23);
    const tops = [];
    for (let x = 0; x < W; x++) tops.push(Math.round(this.ground(x)));
    const span = H - hz;
    for (let x = 0; x < W; x++) {
      const y0 = tops[x];
      const slope = (tops[Math.min(W - 1, x + 1)] ?? y0) - (tops[Math.max(0, x - 1)] ?? y0);
      for (let y = y0; y < H; y++) {
        const d = (y - hz) / span;
        const f = d * 3.2;
        const band2 = Math.floor(f);
        const frac = f - band2;
        const names = ["h", "g", "g", "G"];
        const i = Math.min(3, band2 + (frac > 0.8 && (frac - 0.8) * 80 > bayer(x, y) ? 1 : 0));
        let c = names[Math.max(0, i)];
        if (y === y0) c = slope > 0 ? "i" : "h";
        land.p(x, y, K[c]);
      }
    }
    if (L.pond) {
      const [px0, py0, rx, ry] = L.pond;
      const cx = Math.round(px0 * W);
      const cy = Math.round(py0 * H);
      for (let y = cy - ry - 1; y <= cy + ry + 1; y++)
        for (let x2 = cx - rx - 1; x2 <= cx + rx + 1; x2++) {
          const d = ((x2 - cx) / rx) ** 2 + ((y - cy) / ry) ** 2;
          if (d <= 1) land.p(x2, y, K[y <= cy - ry + 1 ? "u" : y < cy ? "b" : bayer(x2, y) < 3 ? "e" : "b"]);
          else if (d <= 1.45 && y >= cy) land.p(x2, y, K.t);
          else if (d <= 1.3) land.p(x2, y, K.v);
        }
      const pad = ascii([".GGg.", "GGgGg", ".vGG."]);
      stamp(land, pad, cx - rx + 6, cy);
      land.p(cx - rx + 8, cy, K.r);
      this.pond = [cx, cy, rx, ry];
    }
    for (const [fx, fy] of L.trees) this.tree(land, Math.round(fx * W), Math.round(fy * H), 5 + Math.floor(R() * 3));
    const n = Math.round(W * H / 700);
    for (let i = 0; i < n; i++) {
      const fx = Math.floor(R() * W);
      const fy = Math.round(hz + span * (0.25 + R() * 0.75));
      const under = land.get(fx, fy);
      if (R() < 0.6) {
        const c = under === K.G ? K.v : K.G;
        land.p(fx, fy, c);
        land.p(fx - 1, fy - 1, c);
        land.p(fx + 1, fy - 1, c);
        land.p(fx + 1, fy, c);
      } else {
        const petal = [K.r, K.W, K.b, K.p][Math.floor(R() * 4)];
        land.p(fx, fy - 1, petal);
        land.p(fx - 1, fy, petal);
        land.p(fx + 1, fy, petal);
        land.p(fx, fy + 1, K.G);
        land.p(fx, fy, K.D);
      }
    }
    const mask = new Uint8Array(W * H);
    const r = this.tall ? 1.6 : 2.2;
    for (const [a, b] of PATHS.filter(([a2, b2]) => L.places[a2] && L.places[b2])) {
      const A = this.at(a).door;
      const B = this.at(b).door;
      const drop = 10 + Math.abs(B[0] - A[0]) * 0.1;
      const p1 = [A[0], A[1] + drop];
      const p2 = [B[0], B[1] + drop];
      const len = Math.hypot(B[0] - A[0], B[1] - A[1]) + 2 * drop;
      for (let s = 0; s <= 1; s += 0.5 / len) {
        const [px, py] = cubic(A, p1, p2, B, s);
        for (let dy = -2; dy <= 2; dy++)
          for (let dx = -3; dx <= 3; dx++) {
            if (dx * dx + dy * dy * 2.2 > r * r * 2) continue;
            const xx = Math.round(px + dx);
            const yy = Math.round(py + dy);
            if (xx >= 0 && yy >= 0 && xx < W && yy < H) mask[yy * W + xx] = 1;
          }
      }
    }
    const cv = this.places.find((p) => p.id === "cv");
    const [qx, qy] = cv ? [cv.door[0], cv.door[1] + 1] : [-99, -99];
    const qr = this.tall ? 20 : 26;
    if (L.band) {
      const ws2 = this.places[0];
      for (let x2 = 0; x2 < W; x2++) {
        const y = Math.round(ws2.door[1] + 3 + Math.sin(x2 * 0.04) * 2);
        for (let j = -2; j <= 2; j++) if (y + j < H) mask[(y + j) * W + x2] = 1;
      }
      for (let y = ws2.door[1] - 1; y < ws2.door[1] + 3; y++)
        for (let x2 = ws2.door[0] - 3; x2 <= ws2.door[0] + 3; x2++) mask[y * W + x2] = 1;
    }
    if (cv) for (let y = qy - 9; y <= qy + 9; y++)
      for (let xx = qx - qr; xx <= qx + qr; xx++) {
        const dx = (xx - qx) / qr;
        const dy = (y - qy) / (this.tall ? 7 : 8);
        if (dx * dx + dy * dy <= 1 && xx >= 0 && xx < W && y >= 0 && y < H) mask[y * W + xx] = 2;
      }
    for (let y = 1; y < H - 1; y++)
      for (let xx = 1; xx < W - 1; xx++) {
        const m = mask[y * W + xx];
        if (!m) continue;
        let c = "t";
        if (!mask[(y + 1) * W + xx]) c = "w";
        else if (!mask[(y - 1) * W + xx]) c = "C";
        else if (m === 2 && ((y - qy) % 3 === 0 || (xx + ((y - qy + 30) % 6 < 3 ? 0 : 2)) % 4 === 0)) c = "w";
        else if (m === 1 && bayer(xx, y) === 0 && R() < 0.35) c = "C";
        land.p(xx, y, K[c]);
      }
    if (L.picnic) this.blanket(land);
    for (const p of [...this.places].sort((a, b) => a.y + a.built.pix.h - (b.y + b.built.pix.h))) {
      this.shadow(land, p.x + 2, p.y + p.built.pix.h - 3, p.built.pix.w - 2);
      stamp(land, p.built.pix, p.x, p.y);
    }
    if (cv && L.band) {
      const bench = outline(ascii([
        "............",
        ".wwwwwwwwww.",
        ".BBBBBBBBBB.",
        ".wwwwwwwwww.",
        ".B........B.",
        ".B........B.",
        "............"
      ]));
      const lamp = outline(ascii([".....", ".kkk.", ".YSY.", ".YYY.", ".kkk.", "..B..", "..B..", "..B..", "..B..", "..B..", "..B..", "..B..", "..B..", "..B..", ".BBB.", "....."]));
      this.shadow(land, qx - qr - 4, qy + 2, 11);
      stamp(land, bench, qx - qr - 6, qy - 4);
      this.shadow(land, qx + qr - 1, qy, 4);
      stamp(land, lamp, qx + qr - 4, qy - 14);
    }
    const ws = this.places.find((p) => p.id === "tools");
    if (ws) {
      const tx = ws.x + ws.built.pix.w + 1;
      const ty = ws.y + ws.built.pix.h - 12;
      const table = new Pix(14, 11);
      table.rect(1, 4, 12, 5, K.w);
      table.hline(1, 12, 5, K.B);
      table.vline(2, 6, 10, K.B);
      table.vline(11, 6, 10, K.B);
      for (let j = 0; j < 3; j++) for (let i = 0; i < 8; i++) table.p(3 + i, 1 + j, (i + j) % 2 ? K.B : K.C);
      table.p(4, 0, K.W);
      table.p(9, 0, K.k);
      outline(table);
      this.shadow(land, tx + 2, ty + 10, 12);
      stamp(land, table, tx, ty);
    }
    const [g1, g2] = this.glow;
    for (let i = 0; i < land.data.length; i++) {
      const c = land.data[i];
      if (c === GLASS) land.data[i] = g1;
      else if (c === GLASS2) land.data[i] = g2;
      else if (c) land.data[i] = this.map.get(c) ?? c;
    }
  }
  blanket(land) {
    const [bx, by] = this.picnicAt();
    const bw = this.tall ? 40 : 46;
    for (let y = by; y < by + 13; y++)
      for (let xx = bx - 1 + (by + 13 - y >> 2); xx < bx + bw + (by + 13 - y >> 2); xx++) {
        const u = Math.floor((xx - bx) / 3) % 2;
        const v = Math.floor((y - by) / 2) % 2;
        land.p(xx, y, u && v ? K.R : u || v ? K.r : K.W);
      }
    this.outlineWhere(land, bx - 2, by - 1, bx + bw + 5, by + 14, (c) => c === K.R || c === K.r || c === K.W);
    const kx = bx + (this.tall ? 26 : 31);
    const ky = by + 1;
    const basket = ascii([
      "..oooooo...",
      ".o......o..",
      "oorrWrrWroo",
      "owtwtwtwtwo",
      "otwtwtwtwto",
      "owtwtwtwtwo",
      ".ooooooooo."
    ]);
    stamp(land, basket, kx, ky);
  }
  picnicAt() {
    const [fx, fy] = this.L.picnic ?? [-1, -1];
    return [Math.round(fx * this.W) - (this.tall ? 20 : 22), Math.round(fy * this.H) - 14];
  }
  outlineWhere(p, x0, y0, x1, y1, inside) {
    const marks = [];
    for (let y = y0; y <= y1; y++)
      for (let x = x0; x <= x1; x++) {
        if (inside(p.get(x, y))) continue;
        if (inside(p.get(x - 1, y)) || inside(p.get(x + 1, y)) || inside(p.get(x, y - 1)) || inside(p.get(x, y + 1)))
          marks.push(x, y);
      }
    for (let i = 0; i < marks.length; i += 2) p.p(marks[i], marks[i + 1], K.o);
  }
  /** A soft shadow on the ground, to the left (the sun is on the right). */
  shadow(p, x, y, w) {
    for (let j = 0; j < 3; j++)
      for (let i = -3 - j; i < w - 4; i++) {
        const c = p.get(x + i, y + j);
        if (j === 2 && bayer(x + i, y + j) > 7) continue;
        const d = this.darkOf(c);
        if (d) p.p(x + i, y + j, d);
      }
  }
  darkOf(c) {
    for (const [a, b] of Object.entries(DARKER)) if (K[a] === c) return K[b];
    return 0;
  }
  tree(p, x, y, r) {
    const t = new Pix(r * 2 + 5, r * 2 + 7);
    const cx = r + 2;
    const cy = r + 1;
    t.rect(cx - 1, cy + r - 2, cx, cy + r + 3, K.B);
    t.p(cx, cy + r, K.w);
    for (let j = -r; j <= r; j++)
      for (let i = -r; i <= r; i++) {
        const d = Math.hypot(i, j * 1.1);
        if (d > r) continue;
        const l = (i - j) / r - d / r / 2;
        const b = bayer(cx + i, cy + j) / 16 - 0.5;
        t.p(cx + i, cy + j, l + b * 0.3 > 0.55 ? K.h : l + b * 0.3 > -0.1 ? K.g : l + b * 0.3 > -0.8 ? K.G : K.v);
      }
    outline(t);
    this.shadow(p, x - cx + 1, y + r + 4, r * 2);
    stamp(p, t, x - cx, y - cy);
  }
  // ---------- the page talks to the valley ----------
  /** The pointer, in art pixels, or null when it leaves. Returns whether it is over something to click. */
  point(xy) {
    this.pointer = xy;
    if (!xy) {
      this.parGoal = [0, 0];
      this.hot = -1;
      this.waving = false;
      return false;
    }
    this.parGoal = [xy[0] / this.W * 2 - 1, xy[1] / this.H * 2 - 1];
    this.hot = this.beeAt(xy);
    this.waving = this.onVarun(xy);
    return this.hot >= 0 || this.waving || this.flowerAt(xy) >= 0;
  }
  click(xy) {
    const b = this.beeAt(xy);
    if (b >= 0) {
      this.card = { bee: b, until: this.time + 3, seq: this.card.seq + 1 };
      return true;
    }
    const f = this.flowerAt(xy);
    if (f >= 0) {
      const [hx, hy] = this.flowerHead(f, this.time);
      for (let i = 0; i < 14; i++) {
        const a = -Math.PI / 2 + (i / 13 - 0.5) * 2.6;
        const v = 30 + i % 4 * 9;
        this.bits.push({
          x: hx,
          y: hy,
          vx: Math.cos(a) * v,
          vy: Math.sin(a) * v,
          age: 0,
          life: 1.4,
          c: i % 3 === 0 ? K.S : i % 3 === 1 ? K.k : K.A
        });
      }
      return true;
    }
    if (this.onVarun(xy)) {
      this.waving = true;
      return true;
    }
    return false;
  }
  /** A signpost is pointed at or focused: the knight hops there and its routes light. */
  focusOn(id) {
    this.focus = id;
    if (id) this.go(id, 0.2);
  }
  /** The petal shower (the Konami code). */
  shower() {
    this.rain = this.time + 7;
  }
  // ---------- moving on ----------
  go(id, dur) {
    const [tx, ty0] = this.at(id).door;
    const ty = ty0 + 3;
    const pos = this.hop ? [...this.hop.to] : [...this.knight];
    const hops = [];
    const moves = [[8, 4], [4, 8], [-4, 8], [-8, 4], [-8, -4], [-4, -8], [4, -8], [8, -4]];
    for (let n = 0; n < 40; n++) {
      const d0 = Math.hypot(tx - pos[0], ty - pos[1]);
      let best = null;
      let bd = d0;
      for (const [mx, my] of moves) {
        const d = Math.hypot(tx - pos[0] - mx, ty - pos[1] - my);
        if (d < bd - 0.5) {
          bd = d;
          best = [mx, my];
        }
      }
      if (!best) break;
      const to = [pos[0] + best[0], pos[1] + best[1]];
      hops.push({ from: [...pos], to, t: 0, dur });
      pos[0] = to[0];
      pos[1] = to[1];
    }
    this.hops = hops;
    this.rest = 0;
  }
  step(dt) {
    this.time += dt;
    const k = Math.min(1, dt * 3);
    this.par = [this.par[0] + (this.parGoal[0] - this.par[0]) * k, this.par[1] + (this.parGoal[1] - this.par[1]) * k];
    if (this.hop) {
      this.hop.t += dt;
      if (this.hop.t >= this.hop.dur) {
        this.knight = [...this.hop.to];
        this.hop = null;
        this.rest = this.focus ? 0.06 : 0.3;
      }
    } else if (this.rest > 0) this.rest -= dt;
    else if (this.hops.length) this.hop = this.hops.shift();
    else if (!this.focus && !this.L.band) {
      this.rest = 2.6;
      const order = ["cv", "teaching", "research", "writing", "tools"];
      this.tour = (this.tour + 1) % order.length;
      this.go(order[this.tour], 0.32);
    }
    for (const f of this.flowers) {
      const goal = this.pointer ? Math.max(-1, Math.min(1, (this.pointer[0] - f.x) / 90)) : 0.45;
      f.face += (goal - f.face) * Math.min(1, dt * 2.5);
    }
    for (const b of this.bits) {
      b.age += dt;
      b.vy += 90 * dt;
      b.x += b.vx * dt;
      b.y += b.vy * dt;
    }
    this.bits = this.bits.filter((b) => b.age < b.life && b.y < this.H + 4);
    const want = this.time < this.rain ? 140 : this.tall ? 4 : 7;
    const R = Math.random;
    while (this.petals.length < want) {
      const col = this.c(["r", "S", "W", "R", "Y"][Math.floor(R() * 5)]);
      this.petals.push({
        x: R() * (this.W + 40) - 20,
        y: this.time < this.rain ? -R() * 60 : R() * -this.H * 0.3,
        vx: -6 - R() * 8,
        vy: 7 + R() * 9,
        age: R() * 6,
        life: 0,
        c: col
      });
    }
    for (const p of this.petals) {
      p.age += dt;
      p.x += (p.vx + Math.sin(p.age * 2.2) * 10) * dt;
      p.y += p.vy * dt;
    }
    this.petals = this.petals.filter((p) => p.y < this.H + 3 && p.x > -6);
    if (this.petals.length > want) this.petals.length = Math.max(want, this.petals.length - 2);
  }
  // ---------- drawing ----------
  frame(t, still) {
    const { out, W } = this;
    out.copyFrom(this.sky);
    if (!still) t = this.time;
    if (this.phase === "night")
      this.stars.forEach(([x, y], i) => {
        const tw = Math.sin(t * (0.7 + i % 5 * 0.3) + i * 2.1);
        if (tw > -0.3) out.p(x, y, tw > 0.75 ? K.Y : K.C);
        if (tw > 0.93 && i % 3 === 0) {
          out.p(x - 1, y, K.u);
          out.p(x + 1, y, K.u);
          out.p(x, y - 1, K.u);
          out.p(x, y + 1, K.u);
        }
      });
    for (const c of this.clouds) {
      const span = W + c.pix.w + 20;
      const x = ((c.x - t * c.v) % span + span) % span - c.pix.w - 10;
      stamp(out, c.pix, x - this.par[0] * 1.5, c.y);
    }
    this.layer(this.far, Math.round(this.par[0] * -3), Math.round(this.par[1] * -1));
    this.layer(this.back, Math.round(this.par[0] * -6), Math.round(this.par[1] * -1.5));
    this.over(this.land);
    if (this.pond) {
      const [cx, cy, rx] = this.pond;
      for (let k = 0; k < 3; k++) {
        const x = cx - rx + 9 + k * 9 + Math.round(Math.sin((still ? 0 : t) * 1.3 + k * 2) * 2);
        if (still || Math.sin(t * 2 + k) > -0.2) this.out.hline(x, x + 1 + k % 2, cy + 1 + k % 2, this.c("W"));
      }
    }
    this.routesDraw(t);
    this.smallFlowers(t, still);
    this.placeLife(t, still);
    if (!this.L.band) for (const p of this.places) this.signDraw(p, t);
    if (this.L.picnic) this.varun(t, still);
    this.knightDraw();
    this.bees(t, still);
    this.butterflies(t, still);
    if (this.phase === "night") this.fireflies(t);
    for (const b of this.bits) {
      out.p(b.x, b.y, b.c);
      out.p(b.x + 1, b.y, b.c);
    }
    const fo = Math.round(this.par[0] * 9);
    this.flowers.forEach((_, i) => this.tallFlower(i, t, fo));
    if (!still)
      for (const p of this.petals) {
        out.p(p.x, p.y, p.c);
        out.p(p.x + (Math.sin(p.age * 3) > 0 ? 1 : -1), p.y, p.c);
      }
    this.cardDraw();
    return out;
  }
  layer(src, dx, dy) {
    const { out, W, H, M } = this;
    for (let y = 0; y < H; y++) {
      const sy = y - dy;
      if (sy < 0 || sy >= H) continue;
      const row = sy * src.w + M - dx;
      const o = y * W;
      for (let x = 0; x < W; x++) {
        const c = src.data[row + x];
        if (c) out.data[o + x] = c;
      }
    }
  }
  over(src) {
    const d = this.out.data;
    const s = src.data;
    for (let i = 0; i < s.length; i++) if (s[i]) d[i] = s[i];
  }
  routesDraw(t) {
    this.routes.forEach((r, i) => {
      const lit = this.hot === i || this.card.bee === i || this.focus === r.a || this.focus === r.b;
      const len = Math.hypot(r.p2[0] - r.p0[0], r.p2[1] - r.p0[1]) * 1.3;
      const n = Math.floor(len / 4);
      const shift = lit ? t * 6 % 1 : 0;
      for (let k = 1; k < n; k++) {
        const [x, y] = quad(r.p0, r.p1, r.p2, (k + shift) / n);
        const under = this.out.get(x, y);
        if (lit) {
          this.out.p(x, y, K.S);
          this.out.p(x + 1, y, K.D);
        } else if (k % 2 === 0) {
          const lighter = under === K.b || under === K.u || under === K.e ? K.W : this.dark.get(under);
          if (lighter) this.out.p(x, y, lighter);
        }
      }
    });
  }
  smallFlowers(t, still) {
    const { out } = this;
    this.L.small.forEach(([fx, fy], i) => {
      const x = Math.round(fx * this.W);
      const y = Math.round(fy * this.H);
      const s = still ? 0 : Math.round(Math.sin(t * 1.3 + i * 0.9) * 0.8);
      const h = 6 + i % 3 * 2;
      out.vline(x, y - h + 2, y, this.c("G"));
      out.p(x + 1, y - 2, this.c("g"));
      const hx = x + s;
      const hy = y - h;
      for (const [dx, dy, c] of [
        [0, -2, "S"],
        [-1, -1, "S"],
        [1, -1, "Y"],
        [-2, 0, "D"],
        [2, 0, "S"],
        [-1, 1, "D"],
        [1, 1, "S"],
        [0, 2, "D"],
        [-1, 0, "B"],
        [0, 0, "A"],
        [1, 0, "B"],
        [0, -1, "B"],
        [0, 1, "B"]
      ])
        out.p(hx + dx, hy + dy, this.c(c));
      for (const [dx, dy] of [[0, -3], [-2, -2], [2, -2], [-3, 0], [3, 0], [-2, 2], [2, 2], [0, 3], [-1, -2], [1, -2], [-2, -1], [2, -1], [-2, 1], [2, 1], [-1, 2], [1, 2]])
        if (!out.get(hx + dx, hy + dy) || ![K.S, K.Y, K.D, K.B, K.A].includes(out.get(hx + dx, hy + dy))) {
          if (Math.abs(dx) + Math.abs(dy) >= 3) out.p(hx + dx, hy + dy, K.o);
        }
    });
  }
  /** Smoke, blinking routers, the gear and the conveyor, the lantern. */
  placeLife(t, still) {
    const { out } = this;
    const smokeC = this.phase === "night" ? K.u : this.phase === "sunset" ? K.p : K.W;
    const smokeD = this.phase === "night" ? K.U : this.phase === "sunset" ? K.r : K.C;
    for (const p of this.places) {
      const m = p.built.marks;
      const g = (k) => m[k] ? [p.x + m[k][0], p.y + m[k][1]] : null;
      const smoke = g("smoke");
      if (smoke)
        for (let k = 0; k < 4; k++) {
          const age = ((still ? 0.2 : t * 0.28) + k / 4 + p.x * 0.01) % 1;
          const r = 1 + age * 2.6;
          const cx = smoke[0] + age * 9 + Math.sin(age * 6 + k) * 1.2;
          const cy = smoke[1] - age * 22;
          for (let y = Math.floor(cy - r); y <= cy + r; y++)
            for (let x = Math.floor(cx - r); x <= cx + r; x++) {
              const d = Math.hypot(x - cx, y - cy);
              if (d > r) continue;
              if (age > 0.55 && bayer(x, y) < (age - 0.55) * 34) continue;
              out.p(x, y, d < r - 1 && x > cx - 0.5 ? smokeC : smokeD);
            }
        }
      if (p.id === "research") {
        const leds = ["led1", "led2", "led3", "led4"];
        leds.forEach((k, i) => {
          const at = g(k);
          if (!at) return;
          const on = still ? i % 2 === 0 : Math.sin(t * (5 + i * 1.7) + i * 2) > 0;
          out.p(at[0], at[1], on ? [K.M, K.S, K.M, K.P][i] : K.N);
        });
        const mast = g("mast");
        if (mast && (still || Math.sin(t * 2.4) > 0)) {
          out.p(mast[0], mast[1], this.c("Q"));
          out.p(mast[0], mast[1] - 1, this.c("R"));
        }
      }
      if (p.id === "tools") {
        const gear = g("gear");
        if (gear) {
          this.gear(gear[0], gear[1], 3, still ? 0 : t * 1.6, K.D, K.A);
          this.gear(gear[0] + 5, gear[1] + 3, 2, still ? 0.3 : -t * 2.1 + 0.3, K.S, K.D);
        }
        const b0 = g("belt0");
        const b1 = g("belt1");
        if (b0 && b1) {
          const len = b1[0] - b0[0];
          for (let x = 0; x <= len; x++) if ((x + Math.floor(still ? 0 : t * 8)) % 3 === 0) out.p(b0[0] + x, b0[1] + 1, this.c("B"));
          for (let k = 0; k < 3; k++) {
            const s = ((still ? 0.15 : t * 0.22) + k / 3) % 1;
            let x = b0[0] + Math.round(s * (len + 5));
            let y = b0[1] - 2;
            if (x > b1[0] - 1) {
              y += Math.round((x - b1[0] + 1) * 1.5);
              x = b1[0] - 1 + Math.round((x - b1[0] + 1) * 0.6);
            }
            const body = this.c(["r", "b", "Y"][k]);
            out.rect(x, y, x + 3, y + 1, body);
            out.hline(x, x + 3, y - 1, K.o);
            out.hline(x, x + 3, y + 2, K.o);
            out.p(x - 1, y, K.o);
            out.p(x - 1, y + 1, K.o);
            out.p(x + 4, y, K.o);
            out.p(x + 4, y + 1, K.o);
            out.p(x + 1, y, K.W);
          }
        }
      }
      if (p.id === "writing" && this.phase !== "day") {
        const l = g("lantern");
        if (l) out.p(l[0], l[1], still || Math.sin(t * 9) > -0.4 ? K.W : K.Y);
      }
    }
  }
  gear(cx, cy, r, a, lit, dim) {
    const { out } = this;
    for (let y = cy - r - 2; y <= cy + r + 2; y++)
      for (let x = cx - r - 2; x <= cx + r + 2; x++) {
        const dx = x - cx;
        const dy = y - cy;
        const d = Math.hypot(dx, dy);
        const ang = Math.atan2(dy, dx) - a;
        const tooth = (ang / (Math.PI / 4) % 1 + 1) % 1 < 0.5;
        if (d <= 1) out.p(x, y, K.o);
        else if (d <= r - 0.6) out.p(x, y, dx - dy > 0 ? lit : dim);
        else if (d <= r + 0.7 && tooth) out.p(x, y, dim);
        else if (d <= r + 1.5 && (d <= r - 0.6 + 1.2 || tooth)) {
          if (d <= r + 1.5) out.p(x, y, K.o);
        }
      }
  }
  signDraw(p, t) {
    const pix = this.signPix.get(p.id);
    const on = this.focus === p.id;
    const lift = on ? 1 + (Math.sin(t * 10) > 0 ? 1 : 0) : 0;
    stamp(this.out, pix, p.sign[0] - 6, p.sign[1] - 15 - lift, false, this.map);
    if (on) {
      this.out.p(p.sign[0] + 4, p.sign[1] - 13 - lift, K.W);
    }
  }
  knightDraw() {
    const { out } = this;
    let [x, y] = this.knight;
    let z = 0;
    if (this.hop) {
      const s = ease(Math.min(1, this.hop.t / this.hop.dur));
      x = this.hop.from[0] + (this.hop.to[0] - this.hop.from[0]) * s;
      y = this.hop.from[1] + (this.hop.to[1] - this.hop.from[1]) * s;
      z = Math.sin(s * Math.PI) * 9;
    }
    x = Math.round(x);
    y = Math.round(y);
    for (let i = -3; i <= 4; i++) {
      const sh = this.dark.get(out.get(x + i, y)) ?? 0;
      if (sh && (Math.abs(i) < 3 || z < 3)) out.p(x + i, y, sh);
    }
    const left = this.hops.length ? this.hops[0].to[0] < x : this.hop ? this.hop.to[0] < this.hop.from[0] : false;
    stamp(out, KNIGHT, x - 5, y - 11 - Math.round(z), left, this.map);
  }
  beeAtT(i, t) {
    const r = this.routes[i];
    const trip = 4.6 + i * 0.7;
    const total = trip * 2 + 1.6;
    const u = (t + i * 2.3) % total;
    let s;
    let back = false;
    if (u < trip) s = u / trip;
    else if (u < trip + 0.8) s = 1;
    else if (u < trip * 2 + 0.8) {
      s = 1 - (u - trip - 0.8) / trip;
      back = true;
    } else s = 0;
    const [x, y] = quad(r.p0, r.p1, r.p2, ease(s));
    const bob = Math.round(Math.sin(t * 7 + i) * 1.2);
    const trips = Math.floor((t + i * 2.3) / total);
    return { x: Math.round(x), y: Math.round(y) + bob, back, bit: (trips + (back ? 1 : 0) + i) % 2 };
  }
  beeAt(xy) {
    for (let i = 0; i < this.routes.length; i++) {
      const b = this.beeAtT(i, this.time);
      if (Math.abs(xy[0] - b.x) <= 6 && Math.abs(xy[1] - b.y) <= 6) return i;
    }
    return -1;
  }
  bees(t, still) {
    for (let i = 0; i < this.routes.length; i++) {
      const b = this.beeAtT(i, still ? 1.3 + i * 1.1 : t);
      const frame = still ? 0 : Math.floor(t * 14 + i) % 2;
      stamp(this.out, BEE[frame], b.x - 4, b.y - 3, b.back);
      stamp(this.out, PACKET, b.x - 2, b.y + 3);
      this.out.hline(b.x - 1, b.x + 1, b.y + 4, b.bit ? K.S : K.W);
      this.out.p(b.x, b.y + 2, K.k);
    }
  }
  /** The tiny packet header on a clicked bee: source, destination, sequence, bit. */
  cardDraw() {
    const c = this.card;
    if (c.bee < 0 || this.time > c.until) return;
    const { out } = this;
    const b = this.beeAtT(c.bee, this.time);
    const r = this.routes[c.bee];
    const w = 25;
    const h = 12;
    const x = Math.max(1, Math.min(this.W - w - 1, b.x - (w >> 1)));
    const y = Math.max(1, b.y - h - 6);
    out.rect(x, y, x + w - 1, y + h - 1, K.o);
    out.rect(x + 1, y + 1, x + w - 2, y + h - 2, K.W);
    out.hline(x + 1, x + w - 2, y + h - 2, K.C);
    const [from, to] = b.back ? [r.b, r.a] : [r.a, r.b];
    out.rect(x + 2, y + 2, x + 7, y + 4, K[TINT[from]]);
    out.hline(x + 9, x + 14, y + 3, K.k);
    out.p(x + 13, y + 2, K.k);
    out.p(x + 13, y + 4, K.k);
    out.rect(x + 16, y + 2, x + 21, y + 4, K[TINT[to]]);
    const seq = c.seq % 6 + 1;
    for (let i = 0; i < seq; i++) out.vline(x + 2 + i * 2, y + 6, y + 8, K.B);
    out.rect(x + 18, y + 6, x + 21, y + 8, b.bit ? K.S : K.C);
    out.p(x + 19, y + 7, b.bit ? K.D : K.t);
    out.p(x + (w >> 1), y + h, K.o);
    out.p(x + (w >> 1), y + h + 1, K.o);
  }
  butterflies(t, still) {
    const spots = this.tall ? [[0.5, 0.68], [0.15, 0.85]] : [[0.31, 0.74], [0.6, 0.66], [0.12, 0.8]];
    spots.forEach(([fx, fy], i) => {
      const tt = still ? i * 2 : t;
      const x = fx * this.W + Math.sin(tt * 0.7 + i * 2) * 18 + Math.sin(tt * 1.9 + i) * 5;
      const y = fy * this.H + Math.sin(tt * 1.1 + i * 3) * 8 + Math.abs(Math.sin(tt * 4 + i)) * -3;
      const f = still ? 0 : Math.floor(tt * 7 + i) % 2;
      stamp(this.out, BUTTERFLY[i % 2][f], x - 2, y - 2, Math.cos(tt * 0.7 + i * 2) < 0, this.map);
    });
  }
  fireflies(t) {
    const { out } = this;
    for (let i = 0; i < (this.tall ? 10 : 18); i++) {
      const bx = (i * 0.618 + 0.05) % 1 * this.W;
      const by = this.L.hz * this.H + (i * 0.37 + 0.2) % 1 * (this.H * (1 - this.L.hz) * 0.8);
      const x = Math.round(bx + Math.sin(t * 0.5 + i) * 10);
      const y = Math.round(by + Math.sin(t * 0.8 + i * 2) * 5);
      const b = Math.sin(t * 1.7 + i * 1.3);
      if (b < 0) continue;
      out.p(x, y, K.Y);
      if (b > 0.6) {
        out.p(x - 1, y, K.D);
        out.p(x + 1, y, K.D);
        out.p(x, y - 1, K.D);
        out.p(x, y + 1, K.D);
      }
    }
  }
  // ---------- Varun ----------
  varunAt() {
    const [bx, by] = this.picnicAt();
    return [bx + 5, by - 14];
  }
  onVarun([x, y]) {
    const [vx, vy] = this.varunAt();
    return x >= vx - 2 && x <= vx + 26 && y >= vy - 2 && y <= vy + 30;
  }
  varun(t, still) {
    const { out } = this;
    const [vx, vy] = this.varunAt();
    stamp(out, VARUN, vx, vy);
    const tick = still ? 0 : Math.floor(t * 6) % 2;
    if (!this.waving) {
      out.p(vx + 4, vy + 24 - tick, this.c("w"));
      out.p(vx + 19, vy + 23 + tick, this.c("w"));
    }
    const glow = this.phase === "night" ? K.Y : K.W;
    const flick = still ? 0 : Math.floor(t * 3) % 3;
    for (let x = vx + 7; x <= vx + 16; x++) {
      if ((x + flick) % 2 === 0) out.p(x, vy + 19, glow);
    }
    if (this.phase === "night") {
      for (let x = vx + 8; x <= vx + 15; x++) if (out.get(x, vy + 14) === this.c("w")) out.p(x, vy + 14, K.w);
    }
    const cycle = still ? 0 : (t + 3) % 11;
    const sipping = !this.waving && cycle > 8.4 && cycle < 10.2;
    const mx = sipping ? vx + 15 : vx + 23;
    const my = sipping ? vy + 13 : vy + 24;
    stamp(out, MUG, mx - 1, my - 1, false, this.map);
    if (sipping) out.rect(mx + 3, my + 1, mx + 3, my + 2, this.c("w"));
    if (!still && !sipping)
      for (let k = 0; k < 2; k++) {
        const a = (t * 0.8 + k / 2) % 1;
        if (a < 0.8) out.p(mx + 1 + k + Math.round(Math.sin(a * 6 + k) * 0.6), my - 2 - Math.round(a * 4), K.W);
      }
    if (this.waving) {
      const side = still ? 0 : Math.floor(t * 5) % 2;
      const sx = vx + 21;
      const sy = vy + 19;
      out.line(sx, sy, sx + 3, sy - 6, this.c("F"));
      out.line(sx + 1, sy, sx + 4, sy - 6, this.c("F"));
      const hx = sx + 3 + side;
      const hy = sy - 9;
      stamp(out, HAND[side], hx - 1, hy - 1, false, this.map);
    }
  }
  // ---------- tall sunflowers in front ----------
  flowerHead(i, t) {
    const f = this.flowers[i];
    const sway = Math.sin(t * 0.9 + f.seed) * 1.6 + Math.sin(t * 2.3 + f.seed) * 0.5;
    return [f.x + Math.round(this.par[0] * 9) + Math.round(sway), this.H - f.h];
  }
  flowerAt([x, y]) {
    for (let i = 0; i < this.flowers.length; i++) {
      const [hx, hy] = this.flowerHead(i, this.time);
      if (Math.hypot(x - hx, y - hy) <= 11) return i;
    }
    return -1;
  }
  tallFlower(i, t, fo) {
    const f = this.flowers[i];
    const R = this.tall ? 9 : 10;
    const [hx, hy] = this.flowerHead(i, t);
    const box = new Pix(R * 2 + 20, f.h + R + 8);
    const ox = hx - (box.w >> 1);
    const oy = hy - R - 3;
    const lx = (x) => x - ox;
    const ly = (y) => y - oy;
    const base = f.x + fo;
    const stem = [];
    for (let y = this.H + 2; y > hy; y--) {
      const k = (this.H + 2 - y) / (this.H + 2 - hy);
      stem.push([Math.round(base + (hx - base) * k * k), y]);
    }
    for (const [x, y] of stem) {
      box.p(lx(x) - 1, ly(y), this.c("v"));
      box.p(lx(x), ly(y), this.c("G"));
      box.p(lx(x) + 1, ly(y), this.c("g"));
    }
    for (const [frac, side] of [[0.3, -1], [0.55, 1]]) {
      const [sx, sy] = stem[Math.floor(stem.length * frac)] ?? stem[0];
      const len = 9 + i % 2 * 2;
      for (let k = 0; k <= len; k++) {
        const x = sx + side * (k + 1);
        const y = sy - Math.round(Math.sin(k / len * Math.PI) * 2) - Math.round(k * 0.35);
        const thick = Math.round(Math.sin(k / len * Math.PI) * 2.2);
        for (let j = -thick; j <= thick; j++) box.p(lx(x), ly(y + j), this.c(j < 0 ? "g" : j === 0 ? "G" : "v"));
      }
    }
    const face = f.face;
    const sxs = 1 - Math.abs(face) * 0.22;
    const dox = face * R * 0.32;
    for (let y = -R - 1; y <= R + 1; y++)
      for (let x = -R - 1; x <= R + 1; x++) {
        const px = x / sxs;
        const d = Math.hypot(px, y);
        const a = Math.atan2(y, px);
        const edge = R * (0.82 + 0.18 * Math.cos(a * 12 + i));
        if (d > edge) continue;
        const dd = Math.hypot(x - dox, y);
        const disc = R * 0.48;
        let c;
        if (dd <= disc) {
          const l = (x - dox - y) / disc;
          c = dd > disc - 1 ? "B" : bayer(hx + x, hy + y) < 6 ? l > 0.2 ? "A" : "k" : "B";
        } else {
          const l = (x - y) / R;
          c = Math.cos(a * 12 + i) < -0.6 && d > R * 0.62 ? "D" : l > 0.55 ? "Y" : l < -0.55 ? "D" : "S";
        }
        box.p(lx(hx + x), ly(hy + y), this.c(c));
      }
    if (f.glasses) {
      const cx = lx(hx + Math.round(dox));
      const cy = ly(hy) - 1;
      const lens = (x0) => {
        for (const [dx, dy] of [[1, 0], [2, 0], [0, 1], [3, 1], [0, 2], [3, 2], [1, 3], [2, 3]]) box.p(x0 + dx, cy - 1 + dy, K.k);
        box.p(x0 + 1, cy, K.W);
        box.p(x0 + 2, cy, K.e);
        box.p(x0 + 1, cy + 1, K.e);
        box.p(x0 + 2, cy + 1, K.b);
      };
      lens(cx - 4);
      lens(cx + 1);
      box.p(cx, cy, K.k);
      box.p(cx - 1, cy + 4, K.k);
      box.p(cx, cy + 5, K.k);
      box.p(cx + 1, cy + 4, K.k);
    }
    outline(box, this.c("o"));
    stamp(this.out, box, ox, oy);
  }
};

// ../../../../../../home/varun/Personal/projects/website/src/directions/pixel/art/loop.ts
function paint(ctx, pix, img) {
  const im = img && img.width === pix.w && img.height === pix.h ? img : ctx.createImageData(pix.w, pix.h);
  pix.blit(im);
  ctx.putImageData(im, 0, 0);
  return im;
}
export {
  BEE,
  BUTTERFLY,
  HEX,
  K,
  KNIGHT,
  PACKET,
  Pix,
  VARUN,
  Valley,
  ascii,
  bayer,
  outline,
  paint,
  stamp
};
