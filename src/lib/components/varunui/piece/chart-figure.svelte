<script lang="ts" module>
  import type { Snippet } from "svelte";

  export interface ChartFigureProps {
    header?: Snippet;
    children?: Snippet;
    legend?: Snippet;
    caption?: Snippet;
    captionLabel?: string;
    captionMeta?: string;
    className?: string;
  }
</script>

<script lang="ts">
  import DataCaption from "$lib/components/varunui/component/data-caption.svelte";
  import { cn } from "$lib/utils.js";

  let {
    header,
    children,
    legend,
    caption,
    captionLabel = "Figure",
    captionMeta,
    className,
  }: ChartFigureProps = $props();
</script>

<figure
  data-slot="chart-figure"
  class={cn("grid min-w-0 gap-5 border-y border-border py-6", className)}
>
  {#if header}
    <div data-slot="chart-figure-header">
      {@render header()}
    </div>
  {/if}

  <div data-slot="chart-figure-plot" class="min-w-0">
    {@render children?.()}
  </div>

  {#if legend}
    <div data-slot="chart-figure-legend">
      {@render legend()}
    </div>
  {/if}

  {#if caption}
    <DataCaption label={captionLabel} meta={captionMeta}>
      {@render caption()}
    </DataCaption>
  {/if}
</figure>
