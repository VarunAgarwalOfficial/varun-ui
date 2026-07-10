<script lang="ts" module>
  import type { Snippet } from "svelte";

  export interface CanvasFrameProps {
    label: string;
    children?: Snippet;
  }
</script>

<script lang="ts">
  let {
    label,
    children,
  }: CanvasFrameProps = $props();
</script>

<div
  data-slot="canvas-stage"
  class="canvas-stage grid size-full place-items-center"
>
  <div
    data-slot="canvas"
    data-format="square"
    role="img"
    aria-label={label}
    class="canvas-frame overflow-hidden border border-foreground bg-background text-foreground"
  >
    {@render children?.()}
  </div>
</div>

<style>
  .canvas-stage {
    container-type: size;
  }

  .canvas-frame {
    position: relative;
    width: min(100cqw, 100cqh);
    aspect-ratio: 1;
    container-type: size;
    flex: 0 0 auto;
  }
</style>
