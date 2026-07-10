<script lang="ts" module>
  import type { Snippet } from "svelte";

  export type FrameRatio = "square" | "portrait" | "landscape" | "wide";

  export interface FrameProps {
    ratio?: FrameRatio;
    children?: Snippet;
  }

  export const frameDemo: FrameProps = {
    ratio: "landscape",
  };
</script>

<script lang="ts">
  let {
    ratio = "landscape",
    children,
  }: FrameProps = $props();

  const ratioClasses: Record<FrameRatio, string> = {
    square: "aspect-square",
    portrait: "aspect-[4/5]",
    landscape: "aspect-[4/3]",
    wide: "aspect-video",
  };
</script>

<div data-slot="frame" class={`relative overflow-hidden ${ratioClasses[ratio]}`}>
  {@render children?.()}
</div>
