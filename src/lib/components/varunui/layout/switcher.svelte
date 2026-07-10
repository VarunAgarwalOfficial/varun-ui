<script lang="ts" module>
  import type { Snippet } from "svelte";

  export type SwitcherGap = "sm" | "md" | "lg";
  export type SwitcherThreshold = "sm" | "md" | "lg";
  export type SwitcherLimit = 2 | 3 | 4;

  export interface SwitcherProps {
    gap?: SwitcherGap;
    threshold?: SwitcherThreshold;
    limit?: SwitcherLimit;
    children?: Snippet;
  }

  export const switcherDemo: SwitcherProps = {};
</script>

<script lang="ts">
  const gaps: Record<SwitcherGap, string> = {
    sm: "var(--layout-gap-sm)",
    md: "var(--layout-gap-md)",
    lg: "var(--layout-gap-lg)",
  };

  const thresholds: Record<SwitcherThreshold, string> = {
    sm: "36rem",
    md: "48rem",
    lg: "64rem",
  };

  let {
    gap = "md",
    threshold = "md",
    limit = 3,
    children,
  }: SwitcherProps = $props();
</script>

<div
  data-slot="switcher"
  data-limit={limit}
  class="switcher"
  style={`--switcher-gap: ${gaps[gap]}; --switcher-threshold: ${thresholds[threshold]}`}
>
  {@render children?.()}
</div>

<style>
  .switcher {
    display: flex;
    flex-wrap: wrap;
    gap: var(--switcher-gap);
  }

  .switcher > :global(*) {
    flex-basis: calc((var(--switcher-threshold) - 100%) * 999);
    flex-grow: 1;
    min-width: 0;
  }

  .switcher[data-limit="2"] > :global(:nth-last-child(n + 3)),
  .switcher[data-limit="2"] > :global(:nth-last-child(n + 3) ~ *),
  .switcher[data-limit="3"] > :global(:nth-last-child(n + 4)),
  .switcher[data-limit="3"] > :global(:nth-last-child(n + 4) ~ *),
  .switcher[data-limit="4"] > :global(:nth-last-child(n + 5)),
  .switcher[data-limit="4"] > :global(:nth-last-child(n + 5) ~ *) {
    flex-basis: 100%;
  }
</style>
