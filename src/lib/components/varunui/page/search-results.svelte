<script lang="ts" module>
  export interface SearchResultItem {
    category: "guide" | "reference" | "update";
    label: string;
    description: string;
    meta: string;
    href: string;
  }

  export interface SearchResultsProps {
    heading?: string;
    description?: string;
    initialQuery?: string;
    results?: SearchResultItem[];
  }

  const defaultResults: SearchResultItem[] = [
    {
      category: "guide",
      label: "Choose workspace roles and permissions",
      description: "A practical role map for owners, admins, editors, commenters, and guests.",
      meta: "6 min read",
      href: "?",
    },
    {
      category: "reference",
      label: "Permissions reference",
      description: "The exact actions available to each workspace and project role.",
      meta: "Reference",
      href: "?",
    },
    {
      category: "guide",
      label: "Invite a guest to one project",
      description: "Use guest permissions to share one project without opening the rest of the workspace.",
      meta: "3 min read",
      href: "?",
    },
    {
      category: "update",
      label: "July update: clearer guest permissions",
      description: "What changed in the role picker and how existing guests are affected.",
      meta: "2 July 2026",
      href: "?",
    },
    {
      category: "reference",
      label: "Single sign-on permissions and policy settings",
      description: "Require SSO, preserve a recovery owner, and test policy changes safely.",
      meta: "Reference",
      href: "?",
    },
    {
      category: "guide",
      label: "Review access before a project closes",
      description: "A short permissions audit for removing guests and preserving project history.",
      meta: "5 min read",
      href: "?",
    },
  ];

  export const searchResultsDemo: SearchResultsProps = {
    heading: "Search varunUI.",
    description:
      "Find guides, exact reference pages, and product updates without leaving the current workspace context.",
    initialQuery: "permissions",
    results: defaultResults,
  };
</script>

<script lang="ts">
  import { untrack } from "svelte";
  import ActionList from "$lib/components/varunui/component/action-list.svelte";
  import CategoryFilter from "$lib/components/varunui/component/category-filter.svelte";
  import PaginationNav from "$lib/components/varunui/component/pagination-nav.svelte";
  import SearchField from "$lib/components/varunui/component/search-field.svelte";
  import SegmentedControl from "$lib/components/varunui/component/segmented-control.svelte";
  import Rail from "$lib/components/varunui/layout/rail.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import EmptyState from "$lib/components/varunui/piece/empty-state.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let {
    heading = "Search varunUI.",
    description = "Find guides, exact reference pages, and product updates without leaving the current workspace context.",
    initialQuery = "permissions",
    results = defaultResults,
  }: SearchResultsProps = $props();

  let query = $state(untrack(() => initialQuery));
  let category = $state("all");
  let sort = $state("relevance");
  let currentPage = $state(1);
  const pageSize = 3;

  const visibleResults = $derived.by(() => {
    const needle = query.trim().toLowerCase();
    const filtered = results.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      const haystack = `${item.label} ${item.description}`.toLowerCase();
      return matchesCategory && haystack.includes(needle);
    });

    return sort === "newest" ? [...filtered].reverse() : filtered;
  });
  const pageCount = $derived(
    Math.max(1, Math.ceil(visibleResults.length / pageSize)),
  );
  const pageResults = $derived(
    visibleResults.slice((currentPage - 1) * pageSize, currentPage * pageSize),
  );

  $effect(() => {
    if (currentPage > pageCount) currentPage = 1;
  });

  function choosePage(page: number, event: MouseEvent) {
    event.preventDefault();
    currentPage = page;
  }
</script>

<Section container="lg" size="md">
  <Stack gap="xl">
    <SectionHeader
      kicker="Search"
      markerTone="purple"
      title={heading}
      {description}
      align="left"
      size="lg"
      level={1}
    />

    <div class="max-w-[var(--layout-content-sm)]">
      <SearchField
        bind:value={query}
        label="Search varunUI"
        showLabel
        placeholder="Search guides, settings, and updates"
        size="lg"
      />
    </div>

    <Rail>
      {#snippet rail()}
        <div class="border-y border-border py-[var(--surface-padding-sm)]">
          <CategoryFilter
            bind:active={category}
            label="Result type"
            orientation="responsive"
            categories={[
              { label: "Everything", value: "all" },
              { label: "Guides", value: "guide" },
              { label: "Reference", value: "reference" },
              { label: "Updates", value: "update" },
            ]}
          />
        </div>
      {/snippet}

      <Stack gap="md">
        <div class="flex flex-wrap items-end justify-between gap-[var(--layout-gap-md)] border-b border-border pb-[var(--layout-gap-md)]">
          <div>
            <h2 class="text-2xl font-semibold tracking-tight">
              {visibleResults.length} {visibleResults.length === 1 ? "result" : "results"}
            </h2>
            <p class="mt-[var(--layout-gap-sm)] text-sm leading-6 text-muted-foreground">
              {query ? `For “${query}”` : "Browse the complete varunUI library"}
            </p>
          </div>
          <SegmentedControl
            bind:value={sort}
            label="Sort results"
            items={[
              { label: "Best match", value: "relevance" },
              { label: "Newest", value: "newest" },
            ]}
          />
        </div>

        {#if visibleResults.length > 0}
          <ActionList
            items={pageResults.map((item) => ({
              label: item.label,
              description: item.description,
              meta: item.meta,
              badge:
                item.category === "guide"
                  ? "Guide"
                  : item.category === "reference"
                    ? "Reference"
                    : "Update",
              href: item.href,
            }))}
          />

          {#if pageCount > 1}
            <div class="pt-[var(--layout-gap-sm)]">
              <PaginationNav
                {currentPage}
                {pageCount}
                onPageChange={choosePage}
                ariaLabel="Search result pages"
              />
            </div>
          {/if}
        {:else}
          <EmptyState
            title="No result matched this search"
            description="Try a shorter phrase or choose Everything to search every result type."
          />
        {/if}
      </Stack>
    </Rail>
  </Stack>
</Section>
