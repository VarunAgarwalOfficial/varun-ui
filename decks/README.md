# Decks

The one reveal.js kit for every deck: the site's pixel look, speaker notes, live tool embeds, story scenes and a one-command PDF. Each folder here with an `index.html` is a deck. The decks share `theme/` and `vendor/`. `starter/` is a lesson to copy; `story/` shows story scenes and parking.

```
make dev              serve every deck at http://127.0.0.1:47320/
make new NAME=week-3  start a deck from the starter
make pdf              every deck to pdf/<deck>.pdf (or make pdf DECK=story)
make check            vendor files, pinned version, no purple, embed fallbacks, notes
make build            refresh vendor/ (reveal, site tokens and fonts, the valley)
```

`make pdf` needs Chromium at `/usr/bin/chromium` (or set `CHROME`). It prints the page count and fails if that isn't one page per slide.

## Presenting

- Decks fill the window at 16:9, with bars at the sides or top if the window is another shape. The slide is 1920 by 1080, so on a 1080p screen it is drawn 1 to 1.
- **F** goes full screen. **S** opens the speaker notes in a second window.
- `?present` on the URL: the first key press or click goes full screen.
- `?static`: what the PDF shows. Embeds show their picture, scenes show their final state, nothing moves.
- From the website, link a deck as its own page (`/decks/week-3/?present`). Never put it in a small frame.

## Writing a deck

Start from `starter/`. Its order is the lesson shape: the outcome, a story, the words needed, the obvious first try and where it breaks, the idea built in steps, a worked example, predict, try it, transfer, and back to the story. Each slide's notes start with the slot it fills.

- Speaker notes: `<aside class="notes">` in every slide. `make check` warns when one is missing.
- Fragments (`class="fragment"`) appear through a dither in three steps, never a fade.
- Boxes: `.frame`, tinted with `.blue`, `.mint`, `.blush`, `.peach`, `.meadow` or `.butter`. Highlight a value with `<span class="chip">`.
- Tabs: `data-label="Predict"` on a section puts a tab above it. "Predict" and "Your turn" are blue; "Try it" is mint.
- Layouts: `.title-slide`, `.say` (one big sentence), `.two` and `.three` (columns).
- Moving things: give an element the same `data-px-id` on two slides in a row. It walks to its new place in whole art pixels.
- Scripts that add layers to `.slides` must put them before the first `<section>`. Reveal treats a section with anything after it as not the last slide, and `make pdf` then never ends.

### Embeds

```html
<figure class="embed">
  <iframe data-src="https://varunswaika.github.io/chess-engine/" title="Chess against an engine"></iframe>
  <img class="fallback" src="shots/chess-engine.png" alt="The board at the start of a game">
  <figcaption>What to do with it.</figcaption>
</figure>
```

The page gets `?embed`, so the site draws only the tool. It loads only near its slide. The picture shows while it loads and is all the PDF shows. `make check` fails if the picture is missing. Set `--ratio` or `--embed-h` on the figure to change its shape.

### Story scenes

Add `class="story"` to `.reveal` and load `theme/story.js` (see `story/index.html`). The valley from the website fills the slide behind the text.

- `data-cast="a knight 44 150; b knight 276 150 flip"` puts the cast on stage. Positions are on a 320 by 180 grid, measured to the bottom middle of each sprite.
- On a later slide or fragment, `data-cast="m 258 138"` moves `m` there in whole pixels, and `data-cast="m -"` dithers it away.
- `data-phase="dawn"` changes the time of day. `data-cast-reset` clears the stage.
- The cast: `knight`, `bee`, `courier` (a bee with a packet), `packet`, `butterfly`, `butterfly-blue` and `varun`.

Scenes are drawn at 10 frames a second. Under reduced motion, or in the PDF, everything is simply in place.

### Parking a question

Part of the explanation, written into the deck. Nobody in the room clicks anything.

```html
<section data-park="Why can't they just send a confirmation?" data-up="Every message can be lost">
  ...the question comes up...
</section>
<section> ...the bigger idea... </section>
<section data-unpark> ...the answer... </section>
```

On the park slide, a cart labelled with the question pulls into a spot at the bottom edge. The slide steps out to show the bigger picture. A trail in the top corner shows the level: "Two knights › Every message can be lost". On the `data-unpark` slide the trail pops and the cart drives back to the middle. Parks nest; two or three levels read well. The first part of the trail is `data-root` on `.reveal`, or the page title. The speaker notes say what is parked.

## Versions

Versions are pinned exactly in `package.json`. `make vendor` copies what the decks need into `vendor/`, which is committed. A deck then runs from its folder with no network and no install, and stays the same until someone changes the pin on purpose. `make check` fails if `vendor/` doesn't match the pin.

- reveal.js 6.0.2. The PDF uses decktape 3.17.0. The valley is built with esbuild 0.28.2.
- `vendor/shell/` is copied from varun-ui's `shell/` (colours, Newsreader, Pixelify Sans, IBM Plex Mono) by `make sync`. Don't edit it here.
- `vendor/world/world.js` is the website's pixel valley, built by `make world` from `~/Personal/projects/website` (set `WEBSITE` for another checkout). The built file names the commit it came from.

## Rules for the look

- Colours come only from the site's tokens. No purple or lavender; `make check` looks for it.
- Text is Newsreader, the site's body font. Headings and labels are Pixelify Sans, code is IBM Plex Mono.
- One art pixel is 6px on the slide. Lines, gaps and moves are whole art pixels. Pixelify sizes are multiples of 33px (99, 66, 33).
- Things appear by dither, not by fading or blurring.
