#!/usr/bin/env node

import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { collectRegistryMetadata, root } from "./source.mjs";

const srcDir = path.join(root, "src");
const varunuiOutputDir = path.join(srcDir, "lib/components/varunui");
const registryOutputDir = path.join(root, "static/registry");
const packageJson = JSON.parse(
  await readFile(path.join(root, "package.json"), "utf8"),
);

const kindOrder = [
  "components",
  "pieces",
  "layouts",
  "blocks",
  "pages",
  "emails",
  "canvases",
];

const kindConfigs = {
  blocks: {
    outputDir: path.join(varunuiOutputDir, "block"),
    targetBase: "components/varunui/block",
    registryType: "registry:block",
    itemName: (name) => name,
    route: "blocks",
    componentPrefix: "Block",
    label: "Blocks",
  },
  pages: {
    outputDir: path.join(varunuiOutputDir, "page"),
    targetBase: "components/varunui/page",
    registryType: "registry:block",
    itemName: (name) => `page-${name}`,
    route: "pages",
    componentPrefix: "Page",
    label: "Pages",
  },
  emails: {
    outputDir: path.join(varunuiOutputDir, "email"),
    targetBase: "components/varunui/email",
    registryType: "registry:block",
    itemName: (name) => `email-${name}`,
    route: "emails",
    componentPrefix: "Email",
    label: "Emails",
  },
  canvases: {
    outputDir: path.join(varunuiOutputDir, "canvas"),
    targetBase: "components/varunui/canvas",
    registryType: "registry:block",
    itemName: (name) => `canvas-${name}`,
    route: "canvases",
    componentPrefix: "Canvas",
    label: "Canvases",
  },
  components: {
    outputDir: path.join(varunuiOutputDir, "component"),
    targetBase: "components/varunui/component",
    registryType: "registry:component",
    itemName: (name) => `component-${name}`,
    route: "components",
    componentPrefix: "Component",
    label: "Components",
  },
  layouts: {
    outputDir: path.join(varunuiOutputDir, "layout"),
    targetBase: "components/varunui/layout",
    registryType: "registry:component",
    itemName: (name) => `layout-${name}`,
    route: "layouts",
    componentPrefix: "Layout",
    label: "Layouts",
  },
  pieces: {
    outputDir: path.join(varunuiOutputDir, "piece"),
    targetBase: "components/varunui/piece",
    registryType: "registry:component",
    itemName: (name) => `piece-${name}`,
    route: "pieces",
    componentPrefix: "Piece",
    label: "Pieces",
  },
};

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function exportName(prefix, name) {
  return `${prefix}${name.replace(
    /(^|[^a-zA-Z0-9])([a-zA-Z0-9])/g,
    (_, _sep, char) => char.toUpperCase(),
  )}`;
}

function sortCatalogItems(a, b) {
  const kindCompare = kindOrder.indexOf(a.kind) - kindOrder.indexOf(b.kind);
  if (kindCompare !== 0) return kindCompare;
  const categoryCompare = a.category.localeCompare(b.category);
  if (categoryCompare !== 0) return categoryCompare;
  return a.title.localeCompare(b.title, undefined, { numeric: true });
}

function normalizePath(value) {
  return value.split(path.sep).join("/");
}

async function listSvelteFiles(dir, { topLevelOnly = false } = {}) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!topLevelOnly) files.push(...(await listSvelteFiles(fullPath)));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".svelte")) files.push(fullPath);
  }

  return files;
}

async function sourceFor(absPath) {
  return readFile(absPath, "utf8");
}

async function listPublicItems(kind) {
  const config = kindConfigs[kind];
  const files = await listSvelteFiles(config.outputDir, { topLevelOnly: true });
  const items = [];

  for (const file of files) {
    const name = path.basename(file, ".svelte");

    const source = await sourceFor(file);
    items.push({ kind, name, file, source });
  }

  items.sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { numeric: true }),
  );
  return items;
}

function tagsFor(kind, meta) {
  return [meta.category, ...meta.tags]
    .map((tag) => slugify(String(tag)))
    .filter(Boolean)
    .filter((tag) => tag !== kind.replace(/s$/, ""))
    .filter((tag, index, tags) => tags.indexOf(tag) === index)
    .slice(0, 6);
}

function metadataFor(metadata, kind, name) {
  const key = `${kind}:${name}`;
  const meta = metadata.get(key);

  if (!meta) {
    throw new Error(`Missing registry metadata for ${key}`);
  }

  return {
    ...meta,
    tags: tagsFor(kind, meta),
  };
}

function targetForAbsPath(absPath) {
  const rel = normalizePath(path.relative(path.join(srcDir, "lib"), absPath));
  return rel.replace(/^components\//, "components/");
}

function registryFileForAbsPath(absPath) {
  const rel = normalizePath(path.relative(srcDir, absPath));
  const type =
    rel.endsWith(".svelte") && rel.includes("/components/")
      ? "registry:component"
      : "registry:file";

  return {
    path: normalizePath(path.relative(root, absPath)),
    type,
    target: targetForAbsPath(absPath),
  };
}

function resolveLibImport(importPath) {
  const withoutQuery = importPath.split("?")[0];
  const asSource = withoutQuery
    .replace(/\.(js|ts)$/, ".ts")
    .replace(/^utils$/, "utils.ts");

  return path.join(srcDir, "lib", asSource);
}

function resolveRelativeImport(fromPath, importPath) {
  const withoutQuery = importPath.split("?")[0];
  const normalized = withoutQuery.replace(/\.(js|ts)$/, ".ts");
  const absolute = path.resolve(path.dirname(fromPath), normalized);

  if (path.extname(absolute)) return [absolute];

  return [
    absolute,
    `${absolute}.ts`,
    `${absolute}.svelte`,
    path.join(absolute, "index.ts"),
  ];
}

function localLibImports(source, fromPath) {
  const imports = [];
  const libImportPattern = /\$lib\/([^"']+)/g;
  const importPattern =
    /(?:import|export)\s+(?:type\s+)?(?:[^"']*?\s+from\s*)?["']([^"']+)["']/g;
  let match;

  while ((match = libImportPattern.exec(source))) {
    imports.push(resolveLibImport(match[1]));
  }

  while ((match = importPattern.exec(source))) {
    const importPath = match[1];
    if (importPath.startsWith(".")) {
      imports.push(...resolveRelativeImport(fromPath, importPath));
    }
  }

  return imports;
}

async function collectFileClosure(entryFile) {
  const seen = new Map();

  async function visit(absPath) {
    if (seen.has(absPath)) return;
    let source;
    try {
      source = await sourceFor(absPath);
    } catch {
      return;
    }
    seen.set(absPath, source);
    for (const dep of localLibImports(source, absPath)) {
      await visit(dep);
    }
  }

  await visit(entryFile);
  return seen;
}

function registryDependencyKindForImport(folder) {
  if (folder === "block") return "blocks";
  if (folder === "component") return "components";
  if (folder === "layout") return "layouts";
  if (folder === "piece") return "pieces";
  if (folder === "page") return "pages";
  if (folder === "email") return "emails";
  if (folder === "canvas") return "canvases";
  return "blocks";
}

function registryDependencyName(kind, name) {
  return kindConfigs[kind].itemName(name);
}

function scanRegistryDependencies(sources, item) {
  const deps = new Set();
  const self = registryDependencyName(item.kind, item.name);
  const varunuiImportPattern =
    /\$lib\/components\/varunui\/(block|component|layout|piece|page|email|canvas)\/([^"']+?)\.svelte/g;

  for (const source of sources) {
    let match;
    varunuiImportPattern.lastIndex = 0;
    while ((match = varunuiImportPattern.exec(source))) {
      if (match[2].startsWith("block-recipes/")) continue;

      const kind = registryDependencyKindForImport(match[1]);
      const name = path.basename(match[2], ".svelte");

      const dependency = registryDependencyName(kind, name);
      if (dependency !== self) deps.add(dependency);
    }
  }

  return [...deps].sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true }),
  );
}

function declaredRegistryDependencies(item, registryNames) {
  const deps = new Set();
  const self = registryDependencyName(item.kind, item.name);

  for (const dependency of item.meta.dependencies ?? []) {
    if (dependency === self) {
      throw new Error(`${self} cannot depend on itself`);
    }

    if (!registryNames.has(dependency)) {
      throw new Error(
        `${self} declares unknown registry dependency ${dependency}`,
      );
    }

    deps.add(dependency);
  }

  return deps;
}

function registryDependenciesFor(sources, item, registryNames) {
  return [
    ...new Set([
      ...scanRegistryDependencies(sources, item),
      ...declaredRegistryDependencies(item, registryNames),
    ]),
  ].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function scanDependencies(sources) {
  const packageNames = [
    "@internationalized/date",
    "bits-ui",
    "bwip-js",
    "clsx",
    "d3",
    "embla-carousel-svelte",
    "phosphor-svelte",
    "tailwind-merge",
    "tailwind-variants",
  ];
  const deps = new Set();

  for (const source of sources) {
    for (const packageName of packageNames) {
      if (
        source.includes(`"${packageName}`) ||
        source.includes(`'${packageName}`)
      ) {
        deps.add(packageName);
      }
    }
  }

  return [...deps].sort();
}

function sortObjectKeys(value) {
  if (Array.isArray(value)) return value.map(sortObjectKeys);
  if (!value || typeof value !== "object") return value;

  return Object.fromEntries(
    Object.entries(value)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, nested]) => [key, sortObjectKeys(nested)]),
  );
}

async function fileWithContent(file) {
  const content = await readFile(path.join(root, file.path), "utf8");
  const { path: _sourcePath, ...rest } = file;
  return { ...rest, content };
}

function registryIndexEntry(item) {
  const { files: _files, ...metadata } = item;
  return sortObjectKeys({
    ...metadata,
    relativeUrl: `${item.name}.json`,
  });
}

async function writeRegistry(items) {
  await mkdir(registryOutputDir, { recursive: true });
  const existingFiles = (
    await readdir(registryOutputDir, { withFileTypes: true })
  )
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map((entry) => path.join(registryOutputDir, entry.name));
  await Promise.all(existingFiles.map((file) => rm(file)));

  await writeFile(
    path.join(registryOutputDir, "index.json"),
    `${JSON.stringify(
      {
        name: packageJson.name,
        homepage: packageJson.homepage,
        items: items.map(registryIndexEntry),
      },
      null,
      2,
    )}\n`,
    "utf8",
  );

  await Promise.all(
    items.map(async (item) => {
      const files = await Promise.all((item.files ?? []).map(fileWithContent));
      await writeFile(
        path.join(registryOutputDir, `${item.name}.json`),
        `${JSON.stringify(sortObjectKeys({ ...item, files }), null, 2)}\n`,
        "utf8",
      );
    }),
  );
}

function buildCatalogModule(items) {
  const serializedItems = JSON.stringify(items);

  return `export type CatalogKind = "components" | "pieces" | "layouts" | "blocks" | "pages" | "emails" | "canvases";

export interface CatalogItem {
  id: string;
  name: string;
  kind: CatalogKind;
  kindLabel: string;
  route: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  registryName: string;
  uses: string[];
}

const catalogItemsJson = ${JSON.stringify(serializedItems)};

export const catalogItems = JSON.parse(catalogItemsJson) as CatalogItem[];

export const catalogKinds: CatalogKind[] = ["components", "pieces", "layouts", "blocks", "pages", "emails", "canvases"];

export function getCatalogItem(kind: CatalogKind, name: string) {
  return catalogItems.find((item) => item.kind === kind && item.name === name);
}
`;
}

async function buildRegistryItem(item, registryNames) {
  const config = kindConfigs[item.kind];
  const closure = await collectFileClosure(item.file);
  const sources = [...closure.values()];
  const registryDependencies = registryDependenciesFor(
    sources,
    item,
    registryNames,
  );
  const dependencies = scanDependencies(sources);
  const files = [...closure.keys()].map(registryFileForAbsPath);
  const meta = item.meta;

  return {
    name: config.itemName(item.name),
    type: config.registryType,
    title: meta.title,
    description: meta.description,
    tags: meta.tags,
    meta: {
      category: meta.category,
      tags: meta.tags,
    },
    dependencies,
    files,
    registryDependencies,
  };
}

async function main() {
  const metadata = await collectRegistryMetadata();
  const grouped = {};

  for (const kind of kindOrder) {
    const items = await listPublicItems(kind);
    grouped[kind] = items.map((item) => ({
      ...item,
      meta: metadataFor(metadata, kind, item.name),
    }));
  }

  const registryNames = new Set(
    kindOrder.flatMap((kind) =>
      grouped[kind].map((item) => kindConfigs[kind].itemName(item.name)),
    ),
  );

  for (const kind of kindOrder) {
    for (const item of grouped[kind]) {
      item.uses = registryDependenciesFor([item.source], item, registryNames);
    }
  }

  const catalogItems = kindOrder
    .flatMap((kind) => {
      const config = kindConfigs[kind];
      return grouped[kind].map((item) => ({
        id: config.itemName(item.name),
        name: item.name,
        kind,
        kindLabel: config.label,
        route: config.route,
        title: item.meta.title,
        description: item.meta.description,
        category: item.meta.category,
        tags: item.meta.tags,
        registryName: config.itemName(item.name),
        uses: item.uses,
      }));
    })
    .sort(sortCatalogItems);

  const registryItems = [];
  for (const kind of kindOrder) {
    for (const item of grouped[kind]) {
      registryItems.push(await buildRegistryItem(item, registryNames));
    }
  }

  await mkdir(path.join(srcDir, "showcase"), { recursive: true });
  await writeFile(
    path.join(srcDir, "showcase/catalog.generated.ts"),
    buildCatalogModule(catalogItems),
    "utf8",
  );
  await writeRegistry(registryItems);

  console.log(
    JSON.stringify(
      {
        handwritten: Object.fromEntries(
          kindOrder.map((kind) => [kind, grouped[kind].length]),
        ),
        registryItems: registryItems.length,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
