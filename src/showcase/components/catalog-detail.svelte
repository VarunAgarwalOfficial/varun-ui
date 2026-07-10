<script lang="ts">
  import DetailToolbar from "$showcase/components/layout/detail-toolbar.svelte";
  import CatalogPreviewRenderer from "$showcase/components/catalog-preview-renderer.svelte";
  import { getCatalogItem, type CatalogKind } from "$showcase/catalog.generated.js";

  let { kind, name }: { kind: CatalogKind; name: string } = $props();

  const item = $derived(getCatalogItem(kind, name));

</script>

<svelte:head>
  <title>{item?.title ?? name} - varunUI</title>
  <meta
    name="description"
    content={item?.description ??
      "Preview a varunUI library item."}
  />
</svelte:head>

{#if item}
  <div class="min-h-[var(--layout-viewport-height)] bg-background text-foreground">
    <DetailToolbar
      parentHref={`/${item.route}`}
      parentLabel={item.kindLabel}
      label={item.title}
    />

    <main>
      <CatalogPreviewRenderer {kind} {name} />
    </main>
  </div>
{/if}
