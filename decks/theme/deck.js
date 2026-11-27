// Starts a deck with the kit's defaults. Load after reveal.js and the notes
// plugin, then call Deck.start({ ...any reveal.js options }).
//
// What it adds:
// - ?static (set by make pdf) or ?print-pdf: the html gets class "static";
//   embeds show their fallback shot, nothing animates.
// - Embeds: <iframe data-src> inside .embed gets ?embed (so the site's shell
//   draws nothing) and loads only near its slide (reveal's own lazy loading).
// - Pixel moves: an element with data-px-id that is on this slide and the
//   last one walks from its old place to its new one in whole art pixels at
//   10 drawn frames a second. This replaces reveal's auto-animate, which
//   tweens smoothly.
// - Parking (park.js, if loaded): data-park, data-up and data-unpark on
//   slides park a question, go up a level and come back. Authored only.
// - ?present: the first key or click goes full screen (browsers need a
//   gesture). F does the same at any time; S opens the speaker notes.
(function () {
  const q = new URLSearchParams(location.search);
  const isStatic = q.has('static') || q.has('print-pdf');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isStatic) document.documentElement.classList.add('static');

  const U = 6; // one art pixel on a 1920 by 1080 slide
  const FPS = 10;

  function embedUrl(src) {
    const url = new URL(src, location.href);
    url.searchParams.set('embed', '');
    return url.href.replace(/([?&])embed=(?=&|#|$)/, '$1embed');
  }

  function pixelMoves(Reveal) {
    Reveal.on('slidechanged', ({ previousSlide, currentSlide }) => {
      if (!previousSlide || isStatic || reduce) return;
      const scale = Reveal.getScale() || 1;
      for (const el of currentSlide.querySelectorAll('[data-px-id]')) {
        const old = previousSlide.querySelector(`[data-px-id="${el.dataset.pxId}"]`);
        if (!old) continue;
        const a = old.getBoundingClientRect();
        const b = el.getBoundingClientRect();
        const dx = Math.round((a.left - b.left) / scale / U);
        const dy = Math.round((a.top - b.top) / scale / U);
        if (!dx && !dy) continue;
        const frames = Math.max(3, Math.min(12, Math.round(Math.hypot(dx, dy) / 6)));
        const keys = [];
        for (let k = 0; k <= frames; k++) {
          const t = 1 - (1 - k / frames) ** 2; // ease out, then snap to the art grid
          keys.push({
            transform: `translate(${Math.round(dx * (1 - t)) * U}px, ${Math.round(dy * (1 - t)) * U}px)`,
            easing: 'steps(1, end)',
          });
        }
        el.animate(keys, { duration: (frames * 1000) / FPS });
      }
    });
  }

  function present() {
    if (!q.has('present')) return;
    const go = () => {
      document.documentElement.requestFullscreen?.().catch(() => {});
      removeEventListener('keydown', go, true);
      removeEventListener('pointerdown', go, true);
    };
    addEventListener('keydown', go, true);
    addEventListener('pointerdown', go, true);
  }

  window.Deck = {
    static: isStatic,
    start(options = {}) {
      for (const f of document.querySelectorAll('.embed iframe[data-src]')) {
        if (isStatic) f.removeAttribute('data-src');
        else f.dataset.src = embedUrl(f.dataset.src);
      }
      // Parking adds its lines to the speaker notes before reveal reads them.
      const parks = window.DeckPark ? window.DeckPark.prepare(document.querySelector('.reveal')) : null;
      const plugins = [window.RevealNotes, ...(options.plugins || [])].filter(Boolean);
      const ready = Reveal.initialize({
        width: 1920,
        height: 1080,
        margin: 0,
        minScale: 0.2,
        maxScale: 4,
        center: false,
        hash: true,
        controls: false,
        progress: true,
        slideNumber: 'c/t',
        transition: 'none',
        backgroundTransition: 'none',
        autoAnimate: false,
        viewDistance: 2,
        ...options,
        plugins,
      });
      pixelMoves(Reveal);
      present();
      return ready.then(() => {
        if (parks) window.Deck.park = window.DeckPark.init(Reveal, parks);
        return Reveal;
      });
    },
  };
})();
