<script lang="ts" module>
  export type PaginationNavTone = "primary" | "neutral";
  export type PaginationNavPage = number | "ellipsis";

  export interface PaginationNavProps {
    currentPage: number;
    pageCount: number;
    ariaLabel?: string;
    tone?: PaginationNavTone;
    siblingCount?: number;
    edgeCount?: number;
    previousLabel?: string;
    nextLabel?: string;
    pageLabel?: (page: number) => string;
    hrefForPage?: (page: number) => string | undefined;
    onPageChange?: (page: number, event: MouseEvent) => void;
  }

  export const paginationNavDemo: PaginationNavProps = {
    currentPage: 4,
    pageCount: 12,
    hrefForPage: () => "?",
  };
</script>

<script lang="ts">
  import {
    CaretLeftIcon,
    CaretRightIcon,
  } from "$lib/components/varunui/internal/icons/phosphor.js";

  let {
    currentPage,
    pageCount,
    ariaLabel = "Pagination",
    tone = "primary",
    siblingCount = 1,
    edgeCount = 1,
    previousLabel = "Previous page",
    nextLabel = "Next page",
    pageLabel = (page) => `Page ${page}`,
    hrefForPage,
    onPageChange,
  }: PaginationNavProps = $props();

  const pages = $derived(
    visiblePages(currentPage, pageCount, siblingCount, edgeCount),
  );

  function visiblePages(
    current: number,
    total: number,
    siblings: number,
    edges: number,
  ) {
    const visible = new Set<number>();

    for (let page = 1; page <= Math.min(edges, total); page += 1) {
      visible.add(page);
    }

    for (
      let page = Math.max(1, current - siblings);
      page <= Math.min(total, current + siblings);
      page += 1
    ) {
      visible.add(page);
    }

    for (let page = Math.max(1, total - edges + 1); page <= total; page += 1) {
      visible.add(page);
    }

    const sorted = [...visible].sort((first, second) => first - second);
    const nextPages: PaginationNavPage[] = [];

    for (const page of sorted) {
      const previous = nextPages[nextPages.length - 1];
      if (typeof previous === "number" && page - previous > 1) {
        nextPages.push("ellipsis");
      }
      nextPages.push(page);
    }

    return nextPages;
  }

  function pageClass(active: boolean) {
    const activeTone =
      tone === "primary"
        ? "border-primary bg-primary text-background"
        : "border-foreground bg-foreground text-background";
    const inactiveTone =
      "border-border bg-surface text-foreground hover:bg-muted";

    return `motion-colors flex size-8 items-center justify-center rounded-md border text-sm font-medium tabular-nums outline-none focus-visible:ring-3 focus-visible:ring-primary/50 ${active ? activeTone : inactiveTone}`;
  }

  function arrowClass() {
    return "motion-colors flex size-8 items-center justify-center rounded-md border border-border bg-surface text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-40";
  }

  function selectPage(page: number, event: MouseEvent) {
    onPageChange?.(page, event);
  }
</script>

{#snippet pageControl(
  page: number,
  label: string,
  direction: "previous" | "next",
)}
  {@const disabled = page < 1 || page > pageCount}
  {@const href = disabled ? undefined : hrefForPage?.(page)}
  {#if href}
    <a
      {href}
      aria-label={label}
      class={arrowClass()}
      onclick={(event) => selectPage(page, event)}
    >
      {#if direction === "previous"}
        <CaretLeftIcon class="size-3.5" aria-hidden="true" />
      {:else}
        <CaretRightIcon class="size-3.5" aria-hidden="true" />
      {/if}
    </a>
  {:else}
    <button
      type="button"
      aria-label={label}
      {disabled}
      class={arrowClass()}
      onclick={(event) => selectPage(page, event)}
    >
      {#if direction === "previous"}
        <CaretLeftIcon class="size-3.5" aria-hidden="true" />
      {:else}
        <CaretRightIcon class="size-3.5" aria-hidden="true" />
      {/if}
    </button>
  {/if}
{/snippet}

<nav
  data-slot="pagination-nav"
  aria-label={ariaLabel}
  class="inline-flex items-center gap-1"
>
  {@render pageControl(currentPage - 1, previousLabel, "previous")}

  {#each pages as page, index (typeof page === "number" ? page : `ellipsis-${index}`)}
    {#if page === "ellipsis"}
      <span
        class="flex size-8 items-center justify-center text-sm text-muted-foreground"
        aria-hidden="true"
      >
        ...
      </span>
    {:else}
      {@const active = page === currentPage}
      {@const href = hrefForPage?.(page)}
      {#if href && !active}
        <a
          {href}
          aria-label={pageLabel(page)}
          class={pageClass(active)}
          onclick={(event) => selectPage(page, event)}
        >
          {page}
        </a>
      {:else}
        <button
          type="button"
          aria-label={pageLabel(page)}
          aria-current={active ? "page" : undefined}
          class={pageClass(active)}
          onclick={(event) => selectPage(page, event)}
        >
          {page}
        </button>
      {/if}
    {/if}
  {/each}

  {@render pageControl(currentPage + 1, nextLabel, "next")}
</nav>
