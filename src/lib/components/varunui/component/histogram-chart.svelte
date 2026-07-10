<script lang="ts" module>
  export interface HistogramChartProps {
    values?: number[];
    binCount?: number;
    valueLabel?: string;
    valueFormat?: (value: number) => string;
    ariaLabel?: string;
  }

  export const histogramChartDemo: HistogramChartProps = {
    values: [
      1.2, 1.5, 1.8, 2.1, 2.2, 2.4, 2.5, 2.7, 2.8, 3.1, 3.2, 3.4,
      3.5, 3.7, 3.9, 4.1, 4.2, 4.6, 5.1, 5.8, 6.4, 7.2,
    ],
    binCount: 7,
    valueLabel: "Review hours",
    valueFormat: (value) => `${value.toFixed(1)}h`,
    ariaLabel: "Distribution of review turnaround times",
  };
</script>

<script lang="ts">
  import { bin, extent, max, scaleLinear } from "d3";
  import ChartTooltip from "$lib/components/varunui/component/internal/chart-tooltip.svelte";
  import {
    formatChartValue,
    nextChartIndex,
    observeChartReveal,
    observeChartWidth,
  } from "./chart.js";

  let {
    values = [],
    binCount = 8,
    valueLabel = "Value",
    valueFormat = formatChartValue,
    ariaLabel = "Value distribution",
  }: HistogramChartProps = $props();

  const height = 288;
  const top = 16;
  const right = 18;
  const bottom = 42;
  const left = 44;

  let width = $state(640);
  let activeIndex = $state(-1);
  let focused = $state(false);

  let domain = $derived.by<[number, number]>(() => {
    const [minimum, maximum] = extent(values);
    if (minimum === undefined || maximum === undefined) return [0, 1];
    if (minimum === maximum) return [minimum - 0.5, maximum + 0.5];
    return [minimum, maximum];
  });
  let buckets = $derived(
    bin<number, number>()
      .domain(domain)
      .thresholds(Math.max(2, binCount))(values),
  );
  let x = $derived(
    scaleLinear().domain(domain).nice().range([left, width - right]),
  );
  let maxCount = $derived(Math.max(1, max(buckets, (bucket) => bucket.length) ?? 1));
  let y = $derived(
    scaleLinear().domain([0, maxCount]).nice(4).range([height - bottom, top]),
  );
  let xTicks = $derived(x.ticks(5));
  let yTicks = $derived(y.ticks(4));
  let active = $derived(buckets[activeIndex]);

  function rangeLabel(bucket: (typeof buckets)[number]) {
    return `${valueFormat(bucket.x0 ?? 0)} to ${valueFormat(bucket.x1 ?? 0)}`;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      activeIndex = nextChartIndex(activeIndex, buckets.length, 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      activeIndex = nextChartIndex(activeIndex, buckets.length, -1);
    } else if (event.key === "Escape") {
      activeIndex = -1;
    }
  }
</script>

<div
  data-slot="histogram-chart"
  data-chart-visible="false"
  class="chart-reveal relative w-full outline-none focus-visible:ring-3 focus-visible:ring-primary/40"
  use:observeChartReveal
  use:observeChartWidth={(nextWidth) => (width = nextWidth)}
  role="slider"
  aria-roledescription="interactive chart"
  aria-label={`${ariaLabel}. Use arrow keys to inspect each range.`}
  aria-valuemin="1"
  aria-valuemax={Math.max(1, buckets.length)}
  aria-valuenow={Math.max(1, activeIndex + 1)}
  aria-valuetext={active
    ? `${rangeLabel(active)}. ${active.length} observations.`
    : "No range selected"}
  tabindex="0"
  onfocus={() => {
    focused = true;
    if (activeIndex < 0 && buckets.length > 0) activeIndex = 0;
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
    viewBox={`0 0 ${width} ${height}`}
    class="block h-[var(--chart-height-plot)] w-full overflow-visible"
    aria-hidden="true"
  >
    {#if values.length === 0}
      <text
        x={width / 2}
        y={height / 2}
        text-anchor="middle"
        class="fill-muted-foreground text-xs"
      >No data to plot.</text>
    {:else}
      {#each yTicks as tick (tick)}
        {@const tickY = y(tick)}
        <line
          x1={left}
          x2={width - right}
          y1={tickY}
          y2={tickY}
          class="stroke-border/70"
          vector-effect="non-scaling-stroke"
        />
        <text
          x={left - 8}
          y={tickY + 3.5}
          text-anchor="end"
          class="fill-muted-foreground font-mono text-[10px] tabular-nums"
        >{tick}</text>
      {/each}

      {#each xTicks as tick (tick)}
        <text
          x={x(tick)}
          y={height - 20}
          text-anchor="middle"
          class="fill-muted-foreground font-mono text-[10px] tabular-nums"
        >{valueFormat(tick)}</text>
      {/each}
      <text
        x={(left + width - right) / 2}
        y={height - 4}
        text-anchor="middle"
        class="fill-muted-foreground text-[10px] font-medium"
      >{valueLabel}</text>

      {#each buckets as bucket, index (`${bucket.x0}-${bucket.x1}`)}
        {@const bucketX = x(bucket.x0 ?? domain[0])}
        {@const bucketWidth = Math.max(1, x(bucket.x1 ?? domain[1]) - bucketX - 2)}
        <rect
          x={bucketX + 1}
          y={y(bucket.length)}
          width={bucketWidth}
          height={Math.max(0, y(0) - y(bucket.length))}
          class={`motion-chart-column fill-data-blue ${activeIndex >= 0 && activeIndex !== index ? "opacity-35" : "opacity-85"}`}
          style={`--chart-motion-delay: ${index * 45}ms`}
        />
        <rect
          x={bucketX}
          y={top}
          width={bucketWidth + 2}
          height={height - bottom - top}
          class="fill-transparent"
          role="presentation"
          onpointerenter={() => (activeIndex = index)}
        />
      {/each}

      {#if active}
        {@const activeX = x(active.x0 ?? domain[0])}
        {@const activeWidth = x(active.x1 ?? domain[1]) - activeX}
        <ChartTooltip
          x={activeX + activeWidth / 2}
          y={y(active.length)}
          plotWidth={width}
          heading={rangeLabel(active)}
          items={[{ label: "Observations", value: `${active.length}`, tone: "blue" }]}
        />
      {/if}
    {/if}
  </svg>

  <p class="sr-only" aria-live="polite">
    {active ? `${rangeLabel(active)}. ${active.length} observations.` : ""}
  </p>
</div>
