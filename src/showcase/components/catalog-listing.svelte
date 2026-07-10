<script lang="ts">
  import CatalogGrid from "$showcase/components/catalog-grid.svelte";
  import CatalogPageShell from "$showcase/components/layout/catalog-page-shell.svelte";
  import CatalogPagination from "$showcase/components/catalog-pagination.svelte";
  import {
    SearchField,
    SelectMenu,
    Stack,
    type SelectMenuOption,
  } from "$lib";
  import { catalogItems, type CatalogKind } from "$showcase/catalog.generated.js";
  import CatalogPreviewCard from "./catalog-preview-card.svelte";
  import {
    readListingUrlState,
    writeListingUrlState,
  } from "./listing-url-state";

  let {
    kind,
    title,
    description,
    searchLabel,
  }: {
    kind: CatalogKind;
    title: string;
    description: string;
    searchLabel: string;
  } = $props();

  const initialItems = catalogItems.filter((item) => item.kind === kind);
  const initialCategories = Array.from(
    new Set(initialItems.map((item) => item.category)),
  ).sort();
  const initialUrlState = readListingUrlState({
    defaultPageSize: "24",
    categories: initialCategories,
  });

  const items = $derived(catalogItems.filter((item) => item.kind === kind));
  const categories = $derived(
    Array.from(new Set(items.map((item) => item.category))).sort(),
  );
  const categoryOptions = $derived<SelectMenuOption[]>([
    { label: "All categories", value: "all" },
    ...categories.map((category) => ({ label: category, value: category })),
  ]);
  let query = $state(initialUrlState.query);
  let category = $state(initialUrlState.category ?? "all");
  let currentPage = $state(initialUrlState.page);
  const pageSizeValue = 24;

  const filteredItems = $derived(
    items.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      const normalizedQuery = query.trim().toLowerCase();
      const haystack = [
        item.title,
        item.name,
        item.category,
        item.description,
        item.registryName,
        item.tags?.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && haystack.includes(normalizedQuery);
    }),
  );

  const pageCount = $derived(
    Math.max(1, Math.ceil(filteredItems.length / pageSizeValue)),
  );
  const visibleItems = $derived(
    filteredItems.slice(
      (currentPage - 1) * pageSizeValue,
      currentPage * pageSizeValue,
    ),
  );

  let resetKey = `${initialUrlState.query}\u0000${initialUrlState.category ?? "all"}`;
  let hasInitialized = false;

  $effect(() => {
    const nextResetKey = `${query}\u0000${category}`;

    if (hasInitialized && nextResetKey !== resetKey) {
      currentPage = 1;
    }

    resetKey = nextResetKey;
    hasInitialized = true;
  });

  $effect(() => {
    if (currentPage > pageCount) {
      currentPage = pageCount;
    }
  });

  $effect(() => {
    writeListingUrlState({
      query,
      category,
      page: currentPage,
      pageSize: "24",
      defaultPageSize: "24",
    });
  });
</script>

<svelte:head>
  <title>{title} - varunUI</title>
  <meta name="description" content={description} />
</svelte:head>

<CatalogPageShell {title} count={items.length} {description}>
  {#snippet controls()}
    <SearchField
      bind:value={query}
      label={searchLabel}
      placeholder={searchLabel}
      size="sm"
    />
    <SelectMenu
      bind:value={category}
      label="Category"
      options={categoryOptions}
      size="sm"
    />
  {/snippet}

  <Stack gap="lg">
    <CatalogPagination
      bind:currentPage
      {pageCount}
      totalItems={filteredItems.length}
      pageSize={pageSizeValue}
    />
    <CatalogGrid
      hasItems={visibleItems.length > 0}
      emptyLabel={`No ${kind} found.`}
      emptyDescription="Try another category, name, or tag."
    >
      {#each visibleItems as item (item.id)}
        <CatalogPreviewCard {item} />
      {/each}
    </CatalogGrid>

    <CatalogPagination
      bind:currentPage
      {pageCount}
      totalItems={filteredItems.length}
      pageSize={pageSizeValue}
    />
  </Stack>
</CatalogPageShell>
