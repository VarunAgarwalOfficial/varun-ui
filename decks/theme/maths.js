// LaTeX maths in every deck. Load after KaTeX (vendor/katex/katex.min.js),
// macros.js and, for pixel maths, vendor/crisptex/crisptex.js. Deck.start
// draws the maths before reveal.js starts, so fragments inside an equation
// count as fragments.
//
// Write TeX straight into the slide:
//   $x^2$  \(x^2\)              inline
//   $$x^2$$  \[x^2\]             display
//   \begin{align} ... \end{align}  (also align*, gather, gather*)
//   \$                          a plain dollar sign
// A single $ must touch its maths: "$5 and $10" stays text.
//
// data-math="pixel" on a slide or any element draws the maths inside it with
// crisptex, on the pixel grid. Its scale follows the font size (Pixelify's
// 11px grid), or set data-math-scale. data-math="katex" switches back.
//
// make check runs split() and the same KaTeX options over every deck, so a
// formula that fails here fails the check.
(function (g) {
  const DELIMS = [
    ['$$', '$$', true],
    ['\\[', '\\]', true],
    ['\\(', '\\)', false],
    ...['align', 'align*', 'gather', 'gather*'].map((e) => [`\\begin{${e}}`, `\\end{${e}}`, true, true]),
    ['$', '$', false],
  ];
  // Where maths is never drawn: code, scripts, speaker notes (the notes
  // window has no KaTeX stylesheet), maths already drawn, and .no-math.
  const SKIP = 'script, style, pre, code, textarea, aside.notes, .katex, .pxm, .no-math';

  // The end of the maths that starts at `from`, skipping braces and escapes.
  function end(text, close, from) {
    let depth = 0;
    for (let i = from; i < text.length; i++) {
      if (depth === 0 && text.startsWith(close, i)) {
        if (close !== '$' || (!/\s/.test(text[i - 1]) && !/\d/.test(text[i + 1] || ''))) return i;
      }
      const c = text[i];
      if (c === '\\') i++;
      else if (c === '{') depth++;
      else if (c === '}') depth = Math.max(0, depth - 1);
    }
    return -1;
  }

  // Text to parts: { text } or { tex, display }.
  function split(text) {
    const parts = [];
    let buf = '';
    for (let i = 0; i < text.length;) {
      if (text.startsWith('\\$', i)) { buf += '$'; i += 2; continue; }
      const d = DELIMS.find(([open]) => text.startsWith(open, i));
      const [open, close, display, keep] = d || [];
      const at = d && !(open === '$' && /\s/.test(text[i + 1] || ' ')) ? end(text, close, i + open.length) : -1;
      if (at < 0) { buf += text[i++]; continue; }
      if (buf) parts.push({ text: buf });
      buf = '';
      parts.push({ tex: keep ? text.slice(i, at + close.length) : text.slice(i + open.length, at), display });
      i = at + close.length;
    }
    if (buf) parts.push({ text: buf });
    return parts;
  }

  const options = (display) => ({
    displayMode: display,
    throwOnError: false,
    output: 'htmlAndMathml',
    fleqn: true,
    macros: { ...(g.DeckMacros || {}) },
    // \class (macros.js) is \htmlClass; it needs trust, and nothing else does.
    trust: (ctx) => ctx.command === '\\htmlClass',
    strict: (code) => (code === 'htmlExtension' ? 'ignore' : 'warn'),
  });

  function pixelScale(el) {
    const set = el.closest('[data-math-scale]');
    if (set) return Number(set.dataset.mathScale);
    return Math.max(1, Math.round(parseFloat(getComputedStyle(el).fontSize) / 11));
  }

  function draw(part, parent) {
    const span = document.createElement('span');
    const pixel = parent.closest('[data-math]')?.dataset.math === 'pixel';
    if (pixel && g.Crisptex) {
      span.innerHTML = g.Crisptex.toHtml(part.tex, { display: part.display, scale: pixelScale(parent), macros: g.DeckMacros });
      return span.firstChild;
    }
    if (pixel) console.warn('[maths] data-math="pixel" needs vendor/crisptex/crisptex.js; drawing with KaTeX');
    g.katex.render(part.tex, span, options(part.display));
    return span;
  }

  // Draws every formula under root. Returns the number of KaTeX errors.
  function render(root) {
    if (!g.katex) { console.warn('[maths] KaTeX is not loaded'); return 0; }
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => (/[$\\]/.test(n.nodeValue) && !n.parentElement.closest(SKIP) ? 1 : 2),
    });
    const nodes = [];
    for (let n = walker.nextNode(); n; n = walker.nextNode()) nodes.push(n);
    for (const node of nodes) {
      const parts = split(node.nodeValue);
      if (parts.length === 1 && parts[0].text === node.nodeValue) continue;
      node.replaceWith(...parts.map((p) => (p.tex === undefined ? p.text : draw(p, node.parentElement))));
    }
    const errors = root.querySelectorAll('.katex-error');
    for (const e of errors) console.error(`[maths] ${e.title}`);
    return errors.length;
  }

  g.DeckMaths = { split, options, render };
})(globalThis);
