#!/usr/bin/env node

import { existsSync } from "node:fs";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const iconBarrel = "src/lib/components/varunui/internal/icons/phosphor.ts";
const auditScript = "scripts/registry/check-architecture.mjs";
const sourceExtensions = new Set([
  ".css",
  ".js",
  ".json",
  ".md",
  ".mjs",
  ".svelte",
  ".ts",
]);
const generatedSourceFiles = new Set(["src/showcase/catalog.generated.ts"]);
const varunRoot = "src/lib/components/varunui";

const skipDirs = new Set([
  ".git",
  ".svelte-kit",
  ".vite",
  "build",
  "dist",
  "node_modules",
]);

const scannedRoots = ["README.md", "scripts", "src"];

const importPathPattern = /\$lib\/([^"']+)/g;

function normalize(value) {
  return value.split(path.sep).join("/");
}

function lineOf(source, index) {
  return source.slice(0, index).split("\n").length;
}

async function listFiles(entry) {
  const absPath = path.join(root, entry);
  if (!existsSync(absPath)) return [];

  const statFiles = [];

  async function visit(current) {
    const rel = normalize(path.relative(root, current));
    const entries = await readdir(current, { withFileTypes: true });

    for (const item of entries) {
      const child = path.join(current, item.name);
      if (item.isDirectory()) {
        if (!skipDirs.has(item.name)) await visit(child);
        continue;
      }

      if (!item.isFile()) continue;
      if (sourceExtensions.has(path.extname(item.name))) {
        statFiles.push(normalize(path.join(rel, item.name)));
      }
    }
  }

  if ((await import("node:fs/promises")).stat) {
    const { stat } = await import("node:fs/promises");
    const entryStat = await stat(absPath);
    if (entryStat.isFile()) return [entry];
    if (entryStat.isDirectory()) await visit(absPath);
  }

  return statFiles;
}

async function read(relPath) {
  return readFile(path.join(root, relPath), "utf8");
}

function resolveLocalImport(importPath) {
  const asSource =
    importPath.endsWith(".js") || importPath.endsWith(".ts")
      ? importPath.replace(/\.(js|ts)$/, ".ts")
      : importPath;

  return `src/lib/${asSource}`;
}

function localImportTargets(source) {
  const targets = [];
  let match;
  importPathPattern.lastIndex = 0;
  while ((match = importPathPattern.exec(source))) {
    targets.push(resolveLocalImport(match[1]));
  }
  return targets;
}

const layoutCompositionCache = new Map();
const pageHeadingCache = new Map();

async function composesPublicLayout(relPath, seen = new Set()) {
  if (layoutCompositionCache.has(relPath)) {
    return layoutCompositionCache.get(relPath);
  }
  if (seen.has(relPath) || !existsSync(path.join(root, relPath))) return false;

  const nextSeen = new Set(seen).add(relPath);
  const source = await read(relPath);
  if (source.includes("$lib/components/varunui/layout/")) {
    layoutCompositionCache.set(relPath, true);
    return true;
  }

  for (const target of new Set(localImportTargets(source))) {
    if (
      target.startsWith(`${varunRoot}/`) &&
      (await composesPublicLayout(target, nextSeen))
    ) {
      layoutCompositionCache.set(relPath, true);
      return true;
    }
  }

  layoutCompositionCache.set(relPath, false);
  return false;
}

async function composesPageHeading(relPath, seen = new Set()) {
  if (pageHeadingCache.has(relPath)) return pageHeadingCache.get(relPath);
  if (seen.has(relPath) || !existsSync(path.join(root, relPath))) return false;

  const nextSeen = new Set(seen).add(relPath);
  const source = await read(relPath);
  if (
    /<h1\b/.test(source) ||
    /level=\{1\}/.test(source) ||
    /<StateMessage\b/.test(source)
  ) {
    pageHeadingCache.set(relPath, true);
    return true;
  }

  for (const target of new Set(localImportTargets(source))) {
    if (
      target.startsWith(`${varunRoot}/`) &&
      (await composesPageHeading(target, nextSeen))
    ) {
      pageHeadingCache.set(relPath, true);
      return true;
    }
  }

  pageHeadingCache.set(relPath, false);
  return false;
}

function addFinding(findings, relPath, line, message) {
  findings.push({ relPath, line, message });
}

const files = [
  ...new Set((await Promise.all(scannedRoots.map(listFiles))).flat()),
].sort();

const findings = [];

for (const relPath of files) {
  const source = await read(relPath);
  const scanContent =
    relPath !== auditScript && !generatedSourceFiles.has(relPath);

  const contentChecks = [
    {
      pattern: /\blucide\b/i,
      message: "contains Lucide text or import",
    },
    {
      pattern: /from\s+["']next\//,
      message: "imports Next.js directly",
    },
    {
      pattern: /from\s+["']@\//,
      message: "uses React-style @/ alias import",
    },
    {
      pattern: /\basChild\b/,
      message: "contains React/shadcn asChild API",
    },
    {
      pattern: /\b_[a-f0-9]{6}\b/,
      message: "contains opaque generated hash class token",
    },
    {
      pattern: new RegExp(`\\b${["north", "star"].join("")}\\b`, "i"),
      message:
        "contains the retired placeholder brand; keep examples in the varunUI world",
    },
    {
      pattern: /#each[^\n]+\bas\s+\w+\s*\(\s*\w+\.href\s*\)/,
      message:
        "keys a demo link collection by href alone; repeated destinations need a composite identity",
    },
    {
      pattern:
        /<Button\b(?=[^>]*\bdisabled=)(?=[^>]*\bhref=\{[A-Za-z_$][\w$.]*\})[^>]*>/s,
      message:
        "passes a direct href to a disabled-capable Button; omit href until navigation is valid",
    },
  ];

  if (relPath !== iconBarrel) {
    contentChecks.push({
      pattern: /from\s+["']phosphor-svelte(?:\/[^"']*)?["']/,
      message: "imports phosphor-svelte outside the shared icon barrel",
    });
  }

  if (scanContent) {
    for (const check of contentChecks) {
      const match = check.pattern.exec(source);
      if (match) {
        addFinding(
          findings,
          relPath,
          lineOf(source, match.index),
          check.message,
        );
      }
    }

    for (const match of source.matchAll(/<[a-z][^>]*\bclassName\s*=/g)) {
      addFinding(
        findings,
        relPath,
        lineOf(source, match.index),
        "uses className on a native Svelte element",
      );
    }
  }

  if (relPath.startsWith("src/lib/components/varunui/")) {
    for (const match of source.matchAll(/\bhref\s*=\s*"([^"]+)"/g)) {
      if (match[1] !== "?") {
        addFinding(
          findings,
          relPath,
          lineOf(source, match.index),
          `uses literal href ${JSON.stringify(match[1])}; demos should link to "?"`,
        );
      }
    }
  }

  if (relPath.startsWith(`${varunRoot}/page/`) && relPath.endsWith(".svelte")) {
    if (relPath.endsWith("-page.svelte")) {
      addFinding(
        findings,
        relPath,
        1,
        "uses redundant -page filename in the Page tier",
      );
    }

    if (!(await composesPublicLayout(relPath))) {
      addFinding(findings, relPath, 1, "Page does not compose a public Layout");
    }

    if (!(await composesPageHeading(relPath))) {
      addFinding(findings, relPath, 1, "Page has no page-level heading");
    }

    const pageApi = /\b(?:interface|const)\s+\w+Page(?:Props|Demo)\b/.exec(
      source,
    );
    if (pageApi) {
      addFinding(
        findings,
        relPath,
        lineOf(source, pageApi.index),
        "Page API repeats the tier name; use the page's job name only",
      );
    }
  }

  if (
    (relPath.startsWith(`${varunRoot}/piece/`) ||
      relPath.startsWith(`${varunRoot}/layout/`)) &&
    relPath.endsWith(".svelte")
  ) {
    const ownedState = /\$(?:state|effect|bindable)\s*\(/.exec(source);
    if (ownedState) {
      addFinding(
        findings,
        relPath,
        lineOf(source, ownedState.index),
        "presentational tier owns state; move behavior into a Component",
      );
    }
  }

  if (
    relPath.startsWith(`${varunRoot}/layout/`) &&
    relPath.endsWith(".svelte")
  ) {
    const tierImport =
      /\$lib\/components\/varunui\/(?:component|piece|page|email)\//.exec(
        source,
      );
    if (tierImport) {
      addFinding(
        findings,
        relPath,
        lineOf(source, tierImport.index),
        "Layout imports a higher tier; Layouts own geometry only",
      );
    }

    const motion = /\b(?:motion-|animate-|transition-|animation:)/.exec(source);
    if (motion) {
      addFinding(
        findings,
        relPath,
        lineOf(source, motion.index),
        "Layout owns motion; Layouts may only own geometry and responsive flow",
      );
    }
  }

  if (
    relPath.startsWith(`${varunRoot}/component/`) &&
    relPath.endsWith(".svelte")
  ) {
    const tierImport =
      /\$lib\/components\/varunui\/(?:piece|layout|page|email)\//.exec(source);
    if (tierImport) {
      addFinding(
        findings,
        relPath,
        lineOf(source, tierImport.index),
        "Component imports a higher compositional tier",
      );
    }
  }

  if (
    path.posix.dirname(relPath) === `${varunRoot}/canvas` &&
    relPath.endsWith(".svelte")
  ) {
    const requiredPatterns = [
      [
        /<CanvasFrame\b/,
        "Poster Canvas does not use the shared square CanvasFrame",
      ],
      [/<PosterMasthead\b/, "Poster Canvas does not use the shared masthead"],
      [
        /<PosterRegistration\b/,
        "Poster Canvas does not use the shared registration mark",
      ],
      [
        /\bsurface-pastel-art\b/,
        "Poster Canvas has no named pastel character stage",
      ],
    ];

    for (const [pattern, message] of requiredPatterns) {
      if (!pattern.test(source)) addFinding(findings, relPath, 1, message);
    }

    const exactOncePatterns = [
      [/<PosterMasthead\b/g, "Poster Canvas must contain exactly one masthead"],
      [
        /<PosterRegistration\b/g,
        "Poster Canvas must contain exactly one registration mark",
      ],
      [
        /\bsurface-pastel-art\b/g,
        "Poster Canvas must contain exactly one character art field",
      ],
    ];

    for (const [pattern, message] of exactOncePatterns) {
      if ((source.match(pattern) ?? []).length !== 1) {
        addFinding(findings, relPath, 1, message);
      }
    }

    const forbiddenPatterns = [
      [
        /\bimport\s+Marker\b/,
        "Poster Canvas bypasses the shared masthead Marker",
      ],
      [/\bbg-primary\b/, "Poster Canvas bypasses the shared registration mark"],
      [
        /\bborder\s+border-foreground\b/,
        "Poster Canvas adds a second outer rule; CanvasFrame owns it",
      ],
      [
        /\bformat\s*=/,
        "Poster Canvas reintroduces an aspect-ratio option; all posters are square",
      ],
    ];

    for (const [pattern, message] of forbiddenPatterns) {
      const match = pattern.exec(source);
      if (match) {
        addFinding(findings, relPath, lineOf(source, match.index), message);
      }
    }
  }

  if (
    path.posix.dirname(relPath) === `${varunRoot}/block` &&
    relPath.endsWith(".svelte") &&
    !(await composesPublicLayout(relPath))
  ) {
    addFinding(findings, relPath, 1, "Block does not compose a public Layout");
  }

  if (
    path.posix.dirname(relPath) === `${varunRoot}/email` &&
    relPath.endsWith(".svelte")
  ) {
    if (!(await composesPublicLayout(relPath))) {
      addFinding(
        findings,
        relPath,
        1,
        "Email does not compose a public Layout",
      );
    }

    const ownedState =
      /\$(?:state|derived|effect|bindable)\s*\(|\bonMount\s*\(/.exec(source);
    if (ownedState) {
      addFinding(
        findings,
        relPath,
        lineOf(source, ownedState.index),
        "Email owns runtime state; email output must remain static",
      );
    }

    const interactiveElement = /<(?:button|form|input|select|textarea)\b/.exec(
      source,
    );
    if (interactiveElement) {
      addFinding(
        findings,
        relPath,
        lineOf(source, interactiveElement.index),
        "Email contains an unsupported interactive element; use links and static content",
      );
    }
  }
}

const publicIndexPath = "src/lib/index.ts";
const publicIndex = await read(publicIndexPath);
const exportedTiers = [
  "component",
  "piece",
  "layout",
  "character",
  "email",
  "canvas",
];

for (const tier of exportedTiers) {
  const tierDir = path.join(root, varunRoot, tier);
  const entries = await readdir(tierDir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".svelte")) continue;
    const importPath = `./components/varunui/${tier}/${entry.name}`;
    if (!publicIndex.includes(importPath)) {
      addFinding(
        findings,
        publicIndexPath,
        1,
        `does not export public ${tier} ${entry.name}`,
      );
    }
  }
}

for (const relPath of files) {
  if (
    !relPath.startsWith("src/showcase/") &&
    !relPath.startsWith("src/routes/")
  ) {
    continue;
  }

  const source = await read(relPath);
  const privatePart =
    /\$lib\/components\/varunui\/internal\/(?:ui|primitive)\//.exec(source);
  if (privatePart) {
    addFinding(
      findings,
      relPath,
      lineOf(source, privatePart.index),
      "showcase or route imports a private implementation part; demonstrate the public system",
    );
  }
}

if (findings.length > 0) {
  console.error(
    `Architecture audit failed with ${findings.length} finding(s):`,
  );
  for (const finding of findings.slice(0, 200)) {
    console.error(`${finding.relPath}:${finding.line}: ${finding.message}`);
  }
  if (findings.length > 200) {
    console.error(`...and ${findings.length - 200} more`);
  }
  process.exit(1);
}

console.log("Architecture audit passed.");
