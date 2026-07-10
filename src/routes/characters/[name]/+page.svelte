<script lang="ts">
  import { Grid, Section, SectionHeader, Stack } from "$lib";
  import DetailToolbar from "$showcase/components/layout/detail-toolbar.svelte";
  import CharacterSpriteCard from "$showcase/components/character-sprite-card.svelte";
  import { getCharacterProfile } from "$showcase/characters.js";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  const character = $derived(getCharacterProfile(data.name));
  const sprites = $derived(character?.sprites ?? []);
  const tones = ["yellow", "pink", "blue", "green", "purple", "red"] as const;
  const pageTitle = $derived(
    character ? `${character.name} - varunUI` : "Character - varunUI",
  );
  const pageDescription = $derived(
    character
      ? `${character.name} character sprites for varunUI.`
      : "Character sprites for varunUI.",
  );
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={pageDescription} />
</svelte:head>

{#if character}
  <DetailToolbar
    parentHref="/characters"
    parentLabel="Characters"
    label={character.name}
  />

  <main>
    <Section container="lg" size="sm">
      <Stack gap="lg">
        <SectionHeader
          kicker={character.role}
          markerTone="pink"
          title={character.name}
          description={character.description}
          align="left"
          size="lg"
          level={1}
        />

        <Grid columns={3} gap="md">
          {#each sprites as sprite, index (sprite.image)}
            <CharacterSpriteCard {...sprite} tone={tones[index % tones.length]} />
          {/each}
        </Grid>
      </Stack>
    </Section>
  </main>
{/if}
