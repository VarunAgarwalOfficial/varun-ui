import type { Component } from "svelte";
import type { CatalogKind } from "$showcase/catalog.generated.js";

export type PreviewKind = CatalogKind;

export type PreviewModule = {
  default: Component;
  [key: string]: unknown;
};

type ModuleLoader = () => Promise<unknown>;
type ModuleCollection = Record<string, ModuleLoader>;

const componentModules = import.meta.glob(
  "/src/lib/components/varunui/component/*.svelte",
) as Record<string, ModuleLoader>;
const blockModules = import.meta.glob(
  "/src/lib/components/varunui/block/*.svelte",
) as Record<string, ModuleLoader>;
const pageModules = import.meta.glob(
  "/src/lib/components/varunui/page/*.svelte",
) as Record<string, ModuleLoader>;
const emailModules = import.meta.glob(
  "/src/lib/components/varunui/email/*.svelte",
) as Record<string, ModuleLoader>;
const layoutModules = import.meta.glob(
  "/src/lib/components/varunui/layout/*.svelte",
) as Record<string, ModuleLoader>;
const pieceModules = import.meta.glob(
  "/src/lib/components/varunui/piece/*.svelte",
) as Record<string, ModuleLoader>;
const canvasModules = import.meta.glob(
  "/src/lib/components/varunui/canvas/*.svelte",
) as Record<string, ModuleLoader>;

const modules: Record<PreviewKind, ModuleCollection> = {
  blocks: indexModulesByName(blockModules),
  pages: indexModulesByName(pageModules),
  emails: indexModulesByName(emailModules),
  components: indexModulesByName(componentModules),
  layouts: indexModulesByName(layoutModules),
  pieces: indexModulesByName(pieceModules),
  canvases: indexModulesByName(canvasModules),
};

function moduleName(modulePath: string) {
  return modulePath
    .split("/")
    .pop()
    ?.replace(/\.svelte$/, "");
}

function indexModulesByName(collection: ModuleCollection) {
  return Object.fromEntries(
    Object.entries(collection).flatMap(([path, loader]) => {
      const name = moduleName(path);
      return name ? [[name, loader]] : [];
    }),
  ) as ModuleCollection;
}

export function demoExportName(componentName: string) {
  return `${componentName.replace(/-([a-z0-9])/g, (_, char) => char.toUpperCase())}Demo`;
}

export async function loadPreviewModule(kind: CatalogKind, name: string) {
  const loader = modules[kind][name];

  if (loader) return (await loader()) as PreviewModule;

  throw new Error(`No preview module found for ${kind}/${name}.`);
}

export function previewPropsFor(module: PreviewModule, name: string) {
  return (
    (module[demoExportName(name)] as Record<string, unknown> | undefined) ??
    (module[`${name}Demo`] as Record<string, unknown> | undefined) ??
    {}
  );
}
