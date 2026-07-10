<script lang="ts" module>
  import type { Component } from "svelte";

  export interface FactListItem {
    label?: string;
    icon?: Component;
  }

  export interface FactListProps {
    items?: FactListItem[];
  }

  export const factListDemo: FactListProps = {
    items: [{ label: "Remote" }, { label: "Full-time" }, { label: "Priority" }],
  };
</script>

<script lang="ts">
  interface ResolvedFactListItem {
    label: string;
    icon?: Component;
  }

  function isFactItem(
    item: FactListItem | undefined,
  ): item is ResolvedFactListItem {
    return Boolean(item?.label);
  }

  let {
    items = [],
  }: FactListProps = $props();

  const facts = $derived(items.filter(isFactItem));
</script>

{#if facts.length > 0}
  <div class="flex flex-wrap items-center gap-x-[var(--layout-gap-md)] gap-y-[var(--layout-gap-sm)] text-sm text-muted-foreground">
    {#each facts as fact, index (`${fact.label}-${index}`)}
      {@const Icon = fact.icon}
      <span class="inline-flex items-center gap-1.5">
        {#if Icon}
          <Icon class="size-4 shrink-0" aria-hidden="true" />
        {/if}
        <span>{fact.label}</span>
      </span>
    {/each}
  </div>
{/if}
