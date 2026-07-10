<script lang="ts">
  import PaginationNav from "$lib/components/varunui/component/pagination-nav.svelte";
  import Cluster from "$lib/components/varunui/layout/cluster.svelte";

  let {
    currentPage = $bindable(1),
    pageCount,
    totalItems,
    pageSize,
  }: {
    currentPage: number;
    pageCount: number;
    totalItems: number;
    pageSize: number;
  } = $props();

  const startItem = $derived(
    totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1,
  );
  const endItem = $derived(Math.min(totalItems, currentPage * pageSize));

  function choosePage(page: number) {
    currentPage = page;
  }
</script>

<Cluster justify="between" gap="md">
  <p class="text-sm text-muted-foreground">
    Showing {startItem}-{endItem} of {totalItems}
  </p>

  <PaginationNav
    {currentPage}
    {pageCount}
    onPageChange={choosePage}
  />
</Cluster>
