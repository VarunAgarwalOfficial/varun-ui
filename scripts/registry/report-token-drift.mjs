#!/usr/bin/env node

import { existsSync } from "node:fs";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const strict = process.argv.includes("--strict");

const publicUiRoots = ["src/lib/components/varunui"];
const motionRoots = ["src/lib/components", "src/lib/styles", "src/routes"];
const numberedPrimitiveRoots = [
  "src/lib/components/varunui/component",
  "src/lib/components/varunui/layout",
  "src/lib/components/varunui/piece",
];
const tokenDefinitionFiles = new Set([
  "src/lib/styles/tokens.css",
  "src/lib/styles.css",
]);
const centralMotionFile = "src/lib/styles.css";
const skipDirectories = new Set([
  ".git",
  ".svelte-kit",
  ".vite",
  "build",
  "dist",
  "node_modules",
  "showcase",
]);
const uiExtensions = new Set([".css", ".svelte"]);
const legacyColorNames = [
  "secondary",
  "poppy",
  "sun",
  "mint",
  "sky",
  "iris",
  "berry",
];
const legacyColorAlternation = legacyColorNames.join("|");

const legacyColorPatterns = [
  {
    label: "legacy color custom property",
    pattern: new RegExp(
      `--(?:color-)?(?:${legacyColorAlternation})(?:-[a-z0-9-]+)?\\b`,
      "gi",
    ),
  },
  {
    label: "legacy color utility",
    pattern: new RegExp(
      `\\b(?:accent|bg|border|caret|divide|fill|from|outline|ring|shadow|stroke|text|to|via)-(?:${legacyColorAlternation})(?:-[a-z0-9-]+|\\/\\d+)?\\b`,
      "gi",
    ),
  },
  {
    label: "legacy color API value",
    pattern: new RegExp(
      `\\b(?:accent|color|theme|tone|variant)\\s*(?:=|:)\\s*["'](?:${legacyColorAlternation})["']`,
      "gi",
    ),
  },
  {
    label: "legacy color literal",
    pattern: new RegExp(`["'](?:${legacyColorAlternation})["']`, "gi"),
  },
];

function normalize(value) {
  return value.split(path.sep).join("/");
}

function lineOf(source, index) {
  return source.slice(0, index).split("\n").length;
}

function lineTextAt(source, index) {
  const start = source.lastIndexOf("\n", index - 1) + 1;
  const end = source.indexOf("\n", index);
  return source.slice(start, end === -1 ? source.length : end).trim();
}

function isAllowed(source, index, rule) {
  const line = lineTextAt(source, index);
  return (
    line.includes("token-drift-allow: all") ||
    line.includes(`token-drift-allow: ${rule}`)
  );
}

async function listFiles(entries, extensions) {
  const files = [];

  async function visit(current) {
    const currentStat = await stat(current);
    if (currentStat.isFile()) {
      if (extensions.has(path.extname(current))) {
        files.push(normalize(path.relative(root, current)));
      }
      return;
    }

    for (const entry of await readdir(current, { withFileTypes: true })) {
      if (entry.isDirectory() && skipDirectories.has(entry.name)) continue;

      const child = path.join(current, entry.name);
      if (entry.isDirectory()) {
        await visit(child);
      } else if (entry.isFile() && extensions.has(path.extname(entry.name))) {
        files.push(normalize(path.relative(root, child)));
      }
    }
  }

  for (const entry of entries) {
    const absolute = path.join(root, entry);
    if (existsSync(absolute)) await visit(absolute);
  }

  return [...new Set(files)].sort();
}

function addFinding(findings, category, file, source, index, detail) {
  findings.push({
    category,
    file,
    line: lineOf(source, index),
    detail,
  });
}

function collectLegacyColors(findings, file, source) {
  const candidates = [];

  for (const { label, pattern } of legacyColorPatterns) {
    pattern.lastIndex = 0;
    for (const match of source.matchAll(pattern)) {
      if (isAllowed(source, match.index, "legacy-color")) continue;
      candidates.push({
        index: match.index,
        end: match.index + match[0].length,
        label,
        value: match[0],
      });
    }
  }

  // A value such as variant="secondary" matches both the API and literal
  // checks. Prefer the larger, more useful finding instead of reporting twice.
  candidates.sort((a, b) => a.index - b.index || b.end - a.end);
  const accepted = [];
  for (const candidate of candidates) {
    const overlaps = accepted.some(
      ({ index, end }) => candidate.index < end && candidate.end > index,
    );
    if (overlaps) continue;
    accepted.push(candidate);
    addFinding(
      findings,
      "legacy color naming",
      file,
      source,
      candidate.index,
      `${candidate.label}: ${candidate.value}`,
    );
  }
}

function collectRawHex(findings, file, source) {
  if (tokenDefinitionFiles.has(file)) return;

  const hexPattern =
    /(^|[^a-z0-9_-])#([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})(?![a-z0-9_-])/gi;
  for (const match of source.matchAll(hexPattern)) {
    const value = `#${match[2]}`;
    const index = match.index + match[1].length;

    // Four-digit numeric references such as "Order #1234" are not color
    // literals. Four-digit CSS colors containing A-F are still reported.
    if (match[2].length === 4 && /^\d{4}$/.test(match[2])) continue;
    if (isAllowed(source, index, "raw-color")) continue;

    addFinding(
      findings,
      "raw color",
      file,
      source,
      index,
      `${value} should resolve through a named color or semantic token`,
    );
  }
}

function collectLocalKeyframes(findings, file, source) {
  if (file === centralMotionFile) return;

  for (const match of source.matchAll(/@keyframes\s+([a-z0-9_-]+)/gi)) {
    if (isAllowed(source, match.index, "local-keyframes")) continue;
    addFinding(
      findings,
      "local keyframes",
      file,
      source,
      match.index,
      `${match[1]} belongs in ${centralMotionFile}`,
    );
  }
}

function collectHardCodedControlSizes(findings, file, source) {
  const controlTagPattern =
    /<(?:Button|Input|SelectMenu|button|input|select|textarea)\b[\s\S]*?>/g;
  const rawUtilityPattern =
    /\b(?:h|max-h|min-h|size)-(?:8|9|10|11|12|14|16)\b|\b(?:h|max-h|min-h|size)-\[(?!var\(--control-height-)[^\]]+\]/g;
  const rawStylePattern =
    /\b(?:height|max-height|min-height)\s*:\s*(?!var\(--control-height-)(?:\d+(?:\.\d+)?(?:px|rem))/g;

  for (const tagMatch of source.matchAll(controlTagPattern)) {
    const tag = tagMatch[0];
    const patterns = [rawUtilityPattern, rawStylePattern];

    for (const pattern of patterns) {
      pattern.lastIndex = 0;
      for (const sizeMatch of tag.matchAll(pattern)) {
        const index = tagMatch.index + sizeMatch.index;
        if (isAllowed(source, index, "control-size")) continue;
        addFinding(
          findings,
          "hard-coded control size",
          file,
          source,
          index,
          `${sizeMatch[0]} bypasses the control size API/tokens`,
        );
      }
    }
  }
}

function collectHardCodedRailWidths(findings, file, source) {
  if (!file.startsWith("src/lib/components/varunui/layout/")) return;
  if (!/(?:\brail\b|sidebar)/i.test(source)) return;

  const patterns = [
    /\b(?:basis|max-w|min-w|w)-(?:56|72|88)\b/g,
    /\b(?:basis|max-w|min-w|w)-\[(?:14|18|22)rem\]/g,
    /\b(?:flex-basis|max-width|min-width|width)\s*:\s*(?:14|18|22)rem\b/g,
    /\b(?:flex-basis|max-width|min-width|width)\s*:\s*(?:224|288|352)px\b/g,
    /grid-template-columns\s*:[^;{}]*(?:14|18|22)rem\b/g,
  ];

  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) {
      if (isAllowed(source, match.index, "rail-width")) continue;
      addFinding(
        findings,
        "hard-coded rail width",
        file,
        source,
        match.index,
        `${match[0]} should use --layout-rail-{sm,md,lg}`,
      );
    }
  }
}

function collectDirectPastelSurfaces(findings, file, source) {
  const directPastelPattern =
    /\bbg-(?:red|pink|yellow|green|blue|purple)\/(?:5|10|15|20|25|30|40|50)\b/g;

  for (const match of source.matchAll(directPastelPattern)) {
    if (isAllowed(source, match.index, "direct-pastel-surface")) continue;
    addFinding(
      findings,
      "direct pastel surface",
      file,
      source,
      match.index,
      `${match[0]} bypasses the named surface-pastel tone contract`,
    );
  }
}

const publicUiFiles = await listFiles(publicUiRoots, uiExtensions);
const motionFiles = await listFiles(motionRoots, uiExtensions);
const numberedFiles = await listFiles(
  numberedPrimitiveRoots,
  new Set([".svelte"]),
);
const definitionFiles = [...tokenDefinitionFiles].filter((file) =>
  existsSync(path.join(root, file)),
);
const contentFiles = [
  ...new Set([...publicUiFiles, ...definitionFiles]),
].sort();
const findings = [];

for (const file of contentFiles) {
  const source = await readFile(path.join(root, file), "utf8");
  collectLegacyColors(findings, file, source);
  collectRawHex(findings, file, source);
  collectDirectPastelSurfaces(findings, file, source);
  collectHardCodedControlSizes(findings, file, source);
  collectHardCodedRailWidths(findings, file, source);
}

for (const file of motionFiles) {
  const source = await readFile(path.join(root, file), "utf8");
  collectLocalKeyframes(findings, file, source);
}

for (const file of numberedFiles) {
  if (!/\d/.test(path.basename(file, ".svelte"))) continue;
  findings.push({
    category: "numbered public primitive",
    file,
    line: 1,
    detail:
      "public Component, Layout, and Piece filenames must describe their job",
  });
}

const uniqueFindings = [
  ...new Map(
    findings.map((finding) => [
      `${finding.category}:${finding.file}:${finding.line}:${finding.detail}`,
      finding,
    ]),
  ).values(),
].sort(
  (a, b) =>
    a.category.localeCompare(b.category) ||
    a.file.localeCompare(b.file) ||
    a.line - b.line,
);

const totals = new Map();
for (const finding of uniqueFindings) {
  totals.set(finding.category, (totals.get(finding.category) ?? 0) + 1);
}

console.log("varunUI token drift report");
console.log(
  `Scanned ${publicUiFiles.length} public UI files and ${motionFiles.length} motion-bearing files.`,
);
console.log("");

for (const category of [
  "legacy color naming",
  "raw color",
  "direct pastel surface",
  "numbered public primitive",
  "local keyframes",
  "hard-coded control size",
  "hard-coded rail width",
]) {
  console.log(
    `${category.padEnd(29)} ${String(totals.get(category) ?? 0).padStart(4)}`,
  );
}

if (uniqueFindings.length === 0) {
  console.log("\nNo token drift found.");
} else {
  console.log("\nFindings:");
  for (const finding of uniqueFindings.slice(0, 240)) {
    console.log(
      `${finding.file}:${finding.line} [${finding.category}] ${finding.detail}`,
    );
  }
  if (uniqueFindings.length > 240) {
    console.log(`...and ${uniqueFindings.length - 240} more`);
  }
}

console.log(
  `\n${strict ? "Strict mode" : "Report-only mode"}. ` +
    "Use `token-drift-allow: <rule>` only for reviewed exceptions.",
);

if (strict && uniqueFindings.length > 0) process.exitCode = 1;
