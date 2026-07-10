<script lang="ts" module>
  import type { Component } from "svelte";

  export interface ActionListItem {
    label: string;
    href?: string;
    description?: string;
    meta?: string;
    badge?: string;
    icon?: Component;
    external?: boolean;
    onSelect?: () => void;
  }

  export interface ActionListProps {
    heading?: string;
    items?: ActionListItem[];
  }

  export const actionListDemo: ActionListProps = {
    heading: "Related links",
    items: [
      {
        label: "Implementation notes",
        href: "?",
        badge: "Guide",
        description: "Checklist for wiring this pattern into a product surface.",
      },
      {
        label: "Design review",
        href: "?",
        badge: "Video",
        meta: "12 min",
      },
      {
        label: "Example project",
        href: "?",
        badge: "Code",
      },
    ],
  };
</script>

<script lang="ts">
  import {
    ArrowUpRightIcon,
    ExternalLink,
  } from "$lib/components/varunui/internal/icons/phosphor.js";

  let {
    heading,
    items = [],
  }: ActionListProps = $props();

  const actionClass =
    "group/action-list flex w-full min-w-0 items-center justify-between gap-4 py-3 text-left motion-colors hover:text-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/50";
  const staticClass =
    "flex w-full min-w-0 items-center justify-between gap-4 py-3 text-left";

  function itemKey(item: ActionListItem, index: number) {
    return `${item.href ?? item.label}-${index}`;
  }
</script>

{#snippet RowContent(item: ActionListItem, interactive: boolean)}
  {@const Icon = item.icon}
  <span class="flex min-w-0 items-start gap-3">
    {#if Icon}
      <span
        class="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground motion-colors group-hover/action-list:bg-primary group-hover/action-list:text-background"
      >
        <Icon class="size-4" aria-hidden="true" />
      </span>
    {/if}
    <span class="min-w-0">
      <span class="block truncate text-sm font-medium text-foreground">{item.label}</span>
      {#if item.description}
        <span class="mt-0.5 block line-clamp-2 text-sm leading-5 text-muted-foreground">
          {item.description}
        </span>
      {/if}
    </span>
  </span>

  <span class="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
    {#if item.meta}
      <span>{item.meta}</span>
    {/if}
    {#if item.badge}
      <span class="rounded-sm border border-border px-2 py-0.5 font-medium">
        {item.badge}
      </span>
    {/if}
    {#if interactive}
      {#if item.external}
        <ExternalLink
          class="size-3.5 motion-transform motion-safe:group-hover/action-list:-translate-y-0.5 motion-safe:group-hover/action-list:translate-x-0.5"
          aria-hidden="true"
        />
      {:else}
        <ArrowUpRightIcon
          class="size-3.5 motion-transform motion-safe:group-hover/action-list:-translate-y-0.5 motion-safe:group-hover/action-list:translate-x-0.5"
          aria-hidden="true"
        />
      {/if}
    {/if}
  </span>
{/snippet}

{#if items.length > 0}
  <section data-slot="action-list" class="text-foreground">
    {#if heading}
      <h2 class="text-base font-semibold text-foreground">{heading}</h2>
    {/if}

    <ul class={`divide-y divide-border ${heading ? "mt-3" : ""}`}>
      {#each items as item, index (itemKey(item, index))}
        <li>
          {#if item.href}
            <a
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              class={actionClass}
            >
              {@render RowContent(item, true)}
            </a>
          {:else if item.onSelect}
            <button
              type="button"
              class={actionClass}
              onclick={item.onSelect}
            >
              {@render RowContent(item, true)}
            </button>
          {:else}
            <div class={staticClass}>
              {@render RowContent(item, false)}
            </div>
          {/if}
        </li>
      {/each}
    </ul>
  </section>
{/if}
