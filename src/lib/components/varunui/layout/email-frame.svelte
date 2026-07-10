<script lang="ts" module>
  import type { Snippet } from "svelte";

  export interface EmailFrameProps {
    children?: Snippet;
  }

  export const emailFrameDemo: EmailFrameProps = {};
</script>

<script lang="ts">
  let { children }: EmailFrameProps = $props();
</script>

<div data-slot="email-frame" class="mx-auto w-full max-w-[var(--layout-email)]">
  {@render children?.()}
</div>
