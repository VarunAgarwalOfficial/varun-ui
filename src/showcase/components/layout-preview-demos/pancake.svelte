<script lang="ts">
  import Pancake from "$lib/components/varunui/layout/pancake.svelte";
</script>

<div class="h-96 overflow-hidden rounded-md border">
  <Pancake height="fill">
    {#snippet header()}
      <div class="border-b bg-yellow/20 p-[var(--surface-padding-sm)] font-medium">Header</div>
    {/snippet}
    <div class="grid h-full place-items-center bg-background text-muted-foreground">Flexible main</div>
    {#snippet footer()}
      <div class="border-t bg-pink/20 p-[var(--surface-padding-sm)] font-medium">Footer</div>
    {/snippet}
  </Pancake>
</div>
