#!/usr/bin/env node
// Checks that the colour tokens in src/lib/styles.css read on each other.
// Text needs 4.5:1 and borders, dots and other non-text marks need 3:1
// (WCAG 2.2 AA, 1.4.3 and 1.4.11). Checks the light and dark themes and the
// email tokens. Exits 1 on a fail.

import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
const css = read("../../src/lib/styles.css");
const tokensCss = read("../../src/lib/styles/tokens.css");

const TEXT = 4.5;
const MARK = 3;
const STATUS = ["primary", "danger", "success", "warning", "info"];
const PASTELS = ["primary", "red", "pink", "yellow", "green", "blue", "purple"];

function block(source, selector, prefix = "--color-") {
  const start = source.indexOf(`${selector} {`);
  if (start < 0) throw new Error(`No ${selector} block found`);
  const body = source.slice(start, source.indexOf("\n}", start));
  const tokens = {};
  const pattern = new RegExp(
    `${prefix}([\\w-]+):\\s*oklch\\(([\\d.]+)\\s+([\\d.]+)\\s+([\\d.]+)\\)`,
    "g",
  );
  for (const [, name, l, c, h] of body.matchAll(pattern)) {
    tokens[name] = oklchToRgb(Number(l), Number(c), Number(h));
  }
  return tokens;
}

// OKLCH to gamma-encoded sRGB in 0..1, clipped to the sRGB gamut.
export function oklchToRgb(l, c, h) {
  const a = c * Math.cos((h * Math.PI) / 180);
  const b = c * Math.sin((h * Math.PI) / 180);
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

function luminance(rgb) {
  const [r, g, b] = rgb.map((v) =>
    v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function ratio(x, y) {
  const [a, b] = [luminance(x), luminance(y)].sort((p, q) => q - p);
  return (a + 0.05) / (b + 0.05);
}

// What the browser shows for a colour at some opacity over the page.
function over(top, alpha, bottom) {
  return top.map((v, i) => v * alpha + bottom[i] * (1 - alpha));
}

function pairs(t) {
  const list = [
    ["foreground on background", t.foreground, t.background, TEXT],
    [
      "muted-foreground on background",
      t["muted-foreground"],
      t.background,
      TEXT,
    ],
    ["muted-foreground on muted", t["muted-foreground"], t.muted, TEXT],
    ["border on background", t.border, t.background, MARK],
    ["background on primary (button text)", t.background, t.primary, TEXT],
    ["background on danger (badge text)", t.background, t.danger, TEXT],
  ];
  for (const name of STATUS) {
    list.push([`${name} text on background`, t[name], t.background, TEXT]);
    const tint = over(t[name], 0.1, t.background);
    list.push([`${name} text on ${name}/10`, t[name], tint, TEXT]);
    list.push([`${name} mark on background`, t[name], t.background, MARK]);
  }
  // surface-pastel-art is the strongest pastel field, at 25%.
  for (const name of PASTELS) {
    const field = over(t[name], 0.25, t.background);
    list.push([`foreground on ${name} pastel`, t.foreground, field, TEXT]);
  }
  return list;
}

function emailPairs(e) {
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
const themes = [
  ["light", pairs(light)],
  [".dark", pairs({ ...light, ...block(css, ".dark") })],
  ["email", emailPairs(block(tokensCss, ":root", "--email-"))],
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
