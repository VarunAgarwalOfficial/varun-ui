<script lang="ts" module>
  import peepStanding23Asset from "$lib/assets/characters/varunui/peep-standing-23.svg";
  import type { Snippet } from "svelte";
  import type { StoryArtFrame } from "$lib/components/varunui/character/story-art.svelte";

  export type StorySceneTone =
    | "red"
    | "pink"
    | "yellow"
    | "green"
    | "blue"
    | "purple";
  export type StorySceneSize = "compact" | "default";

  export interface StorySceneProps {
    src: string;
    alt: string;
    tone?: StorySceneTone;
    frame?: StoryArtFrame;
    size?: StorySceneSize;
    overlay?: Snippet;
  }

  export const storySceneDemo: StorySceneProps = {
    src: peepStanding23Asset,
    alt: "A person waving hello",
    tone: "yellow",
  };
</script>

<script lang="ts">
  import StoryArt from "$lib/components/varunui/character/story-art.svelte";
  let {
    src,
    alt,
    tone = "yellow",
    frame = "auto",
    size = "default",
    overlay,
  }: StorySceneProps = $props();

  const sizeClasses: Record<StorySceneSize, string> = {
    compact: "min-h-48 md:min-h-56",
    default: "min-h-[var(--layout-media-sm)] md:min-h-[var(--layout-media-md)]",
  };

</script>

<figure
  data-slot="story-scene"
  data-tone={tone}
  class={`surface-pastel surface-pastel-art relative grid h-full w-full place-items-center overflow-hidden border border-border ${sizeClasses[size]}`}
>
  <StoryArt {src} {alt} {frame} />
  {#if overlay}
    <div class="absolute right-3 top-3 border border-border bg-background p-1">
      {@render overlay()}
    </div>
  {/if}
</figure>
