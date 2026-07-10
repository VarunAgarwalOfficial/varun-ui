<script lang="ts" module>
  import type { Snippet } from "svelte";

  export type ImposterMargin = "sm" | "md" | "lg";

  export interface ImposterProps {
    fixed?: boolean;
    margin?: ImposterMargin;
    children?: Snippet;
  }

  export const imposterDemo: ImposterProps = {
    fixed: false,
    margin: "md",
  };
</script>

<script lang="ts">
  let {
    fixed = false,
    margin = "md",
    children,
  }: ImposterProps = $props();

  const margins: Record<ImposterMargin, string> = {
    sm: "var(--layout-gap-sm)",
    md: "var(--layout-gap-md)",
    lg: "var(--layout-gap-lg)",
  };
</script>

<div
  data-slot="imposter"
  class={fixed ? "fixed" : "absolute"}
  style={`--imposter-margin: ${margins[margin]}`}
>
  {@render children?.()}
</div>

<style>
  [data-slot="imposter"] {
    inset-block-start: 50%;
    inset-inline-start: 50%;
    max-block-size: calc(100% - var(--imposter-margin) * 2);
    max-inline-size: calc(100% - var(--imposter-margin) * 2);
    overflow: auto;
    transform: translate(-50%, -50%);
    z-index: 20;
  }
</style>
