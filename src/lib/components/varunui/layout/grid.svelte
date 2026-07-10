<script lang="ts" module>
  import type { Snippet } from "svelte";

  export type GridColumns = 1 | 2 | 3 | 4;
  export type GridGap = "sm" | "md" | "lg";

  export interface GridProps {
    columns?: GridColumns;
    gap?: GridGap;
    children?: Snippet;
  }

  export const gridDemo: GridProps = {
    columns: 3,
    gap: "md",
  };
</script>

<script lang="ts">
  let {
    columns = 3,
    gap = "md",
    children,
  }: GridProps = $props();

  const columnClasses: Record<GridColumns, string> = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  const gapClasses: Record<GridGap, string> = {
    sm: "gap-[var(--layout-gap-sm)]",
    md: "gap-[var(--layout-gap-md)]",
    lg: "gap-[var(--layout-gap-lg)]",
  };
</script>

<div data-slot="grid" class={`grid ${columnClasses[columns]} ${gapClasses[gap]}`}>
  {@render children?.()}
</div>
