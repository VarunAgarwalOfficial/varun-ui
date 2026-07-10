<script lang="ts" module>
  import type { StorySceneTone } from "$lib/components/varunui/piece/story-scene.svelte";

  export interface CharacterSpriteCardProps {
    title: string;
    description: string;
    image: string;
    alt: string;
    label?: string;
    tone?: StorySceneTone;
  }
</script>

<script lang="ts">
  import Card from "$lib/components/varunui/component/card.svelte";
  import Badge from "$lib/components/varunui/component/badge.svelte";
  import StoryArt from "$lib/components/varunui/character/story-art.svelte";

  let {
    title,
    description,
    image,
    alt,
    label,
    tone = "blue",
  }: CharacterSpriteCardProps = $props();
</script>

<Card padding="none" className="overflow-hidden">
  <div data-tone={tone} class="surface-pastel surface-pastel-art">
    <StoryArt src={image} {alt} frame="square" />
  </div>

  <div class="border-t border-border p-4">
    <div class="flex items-start justify-between gap-3">
      <h2 class="text-lg font-semibold tracking-tight">{title}</h2>
      {#if label}
        <Badge variant="outline">{label}</Badge>
      {/if}
    </div>
    <p class="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
  </div>
</Card>
