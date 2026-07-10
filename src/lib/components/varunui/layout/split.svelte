<script lang="ts" module>
  import type { Snippet } from "svelte";

  export type SplitMediaSide = "left" | "right";
  export type SplitAlign = "start" | "center" | "end";
  export type SplitGap = "sm" | "md" | "lg";

  export interface SplitProps {
    mediaSide?: SplitMediaSide;
    align?: SplitAlign;
    gap?: SplitGap;
    media?: Snippet;
    children?: Snippet;
  }

  export const splitDemo: SplitProps = {
    mediaSide: "right",
    align: "center",
    gap: "lg",
  };
</script>

<script lang="ts">
  let {
    mediaSide = "left",
    align = "center",
    gap = "lg",
    media,
    children,
  }: SplitProps = $props();

  const alignClasses: Record<SplitAlign, string> = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
  };

  const gapClasses: Record<SplitGap, string> = {
    sm: "gap-[var(--layout-gap-sm)] lg:gap-[var(--layout-gap-md)]",
    md: "gap-[var(--layout-gap-md)] lg:gap-[var(--layout-gap-lg)]",
    lg: "gap-[var(--layout-gap-lg)] lg:gap-[var(--layout-gap-xl)]",
  };

  const hasMedia = $derived(Boolean(media));
</script>

<div
  data-slot="split"
  class={`grid ${gapClasses[gap]} ${alignClasses[align]} ${hasMedia ? "lg:grid-cols-2" : ""}`}
>
  {#if hasMedia}
    <div
      data-slot="split-media"
      class={`min-w-0 ${mediaSide === "right" ? "order-2" : ""}`}
    >
      {@render media?.()}
    </div>
  {/if}

  <div
    data-slot="split-content"
    class={`min-w-0 ${mediaSide === "right" ? "order-1" : ""}`}
  >
    {@render children?.()}
  </div>
</div>
