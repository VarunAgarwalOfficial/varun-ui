<script lang="ts" module>
  import type { MarkerTone } from "$lib/components/varunui/component/marker.svelte";

  export interface EmailKickerProps {
    label: string;
    tone?: MarkerTone;
  }
</script>

<script lang="ts">
  import Marker from "$lib/components/varunui/component/marker.svelte";
  let { label, tone = "yellow" }: EmailKickerProps = $props();
</script>

<p class="email-kicker text-xs font-semibold uppercase tracking-[var(--tracking-kicker)]">
  <Marker text={label} {tone} animated={false} />
</p>

<style>
  .email-kicker :global(mark) {
    color: var(--email-ink);
  }
</style>
