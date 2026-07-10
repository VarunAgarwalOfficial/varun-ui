<script lang="ts" module>
  import type { Snippet } from "svelte";

  export type CardPadding = "none" | "md";

  export interface CardProps {
    href?: string;
    interactive?: boolean;
    selected?: boolean;
    padding?: CardPadding;
    className?: string;
    children?: Snippet;
  }
</script>

<script lang="ts">
  import { cn } from "$lib/utils.js";

  let {
    href,
    interactive = Boolean(href),
    selected = false,
    padding = "md",
    className,
    children,
  }: CardProps = $props();

  const paddingClasses: Record<CardPadding, string> = {
    none: "",
    md: "p-6",
  };

  const classes = $derived(
    cn(
      "rounded-none border border-border bg-surface text-foreground",
      paddingClasses[padding],
      selected && "border-foreground",
      interactive &&
        "motion-interactive hover:border-primary/50 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/50",
      className,
    ),
  );
</script>

{#if href}
  <a {href} data-slot="card" data-selected={selected || undefined} class={classes}>
    {@render children?.()}
  </a>
{:else}
  <article data-slot="card" data-selected={selected || undefined} class={classes}>
    {@render children?.()}
  </article>
{/if}
