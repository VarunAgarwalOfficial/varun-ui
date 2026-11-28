// Types for pixel.js. Change both together.

/** The scene palette: hex colours by name. */
export declare const PALETTE: {
  readonly ink: string;
  readonly inkDeep: string;
  readonly muted: string;
  readonly cream: string;
  readonly plate: string;
  readonly paper: string;
  readonly sunflower: string;
  readonly sunflowerMid: string;
  readonly frameLine: string;
  readonly frameDrop: string;
  readonly sunflowerDeep: string;
  readonly butter: string;
  readonly blue: string;
  readonly blueSoft: string;
  readonly blueMid: string;
  readonly blueDeep: string;
  readonly mint: string;
  readonly mintSoft: string;
  readonly mintMid: string;
  readonly mintDeep: string;
  readonly blush: string;
  readonly blushSoft: string;
  readonly blushMid: string;
  readonly blushDeep: string;
  readonly peach: string;
  readonly peachSoft: string;
  readonly peachMid: string;
  readonly peachDeep: string;
  readonly meadow: string;
  readonly meadowSoft: string;
  readonly meadowMid: string;
  readonly meadowDeep: string;
  readonly leaf: string;
  readonly wood1: string;
  readonly wood2: string;
  readonly wood3: string;
  readonly wood4: string;
  readonly wood5: string;
  readonly wood6: string;
  readonly stone1: string;
  readonly stone2: string;
  readonly stone3: string;
  readonly stone4: string;
  readonly road: string;
  readonly roadDark: string;
  readonly proved: string;
  readonly measured: string;
  readonly open: string;
  readonly against: string;
};

/** A canvas from rows of characters, one art pixel per cell. "." and " " are empty. */
export declare function sprite(
  rows: string[],
  key: Record<string, string>,
): HTMLCanvasElement;

/** True where an ordered dither of `level` (0 none, 1 all) puts a pixel. */
export declare const dithered: (x: number, y: number, level: number) => boolean;

/** Fills a rectangle at a dither level from 0 to 1, or a level per pixel. */
export declare function dither(
  g: CanvasRenderingContext2D,
  x0: number,
  y0: number,
  w: number,
  h: number,
  colour: string,
  level: number | ((x: number, y: number) => number),
): void;

/** The largest whole-number scale at which `art` art pixels fit in `css` pixels. */
export declare const fitScale: (
  css: number,
  art: number,
  min?: number,
) => number;

/** Sizes a canvas to the art, shows it at a whole-number scale and returns its context. */
export declare function setupCanvas(
  canvas: HTMLCanvasElement,
  artW: number,
  artH: number,
  scale: number,
): CanvasRenderingContext2D;

export declare function makeCanvas(w: number, h: number): HTMLCanvasElement;

export declare const reducedMotion: () => boolean;

/** Calls draw(frame) at `fps` frames a second while the page is shown. Returns stop(). */
export declare function ticker(
  fps: number,
  draw: (frame: number) => void,
): () => void;

/** Whole-pixel positions along a move, one per drawn frame, easing out. */
export declare function steps(
  from: number[],
  to: number[],
  frames: number,
): number[][];
