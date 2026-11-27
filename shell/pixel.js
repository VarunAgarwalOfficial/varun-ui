// Pixel scene helpers shared by every demo: the scene palette, sprites from
// text grids, ordered dither, whole-number scales and a frame clock.
//
// Plain demos import it from the published shell:
//   import { sprite, ticker } from "https://varunswaika.github.io/varun-ui/shell/pixel.js";
// Bundled apps keep a copy and say so at the top; change both together.
//
// Rules for every scene: one art pixel size, whole-number scales, moves locked
// to the art grid, drawn frames at 8 to 12 per second, dither in place of
// fades, the palette below, and nothing moves under reduced motion.

// The site's pastels, with the woods, stones and skies the scenes need.
// No purple and no lavender.
export const PALETTE = {
  ink: "#3b2a1a",
  inkDeep: "#24180c",
  muted: "#6b4a2c",
  cream: "#fffbf0",
  plate: "#fffdf2",
  paper: "#fff6df",
  sunflower: "#ffd23f",
  sunflowerMid: "#f7c234",
  frameLine: "#f2a922",
  frameDrop: "#c46f1c",
  sunflowerDeep: "#875306",
  butter: "#fff0b0",
  blue: "#a9d8ef",
  blueSoft: "#e3f3fb",
  blueMid: "#7fb6e0",
  blueDeep: "#2f6297",
  mint: "#b6f2df",
  mintSoft: "#e4f9f1",
  mintMid: "#6fcfb5",
  mintDeep: "#2c7064",
  blush: "#ffb8cb",
  blushSoft: "#ffe8ee",
  blushMid: "#f49ab4",
  blushDeep: "#a8355f",
  peach: "#ffd2b8",
  peachSoft: "#ffeee3",
  peachMid: "#f7a985",
  peachDeep: "#9c4a2f",
  meadow: "#cfeaa0",
  meadowSoft: "#eef8dc",
  meadowMid: "#8fc25a",
  meadowDeep: "#3f6b22",
  leaf: "#6f9e3a",
  // Woods, light to dark.
  wood1: "#f0cf9c",
  wood2: "#e0b07a",
  wood3: "#c98f55",
  wood4: "#a8703f",
  wood5: "#7a5232",
  wood6: "#5e3e24",
  // Stone and road, warm greys.
  stone1: "#ece4d6",
  stone2: "#d4c8b4",
  stone3: "#b3a58e",
  stone4: "#8a7d68",
  road: "#9a8f80",
  roadDark: "#7d7366",
  // Meaning colours from the site.
  proved: "#3d6f48",
  measured: "#8a6417",
  open: "#2f6297",
  against: "#9b3f36",
};

// A sprite from rows of characters. Each character names a colour in `key`;
// "." and " " are empty. Returns a canvas one art pixel per cell.
export function sprite(rows, key) {
  const h = rows.length;
  const w = Math.max(...rows.map((r) => r.length));
  const c = makeCanvas(w, h);
  const g = c.getContext("2d");
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const colour = key[row[x]];
      if (!colour) continue;
      g.fillStyle = colour;
      g.fillRect(x, y, 1, 1);
    }
  });
  return c;
}

// The 4 by 4 Bayer matrix, as thresholds from 0 to 1.
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(
  (v) => (v + 0.5) / 16,
);

// True where an ordered dither of `level` (0 none, 1 all) puts a pixel.
export const dithered = (x, y, level) => level > BAYER[(y & 3) * 4 + (x & 3)];

// Fills a rectangle with `colour` at an ordered-dither level from 0 to 1.
// `level` may be a function of (x, y) for gradients and pools of light.
export function dither(g, x0, y0, w, h, colour, level) {
  g.fillStyle = colour;
  const at = typeof level === "function" ? level : () => level;
  for (let y = y0; y < y0 + h; y++) {
    for (let x = x0; x < x0 + w; x++) {
      if (dithered(x, y, at(x, y))) g.fillRect(x, y, 1, 1);
    }
  }
}

// The largest whole-number scale at which `art` art pixels fit in `css` pixels.
export const fitScale = (css, art, min = 1) =>
  Math.max(min, Math.floor(css / art));

// Sizes a canvas to the art and shows it at a whole-number scale.
export function setupCanvas(canvas, artW, artH, scale) {
  canvas.width = artW;
  canvas.height = artH;
  canvas.style.width = `${artW * scale}px`;
  canvas.style.height = `${artH * scale}px`;
  canvas.style.imageRendering = "pixelated";
  const g = canvas.getContext("2d");
  g.imageSmoothingEnabled = false;
  return g;
}

export function makeCanvas(w, h) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
}

const motion = matchMedia("(prefers-reduced-motion: reduce)");
export const reducedMotion = () => motion.matches;

// Calls draw(frame) at `fps` drawn frames a second while the page is shown.
// Under reduced motion it draws frame 0 once and stops. Returns stop().
export function ticker(fps, draw) {
  const step = 1000 / fps;
  let frame = 0;
  let last = 0;
  let id = 0;
  const loop = (now) => {
    id = requestAnimationFrame(loop);
    if (now - last < step) return;
    last = now - ((now - last) % step);
    draw(frame++);
  };
  const start = () => {
    cancelAnimationFrame(id);
    if (reducedMotion() || document.hidden) {
      draw(frame);
      return;
    }
    id = requestAnimationFrame(loop);
  };
  document.addEventListener("visibilitychange", start);
  motion.addEventListener("change", start);
  start();
  return () => {
    cancelAnimationFrame(id);
    document.removeEventListener("visibilitychange", start);
    motion.removeEventListener("change", start);
  };
}

// Positions along a move, in whole art pixels, one per drawn frame, easing
// out. Use it for grid-locked moves: a piece, a car, a traveller.
export function steps(from, to, frames) {
  const out = [];
  for (let k = 1; k <= frames; k++) {
    const t = 1 - (1 - k / frames) ** 2;
    out.push(from.map((v, i) => Math.round(v + (to[i] - v) * t)));
  }
  return out;
}
