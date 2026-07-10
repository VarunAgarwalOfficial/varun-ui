<script lang="ts" module>
  import type { Snippet } from "svelte";

  export type CenterMeasure = "prose" | "sm" | "md" | "lg";

  export interface CenterProps {
    measure?: CenterMeasure;
    gutters?: boolean;
    children?: Snippet;
  }

  export const centerDemo: CenterProps = {
    measure: "prose",
    gutters: true,
  };
</script>

<script lang="ts">
  let {
    measure = "prose",
    gutters = true,
    children,
  }: CenterProps = $props();

  const measureClasses: Record<CenterMeasure, string> = {
    prose: "max-w-[var(--layout-prose)]",
    sm: "max-w-[var(--layout-content-sm)]",
    md: "max-w-[var(--layout-content-md)]",
    lg: "max-w-[var(--layout-content-lg)]",
  };
</script>

<div
  data-slot="center"
  class={`mx-auto box-content w-auto ${measureClasses[measure]} ${gutters ? "px-[var(--layout-gutter)]" : ""}`}
>
  {@render children?.()}
</div>
