import { error } from "@sveltejs/kit";
import { getCharacterProfile } from "$showcase/characters.js";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
  if (!getCharacterProfile(params.name)) {
    error(404, "Character not found");
  }

  return {
    name: params.name,
  };
};
