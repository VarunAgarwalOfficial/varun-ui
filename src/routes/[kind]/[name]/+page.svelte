<script lang="ts">
  import CatalogDetail from "$showcase/components/catalog-detail.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<CatalogDetail kind={data.kind} name={data.name} />
