<script lang="ts" module>
  export type StatusHistoryStripState = "up" | "degraded" | "outage" | "none";

  export interface StatusHistoryStripProps {
    label?: string;
    value?: string;
    history?: StatusHistoryStripState[];
    startLabel?: string;
    endLabel?: string;
    ariaLabel?: string;
  }

  export const statusHistoryStripDemo: StatusHistoryStripProps = {
    label: "api.varunui.dev",
    value: "99.94%",
    history: [
      "up",
      "up",
      "up",
      "degraded",
      "up",
      "outage",
      "up",
      "up",
      "up",
      "degraded",
      "up",
      "up",
    ],
    startLabel: "12d ago",
    endLabel: "Today",
    ariaLabel: "API uptime history: mostly operational with one outage and two degraded days",
  };
</script>

<script lang="ts">
  const stateClasses: Record<StatusHistoryStripState, string> = {
    up: "bg-success",
    degraded: "bg-warning",
    outage: "bg-danger",
    none: "bg-muted",
  };

  let {
    label,
    value,
    history = [],
    startLabel,
    endLabel,
    ariaLabel,
  }: StatusHistoryStripProps = $props();

  let resolvedLabel = $derived(ariaLabel ?? label ?? "Status history");
</script>

<section
  data-slot="status-history-strip"
  class="grid w-full gap-3 border-y border-border py-4"
  aria-label={resolvedLabel}
>
  {#if label || value}
    <div class="flex items-baseline justify-between gap-4">
      {#if label}
        <span class="truncate font-mono text-xs font-medium text-foreground">
          {label}
        </span>
      {/if}
      {#if value}
        <span class="shrink-0 font-mono text-xs font-semibold tabular-nums text-foreground">
          {value}
        </span>
      {/if}
    </div>
  {/if}

  <div class="flex h-8 items-stretch gap-px" aria-hidden="true">
    {#each history as state, index (index)}
      <span class={`flex-1 ${stateClasses[state]}`}></span>
    {/each}
  </div>

  {#if startLabel !== undefined || endLabel !== undefined}
    <div class="flex items-center justify-between text-xs text-muted-foreground">
      <span>{startLabel}</span>
      <span>{endLabel}</span>
    </div>
  {/if}
</section>
