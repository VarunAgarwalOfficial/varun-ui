import { error } from "@sveltejs/kit";
import {
  catalogKindDefinitions,
  isCatalogKind,
} from "$showcase/catalog-kinds.js";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
  if (!isCatalogKind(params.kind)) error(404, "Catalog not found");

  return {
    kind: params.kind,
    ...catalogKindDefinitions[params.kind],
  };
};
