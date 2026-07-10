<script lang="ts">
  import Stack from "$lib/components/varunui/layout/stack.svelte";
</script>

<div class="mx-auto max-w-[var(--layout-content-sm)] px-[var(--layout-gutter)] py-[var(--layout-section-space-sm)]">
  <Stack gap="md">
    <p class="font-mono text-xs uppercase tracking-[var(--tracking-kicker)] text-primary">Vertical flow</p>
    <h2 class="text-4xl font-semibold tracking-tight">One rhythm, all the way down.</h2>
    <p class="max-w-xl text-base leading-7 text-muted-foreground">
      Copy, controls, and supporting information share a named gap instead of
      accumulating one-off margins.
    </p>
    <div class="rounded-none border border-border bg-surface p-6">First owned child</div>
    <div class="rounded-none border border-border bg-surface p-6">Second owned child</div>
  </Stack>
</div>
