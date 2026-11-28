// Unit tests for the pure helpers in pixel.js. Run: node --test shell/test
import assert from "node:assert/strict";
import { test } from "node:test";

// pixel.js reads the reduced-motion setting when it loads.
globalThis.matchMedia = () => ({
  matches: false,
  addEventListener() {},
  removeEventListener() {},
});
const { PALETTE, dithered, fitScale, steps } = await import("../pixel.js");

test("fitScale is the largest whole scale, never below min", () => {
  assert.equal(fitScale(100, 30), 3);
  assert.equal(fitScale(10, 30), 1);
  assert.equal(fitScale(10, 30, 2), 2);
});

test("dithered fills nothing at 0 and everything at 1", () => {
  for (let y = 0; y < 4; y++)
    for (let x = 0; x < 4; x++) {
      assert.equal(dithered(x, y, 0), false);
      assert.equal(dithered(x, y, 1), true);
    }
});

test("dithered at one half fills half of each 4 by 4 tile", () => {
  let n = 0;
  for (let y = 0; y < 4; y++)
    for (let x = 0; x < 4; x++) n += dithered(x, y, 0.5);
  assert.equal(n, 8);
});

test("steps ends on the target, in whole pixels", () => {
  const s = steps([0, 0], [10, -5], 4);
  assert.equal(s.length, 4);
  assert.deepEqual(s.at(-1), [10, -5]);
  for (const p of s) for (const v of p) assert.ok(Number.isInteger(v));
});

test("every palette colour is a six-digit hex", () => {
  for (const [name, hex] of Object.entries(PALETTE))
    assert.match(hex, /^#[0-9a-f]{6}$/, name);
});
