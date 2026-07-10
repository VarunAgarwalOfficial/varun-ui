<script lang="ts" module>
  import type { Snippet } from "svelte";

  export type OverlapSide = "left" | "right";
  export type OverlapAmount = "sm" | "md" | "lg";
  export type OverlapAlign = "start" | "center" | "end";

  export interface OverlapProps {
    side?: OverlapSide;
    amount?: OverlapAmount;
    align?: OverlapAlign;
    stickyPrimary?: boolean;
    primary?: Snippet;
    secondary?: Snippet;
    children?: Snippet;
  }

  export const overlapDemo: OverlapProps = {
    side: "right",
    amount: "md",
    align: "start",
  };
</script>

<script lang="ts">
  let {
    side = "right",
    amount = "md",
    align = "start",
    stickyPrimary = false,
    primary,
    secondary,
    children,
  }: OverlapProps = $props();

  const alignClasses: Record<OverlapAlign, string> = {
    start: "lg:items-start",
    center: "lg:items-center",
    end: "lg:items-end",
  };

  const overlapClasses: Record<OverlapAmount, { left: string; right: string }> = {
    sm: {
      left: "lg:-mr-[var(--layout-gap-lg)]",
      right: "lg:-ml-[var(--layout-gap-lg)]",
    },
    md: {
      left: "lg:-mr-[var(--layout-gap-xl)]",
      right: "lg:-ml-[var(--layout-gap-xl)]",
    },
    lg: {
      left: "lg:-mr-[var(--layout-gap-2xl)]",
      right: "lg:-ml-[var(--layout-gap-2xl)]",
    },
  };

  const primaryClass = $derived(
    [
      "relative z-10 min-w-0",
      side === "right"
        ? "lg:col-span-7 lg:col-start-1"
        : "lg:col-span-7 lg:col-start-6",
      stickyPrimary &&
        "lg:sticky lg:top-[var(--layout-sticky-offset)] lg:self-start",
    ]
      .filter(Boolean)
      .join(" "),
  );

  const secondaryClass = $derived(
    [
      "min-w-0",
      side === "right"
        ? `lg:col-span-6 lg:col-start-7 ${overlapClasses[amount].right}`
        : `lg:col-span-6 lg:col-start-1 lg:row-start-1 ${overlapClasses[amount].left}`,
    ]
      .filter(Boolean)
      .join(" "),
  );
</script>

<div class={`grid gap-[var(--layout-gap-lg)] lg:grid-cols-12 ${alignClasses[align]}`}>
  <div data-slot="overlap-primary" class={primaryClass}>
    {#if primary}
      {@render primary()}
    {:else}
      {@render children?.()}
    {/if}
  </div>

  {#if secondary}
    <div data-slot="overlap-secondary" class={secondaryClass}>
      {@render secondary()}
    </div>
  {/if}
</div>
