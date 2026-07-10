import { error } from "@sveltejs/kit";
import { getCatalogItem } from "$showcase/catalog.generated.js";
import {
  catalogKindDefinitions,
  isCatalogKind,
} from "$showcase/catalog-kinds.js";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
  if (!isCatalogKind(params.kind)) error(404, "Catalog not found");
  if (!getCatalogItem(params.kind, params.name)) {
    error(404, `${catalogKindDefinitions[params.kind].missingLabel} not found`);
  }

  return {
    kind: params.kind,
    name: params.name,
  };
};
