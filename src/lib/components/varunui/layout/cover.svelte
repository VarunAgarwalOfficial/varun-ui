<script lang="ts" module>
  import type { Snippet } from "svelte";

  export type CoverHeight = "screen" | "section";

  export interface CoverProps {
    height?: CoverHeight;
    header?: Snippet;
    footer?: Snippet;
    children?: Snippet;
  }

  export const coverDemo: CoverProps = {};
</script>

<script lang="ts">
  const heightClasses: Record<CoverHeight, string> = {
    screen: "min-h-[var(--layout-viewport-height)]",
    section: "min-h-[var(--layout-media-lg)]",
  };

  let {
    height = "screen",
    header,
    footer,
    children,
  }: CoverProps = $props();
</script>

<section
  data-slot="cover"
  class={`flex w-full flex-col px-[var(--layout-gutter)] ${heightClasses[height]}`}
>
  {@render header?.()}
  <div class="grid flex-1 place-items-center py-[var(--layout-section-space-sm)]">
    {@render children?.()}
  </div>
  {@render footer?.()}
</section>
