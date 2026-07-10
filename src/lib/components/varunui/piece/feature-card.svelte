<script lang="ts" module>
  import type { Snippet } from "svelte";

  export interface FeatureCardProps {
    leading?: Snippet;
    children: Snippet;
  }
</script>

<script lang="ts">
  let { leading, children }: FeatureCardProps = $props();
</script>

<article
  data-slot="feature-card"
  class="flex h-full flex-col gap-[var(--layout-gap-sm)] rounded-none border border-border bg-surface p-[var(--surface-padding-md)] text-foreground"
>
  {#if leading}
    <div
      data-slot="feature-card-leading"
      class="flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-background text-foreground"
    >
      {@render leading()}
    </div>
  {/if}

  <div data-slot="feature-card-content" class="min-w-0">
    {@render children()}
  </div>
</article>
