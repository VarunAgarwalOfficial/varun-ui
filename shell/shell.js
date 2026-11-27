/*
 * The shell every demo page shares: a small bar on top, an About panel and a
 * one-line footer, all linking back to the website and the repository.
 *
 * A page opts in with two tags and one meta tag (see README.md). The bar and
 * the footer live in shadow roots, so a tool's own CSS cannot reach them and
 * theirs cannot reach the tool. Inside a frame (the website's tool pages) or
 * with ?embed in the address, the shell draws nothing: the page around it has
 * the navigation.
 */

/* The one place to change where the shell points. */
const CONFIG = {
  owner: "VarunAgarwalOfficial",
  name: "Varun Agarwal",
  // The website, once it is live, for example "https://example.com".
  // While it is empty, the name links to GitHub and site links are left out.
  site: "",
  // A project's page on the site: site + projectPath + slug.
  projectPath: "/projects/",
  // A security term's page on the site: site + termPath + slug.
  termPath: "/security/terms/",
};

const meta = (name) =>
  document.querySelector(`meta[name="${name}"]`)?.content.trim() ?? "";

const framed = (() => {
  if (new URLSearchParams(location.search).has("embed")) return true;
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
})();

const slugOf = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const esc = (s) =>
  s.replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
  );

/* The sunflower mark, drawn on a 9 by 11 pixel grid. */
const FLOWER = [
  "..y.y.y..",
  ".yyyyyyy.",
  "yyobbboyy",
  ".ybbbbby.",
  "yybbbbbyy",
  ".yobbboy.",
  ".yyyyyyy.",
  "..y.g.y..",
  ".ll.g....",
  "..llg....",
  "....g....",
];
const INK = {
  y: "#ffd23f",
  o: "#f2a922",
  b: "#6b4a2c",
  g: "#3f6b22",
  l: "#6f9e3a",
};
const flower = () => {
  let rects = "";
  FLOWER.forEach((row, y) =>
    [...row].forEach((c, x) => {
      if (INK[c])
        rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="${INK[c]}"/>`;
    }),
  );
  return `<svg class="mark" viewBox="0 0 9 11" width="18" height="22" aria-hidden="true" shape-rendering="crispEdges">${rects}</svg>`;
};

const STYLE = `
:host { all: initial; display: block; color: var(--site-color-fg, #3b2a1a);
  font-family: var(--site-font-body, Georgia, serif); }
* { box-sizing: border-box; }
a { color: inherit; text-decoration-color: var(--site-color-link-line, #c46f1c);
  text-decoration-thickness: var(--site-underline-width, 2px);
  text-underline-offset: var(--site-underline-offset, 0.2em); }
a:focus-visible, button:focus-visible {
  outline: var(--site-focus-width, 3px) solid var(--site-color-focus, #2f6297);
  outline-offset: var(--site-focus-offset, 3px); }
.bar { display: flex; align-items: center; gap: var(--site-space-3, 0.75rem);
  padding: var(--site-space-2, 0.5rem) var(--site-gutter, 1.25rem);
  background: var(--px-plate, #fffdf2);
  box-shadow: 0 var(--px-u, 3px) 0 0 var(--px-frame-line, #f2a922);
  font-family: var(--site-font-pixel, monospace); font-size: var(--site-step--1, 1.0625rem); line-height: 1.4; }
.home { display: inline-flex; align-items: center; gap: var(--site-space-2, 0.5rem);
  text-decoration: none; }
.home:hover span { text-decoration: underline;
  text-decoration-color: var(--site-color-link-line, #c46f1c); }
.mark { image-rendering: pixelated; flex: none; }
.sep { color: var(--site-color-muted, #6b4a2c); }
.project { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.links { margin-left: auto; display: flex; gap: var(--site-space-3, 0.75rem); flex: none; }
.key { --k: var(--px-sunflower, #ffd23f); appearance: none; display: inline-flex;
  align-items: center; margin: var(--px-u, 3px); padding: 0.125rem var(--site-space-3, 0.75rem);
  border: 0; border-radius: 0; background: var(--k); color: var(--site-color-fg, #3b2a1a);
  font: inherit; text-decoration: none; cursor: pointer;
  box-shadow: 0 calc(-1 * var(--px-u, 3px)) 0 0 currentColor, 0 var(--px-u, 3px) 0 0 currentColor,
    calc(-1 * var(--px-u, 3px)) 0 0 0 currentColor, var(--px-u, 3px) 0 0 0 currentColor,
    0 calc(2 * var(--px-u, 3px)) 0 0 currentColor; }
.key.plain { --k: var(--px-plate, #fffdf2); }
.key:hover { --k: var(--px-butter, #fff0b0); }
.key:active { transform: translateY(var(--px-u, 3px));
  box-shadow: 0 calc(-1 * var(--px-u, 3px)) 0 0 currentColor, 0 var(--px-u, 3px) 0 0 currentColor,
    calc(-1 * var(--px-u, 3px)) 0 0 0 currentColor, var(--px-u, 3px) 0 0 0 currentColor; }
.about { position: fixed; inset: auto; top: 3.75rem; right: var(--site-gutter, 1.25rem);
  margin: 0; width: min(26rem, calc(100vw - 2 * var(--site-gutter, 1.25rem)));
  max-height: calc(100vh - 5rem); overflow: auto;
  padding: var(--site-space-4, 1rem) var(--site-space-5, 1.5rem);
  border: 0; background: var(--px-plate, #fffdf2); color: var(--site-color-fg, #3b2a1a);
  font-family: var(--site-font-body, Georgia, serif); font-size: var(--site-step--1, 1.0625rem);
  line-height: var(--site-leading-body, 1.6);
  box-shadow: 0 calc(-1 * var(--px-u, 3px)) 0 0 var(--px-frame-line, #f2a922),
    0 var(--px-u, 3px) 0 0 var(--px-frame-line, #f2a922),
    calc(-1 * var(--px-u, 3px)) 0 0 0 var(--px-frame-line, #f2a922),
    var(--px-u, 3px) 0 0 0 var(--px-frame-line, #f2a922),
    var(--px-u, 3px) calc(2 * var(--px-u, 3px)) 0 0 var(--px-frame-drop, #c46f1c),
    calc(2 * var(--px-u, 3px)) var(--px-u, 3px) 0 0 var(--px-frame-drop, #c46f1c),
    calc(2 * var(--px-u, 3px)) calc(2 * var(--px-u, 3px)) 0 0 var(--px-frame-drop, #c46f1c); }
.about h2 { margin: 0 0 var(--site-space-2, 0.5rem); font: 400 1.375rem / 1.2 var(--site-font-pixel, monospace); }
.about p, .about ul, .about ol { margin: 0 0 var(--site-space-3, 0.75rem); }
.about ul, .about ol { padding-left: 1.25rem; }
.about .local { padding: var(--site-space-2, 0.5rem) var(--site-space-3, 0.75rem);
  background: var(--px-mint-soft, #e4f9f1); }
.about .close { margin-top: var(--site-space-2, 0.5rem); font-family: var(--site-font-pixel, monospace); }
.foot { display: flex; flex-wrap: wrap; gap: var(--site-space-1, 0.25rem) var(--site-space-4, 1rem);
  justify-content: center; padding: var(--site-space-4, 1rem) var(--site-gutter, 1.25rem);
  border-top: var(--px-u, 3px) solid var(--px-meadow, #cfeaa0);
  color: var(--site-color-muted, #6b4a2c); font-size: var(--site-step--1, 1.0625rem); }
@media (max-width: 30rem) {
  .bar { gap: var(--site-space-2, 0.5rem); }
  .home span, .sep { display: none; }
}
`;

const sheet = new CSSStyleSheet();
sheet.replaceSync(STYLE);

function project() {
  const repo = meta("project");
  const slug = slugOf(repo);
  const repoUrl = `https://github.com/${CONFIG.owner}/${repo}`;
  const site = CONFIG.site.replace(/\/$/, "");
  return {
    repo,
    title:
      meta("project-title") ||
      document.querySelector("h1")?.textContent.trim() ||
      document.title,
    line: meta("description"),
    kind: meta("project-kind") || "tool",
    terms: meta("project-terms")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    repoUrl,
    home: site || `https://github.com/${CONFIG.owner}`,
    page: site ? `${site}${CONFIG.projectPath}${slug}` : "",
    more: site
      ? `${site}${CONFIG.projectPath}`
      : `https://github.com/${CONFIG.owner}?tab=repositories`,
    term: (t) => (site ? `${site}${CONFIG.termPath}${slugOf(t)}` : ""),
  };
}

function about(p) {
  const help = document.getElementById("project-help");
  const terms = p.terms
    .map((t) => {
      const href = p.term(t);
      return href ? `<a href="${esc(href)}">${esc(t)}</a>` : esc(t);
    })
    .join(", ");
  const local =
    p.kind === "security"
      ? `<p class="local">Runs only in your browser. Nothing you open here is uploaded.</p>`
      : "";
  const links = [
    `<li><a href="${esc(p.repoUrl)}#readme">How it works, in the README</a></li>`,
    p.page ? `<li><a href="${esc(p.page)}">The project page</a></li>` : "",
    `<li><a href="${esc(p.more)}">More projects</a></li>`,
  ].join("");
  const panel = document.createElement("div");
  panel.id = "about";
  panel.className = "about";
  panel.setAttribute("popover", "");
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-labelledby", "about-title");
  panel.innerHTML = `<h2 id="about-title">${esc(p.title)}</h2>
    ${p.line ? `<p>${esc(p.line)}</p>` : ""}
    <div class="help"></div>
    ${local}
    ${terms ? `<p>Terms used here: ${terms}.</p>` : ""}
    <ul>${links}</ul>
    <button class="key close" type="button" popovertarget="about" popovertargetaction="hide">Close</button>`;
  if (help?.content)
    panel.querySelector(".help").append(help.content.cloneNode(true));
  return panel;
}

class ProjectBar extends HTMLElement {
  connectedCallback() {
    const p = project();
    const root = this.attachShadow({ mode: "open" });
    root.adoptedStyleSheets = [sheet];
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.innerHTML = `<a class="home" href="${esc(p.home)}">${flower()}<span>${esc(CONFIG.name)}</span></a>
      <span class="sep" aria-hidden="true">/</span>
      <span class="project">${esc(p.title)}</span>
      <nav class="links" aria-label="Project">
        <button class="key" type="button" popovertarget="about">About</button>
        <a class="key plain" href="${esc(p.repoUrl)}">Source</a>
      </nav>`;
    root.append(bar, about(p));
  }
}

class ProjectFoot extends HTMLElement {
  connectedCallback() {
    const p = project();
    const root = this.attachShadow({ mode: "open" });
    root.adoptedStyleSheets = [sheet];
    const foot = document.createElement("div");
    foot.className = "foot";
    foot.innerHTML = `<span>${esc(p.title)}, by <a href="${esc(p.home)}">${esc(CONFIG.name)}</a></span>
      ${p.kind === "security" ? "<span>Runs only in your browser</span>" : ""}
      <a href="${esc(p.repoUrl)}">Source on GitHub</a>
      <a href="${esc(p.more)}">More projects</a>`;
    root.append(foot);
  }
}

function mount() {
  if (framed) {
    document.documentElement.dataset.framed = "";
    return;
  }
  if (!meta("project")) return;
  customElements.define("project-bar", ProjectBar);
  customElements.define("project-foot", ProjectFoot);
  const bar = document.createElement("project-bar");
  bar.setAttribute("role", "banner");
  const foot = document.createElement("project-foot");
  foot.setAttribute("role", "contentinfo");
  document.body.prepend(bar);
  document.body.append(foot);
}

if (document.readyState === "loading")
  document.addEventListener("DOMContentLoaded", mount);
else mount();
