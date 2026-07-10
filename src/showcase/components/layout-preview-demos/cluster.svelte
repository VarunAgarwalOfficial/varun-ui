<script lang="ts">
  import Cluster from "$lib/components/varunui/layout/cluster.svelte";
</script>

<div class="mx-auto max-w-[var(--layout-content-sm)] px-[var(--layout-gutter)] py-[var(--layout-section-space-sm)]">
  <h2 class="mb-8 text-4xl font-semibold tracking-tight">A row that knows when to wrap.</h2>
  <Cluster>
    {#each ["Design", "Engineering", "Research", "Operations", "Support"] as label}
      <span class="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium">
        {label}
      </span>
    {/each}
  </Cluster>
</div>
