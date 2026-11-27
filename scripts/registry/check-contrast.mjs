#!/usr/bin/env node
// Checks that the colour tokens in src/lib/styles.css read on each other.
// Text needs 4.5:1 and borders, dots and other non-text marks need 3:1
// (WCAG 2.2 AA, 1.4.3 and 1.4.11). Checks the light theme, the .dark class
// (which keeps the light values) and the email tokens. Tokens may be hex,
// oklch() or var() pointing at the pixel tokens in src/lib/styles/tokens.css.
// Exits 1 on a fail. Run with --all to see every pair.
//
// Not checked: the named expressive colours (red, pink, yellow, green, blue,
// and the "purple" tone key, which is deep blue) and the data-* chart colours
// when used on their own as icons, stars or chart marks. DESIGN.md says colour
// never carries meaning alone.

import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
const css = read("../../src/lib/styles.css");
const tokensCss = read("../../src/lib/styles/tokens.css");

const TEXT = 4.5;
const MARK = 3;
const STATUS = ["primary", "danger", "success", "warning", "info"];
// Tinted fields used in components: bg-<status>/10, /15 and /20.
const TINTS = [0.1, 0.15, 0.2];
// surface-pastel tones and strengths (content, interactive, art).
const PASTELS = ["red", "pink", "yellow", "green", "blue", "purple"];
const PASTEL_STRENGTHS = [0.15, 0.22, 0.25];

// Every custom property in one CSS block.
function declarations(source, selector) {
  const start = source.indexOf(`${selector} {`);
  if (start < 0) throw new Error(`No ${selector} block found`);
  const body = source.slice(start, source.indexOf("\n}", start));
  return Object.fromEntries(
    [...body.matchAll(/--([\w-]+):\s*([^;]+);/g)].map(([, name, value]) => [
      name,
      value.trim(),
    ]),
  );
}

// Every custom property on :root in tokens.css, the pixel mirror included.
const rootVars = {};
for (const { index } of tokensCss.matchAll(/^:root \{/gm)) {
  Object.assign(rootVars, declarations(tokensCss.slice(index), ":root"));
}

// sRGB hex to oklab [L, a, b].
function hexLab(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const v = parseInt(hex.slice(i, i + 2), 16) / 255;
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}

// One token value as oklab, following var() through the block and :root.
function lab(value, local) {
  for (let depth = 0; depth < 10; depth += 1) {
    const ref = value.match(/^var\(--([\w-]+)\)$/);
    if (!ref) break;
    const [, name] = ref;
    const short = name.startsWith("color-") ? name.slice(6) : null;
    value = local[name] ?? (short && local[short]) ?? rootVars[name];
    if (value === undefined) return null;
  }
  const hex = value.match(/^#[0-9a-f]{6}$/i);
  if (hex) return hexLab(value);
  const oklch = value.match(/^oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)$/);
  if (oklch) {
    const [l, c, h] = oklch.slice(1).map(Number);
    const angle = (h * Math.PI) / 180;
    return [l, c * Math.cos(angle), c * Math.sin(angle)];
  }
  return null;
}

// Reads one set of declarations' colour tokens as oklab [L, a, b].
function colours(all, prefix) {
  const local = {};
  for (const [name, value] of Object.entries(all)) {
    if (name.startsWith(prefix.slice(2))) {
      local[name.slice(prefix.length - 2)] = value;
    }
  }
  const tokens = {};
  for (const [name, value] of Object.entries(local)) {
    const colour = lab(value, local);
    if (colour) tokens[name] = colour;
  }
  return tokens;
}

const block = (source, selector, prefix = "--color-") =>
  colours(declarations(source, selector), prefix);

// Oklab to gamma-encoded sRGB in 0..1, clipped to the sRGB gamut.
function rgb([l, a, b]) {
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const linear = [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ];
  return linear.map((v) => {
    const x = Math.min(1, Math.max(0, v));
    return x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055;
  });
}

function luminance(colour) {
  const [r, g, b] = colour.map((v) =>
    v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(x, y) {
  const [a, b] = [luminance(x), luminance(y)].sort((p, q) => q - p);
  return (a + 0.05) / (b + 0.05);
}

// bg-<colour>/N: the colour at N opacity, painted over the page in sRGB.
function over(top, alpha, bottom) {
  return top.map((v, i) => v * alpha + bottom[i] * (1 - alpha));
}

// surface-pastel: color-mix(in oklab, colour N%, page).
function mixOklab(top, share, bottom) {
  return rgb(top.map((v, i) => v * share + bottom[i] * (1 - share)));
}

function pairs(lab) {
  const t = Object.fromEntries(
    Object.entries(lab).map(([name, value]) => [name, rgb(value)]),
  );
  const muted = t["muted-foreground"];
  const list = [
    ["foreground on background", t.foreground, t.background, TEXT],
    ["muted-foreground on background", muted, t.background, TEXT],
    ["muted-foreground on muted", muted, t.muted, TEXT],
    ["border on background", t.border, t.background, MARK],
    ["background on primary (button text)", t.background, t.primary, TEXT],
    [
      "background on primary/85 (button hover)",
      t.background,
      over(t.primary, 0.85, t.background),
      TEXT,
    ],
    ["background on danger (badge text)", t.background, t.danger, TEXT],
  ];
  for (const name of STATUS) {
    list.push([`${name} text on background`, t[name], t.background, TEXT]);
    list.push([`${name} mark on background`, t[name], t.background, MARK]);
    for (const alpha of TINTS) {
      const tint = over(t[name], alpha, t.background);
      const label = `${name} text on ${name}/${alpha * 100}`;
      list.push([label, t[name], tint, TEXT]);
    }
  }
  for (const name of PASTELS) {
    for (const share of PASTEL_STRENGTHS) {
      const field = mixOklab(lab[name], share, lab.background);
      const where = `${name} pastel ${Math.round(share * 100)}%`;
      list.push([`foreground on ${where}`, t.foreground, field, TEXT]);
      list.push([`muted-foreground on ${where}`, muted, field, TEXT]);
    }
  }
  return list;
}

function emailPairs(lab) {
  const e = Object.fromEntries(
    Object.entries(lab).map(([name, value]) => [name, rgb(value)]),
  );
  return [
    ["email ink on paper", e.ink, e.paper, TEXT],
    ["email muted ink on paper", e["muted-ink"], e.paper, TEXT],
    [
      "email muted ink on muted surface",
      e["muted-ink"],
      e["muted-surface"],
      TEXT,
    ],
    ["email paper on primary (button text)", e.paper, e.primary, TEXT],
    ["email border on paper", e.border, e.paper, MARK],
  ];
}

const light = block(css, "@theme");
const needed = ["background", "foreground", "muted", "muted-foreground"];
for (const name of [...needed, "border", ...STATUS, ...PASTELS]) {
  if (!light[name]) throw new Error(`No colour read for --color-${name}`);
}
const themes = [
  ["light", pairs(light)],
  [".dark", pairs({ ...light, ...block(css, ".dark") })],
  ["email", emailPairs(colours(rootVars, "--email-"))],
];

let failed = 0;
for (const [theme, list] of themes) {
  let lowest = Infinity;
  for (const [label, fg, bg, need] of list) {
    const value = ratio(fg, bg);
    lowest = Math.min(lowest, value);
    if (value < need) {
      failed += 1;
      console.log(
        `FAIL ${theme}: ${label} is ${value.toFixed(2)}:1, needs ${need}:1`,
      );
    } else if (process.argv.includes("--all")) {
      console.log(`ok   ${theme}: ${label} ${value.toFixed(2)}:1`);
    }
  }
  console.log(`${theme}: lowest pair ${lowest.toFixed(2)}:1`);
}

if (failed) {
  console.error(`${failed} colour pair(s) under the WCAG AA minimum.`);
  process.exit(1);
}
