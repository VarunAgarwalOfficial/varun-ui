<script lang="ts" module>
  import type { Component } from "svelte";

  export type NavMenuListArrow = "none" | "right" | "up-right";
  export type NavMenuListDensity = "compact" | "default";

  export interface NavMenuListItem {
    id?: string;
    label: string;
    description?: string;
    href?: string;
    icon?: Component;
    active?: boolean;
    disabled?: boolean;
  }

  export interface NavMenuListProps {
    heading?: string;
    items?: NavMenuListItem[];
    ariaLabel?: string;
    density?: NavMenuListDensity;
    arrow?: NavMenuListArrow;
    onItemSelect?: (item: NavMenuListItem, event: MouseEvent) => void;
  }

  export const navMenuListDemo: NavMenuListProps = {
    heading: "Products",
    items: [
      {
        label: "Blocks",
        description: "Copy-paste section templates",
        href: "/blocks",
      },
      {
        label: "Layouts",
        description: "Reusable page structure",
        href: "/layouts",
      },
      {
        label: "Components",
        description: "Ready-to-style primitives",
        href: "/components",
      },
    ],
    arrow: "up-right",
  };
</script>

<script lang="ts">
  import {
    ArrowRightIcon,
    ArrowUpRightIcon,
  } from "$lib/components/varunui/internal/icons/phosphor.js";

  let {
    heading,
    items = [],
    ariaLabel,
    density = "default",
    arrow = "right",
    onItemSelect,
  }: NavMenuListProps = $props();

  const densityClasses: Record<NavMenuListDensity, string> = {
    compact:
      "gap-1 p-2 [&_[data-slot=nav-menu-list-item]]:px-2 [&_[data-slot=nav-menu-list-item]]:py-1.5",
    default:
      "gap-1.5 p-3 [&_[data-slot=nav-menu-list-item]]:px-3 [&_[data-slot=nav-menu-list-item]]:py-2",
  };

  const descriptionClasses: Record<NavMenuListDensity, string> = {
    compact: "truncate text-xs",
    default: "line-clamp-2 text-sm leading-5",
  };

  function itemKey(item: NavMenuListItem, index: number) {
    return item.id ?? item.href ?? `${item.label}-${index}`;
  }

  function itemClass(item: NavMenuListItem) {
    const base =
      "group/nav-menu-list motion-colors flex w-full min-w-0 items-start gap-3 rounded-md text-left outline-none focus-visible:ring-3 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50";
    const tone = item.active
      ? "bg-muted text-foreground"
      : "text-foreground hover:bg-muted/70";
    const disabled = item.disabled ? "pointer-events-none opacity-50" : "";

    return `${base} ${tone} ${disabled}`;
  }

  function selectItem(item: NavMenuListItem, event: MouseEvent) {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    onItemSelect?.(item, event);
  }
</script>

{#snippet itemContent(item: NavMenuListItem)}
  {@const Icon = item.icon}
  {#if Icon}
    <span
      data-slot="nav-menu-list-icon"
      class="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground motion-colors group-hover/nav-menu-list:bg-primary group-hover/nav-menu-list:text-background"
    >
      <Icon class="size-4" aria-hidden="true" />
    </span>
  {/if}

  <span class="flex min-w-0 flex-1 flex-col">
    <span
      data-slot="nav-menu-list-label"
      class="text-sm font-semibold text-foreground"
    >
      <span
        class="link-underline motion-draw-left-trigger"
        class:motion-draw-left-active={Boolean(item.active)}
      >{item.label}</span>
    </span>
    {#if item.description}
      <span
        data-slot="nav-menu-list-description"
        class={`${descriptionClasses[density]} text-muted-foreground`}
      >
        {item.description}
      </span>
    {/if}
  </span>

  {#if arrow !== "none"}
    <span
      data-slot="nav-menu-list-arrow"
      class="mt-1 shrink-0 text-muted-foreground motion-colors group-hover/nav-menu-list:text-primary"
      aria-hidden="true"
    >
      {#if arrow === "up-right"}
        <ArrowUpRightIcon class="size-3.5 motion-transform motion-safe:group-hover/nav-menu-list:translate-x-0.5 motion-safe:group-hover/nav-menu-list:-translate-y-0.5" />
      {:else}
        <ArrowRightIcon class="size-3.5 motion-transform motion-safe:group-hover/nav-menu-list:translate-x-0.5" />
      {/if}
    </span>
  {/if}
{/snippet}

{#if heading || items.length > 0}
  <nav
    data-slot="nav-menu-list"
    aria-label={ariaLabel ?? heading}
    class={`flex min-w-0 flex-1 flex-col ${densityClasses[density]}`}
  >
    {#if heading}
      <h3
        data-slot="nav-menu-list-heading"
        class="px-2 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
      >
        {heading}
      </h3>
    {/if}

    {#if items.length > 0}
      <ul data-slot="nav-menu-list-items" class="grid gap-1">
        {#each items as item, index (itemKey(item, index))}
          <li>
            {#if item.href}
              <a
                href={item.href}
                aria-current={item.active ? "page" : undefined}
                aria-disabled={item.disabled || undefined}
                tabindex={item.disabled ? -1 : undefined}
                data-slot="nav-menu-list-item"
                class={itemClass(item)}
                onclick={(event) => selectItem(item, event)}
              >
                {@render itemContent(item)}
              </a>
            {:else}
              <button
                type="button"
                disabled={item.disabled}
                aria-current={item.active ? "page" : undefined}
                data-slot="nav-menu-list-item"
                class={itemClass(item)}
                onclick={(event) => selectItem(item, event)}
              >
                {@render itemContent(item)}
              </button>
            {/if}
          </li>
        {/each}
      </ul>
    {/if}
  </nav>
{/if}
