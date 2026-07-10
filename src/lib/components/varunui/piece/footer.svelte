<script lang="ts" module>
  import type { Snippet } from "svelte";

  export interface FooterProps {
    lead?: Snippet;
    navigation?: Snippet;
    metaStart?: Snippet;
    metaEnd?: Snippet;
  }
</script>

<script lang="ts">
  import Section from "$lib/components/varunui/layout/section.svelte";

  let { lead, navigation, metaStart, metaEnd }: FooterProps = $props();
  const hasTop = $derived(Boolean(lead || navigation));
  const hasMeta = $derived(Boolean(metaStart || metaEnd));
</script>

<Section
  as="footer"
  container="max"
  size="sm"
  className="border-t border-border bg-background text-foreground"
>
  <div data-slot="footer">
    {#if hasTop}
      <div class="grid gap-[var(--layout-gap-xl)] lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <div class="min-w-0">{@render lead?.()}</div>
        <div class="min-w-0">{@render navigation?.()}</div>
      </div>
    {/if}

    {#if hasMeta}
      <div
        class={[
          "flex flex-col justify-between gap-[var(--layout-gap-md)] border-t border-border pt-[var(--layout-gap-lg)] lg:flex-row lg:items-center",
          hasTop && "mt-[var(--layout-gap-xl)]",
        ]}
      >
        <div class="min-w-0">{@render metaStart?.()}</div>
        <div class="min-w-0">{@render metaEnd?.()}</div>
      </div>
    {/if}
  </div>
</Section>
