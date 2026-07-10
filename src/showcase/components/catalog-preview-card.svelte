<script lang="ts">
  import type { CatalogItem } from "$showcase/catalog.generated.js";
  import CatalogPreviewRenderer from "$showcase/components/catalog-preview-renderer.svelte";
  import PreviewCardShell from "$showcase/components/preview-card-shell.svelte";

  let { item }: { item: CatalogItem } = $props();

  const kindLabels: Record<CatalogItem["kind"], string> = {
    blocks: "Block",
    pages: "Page",
    emails: "Email",
    layouts: "Layout",
    components: "Component",
    pieces: "Piece",
    canvases: "Canvas",
  };
</script>

<PreviewCardShell
  href={`/${item.route}/${item.name}`}
  heading={item.title}
  description={item.description}
  meta={`${kindLabels[item.kind]} / ${item.category}`}
  previewMode={item.kind === "blocks" || item.kind === "layouts" || item.kind === "pages" || item.kind === "emails" || item.name === "app-shell" ? "page" : "actual"}
>
  {#snippet preview()}
    <CatalogPreviewRenderer kind={item.kind} name={item.name} mode="embed" />
  {/snippet}
</PreviewCardShell>
