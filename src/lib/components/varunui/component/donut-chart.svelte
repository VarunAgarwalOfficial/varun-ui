<script lang="ts" module>
  import type { ChartDatum } from "./chart.js";

  export type { ChartDatum as DonutChartSegment };

  export interface DonutChartProps {
    data?: ChartDatum[];
    valueFormat?: (value: number) => string;
    ariaLabel?: string;
  }

  export const donutChartDemo: DonutChartProps = {
    data: [
      { label: "Product", value: 42, tone: "purple" },
      { label: "Sales", value: 28, tone: "blue" },
      { label: "Support", value: 18, tone: "green" },
      { label: "Operations", value: 12, tone: "yellow" },
    ],
    ariaLabel: "Team allocation by function",
  };
</script>

<script lang="ts">
  import { arc, pie, type PieArcDatum } from "d3";
  import ChartTooltip from "$lib/components/varunui/component/internal/chart-tooltip.svelte";
  import {
    chartToneTextClasses,
    formatChartValue,
    nextChartIndex,
    observeChartReveal,
    toneAt,
  } from "./chart.js";

  let {
    data = [],
    valueFormat = formatChartValue,
    ariaLabel = "Part to whole comparison",
  }: DonutChartProps = $props();

  const size = 240;
  const center = size / 2;
  const outerRadius = 104;
  const innerRadius = 70;

  let activeIndex = $state(-1);
  let focused = $state(false);

  let total = $derived(
    data.reduce((sum, item) => sum + Math.max(0, item.value), 0),
  );
  let arcs = $derived(
    pie<ChartDatum>()
      .sort(null)
      .value((item) => Math.max(0, item.value))(data),
  );
  const path = arc<PieArcDatum<ChartDatum>>()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .padAngle(0.018);
  const centroid = arc<PieArcDatum<ChartDatum>>()
    .innerRadius((innerRadius + outerRadius) / 2)
    .outerRadius((innerRadius + outerRadius) / 2);

  let activeArc = $derived(arcs[activeIndex]);
  let active = $derived(activeArc?.data);
  let activeCentroid = $derived(
    activeArc ? centroid.centroid(activeArc) : [0, 0],
  );
  let activeTone = $derived(
    active ? toneAt(activeIndex, active.tone) : "purple",
  );

  function percentage(value: number) {
    return total > 0 ? Math.round((Math.max(0, value) / total) * 100) : 0;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      activeIndex = nextChartIndex(activeIndex, data.length, 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      activeIndex = nextChartIndex(activeIndex, data.length, -1);
    } else if (event.key === "Escape") {
      activeIndex = -1;
    }
  }
</script>

<div
  data-slot="donut-chart"
  data-chart-visible="false"
  class="chart-reveal grid items-center gap-6 sm:grid-cols-2"
  use:observeChartReveal
>
  <div
    class="relative mx-auto w-full max-w-60 outline-none focus-visible:ring-3 focus-visible:ring-primary/40"
    role="slider"
    aria-roledescription="interactive chart"
    aria-label={`${ariaLabel}. Use arrow keys to inspect each segment.`}
    aria-valuemin="1"
    aria-valuemax={Math.max(1, data.length)}
    aria-valuenow={Math.max(1, activeIndex + 1)}
    aria-valuetext={active
      ? `${active.label}: ${valueFormat(active.value)}, ${percentage(active.value)} percent of total`
      : "No segment selected"}
    tabindex="0"
    onfocus={() => {
      focused = true;
      if (activeIndex < 0 && data.length > 0) activeIndex = 0;
    }}
    onblur={() => {
      focused = false;
      activeIndex = -1;
    }}
    onkeydown={handleKeydown}
    onpointerleave={() => {
      if (!focused) activeIndex = -1;
    }}
  >
    <svg
      viewBox={`0 0 ${size} ${size}`}
      class="block aspect-square w-full overflow-visible"
      aria-hidden="true"
    >
      {#if data.length === 0}
        <circle
          cx={center}
          cy={center}
          r={(innerRadius + outerRadius) / 2}
          fill="none"
          class="stroke-muted"
          stroke-width={outerRadius - innerRadius}
        />
        <text
          x={center}
          y={center + 4}
          text-anchor="middle"
          class="fill-muted-foreground text-xs"
        >No data</text>
      {:else}
        <g transform={`translate(${center} ${center})`}>
          {#each arcs as item, index (item.index)}
            {@const itemTone = toneAt(index, item.data.tone)}
            <path
              d={path(item) ?? ""}
              class={`motion-chart-arc motion-interactive fill-current ${chartToneTextClasses[itemTone]} ${activeIndex >= 0 && activeIndex !== index ? "opacity-40" : "opacity-100"}`}
              style={`--chart-motion-delay: ${index * 55}ms`}
              role="presentation"
              onpointerenter={() => (activeIndex = index)}
            />
          {/each}
        </g>

        <text
          x={center}
          y={center - 5}
          text-anchor="middle"
          class="fill-muted-foreground text-[10px] font-medium uppercase tracking-[var(--tracking-label)]"
        >Total</text>
        <text
          x={center}
          y={center + 18}
          text-anchor="middle"
          class="fill-foreground font-mono text-lg font-semibold tabular-nums"
        >{valueFormat(total)}</text>

        {#if active && activeArc}
          <ChartTooltip
            x={center + activeCentroid[0]}
            y={center + activeCentroid[1]}
            plotWidth={size}
            heading={active.label}
            items={[
              {
                label: `${percentage(active.value)}% of total`,
                value: valueFormat(active.value),
                tone: activeTone,
              },
            ]}
          />
        {/if}
      {/if}
    </svg>
  </div>

  <ul class="grid gap-3 text-sm" aria-label="Legend">
    {#each data as item, index (`legend-${item.label}-${index}`)}
      {@const itemTone = toneAt(index, item.tone)}
      <li
        class={`motion-interactive grid grid-cols-[auto_1fr_auto] items-center gap-2 border-b border-border pb-2 ${activeIndex === index ? "text-foreground" : "text-muted-foreground"}`}
        onpointerenter={() => (activeIndex = index)}
        onpointerleave={() => {
          if (!focused) activeIndex = -1;
        }}
      >
        <span
          class={`size-2.5 bg-current ${chartToneTextClasses[itemTone]}`}
          aria-hidden="true"
        ></span>
        <span>{item.label}</span>
        <span class="font-mono text-xs font-semibold tabular-nums text-foreground">
          {percentage(item.value)}%
        </span>
      </li>
    {/each}
  </ul>

  <p class="sr-only" aria-live="polite">
    {active
      ? `${active.label}: ${valueFormat(active.value)}, ${percentage(active.value)} percent of total`
      : ""}
  </p>
</div>
