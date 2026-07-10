<script lang="ts" module>
  import type { Snippet } from "svelte";

  export interface EmailDocumentProps {
    preheader: string;
    header?: Snippet;
    children?: Snippet;
    footer?: Snippet;
  }
</script>

<script lang="ts">
  import EmailFrame from "$lib/components/varunui/layout/email-frame.svelte";

  let { preheader, header, children, footer }: EmailDocumentProps = $props();
</script>

<EmailFrame>
  <article
    data-slot="email-document"
    class="w-full border border-[var(--email-border)] bg-[var(--email-paper)] text-[var(--email-ink)]"
    style="color-scheme: light; --surface-pastel-base: var(--email-paper);"
  >
    <span class="sr-only">{preheader}</span>

    {#if header}
      <header class="border-b border-[var(--email-border)] px-[var(--surface-padding-lg)] py-[var(--surface-padding-md)] sm:px-[var(--surface-padding-xl)]">
        {@render header()}
      </header>
    {/if}

    <div class="p-[var(--surface-padding-lg)] sm:p-[var(--surface-padding-xl)]">
      {@render children?.()}
    </div>

    {#if footer}
      <footer class="border-t border-[var(--email-border)] bg-[var(--email-muted-surface)] px-[var(--surface-padding-lg)] py-[var(--surface-padding-md)] text-[var(--email-muted-ink)] sm:px-[var(--surface-padding-xl)]">
        {@render footer()}
      </footer>
    {/if}
  </article>
</EmailFrame>
