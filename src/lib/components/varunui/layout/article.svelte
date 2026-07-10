<script lang="ts" module>
  import type { Snippet } from "svelte";

  export interface ArticleProps {
    header?: Snippet;
    media?: Snippet;
    children?: Snippet;
  }

  export const articleDemo: ArticleProps = {};
</script>

<script lang="ts">
  let { header, media, children }: ArticleProps = $props();
</script>

<article
  data-slot="article"
  class="mx-auto w-full max-w-[var(--layout-content-md)] px-[var(--layout-gutter)]"
>
  {#if header}
    <header class="mb-[var(--layout-gap-xl)]">
      {@render header()}
    </header>
  {/if}

  {#if media}
    <div class="mb-[var(--layout-gap-xl)]">
      {@render media()}
    </div>
  {/if}

  <div class="mx-auto max-w-[var(--layout-prose)]">
    {@render children?.()}
  </div>
</article>
