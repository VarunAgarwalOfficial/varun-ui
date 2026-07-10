<script lang="ts" module>
  import type { MarkerTone } from "$lib/components/varunui/component/marker.svelte";

  export interface PosterMastheadProps {
    kicker: string;
    folio: string;
    tone?: MarkerTone;
  }
</script>

<script lang="ts">
  import Marker from "$lib/components/varunui/component/marker.svelte";

  let {
    kicker,
    folio,
    tone = "yellow",
  }: PosterMastheadProps = $props();
</script>

<header
  data-slot="poster-masthead"
  class="flex items-center justify-between gap-[4cqi] border-b border-foreground px-[var(--canvas-safe-area)] py-[var(--canvas-masthead-padding)]"
>
  <p
    class="min-w-0 text-[length:var(--canvas-type-kicker)] font-semibold uppercase tracking-[var(--tracking-kicker)]"
  >
    <Marker text={kicker} {tone} animated={false} emphasis />
  </p>
  <p
    class="shrink-0 font-mono text-[length:var(--canvas-type-folio)] font-semibold uppercase tracking-[0.1em]"
  >
    {folio}
  </p>
</header>
