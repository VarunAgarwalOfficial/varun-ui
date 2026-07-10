<script lang="ts" module>
  export interface BreadcrumbNavItem {
    label: string;
    href?: string;
    current?: boolean;
  }

  export interface BreadcrumbNavProps {
    items: BreadcrumbNavItem[];
    ariaLabel?: string;
    homeHref?: string;
    homeLabel?: string;
  }

  export const breadcrumbNavDemo: BreadcrumbNavProps = {
    homeHref: "?",
    items: [
      { label: "Projects", href: "?" },
      { label: "varunUI", href: "?" },
      { label: "Settings", current: true },
    ],
  };
</script>

<script lang="ts">
  import { CaretRightIcon, HouseIcon } from "$lib/components/varunui/internal/icons/phosphor.js";

  let {
    items,
    ariaLabel = "Breadcrumb",
    homeHref,
    homeLabel = "Home",
  }: BreadcrumbNavProps = $props();

  function itemIsCurrent(item: BreadcrumbNavItem, index: number) {
    return item.current || index === items.length - 1;
  }

  function crumbClass(current: boolean) {
    return `motion-colors truncate rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-primary/50 ${
      current
        ? "font-semibold text-foreground"
        : "text-muted-foreground hover:text-foreground"
    }`;
  }
</script>

<nav data-slot="breadcrumb-nav" aria-label={ariaLabel}>
  <ol class="flex max-w-full items-center gap-1 text-sm">
    {#if homeHref}
      <li class="flex min-w-0 items-center gap-1">
        <a
          href={homeHref}
          aria-label={homeLabel}
          class="motion-colors rounded-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-primary/50"
        >
          <HouseIcon class="size-3.5" aria-hidden="true" />
        </a>
      </li>
      {#if items.length > 0}
        <li
          class="flex shrink-0 items-center text-muted-foreground/60"
          aria-hidden="true"
        >
          <CaretRightIcon class="size-3.5" />
        </li>
      {/if}
    {/if}

    {#each items as item, index (`${item.href ?? "current"}-${item.label}-${index}`)}
      {@const current = itemIsCurrent(item, index)}
      <li class="flex min-w-0 items-center gap-1">
        {#if item.href && !current}
          <a href={item.href} class={crumbClass(current)}>
            <span class="link-underline motion-draw-left-trigger">
              {item.label}
            </span>
          </a>
        {:else}
          <span
            class={crumbClass(current)}
            aria-current={current ? "page" : undefined}
          >
            {item.label}
          </span>
        {/if}
      </li>

      {#if index < items.length - 1}
        <li
          class="flex shrink-0 items-center text-muted-foreground/60"
          aria-hidden="true"
        >
          <CaretRightIcon class="size-3.5" />
        </li>
      {/if}
    {/each}
  </ol>
</nav>
