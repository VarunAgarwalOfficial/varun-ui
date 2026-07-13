<script lang="ts" module>
  import type { Snippet } from "svelte";

  export interface ReelProps {
    label: string;
    children?: Snippet;
  }

  export const reelDemo: ReelProps = {
    label: "Related items",
  };
</script>

<script lang="ts">
  let { label, children }: ReelProps = $props();
</script>

<div data-slot="reel" aria-label={label} class="reel">
  {@render children?.()}
</div>

<style>
  .reel {
    display: flex;
    gap: var(--layout-gap-md);
    max-width: 100%;
    overflow-x: auto;
    overscroll-behavior-inline: contain;
    padding-block-end: var(--layout-gap-sm);
    scroll-snap-type: inline mandatory;
    scrollbar-width: thin;
  }

  .reel > :global(*) {
    flex: 0 0 min(20rem, 85vw);
    min-width: 0;
    scroll-snap-align: start;
  }
</style>
