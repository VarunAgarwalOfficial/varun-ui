<script lang="ts" module>
  import type { Snippet } from "svelte";
  import type { StorySceneTone } from "$lib/components/varunui/piece/story-scene.svelte";

  export interface PastelFieldProps {
    tone: StorySceneTone;
    className?: string;
    children?: Snippet;
  }

  export const pastelFieldDemo: PastelFieldProps = {
    tone: "blue",
  };
</script>

<script lang="ts">
  let { tone, className, children }: PastelFieldProps = $props();
</script>

<div
  data-slot="pastel-field"
  data-tone={tone}
  class={`surface-pastel p-[var(--surface-padding-md)] ${className ?? ""}`}
>
  {@render children?.()}
</div>
