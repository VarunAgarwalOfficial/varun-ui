<script lang="ts">
  import Card from "$lib/components/varunui/component/card.svelte";
  import Link from "$lib/components/varunui/component/link.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
</script>

<Card className="w-full max-w-sm">
  <Stack gap="sm">
    <p class="text-xs font-semibold uppercase tracking-[var(--tracking-kicker)] text-muted-foreground">
      Project
    </p>
    <div>
      <h3 class="text-lg font-semibold text-foreground">Catalog refresh</h3>
      <p class="mt-1 text-sm leading-6 text-muted-foreground">
        Bring the product examples back to the shared system.
      </p>
    </div>
    <Link href="?" label="Open project" />
  </Stack>
</Card>
