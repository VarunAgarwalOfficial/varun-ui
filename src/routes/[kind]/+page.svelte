<script lang="ts">
  import CatalogListing from "$showcase/components/catalog-listing.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<CatalogListing
  kind={data.kind}
  title={data.title}
  description={data.description}
  searchLabel={data.searchLabel}
/>
