import { error } from "@sveltejs/kit";
import {
  getCatalogItem,
  type CatalogKind,
} from "$showcase/catalog.generated.js";
import type { PageLoad } from "./$types";

const previewKinds = [
  "blocks",
  "pages",
  "emails",
  "canvases",
  "layouts",
  "components",
  "pieces",
] as const;

function isPreviewKind(kind: string): kind is (typeof previewKinds)[number] {
  return previewKinds.includes(kind as (typeof previewKinds)[number]);
}

export const load: PageLoad = ({ params }) => {
  if (!isPreviewKind(params.kind)) {
    error(404, "Preview kind not found");
  }

  const kind = params.kind satisfies CatalogKind;

  if (!getCatalogItem(kind, params.name)) {
    error(404, "Preview item not found");
  }

  return {
    kind,
    name: params.name,
  };
};
