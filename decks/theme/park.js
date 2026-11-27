// Parking: a teaching move written into the deck. Mid-explanation a
// question needs something else first. Park it, go up a level, explain
// that, then come back and answer it.
//
//   <section data-park="Why can't they just send a confirmation?"
//            data-up="Every message can be lost"> ... </section>
//   ...the slides that explain the bigger idea...
//   <section data-unpark> ...the answer... </section>
//
// On the park slide a pixel cart labelled with the question pulls into a
// spot at the bottom edge and stays there. The slide steps out (a zoom in
// whole-number scales) and a breadcrumb in the top corner shows how deep we
// are: "Two knights › Every message can be lost". On the unpark slide the
// breadcrumb pops and the cart drives back to the centre with its question.
// Parks nest (two or three levels read well). The root of the breadcrumb is
// data-root on the .reveal element, or the page title.
//
// The speaker notes of every slide in a parked level say what is parked.
// Moves are whole art pixels at 10 drawn frames a second; under reduced
// motion or ?static everything is simply in place.
(function () {
  const U = 6;
  const FPS = 10;
  // Read the URL, not html.static: deck.js sets that class and loads after this file.
  const q = new URLSearchParams(location.search);
  const isStatic = q.has('static') || q.has('print-pdf');
  const still = isStatic || matchMedia('(prefers-reduced-motion: reduce)').matches;

  // The valley's colours (the website's world/colors.ts), by letter.
  const HEX = {
    o: '#5a3a22', k: '#3b2a1a', e: '#d6eef8', Y: '#fff0a0',
    S: '#ffd23f', D: '#f2a922', b: '#a9d8ef', u: '#7fb6e0', m: '#a6e3cf', M: '#6fcfb5',
  };
  // A little cart facing right, 14 by 8. S and D are the body, one colour per level.
  const CART = [
    '...oooooo.....',
    '..oeeoeeeo....',
    '.oeeeoeeeeo...',
    'oSSSSSSSSSSSo.',
    'oSSSSSSSSSSSYo',
    'oDDDDDDDDDDDDo',
    '.okko....okko.',
    '..kk......kk..',
  ];
  const BODIES = [['S', 'D'], ['b', 'u'], ['m', 'M']];

  function cartImage(level, flip) {
    const c = document.createElement('canvas');
    c.width = 14;
    c.height = 8;
    const g = c.getContext('2d');
    const [hi, lo] = BODIES[level % BODIES.length];
    CART.forEach((row, y) => {
      for (let x = 0; x < row.length; x++) {
        let ch = row[x];
        if (ch === '.') continue;
        if (ch === 'S') ch = hi;
        else if (ch === 'D') ch = lo;
        g.fillStyle = HEX[ch];
        g.fillRect(flip ? 13 - x : x, y, 1, 1);
      }
    });
    const img = new Image(14 * U, 8 * U);
    img.src = c.toDataURL();
    img.alt = '';
    img.className = 'px-art';
    return img;
  }

  const snap = (v) => Math.round(v / U) * U;

  // Works out, from the document, which questions are parked on each slide.
  // Call before Reveal.initialize so the notes carry the parked questions.
  function prepare(deckEl) {
    const slides = [...deckEl.querySelectorAll('.slides section')].filter((s) => !s.querySelector('section'));
    const plan = new Map();
    let stack = [];
    let n = 0;
    for (const s of slides) {
      let answered = null;
      if (s.hasAttribute('data-unpark')) {
        answered = stack[stack.length - 1] || null;
        stack = stack.slice(0, -1);
      }
      if (s.dataset.park) {
        const up = s.dataset.up || s.querySelector('h2')?.textContent.trim() || s.dataset.park;
        stack = [...stack, { id: `park-${n++}`, question: s.dataset.park, up, level: stack.length }];
      }
      plan.set(s, { stack, answered, parks: !!s.dataset.park });
      const lines = stack.map((p) => `Parked (level ${p.level + 1}): ${p.question}`);
      if (answered) lines.unshift(`Answer the parked question now: ${answered.question}`);
      if (lines.length) {
        let notes = s.querySelector('aside.notes');
        if (!notes) {
          notes = document.createElement('aside');
          notes.className = 'notes';
          s.append(notes);
        }
        const p = document.createElement('p');
        p.className = 'parked-note';
        p.textContent = lines.join(' ');
        notes.prepend(p);
      }
    }
    return plan;
  }

  function init(Reveal, plan) {
    if (![...plan.values()].some((p) => p.stack.length || p.answered)) return null;
    const deckEl = Reveal.getRevealElement();
    const root = deckEl.dataset.root || document.title;
    const { width, height } = Reveal.getConfig();

    const layer = document.createElement('div');
    layer.className = 'park-layer';
    const crumbs = document.createElement('nav');
    crumbs.className = 'park-crumbs';
    crumbs.setAttribute('aria-label', 'How deep we are');
    layer.append(crumbs);
    // First, not last: reveal treats a section with a next sibling as not the last slide.
    deckEl.querySelector('.slides').prepend(layer);

    const carts = new Map(); // id -> element

    function makeCart(p) {
      const el = document.createElement('div');
      el.className = 'park-cart';
      el.dataset.level = p.level;
      el.append(cartImage(p.level, false));
      const q = document.createElement('span');
      q.className = 'park-q';
      q.textContent = p.question;
      el.append(q);
      layer.append(el);
      return el;
    }

    // Where a cart stands: a spot along the bottom edge, or the centre.
    function spot(el, level, centre) {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const x = centre ? (width - w) / 2 : 24 + level * 588;
      const y = height - h - 24;
      return [snap(x), snap(y)];
    }

    function place(el, [x, y]) {
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    }

    // Moves an element from one place to another in whole art pixels.
    function drive(el, from, to) {
      place(el, to);
      if (still) return;
      const dx = (from[0] - to[0]) / U;
      const dy = (from[1] - to[1]) / U;
      if (!dx && !dy) return;
      const frames = Math.max(4, Math.min(14, Math.round(Math.hypot(dx, dy) / 8)));
      const keys = [];
      for (let k = 0; k <= frames; k++) {
        const t = 1 - (1 - k / frames) ** 2;
        keys.push({ transform: `translate(${Math.round(dx * (1 - t)) * U}px, ${Math.round(dy * (1 - t)) * U}px)`, easing: 'steps(1, end)' });
      }
      el.animate(keys, { duration: (frames * 1000) / FPS });
    }

    function dither(el, out) {
      el.classList.remove('px-in', 'px-out');
      if (still) {
        if (out) el.remove();
        return;
      }
      void el.offsetWidth;
      el.classList.add(out ? 'px-out' : 'px-in');
      if (out) setTimeout(() => el.remove(), 300);
    }

    // Steps the slide out to the bigger picture: scale 2, 1.5, then 1, so
    // every art pixel stays a whole number of screen pixels.
    function zoomOut(slide) {
      if (still) return;
      const keys = [2, 1.5, 1].map((s) => ({ transform: `scale(${s})`, easing: 'steps(1, end)' }));
      const opts = { duration: 300 };
      slide.animate(keys, opts);
      deckEl.querySelector('canvas.story-scene')?.animate(keys, opts);
    }

    let depth = 0;
    function show(slide) {
      const p = plan.get(slide);
      if (!p) return;
      crumbs.replaceChildren();
      const trail = [root, ...p.stack.map((s) => s.up)];
      trail.forEach((t, i) => {
        const span = document.createElement('span');
        span.textContent = t;
        if (i === trail.length - 1) span.setAttribute('aria-current', 'step');
        crumbs.append(span);
      });
      crumbs.hidden = p.stack.length === 0;
      deckEl.classList.toggle('parking', p.stack.length > 0 || !!p.answered);

      const want = new Map(p.stack.map((s) => [s.id, { s, centre: false }]));
      if (p.answered) want.set(p.answered.id, { s: p.answered, centre: true });
      for (const [id, el] of carts) {
        if (!want.has(id)) { carts.delete(id); dither(el, true); }
      }
      for (const [id, { s, centre }] of want) {
        let el = carts.get(id);
        const isNew = !el;
        if (isNew) { el = makeCart(s); carts.set(id, el); }
        el.classList.toggle('home', centre);
        const to = spot(el, s.level, centre);
        if (isNew && p.parks && s === p.stack[p.stack.length - 1]) {
          drive(el, spot(el, s.level, true), to); // pulls out of the centre into its spot
        } else if (isNew) {
          place(el, to);
          dither(el, false);
        } else {
          drive(el, [parseFloat(el.style.left), parseFloat(el.style.top)], to);
        }
      }
      if (p.stack.length > depth) zoomOut(slide);
      depth = p.stack.length;
    }

    Reveal.on('slidechanged', ({ currentSlide }) => show(currentSlide));
    show(Reveal.getCurrentSlide());
    return { show };
  }

  window.DeckPark = { prepare, init };
})();
