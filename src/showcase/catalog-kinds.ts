import type { CatalogKind } from "$showcase/catalog.generated.js";

export interface CatalogKindDefinition {
  title: string;
  description: string;
  searchLabel: string;
  missingLabel: string;
}

export const catalogKindDefinitions = {
  components: {
    title: "Components",
    description:
      "Reusable UI contracts that own behavior, state, accessibility, motion, and display patterns.",
    searchLabel: "Search components",
    missingLabel: "Component",
  },
  pieces: {
    title: "Pieces",
    description:
      "Small, stateless content relationships that stay useful across product domains.",
    searchLabel: "Search pieces",
    missingLabel: "Piece",
  },
  layouts: {
    title: "Layouts",
    description:
      "Reusable geometry for section rhythm, split views, grids, rails, stacks, and product shells.",
    searchLabel: "Search layouts",
    missingLabel: "Layout",
  },
  blocks: {
    title: "Blocks",
    description:
      "Bounded page regions that perform one recognisable product or content job and compose cleanly into Pages.",
    searchLabel: "Search blocks",
    missingLabel: "Block",
  },
  pages: {
    title: "Pages",
    description:
      "Full, curated product flows composed from varunUI blocks, layouts, pieces, and components. Each page demonstrates one deliberate information order.",
    searchLabel: "Search pages",
    missingLabel: "Page",
  },
  emails: {
    title: "Emails",
    description:
      "Static 600px messages for lifecycle, security, collaboration, commerce, digests, and incidents. Production sending still requires CSS inlining and client testing.",
    searchLabel: "Search emails",
    missingLabel: "Email",
  },
  canvases: {
    title: "Canvases",
    description:
      "Ready-to-post 1:1 posters with strict content budgets, safe areas, named pastel fields, and varunUI characters.",
    searchLabel: "Search canvases",
    missingLabel: "Canvas",
  },
} satisfies Record<CatalogKind, CatalogKindDefinition>;

export const catalogKindOrder: CatalogKind[] = [
  "components",
  "pieces",
  "layouts",
  "blocks",
  "pages",
  "emails",
  "canvases",
];

export function isCatalogKind(value: string): value is CatalogKind {
  return value in catalogKindDefinitions;
}
