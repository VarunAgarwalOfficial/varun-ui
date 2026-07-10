<script lang="ts">
  import type { Snippet } from "svelte";
  import Grid from "$lib/components/varunui/layout/grid.svelte";
  import EmptyState from "$lib/components/varunui/piece/empty-state.svelte";

  let {
    hasItems,
    emptyLabel = "No items found.",
    emptyDescription,
    children,
  }: {
    hasItems: boolean;
    emptyLabel?: string;
    emptyDescription?: string;
    children?: Snippet;
  } = $props();
</script>

{#if hasItems}
  <Grid columns={3} gap="md">
    {@render children?.()}
  </Grid>
{:else}
  <EmptyState title={emptyLabel} description={emptyDescription} />
{/if}
