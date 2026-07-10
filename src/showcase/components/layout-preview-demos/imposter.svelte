<script lang="ts">
  import Imposter from "$lib/components/varunui/layout/imposter.svelte";
</script>

<div class="relative min-h-80 overflow-hidden rounded-md bg-purple/15">
  <div class="absolute inset-5 border border-dashed border-purple/50"></div>
  <Imposter>
    <div class="w-64 rounded-md border bg-surface p-[var(--surface-padding-md)]">
      <p class="font-semibold">Centered overlay</p>
      <p class="mt-2 text-sm text-muted-foreground">The parent owns the containing block.</p>
    </div>
  </Imposter>
</div>
