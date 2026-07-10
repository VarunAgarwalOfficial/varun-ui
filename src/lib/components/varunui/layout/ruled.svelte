<script lang="ts" module>
  import type { Snippet } from "svelte";

  export type RuledColumns = "one" | "three";

  export interface RuledProps {
    columns?: RuledColumns;
    lead?: Snippet;
    aside?: Snippet;
    children?: Snippet;
  }

  export const ruledDemo: RuledProps = {
    columns: "three",
  };
</script>

<script lang="ts">
  let { columns = "one", lead, aside, children }: RuledProps = $props();
</script>

<div data-slot="ruled" class="border-t border-border pt-[var(--layout-gap-lg)]">
  {#if lead || aside}
    <div class="grid gap-[var(--layout-gap-md)] lg:grid-cols-[minmax(0,1fr)_minmax(20rem,28rem)] lg:gap-[var(--layout-gap-xl)]">
      <div>{@render lead?.()}</div>
      <div>{@render aside?.()}</div>
    </div>
  {/if}

  {#if children}
    <div
      class:md:grid-cols-3={columns === "three"}
      class="mt-[var(--layout-gap-xl)] grid gap-[var(--layout-gap-md)]"
    >
      {@render children()}
    </div>
  {/if}
</div>
