<script lang="ts" module>
  import type { Component, Snippet } from "svelte";

  export type EmptyStateSize = "compact" | "default";

  export interface EmptyStateProps {
    icon?: Component;
    title: string;
    description?: string;
    size?: EmptyStateSize;
    children?: Snippet;
  }

  export const emptyStateDemo: EmptyStateProps = {
    title: "Nothing here yet",
    description: "Create the first item when you are ready.",
  };
</script>

<script lang="ts">
  import { Search as SearchIcon } from "$lib/components/varunui/internal/icons/phosphor.js";

  let {
    icon = SearchIcon,
    title,
    description,
    size = "default",
    children,
  }: EmptyStateProps = $props();

  const Icon = $derived(icon);
</script>

<div
  data-slot="empty-state"
  data-tone="yellow"
  class={`surface-pastel flex min-h-56 flex-col items-center justify-center border-y border-border text-center ${size === "compact" ? "px-[var(--surface-padding-md)] py-[var(--surface-padding-lg)]" : "px-[var(--surface-padding-lg)] py-[var(--layout-section-space-sm)]"}`}
>
  <span class="inline-flex size-10 items-center justify-center border border-border bg-background text-foreground">
    <Icon class="size-5" aria-hidden="true" />
  </span>
  <h3 class="mt-3 text-sm font-medium text-foreground">{title}</h3>
  {#if description}
    <p class="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground">
      {description}
    </p>
  {/if}
  {@render children?.()}
</div>
