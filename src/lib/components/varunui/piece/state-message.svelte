<script lang="ts" module>
  import type { MarkerTone } from "$lib/components/varunui/component/marker.svelte";
  import type { Snippet } from "svelte";

  export interface StateMessageProps {
    kicker: string;
    title: string;
    description: string;
    code?: string;
    actions?: Snippet;
    tone?: MarkerTone;
  }

  export const stateMessageDemo: StateMessageProps = {
    kicker: "A useful pause",
    code: "404",
    title: "This page wandered off.",
    description:
      "The link may be old, or the page may have moved. There is still a clear way forward.",
    tone: "blue",
  };
</script>

<script lang="ts">
  import ActionRow from "$lib/components/varunui/piece/action-row.svelte";
  import Marker from "$lib/components/varunui/component/marker.svelte";

  let {
    kicker,
    title,
    description,
    code,
    actions,
    tone = "primary",
  }: StateMessageProps = $props();
</script>

<div class="max-w-xl">
  <div class="flex items-center gap-[var(--layout-gap-sm)]">
    <p class="text-sm font-semibold uppercase tracking-[var(--tracking-kicker)]">
      <Marker text={kicker} {tone} emphasis />
    </p>
    {#if code}
      <span class="font-mono text-xs text-muted-foreground">{code}</span>
    {/if}
  </div>
  <h1 class="mt-[var(--layout-gap-md)] text-balance text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl">
    {title}
  </h1>
  <p class="mt-[var(--layout-gap-sm)] max-w-lg text-base leading-7 text-muted-foreground md:text-lg">
    {description}
  </p>
  {#if actions}
    <div class="mt-[var(--layout-gap-lg)]">
      <ActionRow align="left">{@render actions()}</ActionRow>
    </div>
  {/if}
</div>
