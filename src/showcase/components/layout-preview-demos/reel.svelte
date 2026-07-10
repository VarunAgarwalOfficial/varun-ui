<script lang="ts">
  import Reel from "$lib/components/varunui/layout/reel.svelte";
</script>

<div class="py-[var(--layout-section-space-sm)]">
  <div class="mb-8 px-[var(--layout-gutter)]">
    <p class="font-mono text-xs uppercase tracking-[var(--tracking-kicker)] text-primary">Horizontal flow</p>
    <h2 class="mt-3 text-4xl font-semibold tracking-tight">More to explore, not more to squeeze.</h2>
  </div>
  <Reel label="Related stories">
    {#each ["A considered start", "The useful middle", "A proper ending", "One more thing"] as title, index}
      <article class="min-h-64 rounded-none border border-border bg-surface p-6">
        <span class="font-mono text-xs text-primary">0{index + 1}</span>
        <h3 class="mt-28 text-2xl font-semibold">{title}</h3>
      </article>
    {/each}
  </Reel>
</div>
