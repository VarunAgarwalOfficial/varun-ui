<script lang="ts" module>
  import type { Snippet } from "svelte";

  export type MediaSplitMediaSide = "left" | "right";
  export type MediaSplitMobileMediaOrder = "first" | "last";

  export interface MediaSplitProps {
    mediaSide?: MediaSplitMediaSide;
    mobileMediaOrder?: MediaSplitMobileMediaOrder;
    media?: Snippet;
    overlay?: Snippet;
    children?: Snippet;
  }

  export const mediaSplitDemo: MediaSplitProps = {
    mediaSide: "right",
    mobileMediaOrder: "last",
  };
</script>

<script lang="ts">
  let {
    mediaSide = "right",
    mobileMediaOrder = "last",
    media,
    overlay,
    children,
  }: MediaSplitProps = $props();

  const contentOrderClass = $derived(
    [
      mediaSide === "left" && "lg:order-2",
      mobileMediaOrder === "first" && "order-2",
    ]
      .filter(Boolean)
      .join(" "),
  );
  const mediaOrderClass = $derived(
    [
      mediaSide === "right" && "lg:order-2",
      mobileMediaOrder === "first" && "order-1",
    ]
      .filter(Boolean)
      .join(" "),
  );
</script>

<div data-slot="media-split" class="grid lg:grid-cols-2">
  <div
    data-slot="media-split-content"
    class={`flex min-w-0 items-center px-[var(--layout-gutter)] py-[var(--layout-section-space)] ${contentOrderClass}`}
  >
    <div class="mx-auto w-full max-w-[var(--layout-panel-md)]">
      {@render children?.()}
    </div>
  </div>

  <div
    data-slot="media-split-media"
    class={`relative min-h-[var(--layout-media-md)] min-w-0 overflow-hidden ${mediaOrderClass}`}
  >
    {@render media?.()}

    {#if overlay}
      <div class="absolute inset-0">
        {@render overlay()}
      </div>
    {/if}
  </div>
</div>
