<script lang="ts" module>
  import type { Snippet } from "svelte";

  export type PancakeHeight = "screen" | "fill";

  export interface PancakeProps {
    height?: PancakeHeight;
    header?: Snippet;
    footer?: Snippet;
    children?: Snippet;
  }

  export const pancakeDemo: PancakeProps = {
    height: "screen",
  };
</script>

<script lang="ts">
  let {
    height = "screen",
    header,
    footer,
    children,
  }: PancakeProps = $props();
</script>

<div
  data-slot="pancake"
  class={`grid grid-rows-[auto_minmax(0,1fr)_auto] ${height === "screen" ? "min-h-[var(--layout-viewport-height)]" : "h-full min-h-0"}`}
>
  <header data-slot="pancake-header">{@render header?.()}</header>
  <main data-slot="pancake-main" class="min-h-0">{@render children?.()}</main>
  <footer data-slot="pancake-footer">{@render footer?.()}</footer>
</div>
