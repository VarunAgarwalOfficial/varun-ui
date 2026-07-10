<script lang="ts" module>
  import type { Snippet } from "svelte";

  export type MasonryColumns = 2 | 3 | 4;
  export type MasonryGap = "sm" | "md" | "lg";

  export interface MasonryProps {
    columns?: MasonryColumns;
    gap?: MasonryGap;
    children?: Snippet;
  }

  export const masonryDemo: MasonryProps = {
    columns: 3,
    gap: "md",
  };
</script>

<script lang="ts">
  let {
    columns = 3,
    gap = "md",
    children,
  }: MasonryProps = $props();

  const columnClasses: Record<MasonryColumns, string> = {
    2: "sm:columns-2",
    3: "sm:columns-2 lg:columns-3",
    4: "sm:columns-2 lg:columns-4",
  };

  const gapClasses: Record<MasonryGap, string> = {
    sm: "gap-[var(--layout-gap-sm)] [&>*]:mb-[var(--layout-gap-sm)]",
    md: "gap-[var(--layout-gap-md)] [&>*]:mb-[var(--layout-gap-md)]",
    lg: "gap-[var(--layout-gap-lg)] [&>*]:mb-[var(--layout-gap-lg)]",
  };
</script>

<div
  data-slot="masonry"
  class={`columns-1 [&>*]:break-inside-avoid ${columnClasses[columns]} ${gapClasses[gap]}`}
>
  {@render children?.()}
</div>
