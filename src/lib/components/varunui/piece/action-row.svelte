<script lang="ts" module>
  import type { Snippet } from "svelte";

  export type ActionRowAlign = "left" | "center";

  export interface ActionRowProps {
    align?: ActionRowAlign;
    children?: Snippet;
  }

  export const actionRowDemo: ActionRowProps = {
    align: "center",
  };
</script>

<script lang="ts">
  import Cluster from "$lib/components/varunui/layout/cluster.svelte";

  let {
    align = "center",
    children,
  }: ActionRowProps = $props();
</script>

{#if children}
  <Cluster justify={align === "center" ? "center" : "start"} gap="md">
    {@render children()}
  </Cluster>
{/if}
