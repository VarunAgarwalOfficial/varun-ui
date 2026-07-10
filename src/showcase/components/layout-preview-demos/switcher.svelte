<script lang="ts">
  import Switcher from "$lib/components/varunui/layout/switcher.svelte";
</script>

<div class="mx-auto max-w-[var(--layout-content-md)] px-[var(--layout-gutter)] py-[var(--layout-section-space-sm)]">
  <Switcher threshold="md" limit={3}>
    {#each [
      ["01", "Useful side by side"],
      ["02", "Useful as a stack"],
      ["03", "No awkward middle"],
    ] as item}
      <article class="min-h-52 rounded-none border border-border bg-surface p-6">
        <span class="font-mono text-xs text-primary">{item[0]}</span>
        <h3 class="mt-12 text-2xl font-semibold">{item[1]}</h3>
      </article>
    {/each}
  </Switcher>
</div>
