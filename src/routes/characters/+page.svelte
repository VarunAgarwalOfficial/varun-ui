<script lang="ts">
  import Grid from "$lib/components/varunui/layout/grid.svelte";
  import CharacterSpriteCard from "$showcase/components/character-sprite-card.svelte";
  import CatalogPageShell from "$showcase/components/layout/catalog-page-shell.svelte";
  import { characterProfiles } from "$showcase/characters.js";

  const sprites = characterProfiles.flatMap((profile) => profile.sprites);
  const tones = ["yellow", "pink", "blue", "green", "purple", "red"] as const;
</script>

<svelte:head>
  <title>Characters - varunUI</title>
  <meta
    name="description"
    content="Reusable character profiles and expressive asset sets for varunUI."
  />
</svelte:head>

<CatalogPageShell
  title="Characters"
  count={sprites.length}
  description="The current storyteller cast for welcome, guidance, support, recovery, and completion. Every pose needs a page job and a named pastel field."
>
  <Grid columns={3} gap="md">
    {#each sprites as sprite, index (sprite.image)}
      <CharacterSpriteCard {...sprite} tone={tones[index % tones.length]} />
    {/each}
  </Grid>
</CatalogPageShell>
