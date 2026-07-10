<script lang="ts" module>
  import type { StorySceneTone } from "$lib/components/varunui/piece/story-scene.svelte";

  export interface EmailStoryProps {
    src: string;
    alt: string;
    tone: StorySceneTone;
  }
</script>

<script lang="ts">
  let { src, alt, tone }: EmailStoryProps = $props();
</script>

<figure
  data-slot="email-story"
  data-tone={tone}
  class="surface-pastel surface-pastel-art grid h-56 place-items-center overflow-hidden border border-[var(--email-border)]"
>
  <img
    data-story-art
    {src}
    {alt}
    class="size-full object-contain p-[var(--surface-padding-md)]"
  />
</figure>
