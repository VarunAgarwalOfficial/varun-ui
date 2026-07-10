<script lang="ts" module>
  import type { Snippet } from "svelte";

  export type DataCaptionElement = "figure" | "table";

  export interface DataCaptionProps {
    as?: DataCaptionElement;
    label?: string;
    description?: string;
    meta?: string;
    children?: Snippet;
    className?: string;
  }

  export const dataCaptionDemo: DataCaptionProps = {
    label: "Figure 01",
    description: "Completed work rose steadily after the review step moved earlier.",
    meta: "Source: product workspace · Updated Jul 10",
  };
</script>

<script lang="ts">
  import Marker from "$lib/components/varunui/component/marker.svelte";
  import { cn } from "$lib/utils.js";

  let {
    as = "figure",
    label = as === "table" ? "Table" : "Figure",
    description,
    meta,
    children,
    className,
  }: DataCaptionProps = $props();
</script>

{#snippet content()}
  <span
    data-slot="data-caption-content"
    class="grid gap-2 text-left text-xs leading-5 text-muted-foreground sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-baseline sm:gap-4"
  >
    <span
      data-slot="data-caption-label"
      class="w-fit whitespace-nowrap font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-foreground"
    >
      <Marker text={label} tone="yellow" emphasis={true} animated={false} />
    </span>

    <span data-slot="data-caption-description" class="max-w-[var(--layout-prose)]">
      {#if children}
        {@render children()}
      {:else}
        {description}
      {/if}
    </span>

    {#if meta}
      <span
        data-slot="data-caption-meta"
        class="whitespace-nowrap font-mono text-[0.6875rem] tracking-wide text-muted-foreground sm:text-right"
      >
        {meta}
      </span>
    {/if}
  </span>
{/snippet}

{#if as === "table"}
  <caption
    data-slot="data-caption"
    data-kind="table"
    class={cn("caption-bottom border-t border-border px-4 py-3", className)}
  >
    {@render content()}
  </caption>
{:else}
  <!-- svelte-ignore a11y_figcaption_parent (The component is mounted directly inside the caller's figure.) -->
  <figcaption
    data-slot="data-caption"
    data-kind="figure"
    class={cn("border-t border-border pt-3", className)}
  >
    {@render content()}
  </figcaption>
{/if}
