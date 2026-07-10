<script lang="ts" module>
  import type { Snippet } from "svelte";

  export type RailSide = "left" | "right";

  export interface RailProps {
    rail?: Snippet;
    children?: Snippet;
    side?: RailSide;
    sticky?: boolean;
  }

  export const railDemo: RailProps = {
    side: "left",
    sticky: true,
  };
</script>

<script lang="ts">
  let {
    rail,
    children,
    side = "left",
    sticky = true,
  }: RailProps = $props();

  const hasRail = $derived(Boolean(rail));
</script>

{#if hasRail}
  <div
    data-slot="rail"
    data-side={side}
    class="rail"
  >
    <aside data-slot="rail-aside" class:sticky>
      {@render rail?.()}
    </aside>
    <div data-slot="rail-content" class="min-w-0">
      {@render children?.()}
    </div>
  </div>
{:else}
  <div data-slot="rail-content" class="min-w-0">
    {@render children?.()}
  </div>
{/if}

<style>
  .rail {
    display: grid;
    gap: var(--layout-gap-lg);
    align-items: start;
    min-width: 0;
  }

  .rail[data-side="right"] [data-slot="rail-aside"] {
    order: 2;
  }

  @media (min-width: 72rem) {
    .rail {
      grid-template-columns: var(--layout-rail-md) minmax(0, 1fr);
      gap: var(--layout-gap-xl);
    }

    .rail[data-side="right"] {
      grid-template-columns: minmax(0, 1fr) var(--layout-rail-md);
    }

    [data-slot="rail-aside"].sticky {
      position: sticky;
      top: var(--layout-sticky-offset);
    }
  }
</style>
