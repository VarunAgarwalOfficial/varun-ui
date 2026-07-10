<script lang="ts" module>
  import type { Snippet } from "svelte";

  export interface BentoProps {
    featured?: Snippet;
    children?: Snippet;
  }

  export const bentoDemo: BentoProps = {};
</script>

<script lang="ts">
  let { featured, children }: BentoProps = $props();

  const hasFeatured = $derived(Boolean(featured));
  const gridClass = $derived(
    hasFeatured
      ? "grid items-stretch gap-[var(--layout-gap-md)] lg:grid-cols-[minmax(0,1.6fr)_minmax(var(--layout-rail-md),0.9fr)]"
      : "grid gap-[var(--layout-gap-md)] md:grid-cols-2 lg:grid-cols-3",
  );
  const supportClass = $derived(
    hasFeatured
      ? "grid min-w-0 auto-rows-fr gap-[var(--layout-gap-md)]"
      : "contents",
  );
</script>

<div class={gridClass}>
  {#if featured}
    <div data-slot="bento-featured" class="min-h-72 min-w-0">
      {@render featured()}
    </div>
  {/if}

  <div data-slot="bento-support" class={supportClass}>
    {@render children?.()}
  </div>
</div>
