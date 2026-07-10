<script lang="ts" module>
  import type { Snippet } from "svelte";

  export type StackGap = "sm" | "md" | "lg" | "xl" | "2xl";
  export type StackAlign = "stretch" | "start" | "center" | "end";

  export interface StackProps {
    gap?: StackGap;
    align?: StackAlign;
    children?: Snippet;
  }

  export const stackDemo: StackProps = {};
</script>

<script lang="ts">
  const gapClasses: Record<StackGap, string> = {
    sm: "gap-[var(--layout-gap-sm)]",
    md: "gap-[var(--layout-gap-md)]",
    lg: "gap-[var(--layout-gap-lg)]",
    xl: "gap-[var(--layout-gap-xl)]",
    "2xl": "gap-[var(--layout-gap-2xl)]",
  };

  const alignClasses: Record<StackAlign, string> = {
    stretch: "items-stretch",
    start: "items-start",
    center: "items-center",
    end: "items-end",
  };

  let {
    gap = "md",
    align = "stretch",
    children,
  }: StackProps = $props();
</script>

<div data-slot="stack" class={`flex min-w-0 flex-col ${gapClasses[gap]} ${alignClasses[align]}`}>
  {@render children?.()}
</div>
