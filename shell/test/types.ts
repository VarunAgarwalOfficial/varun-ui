// Checks pixel.d.ts against how demos call pixel.js. Run: tsc -p shell
import {
  PALETTE,
  dither,
  fitScale,
  setupCanvas,
  sprite,
  steps,
  ticker,
} from "../pixel.js";

const canvas: HTMLCanvasElement = sprite(["ab", ".a"], {
  a: PALETTE.ink,
  b: PALETTE.sunflower,
});
const g: CanvasRenderingContext2D = setupCanvas(canvas, 2, 2, fitScale(64, 2));
dither(g, 0, 0, 2, 2, PALETTE.blue, (x, y) => (x + y) / 4);
const stop: () => void = ticker(10, (frame: number) => void frame);
stop();
const path: number[][] = steps([0, 0], [4, 4], 3);
void path;
