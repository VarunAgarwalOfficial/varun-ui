# Shell

The shared look and frame for every demo page. A change here reaches every demo the next time it loads.

- `shell.css`: the pixel look's tokens (`tokens.css`), the page's ground, ink and type, and three pieces by class: `px-frame`, `px-frame-plain` and `px-key`.
- `shell.js`: a small bar on top (name, project, **About**, **Source**), the About panel and a one-line footer. Inside a frame, or with `?embed` in the address, it draws nothing.
- `fonts/`: Newsreader, IBM Plex Mono, CM Web Serif and Pixelify Sans, with their licences.

It is published at `https://varunagarwalofficial.github.io/varun-ui/shell/`.

## Use it in a demo page

Put these in the page's `<head>`, before the page's own stylesheet:

```html
<meta name="description" content="One sentence: what the page does." />
<meta name="project" content="repo-name" />
<link
  rel="stylesheet"
  href="https://varunagarwalofficial.github.io/varun-ui/shell/shell.css"
/>
<script
  type="module"
  src="https://varunagarwalofficial.github.io/varun-ui/shell/shell.js"
></script>
```

Optional:

- `<meta name="project-title" content="Chess engine" />`: the name in the bar. Without it, the page's first `h1`.
- `<meta name="project-kind" content="security" />`: adds "Runs only in your browser" to the panel and the footer.
- `<meta name="project-terms" content="pcap, DNS, TLS" />`: the terms the page uses. Once the site is live, each links to its definition.
- `<template id="project-help">…</template>`: how to use the page, shown in the About panel.

Style the page with the `--site-*` and `--px-*` tokens only. Never purple or lavender.

## Change where it points

`CONFIG` at the top of `shell.js` holds the owner, the name, the site address and the site's paths for projects and security terms. While `site` is empty, the name links to GitHub and site links are left out.

## Try it

`example.html` uses every part. Serve the repository root and open `/shell/example.html`.
