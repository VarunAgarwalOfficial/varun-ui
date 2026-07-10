<script lang="ts" module>
  import type { Snippet } from "svelte";

  export type ClusterGap = "sm" | "md" | "lg";
  export type ClusterAlign = "start" | "center" | "baseline" | "end";
  export type ClusterJustify = "start" | "center" | "between" | "end";

  export interface ClusterProps {
    gap?: ClusterGap;
    align?: ClusterAlign;
    justify?: ClusterJustify;
    children?: Snippet;
  }

  export const clusterDemo: ClusterProps = {};
</script>

<script lang="ts">
  const gapClasses: Record<ClusterGap, string> = {
    sm: "gap-[var(--layout-gap-sm)]",
    md: "gap-[var(--layout-gap-md)]",
    lg: "gap-[var(--layout-gap-lg)]",
  };

  const alignClasses: Record<ClusterAlign, string> = {
    start: "items-start",
    center: "items-center",
    baseline: "items-baseline",
    end: "items-end",
  };

  const justifyClasses: Record<ClusterJustify, string> = {
    start: "justify-start",
    center: "justify-center",
    between: "justify-between",
    end: "justify-end",
  };

  let {
    gap = "sm",
    align = "center",
    justify = "start",
    children,
  }: ClusterProps = $props();
</script>

<div
  data-slot="cluster"
  class={`flex min-w-0 flex-wrap ${gapClasses[gap]} ${alignClasses[align]} ${justifyClasses[justify]}`}
>
  {@render children?.()}
</div>
