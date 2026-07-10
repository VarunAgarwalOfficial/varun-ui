<script lang="ts" module>
  import type { SparklineTone } from "$lib/components/varunui/component/sparkline.svelte";

  export type MetricTrendDirection = "up" | "down" | "flat";

  export interface MetricTrendProps {
    label: string;
    value: string | number;
    delta?: string;
    values?: number[];
    direction?: MetricTrendDirection;
    tone?: SparklineTone;
    ariaLabel?: string;
    graphAriaLabel?: string;
  }

  export const metricTrendDemo: MetricTrendProps = {
    label: "Active users",
    value: "4,821",
    delta: "+6.8%",
    values: [22, 28, 24, 33, 31, 40, 38, 46, 44, 52, 58, 64],
    direction: "up",
    tone: "blue",
    ariaLabel: "4,821 active users",
  };
</script>

<script lang="ts">
  import Sparkline from "$lib/components/varunui/component/sparkline.svelte";
  import StatValue from "$lib/components/varunui/component/stat-value.svelte";

  let {
    label,
    value,
    delta,
    values = [],
    direction = "flat",
    tone = "blue",
    ariaLabel,
    graphAriaLabel,
  }: MetricTrendProps = $props();

  const directionMarks: Record<MetricTrendDirection, string> = {
    up: "↑",
    down: "↓",
    flat: "→",
  };
</script>

<div data-slot="metric-trend" class="flex min-w-0 flex-col gap-3">
  <div class="flex items-start justify-between gap-3">
    <div class="min-w-0">
      <p class="truncate text-xs font-medium uppercase tracking-[var(--tracking-kicker)] text-muted-foreground">
        {label}
      </p>
      <div class="mt-2">
        <StatValue {value} size="md" ariaLabel={ariaLabel ?? label} />
      </div>
    </div>

    {#if delta}
      <span class="shrink-0 font-mono text-xs font-semibold tabular-nums text-foreground">
        <span aria-hidden="true">{directionMarks[direction]}</span>
        {delta}
      </span>
    {/if}
  </div>

  {#if values.length > 0}
    <div class="h-10 w-full">
      <Sparkline {values} {tone} ariaLabel={graphAriaLabel} />
    </div>
  {/if}
</div>
