<script lang="ts">
  import CatalogPreviewRenderer from "$showcase/components/catalog-preview-renderer.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Preview - varunUI</title>
</svelte:head>

<CatalogPreviewRenderer kind={data.kind} name={data.name} mode="embed" />
